"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const CSSComb = require("../../csscomb.js/lib/csscomb.js");
const DEFAULT_CONFIGS = {
    csscomb: CSSComb.getConfig('csscomb'),
    yandex: CSSComb.getConfig('yandex'),
    zen: CSSComb.getConfig('zen')
};
/**
 * Apply CSSComb to the given text with provided config.
 */
function use(filename, text, syntax, config) {
    const csscomb = new CSSComb(config);
    return csscomb.processString(text, { syntax, filename });
}
exports.use = use;
function getPredefinedConfigs() {
    return DEFAULT_CONFIGS;
}
exports.getPredefinedConfigs = getPredefinedConfigs;
