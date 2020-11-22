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
var TagHelpers_1 = require("./TagHelpers");
var svelte2Language_1 = require("../../svelte2Language");
var Utils_1 = require("../Utils");
var StringHelpers_1 = require("../../StringHelpers");
var OpenTagService = /** @class */ (function (_super) {
    __extends(OpenTagService, _super);
    function OpenTagService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpenTagService.prototype.getCompletitionItems = function (document, context, workspace) {
        var openIndex = TagHelpers_1.findLastOpenTagIndex(context.content, context.offset);
        if (openIndex < 0) {
            return null;
        }
        var spaceIndex = StringHelpers_1.regexIndexOf(context.content, /\s/, openIndex);
        if (spaceIndex > 0 && spaceIndex < context.offset) {
            return null;
        }
        var tagContent = context.content.substring(openIndex, context.offset);
        var match = /<([\w\d_]+:)?[\w\d_]*$/g.exec(tagContent);
        if (match) {
            if (!document.metadata || match[1] === svelte2Language_1.SpecialComponentNamespace + ":") {
                return svelte2Language_1.SpecialComponents.slice();
            }
            if (!match[1]) {
                return document.metadata.components
                    .map(Utils_1.cloneCompletionItem)
                    .map(function (item) {
                    item.documentation = Utils_1.getImportedComponentDocumentation(item.label, document, workspace).contents;
                    return item;
                }).concat(svelte2Language_1.SpecialComponents
                    .map(Utils_1.cloneCompletionItem)
                    .map(function (item) {
                    item.filterText = svelte2Language_1.SpecialComponentNamespace + ":" + item.label;
                    item.sortText = svelte2Language_1.SpecialComponentNamespace + ":" + item.label;
                    item.insertText = svelte2Language_1.SpecialComponentNamespace + ":" + item.label;
                    return item;
                }));
            }
        }
        return null;
    };
    OpenTagService.prototype.getHover = function (document, context, workspace) {
        return Utils_1.getImportedComponentDocumentation(this.getTagContent(context), document, workspace);
    };
    OpenTagService.prototype.getDefinition = function (document, context, workspace) {
        return Utils_1.getImportedComponentDefinition(this.getTagContent(context), document, workspace);
    };
    OpenTagService.prototype.getTagContent = function (context) {
        var openIndex = TagHelpers_1.findLastOpenTagIndex(context.content, context.offset);
        if (openIndex < 0) {
            return null;
        }
        var spaceIndex = StringHelpers_1.regexIndexOf(context.content, /\s/, openIndex);
        if (spaceIndex > 0 && spaceIndex < context.offset) {
            return null;
        }
        return context.content.substring(openIndex + 1, spaceIndex);
    };
    return OpenTagService;
}(Common_1.BaseService));
exports.OpenTagService = OpenTagService;
//# sourceMappingURL=OpenTagService.js.map