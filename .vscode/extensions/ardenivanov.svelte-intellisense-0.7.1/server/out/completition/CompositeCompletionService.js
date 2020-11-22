"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implements a composite completion services that find all appliable services
 *  and merge it completion items to one resulting list.
 */
class CompositeCompletionService {
    constructor(services) {
        this._services = services;
    }
    isApplyable(document, position) {
        return this._services.some(service => service.isApplyable(document, position));
    }
    getCompletitionItems(document, position, context) {
        const result = [];
        this._services.forEach(service => {
            result.push(...service.getCompletitionItems(document, position, context));
        });
        return result;
    }
}
exports.CompositeCompletionService = CompositeCompletionService;
//# sourceMappingURL=CompositeCompletionService.js.map