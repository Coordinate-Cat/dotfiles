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
var svelteLanguage_1 = require("../../../svelteLanguage");
var svelte2Language_1 = require("../../../svelte2Language");
var svelte3Language_1 = require("../../../svelte3Language");
var Utils_1 = require("../../Utils");
var Common_1 = require("../../Common");
var SvelteDocument_1 = require("../../../SvelteDocument");
var TagHelpers_1 = require("../TagHelpers");
var ComponentDefaultService = /** @class */ (function (_super) {
    __extends(ComponentDefaultService, _super);
    function ComponentDefaultService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentDefaultService.prototype.getCompletitionItems = function (document, context, workspace) {
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
        var defaultSlotMetadata = context.data.component.metadata.slotsMetadata.find(function (s) { return s.name === 'default'; });
        if (defaultSlotMetadata) {
            result.push.apply(result, defaultSlotMetadata.parameters
                .map(Utils_1.cloneCompletionItem)
                .map(function (item) {
                item.kind = vscode_languageserver_1.CompletionItemKind.Property;
                item.detail = '[Svelte] Slot prop';
                item.filterText = "let:" + item.label;
                item.sortText = "let:" + item.label;
                item.insertText = "let:" + item.label;
                item.commitCharacters = ['='];
                return item;
            }));
        }
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
        var versionsSpecific = [
            { version: SvelteDocument_1.SVELTE_VERSION_2, specific: svelte2Language_1.svelte2DefaultEventHandlerCompletionItem },
            { version: SvelteDocument_1.SVELTE_VERSION_3, specific: svelte3Language_1.svelte3DefaultEventHandlerCompletionItem }
        ];
        result.push.apply(result, [
            svelteLanguage_1.DefaultBindCompletionItem,
            svelteLanguage_1.getVersionSpecificSelection(document, versionsSpecific),
        ]);
        if (document.svelteVersion() === SvelteDocument_1.SVELTE_VERSION_2) {
            result.push(svelte2Language_1.svelte2DefaultRefCompletionItem);
        }
        else if (document.svelteVersion() === SvelteDocument_1.SVELTE_VERSION_3) {
            result.push(svelte3Language_1.svelte3DefaultBindInstanceCompletionItem);
            result.push(svelte3Language_1.svelte3DefaultSlotPropertyCompletionItem);
        }
        var nearestComponent = TagHelpers_1.findNearestOpenComponent(context.documentOffset - context.offset - 1, document, workspace.documentsCache);
        if (nearestComponent !== null && nearestComponent.metadata.slots.length > 0) {
            result.push.apply(result, [svelteLanguage_1.DefaultSlotCompletionItem].concat(nearestComponent.metadata.slots
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
    return ComponentDefaultService;
}(Common_1.BaseService));
exports.ComponentDefaultService = ComponentDefaultService;
//# sourceMappingURL=ComponentDefaultService.js.map