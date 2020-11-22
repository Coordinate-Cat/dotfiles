"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findLastOpenTagIndex(document, offset) {
    const startIndex = document.content.lastIndexOf('<', offset);
    if (startIndex < 0) {
        return -1;
    }
    const endIndex = document.content.indexOf('>', offset);
    if (endIndex > 0 && endIndex < offset) {
        return -1;
    }
    return startIndex;
}
exports.findLastOpenTagIndex = findLastOpenTagIndex;
function findLastOpenTag(document, offset) {
    const startIndex = findLastOpenTagIndex(document, offset);
    if (startIndex < 0) {
        return null;
    }
    const tagContent = document.content.substring(startIndex, offset);
    const match = /<(([\w\d_]+:)?[\w_]+[\w\d_]*)\s*/g.exec(tagContent);
    if (match) {
        return {
            tagName: match[1],
            tagNamespace: match[2],
            startIndex: startIndex,
            content: tagContent,
        };
    }
    return null;
}
exports.findLastOpenTag = findLastOpenTag;
function findLastDirectiveIndex(document, offset, directiveName) {
    const index = document.content.lastIndexOf(`${directiveName}:`, offset);
    if (index < 0) {
        return -1;
    }
    const equalIndex = document.content.indexOf('=', index);
    if (equalIndex > 0 && equalIndex < offset) {
        return -1;
    }
    const spaceIndex = document.content.indexOf(' ', index);
    if (spaceIndex > 0 && spaceIndex < offset) {
        return -1;
    }
    return index;
}
exports.findLastDirectiveIndex = findLastDirectiveIndex;
//# sourceMappingURL=TagHelpers.js.map