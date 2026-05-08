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
| `MODELS_CACHE_TTL` | `/v1/models` 内存缓存秒数，0 关闭 | `300` |
| `AGENT_POOL_ENABLED` | 是否启用 chat session 池（复用 chatId 命中 Cursor 端 prompt cache） | `1` |
| `AGENT_POOL_SIZE` | 池中常驻 chatId 数量 | `1` |
| `AGENT_POOL_MAX_USES` | 单个 chatId 的最大使用次数，超出后丢弃重建 | `20` |
| `AGENT_POOL_ACQUIRE_TIMEOUT` | 等待空闲 chatId 的秒数；超时则本次回退到 stateless 调用 | `5` |

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
| `/v1/models` | GET | 执行 `agent models` 并解析为 OpenAI 模型列表（带内存缓存） |
| `/v1/chat/completions` | POST | OpenAI Chat Completions 兼容接口；`stream:true` 时以 SSE 输出 `chat.completion.chunk`，并以 `data: [DONE]` 结尾 |
| `/v1/pool` | GET | 查看 chat session 池的运行时状态（已创建数 / 在用数 / 丢弃次数 / fallback 次数） |

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

## 客户端接入配置

适用于以 `provider / base_url / api / api_key / model` 风格描述上游的客户端（如部分聚合面板、桌面 LLM 客户端等）。本网关 **未做鉴权**，`api_key` 字段必须给一个非空字符串以通过客户端自身的格式校验，写什么都行。

推荐的最小配置（以 `composer-2-fast` 为例）：

```json
{
  "provider": "cursor-local",
  "base_url": "http://127.0.0.1:8080/v1",
  "api": "openai-completions",
  "api_key": "sk-local-no-auth",
  "model": {
    "id": "composer-2-fast",
    "name": "Cursor: Composer 2 Fast"
  }
}
```

可用 `model.id`（与 `GET /v1/models` 返回一致）：

| `model.id` | 推荐 `model.name` |
|------------|-------------------|
| `auto` | Cursor: Auto |
| `composer-2-fast` | Cursor: Composer 2 Fast |
| `composer-2` | Cursor: Composer 2 |
| `grok-4.3` | xAI: Grok 4.3 1M |
| `kimi-k2.5` | Moonshot: Kimi K2.5 |

`base_url` 按部署位置选择：

| 场景 | `base_url` |
|------|-----------|
| 同机访问 | `http://127.0.0.1:8080/v1` |
| 局域网另一台机器（服务监听 `0.0.0.0`） | `http://<本机内网IP>:8080/v1` |
| 公网访问 | 建议在前面套反向代理 + 鉴权后再暴露 |

模拟"客户端来访"的快速验证：

```bash
curl -s http://127.0.0.1:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-local-no-auth" \
  -d '{"model":"composer-2-fast","messages":[{"role":"user","content":"hi"}]}' \
  | python3 -m json.tool
```

## 实现说明

- **多轮对话扁平化**：CLI 仅接受一段字符串 prompt，因此 `messages` 会被拼成 `ROLE:\n...` 的多段文本送入。
- **stream-json 增量识别**：CLI 在 `--stream-partial-output` 模式下既会发增量片段，也会在末尾追加一条完整文本作为汇总；网关用 `merge_assistant_text` 同时兼容这两种形态，避免重复或漏字。
- **`thinking` 事件被忽略**：仅将助手可见文本映射到 `delta.content`。
- **token usage**：来源于 `result` 事件中的 `usage.inputTokens / outputTokens`。
- **错误处理**：子进程异常退出或 `result.is_error` 时，非流式返回 5xx，流式以 `finish_reason="error"` 终止并下发 `error` chunk。

## Chat Session 池（适合单/少用户）

`agent` CLI 没有 daemon 模式，每次 `--print` 调用都会**冷启动**一次 Node 进程（≈1s）+ Cursor 客户端 init（≈1.5s），加上模型生成本身的 5–6s，单次端到端通常在 7–10s。本地侧能优化的主要是前两段。

为此网关内置了一个 **chat session 池**：

1. 启动时通过 `agent create-chat` 预创建若干 chatId（数量由 `AGENT_POOL_SIZE` 控制）。
2. 每次请求租用一个空闲 chatId，作为 `agent --print --resume <chatId>` 的参数发起调用。
3. 调用结束归还；累计使用 `AGENT_POOL_MAX_USES` 次后丢弃，由后台线程异步补充新的，避免历史无限累积。
4. 拿不到空闲 chatId（超时）时，自动回退到无 `--resume` 的 stateless 调用，**不影响可用性**。

实测收益：

| 调用 | `inputTokens` | `cacheReadTokens` |
|------|---------------|-------------------|
| 首次 `--resume` | ~4660 | ~6600 |
| 第二次复用同 chatId | ~280 | ~11100 |

> 即"挂钟时间"基本不变（远端推理是大头），但 Cursor 后端的 prompt cache 命中率显著提升，**计费输入 token 大幅下降**，配额/限流更友好。

由于 OpenAI 协议是 stateless 的（每次都带完整 messages），与 chat session 的 stateful 行为存在天然冗余；本池子的主要价值是命中 prompt cache 而非"语义上的上下文持久化"。需要严格隔离/多租户场景请通过 `AGENT_POOL_ENABLED=0` 关闭。

可在 `GET /v1/pool` 实时查看池状态：

```bash
curl -s http://127.0.0.1:8080/v1/pool | python3 -m json.tool
```
