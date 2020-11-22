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
var svelteLanguage_1 = require("../../svelteLanguage");
var Utils_1 = require("../Utils");
var SvelteItemsHelpers_1 = require("../../SvelteItemsHelpers");
var svelteDocUtils_1 = require("../../svelteDocUtils");
var StringHelpers_1 = require("../../StringHelpers");
var PlaceholdersService = /** @class */ (function (_super) {
    __extends(PlaceholdersService, _super);
    function PlaceholdersService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaceholdersService.prototype.getCompletitionItems = function (document, context) {
        var openIndex = this.findLastOpenPlaceholderIndex(context.content, context.offset);
        if (openIndex < 0) {
            return null;
        }
        var contentPart = document.content.substring(openIndex, context.offset);
        if (/{@[\w\d_]*$/.test(contentPart)) {
            return svelteLanguage_1.PlaceholderModifiers;
        }
        var result = [];
        if (document.metadata) {
            result.push.apply(result, document.metadata.data.concat(document.metadata.computed, svelteLanguage_1.getVersionSpecificMetadataForMarkup(document)));
        }
        if (openIndex + 1 === context.offset) {
            result.push.apply(result, svelteLanguage_1.PlaceholderModifiers
                .map(Utils_1.cloneCompletionItem)
                .map(function (item) {
                item.insertText = "@" + item.label;
                item.filterText = "@" + item.label;
                return item;
            }));
        }
        return result;
    };
    PlaceholdersService.prototype.getHover = function (document, context) {
        if (!this.isInsidePlaceholder(context.content, context.offset)) {
            return null;
        }
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: svelteLanguage_1.getVersionSpecificDocForMarkup(document), handler: svelteDocUtils_1.buildMethodDocumentation },
            { items: document.sveltedoc.computed, handler: svelteDocUtils_1.buildComputedDocumentation },
            { items: document.sveltedoc.data, handler: svelteDocUtils_1.buildPropertyDocumentation },
        ], StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    PlaceholdersService.prototype.getDefinitions = function (document, context) {
        if (!this.isInsidePlaceholder(context.content, context.offset)) {
            return null;
        }
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(document, svelteLanguage_1.getVersionSpecificDocForMarkup(document).concat(document.sveltedoc.computed, document.sveltedoc.data), StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    PlaceholdersService.prototype.isInsidePlaceholder = function (content, offset) {
        return this.findLastOpenPlaceholderIndex(content, offset) >= 0;
    };
    PlaceholdersService.prototype.findLastOpenPlaceholderIndex = function (content, offset) {
        var openIndex = content.lastIndexOf('{', offset);
        if (openIndex < 0) {
            return -1;
        }
        var endIndex = content.indexOf('}', openIndex);
        if (endIndex > 0 && endIndex < offset) {
            return -1;
        }
        return openIndex;
    };
    return PlaceholdersService;
}(Common_1.BaseService));
exports.PlaceholdersService = PlaceholdersService;
//# sourceMappingURL=PlaceholdersService.js.map