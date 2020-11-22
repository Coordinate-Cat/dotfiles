"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVELTE_VERSION_2 = 2;
exports.SVELTE_VERSION_3 = 3;
var SvelteDocument = /** @class */ (function () {
    function SvelteDocument(path) {
        this.path = path;
        this.importedComponents = [];
        this.importResolver = null;
    }
    SvelteDocument.prototype.svelteVersion = function () {
        return this.sveltedoc ? this.sveltedoc.version | exports.SVELTE_VERSION_3 : exports.SVELTE_VERSION_3;
    };
    SvelteDocument.prototype.offsetAt = function (position) {
        return this.document.offsetAt(position);
    };
    SvelteDocument.prototype.positionAt = function (offset) {
        return this.document.positionAt(offset);
    };
    return SvelteDocument;
}());
exports.SvelteDocument = SvelteDocument;
//# sourceMappingURL=SvelteDocument.js.map