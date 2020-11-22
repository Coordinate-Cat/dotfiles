"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svelteLanguage_1 = require("../../../svelteLanguage");
const BlockHelpers_1 = require("./BlockHelpers");
class BlockInnerCompletionService {
    isApplyable(document, position) {
        return BlockHelpers_1.findNearestNotClosedBlock(document, position.offset) !== null
            && BlockHelpers_1.findLastInnerBlockIndex(document, position.offset) >= 0;
    }
    getCompletitionItems(document, position) {
        const nearestBlock = BlockHelpers_1.findNearestNotClosedBlock(document, position.offset);
        if (nearestBlock == null) {
            return [];
        }
        if (!svelteLanguage_1.markupBlockInnerCompletitionItems.hasOwnProperty(nearestBlock.blockName)) {
            return [];
        }
        ;
        const openIndex = BlockHelpers_1.findLastInnerBlockIndex(document, position.offset);
        const contentPart = document.content.substring(openIndex, position.offset);
        if (/{:[\w\d_]*$/g.test(contentPart)) {
            return svelteLanguage_1.markupBlockInnerCompletitionItems[nearestBlock.blockName];
        }
        return [];
    }
}
exports.BlockInnerCompletionService = BlockInnerCompletionService;
//# sourceMappingURL=BlockInnerCompletionService.js.map