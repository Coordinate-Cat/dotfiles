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
var svelteDocUtils_1 = require("../../../svelteDocUtils");
var StringHelpers_1 = require("../../../StringHelpers");
var SvelteItemsHelpers_1 = require("../../../SvelteItemsHelpers");
var BlockOpenService = /** @class */ (function (_super) {
    __extends(BlockOpenService, _super);
    function BlockOpenService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlockOpenService.prototype.getCompletitionItems = function (document, context) {
        var openBlockIndex = BlockHelpers_1.findLastOpenBlockIndex(context.content, context.offset);
        if (openBlockIndex < 0) {
            return null;
        }
        var versionsSpecific = [
            { version: SvelteDocument_1.SVELTE_VERSION_2, specific: svelte2Language_1.svelte2MarkupBlockCompletitionItems },
            { version: SvelteDocument_1.SVELTE_VERSION_3, specific: svelte3Language_1.svelte3MarkupBlockCompletitionItems }
        ];
        var blockContent = document.content.substring(openBlockIndex, context.offset);
        if (/^{#([\w\d_]*)$/g.test(blockContent)) {
            return svelteLanguage_1.markupBlockCompletitionItems.concat(svelteLanguage_1.getVersionSpecificSelection(document, versionsSpecific));
        }
        var match = /^{([#:][\w\d_]*)\s*[^}]*/g.exec(blockContent);
        if (match) {
            var blockName = match[1];
            if (blockName === '#if' || blockName === ':elseif' || blockName === '#await' || blockName === '#each') {
                return document.metadata ? document.metadata.data.concat(document.metadata.computed, svelteLanguage_1.getVersionSpecificMetadataForMarkup(document)) : [];
            }
        }
        return null;
    };
    BlockOpenService.prototype.getHover = function (document, context) {
        if (!BlockHelpers_1.isInsideOpenBlock(context.content, context.offset)) {
            return null;
        }
        return SvelteItemsHelpers_1.findItemInSvelteDoc([
            { items: svelteLanguage_1.getVersionSpecificDocForMarkup(document), handler: svelteDocUtils_1.buildMethodDocumentation },
            { items: document.sveltedoc.computed, handler: svelteDocUtils_1.buildComputedDocumentation },
            { items: document.sveltedoc.data, handler: svelteDocUtils_1.buildPropertyDocumentation }
        ], StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    BlockOpenService.prototype.getDefinitions = function (document, context) {
        if (!BlockHelpers_1.isInsideOpenBlock(context.content, context.offset)) {
            return null;
        }
        return SvelteItemsHelpers_1.findLocationForItemInSvelteDoc(document, svelteLanguage_1.getVersionSpecificDocForMarkup(document).concat(document.sveltedoc.computed, document.sveltedoc.data), StringHelpers_1.getIdentifierAtOffset(context.content, context.offset));
    };
    return BlockOpenService;
}(Common_1.BaseService));
exports.BlockOpenService = BlockOpenService;
//# sourceMappingURL=BlockOpenService.js.map