"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class PxRem {
    handle() {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let config = vscode_1.workspace.getConfiguration('vue-helper');
        let px = config['rem-px'];
        if (px === 0) {
            return;
        }
        let len = config['rem-decimal-length'];
        let select = editor.document.getText(new vscode_1.Range(editor.selection.start, editor.selection.end));
        if (/^[0-9]*(\.[0-9]*)?rem$/gi.test(select)) {
            // rem
            let val = parseFloat(select.replace(/rem/gi, '')) * parseFloat(px);
            editor.edit((editBuilder) => {
                editBuilder.replace(new vscode_1.Range(editor.selection.start, editor.selection.end), Math.round(val) + 'px');
            });
        }
        else if (/^[0-9]*(\.[0-9]*)?px$/gi.test(select)) {
            // px
            let val = parseFloat(select.replace(/px/gi, '')) / parseFloat(px);
            let decimal = (val + '').split('.');
            if (decimal.length > 1 && decimal[1].length > len) {
                val = decimal[0] + '.' + decimal[1].substr(0, len - 1);
            }
            editor.edit((editBuilder) => {
                editBuilder.replace(new vscode_1.Range(editor.selection.start, editor.selection.end), val + 'rem');
            });
        }
        else {
            return;
        }
    }
    // 整个文件px替换成rem
    handlePxToRem(type) {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let config = vscode_1.workspace.getConfiguration('vue-helper');
        let px = config['rem-px'];
        if (px === 0) {
            return;
        }
        let len = config['rem-decimal-length'];
        let lineCount = editor.document.lineCount;
        // 1。 获取所有px的位置
        let rangeArr = [];
        let index = -1;
        for (let i = 0; i < lineCount; i++) {
            let textLine = editor.document.lineAt(i);
            let reg = /[0-9]*(\.[0-9]*)?px/gi;
            if (type === 'rem') {
                reg = /[0-9]*(\.[0-9]*)?rem/gi;
            }
            let pxArr = textLine.text.match(reg);
            if (pxArr) {
                for (let j = 0; j < pxArr.length; j++) {
                    const pxItem = pxArr[j];
                    let pos = textLine.text.indexOf(pxItem, index + 1);
                    if (!isNaN(parseFloat(pxItem))) {
                        rangeArr.push({
                            val: pxItem,
                            range: new vscode_1.Range(new vscode_1.Position(textLine.lineNumber, pos), new vscode_1.Position(textLine.lineNumber, pos + pxItem.length))
                        });
                    }
                    index = pos;
                }
                index = -1;
            }
        }
        // 2. 全文件替换px值
        editor.edit((editBuilder) => {
            if (type === 'rem') {
                for (let i = 0; i < rangeArr.length; i++) {
                    const range = rangeArr[i];
                    let val = parseFloat(range.val.replace(/rem/gi, '')) * parseFloat(px);
                    editBuilder.replace(range.range, Math.round(val) + 'px');
                }
            }
            else {
                for (let i = 0; i < rangeArr.length; i++) {
                    const range = rangeArr[i];
                    let val = parseFloat(range.val.replace(/px/gi, '')) / parseFloat(px);
                    let decimal = (val + '').split('.');
                    if (decimal.length > 1 && decimal[1].length > len) {
                        val = decimal[0] + '.' + decimal[1].substr(0, len - 1);
                    }
                    editBuilder.replace(range.range, val + 'rem');
                }
            }
        });
    }
}
exports.PxRem = PxRem;
//# sourceMappingURL=px-rem.js.map