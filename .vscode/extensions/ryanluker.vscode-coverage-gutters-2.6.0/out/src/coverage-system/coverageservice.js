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
const coverageparser_1 = require("../files/coverageparser");
const filesloader_1 = require("../files/filesloader");
const renderer_1 = require("./renderer");
const sectionfinder_1 = require("./sectionfinder");
var Status;
(function (Status) {
    Status["ready"] = "READY";
    Status["initializing"] = "INITIALIZING";
    Status["loading"] = "LOADING";
    Status["rendering"] = "RENDERING";
    Status["error"] = "ERROR";
})(Status || (Status = {}));
class CoverageService {
    constructor(configStore, outputChannel) {
        this.configStore = configStore;
        this.outputChannel = outputChannel;
        this.updateServiceState(Status.initializing);
        this.cache = new Map();
        this.filesLoader = new filesloader_1.FilesLoader(configStore);
        this.sectionFinder = new sectionfinder_1.SectionFinder(configStore, this.outputChannel);
        this.renderer = new renderer_1.Renderer(configStore, this.sectionFinder);
        this.coverageParser = new coverageparser_1.CoverageParser(this.outputChannel);
    }
    dispose() {
        if (this.coverageWatcher) {
            this.coverageWatcher.dispose();
        }
        if (this.editorWatcher) {
            this.editorWatcher.dispose();
        }
        this.cache = new Map(); // reset cache to empty
        const visibleEditors = vscode_1.window.visibleTextEditors;
        this.renderer.renderCoverage(this.cache, visibleEditors);
    }
    displayForFile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadCacheAndRender();
        });
    }
    watchWorkspace() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.displayForFile();
            this.listenToFileSystem();
            this.listenToEditorEvents();
        });
    }
    removeCoverageForCurrentEditor() {
        return __awaiter(this, void 0, void 0, function* () {
            const visibleEditors = vscode_1.window.visibleTextEditors;
            yield this.renderer.renderCoverage(new Map(), visibleEditors);
        });
    }
    loadCache() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const printDataCoverage = (data) => {
                    this.outputChannel.appendLine(`[${Date.now()}][printDataCoverage]: Coverage -> ${data.size}`);
                    /*
                    data.forEach((section) => {
                        const coverage = JSON.stringify(section, null, 4);
                        this.outputChannel.appendLine(
                            `[${Date.now()}][printDataCoverage]: ${coverage}`,
                        );
                    });
                    */
                };
                this.updateServiceState(Status.loading);
                const files = yield this.filesLoader.findCoverageFiles();
                this.outputChannel.appendLine(`[${Date.now()}][coverageservice]: Loading ${files.size} file(s)`);
                const dataFiles = yield this.filesLoader.loadDataFiles(files);
                this.outputChannel.appendLine(`[${Date.now()}][coverageservice]: Loaded ${dataFiles.size} data file(s)`);
                const dataCoverage = yield this.coverageParser.filesToSections(dataFiles);
                this.outputChannel.appendLine(`[${Date.now()}][coverageservice]: Caching ${dataCoverage.size} coverage(s)`);
                this.cache = dataCoverage;
                printDataCoverage(this.cache);
                this.updateServiceState(Status.ready);
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    updateServiceState(state) {
        this.outputChannel.appendLine(`[${Date.now()}][coverageservice]: ${state}`);
    }
    loadCacheAndRender() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadCache();
            this.updateServiceState(Status.rendering);
            const visibleEditors = vscode_1.window.visibleTextEditors;
            yield this.renderer.renderCoverage(this.cache, visibleEditors);
            this.updateServiceState(Status.ready);
        });
    }
    listenToFileSystem() {
        let blobPattern;
        // Monitor only manual coverage files if the user has defined them
        if (this.configStore.manualCoverageFilePaths.length) {
            // Paths outside of workspace folders will not be watchable,
            // but those that are inside workspace will still work as expected
            blobPattern = `{${this.configStore.manualCoverageFilePaths}}`;
        }
        else {
            const fileNames = this.configStore.coverageFileNames.toString();
            let baseDir = this.configStore.coverageBaseDir;
            if (vscode_1.workspace.workspaceFolders) {
                // Prepend workspace folders glob to the folder lookup glob
                // This allows watching within all the workspace folders
                const workspaceFolders = vscode_1.workspace.workspaceFolders.map((wf) => wf.uri.fsPath);
                baseDir = `{${workspaceFolders}}/${baseDir}`;
            }
            // Creates a BlobPattern for all coverage files.
            // EX: `{/path/to/workspace1, /path/to/workspace2}/**/{cov.xml, lcov.info}`
            blobPattern = `${baseDir}/{${fileNames}}`;
        }
        this.coverageWatcher = vscode_1.workspace.createFileSystemWatcher(blobPattern);
        this.coverageWatcher.onDidChange(this.loadCacheAndRender.bind(this));
        this.coverageWatcher.onDidCreate(this.loadCacheAndRender.bind(this));
        this.coverageWatcher.onDidDelete(this.loadCacheAndRender.bind(this));
    }
    handleEditorEvents(textEditors) {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateServiceState(Status.rendering);
            yield this.renderer.renderCoverage(this.cache, textEditors);
            this.updateServiceState(Status.ready);
        });
    }
    listenToEditorEvents() {
        this.editorWatcher = vscode_1.window.onDidChangeVisibleTextEditors(this.handleEditorEvents.bind(this));
    }
    handleError(error) {
        const message = error.message ? error.message : error;
        const stackTrace = error.stack;
        vscode_1.window.showWarningMessage(message.toString());
        this.outputChannel.appendLine(`[${Date.now()}][gutters]: Error ${message}`);
        this.outputChannel.appendLine(`[${Date.now()}][gutters]: Stacktrace ${stackTrace}`);
    }
}
exports.CoverageService = CoverageService;
//# sourceMappingURL=coverageservice.js.map