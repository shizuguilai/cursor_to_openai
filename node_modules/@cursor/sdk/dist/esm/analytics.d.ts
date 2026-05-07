import { type TokenProvider } from "@anysphere/analytics-client";
/**
 * Drains buffered SDK analytics events for every apiKey that has emitted
 * anything in this process. Called from `agent[Symbol.asyncDispose]()`.
 *
 * `timeoutMs` bounds the wait; if the RPC hangs, flush aborts via the
 * internal AbortController and returns. Never throws.
 */
export declare function flushSdkAnalytics(timeoutMs?: number): Promise<void>;
export declare function __resetAnalyticsForTests(): void;
/**
 * Four dispatch targets, flattened into one field so a single
 * `WHERE runtime = 'X'` or `WHERE runtime != 'local'` query covers both
 * "which execution environment?" and "is this local?" questions without
 * awkwardly repeating "cloud" at two nesting levels.
 */
export type SdkRuntime = "local" | "cloud" | "pool" | "machine";
/**
 * Base props auto-merged into every SDK event by the analytics wrapper.
 * Callers never pass these. Kept as an interface (not derived) so the DBT
 * generator at `scripts/generate-dbt-from-analytics-types.ts` can resolve
 * them — its AST walker only looks at interface declarations in the same
 * source file.
 */
export interface SdkAnalyticsBaseProps {
    /** Runtime surface emitting telemetry. Always "sdk" for this package. */
    surface: "sdk";
    /** Version of @cursor/sdk that emitted the event. */
    sdk_version: string;
    /** Node process.platform (e.g., "darwin", "linux", "win32"). */
    os_platform: string;
    /** Node process.arch (e.g., "x64", "arm64"). */
    os_arch: string;
}
export interface SdkRunCreatedProps {
    agent_id: string;
    run_id: string;
    runtime: SdkRuntime;
    model: string;
    /**
     * JSON-encoded `ModelSelection.params` (`[{ id, value }, ...]`) when the
     * caller supplied any. Omitted when no params were set.
     */
    model_params?: string;
    prompt_length: number;
    has_images: boolean;
    is_resume: boolean;
    mcp_server_count: number;
    cloud_repo_count?: number;
    cloud_auto_create_pr?: boolean;
}
export interface SdkRunCompletedProps {
    agent_id: string;
    run_id: string;
    runtime: SdkRuntime;
    end_reason: "success" | "error" | "abort";
}
/**
 * Schema consumed by the DBT generator. The runtime emit path in this file
 * auto-merges SdkAnalyticsBaseProps into every event, so this intersection
 * mirrors the actual wire shape and generates the right SQL columns.
 *
 * Do not reference this from runtime code — it exists purely for dbt.
 */
export type SdkAnalyticsEventSchema = {
    "sdk.run.created": SdkAnalyticsBaseProps & SdkRunCreatedProps;
    "sdk.run.completed": SdkAnalyticsBaseProps & SdkRunCompletedProps;
};
export declare function trackSdkRunCreated(apiKey: string | undefined, props: SdkRunCreatedProps): void;
export declare function trackSdkRunCompleted(apiKey: string | undefined, props: SdkRunCompletedProps): void;
export type { TokenProvider };
//# sourceMappingURL=analytics.d.ts.map