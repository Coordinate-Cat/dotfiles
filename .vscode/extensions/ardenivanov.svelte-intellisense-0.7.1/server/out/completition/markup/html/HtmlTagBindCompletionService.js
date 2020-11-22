"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TagHelpers_1 = require("../TagHelpers");
const svelteLanguage_1 = require("../../../svelteLanguage");
class HtmlTagBindCompletionService {
    isApplyable(document, position) {
        return TagHelpers_1.findLastDirectiveIndex(document, position.offset, 'bind') >= 0;
    }
    getCompletitionItems(document, position) {
        const index = TagHelpers_1.findLastDirectiveIndex(document, position.offset, 'bind');
        if (index < 0) {
            return [];
        }
        const openTag = TagHelpers_1.findLastOpenTag(document, position.offset);
        const contentPart = document.content.substring(index, position.offset);
        if (/bind:[\w\d_]*$/g.test(contentPart)) {
            return svelteLanguage_1.getHtmlTagDefaultBindCompletionItems(openTag.tagName);
        }
        return [];
    }
}
exports.HtmlTagBindCompletionService = HtmlTagBindCompletionService;
//# sourceMappingURL=HtmlTagBindCompletionService.js.map