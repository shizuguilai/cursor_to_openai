import type { RunEventNotifier, RunEventOffset, RunEventStore, RunEventStreamStore, RunLifecycleStatus } from "@anysphere/cursor-sdk-local-runtime/run-store";
import { type SDKMessage } from "./messages.js";
export interface RunEventTailerStreamOptions {
    afterOffset?: RunEventOffset;
    limit?: number;
    mode?: "replay" | "tail" | "replay-and-tail";
    signal?: AbortSignal;
    pollIntervalMs?: number;
}
interface RunEventTailerOptions {
    eventStore: RunEventStore;
    eventStreamStore?: RunEventStreamStore;
    eventNotifier?: RunEventNotifier;
    loadRunStatus(runId: string): Promise<RunLifecycleStatus | undefined>;
    defaultPollIntervalMs?: number;
}
export declare class RunEventTailer {
    private readonly eventStore;
    private readonly eventStreamStore;
    private readonly eventNotifier;
    private readonly loadRunStatus;
    private readonly defaultPollIntervalMs;
    constructor(options: RunEventTailerOptions);
    streamRunEvents(runId: string, options?: RunEventTailerStreamOptions): AsyncGenerator<SDKMessage, void>;
    private streamAttachedRunEvents;
    private streamPolledRunEvents;
    private drainExistingEvents;
    private listAvailableEvents;
    private decodeRunEventRecord;
    private isTerminalAndDrained;
}
export {};
//# sourceMappingURL=run-event-tailer.d.ts.map