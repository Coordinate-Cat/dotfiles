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
var SvelteDocument_1 = require("../../../SvelteDocument");
var Common_1 = require("../../Common");
var TagHelpers_1 = require("../TagHelpers");
var svelteLanguage_1 = require("../../../svelteLanguage");
var svelte2Language_1 = require("../../../svelte2Language");
var svelte3Language_1 = require("../../../svelte3Language");
var HtmlTagBindService = /** @class */ (function (_super) {
    __extends(HtmlTagBindService, _super);
    function HtmlTagBindService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlTagBindService.prototype.getCompletitionItems = function (document, context) {
        var index = TagHelpers_1.findLastDirectiveIndex(context.content, context.offset, 'bind');
        if (index < 0) {
            return null;
        }
        var versionsSpecific = [
            { version: SvelteDocument_1.SVELTE_VERSION_2, specific: svelte2Language_1.svelte2DefaultHtmlTagBindCompletionItems },
            { version: SvelteDocument_1.SVELTE_VERSION_3, specific: svelte3Language_1.svelte3DefaultHtmlTagBindCompletionItems }
        ];
        var contentPart = context.content.substring(index, context.offset);
        if (/bind:[\w\d_]*$/g.test(contentPart)) {
            return svelteLanguage_1.getHtmlTagDefaultBindCompletionItems(context.data.name, svelteLanguage_1.getVersionSpecificSelection(document, versionsSpecific));
        }
        return null;
    };
    return HtmlTagBindService;
}(Common_1.BaseService));
exports.HtmlTagBindService = HtmlTagBindService;
//# sourceMappingURL=HtmlTagBindService.js.map