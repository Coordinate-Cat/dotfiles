"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var StringHelpers_1 = require("../../StringHelpers");
function findLastOpenTagIndex(content, offset) {
    var startIndex = content.lastIndexOf('<', offset);
    if (startIndex < 0) {
        return -1;
    }
    var endIndex = findTagInnerEndIndex(content, startIndex);
    if (endIndex > 0 && endIndex < offset) {
        return -1;
    }
    return startIndex;
}
exports.findLastOpenTagIndex = findLastOpenTagIndex;
function findNearestOpenTag(content, offset) {
    var positionToSearch = offset;
    var countOfUnclosedTags = 0;
    while (positionToSearch > 0) {
        var startIndex = content.lastIndexOf('<', positionToSearch);
        if (startIndex < 0) {
            return null;
        }
        var endIndex = findTagInnerEndIndex(content, startIndex);
        if (endIndex < 0 || endIndex > positionToSearch) {
            return null;
        }
        if (content.charAt(endIndex - 1) !== '/') {
            if (content.charAt(startIndex + 1) === '/') {
                countOfUnclosedTags++;
            }
            else {
                if (countOfUnclosedTags > 0) {
                    countOfUnclosedTags--;
                }
                else {
                    var tagContent = endIndex < 0
                        ? content.substring(startIndex)
                        : content.substring(startIndex, endIndex);
                    var match = /<(([\w\d_]+:)?[\w_]+[\w\d_]*)\s*/g.exec(tagContent);
                    if (match) {
                        return {
                            tagName: match[1],
                            tagNamespace: match[2],
                            startIndex: startIndex,
                            endIndex: endIndex,
                            content: tagContent,
                        };
                    }
                }
            }
        }
        positionToSearch = startIndex - 1;
    }
    return null;
}
exports.findNearestOpenTag = findNearestOpenTag;
function findLastOpenTag(content, offset) {
    var startIndex = content.lastIndexOf('<', offset);
    if (startIndex < 0) {
        return null;
    }
    var endIndex = findTagInnerEndIndex(content, startIndex);
    if (endIndex > 0 && endIndex < offset) {
        return null;
    }
    var tagContent = endIndex < 0
        ? content.substring(startIndex)
        : content.substring(startIndex, endIndex);
    var match = /<(([\w\d_]+:)?[\w_]+[\w\d_]*)\s*/g.exec(tagContent);
    if (match) {
        return {
            tagName: match[1],
            tagNamespace: match[2],
            startIndex: startIndex,
            endIndex: endIndex,
            content: tagContent,
        };
    }
    return null;
}
exports.findLastOpenTag = findLastOpenTag;
function findTagInnerEndIndex(content, offset) {
    var tagCloseIndex = content.indexOf('>', offset);
    if (tagCloseIndex >= 0) {
        // Check if it is inside expression
        var expressionStartIndex = content.lastIndexOf('{', tagCloseIndex);
        var expressionEndIndex = content.lastIndexOf('}', tagCloseIndex);
        if (expressionStartIndex > offset && expressionStartIndex > expressionEndIndex) {
            return findTagInnerEndIndex(content, tagCloseIndex + 1);
        }
    }
    return tagCloseIndex;
}
exports.findTagInnerEndIndex = findTagInnerEndIndex;
function findLastDirectiveIndex(content, offset, directiveName) {
    var index = content.lastIndexOf(directiveName + ":", offset);
    if (index < 0) {
        return -1;
    }
    var equalIndex = content.indexOf('=', index);
    if (equalIndex > 0 && equalIndex < offset) {
        return -1;
    }
    var spaceIndex = content.indexOf(' ', index);
    if (spaceIndex > 0 && spaceIndex < offset) {
        return -1;
    }
    return index;
}
exports.findLastDirectiveIndex = findLastDirectiveIndex;
function findImportedComponent(componentName, document, documentsCache) {
    var component = document.importedComponents.find(function (c) { return c.name === componentName; });
    if (component === undefined) {
        return null;
    }
    var externalDocument = documentsCache.has(component.filePath) ? documentsCache.get(component.filePath) : null;
    if (externalDocument && !externalDocument.document) {
        externalDocument.document = utils_1.createTextDocument(component.filePath);
    }
    return externalDocument;
}
exports.findImportedComponent = findImportedComponent;
function findNearestOpenComponent(offset, document, documentsCache) {
    var prevTag = findNearestOpenTag(document.content, offset);
    return prevTag === null ? null : findImportedComponent(prevTag.tagName, document, documentsCache);
}
exports.findNearestOpenComponent = findNearestOpenComponent;
function getAttributeLetNameAtOffset(context) {
    var startIndex = StringHelpers_1.regexLastIndexOf(context.content, /\slet:/, context.offset);
    var endIndex = StringHelpers_1.regexIndexOf(context.content, /[\s=]/, context.offset);
    if (endIndex < 0) {
        endIndex = context.content.length;
    }
    if (startIndex < 0 || endIndex < 0 || endIndex < startIndex) {
        return null;
    }
    var name = context.content.substring(startIndex, endIndex);
    var match = /^let:([\w\d_]+)$/.exec(name);
    if (match) {
        return match[1];
    }
    return null;
}
exports.getAttributeLetNameAtOffset = getAttributeLetNameAtOffset;
function getNamedSlotName(content) {
    var match = content.match(/\sslot\s*=?\s*[\'|\"]([\w\d_$]*)[\'|\"]/);
    if (!match) {
        return null;
    }
    else {
        return match[1];
    }
}
exports.getNamedSlotName = getNamedSlotName;
//# sourceMappingURL=TagHelpers.js.map