'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ProgressBar {
    constructor() {
        /**
         * Starts a "progress" in the bottom of the vscode window
         * which displays the time remaining for the current combo
         * and whether POWERMODE has been reached or not
         */
        this.startProgress = (onProgressEnds) => {
            clearProgress();
            secondsRemaining = comboTimeout;
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Window,
            }, p => {
                return new Promise((resolve, reject) => {
                    // Storing reject will allow us to
                    // cancel the progress
                    progressDisposer = reject;
                    p.report({ message: getProgressMessage() });
                    timerHandle = setInterval(() => {
                        secondsRemaining--;
                        p.report({ message: getProgressMessage() });
                        if (secondsRemaining === 0) {
                            resetCombo();
                        }
                    }, 1000);
                });
            });
        };
        /**
         * Disposes the progress and clears the timer that controls it
         */
        this.clearProgress = () => {
            clearInterval(timerHandle);
            timerHandle = null;
            if (progressDisposer) {
                progressDisposer();
                progressDisposer = null;
            }
        };
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=progress-bar.js.map