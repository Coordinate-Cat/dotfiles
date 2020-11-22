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
var StringHelpers_1 = require("../../StringHelpers");
var SvelteItemsHelpers_1 = require("../../SvelteItemsHelpers");
var svelteDocUtils_1 = require("../../svelteDocUtils");
var BindTargetPropertyService = /** @class */ (function (_super) {
    __extends(BindTargetPropertyService, _super);
    function BindTargetPropertyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BindTargetPropertyService.prototype.getCompletitionItems = function (document, context) {
        var contentPart = context.content.substring(0, context.offset);
        if (/\bbind:[\w\d_]*=[\'\"]?[\{]?[\w\d_]*$/g.test(contentPart)) {
            return document.metadata
                ? document.metadata.data
                : [];
        }
        return null;
    };
    BindTargetPropertyService.prototype.getHover = function (document, context) {
        if (!this.isInsideBindTarget(context.content, context.offset)) {
            return null;
        }
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: document.sveltedoc.data, handler: svelteDocUtils_1.buildPropertyDocumentation }
        ], StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    BindTargetPropertyService.prototype.getDefinitions = function (document, context) {
        if (!this.isInsideBindTarget(context.content, context.offset)) {
            return null;
        }
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(document, document.sveltedoc.data.slice(), StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    BindTargetPropertyService.prototype.isInsideBindTarget = function (content, offset) {
        if (!/\bbind:[\w\d_]*=[\'\"]?[\w\d_$]*$/.test(content.substring(0, offset))) {
            return false;
        }
        if (!/^[\w\d_$]*/.test(content.substring(offset))) {
            return false;
        }
        return true;
    };
    return BindTargetPropertyService;
}(Common_1.BaseService));
exports.BindTargetPropertyService = BindTargetPropertyService;
//# sourceMappingURL=BindTargetPropertyService.js.map