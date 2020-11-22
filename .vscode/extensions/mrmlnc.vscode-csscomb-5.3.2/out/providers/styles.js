"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const vscode = require("vscode");
class StylesProvider extends base_1.default {
    constructor(document, selection, syntax, workspace, filepath, settings) {
        super(workspace, filepath, syntax, settings);
        this.document = document;
        this.selection = selection;
        this.syntax = syntax;
    }
    getBlocks() {
        let range;
        let content;
        if (!this.selection || (this.selection && this.selection.isEmpty)) {
            const lastLine = this.document.lineAt(this.document.lineCount - 1);
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(this.document.lineCount - 1, lastLine.text.length);
            range = new vscode.Range(start, end);
            content = this.document.getText();
        }
        else {
            range = new vscode.Range(this.selection.start, this.selection.end);
            content = this.document.getText(range);
        }
        const syntax = this.getSyntax(this.syntax);
        return [{ syntax, range, content, error: null, changed: false }];
    }
    supportedSyntaxes() {
        return ['css', 'less', 'scss', 'sass', 'sass-indented'];
    }
}
exports.default = StylesProvider;
