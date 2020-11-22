'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs = require("fs");
const proxyquire = require("proxyquire");
const text = fs.readFileSync('./fixtures/test.scss').toString();
const textExpected = fs.readFileSync('./fixtures/test-expected.scss').toString();
function mockupDocument() {
    return {
        languageId: 'scss',
        uri: { fsPath: '.tmp/test.scss' },
        lineCount: text.split('\n').length,
        lineAt: (line) => ({
            lineNumber: line,
            text: text.split('\n')[line]
        }),
        getText: () => text
    };
}
class Position {
    constructor(line, character) {
        this.line = line;
        this.character = character;
    }
}
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
const sorting = proxyquire('./index', {
    vscode: {
        Position,
        Range,
        workspace: { rootPath: '.tmp' },
        '@noCallThru': true
    }
});
describe('PostCSS Sorting API', () => {
    it('should work without configuration', () => __awaiter(this, void 0, void 0, function* () {
        const document = mockupDocument();
        const settings = {};
        const expected = text;
        const actual = yield sorting.use(settings, document, null);
        assert.equal(actual.css, expected);
    }));
    it('should work with postcss-sorting config as js file', () => __awaiter(this, void 0, void 0, function* () {
        const document = mockupDocument();
        const settings = {
            config: {
                order: ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules']
            }
        };
        const expected = textExpected;
        const actual = yield sorting.use(settings, document, null);
        assert.equal(actual.css, expected);
    }));
});
