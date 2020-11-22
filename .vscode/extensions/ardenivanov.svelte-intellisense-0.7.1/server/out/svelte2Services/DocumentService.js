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
var ChoosingService_1 = require("./ChoosingService");
var ScriptService_1 = require("./script/ScriptService");
var StyleService_1 = require("./style/StyleService");
var MarkupService_1 = require("./markup/MarkupService");
var DocumentService = /** @class */ (function (_super) {
    __extends(DocumentService, _super);
    function DocumentService() {
        return _super.call(this, [
            new ScriptService_1.ScriptService(),
            new StyleService_1.StyleService(),
            new MarkupService_1.MarkupService()
        ]) || this;
    }
    return DocumentService;
}(ChoosingService_1.ChoosingService));
exports.DocumentService = DocumentService;
//# sourceMappingURL=DocumentService.js.map