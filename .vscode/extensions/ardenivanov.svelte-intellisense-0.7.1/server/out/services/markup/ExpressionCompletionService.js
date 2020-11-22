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
var SvelteDocument_1 = require("../../SvelteDocument");
var svelte2Language_1 = require("../../svelte2Language");
var SvelteItemsHelpers_1 = require("../../SvelteItemsHelpers");
var svelteDocUtils_1 = require("../../svelteDocUtils");
var StringHelpers_1 = require("../../StringHelpers");
var ExpressionCompletionService = /** @class */ (function (_super) {
    __extends(ExpressionCompletionService, _super);
    function ExpressionCompletionService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpressionCompletionService.prototype.getCompletitionItems = function (document, context) {
        var index = this.findLastOpenExpressionIndex(context.content, context.offset);
        if (index < 0) {
            return null;
        }
        var result = [];
        if (document.svelteVersion() === SvelteDocument_1.SVELTE_VERSION_2) {
            result.push.apply(result, svelte2Language_1.svelte2DefaultComponentMethods);
        }
        if (document.metadata) {
            result.push.apply(result, document.metadata.data.concat(document.metadata.computed, document.metadata.methods, document.metadata.helpers));
        }
        return result;
    };
    ExpressionCompletionService.prototype.getHover = function (document, context) {
        if (!this.isInsideExpression(context.content, context.offset)) {
            return null;
        }
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: document.sveltedoc.helpers, handler: svelteDocUtils_1.buildMethodDocumentation },
            { items: document.sveltedoc.computed, handler: svelteDocUtils_1.buildComputedDocumentation },
            { items: document.sveltedoc.data, handler: svelteDocUtils_1.buildPropertyDocumentation },
            { items: document.sveltedoc.methods, handler: svelteDocUtils_1.buildMethodDocumentation },
        ], StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    ExpressionCompletionService.prototype.getDefinition = function (document, context) {
        if (!this.isInsideExpression(context.content, context.offset)) {
            return null;
        }
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(document, document.sveltedoc.helpers.concat(document.sveltedoc.computed, document.sveltedoc.data, document.sveltedoc.methods), StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    ExpressionCompletionService.prototype.isInsideExpression = function (content, offset) {
        return this.findLastOpenExpressionIndex(content, offset) >= 0;
    };
    ExpressionCompletionService.prototype.findLastOpenExpressionIndex = function (content, offset) {
        var openIndex = content.lastIndexOf('"', offset);
        if (openIndex < 0) {
            return -1;
        }
        var endIndex = content.indexOf('"', openIndex + 1);
        if (endIndex > 0 && endIndex < offset) {
            return -1;
        }
        var spaceIndex = content.lastIndexOf(' ', openIndex);
        if (spaceIndex < 0) {
            return -1;
        }
        if (content.startsWith('on:', spaceIndex + 1)) {
            return openIndex + 1;
        }
        return -1;
    };
    return ExpressionCompletionService;
}(Common_1.BaseService));
exports.ExpressionCompletionService = ExpressionCompletionService;
//# sourceMappingURL=ExpressionCompletionService.js.map