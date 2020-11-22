"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TagHelpers_1 = require("../TagHelpers");
const SpecificComponentInnerCompletionService_1 = require("./SpecificComponentInnerCompletionService");
class GenericComponentInnerCompletionService {
    constructor() {
        this.componentsCompletionCache = new Map();
    }
    isApplyable(document, position) {
        const openTag = TagHelpers_1.findLastOpenTag(document, position.offset);
        if (openTag == null) {
            return false;
        }
        const component = document.importedComponents.find(c => c.name == openTag.tagName);
        return component != null;
    }
    getCompletitionItems(document, position, context) {
        const openTag = TagHelpers_1.findLastOpenTag(document, position.offset);
        if (openTag == null) {
            return [];
        }
        const component = document.importedComponents.find(c => c.name === openTag.tagName);
        if (component == null) {
            return [];
        }
        const componentDocument = context.documentsCache.getOrCreateDocumentFromCache(component.filePath);
        if (componentDocument == null) {
            return [];
        }
        const componentService = this.getCompletionServiceForComponent(componentDocument);
        if (componentService == null) {
            return [];
        }
        return componentService.getCompletitionItems(document, position, context);
    }
    getCompletionServiceForComponent(componentDocument) {
        if (!this.componentsCompletionCache.has(componentDocument.path)) {
            const service = new SpecificComponentInnerCompletionService_1.SpecificComponentCompletionService(componentDocument);
            this.componentsCompletionCache.set(componentDocument.path, service);
        }
        return this.componentsCompletionCache.get(componentDocument.path);
    }
}
exports.GenericComponentInnerCompletionService = GenericComponentInnerCompletionService;
//# sourceMappingURL=GenericComponentInnerCompletionService.js.map