"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svelteLanguage_1 = require("../../../svelteLanguage");
const TagHelpers_1 = require("../TagHelpers");
class HtmlTagDefaultCompletionService {
    isApplyable() {
        return true;
    }
    getCompletitionItems(document, position) {
        const result = [
            svelteLanguage_1.DefaultBindCompletionItem,
            svelteLanguage_1.DefaultClassCompletionItem,
            svelteLanguage_1.DefaultActionCompletionItem,
            svelteLanguage_1.DefaultRefCompletionItem
        ];
        result.push(...document.metadata.actions
            .map(this.cloneItem)
            .map(item => {
            item.filterText = `use:${item.label}`;
            item.sortText = `use:${item.label}`;
            item.insertText = `use:${item.label}`;
            item.commitCharacters = ['='];
            return item;
        }));
        const openTag = TagHelpers_1.findLastOpenTag(document, position.offset);
        result.push(...svelteLanguage_1.getHtmlTagDefaultBindCompletionItems(openTag.tagName)
            .map(this.cloneItem)
            .map(item => {
            item.filterText = `bind:${item.label}`;
            item.sortText = `bind:${item.label}`;
            item.insertText = `bind:${item.label}`;
            item.commitCharacters = ['='];
            return item;
        }));
        return result;
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
exports.HtmlTagDefaultCompletionService = HtmlTagDefaultCompletionService;
//# sourceMappingURL=HtmlTagDefaultCompletionService.js.map