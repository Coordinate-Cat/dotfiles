"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("../Common");
class ComponentGetService extends Common_1.BaseService {
    getCompletitionItems(document, context) {
        if (/\s*(const|var|let)\s*{\s*[\w\d_,\s]*$/g.test(context.content.substring(0, context.offset))) {
            return document.metadata.data;
        }
        return null;
    }
}
exports.ComponentGetService = ComponentGetService;
//# sourceMappingURL=ComponentGetService.js.map