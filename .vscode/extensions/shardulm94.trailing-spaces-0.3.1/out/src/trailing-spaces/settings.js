'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const logger_1 = require("./logger");
class Settings {
    constructor() {
        if (!Settings.instance) {
            Settings.instance = this;
            this.logger = logger_1.Logger.getInstance();
            this.refreshSettings();
        }
    }
    static getInstance() {
        return Settings.instance;
    }
    refreshSettings() {
        let config = vscode.workspace.getConfiguration('trailing-spaces');
        this.logLevel = logger_1.LogLevel[config.get('logLevel')];
        this.includeEmptyLines = config.get('includeEmptyLines');
        this.highlightCurrentLine = config.get('highlightCurrentLine');
        this.regexp = config.get('regexp');
        this.liveMatching = config.get('liveMatching');
        this.deleteModifiedLinesOnly = config.get('deleteModifiedLinesOnly');
        this.languagesToIgnore = this.getMapFromStringArray(config.get('syntaxIgnore'));
        this.schemesToIgnore = this.getMapFromStringArray(config.get('schemeIgnore'));
        this.trimOnSave = config.get('trimOnSave');
        this.showStatusBarMessage = config.get('showStatusBarMessage');
        this.textEditorDecorationType = this.getTextEditorDecorationType(config.get('backgroundColor'), config.get('borderColor'));
        this.logger.setLogLevel(this.logLevel);
        this.logger.setPrefix('Trailing Spaces');
        this.logger.log('Configuration loaded');
    }
    resetToDefaults() {
        let config = vscode.workspace.getConfiguration('trailing-spaces');
        config.update('logLevel', undefined, true);
        config.update('includeEmptyLines', undefined, true);
        config.update('highlightCurrentLine', undefined, true);
        config.update('regexp', undefined, true);
        config.update('liveMatching', undefined, true);
        config.update('deleteModifiedLinesOnly', undefined, true);
        config.update('syntaxIgnore', undefined, true);
        config.update('schemeIgnore', undefined, true);
        config.update('trimOnSave', undefined, true);
        config.update('showStatusBarMessage', undefined, true);
        config.update('backgroundColor', undefined, true);
        config.update('borderColor', undefined, true);
        this.refreshSettings();
    }
    getMapFromStringArray(array) {
        let map = {};
        array.forEach((element) => {
            map[element] = true;
        });
        return map;
    }
    getTextEditorDecorationType(backgroundColor, borderColor) {
        return vscode.window.createTextEditorDecorationType({
            borderRadius: "3px",
            borderWidth: "1px",
            borderStyle: "solid",
            backgroundColor: backgroundColor,
            borderColor: borderColor
        });
    }
}
Settings.instance = new Settings();
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map