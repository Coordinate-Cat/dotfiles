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
var svelteLanguage_1 = require("../../../svelteLanguage");
var HtmlTagEventService = /** @class */ (function (_super) {
    __extends(HtmlTagEventService, _super);
    function HtmlTagEventService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlTagEventService.prototype.getCompletitionItems = function (_document, context) {
        var index = TagHelpers_1.findLastDirectiveIndex(context.content, context.offset, 'on');
        if (index < 0) {
            return null;
        }
        var contentPart = context.content.substring(index, context.offset);
        if (/on:[\w\d_|]*\|[\w\d_]*$/g.test(contentPart)) {
            return svelteLanguage_1.EventModifiers;
        }
        return null;
    };
    return HtmlTagEventService;
}(Common_1.BaseService));
exports.HtmlTagEventService = HtmlTagEventService;
//# sourceMappingURL=HtmlTagEventService.js.map