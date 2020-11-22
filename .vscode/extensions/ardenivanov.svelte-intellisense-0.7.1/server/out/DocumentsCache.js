"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvelteDocument_1 = require("./SvelteDocument");
var DocumentsCache = /** @class */ (function () {
    function DocumentsCache() {
        this.cache = new Map();
    }
    DocumentsCache.prototype.has = function (path) {
        return this.cache.has(path);
    };
    DocumentsCache.prototype.get = function (path) {
        return this.cache.get(path);
    };
    DocumentsCache.prototype.getOrCreateDocumentFromCache = function (path, createIfNotExists) {
        if (createIfNotExists === void 0) { createIfNotExists = true; }
        if (!this.cache.has(path)) {
            if (createIfNotExists) {
                this.cache.set(path, new SvelteDocument_1.SvelteDocument(path));
            }
            else {
                return null;
            }
        }
        return this.cache.get(path);
    };
    return DocumentsCache;
}());
exports.DocumentsCache = DocumentsCache;
//# sourceMappingURL=DocumentsCache.js.map