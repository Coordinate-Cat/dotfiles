'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const logger_1 = require("./logger");
const settings_1 = require("./settings");
const utils = require("./utils");
const fs = require("fs");
const util_1 = require("util");
class TrailingSpaces {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.settings = settings_1.Settings.getInstance();
    }
    highlight(editor, editorEdit = undefined) {
        this.highlightTrailingSpaces(editor);
    }
    delete(editor, editorEdit) {
        this.deleteTrailingSpaces(editor, editorEdit);
    }
    deleteModifiedLinesOnly(editor, editorEdit) {
        this.deleteTrailingSpaces(editor, editorEdit, true);
    }
    /**
     * Highlights the trailing spaces in the current editor.
     *
     * @private
     * @param {vscode.TextEditor} editor The editor in which the spaces have to be highlighted
     */
    highlightTrailingSpaces(editor) {
        editor.setDecorations(this.settings.textEditorDecorationType, this.getRangesToHighlight(editor.document, editor.selection));
    }
    /**
     * Deletes the trailing spaces in the current editor.
     *
     * @private
     * @param {vscode.TextEditor} editor The editor in which the spaces have to be deleted
     * @param {vscode.TextEditorEdit} editBuilder The edit builders for apply deletions
     * @param {boolean} deleteModifiedLinesOnlyOverride Whether to only deleted modified lines regardless of the settings
     */
    deleteTrailingSpaces(editor, editBuilder, deleteModifiedLinesOnlyOverride = false) {
        let ranges = this.getRangesToDelete(editor.document, deleteModifiedLinesOnlyOverride);
        for (let i = ranges.length - 1; i >= 0; i--) {
            editBuilder.delete(ranges[i]);
        }
        this.showStatusBarMessage(editor.document, ranges.length, true);
    }
    /**
     * Returns the edits required to delete the trailings spaces from a document
     *
     * @param {vscode.TextDocument} document The document in which the trailing spaces should be found
     * @returns {vscode.TextEdit[]} An array of edits required to delete the trailings spaces from the document
     */
    getEditsForDeletingTralingSpaces(document) {
        let ranges = this.getRangesToDelete(document);
        let edits = new Array(ranges.length);
        for (let i = ranges.length - 1; i >= 0; i--) {
            edits[ranges.length - 1 - i] = vscode.TextEdit.delete(ranges[i]);
        }
        this.showStatusBarMessage(document, ranges.length);
        return edits;
    }
    /**
     * Displays a status bar message containing the number of trailing space regions deleted
     *
     * @private
     * @param {vscode.TextDocument} document The document for which the message has to be shown
     * @param {number} numRegions Number of trailing space regions found
     * @param {boolean} showIfNoRegions Should the message be shown even if no regions are founds
     */
    showStatusBarMessage(document, numRegions, showIfNoRegions = false) {
        let message;
        if (numRegions > 0) {
            message = `Deleting ${numRegions} trailing space region${(numRegions > 1 ? "s" : "")}`;
        }
        else {
            message = "No trailing spaces to delete!";
        }
        this.logger.info(message + " - " + document.fileName);
        if (this.settings.showStatusBarMessage) {
            if (numRegions > 0 || showIfNoRegions) {
                vscode.window.setStatusBarMessage(message, 3000);
            }
        }
    }
    /**
     * Gets trailing spaces ranges which have to be highlighted.
     *
     * @private
     * @param {vscode.TextDocument} document The document in which the trailing spaces should be found
     * @param {vscode.Selection} selection The current selection inside the editor
     * @returns {vscode.Range[]} An array of ranges containing the trailing spaces
     */
    getRangesToHighlight(document, selection) {
        let ranges = this.findTrailingSpaces(document);
        if (!this.settings.highlightCurrentLine) {
            let currentPosition = document.validatePosition(selection.end);
            let currentLine = document.lineAt(currentPosition);
            ranges = ranges.filter(range => {
                return range.intersection(currentLine.range) == undefined;
            });
        }
        return ranges;
    }
    /**
     * Gets trailing spaces ranges which have to be deleted.
     *
     * @private
     * @param {vscode.TextDocument} document The document in which the trailing spaces should be found
     * @param {boolean} deleteModifiedLinesOnlyOverride Whether to delete only modified lines regardless of the settings
     * @returns {vscode.Range[]} An array of ranges containing the trailing spaces
     */
    getRangesToDelete(document, deleteModifiedLinesOnlyOverride = false) {
        let ranges = this.findTrailingSpaces(document);
        // If deleteModifiedLinesOnly is set, filter out the ranges contained in the non-modified lines
        if ((this.settings.deleteModifiedLinesOnly || deleteModifiedLinesOnlyOverride)
            && !document.isUntitled && document.uri.scheme == "file") {
            let modifiedLines = utils.getModifiedLineNumbers(fs.readFileSync(document.uri.fsPath, "utf-8"), document.getText());
            ranges = ranges.filter((range) => {
                return (modifiedLines.has(range.start.line));
            });
        }
        return ranges;
    }
    /**
     * Finds all ranges in the document which contain trailing spaces
     *
     * @private
     * @param {vscode.TextDocument} document The document in which the trailing spaces should be found
     * @returns {vscode.Range[]} An array of ranges containing the trailing spaces
     */
    findTrailingSpaces(document) {
        if (this.ignoreDocument(document.languageId, document.uri.scheme)) {
            this.logger.info(`File with langauge '${document.languageId}' and scheme '${document.uri.scheme}' ignored - ${document.fileName}`);
            return [];
        }
        else {
            let offendingRanges = [];
            let regexp = "(" + this.settings.regexp + ")$";
            let noEmptyLinesRegexp = "\\S" + regexp;
            let offendingRangesRegexp = new RegExp(this.settings.includeEmptyLines ? regexp : noEmptyLinesRegexp, "gm");
            let documentText = document.getText();
            let match;
            // Loop through all the trailing spaces in the document
            while ((match = offendingRangesRegexp.exec(documentText)) !== null) {
                let matchStart = (match.index + match[0].length - match[1].length), matchEnd = match.index + match[0].length;
                let matchRange = new vscode.Range(document.positionAt(matchStart), document.positionAt(matchEnd));
                // Ignore ranges which are empty (only containing a single line ending)
                if (!matchRange.isEmpty) {
                    offendingRanges.push(matchRange);
                }
            }
            return offendingRanges;
        }
    }
    /**
     * Checks if the language or the scheme of the document is set to be ignored.
     *
     * @private
     * @param {string} language The language of the document to be checked
     * @param {string} scheme The scheme of the document to be checked
     * @returns {boolean} A boolean indicating if the document needs to be ignored
     */
    ignoreDocument(language, scheme) {
        return (!util_1.isNullOrUndefined(language) && this.settings.languagesToIgnore[language]
            || !util_1.isNullOrUndefined(scheme) && this.settings.schemesToIgnore[scheme]);
    }
}
exports.TrailingSpaces = TrailingSpaces;
//# sourceMappingURL=trailing-spaces.js.map