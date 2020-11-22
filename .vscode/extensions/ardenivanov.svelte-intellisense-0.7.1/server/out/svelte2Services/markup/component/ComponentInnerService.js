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
var ComponentEventCompletionService_1 = require("./ComponentEventCompletionService");
var ComponentDataCompletionService_1 = require("./ComponentDataCompletionService");
var ComponentBindCompletionService_1 = require("./ComponentBindCompletionService");
var ComponentDefaultCompletionService_1 = require("./ComponentDefaultCompletionService");
var CompositeService_1 = require("../../CompositeService");
var ExpressionCompletionService_1 = require("../ExpressionCompletionService");
var ChoosingService_1 = require("../../ChoosingService");
var TagHelpers_1 = require("../TagHelpers");
var BindTargetPropertyService_1 = require("../BindTargetPropertyService");
var ComponentDataAssignService_1 = require("./ComponentDataAssignService");
var ComponentInnerService = /** @class */ (function (_super) {
    __extends(ComponentInnerService, _super);
    function ComponentInnerService() {
        return _super.call(this, [
            new ExpressionCompletionService_1.ExpressionCompletionService(),
            new ComponentEventCompletionService_1.ComponentEventCompletionService(),
            new ComponentBindCompletionService_1.ComponentBindCompletionService(),
            new BindTargetPropertyService_1.BindTargetPropertyService(),
            new ComponentDataAssignService_1.ComponentDataAssignService(),
            // Fallback
            new CompositeService_1.CompositeCompletionService([
                new ComponentDataCompletionService_1.ComponentDataCompletionService(),
                new ComponentDefaultCompletionService_1.ComponentDefaultCompletionService()
            ])
        ]) || this;
    }
    ComponentInnerService.prototype.reduceContext = function (context, document, workspace) {
        var component = TagHelpers_1.findImportedComponent(context.data.name, document, workspace.documentsCache);
        if (component === null) {
            return null;
        }
        return {
            documentOffset: context.documentOffset,
            content: context.content,
            offset: context.offset,
            data: Object.assign({}, context.data, { component: component })
        };
    };
    return ComponentInnerService;
}(ChoosingService_1.ChoosingService));
exports.ComponentInnerService = ComponentInnerService;
//# sourceMappingURL=ComponentInnerService.js.map