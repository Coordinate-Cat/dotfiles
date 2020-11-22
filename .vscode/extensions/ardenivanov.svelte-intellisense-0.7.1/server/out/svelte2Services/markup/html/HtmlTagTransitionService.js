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
var HtmlTagTransionService = /** @class */ (function (_super) {
    __extends(HtmlTagTransionService, _super);
    function HtmlTagTransionService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlTagTransionService.prototype.getCompletitionItems = function (document, context) {
        var index = TagHelpers_1.findLastDirectiveIndex(context.content, context.offset, 'transition');
        if (index < 0) {
            return null;
        }
        var contentPart = context.content.substring(index, context.offset);
        if (/transition:[\w\d_]*$/g.test(contentPart)) {
            return document.metadata
                ? document.metadata.transitions
                : [];
        }
        return null;
    };
    return HtmlTagTransionService;
}(Common_1.BaseService));
exports.HtmlTagTransionService = HtmlTagTransionService;
//# sourceMappingURL=HtmlTagTransitionService.js.map