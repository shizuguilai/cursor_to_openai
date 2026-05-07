import type { ModelListItem, ModelSelection } from "./options.js";
export interface LocalModelValidationOptions {
    listModels?: () => Promise<ModelListItem[]>;
}
export declare function resolveLocalModelSelection(selection: ModelSelection, options?: LocalModelValidationOptions): Promise<ModelSelection>;
//# sourceMappingURL=local-model-validation.d.ts.map