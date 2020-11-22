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
var ComponentsSectionService_1 = require("./ComponentsSectionService");
var ImportStatementService_1 = require("./ImportStatementService");
var ComponentPrivateService_1 = require("./ComponentPrivateService");
var ComponentGetDataService_1 = require("./ComponentGetDataService");
var ComponentSetDataService_1 = require("./ComponentSetDataService");
var ComputedSectionService_1 = require("./ComputedSectionService");
var ScriptService = /** @class */ (function (_super) {
    __extends(ScriptService, _super);
    function ScriptService() {
        return _super.call(this, [
            new ImportStatementService_1.ImportStatementService(),
            new ComponentsSectionService_1.ComponentsSectionService(),
            new ComputedSectionService_1.ComputedSectionService(),
            new ComponentPrivateService_1.ComponentPrivateService(),
            new ComponentGetDataService_1.ComponentGetDataService(),
            new ComponentSetDataService_1.ComponentSetDataService()
        ], {
            exclusive: true
        }) || this;
    }
    ScriptService.prototype.reduceContext = function (context) {
        var openTagIndex = context.content.lastIndexOf("<script", context.offset);
        if (openTagIndex < 0) {
            return null;
        }
        var closeTagIndex = context.content.indexOf("</script>", context.offset);
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
    return ScriptService;
}(ChoosingService_1.ChoosingService));
exports.ScriptService = ScriptService;
//# sourceMappingURL=ScriptService.js.map