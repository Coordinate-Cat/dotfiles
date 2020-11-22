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
var fs = __importStar(require("fs"));
var Common_1 = require("../Common");
var vscode_languageserver_1 = require("vscode-languageserver");
var Utils_1 = require("../Utils");
exports.SupportedComponentFileExtensions = [
    '.svelte',
    '.html'
];
var __defaultOptions = {
    extensionsToSearch: exports.SupportedComponentFileExtensions,
    extensionsToExclude: [],
    includeFileExtensionToInsert: true
};
var ComponentPathService = /** @class */ (function (_super) {
    __extends(ComponentPathService, _super);
    function ComponentPathService(options) {
        var _this = _super.call(this) || this;
        _this._options = Object.assign({}, __defaultOptions, options);
        return _this;
    }
    ComponentPathService.prototype.getCompletitionItems = function (document, context, _workspace) {
        var prevContent = context.content.substring(0, context.offset);
        // Find open quote for component path
        var quote = '\'';
        var openQuoteIndex = prevContent.lastIndexOf(quote);
        if (openQuoteIndex < 0) {
            quote = '"';
            openQuoteIndex = prevContent.lastIndexOf(quote);
        }
        if (openQuoteIndex < 0) {
            quote = '`';
            openQuoteIndex = prevContent.lastIndexOf(quote);
        }
        if (openQuoteIndex <= 0) {
            return null;
        }
        // Check that cursor positioned in component path string
        if (prevContent.indexOf(quote, openQuoteIndex + 1) < 0
            && prevContent.lastIndexOf(quote, openQuoteIndex - 1) <= prevContent.lastIndexOf(':', openQuoteIndex - 1)) {
            var partialPath = prevContent.substring(openQuoteIndex + 1);
            // Do nothing if partial path started from root folder
            if (partialPath.startsWith('/')) {
                return [];
            }
            // Don't show auto-completion for hidden items
            if (/[\\\/]\.+$/g.test(partialPath)) {
                return [];
            }
            var result = [];
            if (document.importResolver !== null) {
                var resolvedPath = document.importResolver.resolvePath(partialPath);
                if (resolvedPath !== null) {
                    result.push.apply(result, this.searchFolderItems(resolvedPath, partialPath, resolvedPath.indexOf('node_modules') >= 0));
                }
            }
            return result;
        }
        return null;
    };
    ComponentPathService.prototype.getDefinitions = function (document, context, workspace) {
        var prevContent = context.content.substring(0, context.offset);
        var nextContent = context.content.substring(context.offset);
        var componentFileNameStartSearchResult = /\b([\w\d_.]+)$/g.exec(prevContent);
        var componentFileNameEndSearchResult = /^([\w\d_.]+)\s*['"]/g.exec(nextContent);
        if (componentFileNameStartSearchResult !== null && componentFileNameEndSearchResult !== null) {
            var componentNameSearchResult = /[^,{]\s*([\w\d_]+)\s*:.+$/g.exec(prevContent);
            if (componentNameSearchResult !== null) {
                var componentName = componentNameSearchResult[1];
                return Utils_1.getImportedComponentDefinition(componentName, document, workspace);
            }
            var componentImportSearchResult = /import\s{\s*([\w\d_]+)\s}\s*from\s*.+$/g.exec(prevContent);
            if (componentImportSearchResult !== null) {
                var componentName = componentImportSearchResult[1];
                return Utils_1.getImportedComponentDefinition(componentName, document, workspace);
            }
        }
        return null;
    };
    ComponentPathService.prototype.searchFolderItems = function (searchFolderPath, partialPath, isFromNodeModules) {
        var _this = this;
        return fs.readdirSync(searchFolderPath)
            .map(function (foundPath) {
            var basename = path.basename(foundPath);
            // Don't include hidden items
            if (basename.startsWith('.')) {
                return null;
            }
            var partialBaseName = path.basename(partialPath);
            var itemStats = fs.lstatSync(path.resolve(searchFolderPath, foundPath));
            if (itemStats.isDirectory() || itemStats.isSymbolicLink()) {
                return {
                    label: basename,
                    kind: vscode_languageserver_1.CompletionItemKind.Folder,
                    detail: isFromNodeModules ? 'from node_modules' : null,
                    commitCharacters: ['/'],
                    insertText: basename.startsWith('@') && partialBaseName.startsWith('@')
                        ? basename.substring(1)
                        : basename,
                    filterText: basename.startsWith('@')
                        ? basename.substring(1)
                        : basename,
                    sortText: "1." + basename
                };
            }
            if (itemStats.isFile()) {
                var extname = path.extname(foundPath);
                if (_this.isIncludedFileName(basename)) {
                    var fileNameToInsert = _this._options.includeFileExtensionToInsert
                        ? basename
                        : path.basename(basename, extname);
                    // Check that file is a Svelte component file or not?
                    if (exports.SupportedComponentFileExtensions.indexOf(extname) >= 0) {
                        return {
                            label: basename,
                            kind: vscode_languageserver_1.CompletionItemKind.Class,
                            detail: '[Svelte] component' + (isFromNodeModules ? ' from node_modules' : ''),
                            commitCharacters: ['\''],
                            sortText: "2." + basename,
                            insertText: fileNameToInsert
                        };
                    }
                    // Return a default file item statement
                    return {
                        label: basename,
                        kind: vscode_languageserver_1.CompletionItemKind.File,
                        detail: isFromNodeModules ? 'from node_modules' : null,
                        commitCharacters: ['\''],
                        sortText: "2." + basename,
                        insertText: fileNameToInsert
                    };
                }
            }
            return null;
        })
            .filter(function (item) { return item != null; });
    };
    ComponentPathService.prototype.isIncludedFileName = function (basename) {
        return this._options.extensionsToSearch.some(function (ext) { return basename.endsWith(ext); })
            && !this._options.extensionsToExclude.some(function (ext) { return basename.endsWith(ext); });
    };
    return ComponentPathService;
}(Common_1.BaseService));
exports.ComponentPathService = ComponentPathService;
//# sourceMappingURL=ComponentPathService.js.map