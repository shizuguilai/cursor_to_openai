"""通过 subprocess 调用 Cursor CLI (`agent`)。

行为说明：
- `agent --print --output-format stream-json --stream-partial-output ...` 在
  stdout 上每行输出一条 JSON。
- 每条 `assistant` 事件携带的是**增量 delta** 文本；最后还会追加一条
  *无* `timestamp_ms` 的、内容为完整文本的累计 event 作为汇总。
- `result` 事件包含最终完整文本与 token usage。

本模块负责：
1. 构造命令行 / 启动子进程 / 捕获并按行解析 stream-json。
2. 提供智能 delta 累积工具，兼容“增量” 与“累计”两种 event 形式。
3. 提供同步收敛函数 `collect_completion_text`，优先使用 `result.result`。
"""

from __future__ import annotations

import json
import os
import re
import shlex
import subprocess
from collections.abc import Iterator
from typing import Any

ANSI_ESCAPE = re.compile(r"\x1b\[[0-9;?]*[ -/]*[@-~]")


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

    def _build_chat_argv(self, prompt: str, model: str) -> list[str]:
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
        if model:
            extra.extend(["--model", model])
        extra.append(prompt)
        return self._resolve_argv(extra)

    def iter_stream_json_events(self, prompt: str, model: str) -> Iterator[dict[str, Any]]:
        """逐条 yield stream-json 事件。

        采用 ``subprocess.Popen`` + 管道，避免 PTY 折行/控制字符干扰。
        非 JSON 行（如 stderr 警告意外混入）将被静默跳过。
        """
        argv = self._build_chat_argv(prompt, model)
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

    def collect_completion_text(self, prompt: str, model: str) -> tuple[str, dict[str, Any] | None]:
        """同步聚合最终助手文本及最后一条 ``result`` 事件。"""
        accumulated = ""
        last_result: dict[str, Any] | None = None
        for event in self.iter_stream_json_events(prompt, model):
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
