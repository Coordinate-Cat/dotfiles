"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert = require("assert");
const proxyquire = require("proxyquire");
const testUtils = require("../test/utils");
const text = [
    '.text {',
    '  & > .nested {',
    '    content: ""',
    '  }',
    '}'
].join('\n');
describe('Providers → Styles', () => {
    // tslint:disable-next-line
    const Provider = proxyquire('./styles', {
        vscode: {
            Position: testUtils.Position,
            Range: testUtils.Range,
            '@noCallThru': true
        }
    }).default;
    const document = testUtils.mockupDocument(text);
    const provider = new Provider(document, null, 'scss', null, '.tmp/test.scss', {
        preset: 'csscomb',
        syntaxAssociations: {}
    });
    it('should return true for supported syntax', () => {
        assert.ok(provider.isApplycable());
    });
    it('should return formated content', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const expected = [{
                syntax: 'scss',
                range: {
                    start: { line: 0, character: 0 },
                    end: { line: 4, character: 1 }
                },
                content: '.text\n{\n    & > .nested\n    {\n        content: \'\';\n    }\n}\n',
                error: null,
                changed: true
            }];
        const actual = yield provider.format();
        assert.deepEqual(actual, expected);
    }));
});
