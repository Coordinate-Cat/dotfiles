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
var ChoosingService_1 = require("../ChoosingService");
var TagHelpers_1 = require("./TagHelpers");
var ComponentInnerService_1 = require("./component/ComponentInnerService");
var HtmlTagInnerService_1 = require("./html/HtmlTagInnerService");
var SlotService_1 = require("./SlotService");
var TagInnerService = /** @class */ (function (_super) {
    __extends(TagInnerService, _super);
    function TagInnerService() {
        return _super.call(this, [
            new SlotService_1.SlotService(),
            new ComponentInnerService_1.ComponentInnerService(),
            new HtmlTagInnerService_1.HtmlTagInnerService
        ]) || this;
    }
    TagInnerService.prototype.reduceContext = function (context) {
        var openTag = TagHelpers_1.findLastOpenTag(context.content, context.offset);
        if (openTag === null) {
            return null;
        }
        return {
            documentOffset: context.documentOffset,
            content: openTag.content,
            offset: context.offset - openTag.startIndex,
            data: {
                name: openTag.tagName,
                namespace: openTag.tagNamespace
            }
        };
    };
    return TagInnerService;
}(ChoosingService_1.ChoosingService));
exports.TagInnerService = TagInnerService;
//# sourceMappingURL=TagInnerService.js.map