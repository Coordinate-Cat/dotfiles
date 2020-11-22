"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const clover_json_1 = require("@cvrg-report/clover-json");
const cobertura_parse_1 = require("cobertura-parse");
const jacoco_parse_1 = require("jacoco-parse");
const lcov_parse_1 = require("lcov-parse");
const coveragefile_1 = require("./coveragefile");
class CoverageParser {
    constructor(outputChannel) {
        this.outputChannel = outputChannel;
    }
    /**
     * Extracts coverage sections of type xml and lcov
     * @param files array of coverage files in string format
     */
    filesToSections(files) {
        return __awaiter(this, void 0, void 0, function* () {
            let coverages = new Map();
            for (const file of files) {
                const fileName = file[0];
                const fileContent = file[1];
                // file is an array
                let coverage = new Map();
                // get coverage file type
                const coverageFile = new coveragefile_1.CoverageFile(fileContent);
                switch (coverageFile.type) {
                    case coveragefile_1.CoverageType.CLOVER:
                        coverage = yield this.xmlExtractClover(fileName, fileContent);
                        break;
                    case coveragefile_1.CoverageType.JACOCO:
                        coverage = yield this.xmlExtractJacoco(fileName, fileContent);
                        break;
                    case coveragefile_1.CoverageType.COBERTURA:
                        coverage = yield this.xmlExtractCobertura(fileName, fileContent);
                        break;
                    case coveragefile_1.CoverageType.LCOV:
                        coverage = yield this.lcovExtract(fileName, fileContent);
                        break;
                    default:
                        break;
                }
                // add new coverage map to existing coverages generated so far
                coverages = new Map([...coverages, ...coverage]);
            }
            return coverages;
        });
    }
    convertSectionsToMap(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sections = new Map();
            const addToSectionsMap = (section) => __awaiter(this, void 0, void 0, function* () {
                sections.set(section.title + "::" + section.file, section);
            });
            // convert the array of sections into an unique map
            const addPromises = data.map(addToSectionsMap);
            yield Promise.all(addPromises);
            return sections;
        });
    }
    xmlExtractCobertura(filename, xmlFile) {
        return new Promise((resolve) => {
            const checkError = (err) => {
                if (err) {
                    err.message = `filename: ${filename} ${err.message}`;
                    this.handleError("cobertura-parse", err);
                    return resolve(new Map());
                }
            };
            try {
                cobertura_parse_1.parseContent(xmlFile, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    checkError(err);
                    const sections = yield this.convertSectionsToMap(data);
                    return resolve(sections);
                }), true);
            }
            catch (error) {
                checkError(error);
            }
        });
    }
    xmlExtractJacoco(filename, xmlFile) {
        return new Promise((resolve) => {
            const checkError = (err) => {
                if (err) {
                    err.message = `filename: ${filename} ${err.message}`;
                    this.handleError("jacoco-parse", err);
                    return resolve(new Map());
                }
            };
            try {
                jacoco_parse_1.parseContent(xmlFile, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    checkError(err);
                    const sections = yield this.convertSectionsToMap(data);
                    return resolve(sections);
                }));
            }
            catch (error) {
                checkError(error);
            }
        });
    }
    xmlExtractClover(filename, xmlFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield clover_json_1.parseContent(xmlFile);
                const sections = yield this.convertSectionsToMap(data);
                return sections;
            }
            catch (error) {
                error.message = `filename: ${filename} ${error.message}`;
                this.handleError("clover-parse", error);
                return new Map();
            }
        });
    }
    lcovExtract(filename, lcovFile) {
        return new Promise((resolve) => {
            const checkError = (err) => {
                if (err) {
                    err.message = `filename: ${filename} ${err.message}`;
                    this.handleError("lcov-parse", err);
                    return resolve(new Map());
                }
            };
            try {
                lcov_parse_1.source(lcovFile, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    checkError(err);
                    const sections = yield this.convertSectionsToMap(data);
                    return resolve(sections);
                }));
            }
            catch (error) {
                checkError(error);
            }
        });
    }
    handleError(system, error) {
        const message = error.message ? error.message : error;
        const stackTrace = error.stack;
        this.outputChannel.appendLine(`[${Date.now()}][coverageparser][${system}]: Error: ${message}`);
        if (stackTrace) {
            this.outputChannel.appendLine(`[${Date.now()}][coverageparser][${system}]: Stacktrace: ${stackTrace}`);
        }
    }
}
exports.CoverageParser = CoverageParser;
//# sourceMappingURL=coverageparser.js.map