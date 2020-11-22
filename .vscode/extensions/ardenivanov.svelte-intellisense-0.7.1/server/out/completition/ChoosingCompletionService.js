"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implements a choosing completition services, find first applyable services
 *  and use it to getting completion items.
 */
class ChoosingCompletionService {
    constructor(services) {
        this._services = services;
    }
    isApplyable(document, position) {
        return this.findCompletitionService(document, position) != null;
    }
    getCompletitionItems(document, position, context) {
        const service = this.findCompletitionService(document, position);
        if (service == null) {
            return [];
        }
        return service.getCompletitionItems(document, position, context);
    }
    findCompletitionService(document, position) {
        return this._services.find(service => service.isApplyable(document, position));
    }
}
exports.ChoosingCompletionService = ChoosingCompletionService;
//# sourceMappingURL=ChoosingCompletionService.js.map