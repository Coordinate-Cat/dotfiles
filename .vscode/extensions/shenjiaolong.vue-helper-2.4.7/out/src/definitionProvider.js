"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path = require('path');
const fs = require('fs');
const paramCamse = require('param-case');
const glob = require('glob');
function readDir(dir, selectText, frame) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            fs.readdir(dir, 'utf8', (err, files) => {
                if (err)
                    reject(err);
                if (files.indexOf(selectText.toLowerCase()) !== -1) {
                    if (frame === 'iview') {
                        let prePath = dir + path.sep + selectText.toLowerCase() + path.sep;
                        let vuePath = prePath + selectText.toLowerCase() + '.vue';
                        let indexPath = prePath + 'index.js';
                        if (fs.existsSync(vuePath)) {
                            resolve(vuePath);
                        }
                        else if (fs.existsSync(indexPath)) {
                            resolve(indexPath);
                        }
                        else {
                            resolve('');
                        }
                    }
                    else if (frame === 'element-ui') {
                        let prePath = dir + path.sep + selectText.replace(/^el-/gi, '') + path.sep;
                        let mainPath = prePath + 'src' + path.sep + 'main.vue';
                        let vuePath = prePath + 'src' + path.sep + selectText + '.vue';
                        let indexPath = prePath + 'index.js';
                        if (fs.existsSync(mainPath)) {
                            resolve(mainPath);
                        }
                        else if (fs.existsSync(vuePath)) {
                            resolve(vuePath);
                        }
                        else if (fs.existsSync(indexPath)) {
                            resolve(indexPath);
                        }
                        else {
                            resolve('');
                        }
                    }
                }
                else {
                    resolve('');
                }
            });
        });
    });
}
/**
 * 获取框架
 * @param plugin 数组则是获取框架，字符串则为获取插件
 */
function getPlugin(plugin) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            fs.readFile(vscode_1.workspace.rootPath + path.sep + 'package.json', 'utf8', (err, data) => {
                if (err)
                    reject(err);
                // 数组则是获取框架
                let ret = '';
                let p = {};
                try {
                    p = JSON.parse(data);
                }
                catch (e) {
                    console.log('e:', e);
                }
                if (Array.isArray(plugin)) {
                    let framework = plugin;
                    for (let i = 0; i < framework.length; i++) {
                        const frame = framework[i];
                        if ((p.dependencies && p.dependencies[frame]) || (p.devDependencies && p.devDependencies[frame])) {
                            ret = frame;
                        }
                    }
                }
                else {
                    let pluginArr = plugin.split('/');
                    if (pluginArr.length === 1 && (p.dependencies && p.dependencies[plugin]) || (p.devDependencies && p.devDependencies[plugin])) {
                        ret = plugin;
                    }
                    else if (pluginArr.length > 1 && (p.dependencies && p.dependencies[pluginArr[0]]) || (p.devDependencies && p.devDependencies[pluginArr[0]])) {
                        ret = plugin;
                    }
                }
                if (ret) {
                    resolve(ret);
                }
                else {
                    resolve('');
                }
            });
        });
    });
}
/**
 * 获取node_modules下package.json文件中的main字段
 * @param path
 */
