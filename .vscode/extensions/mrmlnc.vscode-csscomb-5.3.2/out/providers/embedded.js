"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = require("./base");
const vscode = require("vscode");
class EmbeddedProvider extends base_1.default {
    constructor(document, syntax, workspace, filepath, settings) {
        super(workspace, filepath, syntax, settings);
        this.document = document;
        this.syntax = syntax;
    }
    getBlocks() {
        const text = this.document.getText();
        let pos = 0;
        let char;
        const blocks = [];
        let syntax = 'css';
        let content;
        let blockStartIndex = -1;
        while (pos < text.length) {
            char = text.charAt(pos);
            // Find start position of opening STYLE tag.
            if (char === '<' && text.substr(pos, 6) === '<style') {
                // Combine all char's to tag
                let tag = '';
                do {
                    char = text.charAt(pos);
                    tag += char;
                    pos++;
                } while (char !== '>' && pos < text.length);
                // We trying support language's defined in the style tag
                const matchedSyntax = tag.match(/lang=['"](.+)?['"]/);
                syntax = this.getSyntax(matchedSyntax ? matchedSyntax[1] : 'css');
                blockStartIndex = pos + 1;
            }
            // Find end position of closing STYLE tag.
            if (char === '<' && text.substr(pos, 8) === '</style>') {
                // Find first newline symbol for the current style tag
                let previous = pos;
                do {
                    char = text.charAt(previous);
                    previous--;
                } while (char !== '\n' && previous >= 0);
                const blockEndIndex = pos - (pos - previous - 1);
                content = text.substring(blockStartIndex, blockEndIndex);
                const start = this.document.positionAt(blockStartIndex);
                const end = this.document.positionAt(blockEndIndex);
                blocks.push({
                    syntax,
                    content,
                    range: new vscode.Range(start, end),
                    error: null,
                    changed: false
                });
                pos += 8;
            }
            pos++;
        }
        return blocks;
    }
    format() {
        const _super = name => super[name];
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blocks = yield _super("format").call(this);
            blocks.forEach((block) => {
                const lines = block.content.split(/\r?\n/);
                const indent = lines[0].match(/^([\s]*)/g);
                if (!indent || !block.changed) {
                    return;
                }
                block.content = lines.map((line, index) => {
                    if (index !== 0 && line !== '') {
                        return indent + line;
                    }
                    return line;
                }).join('\n');
            });
            return blocks;
        });
    }
    supportedSyntaxes() {
        return ['html', 'htm', 'vue', 'vue-html', 'svelte'];
    }
}
exports.default = EmbeddedProvider;
