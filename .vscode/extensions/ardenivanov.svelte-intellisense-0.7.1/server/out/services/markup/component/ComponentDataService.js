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
var svelteDocUtils_1 = require("../../../svelteDocUtils");
var StringHelpers_1 = require("../../../StringHelpers");
var SvelteItemsHelpers_1 = require("../../../SvelteItemsHelpers");
var ComponentDataService = /** @class */ (function (_super) {
    __extends(ComponentDataService, _super);
    function ComponentDataService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentDataService.prototype.getCompletitionItems = function (_document, context) {
        return context.data.component.metadata.public_data;
    };
    ComponentDataService.prototype.getHover = function (_document, context) {
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: context.data.component.sveltedoc.data, handler: svelteDocUtils_1.buildPropertyDocumentation }
        ], this.getAttributeNameAtOffset(context));
    };
    ComponentDataService.prototype.getDefinitions = function (_document, context) {
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(context.data.component, context.data.component.sveltedoc.data.slice(), this.getAttributeNameAtOffset(context));
    };
    ComponentDataService.prototype.getAttributeNameAtOffset = function (context) {
        var startIndex = StringHelpers_1.regexLastIndexOf(context.content, /\s/, context.offset);
        var endIndex = StringHelpers_1.regexIndexOf(context.content, /[\s=]/, context.offset);
        if (startIndex < 0 || endIndex < 0 || endIndex < startIndex) {
            return null;
        }
        var name = context.content.substring(startIndex, endIndex);
        var match = /^([\w\d_]+)$/.exec(name);
        if (match) {
            return match[1];
        }
        return null;
    };
    return ComponentDataService;
}(Common_1.BaseService));
exports.ComponentDataService = ComponentDataService;
//# sourceMappingURL=ComponentDataService.js.map