'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class StatusBarItem {
    /**
     * Creates a "status bar" item in the bottom left of the window
     * This status bar holds the current combo information
     */
    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this.statusBarItem.show();
    }
    dispose() {
        if (this.statusBarItem) {
            this.statusBarItem.dispose();
            this.statusBarItem = null;
        }
    }
}
exports.StatusBarItem = StatusBarItem;
//# sourceMappingURL=status-item.js.map