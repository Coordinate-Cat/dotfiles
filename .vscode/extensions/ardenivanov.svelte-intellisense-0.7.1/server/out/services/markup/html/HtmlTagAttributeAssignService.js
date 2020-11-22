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
var SvelteItemsHelpers_1 = require("../../../SvelteItemsHelpers");
var StringHelpers_1 = require("../../../StringHelpers");
var svelteDocUtils_1 = require("../../../svelteDocUtils");
var svelteLanguage_1 = require("../../../svelteLanguage");
var HtmlTagAttributeAssignService = /** @class */ (function (_super) {
    __extends(HtmlTagAttributeAssignService, _super);
    function HtmlTagAttributeAssignService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlTagAttributeAssignService.prototype.getCompletitionItems = function (document, context) {
        var contentPart = context.content.substring(0, context.offset);
        var match = /\s+(([\w\d_:]+)=)?(['"]?\{[^}]*|'[^']*|"[^"]*)$/.exec(contentPart);
        if (match) {
            // When source name are provided we can use 
            //  any valid evaluatable expression with using helpers, data and computed properties
            if (match[1]) {
                var sourcePropertyName = match[3];
                if (sourcePropertyName.startsWith('"{') || sourcePropertyName.startsWith('\'{') || sourcePropertyName.startsWith('{')) {
                    return document.metadata ? svelteLanguage_1.getVersionSpecificMetadataForMarkup(document).concat(document.metadata.computed, document.metadata.data) : [];
                }
            }
        }
        return null;
    };
    HtmlTagAttributeAssignService.prototype.getHover = function (document, context) {
        if (!StringHelpers_1.isInsideAttributeAssign(context.content, context.offset)) {
            return null;
        }
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: svelteLanguage_1.getVersionSpecificDocForMarkup(document), handler: svelteDocUtils_1.buildMethodDocumentation },
            { items: document.sveltedoc.computed, handler: svelteDocUtils_1.buildComputedDocumentation },
            { items: document.sveltedoc.data, handler: svelteDocUtils_1.buildPropertyDocumentation }
        ], StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    HtmlTagAttributeAssignService.prototype.getDefinitions = function (document, context) {
        if (!StringHelpers_1.isInsideAttributeAssign(context.content, context.offset)) {
            return null;
        }
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(document, svelteLanguage_1.getVersionSpecificDocForMarkup(document).concat(document.sveltedoc.computed, document.sveltedoc.data), StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    return HtmlTagAttributeAssignService;
}(Common_1.BaseService));
exports.HtmlTagAttributeAssignService = HtmlTagAttributeAssignService;
//# sourceMappingURL=HtmlTagAttributeAssignService.js.map