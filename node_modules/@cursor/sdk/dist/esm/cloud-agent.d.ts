import type { AgentOperationOptions, CursorRequestOptions, GetAgentOptions, GetRunOptions, ListAgentsOptions, ListResult, ListRunsOptions, SDKAgent, SDKAgentInfo, SDKModel, SDKRepository, SDKUser } from "./agent.js";
import type { AgentOptions } from "./options.js";
import type { Run } from "./run.js";
export declare function createCloudAgent(options: AgentOptions): SDKAgent;
export declare function resumeCloudAgent(agentId: string, options: Partial<AgentOptions>): SDKAgent;
export declare function listCloudAgents(options: Extract<ListAgentsOptions, {
    runtime: "cloud";
}>): Promise<ListResult<SDKAgentInfo>>;
export declare function listCloudRuns(agentId: string, options: Extract<ListRunsOptions, {
    runtime: "cloud";
}>): Promise<ListResult<Run>>;
export declare function getCloudRun(runId: string, options: Extract<GetRunOptions, {
    runtime: "cloud";
}>): Promise<Run>;
export declare function getCloudAgent(agentId: string, options: GetAgentOptions): Promise<SDKAgentInfo>;
export declare function archiveCloudAgent(agentId: string, options: AgentOperationOptions): Promise<void>;
export declare function unarchiveCloudAgent(agentId: string, options: AgentOperationOptions): Promise<void>;
export declare function deleteCloudAgent(agentId: string, options: AgentOperationOptions): Promise<void>;
export declare function getCloudMe(options: CursorRequestOptions): Promise<SDKUser>;
export declare function listCloudModels(options: CursorRequestOptions): Promise<SDKModel[]>;
export declare function listCloudRepositories(options: CursorRequestOptions): Promise<SDKRepository[]>;
//# sourceMappingURL=cloud-agent.d.ts.map