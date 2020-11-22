'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ProgressBarTimer {
    constructor() {
        this.secondsRemaining = 0;
        /**
         * Starts a "progress" in the bottom of the vscode window
         * which displays the time remaining for the current combo
         * and whether POWERMODE has been reached or not
         */
        this.startTimer = (timeLimit, onTimerExpired) => {
            this.stopTimer();
            this.active = true;
            this.secondsRemaining = timeLimit;
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Window,
            }, p => {
                return new Promise((resolve, reject) => {
                    // Storing reject will allow us to
                    // cancel the progress
                    this.progressDisposer = reject;
                    p.report({ message: this.getProgressMessage() });
                    this.timerHandle = setInterval(() => {
                        this.secondsRemaining--;
                        p.report({ message: this.getProgressMessage() });
                        if (this.secondsRemaining === 0) {
                            this.stopTimer();
                            onTimerExpired();
                        }
                    }, 1000);
                });
            });
        };
        this.extendTimer = (timeLimit) => {
            this.secondsRemaining = timeLimit;
        };
        /**
         * Disposes the progress and clears the timer that controls it
         */
        this.stopTimer = () => {
            this.active = null;
            clearInterval(this.timerHandle);
            this.timerHandle = null;
            if (this.progressDisposer) {
                this.progressDisposer();
                this.progressDisposer = null;
            }
        };
        /**
         * Builds a message based on whether POWERMODE has been reached
         * and how much time is left on the timer
         * @returns The progress message
         */
        this.getProgressMessage = () => {
            // const messagePrefix = isPowerMode() ? 'POWER MODE ACTIVE!!!' : 'power mode...';
            // return `${messagePrefix}: ${secondsRemaining} seconds`;
            return `${this.secondsRemaining} seconds`;
        };
    }
}
exports.ProgressBarTimer = ProgressBarTimer;
//# sourceMappingURL=progress-timer.js.map