"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findLastOpenBlockIndex(document, position) {
    const openBlockIndex = document.content.lastIndexOf('{#', position);
    if (openBlockIndex >= 0) {
        const closeBlockIndex = document.content.indexOf('}', openBlockIndex);
        if (closeBlockIndex > 0 && closeBlockIndex < position) {
            return -1;
        }
    }
    return openBlockIndex;
}
exports.findLastOpenBlockIndex = findLastOpenBlockIndex;
function findLastInnerBlockIndex(document, position) {
    const openIndex = document.content.lastIndexOf('{:');
    if (openIndex < 0) {
        return -1;
    }
    const closeIndex = document.content.indexOf('}', openIndex);
    if (closeIndex > 0 && closeIndex < position) {
        return -1;
    }
    return openIndex;
}
exports.findLastInnerBlockIndex = findLastInnerBlockIndex;
function findLastCloseBlockIndex(document, position) {
    const openIndex = document.content.lastIndexOf('{/', position);
    if (openIndex < 0) {
        return -1;
    }
    const endIndex = document.content.indexOf('}', openIndex);
    if (endIndex > 0 && endIndex < position) {
        return -1;
    }
    return openIndex;
}
exports.findLastCloseBlockIndex = findLastCloseBlockIndex;
function findNearestOpenBlockRange(document, position) {
    const blockStartIndex = document.content.lastIndexOf('{#', position);
    if (blockStartIndex < 0) {
        return null;
    }
    const blockEndTagIndex = document.content.indexOf('}', blockStartIndex);
    if (blockEndTagIndex < 0) {
        return null;
    }
    return {
        startIndex: blockStartIndex,
        endIndex: blockEndTagIndex + 1
    };
}
exports.findNearestOpenBlockRange = findNearestOpenBlockRange;
function findNearestCloseBlockIndex(document, blockName, blockStartIndex) {
    return document.content.indexOf(`{/${blockName}}`, blockStartIndex);
}
exports.findNearestCloseBlockIndex = findNearestCloseBlockIndex;
function findNearestNotClosedBlock(document, offset) {
    let positionToSearch = offset;
    while (positionToSearch > 0) {
        const openBlockRange = this.findNearestOpenBlockRange(document, positionToSearch);
        if (openBlockRange == null) {
            return null;
        }
        const blockContent = document.content.substring(openBlockRange.startIndex, openBlockRange.endIndex);
        const match = /^{#([\w\d_]+).*}$/g.exec(blockContent);
        if (match) {
            const blockName = match[1];
            const closeBlockIndex = this.findNearestCloseBlockIndex(document, blockName, openBlockRange.endIndex);
            if (closeBlockIndex < 0 || closeBlockIndex >= offset) {
                return {
                    blockName,
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