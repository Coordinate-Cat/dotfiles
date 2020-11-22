"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TagHelpers_1 = require("./TagHelpers");
const svelteLanguage_1 = require("../../svelteLanguage");
class OpenTagCompletionService {
    isApplyable(document, position) {
        const openIndex = TagHelpers_1.findLastOpenTagIndex(document, position.offset);
        if (openIndex < 0) {
            return false;
        }
        const spaceIndex = document.content.indexOf(' ', openIndex);
        if (spaceIndex > 0 && spaceIndex < position.offset) {
            return false;
        }
        return true;
    }
    getCompletitionItems(document, position) {
        const openIndex = TagHelpers_1.findLastOpenTagIndex(document, position.offset);
        if (openIndex < 0) {
            return [];
        }
        const tagContent = document.content.substring(openIndex, position.offset);
        const match = /<([\w\d_]+:)?[\w\d_]*$/g.exec(tagContent);
        if (match) {
            if (match[1] === `${svelteLanguage_1.SpecialComponentNamespace}:`) {
                return [
                    ...svelteLanguage_1.SpecialComponents
                ];
            }
            if (!match[1]) {
                return [
                    ...document.metadata.components,
                    ...svelteLanguage_1.SpecialComponents
                        .map(this.cloneItem)
                        .map(item => {
                        item.filterText = `${svelteLanguage_1.SpecialComponentNamespace}:${item.label}`;
                        item.sortText = `${svelteLanguage_1.SpecialComponentNamespace}:${item.label}`;
                        item.insertText = `${svelteLanguage_1.SpecialComponentNamespace}:${item.label}`;
                        return item;
                    })
                ];
            }
        }
        return [];
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
exports.OpenTagCompletionService = OpenTagCompletionService;
//# sourceMappingURL=OpenTagCompletionService.js.map