"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findLastOpenBlockIndex(content, position) {
    var openBlockIndex = content.lastIndexOf('{#', position);
    if (openBlockIndex >= 0) {
        var closeBlockIndex = content.indexOf('}', openBlockIndex);
        if (closeBlockIndex > 0 && closeBlockIndex < position) {
            return -1;
        }
    }
    return openBlockIndex;
}
exports.findLastOpenBlockIndex = findLastOpenBlockIndex;
function isInsideOpenBlock(content, position) {
    var openBlockIndex = content.lastIndexOf('{#', position);
    if (openBlockIndex < 0) {
        openBlockIndex = content.lastIndexOf('{:elseif', position);
    }
    if (openBlockIndex < 0) {
        openBlockIndex = content.lastIndexOf('{:else if', position);
    }
    if (openBlockIndex >= 0) {
        var closeBlockIndex = content.indexOf('}', openBlockIndex);
        return closeBlockIndex > 0 && closeBlockIndex >= position;
    }
    return false;
}
exports.isInsideOpenBlock = isInsideOpenBlock;
function findLastInnerBlockIndex(content, position) {
    var openIndex = content.lastIndexOf('{:', position);
    if (openIndex < 0) {
        return -1;
    }
    var closeIndex = content.indexOf('}', openIndex);
    if (closeIndex > 0 && closeIndex < position) {
        return -1;
    }
    return openIndex;
}
exports.findLastInnerBlockIndex = findLastInnerBlockIndex;
function findLastCloseBlockIndex(content, position) {
    var openIndex = content.lastIndexOf('{/', position);
    if (openIndex < 0) {
        return -1;
    }
    var endIndex = content.indexOf('}', openIndex);
    if (endIndex > 0 && endIndex < position) {
        return -1;
    }
    return openIndex;
}
exports.findLastCloseBlockIndex = findLastCloseBlockIndex;
function findNearestOpenBlockRange(content, position) {
    var blockStartIndex = content.lastIndexOf('{#', position);
    if (blockStartIndex < 0) {
        return null;
    }
    var blockEndTagIndex = content.indexOf('}', blockStartIndex);
    if (blockEndTagIndex < 0) {
        return null;
    }
    return {
        startIndex: blockStartIndex,
        endIndex: blockEndTagIndex + 1
    };
}
exports.findNearestOpenBlockRange = findNearestOpenBlockRange;
function findNearestCloseBlockIndex(content, blockName, blockStartIndex) {
    return content.indexOf("{/" + blockName + "}", blockStartIndex);
}
exports.findNearestCloseBlockIndex = findNearestCloseBlockIndex;
function findNearestNotClosedBlock(content, offset) {
    var positionToSearch = offset;
    while (positionToSearch > 0) {
        var openBlockRange = this.findNearestOpenBlockRange(content, positionToSearch);
        if (openBlockRange == null) {
            return null;
        }
        var blockContent = content.substring(openBlockRange.startIndex, openBlockRange.endIndex);
        var match = /^{#([\w\d_]+).*}$/g.exec(blockContent);
        if (match) {
            var blockName = match[1];
            var closeBlockIndex = this.findNearestCloseBlockIndex(content, blockName, openBlockRange.endIndex);
            if (closeBlockIndex < 0 || closeBlockIndex >= offset) {
                return {
                    blockName: blockName,
                    range: openBlockRange
                };
            }
        }
        positionToSearch = openBlockRange.startIndex - 1;
    }
    return null;
}
exports.findNearestNotClosedBlock = findNearestNotClosedBlock;
//# sourceMappingURL=BlockHelpers.js.map