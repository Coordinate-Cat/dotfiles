"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lastCoverageLines = {
    full: [],
    none: [],
    partial: [],
};
function emptyLastCoverage() {
    lastCoverageLines.full = [];
    lastCoverageLines.none = [];
    lastCoverageLines.partial = [];
}
exports.emptyLastCoverage = emptyLastCoverage;
function setLastCoverageLines(coverageLines) {
    lastCoverageLines.full = coverageLines.full;
    lastCoverageLines.none = coverageLines.none;
    lastCoverageLines.partial = coverageLines.partial;
}
exports.setLastCoverageLines = setLastCoverageLines;
/**
 * Pulling the last coverage lines sets the struct back to empty
 */
function getLastCoverageLines() {
    return lastCoverageLines;
}
exports.getLastCoverageLines = getLastCoverageLines;
//# sourceMappingURL=exportsapi.js.map