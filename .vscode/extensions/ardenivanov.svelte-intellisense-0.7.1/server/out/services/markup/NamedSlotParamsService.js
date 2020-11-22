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
var Common_1 = require("../Common");
var Utils_1 = require("../Utils");
var TagHelpers_1 = require("./TagHelpers");
var SvelteItemsHelpers_1 = require("../../SvelteItemsHelpers");
var svelteDocUtils_1 = require("../../svelteDocUtils");
var NamedSlotParamsService = /** @class */ (function (_super) {
    __extends(NamedSlotParamsService, _super);
    function NamedSlotParamsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NamedSlotParamsService.prototype.getCompletitionItems = function (document, context, workspace) {
        var index = TagHelpers_1.findLastDirectiveIndex(context.content, context.offset, 'let');
        if (index < 0) {
            return null;
        }
        var contentPart = context.content.substring(index, context.offset);
        if (/let:[\w\d_]*$/g.test(contentPart)) {
            var slotName_1 = TagHelpers_1.getNamedSlotName(context.content);
            if (!slotName_1) {
                return null;
            }
            var component_1 = TagHelpers_1.findNearestOpenComponent(context.documentOffset - context.offset - 1, document, workspace.documentsCache);
            if (component_1 === null) {
                return null;
            }
            var namedSlotMetadata = component_1.metadata.slotsMetadata.find(function (s) { return s.name === slotName_1; });
            if (!namedSlotMetadata) {
                return null;
            }
            return namedSlotMetadata.parameters
                .map(Utils_1.cloneCompletionItem)
                .map(function (item) {
                item.detail = "[Svelte] Prop of \"" + slotName_1 + "\" slot for " + component_1.sveltedoc.name;
                return item;
            }).slice();
        }
        return null;
    };
    NamedSlotParamsService.prototype.getHover = function (document, context, workspace) {
        var slotName = TagHelpers_1.getNamedSlotName(context.content);
        if (!slotName) {
            return null;
        }
        var component = TagHelpers_1.findNearestOpenComponent(context.documentOffset - context.offset - 1, document, workspace.documentsCache);
        if (component === null) {
            return null;
        }
        var slotDoc = this.getNamedSlotDocumentation(component, slotName);
        if (!slotDoc) {
            return null;
        }
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: slotDoc.parameters, handler: svelteDocUtils_1.buildSlotPerameterDocumentation }
        ], TagHelpers_1.getAttributeLetNameAtOffset(context));
    };
    NamedSlotParamsService.prototype.getDefinitions = function (document, context, workspace) {
        var slotName = TagHelpers_1.getNamedSlotName(context.content);
        if (!slotName) {
            return null;
        }
        var component = TagHelpers_1.findNearestOpenComponent(context.documentOffset - context.offset - 1, document, workspace.documentsCache);
        if (component === null) {
            return null;
        }
        var slotDoc = this.getNamedSlotDocumentation(component, slotName);
        if (!slotDoc) {
            return null;
        }
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(component, slotDoc.parameters, TagHelpers_1.getAttributeLetNameAtOffset(context));
    };
    NamedSlotParamsService.prototype.getNamedSlotDocumentation = function (component, name) {
        return component.sveltedoc.slots.find(function (s) { return s.name === name; });
    };
    return NamedSlotParamsService;
}(Common_1.BaseService));
exports.NamedSlotParamsService = NamedSlotParamsService;
//# sourceMappingURL=NamedSlotParamsService.js.map