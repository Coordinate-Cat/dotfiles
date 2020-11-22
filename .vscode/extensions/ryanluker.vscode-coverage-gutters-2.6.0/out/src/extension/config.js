"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class Config {
    constructor(context) {
        this.context = context;
        this.setup();
        // Reload the cached values if the configuration changes
        vscode_1.workspace.onDidChangeConfiguration(this.setup.bind(this));
    }
    setup() {
        const rootCustomConfig = vscode_1.workspace.getConfiguration("coverage-gutters.customizable");
        // Customizable UI configurations
        const configsCustom = Object.keys(rootCustomConfig);
        for (const element of configsCustom) {
            vscode_1.commands.executeCommand("setContext", "config.coverage-gutters.customizable." + element, rootCustomConfig.get(element));
        }
        const rootConfig = vscode_1.workspace.getConfiguration("coverage-gutters");
        // Basic configurations
        // TODO: remove lcovname and xmlname in 3.0.0 release
        const lcovName = rootConfig.get("lcovname");
        const xmlName = rootConfig.get("xmlname");
        this.reportFileName = rootConfig.get("coverageReportFileName");
        this.coverageBaseDir = rootConfig.get("coverageBaseDir");
        this.coverageFileNames = rootConfig.get("coverageFileNames");
        this.coverageFileNames.push(lcovName, xmlName);
        this.coverageFileNames = this.coverageFileNames.filter((name) => !!name.trim());
        // Make fileNames unique
        this.coverageFileNames = [...new Set(this.coverageFileNames)];
        // Load ignored paths
        this.ignoredPathGlobs = rootConfig.get("ignoredPathGlobs");
        const STATUS_BAR_TOGGLER = "status-bar-toggler-watchCoverageAndVisibleEditors-enabled";
        this.showStatusBarToggler = rootCustomConfig.get(STATUS_BAR_TOGGLER);
        // Themes and icons
        const coverageLightBackgroundColour = rootConfig.get("highlightlight");
        const coverageDarkBackgroundColour = rootConfig.get("highlightdark");
        const partialCoverageLightBackgroundColour = rootConfig.get("partialHighlightLight");
        const partialCoverageDarkBackgroundColour = rootConfig.get("partialHighlightDark");
        const noCoverageLightBackgroundColour = rootConfig.get("noHighlightLight");
        const noCoverageDarkBackgroundColour = rootConfig.get("noHighlightDark");
        const gutterIconPathDark = rootConfig.get("gutterIconPathDark");
        const gutterIconPathLight = rootConfig.get("gutterIconPathLight");
        const partialGutterIconPathDark = rootConfig.get("partialGutterIconPathDark");
        const partialGutterIconPathLight = rootConfig.get("partialGutterIconPathLight");
        const noGutterIconPathDark = rootConfig.get("noGutterIconPathDark");
        const noGutterIconPathLight = rootConfig.get("noGutterIconPathLight");
        const showGutterCoverage = rootConfig.get("showGutterCoverage");
        const showLineCoverage = rootConfig.get("showLineCoverage");
        const showRulerCoverage = rootConfig.get("showRulerCoverage");
        // Setup info for decorations
        const fullDecoration = {
            dark: {
                backgroundColor: showLineCoverage ? coverageDarkBackgroundColour : "",
                gutterIconPath: showGutterCoverage ? this.context.asAbsolutePath(gutterIconPathDark) : "",
                overviewRulerColor: showRulerCoverage ? coverageDarkBackgroundColour : "",
            },
            isWholeLine: true,
            light: {
                backgroundColor: showLineCoverage ? coverageLightBackgroundColour : "",
                gutterIconPath: showGutterCoverage ? this.context.asAbsolutePath(gutterIconPathLight) : "",
                overviewRulerColor: showRulerCoverage ? coverageLightBackgroundColour : "",
            },
            overviewRulerLane: vscode_1.OverviewRulerLane.Full,
        };
        const partialDecoration = {
            dark: {
                backgroundColor: showLineCoverage ? partialCoverageDarkBackgroundColour : "",
                gutterIconPath: showGutterCoverage ? this.context.asAbsolutePath(partialGutterIconPathDark) : "",
                overviewRulerColor: showRulerCoverage ? partialCoverageDarkBackgroundColour : "",
            },
            isWholeLine: true,
            light: {
                backgroundColor: showLineCoverage ? partialCoverageLightBackgroundColour : "",
                gutterIconPath: showGutterCoverage ? this.context.asAbsolutePath(partialGutterIconPathLight) : "",
                overviewRulerColor: showRulerCoverage ? partialCoverageLightBackgroundColour : "",
            },
            overviewRulerLane: vscode_1.OverviewRulerLane.Full,
        };
        const noDecoration = {
            dark: {
                backgroundColor: showLineCoverage ? noCoverageDarkBackgroundColour : "",
                gutterIconPath: showGutterCoverage ? this.context.asAbsolutePath(noGutterIconPathDark) : "",
                overviewRulerColor: showRulerCoverage ? noCoverageDarkBackgroundColour : "",
            },
            isWholeLine: true,
            light: {
                backgroundColor: showLineCoverage ? noCoverageLightBackgroundColour : "",
                gutterIconPath: showGutterCoverage ? this.context.asAbsolutePath(noGutterIconPathLight) : "",
                overviewRulerColor: showRulerCoverage ? noCoverageLightBackgroundColour : "",
            },
            overviewRulerLane: vscode_1.OverviewRulerLane.Full,
        };
        this.cleanupEmptyGutterIcons(fullDecoration, partialDecoration, noDecoration);
        // Generate decorations
        this.noCoverageDecorationType = vscode_1.window.createTextEditorDecorationType(noDecoration);
        this.partialCoverageDecorationType = vscode_1.window.createTextEditorDecorationType(partialDecoration);
        this.fullCoverageDecorationType = vscode_1.window.createTextEditorDecorationType(fullDecoration);
        // Assign the key and resolved fragment
        this.remotePathResolve = rootConfig.get("remotePathResolve");
        const hasRemotePathResolve = !!this.remotePathResolve.length;
        // Add the manual coverage file path(s) if present
        this.manualCoverageFilePaths = rootConfig.get("manualCoverageFilePaths");
        const hasManualCoverageFilePaths = !!this.manualCoverageFilePaths.length;
    }
    /**
     * removes empty gutter icons to allow for break point usage
     * @param full
     * @param partial
     * @param no
     */
    cleanupEmptyGutterIcons(full, partial, no) {
        if (full && full.dark && !full.dark.gutterIconPath) {
            delete full.dark.gutterIconPath;
        }
        if (full && full.light && !full.light.gutterIconPath) {
            delete full.light.gutterIconPath;
        }
        if (partial && partial.dark && !partial.dark.gutterIconPath) {
            delete partial.dark.gutterIconPath;
        }
        if (partial && partial.light && !partial.light.gutterIconPath) {
            delete partial.light.gutterIconPath;
        }
        if (no && no.dark && !no.dark.gutterIconPath) {
            delete no.dark.gutterIconPath;
        }
        if (no && no.light && !no.light.gutterIconPath) {
            delete no.light.gutterIconPath;
        }
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map