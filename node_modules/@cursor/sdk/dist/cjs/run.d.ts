import { ConfigurationError } from "./errors.js";
import type { SDKMessage } from "./messages.js";
import type { ModelSelection } from "./options.js";
import type { ConversationTurn } from "./types/conversation-types.js";
export type RunStatus = "running" | "finished" | "error" | "cancelled";
export type RunResultStatus = Exclude<RunStatus, "running">;
export type RunOperation = "stream" | "wait" | "cancel" | "conversation";
export declare class UnsupportedRunOperationError extends ConfigurationError {
    constructor(operation: RunOperation, reason?: string);
}
export interface RunGitBranchInfo {
    repoUrl: string;
    branch?: string;
    prUrl?: string;
}
export interface RunGitInfo {
    branches: RunGitBranchInfo[];
}
export interface RunResult {
    id: string;
    status: RunResultStatus;
    result?: string;
    model?: ModelSelection;
    durationMs?: number;
    git?: RunGitInfo;
}
export interface Run {
    readonly id: string;
    readonly agentId: string;
    supports(operation: RunOperation): boolean;
    unsupportedReason(operation: RunOperation): string | undefined;
    stream(): AsyncGenerator<SDKMessage, void>;
    conversation(): Promise<ConversationTurn[]>;
    wait(): Promise<RunResult>;
    cancel(): Promise<void>;
    readonly status: RunStatus;
    onDidChangeStatus(listener: (status: RunStatus) => void): () => void;
    readonly result?: string;
    readonly model?: ModelSelection;
    readonly durationMs?: number;
    readonly git?: RunGitInfo;
    readonly createdAt?: number;
}
//# sourceMappingURL=run.d.ts.map