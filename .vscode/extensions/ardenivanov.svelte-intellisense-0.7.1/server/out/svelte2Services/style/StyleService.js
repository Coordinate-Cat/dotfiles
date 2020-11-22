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
var RefsStyleService_1 = require("./RefsStyleService");
var StyleService = /** @class */ (function (_super) {
    __extends(StyleService, _super);
    function StyleService() {
        return _super.call(this, [
            new RefsStyleService_1.RefsStyleService()
        ], {
            exclusive: true
        }) || this;
    }
    StyleService.prototype.reduceContext = function (context) {
        var openTagIndex = context.content.lastIndexOf("<style", context.offset);
        if (openTagIndex < 0) {
            return null;
        }
        var closeTagIndex = context.content.indexOf("</style>", context.offset);
        if (closeTagIndex < 0) {
            return null;
        }
        var tagContentIndex = context.content.indexOf(">", openTagIndex);
        if (tagContentIndex < 0) {
            return null;
        }
        var startPositionIndex = tagContentIndex + 1;
        return {
            documentOffset: context.documentOffset,
            content: context.content.substring(startPositionIndex, closeTagIndex),
            offset: context.offset - startPositionIndex
        };
    };
    return StyleService;
}(ChoosingService_1.ChoosingService));
exports.StyleService = StyleService;
//# sourceMappingURL=StyleService.js.map