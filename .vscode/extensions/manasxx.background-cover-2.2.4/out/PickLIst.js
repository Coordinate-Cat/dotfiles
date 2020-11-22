"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const FileDom_1 = require("./FileDom");
const ImgItem_1 = require("./ImgItem");
const vsHelp_1 = require("./vsHelp");
class PickList {
    // 列表构造方法
    constructor(config, pickList) {
        this._disposables = [];
        this.config = config;
        this.imgPath = config.imagePath;
        this.opacity = config.opacity;
        if (pickList) {
            this.quickPick = pickList;
            this.quickPick.onDidAccept((e) => this.listChange(this.quickPick.selectedItems[0].imageType, this.quickPick.selectedItems[0].path));
            this.quickPick.onDidHide(() => {
                this.dispose();
            }, null, this._disposables);
            this.quickPick.show();
        }
    }
    // 初始下拉列表
    static createItemLIst() {
        let config = vscode.workspace.getConfiguration('backgroundCover');
        let list = vscode.window.createQuickPick();
        list.placeholder = 'Please choose configuration! / 请选择相关配置！';
        let items = [
            {
                label: '$(file-media)    Select pictures               ',
                description: '选择一张背景图',
                imageType: 1
            },
            {
                label: '$(file-directory)    Add directory                ',
                description: '添加图片目录',
                imageType: 2
            },
            {
                label: '$(settings)    Background opacity      ',
                description: '更新图片不透明度',
                imageType: 5
            },
            {
                label: '$(pencil)    Input : path/https          ',
                description: '输入图片路径：本地/https',
                imageType: 6
            },
            {
                label: '$(eye-closed)    Closing background      ',
                description: '关闭背景图',
                imageType: 7
            },
        ];
        if (config.autoStatus) {
            items.push({
                label: '$(sync)    OFF start replacement   ',
                description: '关闭启动自动更换',
                imageType: 10
            });
        }
        else {
            items.push({
                label: '$(sync)    ON start replacement   ',
                description: '开启启动自动更换',
                imageType: 11
            });
        }
        list.items = items;
        PickList.itemList = new PickList(config, list);
    }
    /**
     *  自动更新背景
     */
    static autoUpdateBackground() {
        let config = vscode.workspace.getConfiguration('backgroundCover');
        if (!config.randomImageFolder || !config.autoStatus) {
            return false;
        }
        PickList.itemList = new PickList(config);
        PickList.itemList.autoUpdateBackground();
        return PickList.itemList = undefined;
    }
    /**
     *  随机更新一张背景
     */
    static randomUpdateBackground() {
        let config = vscode.workspace.getConfiguration('backgroundCover');
        if (!config.randomImageFolder) {
            vscode.window.showWarningMessage('Please add a directory! / 请添加目录！');
            return false;
        }
        PickList.itemList = new PickList(config);
        PickList.itemList.autoUpdateBackground();
        PickList.itemList = undefined;
        return vscode.commands.executeCommand('workbench.action.reloadWindow');
    }
    // 列表点击事件分配
    listChange(type, path) {
        switch (type) {
            case 1:
                this.imgList(); // 展示图片列表
                break;
            case 2:
                this.openFieldDialog(2); // 弹出选择文件夹对话框
                break;
            case 3:
                this.openFieldDialog(1); // 弹出选择图片文件对话框
                break;
            case 4:
                this.updateBackgound(path); // 选择列表内图片，更新背景css
                break;
            case 5:
                this.showInputBox(2); // 更改透明度
                break;
            case 6:
                this.showInputBox(1); // 输入图片路径更新背景
                break;
            case 7:
                this.updateDom(true); // 关闭背景图片展示
                break;
            case 8:
                vscode.commands.executeCommand('workbench.action.reloadWindow'); // 重新加载窗口，使设置生效
                break;
            case 9:
                this.quickPick.hide(); // 隐藏设置弹窗
                break;
            case 10:
                this.setConfigValue('autoStatus', false, false);
                this.quickPick.hide();
                break;
            case 11:
                if (!this.config.randomImageFolder) {
                    vscode.window.showWarningMessage('Please add a directory! / 请添加目录后再来开启！');
                }
                else {
                    this.setConfigValue('autoStatus', true, false);
                    this.autoUpdateBackground();
                }
                this.quickPick.hide();
                break;
            default:
                break;
        }
    }
    //释放资源
    dispose() {
        PickList.itemList = undefined;
        // Clean up our resources
        this.quickPick.hide();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    /**
     * 启动时自动更新背景
     */
    autoUpdateBackground() {
        if (this.checkFolder(this.config.randomImageFolder)) {
            // 获取目录下的所有图片
            let files = this.getFolderImgList(this.config.randomImageFolder);
            // 是否存在图片
            if (files.length > 0) {
                // 获取一个随机路径存入数组中
                let randomFile = files[Math.floor(Math.random() * files.length)];
                let file = path.join(this.config.randomImageFolder, randomFile);
                this.listChange(4, file);
            }
        }
        return true;
    }
    // 根据图片目录展示图片列表
    imgList(folderPath) {
        let items = [{
                label: '$(diff-added)  Manual selection',
                description: '选择一张背景图',
                imageType: 3
            }];
        let randomPath = folderPath ? folderPath : this.config.randomImageFolder;
        if (this.checkFolder(randomPath)) {
            // 获取目录下的所有图片
            let files = this.getFolderImgList(randomPath);
            // 是否存在图片
            if (files.length > 0) {
                // 获取一个随机路径存入数组中
                let randomFile = files[Math.floor(Math.random() * files.length)];
                items.push({
                    label: '$(light-bulb)  Random pictures',
                    description: '随机自动选择       ctrl+shift+F7',
                    imageType: 4,
                    path: path.join(randomPath, randomFile)
                });
                items = items.concat(files.map((e) => new ImgItem_1.ImgItem('$(tag) ' + e, e, 4, path.join(randomPath, e))));
            }
        }
        this.quickPick.items = items;
        this.quickPick.show();
    }
    /**
     * 获取目录下的所有图片
     * @param pathUrl
     */
    getFolderImgList(pathUrl) {
        if (!pathUrl || pathUrl === '') {
            return [];
        }
        // 获取目录下的所有图片
        let files = fs.readdirSync(path.resolve(pathUrl)).filter((s) => {
            return s.endsWith('.png') || s.endsWith('.jpg') || s.endsWith('.jpeg') ||
                s.endsWith('.gif') || s.endsWith('.webp') || s.endsWith('.bmp');
        });
        return files;
    }
    // 检查选择的文件及目录是否正确
    checkFolder(folderPath) {
        if (!folderPath) {
            return false;
        }
        // 判断路径是否存在
        let fsStatus = fs.existsSync(path.resolve(folderPath));
        if (!fsStatus) {
            return false;
        }
        // 判断是否为目录路径
        let stat = fs.statSync(folderPath);
        if (!stat.isDirectory()) {
            return false;
        }
        return true;
    }
    // 创建一个输入框
    showInputBox(type) {
        if (type <= 0 || type > 2) {
            return false;
        }
        let placeString = type === 2 ?
            'Opacity ranges：0.00 - 1,current:(' + this.opacity + ')' :
            'Please enter the image path to support local and HTTPS';
        let promptString = type === 2 ? '设置图片不透明度：0-1' : '请输入图片路径，支持本地及https';
        let option = {
            ignoreFocusOut: true,
            password: false,
            placeHolder: placeString,
            prompt: promptString
        };
        vscode.window.showInputBox(option).then(value => {
            //未输入值返回false
            if (!value) {
                vscode.window.showWarningMessage('Please enter configuration parameters / 请输入配置参数！');
                return;
            }
            if (type === 1) {
                // 判断路径是否存在
                let fsStatus = fs.existsSync(path.resolve(value));
                let isUrl = (value.substr(0, 8).toLowerCase() === 'https://');
                if (!fsStatus && !isUrl) {
                    vscode.window.showWarningMessage('Please enter the correct file format path! / 请输入正确的文件格式路径！');
                    return false;
                }
            }
            else {
                let isOpacity = parseFloat(value);
                if (isOpacity < 0 || isOpacity > 1 || isNaN(isOpacity)) {
                    vscode.window.showWarningMessage('Opacity ranges in：0 - 1！');
                    return false;
                }
            }
            this.setConfigValue((type === 1 ? 'imagePath' : 'opacity'), (type === 1 ? value : parseFloat(value)), true);
        });
    }
    // 更新配置
    updateBackgound(path) {
        if (!path) {
            return vsHelp_1.default.showInfo('Unfetched Picture Path / 未获取到图片路径');
        }
        this.setConfigValue('imagePath', path);
    }
    // 文件、目录选择
    openFieldDialog(type) {
        return __awaiter(this, void 0, void 0, function* () {
            let isFolders = type === 1 ? false : true;
            let isFiles = type === 2 ? false : true;
            let filters = type === 1 ? { 'Images': ['png', 'jpg', 'gif', 'jpeg'] } : undefined;
            let folderUris = yield vscode.window.showOpenDialog({
                canSelectFolders: isFolders,
                canSelectFiles: isFiles,
                canSelectMany: false,
                openLabel: 'Select folder',
                filters: filters
            });
            if (!folderUris) {
                return false;
            }
            let fileUri = folderUris[0];
            if (type === 2) {
                this.setConfigValue('randomImageFolder', fileUri.fsPath, false);
                return this.imgList(fileUri.fsPath);
            }
            if (type === 1) {
                return this.setConfigValue('imagePath', fileUri.fsPath);
            }
            return false;
        });
    }
    // 更新配置
    setConfigValue(name, value, updateDom = true) {
        // 更新变量
        this.config.update(name, value, vscode.ConfigurationTarget.Global);
        switch (name) {
            case 'opacity':
                this.opacity = value;
                break;
            case 'imagePath':
                this.imgPath = value;
                break;
            default:
                break;
        }
        // 是否需要更新Dom
        if (updateDom) {
            this.updateDom();
        }
        return true;
    }
    // 更新、卸载css
    updateDom(uninstall = false) {
        let dom = new FileDom_1.FileDom(this.imgPath, this.opacity);
        let result = false;
        if (uninstall) {
            result = dom.uninstall();
        }
        else {
            result = dom.install();
        }
        if (result && this.quickPick) {
            this.quickPick.placeholder = 'Reloading takes effect? / 重新加载生效？';
            this.quickPick.items = [
                {
                    label: '$(check)   YES',
                    description: '立即重新加载窗口生效',
                    imageType: 8
                },
                { label: '$(x)   NO', description: '稍后手动重启', imageType: 9 }
            ];
            this.quickPick.ignoreFocusOut = true;
            this.quickPick.show();
        }
    }
}
exports.PickList = PickList;
//# sourceMappingURL=PickLIst.js.map