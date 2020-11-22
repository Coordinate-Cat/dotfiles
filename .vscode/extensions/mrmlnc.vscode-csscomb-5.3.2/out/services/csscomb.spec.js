"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert = require("assert");
const csscombService = require("./csscomb");
describe('Services → CSSComb', () => {
    const text = [
        '.text { content: "" }',
        '',
        ''
    ].join('\n');
    it('should work with custom config', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const expected = [
            '.text { content: \'\'; }',
            ''
        ].join('\n');
        const actual = yield csscombService.use('filename.css', text, 'css', {
            'strip-spaces': true,
            'always-semicolon': true,
            quotes: 'single'
        });
        assert.deepEqual(actual, expected);
    }));
    it('should return built-in configs', () => {
        const expected = ['csscomb', 'yandex', 'zen'];
        const actual = csscombService.getPredefinedConfigs();
        assert.deepEqual(Object.keys(actual), expected);
    });
});
