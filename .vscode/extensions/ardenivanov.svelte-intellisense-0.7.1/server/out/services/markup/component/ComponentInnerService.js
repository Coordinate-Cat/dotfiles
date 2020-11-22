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
var ComponentEventService_1 = require("./ComponentEventService");
var ComponentDataService_1 = require("./ComponentDataService");
var ComponentBindService_1 = require("./ComponentBindService");
var ComponentDefaultService_1 = require("./ComponentDefaultService");
var CompositeService_1 = require("../../CompositeService");
var ExpressionService_1 = require("../ExpressionService");
var ChoosingService_1 = require("../../ChoosingService");
var TagHelpers_1 = require("../TagHelpers");
var BindTargetPropertyService_1 = require("../BindTargetPropertyService");
var ComponentAttributeAssignService_1 = require("./ComponentAttributeAssignService");
var ComponentDefaultSlotParamsService_1 = require("./ComponentDefaultSlotParamsService");
var ComponentInnerService = /** @class */ (function (_super) {
    __extends(ComponentInnerService, _super);
    function ComponentInnerService() {
        return _super.call(this, [
            new ExpressionService_1.ExpressionService(),
            new ComponentEventService_1.ComponentEventService(),
            new ComponentBindService_1.ComponentBindService(),
            new ComponentDefaultSlotParamsService_1.ComponentDefaultSlotParamsService(),
            new BindTargetPropertyService_1.BindTargetPropertyService(),
            new ComponentAttributeAssignService_1.ComponentAttributeAssignService(),
            // Fallback
            new CompositeService_1.CompositeCompletionService([
                new ComponentDataService_1.ComponentDataService(),
                new ComponentDefaultService_1.ComponentDefaultService()
            ])
        ]) || this;
    }
    ComponentInnerService.prototype.reduceContext = function (context, document, workspace) {
        var component = TagHelpers_1.findImportedComponent(context.data.name, document, workspace.documentsCache);
        if (component === null || !component.metadata) {
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