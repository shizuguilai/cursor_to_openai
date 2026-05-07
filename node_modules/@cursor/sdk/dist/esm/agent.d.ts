import type { McpServerConfig, ModelListItem, ModelSelection, SDKUserMessage } from "./options.js";
import type { Run } from "./run.js";
import type { ConversationStep } from "./types/conversation-types.js";
import type { InteractionUpdate } from "./types/delta-types.js";
export interface SDKAgent {
    readonly agentId: string;
    /**
     * The agent's current model selection. Updated after each successful
     * `send({ model })`; `undefined` until something sets it.
     */
    readonly model: ModelSelection | undefined;
    send(message: string | SDKUserMessage, options?: SendOptions): Promise<Run>;
    close(): void;
    reload(): Promise<void>;
    [Symbol.asyncDispose](): Promise<void>;
    listArtifacts(): Promise<import("./artifacts.js").SDKArtifact[]>;
    downloadArtifact(path: string): Promise<Buffer>;
}
export interface SendOptions {
    model?: ModelSelection;
    mcpServers?: Record<string, McpServerConfig>;
    onStep?: (args: {
        step: ConversationStep;
    }) => void | Promise<void>;
    onDelta?: (args: {
        update: InteractionUpdate;
    }) => void | Promise<void>;
    /**
     * Per-send options that only apply to local agents. Nested to make the
     * local-only scope explicit at the type level — cloud callers cannot
     * pass these fields.
     */
    local?: {
        /**
         * Expire the currently active persisted run, if any, before starting
         * this message as a new follow-up run. Recovery path for local agents
         * left wedged after a crashed CLI process. Cloud enforces a busy-run
         * check server-side (`409 agent_busy`), so no equivalent is needed.
         */
        force?: boolean;
    };
}
export type ListAgentsOptions = {
    limit?: number;
    cursor?: string;
} & ({
    runtime?: undefined;
} | {
    runtime: "local";
    cwd?: string;
} | {
    runtime: "cloud";
    prUrl?: string;
    includeArchived?: boolean;
    apiKey?: string;
});
export interface ListResult<T> {
    items: T[];
    nextCursor?: string;
}
export type SDKAgentInfo = {
    agentId: string;
    name: string;
    summary: string;
    lastModified: number;
    status?: "running" | "finished" | "error";
    createdAt?: number;
    /**
     * True when the agent has been archived via `Agent.archive(...)`. Distinct
     * from `status` (which reflects the most recent run's execution state).
     * Backwards-compatible optional field; undefined on older shapes.
     */
    archived?: boolean;
} & ({
    runtime?: undefined;
} | {
    runtime: "local";
    cwd?: string;
} | {
    runtime: "cloud";
    env?: {
        type: "cloud" | "pool" | "machine";
        name?: string;
    };
    repos?: string[];
});
export type ListRunsOptions = {
    limit?: number;
    cursor?: string;
} & ({
    runtime?: "local";
    cwd?: string;
} | {
    runtime: "cloud";
    apiKey?: string;
});
export interface GetAgentMessagesOptions {
    limit?: number;
    offset?: number;
    runtime?: "local";
    cwd?: string;
}
export type GetRunOptions = {
    runtime?: "local";
    cwd?: string;
} | {
    runtime: "cloud";
    agentId: string;
    apiKey?: string;
};
export interface AgentMessage {
    type: "user" | "assistant";
    uuid: string;
    agent_id: string;
    message: unknown;
}
/**
 * Options for `Agent.get` / `Agent.archive` / `Agent.unarchive` /
 * `Agent.delete`.
 *
 * Runtime is auto-detected from the agent ID: IDs that start with `"bc-"`
 * route to the Cursor cloud API, everything else routes to the local store.
 *
 * - `cwd` is used when routing to the local store (defaults to `process.cwd()`).
 * - `apiKey` is used when routing to the cloud API (falls back to
 *   `process.env.CURSOR_API_KEY`).
 */
export interface GetAgentOptions {
    cwd?: string;
    apiKey?: string;
}
export interface AgentOperationOptions {
    cwd?: string;
    apiKey?: string;
}
/**
 * Options for cloud-only account/catalog operations (Cursor.me, Cursor.models.list,
 * Cursor.repositories.list). If `apiKey` is omitted, falls back to
 * `process.env.CURSOR_API_KEY`.
 */
export interface CursorRequestOptions {
    apiKey?: string;
}
export interface SDKUser {
    /** Display name of the API key used to authenticate the request. */
    apiKeyName: string;
    /**
     * Numeric Cursor user id of the API key's owner. `undefined` for team /
     * service-account API keys, which aren't tied to a specific user.
     */
    userId?: number;
    /** Email of the user that owns the API key, when available. */
    userEmail?: string;
    /** First name of the user that owns the API key, when available. */
    userFirstName?: string;
    /** Last name of the user that owns the API key, when available. */
    userLastName?: string;
    /** ISO 8601 timestamp of when the API key was created. */
    createdAt: string;
}
export interface SDKRepository {
    url: string;
}
/**
 * An entry returned by `Cursor.models.list()`. The `model` field is a
 * canonical `{ id, params }` that can be passed straight to `createAgent`.
 */
export type SDKModel = ModelListItem;
//# sourceMappingURL=agent.d.ts.map