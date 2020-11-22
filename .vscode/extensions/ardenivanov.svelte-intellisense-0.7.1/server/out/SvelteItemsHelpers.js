"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_1 = require("vscode-languageserver");
function findItemInSvelteDoc(itemsWithHandlers, name) {
    if (!name) {
        return null;
    }
    for (var index = 0; index < itemsWithHandlers.length; index++) {
        var itemTypeAndHandler = itemsWithHandlers[index];
        var foundItem = itemTypeAndHandler.items.find(function (item) { return item.name === name; });
        if (foundItem) {
            return {
                contents: { kind: vscode_languageserver_1.MarkupKind.Markdown, value: itemTypeAndHandler.handler(foundItem) }
            };
        }
    }
    return null;
}
exports.findItemInSvelteDoc = findItemInSvelteDoc;
function findLocationForItemInSvelteDoc(document, items, name) {
    if (!name) {
        return null;
    }
    var item = items.find(function (item) { return item.name === name; });
    if (item && item.locations && item.locations.length > 0) {
        return item.locations.map(function (loc) {
            return {
                uri: document.document.uri,
                range: {
                    start: document.positionAt(loc.start),
                    end: document.positionAt(loc.end)
                }
            };
        });
    }
    return null;
}
exports.findLocationForItemInSvelteDoc = findLocationForItemInSvelteDoc;
//# sourceMappingURL=SvelteItemsHelpers.js.map