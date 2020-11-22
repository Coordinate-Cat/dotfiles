'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const PickLIst_1 = require("./PickLIst");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // 创建底部按钮
    let backImgBtn = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -999);
    backImgBtn.text = '$(file-media)';
    backImgBtn.command = 'extension.backgroundCover.start';
    backImgBtn.tooltip = 'Switch background image / 切换背景图';
    PickLIst_1.PickList.autoUpdateBackground();
    backImgBtn.show();
    let randomCommand = vscode.commands.registerCommand('extension.backgroundCover.refresh', () => { PickLIst_1.PickList.randomUpdateBackground(); });
    let startCommand = vscode.commands.registerCommand('extension.backgroundCover.start', () => { PickLIst_1.PickList.createItemLIst(); });
    context.subscriptions.push(startCommand);
    context.subscriptions.push(randomCommand);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map