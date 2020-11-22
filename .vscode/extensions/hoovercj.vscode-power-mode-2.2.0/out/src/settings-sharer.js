"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const url = 'https://api.github.com/repos/hoovercj/vscode-power-mode/issues/7/comments';
let comments = null;
;
class SettingsSharer {
    constructor() {
        this.settingSuggestions = true;
        this.provideCompletionItems = (document, position, token) => {
            if (!this.settingSuggestions) {
                return;
            }
            const query = document.getText(document.getWordRangeAtPosition(position));
            if ('powermode'.indexOf(query) < 0) {
                return;
            }
            return this.getSettings().then(comments => {
                return comments.map(comment => {
                    const settings = Object.keys(comment.Settings).map(setting => {
                        return `"${setting}": ${JSON.stringify(comment.Settings[setting])}`;
                    });
                    return {
                        label: `powermode: ${comment.Label}`,
                        detail: comment.Description,
                        insertText: settings.join(',\n')
                    };
                });
            });
        };
        this.getSettings = () => {
            if (comments && comments.length === 0) {
                return Promise.resolve(comments);
            }
            comments = [];
            return request(url, { headers: { 'User-Agent': 'vscode' } })
                .then(res => {
                try {
                    const rawComments = JSON.parse(res);
                    rawComments.forEach(comment => {
                        const body = comment.body.trim();
                        const startTagIndex = body.indexOf('```json');
                        const endTagIndex = body.lastIndexOf('```');
                        let startIndex = 0;
                        if (startTagIndex >= 0) {
                            startIndex = startTagIndex + 7;
                        }
                        let endIndex = body.length;
                        if (endTagIndex >= startIndex) {
                            endIndex = endTagIndex;
                        }
                        const settingsText = body.substring(startIndex, endIndex);
                        if (!settingsText) {
                            return;
                        }
                        try {
                            const settings = JSON.parse(settingsText);
                            if (settings && settings.Settings) {
                                comments.push(settings);
                            }
                        }
                        catch (e) {
                            console.error(e);
                            // ignore
                        }
                    });
                }
                catch (e) {
                    console.error(e);
                    // ignore
                }
                return comments;
            }).catch(e => {
                console.error(e);
            });
        };
    }
}
exports.SettingsSharer = SettingsSharer;
//# sourceMappingURL=settings-sharer.js.map