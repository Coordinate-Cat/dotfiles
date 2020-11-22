"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svelteLanguage_1 = require("../../../svelteLanguage");
const BlockHelpers_1 = require("./BlockHelpers");
class BlockOpenCompletionService {
    isApplyable(document, position) {
        return BlockHelpers_1.findLastOpenBlockIndex(document, position.offset) >= 0;
    }
    getCompletitionItems(document, position) {
        const openBlockIndex = BlockHelpers_1.findLastOpenBlockIndex(document, position.offset);
        if (openBlockIndex < 0) {
            return [];
        }
        const blockContent = document.content.substring(openBlockIndex, position.offset);
        if (/^{#([\w\d_]*)$/g.test(blockContent)) {
            return svelteLanguage_1.markupBlockCompletitionItems;
        }
        return [];
    }
}
exports.BlockOpenCompletionService = BlockOpenCompletionService;
//# sourceMappingURL=BlockOpenCompletionService.js.map