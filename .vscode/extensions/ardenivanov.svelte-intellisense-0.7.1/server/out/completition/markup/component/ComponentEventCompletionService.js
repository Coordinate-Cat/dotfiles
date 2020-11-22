"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseComponentCompletionService_1 = require("./BaseComponentCompletionService");
const TagHelpers_1 = require("../TagHelpers");
class ComponentEventCompletionService extends BaseComponentCompletionService_1.BaseComponentCompletionService {
    isApplyable(document, position) {
        return TagHelpers_1.findLastDirectiveIndex(document, position.offset, 'on') >= 0;
    }
    getCompletitionItems(document, position) {
        const index = TagHelpers_1.findLastDirectiveIndex(document, position.offset, 'on');
        if (index < 0) {
            return [];
        }
        const contentPart = document.content.substring(index, position.offset);
        if (/on:[\w\d_]*$/g.test(contentPart)) {
            return this.componentDocument.metadata.public_events;
        }
        return [];
    }
}
exports.ComponentEventCompletionService = ComponentEventCompletionService;
//# sourceMappingURL=ComponentEventCompletionService.js.map