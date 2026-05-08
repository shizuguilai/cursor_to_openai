"""通过 subprocess 调用 Cursor CLI (`agent`)。

行为说明：
- `agent --print --output-format stream-json --stream-partial-output ...` 在
  stdout 上每行输出一条 JSON。
- 每条 `assistant` 事件携带的是**增量 delta** 文本；最后还会追加一条
  *无* `timestamp_ms` 的、内容为完整文本的累计 event 作为汇总。
- `result` 事件包含最终完整文本与 token usage。
- `agent create-chat` 会预创建一个空 chat 并把 chatId 打到 stdout，配合
  `agent --print --resume <chatId>` 可以让 Cursor 后端命中 prompt cache，
  显著降低 inputTokens 消耗。
"""

from __future__ import annotations

import json
import logging
import os
import queue
import re
import shlex
import subprocess
import threading
import time
from collections.abc import Iterator
from typing import Any

logger = logging.getLogger(__name__)

ANSI_ESCAPE = re.compile(r"\x1b\[[0-9;?]*[ -/]*[@-~]")
_UUID_RE = re.compile(r"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")


def strip_ansi(text: str) -> str:
    return ANSI_ESCAPE.sub("", text)


def _message_content_to_text(content: Any) -> str:
    if content is None:
        return ""
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts: list[str] = []
        for block in content:
            if isinstance(block, dict):
                if block.get("type") == "text" and "text" in block:
                    parts.append(str(block["text"]))
                elif "text" in block:
                    parts.append(str(block["text"]))
            elif isinstance(block, str):
                parts.append(block)
        return "\n".join(parts)
    return str(content)


def messages_to_prompt(messages: list[Any]) -> str:
    """将 OpenAI 风格多轮对话拼成单一 prompt（CLI 仅接收字符串参数）。"""
    chunks: list[str] = []
    for m in messages:
        if isinstance(m, dict):
            role = m.get("role")
            content = m.get("content")
        else:
            role = getattr(m, "role", None)
            content = getattr(m, "content", None)
        if not role:
            role = "user"
        text = _message_content_to_text(content)
        chunks.append(f"{str(role).upper()}:\n{text}")
    return "\n\n".join(chunks)


def parse_models_output(raw: str) -> list[dict[str, Any]]:
    text = strip_ansi(raw)
    models: list[dict[str, Any]] = []
    for line in text.splitlines():
        line = line.strip()
        if not line or line == "Available models" or line.startswith("Tip:"):
            continue
        m = re.match(r"^(\S+)\s+-\s+(.+)$", line)
        if not m:
            continue
        mid = m.group(1)
        models.append({"id": mid, "object": "model", "created": 0, "owned_by": "cursor"})
    return models


def merge_assistant_text(accumulated: str, incoming: str) -> tuple[str, str]:
    """把新到达的 assistant 文本合入累计串。

    返回 ``(new_accumulated, delta)``。CLI 在 ``--stream-partial-output`` 模式下
    既可能以增量发送（每条都是新片段），也会在末尾再追加一次完整文本作为汇总。
    本函数同时兼容两种形态：

    - 若 ``incoming == accumulated``：重复发送，返回空 delta。
    - 若 ``incoming`` 以 ``accumulated`` 开头：判定为累计模式，delta 取多出的尾巴。
    - 否则：判定为纯增量片段，直接拼接到 ``accumulated`` 末尾。
    """
    if not incoming:
        return accumulated, ""
    if incoming == accumulated:
        return accumulated, ""
    if accumulated and incoming.startswith(accumulated):
        return incoming, incoming[len(accumulated):]
    return accumulated + incoming, incoming


