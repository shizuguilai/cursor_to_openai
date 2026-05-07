# Cursor CLI OpenAI 兼容网关

在本地 **8080** 端口提供与 OpenAI Chat Completions / Models 类似的 HTTP 接口，底层通过 **pexpect** 在伪 TTY 中调用 Cursor CLI（`agent`），解析 `stream-json` 输出并映射为 OpenAI 格式。

## 依赖

- 已安装并登录的 Cursor Agent CLI（本机可执行 `agent` 或 `cursor agent`）
- Python 3.10+

## 安装

```bash
cd /root/.openclaw/workspace/cursor_to_openai
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 环境变量（可选）

| 变量 | 说明 |
|------|------|
| `CURSOR_AGENT_BIN` | CLI 可执行名或路径，默认 `agent` |
| `CURSOR_WORKSPACE` | `--workspace`，默认当前工作目录 |
| `CURSOR_AGENT_TIMEOUT` | pexpect 超时（秒），默认 `600` |

## 启动

```bash
uvicorn app:app --host 0.0.0.0 --port 8080
```

或：

```bash
python app.py
```

## API

- `GET /v1/models`：执行 `agent models`，解析为 OpenAI 模型列表。
- `POST /v1/chat/completions`：将 `messages` 拼成多轮文本后调用  
  `agent --print --output-format stream-json --stream-partial-output --trust -f --workspace … --model … <prompt>`。  
  `stream: true` 时以 **SSE** 返回 `chat.completion.chunk` 行，并以 `data: [DONE]` 结束。

## 验证命令

```bash
curl -s http://127.0.0.1:8080/v1/models | python3 -m json.tool
```

```bash
curl -s http://127.0.0.1:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"composer-2-fast","messages":[{"role":"user","content":"用一句话介绍你自己"}],"stream":false}' | python3 -m json.tool
```

```bash
curl -N -s http://127.0.0.1:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"composer-2-fast","messages":[{"role":"user","content":"数到3，每数一个数字换行"}],"stream":true}'
```

## 说明

- 多轮对话在服务端被格式化为 `ROLE:\n...` 拼接的单一 prompt；复杂工具调用与原生 OpenAI 行为不完全一致。
- 流式输出会忽略 CLI 中的 `thinking` 事件，仅将助手可见文本映射为 `delta.content`。
