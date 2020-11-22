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
var ComponentGetDataService = /** @class */ (function (_super) {
    __extends(ComponentGetDataService, _super);
    function ComponentGetDataService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentGetDataService.prototype.getCompletitionItems = function (document, context) {
        var contentPart = context.content.substring(0, context.offset);
        if (/\b(const|var|let)\s*{\s*[\w\d_,\s]*$/g.test(contentPart)
            || /\bthis\s*\.\s*get\s*\(\s*\)\s*\.\s*[\w\d_]*$/g.test(contentPart)) {
            return document.metadata ? document.metadata.data.concat(document.metadata.computed) : [];
        }
        return null;
    };
    return ComponentGetDataService;
}(Common_1.BaseService));
exports.ComponentGetDataService = ComponentGetDataService;
//# sourceMappingURL=ComponentGetDataService.js.map