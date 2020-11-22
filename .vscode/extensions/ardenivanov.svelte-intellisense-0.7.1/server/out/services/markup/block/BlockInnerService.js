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
var Common_1 = require("../../Common");
var SvelteDocument_1 = require("../../../SvelteDocument");
var svelteLanguage_1 = require("../../../svelteLanguage");
var svelte2Language_1 = require("../../../svelte2Language");
var svelte3Language_1 = require("../../../svelte3Language");
var BlockHelpers_1 = require("./BlockHelpers");
var BlockInnerService = /** @class */ (function (_super) {
    __extends(BlockInnerService, _super);
    function BlockInnerService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlockInnerService.prototype.getCompletitionItems = function (document, context) {
        var versionsSpecific = [
            { version: SvelteDocument_1.SVELTE_VERSION_2, specific: svelte2Language_1.svelte2MarkupBlockInnerCompletitionItems },
            { version: SvelteDocument_1.SVELTE_VERSION_3, specific: svelte3Language_1.svelte3MarkupBlockInnerCompletitionItems }
        ];
        var aggregatedItems = Object.assign({}, svelteLanguage_1.markupBlockInnerCompletitionItems, svelteLanguage_1.getVersionSpecificSelection(document, versionsSpecific));
        var nearestBlock = BlockHelpers_1.findNearestNotClosedBlock(context.content, context.offset);
        if (nearestBlock == null) {
            return null;
        }
        var openIndex = BlockHelpers_1.findLastInnerBlockIndex(context.content, context.offset);
        if (openIndex < 0) {
            return null;
        }
        if (!aggregatedItems.hasOwnProperty(nearestBlock.blockName)) {
            return null;
        }
        ;
        var contentPart = document.content.substring(openIndex, context.offset);
        if (/{:[\w\d_]*$/g.test(contentPart)) {
            return aggregatedItems[nearestBlock.blockName];
        }
        return null;
    };
    return BlockInnerService;
}(Common_1.BaseService));
exports.BlockInnerService = BlockInnerService;
//# sourceMappingURL=BlockInnerService.js.map