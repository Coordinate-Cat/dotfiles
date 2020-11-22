'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["none"] = 0] = "none";
    LogLevel[LogLevel["error"] = 1] = "error";
    LogLevel[LogLevel["warn"] = 2] = "warn";
    LogLevel[LogLevel["info"] = 3] = "info";
    LogLevel[LogLevel["log"] = 4] = "log";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = /** @class */ (function () {
    function Logger(prefix, level) {
        if (!Logger.instance) {
            Logger.instance = this;
            this.prefix = prefix || 'LOGGER';
            this.level = level || LogLevel.error;
        }
    }
    Logger.getInstance = function () {
        return Logger.instance;
    };
    Logger.prototype.setPrefix = function (prefix) {
        this.prefix = prefix;
    };
    Logger.prototype.setLogLevel = function (level) {
        this.level = level;
    };
    Logger.prototype.log = function (message) {
        if (this.level >= LogLevel.log) {
            console.log(this.prefix + " - " + LogLevel[LogLevel.log] + " - " + message);
        }
    };
    Logger.prototype.info = function (message) {
        if (this.level >= LogLevel.info) {
            console.info(this.prefix + " - " + LogLevel[LogLevel.info] + " - " + message);
        }
    };
    Logger.prototype.warn = function (message) {
        if (this.level >= LogLevel.warn) {
            console.warn(this.prefix + " - " + LogLevel[LogLevel.warn] + " - " + message);
        }
    };
    Logger.prototype.error = function (message) {
        if (this.level >= LogLevel.error) {
            console.error(this.prefix + " - " + LogLevel[LogLevel.error] + " - " + message);
            vscode_1.window.showErrorMessage(message);
        }
    };
    Logger.instance = new Logger();
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map