function getMain(rootPath) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            fs.readFile(rootPath + 'package.json', 'utf8', (err, data) => {
                if (err)
                    reject(err);
                let p = {};
                try {
                    p = JSON.parse(data);
                }
                catch (e) {
                    console.log('e:', e);
                }
                if (p.main) {
                    resolve(p.main);
                }
                else {
                    resolve('');
                }
            });
        });
    });
}
/**
* 在node_modules目录下去查找
* @param selectText
*/
function definitionPlugin(selectText) {
    return __awaiter(this, void 0, void 0, function* () {
        // 获取框架
        let frame = yield getPlugin(['iview', 'element-ui']);
        if (frame === 'iview') {
            return yield readDir(vscode_1.workspace.rootPath + path.sep + 'node_modules' + path.sep + 'iview' + path.sep + 'src' + path.sep + 'components', paramCamse(selectText), frame);
        }
        else if (frame === 'element-ui') {
            return yield readDir(vscode_1.workspace.rootPath + path.sep + 'node_modules' + path.sep + 'element-ui' + path.sep + 'packages', paramCamse(selectText).replace(/^el-/gi, ''), frame);
        }
        else {
            return '';
        }
    });
}
// 跳转到定义位置
class vueHelperDefinitionProvider {
    constructor() {
        this.VUE_ATTR = {
            props: 1,
            computed: 2,
            methods: 3,
            watch: 4,
            beforeCreate: 5,
            created: 6,
            beforeMount: 7,
            mounted: 8,
            beforeUpdate: 9,
            updated: 10,
            activated: 11,
            deactivated: 12,
            beforeDestroy: 13,
            destroyed: 14,
            directives: 15,
            filters: 16,
            components: 17,
            data: 18
        };
    }
    /**
     * 判断是文件内跳转还是文件外跳转
     */
    getDefinitionPosition(lineText) {
        const pathRegs = [
            /import\s+.*\s+from\s+['"](.*)['"]/,
            /import\s*[^'"]*\(['"](.*)['"]\)[^'"]*/,
            /.*require\s*\([^'"]*['"](.*)['"][^'"]*\)/,
            /import\s+['"](.*)['"]/,
            /import\s*\([^'"]*(?:\/\*.*\*\/)\s*['"](.*)['"][^'"]\)*/
        ];
        let execResult;
        for (const pathReg of pathRegs) {
            execResult = pathReg.exec(lineText);
            if (execResult && execResult[1]) {
                const filePath = execResult[1];
                return {
                    path: filePath
                };
            }
        }
    }
    /**
     * 文件内跳转
     */
    definitionInFile(document, position, line) {
        return __awaiter(this, void 0, void 0, function* () {
            const textSplite = [' ', '<', '>', '"', '\'', '.', '\\', "=", ":", "@", "(", ")", "[", "]", "{", "}", ",", "!"];
            // 通过前后字符串拼接成选择文本
            let posIndex = position.character;
            let textMeta = line.text.substr(posIndex, 1);
            let selectText = '';
            // 前向获取符合要求的字符串
            while (textSplite.indexOf(textMeta) === -1 && posIndex <= line.text.length) {
                selectText += textMeta;
                textMeta = line.text.substr(++posIndex, 1);
            }
            // 往后获取符合要求的字符串
            posIndex = position.character - 1;
            textMeta = line.text.substr(posIndex, 1);
            while (textSplite.indexOf(textMeta) === -1 && posIndex > 0) {
                selectText = textMeta + selectText;
                textMeta = line.text.substr(--posIndex, 1);
            }
            // 查找字符串位置
            let pos = 0;
            let begin = false;
            let lineText = '';
            let braceLeftCount = 0;
            let attr = '';
            // 搜索类型，主要用于判断在哪个属性中去搜索内容，目前主要用于区分是否是组件
            let searchType = '';
            // 判断选择文件搜索类型，是否是标签
            if (textMeta === '<') {
                searchType = 'components';
            }
            while (pos < document.lineCount && !/^\s*<\/script>\s*$/g.test(lineText)) {
                lineText = document.lineAt(++pos).text;
                // 从script标签开始查找
                if (!begin) {
                    if (/^\s*<script.*>\s*$/g.test(lineText)) {
                        begin = true;
                    }
                    continue;
                }
                // 判断现在正在对哪个属性进行遍历
                let keyWord = lineText.replace(/\s*(\w*)\s*(\(\s*\)|:|(:\s*function\s*\(\s*\)))\s*{\s*/gi, '$1');
                // braceLeftCount <= 3 用于去除data属性中包含vue其他属性从而不能定义问题
                if (this.VUE_ATTR[keyWord] !== undefined && braceLeftCount === 0) {
                    attr = keyWord;
                    braceLeftCount = 0;
                }
                if (searchType === 'components') {
                    /**
                     * component组件跳转处理方式
                     * 1. 文件内import，require引入判断
                     * 2. iview, element组件判断
                     */
                    // attr存在，说明已遍历过import内容
                    if (attr) {
                        let retPath = yield definitionPlugin(selectText);
                        if (retPath) {
                            return Promise.resolve(new vscode_1.Location(vscode_1.Uri.file(retPath), new vscode_1.Position(0, 0)));
                        }
                        break;
                    }
                    else {
                        let tag = selectText.toLowerCase().replace(/-/gi, '');
                        if (lineText.toLowerCase().includes(tag) && (lineText.trim().indexOf('import') === 0 || lineText.trim().indexOf('require') === 0)) {
                            return this.definitionOutFile(document, this.getDefinitionPosition(lineText));
                        }
                    }
                }
                else {
                    // data属性匹配, data具有return，单独处理
                    if (attr === 'data' && braceLeftCount >= 2) {
                        let matchName = lineText.replace(/\s*(\w+):.+/gi, '$1');
                        if (selectText === matchName && braceLeftCount === 2) {
                            return Promise.resolve(new vscode_1.Location(document.uri, new vscode_1.Position(pos, lineText.indexOf(matchName) + matchName.length)));
                        }
                        let braceLeft = lineText.match(/{/gi) ? lineText.match(/{/gi).length : 0;
                        let braceRight = lineText.match(/}/gi) ? lineText.match(/}/gi).length : 0;
                        braceLeftCount += braceLeft - braceRight;
                    }
                    else if (attr) {
                        let matchName = lineText.replace(/\s*(async\s*)?(\w*)\s*(:|\().*/gi, '$2');
                        if (selectText === matchName && braceLeftCount === 1) {
                            return Promise.resolve(new vscode_1.Location(document.uri, new vscode_1.Position(pos, lineText.indexOf(matchName) + matchName.length)));
                        }
                        let braceLeft = lineText.match(/{/gi) ? lineText.match(/{/gi).length : 0;
                        let braceRight = lineText.match(/}/gi) ? lineText.match(/}/gi).length : 0;
                        braceLeftCount += braceLeft - braceRight;
                    }
                    // data取return的属性值
                    if (attr === 'data') {
                        if (/\s*return\s*{\s*/gi.test(lineText)) {
                            braceLeftCount = 2;
                        }
                    }
                }
            }
            // 全目录搜索看是否存在改文件
            let files = glob.sync(vscode_1.workspace.rootPath + '/!(node_modules)/**/*.vue');
            for (let i = 0; i < files.length; i++) {
                const vueFile = files[i];
                let vueChangeFile = vueFile.replace(/-/gi, '').toLowerCase().replace(/\.vue$/, '');
                if (vueChangeFile.endsWith('/' + selectText.toLowerCase().replace(/-/gi, ''))) {
                    return Promise.resolve(new vscode_1.Location(vscode_1.Uri.file(vueFile), new vscode_1.Position(0, 0)));
                }
            }
            return Promise.resolve(null);
        });
    }
    /**
     * 文件外跳转
     * 处理方式
     * 1. 根据文件目录查询是否存在相应文件
     * 2. 通过package.json判断是否存在安装插件
     * @param document
     * @param position
     * @param line
     */
    definitionOutFile(document, file) {
        return __awaiter(this, void 0, void 0, function* () {
            let filePath = file.path;
            let isRelative = false;
            if (filePath.indexOf('./') === 0) {
                isRelative = true;
            }
            // 1. 根据文件目录查询是否存在相应文件
            let config = vscode_1.workspace.getConfiguration('vue-helper');
            if (config || config.alias) {
                // 支持的前缀、后缀
                for (const key in config.alias) {
                    if (config.alias.hasOwnProperty(key) && filePath.indexOf(key) === 0) {
                        filePath = filePath.replace(key, config.alias[key]);
                        break;
                    }
                }
            }
            // 文件存在后缀，则直接查找
            if (/(.*\/.*|[^.]+)\..*$/gi.test(filePath)) {
                let tempFile = path.resolve(vscode_1.workspace.rootPath, filePath);
                // 相对路径处理
                if (isRelative) {
                    tempFile = document.fileName.replace(/(.*)\/[^\/]*$/i, '$1') + path.sep + filePath.replace(/.\//i, '');
                }
                if (fs.existsSync(tempFile)) {
                    return Promise.resolve(new vscode_1.Location(vscode_1.Uri.file(tempFile), new vscode_1.Position(0, 0)));
                }
            }
            else {
                // 添加后缀，判断文件是否存在
                const postfix = ['vue', 'js', 'css', 'scss', 'less'];
                for (let i = 0; i < postfix.length; i++) {
                    const post = postfix[i];
                    // 相对路径处理
                    let tempFile = path.resolve(vscode_1.workspace.rootPath, filePath);
                    if (isRelative) {
                        tempFile = document.fileName.replace(/(.*)\/[^\/]*$/i, '$1') + path.sep + filePath.replace(/.\//i, '');
                    }
                    if (tempFile.endsWith('/')) {
                        tempFile = tempFile + 'index.' + post;
                        if (fs.existsSync(tempFile)) {
                            return Promise.resolve(new vscode_1.Location(vscode_1.Uri.file(tempFile), new vscode_1.Position(0, 0)));
                        }
                    }
                    else {
                        let indexFile = tempFile + path.sep + 'index.' + post;
                        tempFile += '.' + post;
                        if (fs.existsSync(tempFile)) {
                            return Promise.resolve(new vscode_1.Location(vscode_1.Uri.file(tempFile), new vscode_1.Position(0, 0)));
                        }
                        // index文件判断
                        if (fs.existsSync(indexFile)) {
                            return Promise.resolve(new vscode_1.Location(vscode_1.Uri.file(indexFile), new vscode_1.Position(0, 0)));
                        }
                    }
                }
            }
            // 2. 通过package.json判断是否存在安装插件, 插件可能有目录，获取最前一节作为插件进行判断
            let plugin = yield getPlugin(filePath);
            let pluginRootPath = vscode_1.workspace.rootPath + path.sep + 'node_modules' + path.sep + plugin + path.sep;
            let pluginOwn = vscode_1.workspace.rootPath + path.sep + 'node_modules' + path.sep + plugin + '.js';
            let pluginPath = pluginRootPath + 'index.js';
            if (fs.existsSync(pluginOwn)) {
                return Promise.resolve(new vscode_1.Location(vscode_1.Uri.file(pluginOwn), new vscode_1.Position(0, 0)));
            }
            else if (fs.existsSync(pluginPath)) {
                return Promise.resolve(new vscode_1.Location(vscode_1.Uri.file(pluginPath), new vscode_1.Position(0, 0)));
            }
            let main = yield getMain(pluginRootPath);
            if (main) {
                return Promise.resolve(new vscode_1.Location(vscode_1.Uri.file(pluginRootPath + main), new vscode_1.Position(0, 0)));
            }
            return Promise.resolve(null);
        });
    }
    provideDefinition(document, position, token) {
        // 获取定义word
        const line = document.lineAt(position.line);
        // 判断是文件内跳转还是文件外跳转
        let file = this.getDefinitionPosition(line.text);
        if (file) {
            return this.definitionOutFile(document, file);
        }
        else {
            return this.definitionInFile(document, position, line);
        }
    }
}
exports.vueHelperDefinitionProvider = vueHelperDefinitionProvider;
//# sourceMappingURL=definitionProvider.js.map