"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const exportsapi_1 = require("../extension/exportsapi");
class Renderer {
    constructor(configStore, sectionFinder) {
        this.configStore = configStore;
        this.sectionFinder = sectionFinder;
    }
    /**
     * Renders coverage to editors
     * @param sections cached set of sections
     * @param textEditors currently visible text editors
     */
    renderCoverage(sections, textEditors) {
        const coverageLines = {
            full: [],
            none: [],
            partial: [],
        };
        textEditors.forEach((textEditor) => {
            // Remove all decorations first to prevent graphical issues
            this.removeDecorationsForEditor(textEditor);
        });
        textEditors.forEach((textEditor) => {
            // Reset lines for new editor
            coverageLines.full = [];
            coverageLines.none = [];
            coverageLines.partial = [];
            // find the section(s) (or undefined) by looking relatively at each workspace
            // users can also optional use absolute instead of relative for this
            const foundSections = this.sectionFinder.findSectionsForEditor(textEditor, sections);
            if (!foundSections.length) {
                return;
            }
            this.filterCoverage(foundSections, coverageLines);
            this.setDecorationsForEditor(textEditor, coverageLines);
            // Cache last coverage lines for exports api
            exportsapi_1.setLastCoverageLines(coverageLines);
        });
    }
    removeDecorationsForEditor(editor) {
        editor.setDecorations(this.configStore.fullCoverageDecorationType, []);
        editor.setDecorations(this.configStore.noCoverageDecorationType, []);
        editor.setDecorations(this.configStore.partialCoverageDecorationType, []);
    }
    setDecorationsForEditor(editor, coverage) {
        // set new coverage on editor
        editor.setDecorations(this.configStore.fullCoverageDecorationType, coverage.full);
        editor.setDecorations(this.configStore.noCoverageDecorationType, coverage.none);
        editor.setDecorations(this.configStore.partialCoverageDecorationType, coverage.partial);
    }
    /**
     * Takes an array of sections and computes the coverage lines
     * @param sections sections to filter the coverage for
     * @param coverageLines the current coverage lines as this point in time
     */
    filterCoverage(sections, coverageLines) {
        sections.forEach((section) => {
            this.filterLineCoverage(section, coverageLines);
            this.filterBranchCoverage(section, coverageLines);
        });
    }
    filterLineCoverage(section, coverageLines) {
        if (!section || !section.lines) {
            return;
        }
        // TODO cleanup this arears by using maps, filters, etc
        section.lines.details.forEach((detail) => {
            if (detail.line < 0) {
                return;
            }
            const lineRange = new vscode_1.Range(detail.line - 1, 0, detail.line - 1, 0);
            if (detail.hit > 0) {
                if (coverageLines.none.find((range) => range.isEqual(lineRange))) {
                    // remove all none coverage, for this line, if one full exists
                    coverageLines.none = coverageLines.none.filter((range) => !range.isEqual(lineRange));
                }
                coverageLines.full.push(lineRange);
            }
            else {
                const fullExists = coverageLines.full.find((range) => range.isEqual(lineRange));
                if (!fullExists) {
                    // only add a none coverage if no full ones exist
                    coverageLines.none.push(lineRange);
                }
            }
        });
    }
    filterBranchCoverage(section, coverageLines) {
        if (!section || !section.branches) {
            return;
        }
        section.branches.details.forEach((detail) => {
            if (detail.taken === 0) {
                if (detail.line < 0) {
                    return;
                }
                const partialRange = new vscode_1.Range(detail.line - 1, 0, detail.line - 1, 0);
                if (coverageLines.full.find((range) => range.isEqual(partialRange))) {
                    // remove full coverage if partial is a better match
                    coverageLines.full = coverageLines.full.filter((range) => !range.isEqual(partialRange));
                    coverageLines.partial.push(partialRange);
                }
            }
        });
    }
}
exports.Renderer = Renderer;
//# sourceMappingURL=renderer.js.map