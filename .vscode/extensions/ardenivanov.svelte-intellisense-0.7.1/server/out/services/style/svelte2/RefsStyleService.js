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
var Utils_1 = require("../../Utils");
var svelte2Language_1 = require("../../../svelte2Language");
var RefsStyleService = /** @class */ (function (_super) {
    __extends(RefsStyleService, _super);
    function RefsStyleService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RefsStyleService.prototype.getSupportedSvelteVersions = function () {
        return [SvelteDocument_1.SVELTE_VERSION_2];
    };
    RefsStyleService.prototype.getCompletitionItems = function (document) {
        var result = [
            svelte2Language_1.svelte2DefaultRefCompletionItem
        ];
        if (document.metadata) {
            result.push.apply(result, document.metadata.refs
                .map(Utils_1.cloneCompletionItem)
                .map(function (item) {
                item.filterText = "ref:" + item.label;
                item.sortText = "ref:" + item.label;
                item.insertText = "ref:" + item.label;
                item.detail = "[Svelte] ref:" + item.label;
                item.commitCharacters = [' '];
                return item;
            }));
        }
        return result;
    };
    return RefsStyleService;
}(Common_1.BaseService));
exports.RefsStyleService = RefsStyleService;
//# sourceMappingURL=RefsStyleService.js.map