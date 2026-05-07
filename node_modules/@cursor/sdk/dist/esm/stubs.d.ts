import type { AgentMessage, AgentOperationOptions, CursorRequestOptions, GetAgentMessagesOptions, GetAgentOptions, GetRunOptions, ListAgentsOptions, ListResult, ListRunsOptions, SDKAgent, SDKAgentInfo, SDKModel, SDKRepository, SDKUser, SendOptions } from "./agent.js";
import type { SDKArtifact } from "./artifacts.js";
import { ConfigurationError } from "./errors.js";
import type { SDKMessage } from "./messages.js";
import type { AgentOptions, SDKUserMessage } from "./options.js";
import type { Run, RunOperation, RunResult, RunStatus } from "./run.js";
import type { ConversationTurn } from "./types/conversation-types.js";
export declare function createUnimplementedError(apiName: string): ConfigurationError;
export declare class UnimplementedRun implements Run {
    readonly id = "unimplemented-run";
    readonly agentId = "unimplemented-agent";
    readonly result: undefined;
    readonly model: undefined;
    readonly durationMs: undefined;
    readonly git: undefined;
    supports(_operation: RunOperation): boolean;
    unsupportedReason(operation: RunOperation): string | undefined;
    stream(): AsyncGenerator<SDKMessage, void>;
    conversation(): Promise<ConversationTurn[]>;
    wait(): Promise<RunResult>;
    cancel(): Promise<void>;
    get status(): RunStatus;
    onDidChangeStatus(_listener: (status: RunStatus) => void): () => void;
}
export declare class UnimplementedAgent implements SDKAgent {
    readonly agentId = "unimplemented-agent";
    readonly model: undefined;
    send(_message: string | SDKUserMessage, _options?: SendOptions): Promise<Run>;
    close(): void;
    reload(): Promise<void>;
    [Symbol.asyncDispose](): Promise<void>;
    listArtifacts(): Promise<SDKArtifact[]>;
    downloadArtifact(_path: string): Promise<Buffer>;
}
export declare class Agent {
    private constructor();
    /**
     * Create an agent instance.
     */
    static create(options: AgentOptions): Promise<SDKAgent>;
    /**
     * Resume an existing agent by ID.
     */
    static resume(agentId: string, options?: Partial<AgentOptions>): Promise<SDKAgent>;
    /**
     * Convenience API to create an agent, run one prompt, and close.
     */
    static prompt(message: string, options?: AgentOptions): Promise<RunResult>;
    static list(options?: ListAgentsOptions): Promise<ListResult<SDKAgentInfo>>;
    static listRuns(agentId: string, options?: ListRunsOptions): Promise<ListResult<Run>>;
    static getRun(runId: string, options?: GetRunOptions): Promise<Run>;
    /**
     * Fetch a single agent's metadata by ID. Cloud-only — local agent lookup
     * is a post-launch followup.
     */
    static get(agentId: string, options?: GetAgentOptions): Promise<SDKAgentInfo>;
    /**
     * Archive an agent. Cloud-only.
     */
    static archive(agentId: string, options?: AgentOperationOptions): Promise<void>;
    /**
     * Unarchive a previously archived agent. Cloud-only.
     */
    static unarchive(agentId: string, options?: AgentOperationOptions): Promise<void>;
    /**
     * Delete an agent. Cloud-only and irreversible.
     */
    static delete(agentId: string, options?: AgentOperationOptions): Promise<void>;
    static readonly messages: {
        list(agentId: string, options?: GetAgentMessagesOptions): Promise<AgentMessage[]>;
    };
}
/**
 * Account and platform-level operations. Namespaced separately from `Agent`
 * because these concerns (the calling user, available models, connected
 * repositories) aren't scoped to a specific agent.
 */
export declare class Cursor {
    private constructor();
    /**
     * Get metadata about the authenticated user / API key.
     */
    static me(options?: CursorRequestOptions): Promise<SDKUser>;
    /**
     * List models available to the authenticated user.
     */
    static readonly models: {
        list(options?: CursorRequestOptions): Promise<SDKModel[]>;
    };
    /**
     * List GitHub repositories the authenticated user has connected to Cursor.
     */
    static readonly repositories: {
        list(options?: CursorRequestOptions): Promise<SDKRepository[]>;
    };
}
//# sourceMappingURL=stubs.d.ts.map