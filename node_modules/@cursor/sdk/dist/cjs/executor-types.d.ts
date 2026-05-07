import type { BlobStore } from "@anysphere/agent-kv";
import type { ConversationStateStructure } from "@anysphere/proto/agent/v1/agent_pb.js";
import type { AgentOptions, ModelSelection } from "./options.js";
import type { InteractionListener } from "./types/delta-types.js";
export interface RunExecutorInput {
    text: string;
    images?: Array<{
        type: "base64";
        data: string;
    }>;
}
export interface RunResultMetadata {
    status: string;
    result?: string;
    durationMs?: number;
    git?: {
        branches: Array<{
            repoUrl: string;
            branch?: string;
            prUrl?: string;
        }>;
    };
}
export interface RunExecutorOptions {
    sessionId?: string;
    model?: ModelSelection;
    apiKey: string;
    requestId?: string;
    initialState?: ConversationStateStructure;
    blobStore?: BlobStore;
    onCheckpoint?: (checkpoint: ConversationStateStructure) => void | Promise<void>;
}
export interface RunExecutorController {
    abort(): void;
    done: Promise<void>;
}
export type RunExecutor = (input: RunExecutorInput, opts: RunExecutorOptions, listener: InteractionListener) => Promise<RunExecutorController>;
export interface CloudWorkingLocation {
    type: "github";
    repository: string;
    ref?: string;
}
export interface CloudExecutorConfig {
    env?: {
        type: "cloud" | "pool" | "machine";
        name?: string;
    };
    repos: Array<{
        url: string;
        startingRef?: string;
        prUrl?: string;
    }>;
    workOnCurrentBranch?: boolean;
    autoCreatePR?: boolean;
    skipReviewerRequest?: boolean;
    model?: ModelSelection;
    mcpServers?: AgentOptions["mcpServers"];
}
//# sourceMappingURL=executor-types.d.ts.map