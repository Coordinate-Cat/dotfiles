"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvelteDocument_1 = require("../SvelteDocument");
var BaseService = /** @class */ (function () {
    function BaseService() {
    }
    BaseService.prototype.getCompletitionItems = function (_document, _context, _workspace) {
        return null;
    };
    BaseService.prototype.getHover = function (_document, _context, _workspace) {
        return null;
    };
    BaseService.prototype.getDefinitions = function (_document, _context, _workspace) {
        return null;
    };
    BaseService.prototype.getSupportedSvelteVersions = function () {
        return [SvelteDocument_1.SVELTE_VERSION_2, SvelteDocument_1.SVELTE_VERSION_3];
    };
    return BaseService;
}());
exports.BaseService = BaseService;
exports.EmptyHoverContent = {
    contents: null
};
//# sourceMappingURL=Common.js.map