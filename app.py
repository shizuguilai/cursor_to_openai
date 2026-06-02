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
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse

from cursor_client import (
    ChatSessionPool,
    CursorCliClient,
    merge_assistant_text,
    messages_to_prompt,
)
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


def _env_bool(name: str, default: bool) -> bool:
    val = os.environ.get(name)
    if val is None:
        return default
    return val.strip().lower() in ("1", "true", "yes", "on", "y")


_client = CursorCliClient()

POOL_ENABLED = _env_bool("AGENT_POOL_ENABLED", True)
POOL_SIZE = max(1, int(os.environ.get("AGENT_POOL_SIZE", "1")))
POOL_MAX_USES = max(1, int(os.environ.get("AGENT_POOL_MAX_USES", "20")))
POOL_ACQUIRE_TIMEOUT = float(os.environ.get("AGENT_POOL_ACQUIRE_TIMEOUT", "5"))

MODELS_CACHE_TTL = max(0, int(os.environ.get("MODELS_CACHE_TTL", "300")))

_pool: ChatSessionPool | None = (
    ChatSessionPool(_client, size=POOL_SIZE, max_uses=POOL_MAX_USES)
    if POOL_ENABLED
    else None
)

_models_cache: tuple[float, list[dict]] | None = None
_models_cache_lock = threading.Lock()

# 模型校验缓存：请求的模型不在 agent 实际可用列表时回退到 auto，
# 这样上游（如 openclaw）配置了已被 Cursor 重命名/下线的模型也不会整体失败。
_VALID_MODELS_TTL = 300
_valid_models_cache: tuple[float, set[str]] | None = None
_valid_models_lock = threading.Lock()


def _available_model_ids() -> set[str]:
    global _valid_models_cache
    now = time.time()
    with _valid_models_lock:
        cached = _valid_models_cache
    if cached and now - cached[0] < _VALID_MODELS_TTL:
        return cached[1]
    try:
        raw = _client.list_models()
        ids = {m["id"] for m in raw if m.get("id")}
    except Exception as e:  # noqa: BLE001
        logger.warning("获取可用模型失败，跳过模型校验: %s", e)
        return cached[1] if cached else set()
    with _valid_models_lock:
        _valid_models_cache = (now, ids)
    return ids


def _resolve_model(requested: str | None) -> str:
    """把请求模型解析为一个 agent 当前确实支持的模型；无效则回退到 auto。"""
    model = (requested or "auto").strip() or "auto"
    ids = _available_model_ids()
    if not ids:
        # 列不出可用模型（agent 异常等），不拦截，交给下游报真实错误
        return model
    if model in ids:
        return model
    logger.info(
        "请求模型 %r 不在可用列表，回退到 auto（当前可用: %s）",
        model,
        ", ".join(sorted(ids)),
    )
    return "auto"


@asynccontextmanager
async def _lifespan(_app: FastAPI):
    if _pool is not None:
        logger.info(
            "ChatSessionPool 启用：size=%d, max_uses=%d，正在后台预热…",
            POOL_SIZE,
            POOL_MAX_USES,
        )
        asyncio.create_task(asyncio.to_thread(_pool.warmup))
    if MODELS_CACHE_TTL > 0:
        asyncio.create_task(asyncio.to_thread(_warm_models_cache))
    yield


def _warm_models_cache() -> None:
    global _models_cache
    try:
        raw = _client.list_models()
    except Exception as e:  # noqa: BLE001
        logger.warning("预热 models 缓存失败: %s", e)
        return
    with _models_cache_lock:
        _models_cache = (time.time(), raw)
    logger.info("models 缓存已预热，共 %d 个模型", len(raw))


app = FastAPI(title="Cursor CLI OpenAI Adapter", version="0.3.0", lifespan=_lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


def _acquire_chat_id() -> str | None:
    if _pool is None:
        return None
    return _pool.acquire(timeout=POOL_ACQUIRE_TIMEOUT)


def _release_chat_id(chat_id: str | None) -> None:
    if _pool is None or chat_id is None:
        return
    _pool.release(chat_id)


async def _stream_chat(prompt: str, model: str) -> AsyncIterator[str]:
    completion_id = f"chatcmpl-{uuid.uuid4().hex}"
    created = int(time.time())
    q: "queue.Queue[tuple[str, object] | None]" = queue.Queue()

    chat_id = await asyncio.to_thread(_acquire_chat_id)

    def worker() -> None:
        accumulated = ""
        last_result: dict | None = None
        try:
            for event in _client.iter_stream_json_events(
                prompt, model, resume_chat_id=chat_id
            ):
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
        except BaseException as e:  # noqa: BLE001
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
    try:
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
    finally:
        await asyncio.to_thread(_release_chat_id, chat_id)

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
            "endpoints": ["/v1/models", "/v1/chat/completions", "/v1/pool"],
            "chat_session_pool": _pool is not None,
        }
    )


@app.get("/healthz")
async def healthz() -> JSONResponse:
    return JSONResponse({"status": "ok"})


@app.get("/v1/pool")
async def pool_status() -> JSONResponse:
    if _pool is None:
        return JSONResponse({"enabled": False})
    stats = _pool.stats()
    return JSONResponse({"enabled": True, **stats})


@app.get("/v1/models")
async def list_models() -> JSONResponse:
    global _models_cache
    if MODELS_CACHE_TTL > 0:
        with _models_cache_lock:
            cached = _models_cache
        if cached and time.time() - cached[0] < MODELS_CACHE_TTL:
            data = [ModelObject(**m) for m in cached[1]]
            return JSONResponse(ModelListResponse(data=data).model_dump())
    try:
        raw_list = await asyncio.to_thread(_client.list_models)
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"列出模型失败: {e}") from e
    if MODELS_CACHE_TTL > 0:
        with _models_cache_lock:
            _models_cache = (time.time(), raw_list)
    data = [ModelObject(**m) for m in raw_list]
    return JSONResponse(ModelListResponse(data=data).model_dump())


@app.post("/v1/chat/completions")
async def chat_completions(body: ChatCompletionRequest):
    if not body.messages:
        raise HTTPException(status_code=400, detail="messages 不能为空")

    prompt = messages_to_prompt(body.messages)
    model = await asyncio.to_thread(_resolve_model, body.model)

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

    chat_id = await asyncio.to_thread(_acquire_chat_id)
    try:
        text, result = await asyncio.to_thread(
            _client.collect_completion_text, prompt, model, chat_id
        )
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"agent 执行失败: {e}") from e
    finally:
        await asyncio.to_thread(_release_chat_id, chat_id)

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
