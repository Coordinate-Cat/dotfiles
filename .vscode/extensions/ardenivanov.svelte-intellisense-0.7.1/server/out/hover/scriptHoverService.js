"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChoosingHoverService_1 = require("./ChoosingHoverService");
const ComponentDetailsHoverService_1 = require("./ComponentDetailsHoverService");
class ScriptHoverService extends ChoosingHoverService_1.ChoosingHoverService {
    constructor() {
        super([
            new ComponentDetailsHoverService_1.ComponentDetailsHoverService()
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
exports.ScriptHoverService = ScriptHoverService;
//# sourceMappingURL=scriptHoverService.js.map