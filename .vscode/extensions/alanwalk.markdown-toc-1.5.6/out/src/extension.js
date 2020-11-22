"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
var vscode_1 = require('vscode');
var REGEXP_TOC_START = /\s*<!--(.*)TOC(.*)-->/gi;
var REGEXP_TOC_STOP = /\s*<!--(.*)\/TOC(.*)-->/gi;
var REGEXP_TOC_CONFIG = /\w+[:=][\w.]+/gi;
var REGEXP_TOC_CONFIG_ITEM = /(\w+)[:=]([\w.]+)/;
var REGEXP_MARKDOWN_ANCHOR = /^<a id="markdown-.+" name=".+"><\/a\>/;
var REGEXP_HEADER = /^(\#{1,6})\s*([.0-9]*)\s*(.+)/;
var REGEXP_CODE_BLOCK1 = /^```/;
var REGEXP_CODE_BLOCK2 = /^~~~/;
var REGEXP_ANCHOR = /\[.+\]\(#(.+)\)/;
var DEPTH_FROM = "depthFrom";
var DEPTH_TO = "depthTo";
var INSERT_ANCHOR = "insertAnchor";
var WITH_LINKS = "withLinks";
var ORDERED_LIST = "orderedList";
var UPDATE_ON_SAVE = "updateOnSave";
var ANCHOR_MODE = "anchorMode";
var LOWER_DEPTH_FROM = DEPTH_FROM.toLocaleLowerCase();
var LOWER_DEPTH_TO = DEPTH_TO.toLocaleLowerCase();
var LOWER_INSERT_ANCHOR = INSERT_ANCHOR.toLocaleLowerCase();
var LOWER_WITH_LINKS = WITH_LINKS.toLocaleLowerCase();
var LOWER_ORDERED_LIST = ORDERED_LIST.toLocaleLowerCase();
var LOWER_UPDATE_ON_SAVE = UPDATE_ON_SAVE.toLocaleLowerCase();
var LOWER_ANCHOR_MODE = ANCHOR_MODE.toLocaleLowerCase();
var ANCHOR_MODE_LIST = [
    "github.com",
    "bitbucket.org",
    "ghost.org",
    "gitlab.com"
];
function activate(context) {
    // create a MarkdownTocTools
    var markdownTocTools = new MarkdownTocTools();
    var disposable_updateMarkdownToc = vscode_1.commands.registerCommand('extension.updateMarkdownToc', function () { markdownTocTools.updateMarkdownToc(); });
    var disposable_deleteMarkdownToc = vscode_1.commands.registerCommand('extension.deleteMarkdownToc', function () { markdownTocTools.deleteMarkdownToc(); });
    var disposable_updateMarkdownSections = vscode_1.commands.registerCommand('extension.updateMarkdownSections', function () { markdownTocTools.updateMarkdownSections(); });
    var disposable_deleteMarkdownSections = vscode_1.commands.registerCommand('extension.deleteMarkdownSections', function () { markdownTocTools.deleteMarkdownSections(); });
    var disposable_saveMarkdownToc = vscode_1.workspace.onDidSaveTextDocument(function (doc) { markdownTocTools.notifyDocumentSave(); });
    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(disposable_updateMarkdownToc);
    context.subscriptions.push(disposable_deleteMarkdownToc);
    context.subscriptions.push(disposable_updateMarkdownSections);
    context.subscriptions.push(disposable_deleteMarkdownSections);
    context.subscriptions.push(disposable_saveMarkdownToc);
}
exports.activate = activate;
var MarkdownTocTools = (function () {
    function MarkdownTocTools() {
        this.options = {
            DEPTH_FROM: 1,
            DEPTH_TO: 6,
            INSERT_ANCHOR: false,
            WITH_LINKS: true,
            ORDERED_LIST: false,
            UPDATE_ON_SAVE: true,
            ANCHOR_MODE: ANCHOR_MODE_LIST[0]
        };
        this.optionsFlag = [];
        this.saveBySelf = false;
    }
    // Public function
    MarkdownTocTools.prototype.updateMarkdownToc = function (isBySave) {
        if (isBySave === void 0) { isBySave = false; }
        var editor = vscode_1.window.activeTextEditor;
        var markdownTocTools = this;
        vscode_1.window.activeTextEditor.edit(function (editBuilder) {
            var tocRange = markdownTocTools.getTocRange();
            markdownTocTools.updateOptions(tocRange);
            if (isBySave && ((!markdownTocTools.options.UPDATE_ON_SAVE) || (tocRange == null)))
                return false;
            var insertPosition = editor.selection.active;
            // save options, and delete last insert
            if (tocRange != null) {
                insertPosition = tocRange.start;
                editBuilder.delete(tocRange);
                markdownTocTools.deleteAnchor(editBuilder);
            }
            var headerList = markdownTocTools.getHeaderList();
            markdownTocTools.createToc(editBuilder, headerList, insertPosition);
            markdownTocTools.insertAnchor(editBuilder, headerList);
        });
        return true;
    };
    MarkdownTocTools.prototype.deleteMarkdownToc = function () {
        var markdownTocTools = this;
        vscode_1.window.activeTextEditor.edit(function (editBuilder) {
            var tocRange = markdownTocTools.getTocRange();
            if (tocRange == null)
                return;
            editBuilder.delete(tocRange);
            markdownTocTools.deleteAnchor(editBuilder);
        });
    };
    MarkdownTocTools.prototype.updateMarkdownSections = function () {
        var tocRange = this.getTocRange();
        this.updateOptions(tocRange);
        var headerList = this.getHeaderList();
        vscode_1.window.activeTextEditor.edit(function (editBuilder) {
            headerList.forEach(function (element) {
                var newHeader = element.header + " " + element.orderedList + " " + element.baseTitle;
                editBuilder.replace(element.range, newHeader);
            });
        });
    };
    MarkdownTocTools.prototype.deleteMarkdownSections = function () {
        var tocRange = this.getTocRange();
        this.updateOptions(tocRange);
        var headerList = this.getHeaderList();
        vscode_1.window.activeTextEditor.edit(function (editBuilder) {
            headerList.forEach(function (element) {
                var newHeader = element.header + " " + element.baseTitle;
                editBuilder.replace(element.range, newHeader);
            });
        });
    };
    MarkdownTocTools.prototype.notifyDocumentSave = function () {
        // Prevent save again
        if (this.saveBySelf) {
            this.saveBySelf = false;
            return;
        }
        var doc = vscode_1.window.activeTextEditor.document;
        if (doc.languageId != 'markdown')
            return;
        if (this.updateMarkdownToc(true)) {
            doc.save();
            this.saveBySelf = true;
        }
    };
    // Private function
    MarkdownTocTools.prototype.getTocRange = function () {
        var doc = vscode_1.window.activeTextEditor.document;
        var start, stop;
        for (var index = 0; index < doc.lineCount; index++) {
            var lineText = doc.lineAt(index).text;
            if ((start == null) && (lineText.match(REGEXP_TOC_START))) {
                start = new vscode_1.Position(index, 0);
            }
            else if (lineText.match(REGEXP_TOC_STOP)) {
                stop = new vscode_1.Position(index, lineText.length);
                break;
            }
        }
        if ((start != null) && (stop != null)) {
            return new vscode_1.Range(start, stop);
        }
        return null;
    };
    MarkdownTocTools.prototype.updateOptions = function (tocRange) {
        this.loadConfigurations();
        this.loadCustomOptions(tocRange);
    };
    MarkdownTocTools.prototype.loadConfigurations = function () {
        this.options.DEPTH_FROM = vscode_1.workspace.getConfiguration('markdown-toc').get('depthFrom');
        this.options.DEPTH_TO = vscode_1.workspace.getConfiguration('markdown-toc').get('depthTo');
        this.options.INSERT_ANCHOR = vscode_1.workspace.getConfiguration('markdown-toc').get('insertAnchor');
        this.options.WITH_LINKS = vscode_1.workspace.getConfiguration('markdown-toc').get('withLinks');
        this.options.ORDERED_LIST = vscode_1.workspace.getConfiguration('markdown-toc').get('orderedList');
        this.options.UPDATE_ON_SAVE = vscode_1.workspace.getConfiguration('markdown-toc').get('updateOnSave');
        this.options.ANCHOR_MODE = vscode_1.workspace.getConfiguration('markdown-toc').get('anchorMode');
    };
    MarkdownTocTools.prototype.loadCustomOptions = function (tocRange) {
        var _this = this;
        this.optionsFlag = [];
        if (tocRange == null)
            return;
        var optionsText = vscode_1.window.activeTextEditor.document.lineAt(tocRange.start.line).text;
        var options = optionsText.match(REGEXP_TOC_CONFIG);
        if (options == null)
            return;
        options.forEach(function (element) {
            var pair = REGEXP_TOC_CONFIG_ITEM.exec(element);
            var key = pair[1].toLocaleLowerCase();
            var value = pair[2];
            switch (key) {
                case LOWER_DEPTH_FROM:
                    _this.optionsFlag.push(DEPTH_FROM);
                    _this.options.DEPTH_FROM = _this.parseValidNumber(value);
                    break;
                case LOWER_DEPTH_TO:
                    _this.optionsFlag.push(DEPTH_TO);
                    _this.options.DEPTH_TO = Math.max(_this.parseValidNumber(value), _this.options.DEPTH_FROM);
                    break;
                case LOWER_INSERT_ANCHOR:
                    _this.optionsFlag.push(INSERT_ANCHOR);
                    _this.options.INSERT_ANCHOR = _this.parseBool(value);
                    break;
                case LOWER_WITH_LINKS:
                    _this.optionsFlag.push(WITH_LINKS);
                    _this.options.WITH_LINKS = _this.parseBool(value);
                    break;
                case LOWER_ORDERED_LIST:
                    _this.optionsFlag.push(ORDERED_LIST);
                    _this.options.ORDERED_LIST = _this.parseBool(value);
                    break;
                case LOWER_UPDATE_ON_SAVE:
                    _this.optionsFlag.push(UPDATE_ON_SAVE);
                    _this.options.UPDATE_ON_SAVE = _this.parseBool(value);
                    break;
                case LOWER_ANCHOR_MODE:
                    _this.optionsFlag.push(ANCHOR_MODE);
                    _this.options.ANCHOR_MODE = _this.parseValidAnchorMode(value);
                    break;
            }
        });
    };
    MarkdownTocTools.prototype.insertAnchor = function (editBuilder, headerList) {
        if (!this.options.INSERT_ANCHOR)
            return;
        headerList.forEach(function (element) {
            var name = element.hash.match(REGEXP_ANCHOR)[1];
            var text = ['<a id="markdown-', name, '" name="', name, '"></a>\n'];
            var insertPosition = new vscode_1.Position(element.line, 0);
            editBuilder.insert(insertPosition, text.join(''));
        });
    };
    MarkdownTocTools.prototype.deleteAnchor = function (editBuilder) {
        var doc = vscode_1.window.activeTextEditor.document;
        for (var index = 0; index < doc.lineCount; index++) {
            var lineText = doc.lineAt(index).text;
            if (lineText.match(REGEXP_MARKDOWN_ANCHOR) == null)
                continue;
            var range = new vscode_1.Range(new vscode_1.Position(index, 0), new vscode_1.Position(index + 1, 0));
            editBuilder.delete(range);
        }
    };
    MarkdownTocTools.prototype.createToc = function (editBuilder, headerList, insertPosition) {
        var _this = this;
        var lineEnding = vscode_1.workspace.getConfiguration("files").get("eol");
        var tabSize = vscode_1.workspace.getConfiguration("[markdown]")["editor.tabSize"];
        var insertSpaces = vscode_1.workspace.getConfiguration("[markdown]")["editor.insertSpaces"];
        if (tabSize === undefined || tabSize === null) {
            tabSize = vscode_1.workspace.getConfiguration("editor").get("tabSize");
        }
        if (insertSpaces === undefined || insertSpaces === null) {
            insertSpaces = vscode_1.workspace.getConfiguration("editor").get("insertSpaces");
        }
        var tab = '\t';
        if (insertSpaces && tabSize > 0) {
            tab = " ".repeat(tabSize);
        }
        var optionsText = [];
        optionsText.push('<!-- TOC ');
        if (this.optionsFlag.indexOf(DEPTH_FROM) != -1)
            optionsText.push(DEPTH_FROM + ':' + this.options.DEPTH_FROM + ' ');
        if (this.optionsFlag.indexOf(DEPTH_TO) != -1)
            optionsText.push(DEPTH_TO + ':' + this.options.DEPTH_TO + ' ');
        if (this.optionsFlag.indexOf(INSERT_ANCHOR) != -1)
            optionsText.push(INSERT_ANCHOR + ':' + this.options.INSERT_ANCHOR + ' ');
        if (this.optionsFlag.indexOf(ORDERED_LIST) != -1)
            optionsText.push(ORDERED_LIST + ':' + this.options.ORDERED_LIST + ' ');
        if (this.optionsFlag.indexOf(UPDATE_ON_SAVE) != -1)
            optionsText.push(UPDATE_ON_SAVE + ':' + this.options.UPDATE_ON_SAVE + ' ');
        if (this.optionsFlag.indexOf(WITH_LINKS) != -1)
            optionsText.push(WITH_LINKS + ':' + this.options.WITH_LINKS + ' ');
        if (this.optionsFlag.indexOf(ANCHOR_MODE) != -1)
            optionsText.push(ANCHOR_MODE + ':' + this.options.ANCHOR_MODE + ' ');
        optionsText.push('-->' + lineEnding);
        var text = [];
        text.push(optionsText.join(''));
        var indicesOfDepth = Array.apply(null, new Array(this.options.DEPTH_TO - this.options.DEPTH_FROM + 1)).map(Number.prototype.valueOf, 0);
        var waitResetList = Array.apply(null, new Array(indicesOfDepth.length)).map(Boolean.prototype.valueOf, false);
        var minDepth = 6;
        headerList.forEach(function (element) {
            minDepth = Math.min(element.depth, minDepth);
        });
        var startDepth = Math.max(minDepth, this.options.DEPTH_FROM);
        headerList.forEach(function (element) {
            if (element.depth <= _this.options.DEPTH_TO) {
                var length = element.depth - startDepth;
                for (var index = 0; index < waitResetList.length; index++) {
                    if (waitResetList[index] && (length < index)) {
                        indicesOfDepth[index] = 0;
                        waitResetList[index] = false;
                    }
                }
                var row = [
                    tab.repeat(length),
                    _this.options.ORDERED_LIST ? (++indicesOfDepth[length] + '. ') : '- ',
                    _this.options.WITH_LINKS ? element.hash : element.title
                ];
                text.push(row.join(''));
                waitResetList[length] = true;
            }
        });
        text.push(lineEnding + "<!-- /TOC -->");
        editBuilder.insert(insertPosition, text.join(lineEnding));
    };
    MarkdownTocTools.prototype.getHeaderList = function () {
        var doc = vscode_1.window.activeTextEditor.document;
        var headerList = [];
        var hashMap = {};
        var isInCode = 0;
        var indicesOfDepth = Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0);
        for (var index = 0; index < doc.lineCount; index++) {
            var lineText = doc.lineAt(index).text;
            var codeResult1 = lineText.match(REGEXP_CODE_BLOCK1);
            var codeResult2 = lineText.match(REGEXP_CODE_BLOCK2);
            if (isInCode == 0) {
                isInCode = codeResult1 != null ? 1 : (codeResult2 != null ? 2 : isInCode);
            }
            else if (isInCode == 1) {
                isInCode = codeResult1 != null ? 0 : isInCode;
            }
            else if (isInCode == 2) {
                isInCode = codeResult2 != null ? 0 : isInCode;
            }
            if (isInCode)
                continue;
            var headerResult = lineText.match(REGEXP_HEADER);
            if (headerResult == null)
                continue;
            var depth = headerResult[1].length;
            if (depth < this.options.DEPTH_FROM)
                continue;
            if (depth > this.options.DEPTH_TO)
                continue;
            for (var i = depth; i <= this.options.DEPTH_TO; i++) {
                indicesOfDepth[depth] = 0;
            }
            indicesOfDepth[depth - 1]++;
            var orderedListStr = "";
            for (var i = this.options.DEPTH_FROM - 1; i < depth; i++) {
                orderedListStr += indicesOfDepth[i].toString() + ".";
            }
            var title = lineText.substr(depth).trim();
            title = title.replace(/\#*$/, "").trim();
            if (hashMap[title] == null) {
                hashMap[title] = 0;
            }
            else {
                hashMap[title] += 1;
            }
            var hash = this.getHash(title, this.options.ANCHOR_MODE, hashMap[title]);
            headerList.push({
                line: index,
                depth: depth,
                title: title,
                hash: hash,
                range: new vscode_1.Range(index, 0, index, lineText.length),
                header: headerResult[1],
                orderedList: orderedListStr,
                baseTitle: headerResult[3]
            });
        }
        return headerList;
    };
    MarkdownTocTools.prototype.getHash = function (headername, mode, repetition) {
        var anchor = require('anchor-markdown-header');
        return decodeURI(anchor(headername, mode, repetition));
    };
    MarkdownTocTools.prototype.parseValidNumber = function (value) {
        var num = parseInt(value);
        if (num < 1) {
            return 1;
        }
        if (num > 6) {
            return 6;
        }
        return num;
    };
    MarkdownTocTools.prototype.parseValidAnchorMode = function (value) {
        if (ANCHOR_MODE_LIST.indexOf(value) != -1) {
            return value;
        }
        return ANCHOR_MODE_LIST[0];
    };
    MarkdownTocTools.prototype.parseBool = function (value) {
        return value.toLocaleLowerCase() == 'true';
    };
    MarkdownTocTools.prototype.dispose = function () {
    };
    return MarkdownTocTools;
}());
//# sourceMappingURL=extension.js.map