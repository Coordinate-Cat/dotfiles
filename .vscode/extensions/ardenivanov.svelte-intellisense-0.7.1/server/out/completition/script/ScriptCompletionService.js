"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChoosingCompletionService_1 = require("../ChoosingCompletionService");
const ComponentPathCompletionService_1 = require("./ComponentPathCompletionService");
class ScriptCompletionService extends ChoosingCompletionService_1.ChoosingCompletionService {
    constructor() {
        super([
            new ComponentPathCompletionService_1.ComponentPathCompletionService()
        ]);
    }
    isApplyable(document, position) {
        const previousContent = document.content.substr(0, position.offset);
        const openScriptTagIndex = previousContent.lastIndexOf("<script");
        if (openScriptTagIndex < 0) {
            return false;
        }
        const closeScriptTagIndex = previousContent.indexOf("</script>", openScriptTagIndex);
        return closeScriptTagIndex < 0;
    }
}
exports.ScriptCompletionService = ScriptCompletionService;
//# sourceMappingURL=ScriptCompletionService.js.map