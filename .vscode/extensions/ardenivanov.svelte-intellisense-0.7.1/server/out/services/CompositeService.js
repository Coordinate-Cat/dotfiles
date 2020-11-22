"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvelteDocument_1 = require("../SvelteDocument");
var vscode_languageserver_1 = require("vscode-languageserver");
var util_1 = require("util");
/**
 * Implements a composite completion services that find all appliable services
 *  and merge it completion items to one resulting list.
 */
var CompositeCompletionService = /** @class */ (function () {
    function CompositeCompletionService(services) {
        this._services = services;
    }
    CompositeCompletionService.prototype.getCompletitionItems = function (document, context, workspace) {
        var reducedContext = this.reduceContext(context);
        if (reducedContext === null) {
            return null;
        }
        return this.findServiceResults(document, function (service) { return service.getCompletitionItems(document, reducedContext, workspace); });
    };
    CompositeCompletionService.prototype.getHover = function (document, context, workspace) {
        var reducedContext = this.reduceContext(context);
        if (reducedContext === null) {
            return null;
        }
        var results = this.findServiceResults(document, function (service) { return service.getHover(document, reducedContext, workspace); });
        if (results && results.length > 0) {
            var aggregatedHover_1 = { contents: { kind: vscode_languageserver_1.MarkupKind.Markdown, value: '' } };
            results.forEach(function (element) {
                aggregatedHover_1.contents.value += element.contents.value;
            });
            return aggregatedHover_1;
        }
        else {
            return null;
        }
    };
    CompositeCompletionService.prototype.getDefinitions = function (document, context, workspace) {
        var reducedContext = this.reduceContext(context);
        if (reducedContext === null) {
            return null;
        }
        return this.findServiceResults(document, function (service) { return service.getDefinitions(document, reducedContext, workspace); });
    };
    CompositeCompletionService.prototype.getSupportedSvelteVersions = function () {
        return [SvelteDocument_1.SVELTE_VERSION_2, SvelteDocument_1.SVELTE_VERSION_3];
    };
    CompositeCompletionService.prototype.reduceContext = function (context) {
        return context;
    };
    CompositeCompletionService.prototype.findServiceResults = function (document, callback) {
        var result = null;
        this._services.forEach(function (service) {
            if (service.getSupportedSvelteVersions().indexOf(document.svelteVersion()) < 0) {
                return;
            }
            var serviceResult = callback(service);
            if (serviceResult !== null) {
                if (result === null) {
                    result = [];
                }
                if (util_1.isArray(serviceResult)) {
                    result.push.apply(result, serviceResult);
                }
                else {
                    result.push(serviceResult);
                }
            }
        });
        return result;
    };
    return CompositeCompletionService;
}());
exports.CompositeCompletionService = CompositeCompletionService;
//# sourceMappingURL=CompositeService.js.map