"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const utils = require("./utils");
class NodeModulesImportResolver {
    constructor(documentsCache, documentPath) {
        this.documentsCache = documentsCache;
        this.baseDocumentPath = path.dirname(documentPath);
        this.nodeModulesPath = utils.findNodeModules(this.baseDocumentPath);
    }
    resolve(importee) {
        let importFilePath = path.resolve(this.baseDocumentPath, importee);
        let importedDocument = utils.findSvelteDocumentInCache(importFilePath, this.documentsCache);
        if (importedDocument === null) {
            importFilePath = utils.findSvelteFile(importFilePath);
            if (importFilePath !== null) {
                importedDocument = this.documentsCache.getOrCreateDocumentFromCache(importFilePath);
            }
            else if (this.nodeModulesPath) {
                const moduleFilePath = utils.findSvelteFile(path.resolve(this.nodeModulesPath, importee));
                if (moduleFilePath !== null) {
                    importedDocument = this.documentsCache.getOrCreateDocumentFromCache(moduleFilePath);
                }
            }
        }
        return importedDocument;
    }
    resolvePath(partialPath) {
        if (partialPath.startsWith('./') || partialPath.startsWith('../')) {
            const searchFolderPath = path.resolve(this.baseDocumentPath, partialPath.endsWith('/') ? partialPath : path.dirname(partialPath));
            if (fs.existsSync(searchFolderPath)) {
                return searchFolderPath;
            }
        }
        else if (!partialPath.startsWith('.')) {
            // Search in node modules folder
            if (this.nodeModulesPath) {
                const searchFolderPath = path.resolve(this.nodeModulesPath, partialPath.endsWith('/') ? partialPath : path.dirname(partialPath));
                if (fs.existsSync(searchFolderPath)) {
                    return searchFolderPath;
                }
            }
        }
        return null;
    }
}
exports.NodeModulesImportResolver = NodeModulesImportResolver;
class WebpackImportResolver extends NodeModulesImportResolver {
    constructor(documentsCache, documentPath, alias) {
        super(documentsCache, documentPath);
        this.alias = alias;
    }
    isAlias(file, alias) {
        const trueAlias = alias.endsWith('$') ? alias.substring(0, alias.length - 1) : alias;
        if (trueAlias === file) {
            return true;
        }
        if (!file.startsWith(trueAlias)) {
            return false;
        }
        return file[trueAlias.length] === '/';
    }
    getAlias(file, aliases) {
        for (const p in aliases) {
            if (aliases.hasOwnProperty(p) && this.isAlias(file, p)) {
                return p;
            }
        }
        return null;
    }
    resolve(importee) {
        const result = super.resolve(importee);
        if (result === null) {
            let importFilePath = null;
            let alias = this.getAlias(importee, this.alias);
            if (alias === null) {
                return null;
            }
            importFilePath = importee.substr(alias.length - (alias.endsWith('$') ? 1 : 0));
            if (importFilePath !== '') {
                importFilePath = '.' + importFilePath;
            }
            importFilePath = path.resolve(this.alias[alias], importFilePath);
            importFilePath = utils.findSvelteFile(importFilePath);
            if (importFilePath !== null) {
                return this.documentsCache.getOrCreateDocumentFromCache(importFilePath);
            }
        }
        return null;
    }
    resolvePath(partialPath) {
        const result = super.resolvePath(partialPath);
        if (result === null) {
            let path = null;
            let alias = this.getAlias(partialPath, this.alias);
            if (alias === null) {
                return null;
            }
            path = partialPath.substr(alias.length - (alias.endsWith('$') ? 1 : 0));
            if (path !== '') {
                path = '.' + path;
            }
            path = path.resolve(this.alias[alias], path);
            if (fs.existsSync(path)) {
                return path;
            }
        }
        return null;
    }
}
exports.WebpackImportResolver = WebpackImportResolver;
//# sourceMappingURL=ImportResolvers.js.map