"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var utils = __importStar(require("../utils"));
var NodeModulesImportResolver = /** @class */ (function () {
    function NodeModulesImportResolver(documentsCache, documentPath) {
        this.documentsCache = documentsCache;
        this.documentPath = documentPath;
        this.baseDocumentPath = path.dirname(documentPath);
        this.nodeModulesPath = utils.findNodeModules(this.baseDocumentPath);
    }
    NodeModulesImportResolver.prototype.resolve = function (importee) {
        var importFilePath = path.resolve(this.baseDocumentPath, importee);
        var importedDocument = utils.findSvelteDocumentInCache(importFilePath, this.documentsCache);
        if (importedDocument === null) {
            importFilePath = utils.findSvelteFile(importFilePath);
            if (importFilePath !== null) {
                importedDocument = this.documentsCache.getOrCreateDocumentFromCache(importFilePath);
            }
            else if (this.nodeModulesPath) {
                var moduleFilePath = utils.findSvelteFile(path.resolve(this.nodeModulesPath, importee));
                if (moduleFilePath !== null) {
                    importedDocument = this.documentsCache.getOrCreateDocumentFromCache(moduleFilePath);
                }
            }
        }
        return importedDocument;
    };
    NodeModulesImportResolver.prototype.resolvePath = function (partialPath) {
        if (partialPath.startsWith('./') || partialPath.startsWith('../')) {
            var searchFolderPath = path.resolve(this.baseDocumentPath, partialPath.endsWith('/') ? partialPath : path.dirname(partialPath));
            if (fs.existsSync(searchFolderPath)) {
                return searchFolderPath;
            }
        }
        else if (!partialPath.startsWith('.')) {
            // Search in node modules folder
            if (this.nodeModulesPath) {
                var searchFolderPath = path.resolve(this.nodeModulesPath, partialPath.endsWith('/') ? partialPath : path.dirname(partialPath));
                if (fs.existsSync(searchFolderPath)) {
                    return searchFolderPath;
                }
            }
        }
        return null;
    };
    return NodeModulesImportResolver;
}());
exports.NodeModulesImportResolver = NodeModulesImportResolver;
//# sourceMappingURL=NodeModulesImportResolver.js.map