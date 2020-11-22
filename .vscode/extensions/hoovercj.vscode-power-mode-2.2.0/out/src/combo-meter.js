'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ComboMeter {
    constructor() {
        this.range = new vscode.Range(0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        this.createBaseDecoration();
    }
    updateCombo(combo) {
        const activeEditor = vscode.window.activeTextEditor;
        activeEditor.setDecorations(this.decoration, [{
                renderOptions: {
                    before: {
                        contentText: `Combo: ${combo}`,
                    }
                },
                range: this.range
            }]);
    }
    dispose() {
        this.decoration.dispose();
    }
    createBaseDecoration() {
        // const position = 'position: fixed;';
        const position = 'position: absolute;';
        const top = 'top: 0;';
        const right = 'right: 90%;';
        const zindex = 'z-index: 2147483647;';
        this.afterStyling = `none; ${position} ${right} ${top} ${zindex}`;
        // const opacity = 'opacity: .6;';
        this.decoration =
            vscode.window.createTextEditorDecorationType({
                before: {
                    backgroundColor: 'green',
                    color: 'red',
                    borderColor: 'blue',
                    height: '50px',
                    width: '50px',
                    textDecoration: this.afterStyling
                },
                backgroundColor: 'red',
                textDecoration: `none; position: relative;`,
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                isWholeLine: true
            });
    }
}
exports.ComboMeter = ComboMeter;
//# sourceMappingURL=combo-meter.js.map