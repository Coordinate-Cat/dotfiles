// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var beautify = require('./src/index');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    // don't install
    new vscode.window.showWarningMessage('There are many bugs in the extension, please do not use it, the better choice is vetur. 这个插件存在许多BUG，请不要使用，一个好的选择是安装vetur https://marketplace.visualstudio.com/items?itemName=octref.vetur')

    /**
     * format all code
     */
    var format = vscode.commands.registerTextEditorCommand('vueBeautify.format', function (textEditor) {

        // only for language of vue
        if (textEditor.document.languageId !== 'vue' || !/\.vue$/i.test(textEditor.document.fileName)) {
            return;
        }

        // textEditor option
        var editorInsertSpace = textEditor.options.insertSpaces;
        var editorTabSize = textEditor.options.tabSize;
        var isRootIndent = vscode.workspace.getConfiguration('vueBeautify').isRootIndent;

        // editor text
        var text = textEditor.document.getText();

        // beautify code
        var code = beautify(text, !editorInsertSpace, editorTabSize, isRootIndent);

        // edit
        textEditor.edit(function (editBuilder) {
            var document = textEditor.document;
            var lastLine = document.lineAt(document.lineCount - 1);
            var start = new vscode.Position(0, 0);
            var end = new vscode.Position(document.lineCount - 1, lastLine.text.length);
            var range = new vscode.Range(start, end);
            editBuilder.replace(range, code);
        });
    });

    context.subscriptions.push(format);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;