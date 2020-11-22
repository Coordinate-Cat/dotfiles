"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseComponentCompletionService_1 = require("./BaseComponentCompletionService");
class ComponentDataCompletionService extends BaseComponentCompletionService_1.BaseComponentCompletionService {
    isApplyable() {
        return true;
    }
    getCompletitionItems() {
        return this.componentDocument.metadata.public_data;
    }
}
exports.ComponentDataCompletionService = ComponentDataCompletionService;
//# sourceMappingURL=ComponentDataCompletionService.js.map