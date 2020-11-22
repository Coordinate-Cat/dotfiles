"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSS_LEFT = "margin-left";
exports.CSS_TOP = "top";
function getConfigValue(key, vscodeConfig, themeConfig) {
    // If the config is explicitly set, use that value
    if (isConfigSet(key, vscodeConfig)) {
        return vscodeConfig.get(key);
    }
    // Use the themeConfig value if set,
    const themeValue = themeConfig[key];
    if (!isNullOrUndefined(themeValue)) {
        return themeValue;
    }
    // Fall back to the package.json default value
    // as a last resort
    return vscodeConfig.get(key);
}
exports.getConfigValue = getConfigValue;
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
function isConfigSet(key, config) {
    const inspectionResults = config.inspect(key);
    return !isNullOrUndefined(inspectionResults.globalValue) ||
        !isNullOrUndefined(inspectionResults.workspaceValue);
}
//# sourceMappingURL=config.js.map