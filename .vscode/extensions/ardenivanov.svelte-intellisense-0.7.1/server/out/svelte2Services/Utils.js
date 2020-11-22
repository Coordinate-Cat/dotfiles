"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_1 = require("vscode-languageserver");
var Common_1 = require("./Common");
var docUtils = __importStar(require("../svelteDocUtils"));
var utils_1 = require("../utils");
function cloneCompletionItem(item) {
    return {
        additionalTextEdits: item.additionalTextEdits,
        command: item.command,
        commitCharacters: item.commitCharacters,
        data: item.data,
        deprecated: item.deprecated,
        detail: item.detail,
        documentation: item.documentation,
        filterText: item.filterText,
        insertText: item.insertText,
        insertTextFormat: item.insertTextFormat,
        kind: item.kind,
        label: item.label,
        preselect: item.preselect,
        sortText: item.sortText,
        textEdit: item.textEdit
    };
}
exports.cloneCompletionItem = cloneCompletionItem;
function getImportedComponentDocumentation(componentName, document, workspace) {
    if (componentName === null) {
        return null;
    }
    var componentDocument = findImportedComponent(componentName, document, workspace);
    if (componentDocument === null) {
        return Common_1.EmptyHoverContent;
    }
    return {
        contents: {
            kind: vscode_languageserver_1.MarkupKind.Markdown,
            value: docUtils.buildDocumentation(componentDocument.sveltedoc)
        }
    };
}
exports.getImportedComponentDocumentation = getImportedComponentDocumentation;
function getImportedComponentDefinition(componentName, document, workspace) {
    var componentDocument = findImportedComponent(componentName, document, workspace);
    if (componentDocument === null) {
        return null;
    }
    return vscode_languageserver_1.Location.create(utils_1.pathToFileUri(componentDocument.path), vscode_languageserver_1.Range.create(0, 0, 0, 0));
}
exports.getImportedComponentDefinition = getImportedComponentDefinition;
function findImportedComponent(componentName, document, workspace) {
    if (componentName === null) {
        return null;
    }
    var component = document.importedComponents.find(function (c) { return c.name === componentName; });
    if (component === undefined || !workspace.documentsCache.has(component.filePath)) {
        return null;
    }
    return workspace.documentsCache.get(component.filePath);
}
//# sourceMappingURL=Utils.js.map