"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExtensionError extends Error {
    constructor() {
        super(...arguments);
        this.reportCrash = true;
    }
}
exports.ExtensionError = ExtensionError;
//# sourceMappingURL=extensionerror.js.map