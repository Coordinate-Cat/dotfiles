"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChoosingCompletionService_1 = require("../../ChoosingCompletionService");
const HtmlTagBindCompletionService_1 = require("./HtmlTagBindCompletionService");
const HtmlTagDefaultCompletionService_1 = require("./HtmlTagDefaultCompletionService");
const TagHelpers_1 = require("../TagHelpers");
const HtmlTagActionCompletionService_1 = require("./HtmlTagActionCompletionService");
class HtmlTagInnerCompletionService extends ChoosingCompletionService_1.ChoosingCompletionService {
    constructor() {
        super([
            new HtmlTagBindCompletionService_1.HtmlTagBindCompletionService(),
            new HtmlTagActionCompletionService_1.HtmlTagActionCompletionService(),
            new HtmlTagDefaultCompletionService_1.HtmlTagDefaultCompletionService()
        ]);
    }
    isApplyable(document, position) {
        const openTag = TagHelpers_1.findLastOpenTag(document, position.offset);
        return openTag != null;
    }
}
exports.HtmlTagInnerCompletionService = HtmlTagInnerCompletionService;
//# sourceMappingURL=HtmlTagInnerCompletionService.js.map