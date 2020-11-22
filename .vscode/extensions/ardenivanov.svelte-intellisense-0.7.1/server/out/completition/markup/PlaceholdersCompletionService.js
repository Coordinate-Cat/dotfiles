"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svelteLanguage_1 = require("../../svelteLanguage");
class PlaceholdersCompletionService {
    isApplyable(document, position) {
        return this.findLastOpenPlaceholderIndex(document, position.offset) >= 0;
    }
    getCompletitionItems(document, position) {
        const openIndex = this.findLastOpenPlaceholderIndex(document, position.offset);
        if (openIndex < 0) {
            return [];
        }
        const contentPart = document.content.substring(openIndex, position.offset);
        if (/{@[\w\d_]*$/.test(contentPart)) {
            return svelteLanguage_1.PlaceholderModifiers;
        }
        const result = [
            ...document.metadata.data,
            ...document.metadata.computed,
            ...document.metadata.helpers,
        ];
        if (openIndex + 1 === position.offset) {
            result.push(...svelteLanguage_1.PlaceholderModifiers
                .map(this.cloneItem)
                .map(item => {
                item.insertText = `@${item.label}`;
                item.filterText = `@${item.label}`;
                return item;
            }));
        }
        return result;
    }
    findLastOpenPlaceholderIndex(document, offset) {
        const openIndex = document.content.lastIndexOf('{', offset);
        if (openIndex < 0) {
            return -1;
        }
        const endIndex = document.content.indexOf('}', openIndex);
        if (endIndex > 0 && endIndex < offset) {
            return -1;
        }
        return openIndex;
    }
    cloneItem(item) {
        return {
            additionalTextEdits: item.additionalTextEdits,
            command: item.command,
            commitCharacters: item.commitCharacters,
            data: item.data,
            deprecated: item.deprecated,
            detail: item.detail,
            documentation: item.documentation,
            filterText: item.filterText,
            insertText: item.insertText,
            insertTextFormat: item.insertTextFormat,
            kind: item.kind,
            label: item.label,
            preselect: item.preselect,
            sortText: item.sortText,
            textEdit: item.textEdit
        };
    }
}
exports.PlaceholdersCompletionService = PlaceholdersCompletionService;
//# sourceMappingURL=PlaceholdersCompletionService.js.map