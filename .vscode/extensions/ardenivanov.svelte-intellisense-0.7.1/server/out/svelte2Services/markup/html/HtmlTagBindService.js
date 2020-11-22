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
var svelte2Language_1 = require("../../../svelte2Language");
var HtmlTagBindService = /** @class */ (function (_super) {
    __extends(HtmlTagBindService, _super);
    function HtmlTagBindService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlTagBindService.prototype.getCompletitionItems = function (_document, context) {
        var index = TagHelpers_1.findLastDirectiveIndex(context.content, context.offset, 'bind');
        if (index < 0) {
            return null;
        }
        var contentPart = context.content.substring(index, context.offset);
        if (/bind:[\w\d_]*$/g.test(contentPart)) {
            return svelte2Language_1.getHtmlTagDefaultBindCompletionItems(context.data.name);
        }
        return null;
    };
    return HtmlTagBindService;
}(Common_1.BaseService));
exports.HtmlTagBindService = HtmlTagBindService;
//# sourceMappingURL=HtmlTagBindService.js.map