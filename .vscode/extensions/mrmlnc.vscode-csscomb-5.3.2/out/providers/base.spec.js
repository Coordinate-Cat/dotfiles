"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert = require("assert");
const base_1 = require("./base");
class TestBaseProvider extends base_1.default {
    supportedSyntaxes() {
        return ['css'];
    }
    getBlocks() {
        return [
            { syntax: 'css', content: '.text { content: "" }', range: null, error: null, changed: false }
        ];
    }
}
describe('Providers → Base', () => {
    const provider = new TestBaseProvider(null, null, 'css', {
        preset: 'csscomb',
        syntaxAssociations: {}
    });
    it('should create instance', () => {
        assert.ok(provider instanceof base_1.default);
    });
    it('should return true for supported syntax', () => {
        assert.ok(provider.isApplycable());
    });
    it('should return config from settings', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const config = yield provider.getConfig();
        assert.equal(config.from, 'predefined');
    }));
    it('should return formated content', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const expected = [{
                syntax: 'css',
                range: null,
                content: '.text\n{\n    content: \'\';\n}\n',
                error: null,
                changed: true
            }];
        const actual = yield provider.format();
        assert.deepEqual(actual, expected);
    }));
});
