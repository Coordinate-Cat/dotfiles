'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const proxyquire = require("proxyquire");
function makeVscodeWorkspace() {
    return {
        getConfiguration: () => ({
            get: (type) => {
                if (type === 'postcssSorting') {
                    return { config: {}, showErrorMessages: true };
                }
                if (type === 'formatOnSave') {
                    return true;
                }
            }
        })
    };
}
describe('Managers → Settings', () => {
    let manager;
    before(() => {
        manager = proxyquire('./settings', {
            vscode: { workspace: makeVscodeWorkspace(), '@noCallThru': true }
        });
    });
    describe('.getSettings', () => {
        it('should return settings', () => {
            const expected = { config: {}, showErrorMessages: false };
            const actual = manager.getSettings();
            assert.deepEqual(actual, expected);
        });
    });
});
