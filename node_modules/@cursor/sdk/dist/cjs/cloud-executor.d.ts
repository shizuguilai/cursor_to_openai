import { type CloudApiClient } from "./cloud-api-client.js";
import type { CloudExecutorConfig, RunExecutor } from "./executor-types.js";
import type { InteractionUpdate } from "./types/delta-types.js";
type ToolCallStatus = "running" | "completed" | "error";
export declare function mapV1RunStreamEventToSdkUpdate(raw: unknown): (InteractionUpdate & {
    status?: ToolCallStatus;
}) | null | undefined;
export interface CloudExecutorCallbacks {
    onAgentCreated?: (agentId: string) => void;
    onRunCreated?: (runId: string) => void;
}
export declare function createCloudExecutor(client: CloudApiClient, config: CloudExecutorConfig, callbacks?: CloudExecutorCallbacks): Promise<RunExecutor>;
export {};
//# sourceMappingURL=cloud-executor.d.ts.map