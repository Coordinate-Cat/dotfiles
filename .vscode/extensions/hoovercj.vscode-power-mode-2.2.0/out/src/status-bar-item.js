"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const ENABLED = false;
class StatusBarItem {
    constructor() {
        this.config = {};
        this.activate = () => {
            if (this.statusBarItem) {
                return;
            }
            this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
            this.statusBarItem.show();
        };
        this.dispose = () => {
            if (!this.statusBarItem) {
                return;
            }
            this.statusBarItem.dispose();
            this.statusBarItem = null;
        };
        this.onPowermodeStart = (combo) => {
            // Do nothing
        };
        this.onPowermodeStop = (combo) => {
            // Do nothing
        };
        this.onComboStart = (combo) => {
            this.updateStatusBar(combo);
        };
        this.onComboStop = (combo) => {
            this.updateStatusBar(combo);
        };
        this.onDidChangeTextDocument = (combo, powermode, event) => {
            this.updateStatusBar(combo, powermode);
        };
        this.onDidChangeConfiguration = (config) => {
            this.config.enableStatusBarComboCounter = config.get('enableStatusBarComboCounter', true);
            if (this.config.enableStatusBarComboCounter) {
                this.activate();
            }
            else {
                this.dispose();
            }
        };
        this.updateStatusBar = (combo, powermode) => {
            if (!this.statusBarItem) {
                return;
            }
            const prefix = powermode ? 'POWER MODE!!! ' : '';
            this.statusBarItem.text = `${prefix}Combo: ${combo}`;
        };
    }
}
exports.StatusBarItem = StatusBarItem;
//# sourceMappingURL=status-bar-item.js.map