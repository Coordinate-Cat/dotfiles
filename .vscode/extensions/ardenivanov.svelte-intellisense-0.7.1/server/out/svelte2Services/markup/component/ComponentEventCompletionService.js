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
var TagHelpers_1 = require("../TagHelpers");
var Common_1 = require("../../Common");
var StringHelpers_1 = require("../../../StringHelpers");
var svelteDocUtils_1 = require("../../../svelteDocUtils");
var SvelteItemsHelpers_1 = require("../../../SvelteItemsHelpers");
var ComponentEventCompletionService = /** @class */ (function (_super) {
    __extends(ComponentEventCompletionService, _super);
    function ComponentEventCompletionService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentEventCompletionService.prototype.getCompletitionItems = function (_document, context) {
        var index = TagHelpers_1.findLastDirectiveIndex(context.content, context.offset, 'on');
        if (index < 0) {
            return null;
        }
        var contentPart = context.content.substring(index, context.offset);
        if (/on:[\w\d_]*$/g.test(contentPart)) {
            return context.data.component.metadata.public_events;
        }
        return null;
    };
    ComponentEventCompletionService.prototype.getHover = function (_document, context) {
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: context.data.component.sveltedoc.events, handler: svelteDocUtils_1.buildPropertyDocumentation }
        ], this.getAttributeEventNameAtOffset(context));
    };
    ComponentEventCompletionService.prototype.getDefinition = function (_document, context) {
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(context.data.component, context.data.component.sveltedoc.events.slice(), this.getAttributeEventNameAtOffset(context));
    };
    ComponentEventCompletionService.prototype.getAttributeEventNameAtOffset = function (context) {
        var startIndex = StringHelpers_1.regexLastIndexOf(context.content, /\son:/, context.offset);
        var endIndex = StringHelpers_1.regexIndexOf(context.content, /[\s=]/, context.offset);
        if (endIndex < 0) {
            endIndex = context.content.length;
        }
        if (startIndex < 0 || endIndex < 0 || endIndex < startIndex) {
            return null;
        }
        var name = context.content.substring(startIndex, endIndex);
        var match = /^on:([\w\d_]+)$/.exec(name);
        if (match) {
            return match[1];
        }
        return null;
    };
    return ComponentEventCompletionService;
}(Common_1.BaseService));
exports.ComponentEventCompletionService = ComponentEventCompletionService;
//# sourceMappingURL=ComponentEventCompletionService.js.map