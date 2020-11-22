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
var Common_1 = require("../../Common");
var svelteLanguage_1 = require("../../../svelteLanguage");
var svelte2Language_1 = require("../../../svelte2Language");
var svelte3Language_1 = require("../../../svelte3Language");
var SvelteDocument_1 = require("../../../SvelteDocument");
var Utils_1 = require("../../Utils");
var TagHelpers_1 = require("../TagHelpers");
var HtmlTagDefaultService = /** @class */ (function (_super) {
    __extends(HtmlTagDefaultService, _super);
    function HtmlTagDefaultService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlTagDefaultService.prototype.getCompletitionItems = function (document, context, workspace) {
        var classVersionsSpecific = [
            { version: SvelteDocument_1.SVELTE_VERSION_2, specific: svelte2Language_1.svelte2DefaultClassCompletionItem },
            { version: SvelteDocument_1.SVELTE_VERSION_3, specific: svelte3Language_1.svelte3DefaultClassCompletionItem }
        ];
        var actionVersionsSpecific = [
            { version: SvelteDocument_1.SVELTE_VERSION_2, specific: svelte2Language_1.svelte2DefaultActionCompletionItem },
            { version: SvelteDocument_1.SVELTE_VERSION_3, specific: svelte3Language_1.svelte3DefaultActionCompletionItem }
        ];
        var htmlTagVersionsSpecific = [
            { version: SvelteDocument_1.SVELTE_VERSION_2, specific: svelte2Language_1.svelte2DefaultHtmlTagBindCompletionItems },
            { version: SvelteDocument_1.SVELTE_VERSION_3, specific: svelte3Language_1.svelte3DefaultHtmlTagBindCompletionItems }
        ];
        var result = [
            svelteLanguage_1.DefaultBindCompletionItem,
            svelteLanguage_1.getVersionSpecificSelection(document, classVersionsSpecific),
            svelteLanguage_1.getVersionSpecificSelection(document, actionVersionsSpecific)
        ].concat(svelteLanguage_1.DefaultTransitionCompletionItems);
        if (document.svelteVersion() === SvelteDocument_1.SVELTE_VERSION_2) {
            result.push(svelte2Language_1.svelte2DefaultRefCompletionItem);
        }
        // Document metadata can be is not parsed for this moment, we should check
        if (document.metadata) {
            result.push.apply(result, document.metadata.actions
                .map(Utils_1.cloneCompletionItem)
                .map(function (item) {
                item.filterText = "use:" + item.label;
                item.sortText = "use:" + item.label;
                item.insertText = "use:" + item.label;
                item.commitCharacters = ['='];
                return item;
            }));
        }
        result.push.apply(result, svelteLanguage_1.getHtmlTagDefaultBindCompletionItems(context.data.name, svelteLanguage_1.getVersionSpecificSelection(document, htmlTagVersionsSpecific))
            .map(Utils_1.cloneCompletionItem)
            .map(function (item) {
            item.filterText = "bind:" + item.label;
            item.sortText = "bind:" + item.label;
            item.insertText = "bind:" + item.label;
            item.commitCharacters = ['='];
            return item;
        }));
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
            var slotName_1 = TagHelpers_1.getNamedSlotName(context.content);
            if (slotName_1) {
                var namedSlotMetadata_1 = nearestComponent.metadata.slotsMetadata.find(function (s) { return s.name === slotName_1; });
                if (namedSlotMetadata_1) {
                    result.push.apply(result, [svelte3Language_1.svelte3DefaultSlotPropertyCompletionItem].concat(namedSlotMetadata_1.parameters
                        .map(Utils_1.cloneCompletionItem)
                        .map(function (item) {
                        item.detail = "[Svelte] Prop of slot " + namedSlotMetadata_1.name + " for " + nearestComponent.sveltedoc.name;
                        item.filterText = "let:" + item.label;
                        item.sortText = "let:\"" + item.label;
                        item.insertText = "let:" + item.label;
                        return item;
                    })));
                }
            }
        }
        return result;
    };
    return HtmlTagDefaultService;
}(Common_1.BaseService));
exports.HtmlTagDefaultService = HtmlTagDefaultService;
//# sourceMappingURL=HtmlTagDefaultService.js.map