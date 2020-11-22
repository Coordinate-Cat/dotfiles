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
var ComputedDependencyService = /** @class */ (function (_super) {
    __extends(ComputedDependencyService, _super);
    function ComputedDependencyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComputedDependencyService.prototype.getCompletitionItems = function (document, context) {
        var content = context.content.substring(0, context.offset);
        if (/[{,]?\s*[\w_]+[\w\d_]*\s*\:?\s*\(\s*\{\s*[\w\d_,\s]*$/g.test(content)) {
            return document.metadata
                ? document.metadata.data
                : [];
        }
        return null;
    };
    return ComputedDependencyService;
}(Common_1.BaseService));
exports.ComputedDependencyService = ComputedDependencyService;
//# sourceMappingURL=ComputedDependencyService.js.map