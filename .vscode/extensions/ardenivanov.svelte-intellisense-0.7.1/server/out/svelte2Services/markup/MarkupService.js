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
var BlockInnerService_1 = require("./block/BlockInnerService");
var BlockOpenService_1 = require("./block/BlockOpenService");
var BlockCloseService_1 = require("./block/BlockCloseService");
var OpenTagService_1 = require("./OpenTagService");
var PlaceholdersService_1 = require("./PlaceholdersService");
var TagInnerService_1 = require("./TagInnerService");
var MarkupService = /** @class */ (function (_super) {
    __extends(MarkupService, _super);
    function MarkupService() {
        return _super.call(this, [
            new OpenTagService_1.OpenTagService(),
            new TagInnerService_1.TagInnerService(),
            new BlockOpenService_1.BlockOpenService(),
            new BlockInnerService_1.BlockInnerService(),
            new BlockCloseService_1.BlockCloseService(),
            new PlaceholdersService_1.PlaceholdersService(),
        ]) || this;
    }
    return MarkupService;
}(ChoosingService_1.ChoosingService));
exports.MarkupService = MarkupService;
//# sourceMappingURL=MarkupService.js.map