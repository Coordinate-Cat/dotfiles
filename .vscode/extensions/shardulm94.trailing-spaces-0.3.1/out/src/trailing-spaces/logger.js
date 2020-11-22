'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["none"] = 0] = "none";
    LogLevel[LogLevel["error"] = 1] = "error";
    LogLevel[LogLevel["warn"] = 2] = "warn";
    LogLevel[LogLevel["info"] = 3] = "info";
    LogLevel[LogLevel["log"] = 4] = "log";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Logger {
    constructor(prefix, level) {
        if (!Logger.instance) {
            Logger.instance = this;
            this.prefix = prefix || 'LOGGER';
            this.level = level || LogLevel.error;
        }
    }
    static getInstance() {
        return Logger.instance;
    }
    setPrefix(prefix) {
        this.prefix = prefix;
    }
    setLogLevel(level) {
        this.level = level;
    }
    log(message) {
        if (this.level >= LogLevel.log) {
            console.log(`${this.prefix} - ${LogLevel[LogLevel.log]} - ${message}`);
        }
    }
    info(message) {
        if (this.level >= LogLevel.info) {
            console.info(`${this.prefix} - ${LogLevel[LogLevel.info]} - ${message}`);
        }
    }
    warn(message) {
        if (this.level >= LogLevel.warn) {
            console.warn(`${this.prefix} - ${LogLevel[LogLevel.warn]} - ${message}`);
        }
    }
    error(message) {
        if (this.level >= LogLevel.error) {
            console.error(`${this.prefix} - ${LogLevel[LogLevel.error]} - ${message}`);
            vscode_1.window.showErrorMessage(message);
        }
    }
}
Logger.instance = new Logger();
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map