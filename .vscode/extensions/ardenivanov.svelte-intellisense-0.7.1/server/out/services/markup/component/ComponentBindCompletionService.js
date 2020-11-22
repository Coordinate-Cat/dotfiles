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
var StringHelpers_1 = require("../../../StringHelpers");
var svelteDocUtils_1 = require("../../../svelteDocUtils");
var SvelteItemsHelpers_1 = require("../../../SvelteItemsHelpers");
var ComponentBindCompletionService = /** @class */ (function (_super) {
    __extends(ComponentBindCompletionService, _super);
    function ComponentBindCompletionService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentBindCompletionService.prototype.getCompletitionItems = function (_document, context) {
        var index = TagHelpers_1.findLastDirectiveIndex(context.content, context.offset, 'bind');
        if (index < 0) {
            return null;
        }
        var contentPart = context.content.substring(index, context.offset);
        if (/bind:[\w\d_]*$/g.test(contentPart)) {
            return context.data.component.metadata.public_data;
        }
        return null;
    };
    ComponentBindCompletionService.prototype.getHover = function (_document, context) {
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: context.data.component.sveltedoc.data, handler: svelteDocUtils_1.buildPropertyDocumentation }
        ], this.getAttributeBindNameAtOffset(context));
    };
    ComponentBindCompletionService.prototype.getDefinition = function (_document, context) {
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(context.data.component, context.data.component.sveltedoc.data.slice(), this.getAttributeBindNameAtOffset(context));
    };
    ComponentBindCompletionService.prototype.getAttributeBindNameAtOffset = function (context) {
        var startIndex = StringHelpers_1.regexLastIndexOf(context.content, /\sbind:/, context.offset);
        var endIndex = StringHelpers_1.regexIndexOf(context.content, /[\s=]/, context.offset);
        if (endIndex < 0) {
            endIndex = context.content.length;
        }
        if (startIndex < 0 || endIndex < 0 || endIndex < startIndex) {
            return null;
        }
        var name = context.content.substring(startIndex, endIndex);
        var match = /^bind:([\w\d_]+)$/.exec(name);
        if (match) {
            return match[1];
        }
        return null;
    };
    return ComponentBindCompletionService;
}(Common_1.BaseService));
exports.ComponentBindCompletionService = ComponentBindCompletionService;
//# sourceMappingURL=ComponentBindCompletionService.js.map