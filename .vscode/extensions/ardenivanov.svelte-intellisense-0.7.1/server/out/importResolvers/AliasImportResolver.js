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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var utils = __importStar(require("../utils"));
var NodeModulesImportResolver_1 = require("./NodeModulesImportResolver");
var AliasImportResolver = /** @class */ (function (_super) {
    __extends(AliasImportResolver, _super);
    function AliasImportResolver(documentsCache, documentPath) {
        return _super.call(this, documentsCache, documentPath) || this;
    }
    AliasImportResolver.prototype.findFileWithAlias = function (_partialPath) {
        return null;
    };
    AliasImportResolver.prototype.resolve = function (importee) {
        var result = _super.prototype.resolve.call(this, importee);
        if (result !== null) {
            return result;
        }
        var importFilePath = this.findFileWithAlias(importee);
        importFilePath = utils.findSvelteFile(importFilePath);
        if (importFilePath !== null) {
            return this.documentsCache.getOrCreateDocumentFromCache(importFilePath);
        }
        return null;
    };
    AliasImportResolver.prototype.resolvePath = function (partialPath) {
        var result = _super.prototype.resolvePath.call(this, partialPath);
        if (result !== null) {
            return result;
        }
        var importFilePath = this.findFileWithAlias(partialPath);
        if (fs.existsSync(importFilePath)) {
            return importFilePath;
        }
        return null;
    };
    return AliasImportResolver;
}(NodeModulesImportResolver_1.NodeModulesImportResolver));
exports.AliasImportResolver = AliasImportResolver;
//# sourceMappingURL=AliasImportResolver.js.map