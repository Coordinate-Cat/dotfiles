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
var path = __importStar(require("path"));
var AliasImportResolver_1 = require("./AliasImportResolver");
var WebpackImportResolver = /** @class */ (function (_super) {
    __extends(WebpackImportResolver, _super);
    function WebpackImportResolver(documentsCache, documentPath, alias) {
        var _this = _super.call(this, documentsCache, documentPath) || this;
        _this.alias = alias;
        return _this;
    }
    WebpackImportResolver.prototype.isAlias = function (file, alias) {
        var trueAlias = alias.endsWith('$') ? alias.substring(0, alias.length - 1) : alias;
        if (trueAlias === file) {
            return true;
        }
        if (!file.startsWith(trueAlias)) {
            return false;
        }
        return file[trueAlias.length] === '/';
    };
    WebpackImportResolver.prototype.getAlias = function (file, aliases) {
        for (var p in aliases) {
            if (aliases.hasOwnProperty(p) && this.isAlias(file, p)) {
                return p;
            }
        }
        return null;
    };
    WebpackImportResolver.prototype.findFileWithAlias = function (partialPath) {
        var importFilePath = null;
        var alias = this.getAlias(partialPath, this.alias);
        if (alias === null) {
            return null;
        }
        importFilePath = partialPath.substr(alias.length - (alias.endsWith('$') ? 1 : 0));
        if (importFilePath !== '') {
            importFilePath = '.' + importFilePath;
        }
        importFilePath = path.resolve(this.alias[alias], importFilePath);
        return importFilePath;
    };
    return WebpackImportResolver;
}(AliasImportResolver_1.AliasImportResolver));
exports.WebpackImportResolver = WebpackImportResolver;
//# sourceMappingURL=WebpackImportResolver.js.map