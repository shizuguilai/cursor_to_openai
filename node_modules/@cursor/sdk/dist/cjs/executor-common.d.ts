import type { AgentClient } from "@anysphere/agent-client";
import { PrivacyMode } from "@anysphere/proto/aiserver/v1/privacy_mode_pb.js";
import type { Transport } from "@connectrpc/connect";
export declare const backendUrl: string;
export declare let ghostModeHeaderValue: string;
export declare const ghostModeHeaderCache: Map<string, string>;
export declare const getGhostModeHeaderFromPrivacyMode: (privacyMode: PrivacyMode | undefined) => string;
export declare function exchangeApiKeyForAccessToken(apiKeyToExchange: string, baseUrl: string): Promise<string | undefined>;
export declare function setGhostModeHeaderForApiKey(apiKey: string, headerValue: string): void;
export declare const getCachedGhostModeHeader: (apiKey?: string) => string;
export declare function getSdkClientVersionHeader(): string;
export declare function ensureGhostModeHeaderForApiKey(apiKey?: string): Promise<void>;
export declare function buildTransport(apiKey: string): Transport;
export declare function createRetryingAgentClient(initialClient: AgentClient, refreshClient: () => AgentClient): AgentClient;
export declare function detectImageMimeType(bytes: Uint8Array): string | undefined;
//# sourceMappingURL=executor-common.d.ts.map