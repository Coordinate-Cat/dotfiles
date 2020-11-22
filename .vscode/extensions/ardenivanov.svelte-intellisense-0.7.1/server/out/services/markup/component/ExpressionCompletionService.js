"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("../../Common");
const svelteLanguage_1 = require("../../../svelteLanguage");
class ExpressionCompletionService extends Common_1.BaseService {
    getCompletitionItems(document, context) {
        const index = this.findLastOpenExpressionIndex(context.content, context.offset);
        if (index < 0) {
            return null;
        }
        const result = [
            ...document.metadata.data,
            ...document.metadata.computed,
            ...document.metadata.methods,
            ...document.metadata.helpers,
            ...svelteLanguage_1.DefaultComponentMethods
        ];
        return result;
    }
    findLastOpenExpressionIndex(content, offset) {
        const openIndex = content.lastIndexOf('"', offset);
        if (openIndex < 0) {
            return -1;
        }
        const endIndex = content.indexOf('"', openIndex);
        if (endIndex > 0 && endIndex < offset) {
            return -1;
        }
        const spaceIndex = content.lastIndexOf(' ', openIndex);
        if (spaceIndex < 0) {
            return -1;
        }
        if (content.startsWith('on:', spaceIndex + 1)) {
            return openIndex + 1;
        }
        return -1;
    }
}
exports.ExpressionCompletionService = ExpressionCompletionService;
//# sourceMappingURL=ExpressionCompletionService.js.map