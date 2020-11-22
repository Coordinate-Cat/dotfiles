"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert = require("assert");
const proxyquire = require("proxyquire");
const testUtils = require("../test/utils");
const text = [
    '<template>',
    '  <style scoped lang="less">',
    '    .test {',
    '      & > .nested {',
    '        content: ""',
    '      }',
    '    }',
    '  </style>',
    '</template>',
    '<template>',
    '	<style>',
    '		.test {',
    '			content: ""',
    '		}',
    '	</style>',
    '</template>'
].join('\n');
describe('Providers → Embedded', () => {
    // tslint:disable-next-line
    const Provider = proxyquire('./embedded', {
        vscode: {
            Position: testUtils.Position,
            Range: testUtils.Range,
            '@noCallThru': true
        }
    }).default;
    const document = testUtils.mockupDocument(text);
    const provider = new Provider(document, 'html', null, '.tmp/test.html', {
        preset: 'csscomb',
        syntaxAssociations: {
            less: 'scss'
        }
    });
    it('should return true for supported syntax', () => {
        assert.ok(provider.isApplycable());
    });
    it('should return formated content', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const expected = [
            {
                syntax: 'scss',
                content: '    .test\n    {\n        & > .nested\n        {\n            content: \'\';\n        }\n    }\n',
                range: {
                    start: { line: 0, character: 40 },
                    end: { line: 0, character: 105 }
                },
                error: null,
                changed: true
            },
            {
                syntax: 'css',
                content: '\t\t.test\n\t\t{\n\t\t    content: \'\';\n\t\t}\n',
                range: {
                    start: { line: 0, character: 149 },
                    end: { line: 0, character: 177 }
                },
                error: null,
                changed: true
            }
        ];
        const actual = yield provider.format();
        assert.deepEqual(actual, expected);
    }));
});
