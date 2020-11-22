"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChoosingHoverService_1 = require("./ChoosingHoverService");
const scriptHoverService_1 = require("./scriptHoverService");
//import { MarkupHoverService } from "./MarkupHoverService";
class DocumentHoverService extends ChoosingHoverService_1.ChoosingHoverService {
    constructor() {
        super([
            new scriptHoverService_1.ScriptHoverService(),
        ]);
    }
    isApplyable() {
        return true;
    }
}
exports.DocumentHoverService = DocumentHoverService;
//# sourceMappingURL=DocumentHoverService.js.map