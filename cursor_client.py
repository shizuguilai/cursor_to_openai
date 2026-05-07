"""通过 pexpect 在伪 TTY 下驱动 Cursor CLI (`agent`)。"""

from __future__ import annotations

import json
import os
import re
from collections.abc import Iterator
from typing import Any

import pexpect

ANSI_ESCAPE = re.compile(r"\x1b\[[0-9;?]*[ -/]*[@-~]")


def strip_ansi(text: str) -> str:
    return ANSI_ESCAPE.sub("", text)


def _message_content_to_text(content: str | list[dict[str, Any]]) -> str:
    if isinstance(content, str):
        return content
    parts: list[str] = []
    for block in content:
        if not isinstance(block, dict):
            continue
        if block.get("type") == "text" and "text" in block:
            parts.append(str(block["text"]))
    return "\n".join(parts)


def messages_to_prompt(messages: list[Any]) -> str:
    """将 OpenAI 风格多轮对话拼成单一 prompt（CLI 仅接收字符串参数）。"""
    chunks: list[str] = []
    for m in messages:
        role = getattr(m, "role", None) or m.get("role")
        content = getattr(m, "content", None) if not isinstance(m, dict) else m.get("content")
        text = _message_content_to_text(content)
        chunks.append(f"{role.upper()}:\n{text}")
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
        mid, _name = m.group(1), m.group(2).strip()
        models.append({"id": mid, "object": "model", "created": 0, "owned_by": "cursor"})
    return models


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

    def list_models(self) -> list[dict[str, Any]]:
        cmd = f"{self.agent_bin} models"
        out = pexpect.run(cmd, encoding="utf-8", timeout=120)
        return parse_models_output(out)

    def _spawn_args(self, prompt: str, model: str) -> list[str]:
        args: list[str] = [
            self.agent_bin,
            "--print",
            "--output-format",
            "stream-json",
            "--stream-partial-output",
            "--trust",
            "-f",
            "--workspace",
            self.workspace,
            "--model",
            model,
            prompt,
        ]
        return args

    def iter_stream_json_events(self, prompt: str, model: str) -> Iterator[dict[str, Any]]:
        argv = self._spawn_args(prompt, model)
        child = pexpect.spawn(
            argv[0],
            argv[1:],
            encoding="utf-8",
            timeout=self.timeout,
            dimensions=(24, 200),
            cwd=self.workspace,
        )
        try:
            while True:
                line = child.readline()
                if line == "":
                    break
                line = line.strip()
                if not line:
                    continue
                try:
                    yield json.loads(line)
                except json.JSONDecodeError:
                    continue
        finally:
            try:
                child.close(force=True)
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
        """返回最终助手文本及最后一条 result 事件（若有 usage）。"""
        full = ""
        last_result: dict[str, Any] | None = None
        for event in self.iter_stream_json_events(prompt, model):
            if event.get("type") == "result":
                last_result = event
            text = self.extract_assistant_text(event)
            if text is not None:
                full = text
        return full, last_result
