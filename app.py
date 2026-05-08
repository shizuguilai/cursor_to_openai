"""OpenAI 兼容 HTTP 层，对接 Cursor CLI。"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import queue
import threading
import time
import uuid
from collections.abc import AsyncIterator

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse

from cursor_client import CursorCliClient, merge_assistant_text, messages_to_prompt
from models import (
    ChatCompletionChoice,
    ChatCompletionChunk,
    ChatCompletionChunkChoice,
    ChatCompletionDelta,
    ChatCompletionMessage,
    ChatCompletionRequest,
    ChatCompletionResponse,
    ModelListResponse,
    ModelObject,
    Usage,
)

logger = logging.getLogger("cursor_to_openai")
logging.basicConfig(level=os.environ.get("LOG_LEVEL", "INFO"))

app = FastAPI(title="Cursor CLI OpenAI Adapter", version="0.2.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

_client = CursorCliClient()


def _usage_from_result(result: dict | None) -> Usage | None:
    if not isinstance(result, dict):
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


def _error_chunk(completion_id: str, created: int, model: str, message: str) -> str:
    err_payload = {
        "id": completion_id,
        "object": "chat.completion.chunk",
        "created": created,
        "model": model,
        "error": {"message": message, "type": "agent_error"},
    }
    return f"data: {json.dumps(err_payload, ensure_ascii=False)}\n\n"


async def _stream_chat(prompt: str, model: str) -> AsyncIterator[str]:
    completion_id = f"chatcmpl-{uuid.uuid4().hex}"
    created = int(time.time())
    q: "queue.Queue[tuple[str, object] | None]" = queue.Queue()

    def worker() -> None:
        accumulated = ""
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
                accumulated, delta = merge_assistant_text(accumulated, text)
                if delta:
                    q.put(("delta", delta))
        except BaseException as e:  # noqa: BLE001 - 转给主流程统一上报
            logger.exception("agent worker 异常")
            q.put(("error", str(e) or e.__class__.__name__))
        finally:
            q.put(("done", last_result))
            q.put(None)

    threading.Thread(target=worker, daemon=True).start()

    yield _chunk_payload(
        completion_id,
        created,
        model,
        ChatCompletionDelta(role="assistant", content=""),
    )

    finish_reason: str = "stop"
    error_message: str | None = None
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
        elif kind == "error":
            error_message = str(payload)
            finish_reason = "error"
        elif kind == "done":
            res = payload if isinstance(payload, dict) else None
            if res and res.get("is_error"):
                finish_reason = "error"
                if not error_message:
                    error_message = str(res.get("result") or "agent reported error")

    if error_message:
        yield _error_chunk(completion_id, created, model, error_message)

    yield _chunk_payload(
        completion_id,
        created,
        model,
        ChatCompletionDelta(),
        finish_reason=finish_reason,
    )

    yield "data: [DONE]\n\n"


@app.get("/")
async def root() -> JSONResponse:
    return JSONResponse(
        {
            "service": "cursor-to-openai",
            "status": "ok",
            "endpoints": ["/v1/models", "/v1/chat/completions"],
        }
    )


@app.get("/healthz")
async def healthz() -> JSONResponse:
    return JSONResponse({"status": "ok"})


@app.get("/v1/models")
async def list_models() -> JSONResponse:
    try:
        raw_list = await asyncio.to_thread(_client.list_models)
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"列出模型失败: {e}") from e
    data = [ModelObject(**m) for m in raw_list]
    return JSONResponse(ModelListResponse(data=data).model_dump())


@app.post("/v1/chat/completions")
async def chat_completions(body: ChatCompletionRequest):
    if not body.messages:
        raise HTTPException(status_code=400, detail="messages 不能为空")

    prompt = messages_to_prompt(body.messages)
    model = body.model or "auto"

    if body.stream:
        return StreamingResponse(
            _stream_chat(prompt, model),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )

    try:
        text, result = await asyncio.to_thread(
            _client.collect_completion_text, prompt, model
        )
    except Exception as e:  # noqa: BLE001
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

    uvicorn.run(
        "app:app",
        host=os.environ.get("HOST", "0.0.0.0"),
        port=int(os.environ.get("PORT", "8080")),
        reload=False,
    )
