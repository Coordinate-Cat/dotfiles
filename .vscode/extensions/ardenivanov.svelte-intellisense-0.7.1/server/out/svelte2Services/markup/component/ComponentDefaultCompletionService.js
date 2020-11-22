"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_1 = require("vscode-languageserver");
var svelte2Language_1 = require("../../../svelte2Language");
var Utils_1 = require("../../Utils");
var Common_1 = require("../../Common");
var TagHelpers_1 = require("../TagHelpers");
var ComponentDefaultCompletionService = /** @class */ (function (_super) {
    __extends(ComponentDefaultCompletionService, _super);
    function ComponentDefaultCompletionService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentDefaultCompletionService.prototype.getCompletitionItems = function (document, context, workspace) {
        var result = [];
        result.push.apply(result, context.data.component.metadata.public_events
            .map(Utils_1.cloneCompletionItem)
            .map(function (item) {
            item.detail = '[Svelte] Event';
            item.filterText = "on:" + item.label;
            item.sortText = "on:" + item.label;
            item.insertText = "on:" + item.label;
            item.commitCharacters = ['='];
            return item;
        }));
        result.push.apply(result, context.data.component.metadata.public_data
            .map(Utils_1.cloneCompletionItem)
            .map(function (item) {
            item.kind = vscode_languageserver_1.CompletionItemKind.Property;
            item.detail = '[Svelte] Binding';
            item.filterText = "bind:" + item.label;
            item.sortText = "bind:" + item.label;
            item.insertText = "bind:" + item.label;
            item.commitCharacters = ['='];
            return item;
        }));
        result.push.apply(result, [
            svelte2Language_1.DefaultBindCompletionItem,
            svelte2Language_1.DefaultEventHandlerCompletionItem,
            svelte2Language_1.DefaultRefCompletionItem
        ]);
        var nearestComponent = TagHelpers_1.findNearestOpenComponent(context.documentOffset - context.offset - 1, document, workspace.documentsCache);
        if (nearestComponent !== null && nearestComponent.metadata.slots.length > 0) {
            result.push.apply(result, [svelte2Language_1.DefaultSlotCompletionItem].concat(nearestComponent.metadata.slots
                .map(Utils_1.cloneCompletionItem)
                .map(function (item) {
                item.detail = "[Svelte] Slot of " + nearestComponent.sveltedoc.name;
                item.filterText = "slot=\"" + item.label + "\"";
                item.sortText = "slot=\"" + item.label + "\"";
                item.insertText = "slot=\"" + item.label + "\"";
                return item;
            })));
        }
        return result;
    };
    return ComponentDefaultCompletionService;
}(Common_1.BaseService));
exports.ComponentDefaultCompletionService = ComponentDefaultCompletionService;
//# sourceMappingURL=ComponentDefaultCompletionService.js.map