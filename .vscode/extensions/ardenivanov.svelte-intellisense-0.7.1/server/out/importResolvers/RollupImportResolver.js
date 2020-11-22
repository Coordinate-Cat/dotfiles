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
var AliasImportResolver_1 = require("./AliasImportResolver");
var RollupImportResolver = /** @class */ (function (_super) {
    __extends(RollupImportResolver, _super);
    function RollupImportResolver(documentsCache, documentPath, plugins) {
        var _this = _super.call(this, documentsCache, documentPath) || this;
        _this.resolvePlugins = plugins.filter(function (x) { return x.hasOwnProperty('resolveId'); });
        return _this;
    }
    RollupImportResolver.prototype.findFileWithAlias = function (partialPath) {
        var _this = this;
        var importFilePath = null;
        this.resolvePlugins.forEach(function (plugin) {
            try {
                var resolvedId = plugin.resolveId(partialPath, _this.documentPath);
                if (resolvedId && (typeof resolvedId === 'string')) {
                    importFilePath = resolvedId;
                }
            }
            catch (_a) { }
        });
        return importFilePath;
    };
    return RollupImportResolver;
}(AliasImportResolver_1.AliasImportResolver));
exports.RollupImportResolver = RollupImportResolver;
//# sourceMappingURL=RollupImportResolver.js.map