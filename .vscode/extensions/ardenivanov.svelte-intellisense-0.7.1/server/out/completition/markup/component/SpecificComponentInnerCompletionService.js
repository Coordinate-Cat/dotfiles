"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChoosingCompletionService_1 = require("../../ChoosingCompletionService");
const ComponentEventCompletionService_1 = require("./ComponentEventCompletionService");
const ComponentDataCompletionService_1 = require("./ComponentDataCompletionService");
const ComponentBindCompletionService_1 = require("./ComponentBindCompletionService");
const ComponentDefaultCompletionService_1 = require("./ComponentDefaultCompletionService");
const CompositeCompletionService_1 = require("../../CompositeCompletionService");
const ExpressionCompletionService_1 = require("./ExpressionCompletionService");
class SpecificComponentCompletionService extends ChoosingCompletionService_1.ChoosingCompletionService {
    constructor(document) {
        super([
            new ExpressionCompletionService_1.ExpressionCompletionService(),
            new ComponentEventCompletionService_1.ComponentEventCompletionService(document),
            new ComponentBindCompletionService_1.ComponentBindCompletionService(document),
            new CompositeCompletionService_1.CompositeCompletionService([
                new ComponentDataCompletionService_1.ComponentDataCompletionService(document),
                new ComponentDefaultCompletionService_1.ComponentDefaultCompletionService(document)
            ])
        ]);
    }
}
exports.SpecificComponentCompletionService = SpecificComponentCompletionService;
//# sourceMappingURL=SpecificComponentInnerCompletionService.js.map