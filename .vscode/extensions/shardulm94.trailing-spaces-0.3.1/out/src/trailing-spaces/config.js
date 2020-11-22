'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var logger_1 = require("./utils/logger");
var Config = /** @class */ (function () {
    function Config() {
        if (!Config.instance) {
            Config.instance = this;
            this.logger = logger_1.Logger.getInstance();
            this.load();
        }
    }
    Config.getInstance = function () {
        return Config.instance;
    };
    Config.prototype.load = function () {
        this.config = vscode.workspace.getConfiguration('trailing-spaces');
        this.logger.setLogLevel(logger_1.LogLevel[this.get('logLevel')]);
        this.logger.log('Configuration loaded');
        if (this.onLoadFunction)
            this.onLoadFunction.call(this.onLoadFunctionThisArgs);
    };
    Config.prototype.get = function (key) {
        return this.config.get(key);
    };
    Config.prototype.onLoad = function (fn, thisArgs) {
        this.onLoadFunction = fn;
        this.onLoadFunctionThisArgs = thisArgs;
    };
    Config.instance = new Config();
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map