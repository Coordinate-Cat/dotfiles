"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChoosingCompletionService_1 = require("../ChoosingCompletionService");
class StyleCompletionService extends ChoosingCompletionService_1.ChoosingCompletionService {
    constructor() {
        super([]);
    }
    isApplyable(document, position) {
        const previousContent = document.content.substr(0, position.offset);
        const openStyleTagIndex = previousContent.lastIndexOf("<style");
        if (openStyleTagIndex < 0) {
            return false;
        }
        const closeStyleTagIndex = previousContent.indexOf("</style>", openStyleTagIndex);
        return closeStyleTagIndex < 0;
    }
}
exports.StyleCompletionService = StyleCompletionService;
//# sourceMappingURL=StyleCompletionService.js.map