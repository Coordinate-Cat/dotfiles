"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implements a choosing hover services, find first applyable services
 *  and use it to getting hover.
 */
class ChoosingHoverService {
    constructor(services) {
        this._services = services;
    }
    isApplyable(document, position) {
        return this.findHoverService(document, position) != null;
    }
    getHover(document, position, context) {
        const service = this.findHoverService(document, position);
        if (service == null) {
            return null;
        }
        return service.getHover(document, position, context);
    }
    findHoverService(document, position) {
        return this._services.find(service => service.isApplyable(document, position));
    }
}
exports.ChoosingHoverService = ChoosingHoverService;
//# sourceMappingURL=ChoosingHoverService.js.map