class CursorCliClient:
    def __init__(
        self,
        agent_bin: str | None = None,
        workspace: str | None = None,
        timeout: int | None = None,
    ) -> None:
        self.agent_bin = agent_bin or os.environ.get("CURSOR_AGENT_BIN", "agent")
        self.workspace = workspace or os.environ.get("CURSOR_WORKSPACE", os.getcwd())
        self.timeout = timeout or int(os.environ.get("CURSOR_AGENT_TIMEOUT", "600"))

    def _resolve_argv(self, extra: list[str]) -> list[str]:
        """允许 CURSOR_AGENT_BIN 配置带空格 / 参数的命令字符串。"""
        base = shlex.split(self.agent_bin) if self.agent_bin else ["agent"]
        return base + extra

    def list_models(self) -> list[dict[str, Any]]:
        argv = self._resolve_argv(["models"])
        proc = subprocess.run(
            argv,
            capture_output=True,
            text=True,
            timeout=120,
            check=False,
        )
        if proc.returncode != 0 and not proc.stdout:
            raise RuntimeError(
                f"`{' '.join(argv)}` 退出码 {proc.returncode}: {proc.stderr.strip() or '无 stderr'}"
            )
        return parse_models_output(proc.stdout)

    def create_chat(self) -> str:
        """调用 ``agent create-chat`` 预创建一个空 chat 并返回 chatId。"""
        argv = self._resolve_argv(["create-chat"])
        proc = subprocess.run(
            argv,
            capture_output=True,
            text=True,
            timeout=60,
            check=False,
        )
        if proc.returncode != 0:
            raise RuntimeError(
                f"create-chat 失败 ({proc.returncode}): {proc.stderr.strip()[:400] or '无 stderr'}"
            )
        for line in reversed(strip_ansi(proc.stdout).splitlines()):
            line = line.strip()
            if not line:
                continue
            m = _UUID_RE.search(line)
            if m:
                return m.group(0)
        raise RuntimeError(f"create-chat 输出未找到 chatId: {proc.stdout!r}")

    def _build_chat_argv(
        self,
        prompt: str,
        model: str,
        resume_chat_id: str | None = None,
    ) -> list[str]:
        extra = [
            "--print",
            "--output-format",
            "stream-json",
            "--stream-partial-output",
            "--trust",
            "-f",
            "--workspace",
            self.workspace,
        ]
        if resume_chat_id:
            extra.extend(["--resume", resume_chat_id])
        if model:
            extra.extend(["--model", model])
        extra.append(prompt)
        return self._resolve_argv(extra)

    def iter_stream_json_events(
        self,
        prompt: str,
        model: str,
        resume_chat_id: str | None = None,
    ) -> Iterator[dict[str, Any]]:
        """逐条 yield stream-json 事件。

        采用 ``subprocess.Popen`` + 管道，避免 PTY 折行/控制字符干扰。
        非 JSON 行（如 stderr 警告意外混入）将被静默跳过。
        """
        argv = self._build_chat_argv(prompt, model, resume_chat_id=resume_chat_id)
        proc = subprocess.Popen(
            argv,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            stdin=subprocess.DEVNULL,
            text=True,
            bufsize=1,
            cwd=self.workspace,
            env=os.environ.copy(),
        )
        assert proc.stdout is not None
        try:
            for raw_line in proc.stdout:
                line = raw_line.strip()
                if not line:
                    continue
                try:
                    yield json.loads(line)
                except json.JSONDecodeError:
                    continue
            try:
                proc.wait(timeout=self.timeout)
            except subprocess.TimeoutExpired:
                proc.kill()
                raise RuntimeError(f"agent 进程超时（>{self.timeout}s）")
            if proc.returncode not in (0, None):
                stderr_text = ""
                if proc.stderr is not None:
                    try:
                        stderr_text = proc.stderr.read() or ""
                    except Exception:
                        stderr_text = ""
                raise RuntimeError(
                    f"agent 进程异常退出 ({proc.returncode}): {stderr_text.strip()[:500] or '无 stderr'}"
                )
        finally:
            if proc.poll() is None:
                try:
                    proc.terminate()
                    proc.wait(timeout=5)
                except Exception:
                    try:
                        proc.kill()
                    except Exception:
                        pass
            for stream in (proc.stdout, proc.stderr):
                if stream is not None:
                    try:
                        stream.close()
                    except Exception:
                        pass

    def extract_assistant_text(self, event: dict[str, Any]) -> str | None:
        if event.get("type") != "assistant":
            return None
        msg = event.get("message") or {}
        if msg.get("role") != "assistant":
            return None
        content = msg.get("content")
        if not isinstance(content, list):
            return None
        texts: list[str] = []
        for block in content:
            if isinstance(block, dict) and block.get("type") == "text":
                texts.append(str(block.get("text", "")))
        if not texts:
            return None
        return "".join(texts)

    def collect_completion_text(
        self,
        prompt: str,
        model: str,
        resume_chat_id: str | None = None,
    ) -> tuple[str, dict[str, Any] | None]:
        """同步聚合最终助手文本及最后一条 ``result`` 事件。"""
        accumulated = ""
        last_result: dict[str, Any] | None = None
        for event in self.iter_stream_json_events(
            prompt, model, resume_chat_id=resume_chat_id
        ):
            if event.get("type") == "result":
                last_result = event
                continue
            text = self.extract_assistant_text(event)
            if text is None:
                continue
            accumulated, _ = merge_assistant_text(accumulated, text)
        if last_result and isinstance(last_result.get("result"), str) and last_result["result"]:
            return last_result["result"], last_result
        return accumulated, last_result


