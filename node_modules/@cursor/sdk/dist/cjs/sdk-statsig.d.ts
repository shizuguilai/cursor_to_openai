export interface SdkStatsigClient {
    checkFeatureGate(gateName: string): boolean;
    getDynamicConfigValue<T>(params: {
        configName: string;
        paramName: string;
        defaultValue: T;
    }): T;
}
export declare function bootstrapSdkStatsig(apiKey: string): Promise<SdkStatsigClient>;
//# sourceMappingURL=sdk-statsig.d.ts.map