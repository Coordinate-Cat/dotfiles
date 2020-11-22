'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const app_1 = require("./app");
const definitionProvider_1 = require("./definitionProvider");
const js_complete_1 = require("./js-complete");
const px_rem_1 = require("./px-rem");
function activate(context) {
    let app = new app_1.App();
    let completionItemProvider = new app_1.ElementCompletionItemProvider();
    let registrationHover = vscode.languages.registerHoverProvider('vue', new app_1.DocumentHoverProvider);
    let pxRem = new px_rem_1.PxRem();
    let jsCompletionItemProvider = new js_complete_1.JsCompletionItemProvider();
    // 为标签、属性提示提供自动完成功能, 关闭标签功能
    let completion = vscode.languages.registerCompletionItemProvider(['vue', 'javascript', 'html'], completionItemProvider, '', ':', '<', '"', "'", '/', '@', '(', '>', '{');
    let vueLanguageConfig = vscode.languages.setLanguageConfiguration('vue', { wordPattern: app.WORD_REG });
    let jsCompletion = vscode.languages.registerCompletionItemProvider(['javascript', 'html', 'vue'], jsCompletionItemProvider, '.', '(');
    // 函数补全函数
    let functionCompletionDisposable = vscode.commands.registerCommand('vue-helper.functionCompletion', () => {
        app.autoComplement();
    });
    // 删除处理函数
    let deleteCompleteDisposable = vscode.commands.registerCommand('vue-helper.deleteComplete', () => {
        app.deleteComplete();
    });
    // 格式化html标签
    // let tagFormatDisposable = vscode.commands.registerCommand('vue-helper.tagFormat', () => {
    //     app.tagFormat()
    // })
    // 代码块选择
    let blockSelectDisposable = vscode.commands.registerCommand('vue-helper.blockSelect', () => {
        app.blockSelect();
    });
    // px、rem转化函数
    let pxRemDisposable = vscode.commands.registerCommand('vue-helper.pxRem', () => {
        pxRem.handle();
    });
    // pxToRem
    let pxToRemDisposable = vscode.commands.registerCommand('vue-helper.pxToRem', () => {
        pxRem.handlePxToRem('px');
    });
    // remToPx
    let remToPxDisposable = vscode.commands.registerCommand('vue-helper.remToPx', () => {
        pxRem.handlePxToRem('rem');
    });
    // 到达定义函数
    let vueHelperDefinition = vscode.languages.registerDefinitionProvider(['vue', 'javascript', 'html'], new definitionProvider_1.vueHelperDefinitionProvider());
    context.subscriptions.push(app, completion, vueLanguageConfig, registrationHover, functionCompletionDisposable, deleteCompleteDisposable, vueHelperDefinition, pxRemDisposable, pxToRemDisposable, remToPxDisposable, blockSelectDisposable, jsCompletion);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map