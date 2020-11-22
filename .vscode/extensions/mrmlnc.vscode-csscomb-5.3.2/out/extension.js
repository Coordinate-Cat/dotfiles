"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const micromatch = require("micromatch");
const styles_1 = require("./providers/styles");
const embedded_1 = require("./providers/embedded");
let output;
/**
 * Show message in iutput channel.
 */
function showOutput(msg) {
    if (!output) {
        output = vscode.window.createOutputChannel('CSSComb');
    }
    output.clear();
    output.appendLine('[CSSComb]\n');
    output.append(msg);
    output.show();
}
function formatEditor(editor, provider) {
    return provider.format().then((blocks) => {
        editor.edit((builder) => {
            blocks.forEach((block) => {
                if (block.error) {
                    showOutput(block.error.toString());
                }
                builder.replace(block.range, block.content);
            });
        });
    }).catch((err) => showOutput(err.stack));
}
function getProvider(document, selection, workspace, filepath, settings) {
    const stylesProvider = new styles_1.default(document, selection, document.languageId, workspace, filepath, settings);
    const embeddedProvider = new embedded_1.default(document, document.languageId, workspace, filepath, settings);
    if (stylesProvider.isApplycable()) {
        return stylesProvider;
    }
    else if (embeddedProvider.isApplycable()) {
        return embeddedProvider;
    }
    return null;
}
function activate(context) {
    const onCommand = vscode.commands.registerTextEditorCommand('csscomb.execute', (textEditor) => {
        // Prevent run command without active TextEditor
        if (!vscode.window.activeTextEditor) {
            return null;
        }
        const document = textEditor.document;
        const selection = textEditor.selection;
        const filepath = document.uri.fsPath;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        // Use workspace directory or filepath of current file as workspace folder
        const workspace = workspaceFolder ? workspaceFolder.uri.fsPath : filepath;
        const workspaceUri = workspaceFolder ? workspaceFolder.uri : null;
        const settings = vscode.workspace.getConfiguration('csscomb', workspaceUri);
        const provider = getProvider(document, selection, workspace, filepath, settings);
        if (!provider) {
            return showOutput(`We do not support "${document.languageId}" syntax.`);
        }
        formatEditor(textEditor, provider);
    });
    const onSave = vscode.workspace.onWillSaveTextDocument((event) => {
        // Prevent run command without active TextEditor
        if (!vscode.window.activeTextEditor) {
            return null;
        }
        const document = event.document;
        const filepath = document.uri.fsPath;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        // Use workspace directory or filepath of current file as workspace folder
        const workspace = workspaceFolder ? workspaceFolder.uri.fsPath : filepath;
        const workspaceUri = workspaceFolder ? workspaceFolder.uri : null;
        const settings = vscode.workspace.getConfiguration('csscomb', workspaceUri);
        // Skip files without providers
        const provider = getProvider(document, null, workspace, filepath, settings);
        // Skip the formatting code without Editor configuration
        if (!settings || !settings.formatOnSave || !provider) {
            return null;
        }
        // Skip excluded files by Editor & CSSComb configuration file
        let excludes = [];
        if (settings && settings.ignoreFilesOnSave) {
            excludes = excludes.concat(settings.ignoreFilesOnSave);
        }
        if (typeof settings.preset === 'object' && settings.preset.exclude) {
            excludes = excludes.concat(settings.preset.exclude);
        }
        if (excludes.length !== 0) {
            const currentFile = path.relative(vscode.workspace.rootPath, event.document.fileName);
            if (micromatch([currentFile], excludes).length !== 0) {
                return null;
            }
        }
        let actions;
        const visibleTextEditors = vscode.window.visibleTextEditors;
        const currentEditor = visibleTextEditors.find((editor) => editor.document.fileName === document.fileName);
        if (currentEditor) {
            actions = formatEditor(currentEditor, provider);
        }
        else {
            actions = provider.format().then((blocks) => {
                return blocks.map((block) => {
                    if (block.error) {
                        showOutput(block.error.toString());
                    }
                    return vscode.TextEdit.replace(block.range, block.content);
                });
            }).catch((err) => showOutput(err.stack));
        }
        event.waitUntil(actions);
    });
    context.subscriptions.push(onCommand);
    context.subscriptions.push(onSave);
}
exports.activate = activate;
