"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseComponentCompletionService_1 = require("./BaseComponentCompletionService");
const svelteLanguage_1 = require("../../../svelteLanguage");
class ComponentDefaultCompletionService extends BaseComponentCompletionService_1.BaseComponentCompletionService {
    isApplyable() {
        return true;
    }
    getCompletitionItems() {
        const result = [];
        result.push(...this.componentDocument.metadata.public_events
            .map(this.cloneItem)
            .map(item => {
            item.filterText = `on:${item.label}`;
            item.sortText = `on:${item.label}`;
            item.insertText = `on:${item.label}`;
            item.commitCharacters = ['='];
            return item;
        }));
        result.push(...this.componentDocument.metadata.public_data
            .map(this.cloneItem)
            .map(item => {
            item.filterText = `bind:${item.label}`;
            item.sortText = `bind:${item.label}`;
            item.insertText = `bind:${item.label}`;
            item.commitCharacters = ['='];
            return item;
        }));
        result.push(...[
            svelteLanguage_1.DefaultBindCompletionItem,
            svelteLanguage_1.DefaultEventHandlerCompletionItem,
            svelteLanguage_1.DefaultRefCompletionItem
        ]);
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
exports.ComponentDefaultCompletionService = ComponentDefaultCompletionService;
//# sourceMappingURL=ComponentDefaultCompletionService.js.map