class ChatSessionPool:
    """复用一组 Cursor chat session 以降低 token 消耗。

    设计取舍（**仅适用于单/少用户场景**）：

    - 池内每个 chatId 通过 ``agent create-chat`` 预创建。
    - 每次请求 acquire 一个 chatId，调用方将其作为 ``--resume`` 参数发起一次
      ``agent --print``；调用结束后归还。
    - 每个 chatId 累计使用 ``max_uses`` 次后丢弃，由后台线程异步补充新的，避免
      Cursor 端历史无限累积。
    - acquire 在 ``timeout`` 内拿不到空闲 chatId 时返回 ``None``；调用方应当
      回退到无 ``--resume`` 的 stateless 模式，保证可用性。
    - 因为 OpenAI 协议是 stateless 的（每次都带完整 messages），与 chat session
      的 stateful 行为存在天然冗余；本池子主要价值是命中 Cursor 端的 prompt
      cache 来降低计费 token，而非语义上的"上下文持久化"。
    """

    def __init__(
        self,
        client: CursorCliClient,
        size: int = 1,
        max_uses: int = 20,
    ) -> None:
        self.client = client
        self.size = max(1, size)
        self.max_uses = max(1, max_uses)
        self._available: queue.Queue[str] = queue.Queue()
        self._lock = threading.Lock()
        self._uses: dict[str, int] = {}
        self._created_total = 0
        self._discarded_total = 0
        self._fallback_total = 0

    def warmup(self) -> None:
        """同步预创建 ``size`` 个 chatId（建议在后台线程里调）。"""
        for _ in range(self.size):
            self._spawn_one()

    def _spawn_one(self) -> str | None:
        try:
            chat_id = self.client.create_chat()
        except Exception as e:  # noqa: BLE001
            logger.warning("ChatSessionPool: 创建 chat 失败: %s", e)
            return None
        with self._lock:
            self._uses[chat_id] = 0
            self._created_total += 1
        self._available.put(chat_id)
        logger.info("ChatSessionPool: 新增 chat=%s", chat_id)
        return chat_id

    def _replenish_async(self) -> None:
        threading.Thread(target=self._spawn_one, daemon=True).start()

    def acquire(self, timeout: float = 5.0) -> str | None:
        """获取一个可复用的 chatId；超时则返回 None（调用方 fallback）。"""
        try:
            return self._available.get(timeout=timeout)
        except queue.Empty:
            with self._lock:
                self._fallback_total += 1
            logger.info("ChatSessionPool: 池子空闲超时，本次 fallback 到 stateless 调用")
            return None

    def release(self, chat_id: str | None) -> None:
        """归还 chatId；超过 ``max_uses`` 则丢弃并异步补充新的。"""
        if not chat_id:
            return
        with self._lock:
            uses = self._uses.get(chat_id, 0) + 1
            if uses >= self.max_uses:
                self._uses.pop(chat_id, None)
                self._discarded_total += 1
                logger.info(
                    "ChatSessionPool: 丢弃 chat=%s (已用 %d 次，达上限)", chat_id, uses
                )
                self._replenish_async()
                return
            self._uses[chat_id] = uses
        self._available.put(chat_id)

    def stats(self) -> dict[str, Any]:
        with self._lock:
            return {
                "size": self.size,
                "max_uses": self.max_uses,
                "available": self._available.qsize(),
                "in_use": max(0, len(self._uses) - self._available.qsize()),
                "created_total": self._created_total,
                "discarded_total": self._discarded_total,
                "fallback_total": self._fallback_total,
                "uses": dict(self._uses),
                "warmed_at": time.time(),
            }
