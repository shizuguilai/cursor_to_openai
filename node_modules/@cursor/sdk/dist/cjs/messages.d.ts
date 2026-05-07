import type { ModelSelection } from "./options.js";
import type { RunResultStatus } from "./run.js";
export declare const LOCAL_RUN_STREAM_SCHEMA_VERSION = 1;
export declare const LOCAL_RUN_STREAM_EVENT_TYPE = "run_stream_event";
export interface TextBlock {
    type: "text";
    text: string;
}
export interface ToolUseBlock {
    type: "tool_use";
    id: string;
    name: string;
    input: unknown;
}
export interface SDKSystemMessage {
    type: "system";
    subtype?: "init";
    agent_id: string;
    run_id: string;
    model?: ModelSelection;
    tools?: string[];
}
export interface SDKAssistantMessage {
    type: "assistant";
    agent_id: string;
    run_id: string;
    message: {
        role: "assistant";
        content: Array<TextBlock | ToolUseBlock>;
    };
}
export interface SDKUserMessageEvent {
    type: "user";
    agent_id: string;
    run_id: string;
    message: {
        role: "user";
        content: TextBlock[];
    };
}
export interface SDKToolUseMessage {
    type: "tool_call";
    agent_id: string;
    run_id: string;
    call_id: string;
    name: string;
    status: "running" | "completed" | "error";
    args?: unknown;
    result?: unknown;
    truncated?: {
        args?: boolean;
        result?: boolean;
    };
}
export interface SDKThinkingMessage {
    type: "thinking";
    agent_id: string;
    run_id: string;
    text: string;
    thinking_duration_ms?: number;
}
export interface SDKStatusMessage {
    type: "status";
    agent_id: string;
    run_id: string;
    status: "CREATING" | "RUNNING" | "FINISHED" | "ERROR" | "CANCELLED" | "EXPIRED";
    message?: string;
}
export interface SDKRequestMessage {
    type: "request";
    agent_id: string;
    run_id: string;
    request_id: string;
}
export interface SDKTaskMessage {
    type: "task";
    agent_id: string;
    run_id: string;
    status?: string;
    text?: string;
}
export type SDKMessage = SDKSystemMessage | SDKUserMessageEvent | SDKAssistantMessage | SDKToolUseMessage | SDKThinkingMessage | SDKStatusMessage | SDKRequestMessage | SDKTaskMessage;
export interface LocalRunStreamSdkMessageEvent {
    schemaVersion: typeof LOCAL_RUN_STREAM_SCHEMA_VERSION;
    type: "sdk_message";
    agentId: string;
    runId: string;
    message: SDKMessage;
}
export interface LocalRunStreamResultEvent {
    schemaVersion: typeof LOCAL_RUN_STREAM_SCHEMA_VERSION;
    type: "result";
    agentId: string;
    runId: string;
    status: RunResultStatus;
    errorCode?: string;
}
export interface LocalRunStreamDoneEvent {
    schemaVersion: typeof LOCAL_RUN_STREAM_SCHEMA_VERSION;
    type: "done";
    agentId: string;
    runId: string;
}
export type LocalRunStreamEvent = LocalRunStreamSdkMessageEvent | LocalRunStreamResultEvent | LocalRunStreamDoneEvent;
export declare function createSdkMessageRunStreamEvent(message: SDKMessage): LocalRunStreamSdkMessageEvent;
export declare function decodeLocalRunStreamEvent(payload: unknown): LocalRunStreamEvent;
export declare function localRunStreamEventToSdkMessage(event: LocalRunStreamEvent): SDKMessage | undefined;
export declare function decodeSdkMessageRunStreamEvent(payload: unknown): SDKMessage;
export declare function isTerminalLocalRunStreamEvent(event: LocalRunStreamEvent): boolean;
//# sourceMappingURL=messages.d.ts.map