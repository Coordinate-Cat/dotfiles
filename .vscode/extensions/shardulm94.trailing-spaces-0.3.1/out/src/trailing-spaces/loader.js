'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const logger_1 = require("./logger");
const settings_1 = require("./settings");
const trailing_spaces_1 = require("./trailing-spaces");
class TrailingSpacesLoader {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.settings = settings_1.Settings.getInstance();
        this.trailingSpaces = new trailing_spaces_1.TrailingSpaces();
    }
    activate(subscriptions) {
        subscriptions.push(this);
        this.initialize(subscriptions);
        this.logger.log("Trailing Spaces activated.");
    }
    initialize(subscriptions) {
        vscode.workspace.onDidChangeConfiguration(this.reinitialize, this, subscriptions);
        this.registerCommands(subscriptions);
        this.registerEventListeners();
        this.highlightActiveEditors();
    }
    reinitialize() {
        this.dispose();
        this.settings.refreshSettings();
        this.registerEventListeners();
        this.highlightActiveEditors();
    }
    registerCommands(subscriptions) {
        subscriptions.push(vscode.commands.registerTextEditorCommand('trailing-spaces.deleteTrailingSpaces', this.trailingSpaces.delete, this.trailingSpaces), vscode.commands.registerTextEditorCommand('trailing-spaces.deleteTrailingSpacesModifiedLinesOnly', this.trailingSpaces.deleteModifiedLinesOnly, this.trailingSpaces), vscode.commands.registerTextEditorCommand('trailing-spaces.highlightTrailingSpaces', this.trailingSpaces.highlight, this.trailingSpaces));
    }
    registerEventListeners() {
        let disposables = [];
        if (this.settings.liveMatching) {
            disposables.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
                if (editor !== undefined) {
                    this.logger.log(`onDidChangeActiveTextEditor event called - ${editor.document.fileName}`);
                    this.trailingSpaces.highlight(editor);
                }
            }), vscode.workspace.onDidChangeTextDocument((event) => {
                if (vscode.window.activeTextEditor !== undefined && vscode.window.activeTextEditor.document == event.document) {
                    this.logger.log(`onDidChangeTextDocument event called - ${event.document.fileName}`);
                    this.trailingSpaces.highlight(vscode.window.activeTextEditor);
                }
            }), vscode.workspace.onDidOpenTextDocument((document) => {
                if (vscode.window.activeTextEditor !== undefined && vscode.window.activeTextEditor.document == document) {
                    this.logger.log(`onDidOpenTextDocument event called - ${document.fileName}`);
                    this.trailingSpaces.highlight(vscode.window.activeTextEditor);
                }
            }));
            if (!this.settings.highlightCurrentLine) {
                disposables.push(vscode.window.onDidChangeTextEditorSelection((event) => {
                    let editor = event.textEditor;
                    this.logger.log(`onDidChangeTextEditorSelection event called - ${editor.document.fileName}`);
                    this.trailingSpaces.highlight(editor);
                }));
            }
        }
        if (this.settings.trimOnSave) {
            disposables.push(vscode.workspace.onWillSaveTextDocument((event) => {
                this.logger.log(`onWillSaveTextDocument event called - ${event.document.fileName}`);
                vscode.window.visibleTextEditors.forEach((editor) => {
                    if (event.document.uri === editor.document.uri) {
                        event.waitUntil(Promise.resolve(this.trailingSpaces.getEditsForDeletingTralingSpaces(editor.document)));
                    }
                });
            }));
        }
        this.listenerDisposables = disposables;
    }
    highlightActiveEditors() {
        if (this.settings.liveMatching) {
            vscode.window.visibleTextEditors.forEach((editor) => {
                this.trailingSpaces.highlight(editor);
            });
            this.logger.info("All visible text editors highlighted");
        }
    }
    dispose() {
        if (this.listenerDisposables !== undefined) {
            this.listenerDisposables.forEach(disposable => {
                disposable.dispose();
            });
        }
    }
}
exports.default = TrailingSpacesLoader;
//# sourceMappingURL=loader.js.map