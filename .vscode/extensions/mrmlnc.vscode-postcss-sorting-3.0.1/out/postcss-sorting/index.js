'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const postcss = require("postcss");
const postless = require("postcss-less");
const postscss = require("postcss-scss");
const postcssSorting = require("postcss-sorting");
function isSupportedSyntax(language) {
    return ['css', 'postcss', 'less', 'scss'].indexOf(language) !== -1;
}
exports.isSupportedSyntax = isSupportedSyntax;
function getSyntax(language) {
    switch (language) {
        case 'less':
            return postless;
        case 'scss':
            return postscss;
        default:
            return false;
    }
}
function use(settings, document, range) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isSupportedSyntax(document.languageId)) {
            console.error('Cannot execute PostCSS Sorting because there is not style files. Supported: LESS, SCSS and CSS.');
            return;
        }
        let text;
        if (!range) {
            const lastLine = document.lineAt(document.lineCount - 1);
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(document.lineCount - 1, lastLine.text.length);
            range = new vscode.Range(start, end);
            text = document.getText();
        }
        else {
            text = document.getText(range);
        }
        const syntax = getSyntax(document.languageId);
        const postcssConfig = {
            from: document.uri.fsPath || vscode.workspace.rootPath || ''
        };
        if (syntax) {
            postcssConfig.syntax = syntax;
        }
        const postcssPlugins = [
            postcssSorting(settings.config)
        ];
        return postcss(postcssPlugins)
            .process(text, postcssConfig)
            .then((result) => ({
            css: result.css,
            range
        }));
    });
}
exports.use = use;
