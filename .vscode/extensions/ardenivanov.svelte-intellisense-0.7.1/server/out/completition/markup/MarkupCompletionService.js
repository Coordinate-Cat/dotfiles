"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChoosingCompletionService_1 = require("../ChoosingCompletionService");
const BlockInnerCompletionService_1 = require("./block/BlockInnerCompletionService");
const BlockOpenCompletionService_1 = require("./block/BlockOpenCompletionService");
const BlockCloseCompletionService_1 = require("./block/BlockCloseCompletionService");
const OpenTagCompletionService_1 = require("./OpenTagCompletionService");
const GenericComponentInnerCompletionService_1 = require("./component/GenericComponentInnerCompletionService");
const PlaceholdersCompletionService_1 = require("./PlaceholdersCompletionService");
const HtmlTagInnerCompletionService_1 = require("./html/HtmlTagInnerCompletionService");
class MarkupCompletionService extends ChoosingCompletionService_1.ChoosingCompletionService {
    constructor() {
        super([
            new BlockOpenCompletionService_1.BlockOpenCompletionService(),
            new BlockInnerCompletionService_1.BlockInnerCompletionService(),
            new BlockCloseCompletionService_1.BlockCloseCompletetionService(),
            new PlaceholdersCompletionService_1.PlaceholdersCompletionService(),
            new OpenTagCompletionService_1.OpenTagCompletionService(),
            new GenericComponentInnerCompletionService_1.GenericComponentInnerCompletionService(),
            new HtmlTagInnerCompletionService_1.HtmlTagInnerCompletionService()
        ]);
    }
    isApplyable() {
        return true;
    }
}
exports.MarkupCompletionService = MarkupCompletionService;
//# sourceMappingURL=MarkupCompletionService.js.map