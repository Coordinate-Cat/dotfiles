"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function regexLastIndexOf(content, regex, startPos) {
    var index = content.substring(0, startPos || content.length).search(regex);
    while (index >= 0) {
        var nextIndex = content.substring(index + 1, startPos || content.length).search(regex);
        if (nextIndex < 0) {
            return index + 1;
        }
        index += nextIndex + 1;
    }
    return -1;
}
exports.regexLastIndexOf = regexLastIndexOf;
function regexIndexOf(content, regex, startPos) {
    var indexOf = content.substring(startPos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startPos || 0)) : indexOf;
}
exports.regexIndexOf = regexIndexOf;
function getIdentifierAtOffset(text, offset) {
    var result = '';
    var position = offset;
    while (text.length > position) {
        var char = text[position];
        if (char && /^[\w\d_$]$/.test(char)) {
            result += char;
            position++;
        }
        else {
            break;
        }
    }
    position = offset - 1;
    while (position >= 0) {
        var char = text[position];
        if (char && /^[\w\d_$]$/.test(char)) {
            result = char + result;
            position--;
        }
        else {
            break;
        }
    }
    return result;
}
exports.getIdentifierAtOffset = getIdentifierAtOffset;
function isInsideAttributeAssign(content, position) {
    var openMustacheIndex = content.lastIndexOf('{', position);
    if (openMustacheIndex >= 2) {
        var quotesUsed = '';
        var prevChar = content.charAt(openMustacheIndex - 1);
        if (prevChar === '\'') {
            quotesUsed = '\'';
            prevChar = content.charAt(openMustacheIndex - 2);
        }
        else if (prevChar === '\"') {
            quotesUsed = '\"';
            prevChar = content.charAt(openMustacheIndex - 2);
        }
        if (prevChar !== '=') {
            return false;
        }
        var closeMustacheIndex = content.indexOf('}' + quotesUsed, openMustacheIndex);
        return closeMustacheIndex > 0 && closeMustacheIndex >= position;
    }
    return false;
}
exports.isInsideAttributeAssign = isInsideAttributeAssign;
//# sourceMappingURL=StringHelpers.js.map