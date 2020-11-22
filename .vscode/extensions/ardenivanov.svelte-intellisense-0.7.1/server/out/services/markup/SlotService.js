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
var StringHelpers_1 = require("../../StringHelpers");
var SlotService = /** @class */ (function (_super) {
    __extends(SlotService, _super);
    function SlotService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlotService.prototype.getCompletitionItems = function (document, context, workspace) {
        if (/\sslot(\s)*=?(\s)*[\'|\"][\w\d_]*$/g.test(context.content.substring(0, context.offset))) {
            var component_1 = TagHelpers_1.findNearestOpenComponent(context.documentOffset - context.offset - 1, document, workspace.documentsCache);
            if (component_1 === null) {
                return null;
            }
            return component_1.metadata.slots
                .map(Utils_1.cloneCompletionItem)
                .map(function (item) {
                item.detail = "[Svelte] Slot of " + component_1.sveltedoc.name;
                return item;
            }).slice();
        }
        return null;
    };
    SlotService.prototype.getHover = function (document, context, workspace) {
        if (!this.isInsideSlot(context.content, context.offset)) {
            return null;
        }
        var component = TagHelpers_1.findNearestOpenComponent(context.documentOffset - context.offset - 1, document, workspace.documentsCache);
        if (component === null) {
            return null;
        }
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: component.sveltedoc.slots, handler: svelteDocUtils_1.buildPropertyDocumentation }
        ], StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    SlotService.prototype.getDefinitions = function (document, context, workspace) {
        if (!this.isInsideSlot(context.content, context.offset)) {
            return null;
        }
        var component = TagHelpers_1.findNearestOpenComponent(context.documentOffset - context.offset - 1, document, workspace.documentsCache);
        if (component === null) {
            return null;
        }
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(component, component.sveltedoc.slots.slice(), StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    SlotService.prototype.isInsideSlot = function (content, offset) {
        if (!/\sslot(\s)*=?(\s)*[\'|\"][\w\d_$]*$/.test(content.substring(0, offset))) {
            return false;
        }
        if (!/^[\w\d_$]*/.test(content.substring(offset))) {
            return false;
        }
        return true;
    };
    return SlotService;
}(Common_1.BaseService));
exports.SlotService = SlotService;
//# sourceMappingURL=SlotService.js.map