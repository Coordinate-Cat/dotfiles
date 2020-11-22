"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const particles_1 = require("./config/particles");
const fireworks_1 = require("./config/fireworks");
const flames_1 = require("./config/flames");
const magic_1 = require("./config/magic");
const clippy_1 = require("./config/clippy");
const rift_1 = require("./config/rift");
const screen_shaker_1 = require("./screen-shaker/screen-shaker");
const cursor_exploder_1 = require("./cursor-exploder/cursor-exploder");
const progress_bar_timer_1 = require("./progress-bar-timer");
const status_bar_item_1 = require("./status-bar-item");
const DEFAULT_THEME_ID = 'particles';
const DEFAULT_THEME_CONFIG = particles_1.Particles;
// Config values
let documentChangeListenerDisposer = null;
let enabled = false;
let comboThreshold;
// Native plugins
let screenShaker;
let cursorExploder;
let statusBarItem;
let progressBarTimer;
// PowerMode components
let plugins = [];
// Themes
let themes = {
    fireworks: fireworks_1.Fireworks,
    particles: particles_1.Particles,
    flames: flames_1.Flames,
    magic: magic_1.Magic,
    clippy: clippy_1.Clippy,
    ["simple-rift"]: rift_1.SimpleRift,
    ["exploding-rift"]: rift_1.ExplodingRift,
};
// Current combo count
let combo = 0;
function activate(context) {
    vscode.workspace.onDidChangeConfiguration(onDidChangeConfiguration);
    onDidChangeConfiguration();
}
exports.activate = activate;
function init(config, activeTheme) {
    // Just in case something was left behind, clean it up
    deactivate();
    combo = 0;
    // The native plugins need this special theme, a subset of the config
    screenShaker = new screen_shaker_1.ScreenShaker(activeTheme),
        cursorExploder = new cursor_exploder_1.CursorExploder(activeTheme),
        statusBarItem = new status_bar_item_1.StatusBarItem();
    progressBarTimer = new progress_bar_timer_1.ProgressBarTimer(onProgressTimerExpired);
    plugins.push(screenShaker, cursorExploder, statusBarItem, progressBarTimer);
    plugins.forEach(plugin => plugin.onDidChangeConfiguration(config));
    documentChangeListenerDisposer = vscode.workspace.onDidChangeTextDocument(onDidChangeTextDocument);
}
/**
 * Note: this method is also called automatically
 * when the extension is deactivated
 */
function deactivate() {
    combo = 0;
    if (documentChangeListenerDisposer) {
        documentChangeListenerDisposer.dispose();
        documentChangeListenerDisposer = null;
    }
    while (plugins.length > 0) {
        plugins.shift().dispose();
    }
}
exports.deactivate = deactivate;
function onDidChangeConfiguration() {
    const config = vscode.workspace.getConfiguration('powermode');
    const themeId = config.get('presets');
    const theme = getThemeConfig(themeId);
    const oldEnabled = enabled;
    enabled = config.get('enabled', false);
    comboThreshold = config.get('comboThreshold', 0);
    // Switching from disabled to enabled
    if (!oldEnabled && enabled) {
        init(config, theme);
        return;
    }
    // Switching from enabled to disabled
    if (oldEnabled && !enabled) {
        deactivate();
        return;
    }
    // If not enabled, nothing matters
    // because it will be taken care of
    // when it gets reenabled
    if (!enabled) {
        return;
    }
    // The theme needs set BEFORE onDidChangeConfiguration is called
    screenShaker.themeConfig = theme;
    cursorExploder.themeConfig = theme;
    plugins.forEach(plugin => plugin.onDidChangeConfiguration(config));
}
// This will be exposed so other extensions can contribute their own themes
// function registerTheme(themeId: string, config: ThemeConfig) {
//     themes[themeId] = config;
// }
function getThemeConfig(themeId) {
    return themes[themeId];
}
const onProgressTimerExpired = () => {
    plugins.forEach(plugin => plugin.onPowermodeStop(combo));
    // TODO: Evaluate if this event is needed
    // plugins.forEach(plugin => plugin.onComboReset(combo));
    combo = 0;
};
function isPowerMode() {
    return enabled && combo >= comboThreshold;
}
function onDidChangeTextDocument(event) {
    combo++;
    const powermode = isPowerMode();
    plugins.forEach(plugin => plugin.onDidChangeTextDocument(combo, powermode, event));
}
//# sourceMappingURL=extension.js.map