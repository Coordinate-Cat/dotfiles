"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseComponentCompletionService_1 = require("./BaseComponentCompletionService");
const TagHelpers_1 = require("../TagHelpers");
class ComponentBindCompletionService extends BaseComponentCompletionService_1.BaseComponentCompletionService {
    isApplyable(document, position) {
        return TagHelpers_1.findLastDirectiveIndex(document, position.offset, 'bind') >= 0;
    }
    getCompletitionItems(document, position) {
        const index = TagHelpers_1.findLastDirectiveIndex(document, position.offset, 'bind');
        if (index < 0) {
            return [];
        }
        const contentPart = document.content.substring(index, position.offset);
        if (/bind:[\w\d_]*$/g.test(contentPart)) {
            return this.componentDocument.metadata.public_data;
        }
        return [];
    }
}
exports.ComponentBindCompletionService = ComponentBindCompletionService;
//# sourceMappingURL=ComponentBindCompletionService.js.map