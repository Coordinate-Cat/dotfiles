"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoverageType;
(function (CoverageType) {
    CoverageType[CoverageType["NONE"] = 0] = "NONE";
    CoverageType[CoverageType["LCOV"] = 1] = "LCOV";
    CoverageType[CoverageType["CLOVER"] = 2] = "CLOVER";
    CoverageType[CoverageType["COBERTURA"] = 3] = "COBERTURA";
    CoverageType[CoverageType["JACOCO"] = 4] = "JACOCO";
})(CoverageType = exports.CoverageType || (exports.CoverageType = {}));
class CoverageFile {
    constructor(file) {
        this.file = file;
        this.setFileType(this.file);
    }
    /**
     * Takes a data string and looks for indicators of specific files
     * @param file file to detect type information
     */
    setFileType(file) {
        let possibleType = CoverageType.NONE;
        if (file.includes("<?xml") &&
            file.includes("<coverage") &&
            file.includes("<project")) {
            possibleType = CoverageType.CLOVER;
        }
        else if (file.includes("JACOCO")) {
            possibleType = CoverageType.JACOCO;
        }
        else if (file.includes("<?xml")) {
            possibleType = CoverageType.COBERTURA;
        }
        else if (file !== "") {
            possibleType = CoverageType.LCOV;
        }
        this.type = possibleType;
    }
}
exports.CoverageFile = CoverageFile;
//# sourceMappingURL=coveragefile.js.map