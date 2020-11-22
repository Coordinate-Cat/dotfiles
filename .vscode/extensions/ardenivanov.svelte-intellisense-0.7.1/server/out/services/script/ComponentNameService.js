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
var Utils_1 = require("../Utils");
var ComponentNameService = /** @class */ (function (_super) {
    __extends(ComponentNameService, _super);
    function ComponentNameService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentNameService.prototype.getHover = function (document, context, workspace) {
        return Utils_1.getImportedComponentDocumentation(this.getComponentName(context), document, workspace);
    };
    ComponentNameService.prototype.getDefinitions = function (document, context, workspace) {
        return Utils_1.getImportedComponentDefinition(this.getComponentName(context), document, workspace);
    };
    ComponentNameService.prototype.getComponentName = function (context) {
        var prevContent = context.content.substring(0, context.offset);
        var nextContent = context.content.substring(context.offset);
        var componentNameStartSearchResult = /\b([\w\d_]+)$/g.exec(prevContent);
        var componentNameEndSearchResult = /^([\w\d_]+)\s*[:, }]/g.exec(nextContent);
        if (componentNameStartSearchResult !== null && componentNameEndSearchResult !== null) {
            var componentName = componentNameStartSearchResult[1] + componentNameEndSearchResult[1];
            return componentName;
        }
        return null;
    };
    return ComponentNameService;
}(Common_1.BaseService));
exports.ComponentNameService = ComponentNameService;
//# sourceMappingURL=ComponentNameService.js.map