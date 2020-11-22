"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChoosingCompletionService_1 = require("./ChoosingCompletionService");
const ScriptCompletionService_1 = require("./script/ScriptCompletionService");
const StyleCompletionService_1 = require("./style/StyleCompletionService");
const MarkupCompletionService_1 = require("./markup/MarkupCompletionService");
class DocumentCompletionService extends ChoosingCompletionService_1.ChoosingCompletionService {
    constructor() {
        super([
            new ScriptCompletionService_1.ScriptCompletionService(),
            new StyleCompletionService_1.StyleCompletionService(),
            new MarkupCompletionService_1.MarkupCompletionService()
        ]);
    }
    isApplyable() {
        return true;
    }
}
exports.DocumentCompletionService = DocumentCompletionService;
//# sourceMappingURL=DocumentCompletionService.js.map