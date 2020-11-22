"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChoosingService_1 = require("../../ChoosingService");
const ComponentEventCompletionService_1 = require("./ComponentEventCompletionService");
const ComponentDataCompletionService_1 = require("./ComponentDataCompletionService");
const ComponentBindCompletionService_1 = require("./ComponentBindCompletionService");
const ComponentDefaultCompletionService_1 = require("./ComponentDefaultCompletionService");
const CompositeService_1 = require("../../CompositeService");
const ExpressionCompletionService_1 = require("./ExpressionCompletionService");
class SpecificComponentInnerService extends ChoosingService_1.ChoosingService {
    constructor(document) {
        super([
            new ExpressionCompletionService_1.ExpressionCompletionService(),
            new ComponentEventCompletionService_1.ComponentEventCompletionService(document),
            new ComponentBindCompletionService_1.ComponentBindCompletionService(document),
            new CompositeService_1.CompositeCompletionService([
                new ComponentDataCompletionService_1.ComponentDataCompletionService(document),
                new ComponentDefaultCompletionService_1.ComponentDefaultCompletionService(document)
            ])
        ]);
    }
}
exports.SpecificComponentInnerService = SpecificComponentInnerService;
//# sourceMappingURL=SpecificComponentInnerService.js.map