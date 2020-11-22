"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
const BlockHelpers_1 = require("./BlockHelpers");
class BlockCloseCompletetionService {
    isApplyable(document, position) {
        return BlockHelpers_1.findNearestNotClosedBlock(document, position.offset) !== null
            && BlockHelpers_1.findLastCloseBlockIndex(document, position.offset) >= 0;
    }
    getCompletitionItems(document, position) {
        const notClosedBlock = BlockHelpers_1.findNearestNotClosedBlock(document, position.offset);
        if (notClosedBlock == null) {
            return [];
        }
        const startIndex = BlockHelpers_1.findLastCloseBlockIndex(document, position.offset);
        if (startIndex < 0) {
            return [];
        }
        const contentPart = document.content.substring(startIndex, position.offset);
        if (/{\/[\w\d_]*$/g.test(contentPart)) {
            return [
                {
                    label: notClosedBlock.blockName,
                    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
                    preselect: true,
                    commitCharacters: ['}']
                }
            ];
        }
        return [];
    }
}
exports.BlockCloseCompletetionService = BlockCloseCompletetionService;
//# sourceMappingURL=BlockCloseCompletionService.js.map