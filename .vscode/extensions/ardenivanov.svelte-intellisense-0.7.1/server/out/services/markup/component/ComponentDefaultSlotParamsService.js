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
var TagHelpers_1 = require("../TagHelpers");
var svelteDocUtils_1 = require("../../../svelteDocUtils");
var SvelteItemsHelpers_1 = require("../../../SvelteItemsHelpers");
var ComponentDefaultSlotParamsService = /** @class */ (function (_super) {
    __extends(ComponentDefaultSlotParamsService, _super);
    function ComponentDefaultSlotParamsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentDefaultSlotParamsService.prototype.getCompletitionItems = function (_document, context) {
        if (!context.data.component.metadata.slotsMetadata) {
            return null;
        }
        var defaultSlotMetadata = context.data.component.metadata.slotsMetadata.find(function (s) { return s.name === 'default'; });
        if (!defaultSlotMetadata) {
            return null;
        }
        var index = TagHelpers_1.findLastDirectiveIndex(context.content, context.offset, 'let');
        if (index < 0) {
            return null;
        }
        var contentPart = context.content.substring(index, context.offset);
        if (/let:[\w\d_]*$/g.test(contentPart)) {
            return defaultSlotMetadata.parameters;
        }
        return null;
    };
    ComponentDefaultSlotParamsService.prototype.getHover = function (_document, context) {
        var defaultSlotDoc = this.getDefaultSlotDocumentation(context);
        if (!defaultSlotDoc) {
            return null;
        }
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: defaultSlotDoc.parameters, handler: svelteDocUtils_1.buildSlotPerameterDocumentation }
        ], TagHelpers_1.getAttributeLetNameAtOffset(context));
    };
    ComponentDefaultSlotParamsService.prototype.getDefinitions = function (_document, context) {
        var defaultSlotDoc = this.getDefaultSlotDocumentation(context);
        if (!defaultSlotDoc) {
            return null;
        }
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(context.data.component, defaultSlotDoc.parameters, TagHelpers_1.getAttributeLetNameAtOffset(context));
    };
    ComponentDefaultSlotParamsService.prototype.getDefaultSlotDocumentation = function (context) {
        return context.data.component.sveltedoc.slots.find(function (s) { return s.name === 'default'; });
    };
    return ComponentDefaultSlotParamsService;
}(Common_1.BaseService));
exports.ComponentDefaultSlotParamsService = ComponentDefaultSlotParamsService;
//# sourceMappingURL=ComponentDefaultSlotParamsService.js.map