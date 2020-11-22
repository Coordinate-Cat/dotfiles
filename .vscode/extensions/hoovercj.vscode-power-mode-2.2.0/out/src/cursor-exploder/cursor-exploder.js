"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const config_1 = require("../config/config");
class CursorExploder {
    constructor(themeConfig) {
        this.themeConfig = themeConfig;
        this.config = {};
        this.activeDecorations = [];
        this.keystrokeCounter = -1;
        this.explosionIndex = -1;
        this.onThemeChanged = (theme) => {
            this.themeConfig = theme;
            this.initialize();
        };
        this.activate = () => {
            // Do nothing
            this.initialize();
        };
        this.dispose = () => {
            this.onPowermodeStop();
        };
        this.onPowermodeStart = (combo) => {
            // Do nothing
        };
        this.onPowermodeStop = (combo) => {
            // Dispose all explosions
            while (this.activeDecorations.length > 0) {
                this.activeDecorations.shift().dispose();
            }
        };
        this.onDidChangeTextDocument = (combo, powermode, event) => {
            if (!this.config.enableExplosions || !powermode) {
                return;
            }
            // If the content change is empty then it was likely a delete
            // This means there may not be text after the cursor, so do the
            // explosion before instead.
            const changes = event.contentChanges[0];
            const left = changes && changes.text.length === 0;
            this.explode(left);
        };
        this.onDidChangeConfiguration = (config) => {
            const newConfig = {
                customExplosions: config_1.getConfigValue('customExplosions', config, this.themeConfig),
                enableExplosions: config_1.getConfigValue('enableExplosions', config, this.themeConfig),
                maxExplosions: config_1.getConfigValue('maxExplosions', config, this.themeConfig),
                explosionSize: config_1.getConfigValue('explosionSize', config, this.themeConfig),
                explosionFrequency: config_1.getConfigValue('explosionFrequency', config, this.themeConfig),
                explosionOffset: config_1.getConfigValue('explosionOffset', config, this.themeConfig),
                explosionOrder: config_1.getConfigValue('explosionOrder', config, this.themeConfig),
                explosionDuration: config_1.getConfigValue('explosionDuration', config, this.themeConfig),
                backgroundMode: config_1.getConfigValue('backgroundMode', config, this.themeConfig),
                gifMode: config_1.getConfigValue('gifMode', config, this.themeConfig),
                customCss: config_1.getConfigValue('customCss', config, this.themeConfig),
            };
            let changed = false;
            Object.keys(newConfig).forEach(key => {
                if (this.config[key] !== newConfig[key]) {
                    changed = true;
                }
            });
            if (!changed) {
                return;
            }
            this.config = newConfig;
            this.initialize();
        };
        this.initialize = () => {
            this.dispose();
            if (!this.config.enableExplosions) {
                return;
            }
            this.explosionIndex = -1;
            this.keystrokeCounter = -1;
        };
        this.getExplosionDecoration = (position) => {
            let explosions = this.config.customExplosions;
            const explosion = this.pickExplosion(explosions);
            if (!explosion) {
                return null;
            }
            return this.createExplosionDecorationType(explosion, position);
        };
        /**
         * @returns an decoration type with the configured background image
         */
        this.createExplosionDecorationType = (explosion, editorPosition) => {
            // subtract 1 ch to account for the character and divide by two to make it centered
            // Use Math.floor to skew to the right which especially helps when deleting chars
            const leftValue = Math.floor((this.config.explosionSize - 1) / 2);
            // By default, the top of the gif will be at the top of the text.
            // Setting the top to a negative value will raise it up.
            // The default gifs are "tall" and the bottom halves are empty.
            // Lowering them makes them appear in a more natural position,
            // but limiting the top to the line number keeps it from going
            // off the top of the editor
            const topValue = this.config.explosionSize * this.config.explosionOffset;
            const explosionUrl = this.getExplosionUrl(explosion);
            const backgroundCss = this.config.backgroundMode === 'mask' ?
                this.getMaskCssSettings(explosionUrl) :
                this.getBackgroundCssSettings(explosionUrl);
            const defaultCss = {
                position: 'absolute',
                [config_1.CSS_LEFT]: `-${leftValue}ch`,
                [config_1.CSS_TOP]: `-${topValue}rem`,
                width: `${this.config.explosionSize}ch`,
                height: `${this.config.explosionSize}rem`,
                display: `inline-block`,
                ['z-index']: 1,
                ['pointer-events']: 'none',
            };
            const backgroundCssString = this.objectToCssString(backgroundCss);
            const defaultCssString = this.objectToCssString(defaultCss);
            const customCssString = this.objectToCssString(this.config.customCss || {});
            return vscode.window.createTextEditorDecorationType({
                before: {
                    contentText: '',
                    textDecoration: `none; ${defaultCssString} ${backgroundCssString} ${customCssString}`,
                },
                textDecoration: `none; position: relative;`,
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
        };
        /**
         * "Explodes" where the cursor is by setting a text decoration
         * that contains a base64 encoded gif as the background image.
         * The gif is then removed 1 second later
         *
         * @param {boolean} [left=false] place the decoration to
         * the left or the right of the cursor
         */
        this.explode = (left = false) => {
            // To give the explosions space, only explode every X strokes
            // Where X is the configured explosion frequency
            // This counter resets if the user does not type for 1 second.
            clearTimeout(this.counterTimeout);
            this.counterTimeout = setTimeout(() => {
                this.keystrokeCounter = -1;
            }, 1000);
            if (++this.keystrokeCounter % this.config.explosionFrequency !== 0) {
                return;
            }
            const activeEditor = vscode.window.activeTextEditor;
            const cursorPosition = vscode.window.activeTextEditor.selection.active;
            // The delta is greater to the left than to the right because otherwise the gif doesn't appear
            const delta = left ? -2 : 1;
            const newRange = new vscode.Range(cursorPosition.with(cursorPosition.line, cursorPosition.character), 
            // Value can't be negative
            cursorPosition.with(cursorPosition.line, Math.max(0, cursorPosition.character + delta)));
            // Dispose excess explosions
            while (this.activeDecorations.length >= this.config.maxExplosions) {
                this.activeDecorations.shift().dispose();
            }
            // A new decoration is used each time because otherwise adjacent
            // gifs will all be identical. This helps them be at least a little
            // offset.
            const decoration = this.getExplosionDecoration(newRange.start);
            if (!decoration) {
                return;
            }
            this.activeDecorations.push(decoration);
            if (this.config.explosionDuration !== 0) {
                setTimeout(() => {
                    decoration.dispose();
                }, this.config.explosionDuration);
            }
            activeEditor.setDecorations(decoration, [newRange]);
        };
    }
    pickExplosion(explosions) {
        if (!explosions) {
            return null;
        }
        switch (typeof this.config.explosionOrder) {
            case 'string':
                switch (this.config.explosionOrder) {
                    case 'random':
                        this.explosionIndex = getRandomInt(0, explosions.length);
                        break;
                    case 'sequential':
                        this.explosionIndex = (this.explosionIndex + 1) % explosions.length;
                        break;
                    default:
                        this.explosionIndex = 0;
                }
                break;
            case 'number':
                this.explosionIndex = Math.min(explosions.length - 1, Math.floor(Math.abs(this.config.explosionOrder)));
            default:
                break;
        }
        return explosions[this.explosionIndex];
    }
    getExplosionUrl(explosion) {
        if (this.config.gifMode !== 'restart') {
            return explosion;
        }
        if (this.isUrl(explosion)) {
            return `${explosion}?timestamp=${Date.now()}`;
        }
        else {
            // https://tools.ietf.org/html/rfc2397
            return explosion.replace('base64,', `timestamp=${Date.now()};base64,`);
        }
    }
    isUrl(value) {
        return value.indexOf('https') === 0;
    }
    getBackgroundCssSettings(explosion) {
        return {
            'background-repeat': 'no-repeat',
            'background-size': 'contain',
            'background-image': `url("${explosion}")`,
        };
    }
    getMaskCssSettings(explosion) {
        return {
            'background-color': 'currentColor',
            '-webkit-mask-repeat': 'no-repeat',
            '-webkit-mask-size': 'contain',
            '-webkit-mask-image': `url("${explosion}")`,
            filter: 'saturate(150%)',
        };
    }
    objectToCssString(settings) {
        let value = '';
        const cssString = Object.keys(settings).map(setting => {
            value = settings[setting];
            if (typeof value === 'string' || typeof value === 'number') {
                return `${setting}: ${value};`;
            }
        }).join(' ');
        return cssString;
    }
}
exports.CursorExploder = CursorExploder;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
//# sourceMappingURL=cursor-exploder.js.map