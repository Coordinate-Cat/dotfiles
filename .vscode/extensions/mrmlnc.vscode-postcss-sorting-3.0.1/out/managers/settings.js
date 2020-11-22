'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function getSettings(workspace) {
    const settings = vscode.workspace.getConfiguration(null, workspace).get('postcssSorting');
    const formatOnSave = vscode.workspace.getConfiguration('editor', workspace).get('formatOnSave');
    if (formatOnSave) {
        settings.showErrorMessages = false;
    }
    return settings;
}
exports.getSettings = getSettings;
