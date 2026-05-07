import { type RuntimeCustomSubagentDefinition } from "@anysphere/cursor-sdk-local-runtime";
import type { RunExecutor } from "./executor-types.js";
import type { McpServerConfig, SandboxOptions, SettingSource } from "./options.js";
export interface LocalExecutorHandle {
    run: RunExecutor;
    reload(): Promise<void>;
    dispose(): Promise<void>;
}
export interface CreateLocalExecutorOptions {
    readonly workingDirectory?: string;
    readonly apiKey?: string;
    readonly settingSources?: readonly SettingSource[];
    readonly sandboxOptions?: SandboxOptions;
    readonly mcpServers?: Record<string, McpServerConfig>;
    readonly customSubagents?: readonly RuntimeCustomSubagentDefinition[];
}
export declare function createLocalExecutor(optionsOrWorkingDirectory?: CreateLocalExecutorOptions | string, apiKey?: string): Promise<LocalExecutorHandle>;
//# sourceMappingURL=local-executor.d.ts.map