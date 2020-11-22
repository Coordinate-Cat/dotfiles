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
const Sentry = require("@sentry/node");
const vscode_1 = require("vscode");
const coverageservice_1 = require("../coverage-system/coverageservice");
class Gutters {
    constructor(configStore, coverage, outputChannel, statusBar) {
        this.coverage = coverage;
        this.outputChannel = outputChannel;
        this.statusBar = statusBar;
        this.coverageService = new coverageservice_1.CoverageService(configStore, this.outputChannel);
    }
    previewCoverageReport() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coverageReports = yield this.coverage.findReports();
                const pickedReport = yield this.coverage.pickFile(coverageReports, "Choose a Coverage Report to preview.");
                if (!pickedReport) {
                    throw new Error("Could not show Coverage Report file!");
                }
                // Construct the webview panel for the coverage report to live in
                const previewPanel = vscode_1.window.createWebviewPanel("coverageReportPreview", "Preview Coverage Report", vscode_1.ViewColumn.One);
                // Read in the report html and send it to the webview
                const reportUri = vscode_1.Uri.file(pickedReport);
                const reportHtml = yield vscode_1.workspace.openTextDocument(reportUri);
                previewPanel.webview.html = reportHtml.getText();
            }
            catch (error) {
                this.handleError("previewCoverageReport", error);
            }
        });
    }
    displayCoverageForActiveFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.coverageService.displayForFile();
            }
            catch (error) {
                this.handleError("displayCoverageForActiveFile", error);
            }
        });
    }
    watchCoverageAndVisibleEditors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.statusBar.toggle(true);
                yield this.coverageService.watchWorkspace();
            }
            catch (error) {
                this.handleError("watchCoverageAndVisibleEditors", error);
            }
        });
    }
    removeWatch() {
        try {
            this.coverageService.removeCoverageForCurrentEditor();
            this.statusBar.toggle(false);
            this.coverageService.dispose();
        }
        catch (error) {
            this.handleError("removeWatch", error, false);
        }
    }
    removeCoverageForActiveFile() {
        try {
            this.coverageService.removeCoverageForCurrentEditor();
        }
        catch (error) {
            this.handleError("removeCoverageForActiveFile", error, false);
        }
    }
    dispose() {
        try {
            this.coverageService.dispose();
            this.statusBar.dispose();
        }
        catch (error) {
            this.handleError("dispose", error, false);
        }
    }
    handleError(area, error, showMessage = true) {
        const message = error.message ? error.message : error;
        const stackTrace = error.stack;
        if (showMessage) {
            vscode_1.window.showWarningMessage(message.toString());
        }
        this.outputChannel.appendLine(`[${Date.now()}][${area}]: ${message}`);
        this.outputChannel.appendLine(`[${Date.now()}][${area}]: ${stackTrace}`);
        // Only send crash reports if the user allows this from their global settings.
        const telemetry = vscode_1.workspace.getConfiguration("telemetry");
        const enableCrashReporting = telemetry.get("enableCrashReporter");
        if (enableCrashReporting) {
            const sentryId = Sentry.captureException(error);
            const sentryPrompt = "Please post this in the github issue if you submit one. Sentry Event ID:";
            this.outputChannel.appendLine(`[${Date.now()}][${area}]: ${sentryPrompt} ${sentryId}`);
        }
    }
}
exports.Gutters = Gutters;
//# sourceMappingURL=gutters.js.map