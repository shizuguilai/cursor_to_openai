# Cursor CLI → OpenAI 兼容网关

在本地 **8080** 端口暴露 OpenAI Chat Completions / Models 兼容的 HTTP 接口，底层通过子进程驱动 Cursor CLI（`agent`），解析 `stream-json` 输出并按 OpenAI 协议返回。

> 已修复早期版本中“流式输出大段丢失 / 末尾重复”的解析 bug，并改用 `subprocess` 管道（无需伪 TTY），运行更稳健。

## 依赖

- 已安装并登录的 Cursor Agent CLI（本机可执行 `agent` 或 `cursor agent`，可用 `agent status` 验证）
- Python 3.10+

## 安装

```bash
cd /root/.openclaw/workspace/cursor_to_openai
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 环境变量（可选）

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `CURSOR_AGENT_BIN` | CLI 可执行名或完整命令字符串（支持空格/参数） | `agent` |
| `CURSOR_WORKSPACE` | 传给 `--workspace` 的路径 | 当前工作目录 |
| `CURSOR_AGENT_TIMEOUT` | 等待子进程结束的超时（秒） | `600` |
| `HOST` / `PORT` | uvicorn 监听地址 | `0.0.0.0` / `8080` |
| `LOG_LEVEL` | 日志级别 | `INFO` |

## 启动

```bash
uvicorn app:app --host 0.0.0.0 --port 8080
# 或
python app.py
```

## API

| 路径 | 方法 | 说明 |
|------|------|------|
| `/` | GET | 服务自检信息 |
| `/healthz` | GET | 健康检查 |
| `/v1/models` | GET | 执行 `agent models` 并解析为 OpenAI 模型列表 |
| `/v1/chat/completions` | POST | OpenAI Chat Completions 兼容接口；`stream:true` 时以 SSE 输出 `chat.completion.chunk`，并以 `data: [DONE]` 结尾 |

底层调用模板：

```bash
agent --print --output-format stream-json --stream-partial-output \
      --trust -f --workspace <CURSOR_WORKSPACE> \
      --model <model> "<拼接后的 prompt>"
```

## 验证

```bash
curl -s http://127.0.0.1:8080/v1/models | python3 -m json.tool
```

```bash
curl -s http://127.0.0.1:8080/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -d '{"model":"composer-2-fast","messages":[{"role":"user","content":"用一句话介绍你自己"}],"stream":false}' \
  | python3 -m json.tool
```

```bash
curl -N -s http://127.0.0.1:8080/v1/chat/completions \
  -H 'Content-Type: application/json' \
  -d '{"model":"composer-2-fast","messages":[{"role":"user","content":"数到3，每数一个数字换行"}],"stream":true}'
```

## 实现说明

- **多轮对话扁平化**：CLI 仅接受一段字符串 prompt，因此 `messages` 会被拼成 `ROLE:\n...` 的多段文本送入。
- **stream-json 增量识别**：CLI 在 `--stream-partial-output` 模式下既会发增量片段，也会在末尾追加一条完整文本作为汇总；网关用 `merge_assistant_text` 同时兼容这两种形态，避免重复或漏字。
- **`thinking` 事件被忽略**：仅将助手可见文本映射到 `delta.content`。
- **token usage**：来源于 `result` 事件中的 `usage.inputTokens / outputTokens`。
- **错误处理**：子进程异常退出或 `result.is_error` 时，非流式返回 5xx，流式以 `finish_reason="error"` 终止并下发 `error` chunk。
