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
var BlockHelpers_1 = require("./BlockHelpers");
var BlockCloseService = /** @class */ (function (_super) {
    __extends(BlockCloseService, _super);
    function BlockCloseService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlockCloseService.prototype.getCompletitionItems = function (document, context) {
        var notClosedBlock = BlockHelpers_1.findNearestNotClosedBlock(context.content, context.offset);
        if (notClosedBlock == null) {
            return null;
        }
        var startIndex = BlockHelpers_1.findLastCloseBlockIndex(context.content, context.offset);
        if (startIndex < 0) {
            return null;
        }
        var contentPart = document.content.substring(startIndex, context.offset);
        if (/{\/[\w\d_]*$/g.test(contentPart)) {
            return [
                {
                    label: notClosedBlock.blockName,
                    kind: vscode_languageserver_1.CompletionItemKind.Keyword,
                    preselect: true,
                    commitCharacters: ['}']
                }
            ];
        }
        return null;
    };
    return BlockCloseService;
}(Common_1.BaseService));
exports.BlockCloseService = BlockCloseService;
//# sourceMappingURL=BlockCloseService.js.map