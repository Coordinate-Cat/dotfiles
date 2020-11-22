"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sentry = require("@sentry/node");
const uuid_1 = require("uuid");
const vscode = require("vscode");
const coverage_1 = require("./coverage-system/coverage");
const config_1 = require("./extension/config");
const exportsapi_1 = require("./extension/exportsapi");
const gutters_1 = require("./extension/gutters");
const statusbartoggler_1 = require("./extension/statusbartoggler");
function activate(context) {
    const telemetry = vscode.workspace.getConfiguration("telemetry");
    const enableCrashReporting = telemetry.get("enableCrashReporter");
    if (enableCrashReporting) {
        // Leaving default integrations on captures crashes from other extension hosts
        // Turning this off fixes that issue and still allows us to capture errors manually
        Sentry.init({
            defaultIntegrations: false,
            dsn: "https://dfd1a0d586284b6b8710feef8a2928b3@o412074.ingest.sentry.io/5288283",
            release: "vscode-coverage-gutters@2.6.0",
        });
        Sentry.configureScope(function (scope) {
            // Generate a random string for this session
            // Note: for privacy reason, we cannot fingerprint across sessions
            scope.setUser({ id: uuid_1.v4() });
        });
    }
    const configStore = new config_1.Config(context);
    const statusBarToggler = new statusbartoggler_1.StatusBarToggler(configStore);
    const coverage = new coverage_1.Coverage(configStore);
    const outputChannel = vscode.window.createOutputChannel("coverage-gutters");
    const gutters = new gutters_1.Gutters(configStore, coverage, outputChannel, statusBarToggler);
    const previewCoverageReport = vscode.commands.registerCommand("coverage-gutters.previewCoverageReport", gutters.previewCoverageReport.bind(gutters));
    const display = vscode.commands.registerCommand("coverage-gutters.displayCoverage", gutters.displayCoverageForActiveFile.bind(gutters));
    const watch = vscode.commands.registerCommand("coverage-gutters.watchCoverageAndVisibleEditors", gutters.watchCoverageAndVisibleEditors.bind(gutters));
    const removeWatch = vscode.commands.registerCommand("coverage-gutters.removeWatch", gutters.removeWatch.bind(gutters));
    const remove = vscode.commands.registerCommand("coverage-gutters.removeCoverage", gutters.removeCoverageForActiveFile.bind(gutters));
    context.subscriptions.push(previewCoverageReport);
    context.subscriptions.push(remove);
    context.subscriptions.push(display);
    context.subscriptions.push(watch);
    context.subscriptions.push(removeWatch);
    context.subscriptions.push(gutters);
    context.subscriptions.push(outputChannel);
    // return exports api functions
    return {
        emptyLastCoverage: exportsapi_1.emptyLastCoverage,
        getLastCoverageLines: exportsapi_1.getLastCoverageLines,
    };
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map