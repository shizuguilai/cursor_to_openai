"""OpenAI 兼容 HTTP 层，对接 Cursor CLI。"""

from __future__ import annotations

import asyncio
import json
import queue
import threading
import time
import uuid
from collections.abc import AsyncIterator

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse

from cursor_client import CursorCliClient, messages_to_prompt
from models import (
    ChatCompletionChunk,
    ChatCompletionChunkChoice,
    ChatCompletionDelta,
    ChatCompletionRequest,
    ChatCompletionResponse,
    ChatCompletionChoice,
    ChatCompletionMessage,
    ModelListResponse,
    ModelObject,
    Usage,
)

app = FastAPI(title="Cursor CLI OpenAI Adapter", version="0.1.0")
_client = CursorCliClient()


def _usage_from_result(result: dict | None) -> Usage | None:
    if not result:
        return None
    u = result.get("usage")
    if not isinstance(u, dict):
        return None
    inp = int(u.get("inputTokens") or 0)
    out = int(u.get("outputTokens") or 0)
    return Usage(prompt_tokens=inp, completion_tokens=out, total_tokens=inp + out)


def _chunk_payload(
    completion_id: str,
    created: int,
    model: str,
    delta: ChatCompletionDelta,
    finish_reason: str | None = None,
) -> str:
    chunk = ChatCompletionChunk(
        id=completion_id,
        created=created,
        model=model,
        choices=[
            ChatCompletionChunkChoice(
                index=0,
                delta=delta,
                finish_reason=finish_reason,
            )
        ],
    )
    return f"data: {chunk.model_dump_json()}\n\n"


async def _stream_chat(prompt: str, model: str) -> AsyncIterator[str]:
    completion_id = f"chatcmpl-{uuid.uuid4().hex}"
    created = int(time.time())
    q: queue.Queue = queue.Queue()
    err: list[BaseException] = []

    def worker() -> None:
        sent_len = 0
        last_result: dict | None = None
        try:
            for event in _client.iter_stream_json_events(prompt, model):
                et = event.get("type")
                if et == "thinking":
                    continue
                if et == "result":
                    last_result = event
                    continue
                text = _client.extract_assistant_text(event)
                if text is None:
                    continue
                if len(text) < sent_len:
                    continue
                delta = text[sent_len:]
                sent_len = len(text)
                if delta:
                    q.put(("delta", delta))
        except BaseException as e:
            err.append(e)
        finally:
            q.put(("done", last_result))
            q.put(None)

    threading.Thread(target=worker, daemon=True).start()

    yield _chunk_payload(
        completion_id,
        created,
        model,
        ChatCompletionDelta(role="assistant", content=None),
    )

    while True:
        item = await asyncio.to_thread(q.get)
        if item is None:
            break
        kind, payload = item
        if kind == "delta":
            yield _chunk_payload(
                completion_id,
                created,
                model,
                ChatCompletionDelta(content=str(payload)),
            )
        elif kind == "done":
            res = payload
            if isinstance(res, dict) and res.get("is_error"):
                yield _chunk_payload(
                    completion_id,
                    created,
                    model,
                    ChatCompletionDelta(),
                    finish_reason="error",
                )
            else:
                yield _chunk_payload(
                    completion_id,
                    created,
                    model,
                    ChatCompletionDelta(),
                    finish_reason="stop",
                )

    if err:
        raise HTTPException(status_code=500, detail=str(err[0]))

    yield "data: [DONE]\n\n"


@app.get("/v1/models")
async def list_models() -> JSONResponse:
    try:
        raw_list = await asyncio.to_thread(_client.list_models)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"列出模型失败: {e}") from e
    data = [ModelObject(**m) for m in raw_list]
    return JSONResponse(ModelListResponse(data=data).model_dump())


@app.post("/v1/chat/completions")
async def chat_completions(body: ChatCompletionRequest):
    prompt = messages_to_prompt(body.messages)
    model = body.model or "auto"

    if body.stream:
        return StreamingResponse(
            _stream_chat(prompt, model),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "Connection": "keep-alive"},
        )

    try:
        text, result = await asyncio.to_thread(_client.collect_completion_text, prompt, model)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"agent 执行失败: {e}") from e

    completion_id = f"chatcmpl-{uuid.uuid4().hex}"
    created = int(time.time())
    finish: str = "stop"
    if isinstance(result, dict) and result.get("is_error"):
        finish = "error"

    resp = ChatCompletionResponse(
        id=completion_id,
        created=created,
        model=model,
        choices=[
            ChatCompletionChoice(
                message=ChatCompletionMessage(content=text),
                finish_reason=finish,
            )
        ],
        usage=_usage_from_result(result),
    )
    return JSONResponse(resp.model_dump())


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8080, reload=False)
