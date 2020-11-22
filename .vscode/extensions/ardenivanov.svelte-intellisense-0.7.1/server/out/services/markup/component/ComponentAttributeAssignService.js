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
var vscode_languageserver_1 = require("vscode-languageserver");
var svelteLanguage_1 = require("../../../svelteLanguage");
var ComponentAttributeAssignService = /** @class */ (function (_super) {
    __extends(ComponentAttributeAssignService, _super);
    function ComponentAttributeAssignService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentAttributeAssignService.prototype.getCompletitionItems = function (document, context) {
        var contentPart = context.content.substring(0, context.offset);
        var match = /\s+(([\w\d_:]+)=)?(['"]?\{[^}]*|'[^']*|"[^"]*)$/.exec(contentPart);
        if (match) {
            // When source name are provided we can use 
            //  any valid evaluatable expression with using helpers, data and computed properties
            if (match[1]) {
                var sourcePropertyName_1 = match[2];
                if (match[3].startsWith('"{') || match[3].startsWith('\'{') || match[3].startsWith('{')) {
                    return document.metadata ? svelteLanguage_1.getVersionSpecificMetadataForMarkup(document).concat(document.metadata.data, document.metadata.computed) : [];
                }
                var property_1 = context.data.component.sveltedoc.data.find(function (p) { return p.name === sourcePropertyName_1 && p.visibility === 'public'; });
                if (property_1.hasOwnProperty(sourcePropertyName_1)) {
                    if (property_1.type.kind === 'union') {
                        var types = property_1.type.type;
                        return types
                            .filter(function (t) { return t.kind === 'const'; })
                            .map(function (t) { return ({
                            label: t.value,
                            kind: vscode_languageserver_1.CompletionItemKind.Constant,
                            detail: property_1.description
                        }); });
                    }
                }
                return [];
            }
            // When source property is not specified we can use only data or computed with same names
            var items = document.metadata ? document.metadata.data.concat(document.metadata.computed) : [];
            return items.filter(function (item) { return context.data.component.metadata.public_data.some(function (child_item) { return child_item.label === item.label; }); });
        }
        return null;
    };
    return ComponentAttributeAssignService;
}(Common_1.BaseService));
exports.ComponentAttributeAssignService = ComponentAttributeAssignService;
//# sourceMappingURL=ComponentAttributeAssignService.js.map