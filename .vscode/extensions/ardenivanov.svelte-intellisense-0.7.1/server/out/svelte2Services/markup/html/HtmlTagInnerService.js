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
var ChoosingService_1 = require("../../ChoosingService");
var HtmlTagBindService_1 = require("./HtmlTagBindService");
var HtmlTagDefaultService_1 = require("./HtmlTagDefaultService");
var HtmlTagActionService_1 = require("./HtmlTagActionService");
var HtmlTagTransitionService_1 = require("./HtmlTagTransitionService");
var HtmlTagTransitionOutService_1 = require("./HtmlTagTransitionOutService");
var HtmlTagTransitionInService_1 = require("./HtmlTagTransitionInService");
var ExpressionCompletionService_1 = require("../ExpressionCompletionService");
var BindTargetPropertyService_1 = require("../BindTargetPropertyService");
var HtmlTagAttributeAssignService_1 = require("./HtmlTagAttributeAssignService");
var HtmlTagInnerService = /** @class */ (function (_super) {
    __extends(HtmlTagInnerService, _super);
    function HtmlTagInnerService() {
        return _super.call(this, [
            new ExpressionCompletionService_1.ExpressionCompletionService(),
            new HtmlTagBindService_1.HtmlTagBindService(),
            new HtmlTagActionService_1.HtmlTagActionService(),
            new HtmlTagTransitionService_1.HtmlTagTransionService(),
            new HtmlTagTransitionInService_1.HtmlTagTransionInService(),
            new HtmlTagTransitionOutService_1.HtmlTagTransionOutService(),
            new BindTargetPropertyService_1.BindTargetPropertyService(),
            new HtmlTagAttributeAssignService_1.HtmlTagAttributeAssignService(),
            // Fallback service
            new HtmlTagDefaultService_1.HtmlTagDefaultService()
        ]) || this;
    }
    return HtmlTagInnerService;
}(ChoosingService_1.ChoosingService));
exports.HtmlTagInnerService = HtmlTagInnerService;
//# sourceMappingURL=HtmlTagInnerService.js.map