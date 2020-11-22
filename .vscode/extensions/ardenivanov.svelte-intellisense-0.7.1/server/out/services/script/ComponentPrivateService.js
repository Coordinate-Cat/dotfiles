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
var Common_1 = require("../Common");
var svelte2Language_1 = require("../../svelte2Language");
var Utils_1 = require("../Utils");
var ComponentPrivateService = /** @class */ (function (_super) {
    __extends(ComponentPrivateService, _super);
    function ComponentPrivateService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentPrivateService.prototype.getCompletitionItems = function (document, context) {
        if (/\bthis(\s)*.(\s)*[\w\d_]*$/g.test(context.content.substring(0, context.offset))) {
            var result = svelte2Language_1.svelte2DefaultComponentMethods.concat([
                svelte2Language_1.svelte2DefaultComponentGetMethodCompletionItem,
                svelte2Language_1.svelte2DefaultScriptRefsCompletionItem,
            ]);
            if (document.metadata) {
                result.push.apply(result, document.metadata.methods.concat(document.metadata.refs
                    .map(Utils_1.cloneCompletionItem)
                    .map(function (item) {
                    item.detail = "[Svelte] Reference to element/component";
                    item.filterText = "refs." + item.label;
                    item.sortText = "refs." + item.label;
                    item.insertText = "refs." + item.label;
                    return item;
                })));
            }
            return result;
        }
        if (/\bthis(\s)*.(\s)*refs(\s)*.(\s)*[\w\d_]*$/g.test(context.content.substring(0, context.offset))) {
            return document.metadata ? document.metadata.refs
                .map(Utils_1.cloneCompletionItem)
                .map(function (item) {
                item.detail = "[Svelte] Reference to element/component";
                return item;
            }).slice() : [];
        }
        return null;
    };
    return ComponentPrivateService;
}(Common_1.BaseService));
exports.ComponentPrivateService = ComponentPrivateService;
//# sourceMappingURL=ComponentPrivateService.js.map