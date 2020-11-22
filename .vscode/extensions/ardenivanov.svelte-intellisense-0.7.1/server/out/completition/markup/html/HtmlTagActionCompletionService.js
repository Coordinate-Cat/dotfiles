"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TagHelpers_1 = require("../TagHelpers");
class HtmlTagActionCompletionService {
    isApplyable(document, position) {
        return TagHelpers_1.findLastDirectiveIndex(document, position.offset, 'use') >= 0;
    }
    getCompletitionItems(document, position) {
        const index = TagHelpers_1.findLastDirectiveIndex(document, position.offset, 'use');
        if (index < 0) {
            return [];
        }
        const contentPart = document.content.substring(index, position.offset);
        if (/use:[\w\d_]*$/g.test(contentPart)) {
            return document.metadata.actions;
        }
        return [];
    }
}
exports.HtmlTagActionCompletionService = HtmlTagActionCompletionService;
//# sourceMappingURL=HtmlTagActionCompletionService.js.map