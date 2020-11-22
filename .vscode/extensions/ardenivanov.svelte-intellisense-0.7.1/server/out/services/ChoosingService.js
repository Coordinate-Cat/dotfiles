"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("./Common");
var SvelteDocument_1 = require("../SvelteDocument");
var __defaultServiceOptions = {
    exclusive: false
};
/**
 * Implements a choosing completition services, find first applyable services
 *  and use it to getting completion items.
 */
var ChoosingService = /** @class */ (function () {
    function ChoosingService(services, options) {
        this._services = services;
        this._options = Object.assign({}, __defaultServiceOptions, options);
    }
    ChoosingService.prototype.getCompletitionItems = function (document, context, workspace) {
        var reducedContext = this.reduceContext(context, document, workspace);
        if (reducedContext === null) {
            return null;
        }
        return this.findServiceResults(document, function (service) { return service.getCompletitionItems(document, reducedContext, workspace); }, []);
    };
    ChoosingService.prototype.getHover = function (document, context, workspace) {
        var reducedContext = this.reduceContext(context, document, workspace);
        if (reducedContext === null) {
            return null;
        }
        return this.findServiceResults(document, function (service) { return service.getHover(document, reducedContext, workspace); }, Common_1.EmptyHoverContent);
    };
    ChoosingService.prototype.getDefinitions = function (document, context, workspace) {
        var reducedContext = this.reduceContext(context, document, workspace);
        if (reducedContext === null) {
            return null;
        }
        return this.findServiceResults(document, function (service) { return service.getDefinitions(document, reducedContext, workspace); }, null);
    };
    ChoosingService.prototype.getSupportedSvelteVersions = function () {
        return [SvelteDocument_1.SVELTE_VERSION_2, SvelteDocument_1.SVELTE_VERSION_3];
    };
    ChoosingService.prototype.reduceContext = function (context, _document, _workspace) {
        return context;
    };
    ChoosingService.prototype.findServiceResults = function (document, callback, emptyValue) {
        var result = null;
        this._services.some(function (service) {
            if (service.getSupportedSvelteVersions().indexOf(document.svelteVersion()) < 0) {
                return false;
            }
            var serviceResult = callback(service);
            if (serviceResult) {
                result = serviceResult;
                return true;
            }
            return false;
        });
        if (result === null && this._options.exclusive) {
            return emptyValue;
        }
        return result;
    };
    return ChoosingService;
}());
exports.ChoosingService = ChoosingService;
//# sourceMappingURL=ChoosingService.js.map