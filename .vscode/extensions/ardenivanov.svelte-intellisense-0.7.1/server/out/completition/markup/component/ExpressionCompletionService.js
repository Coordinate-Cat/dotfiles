"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svelteLanguage_1 = require("../../../svelteLanguage");
class ExpressionCompletionService {
    isApplyable(document, position) {
        return this.findLastOpenExpressionIndex(document, position.offset) >= 0;
    }
    getCompletitionItems(document) {
        const result = [
            ...document.metadata.data,
            ...document.metadata.computed,
            ...document.metadata.methods,
            ...document.metadata.helpers,
            ...svelteLanguage_1.DefaultComponentMethods
        ];
        return result;
    }
    findLastOpenExpressionIndex(document, offset) {
        const openIndex = document.content.lastIndexOf('"', offset);
        if (openIndex < 0) {
            return -1;
        }
        const endIndex = document.content.indexOf('"', openIndex);
        if (endIndex > 0 && endIndex < offset) {
            return -1;
        }
        const spaceIndex = document.content.lastIndexOf(' ', openIndex);
        if (spaceIndex < 0) {
            return -1;
        }
        if (document.content.startsWith('on:', spaceIndex + 1)) {
            return openIndex + 1;
        }
        return -1;
    }
}
exports.ExpressionCompletionService = ExpressionCompletionService;
//# sourceMappingURL=ExpressionCompletionService.js.map