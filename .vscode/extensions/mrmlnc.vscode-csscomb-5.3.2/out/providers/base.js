"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_profiler_1 = require("config-profiler");
const csscomb = require("../services/csscomb");
const configProfiler = new config_profiler_1.default(null, {
    allowHomeDirectory: true,
    predefinedConfigs: csscomb.getPredefinedConfigs(),
    configFiles: [
        '.csscomb.json',
        'csscomb.json',
        '.csscomb.js',
        'csscomb.js'
    ],
    envVariableName: 'CSSCOMB_CONFIG',
    props: {
        package: 'csscombConfig'
    }
});
class BaseProvider {
    constructor(workspace, filepath, syntax, settings) {
        this.workspace = workspace;
        this.filepath = filepath;
        this.syntax = syntax;
        this.settings = settings;
    }
    supportedSyntaxes() {
        return [];
    }
    getBlocks() {
        return [];
    }
    isApplycable() {
        const syntax = this.getSyntax(this.syntax);
        return this.supportedSyntaxes().indexOf(syntax) !== -1;
    }
    format() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blocks = this.getBlocks();
            const foundedConfig = yield this.getConfig();
            let config = {};
            if (foundedConfig) {
                config = foundedConfig.config;
            }
            for (let i = 0; i < blocks.length; i++) {
                const text = blocks[i].content;
                const syntax = blocks[i].syntax;
                try {
                    const changes = yield csscomb.use(this.filepath, text, syntax, config);
                    if (changes !== blocks[i].content) {
                        blocks[i].content = changes;
                        blocks[i].changed = true;
                    }
                }
                catch (err) {
                    blocks[i].error = err;
                }
            }
            return blocks;
        });
    }
    getConfig() {
        configProfiler.setWorkspace(this.workspace);
        return configProfiler.getConfig(this.filepath, { settings: this.settings.preset });
    }
    getSyntax(syntax) {
        return this.settings.syntaxAssociations[syntax] || syntax;
    }
}
exports.default = BaseProvider;
