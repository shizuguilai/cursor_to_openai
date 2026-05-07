import type { V1CustomSubagent } from "./cloud-api-client.js";
import type { AgentDefinition } from "./options.js";
export interface SDKCustomSubagentDefinition {
    name: string;
    description: string;
    prompt: string;
    model: string;
}
/**
 * Convert SDK `AgentOptions.agents` to a plain, serializable custom subagent
 * shape. Inline `McpServerConfig` entries on a subagent are rejected; SDK
 * custom subagents inherit the parent agent's MCP config.
 */
export declare function convertAgentDefinitionsToCustomSubagents(agents: Record<string, AgentDefinition> | undefined): SDKCustomSubagentDefinition[] | undefined;
/**
 * Convert SDK `AgentOptions.agents` to the `V1CustomSubagent[]` shape the
 * cloud API expects.
 */
export declare function convertAgentDefinitionsToV1CustomSubagents(agents: Record<string, AgentDefinition> | undefined): V1CustomSubagent[] | undefined;
//# sourceMappingURL=subagent-conversion.d.ts.map