"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class StatusBarToggler {
    constructor(configStore) {
        this.statusBarItem = vscode_1.window.createStatusBarItem();
        this.statusBarItem.command = StatusBarToggler.watchCommand;
        this.statusBarItem.text = StatusBarToggler.watchText;
        this.statusBarItem.tooltip = StatusBarToggler.toolTip;
        this.configStore = configStore;
        if (this.configStore.showStatusBarToggler) {
            this.statusBarItem.show();
        }
    }
    get statusText() {
        return this.statusBarItem.text;
    }
    /**
     * Toggles the status bar item from watch to remove and vice versa
     */
    toggle(active) {
        if (active) {
            this.statusBarItem.command = StatusBarToggler.removeCommand;
            this.statusBarItem.text = StatusBarToggler.removeText;
        }
        else {
            this.statusBarItem.command = StatusBarToggler.watchCommand;
            this.statusBarItem.text = StatusBarToggler.watchText;
        }
    }
    /**
     * Cleans up the statusBarItem if asked to dispose
     */
    dispose() {
        this.statusBarItem.dispose();
    }
}
StatusBarToggler.watchCommand = "coverage-gutters.watchCoverageAndVisibleEditors";
StatusBarToggler.removeCommand = "coverage-gutters.removeWatch";
StatusBarToggler.watchText = "$(list-ordered) Watch";
StatusBarToggler.removeText = "$(list-ordered) Remove Watch";
StatusBarToggler.toolTip = "Coverage Gutters: Watch and Remove Helper";
exports.StatusBarToggler = StatusBarToggler;
//# sourceMappingURL=statusbartoggler.js.map