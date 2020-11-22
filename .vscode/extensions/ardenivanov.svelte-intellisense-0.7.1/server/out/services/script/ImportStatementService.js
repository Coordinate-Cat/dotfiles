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
var ChoosingService_1 = require("../ChoosingService");
var ComponentPathService_1 = require("./ComponentPathService");
var ComponentNameService_1 = require("./ComponentNameService");
var SupportedImportFileExtensions = [
    '.js',
    '.ts'
];
var ExcludedFileExtensions = [
    '.spec.js'
];
var ImportStatementService = /** @class */ (function (_super) {
    __extends(ImportStatementService, _super);
    function ImportStatementService() {
        return _super.call(this, [
            new ComponentNameService_1.ComponentNameService(),
            new ComponentPathService_1.ComponentPathService({
                extensionsToSearch: ComponentPathService_1.SupportedComponentFileExtensions.concat(SupportedImportFileExtensions),
                extensionsToExclude: ExcludedFileExtensions,
                includeFileExtensionToInsert: false
            })
        ]) || this;
    }
    ImportStatementService.prototype.reduceContext = function (context) {
        var startIndex = context.content.lastIndexOf('import ', context.offset);
        if (startIndex < 0) {
            return null;
        }
        var endIndex = context.content.indexOf(';', startIndex);
        var importStatementContent = endIndex < 0
            ? context.content.substring(startIndex)
            : context.content.substring(startIndex, endIndex);
        var _importStatementRegex = /^import\s+(({[^}]*}|[\w_][\w\d_]*|\*)\s+(as\s+[\w_][\w\d_]*\s+)?from\s+)/i;
        var match = _importStatementRegex.exec(importStatementContent);
        if (match) {
            return {
                content: importStatementContent,
                offset: context.offset - startIndex,
                documentOffset: context.documentOffset
            };
        }
        return null;
    };
    return ImportStatementService;
}(ChoosingService_1.ChoosingService));
exports.ImportStatementService = ImportStatementService;
//# sourceMappingURL=ImportStatementService.js.map