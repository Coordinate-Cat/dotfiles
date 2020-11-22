'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const config_profiler_1 = require("config-profiler");
const sorter = require("./postcss-sorting");
const settingsManager = require("./managers/settings");
const utils = require("./utils");
const configProfiler = new config_profiler_1.default(null, {
    allowHomeDirectory: true,
    configFiles: [
        'postcss-sorting.js',
        'postcss-sorting.json',
        '.postcss-sorting.js',
        '.postcss-sorting.json'
    ],
    envVariableName: 'POSTCSS_SORTING_CONFIG',
    props: {
        package: 'postcssSortingConfig'
    }
});
function getConfigForFile(document, config) {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    const filepath = document.uri.fsPath;
    const workspace = workspaceFolder ? workspaceFolder.uri.fsPath : filepath;
    configProfiler.setWorkspace(workspace);
    return configProfiler.getConfig(filepath, { settings: config });
}
function use(settings, document, range) {
    return getConfigForFile(document, settings.config)
        .then((config) => !config ? null : sorter.use(config, document, range));
}
function activate(context) {
    const outputChannel = null;
    const supportedDocuments = [
        { language: 'css', scheme: 'file' },
        { language: 'postcss', scheme: 'file' },
        { language: 'scss', scheme: 'file' },
        { language: 'less', scheme: 'file' }
    ];
    const command = vscode.commands.registerTextEditorCommand('postcssSorting.execute', (textEditor) => {
        if (!vscode.window.activeTextEditor) {
            return null;
        }
        const document = textEditor.document;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        const workspaceUri = workspaceFolder ? workspaceFolder.uri : null;
        const settings = settingsManager.getSettings(workspaceUri);
        use(settings, document, null)
            .then((result) => {
            if (!result) {
                return;
            }
            textEditor.edit((editBuilder) => {
                editBuilder.replace(result.range, result.css);
            });
        })
            .catch((err) => utils.output(outputChannel, err, settings.showErrorMessages));
    });
    const format = vscode.languages.registerDocumentRangeFormattingEditProvider(supportedDocuments, {
        provideDocumentRangeFormattingEdits(document, range) {
            if (!vscode.window.activeTextEditor) {
                return null;
            }
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
            const workspaceUri = workspaceFolder ? workspaceFolder.uri : null;
            const settings = settingsManager.getSettings(workspaceUri);
            return use(settings, document, range)
                .then((result) => {
                if (!result) {
                    return;
                }
                return [vscode.TextEdit.replace(result.range, result.css)];
            })
                .catch((err) => utils.output(outputChannel, err, settings.showErrorMessages));
        }
    });
    context.subscriptions.push(command);
    context.subscriptions.push(format);
}
exports.activate = activate;
