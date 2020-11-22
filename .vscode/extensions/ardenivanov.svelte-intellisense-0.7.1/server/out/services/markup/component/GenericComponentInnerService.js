"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("../../Common");
const TagHelpers_1 = require("../TagHelpers");
const SpecificComponentInnerService_1 = require("./SpecificComponentInnerService");
// TODO Change to ChoosingService and remove SpecificComponentService
class GenericComponentInnerService extends Common_1.BaseService {
    constructor() {
        super(...arguments);
        this.componentsCompletionCache = new Map();
    }
    getCompletitionItems(document, context, workspace) {
        const reducedScope = this.reduceScope(document, context, workspace);
        if (reducedScope === null) {
            return null;
        }
        const componentService = this.getServiceForComponent(reducedScope.data);
        if (componentService == null) {
            return null;
        }
        return componentService.getCompletitionItems(document, reducedScope, workspace);
    }
    reduceScope(document, context, workspace) {
        const openTag = TagHelpers_1.findLastOpenTag(context.content, context.offset);
        if (openTag == null) {
            return null;
        }
        const component = document.importedComponents.find(c => c.name === openTag.tagName);
        if (component === undefined) {
            return null;
        }
        const componentDocument = workspace.documentsCache.get(component.filePath);
        if (componentDocument === null) {
            return null;
        }
        return {
            content: openTag.content,
            offset: context.offset - openTag.startIndex,
            data: componentDocument
        };
    }
    getServiceForComponent(componentDocument) {
        if (!this.componentsCompletionCache.has(componentDocument.path)) {
            const service = new SpecificComponentInnerService_1.SpecificComponentInnerService(componentDocument);
            this.componentsCompletionCache.set(componentDocument.path, service);
        }
        return this.componentsCompletionCache.get(componentDocument.path);
    }
}
exports.GenericComponentInnerService = GenericComponentInnerService;
//# sourceMappingURL=GenericComponentInnerService.js.map