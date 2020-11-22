"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const helpers_1 = require("../helpers");
class SectionFinder {
    constructor(configStore, outputChannel) {
        this.configStore = configStore;
        this.outputChannel = outputChannel;
    }
    /**
     * Compare the paths using relative logic or absolute
     * @param textEditor editor with current active file
     * @param sections sections to compare against open editors
     */
    findSectionsForEditor(textEditor, sections) {
        const sectionsArray = Array.from(sections.values());
        const res = this.calculateEditorData(textEditor);
        if (!res) {
            return [];
        }
        // Check each section against the currently active document filename
        const foundSections = sectionsArray.filter((section) => this.checkSection(section, res.relativePath, res.workspaceFolder));
        if (!foundSections.length) {
            return [];
        }
        foundSections.forEach(this.logSection.bind(this));
        return foundSections;
    }
    /**
     * Helper to log each section to the output channel and the event reporting
     * @param section data section to log information against
     */
    logSection(section) {
        if (section.title) {
            const titleMessage = `[${Date.now()}][renderer][section test name]: ${section.title}`;
            this.outputChannel.appendLine(titleMessage);
        }
        const filePath = section.file;
        const filePathMessage = `[${Date.now()}][renderer][section file path]: ${filePath}`;
        this.outputChannel.appendLine(filePathMessage);
    }
    /**
     * Checks for a matching section file against the a given fileName
     * @param section data section to check against filename
     * @param editorFileRelative normalized relative path (against workspace folder) of editor filename, starts with ###
     * @param workspaceFolderName workspace folder name
     */
    checkSection(section, editorFileRelative, workspaceFolderName) {
        // Check if we need to swap any fragments of the file path with a remote fragment
        // IE: /var/www/ -> /home/me/
        const sectionFileName = this.resolveFileName(section.file);
        if (!helpers_1.isPathAbsolute(sectionFileName)) {
            return this.checkSectionRelative(sectionFileName, editorFileRelative);
        }
        else {
            return this.checkSectionAbsolute(sectionFileName, editorFileRelative, workspaceFolderName);
        }
    }
    /**
     * Resolves remote file paths by removing those fragments and replacing with local ones.
     * EG: /var/www/project/file.js -> /home/dev/project/file.js
     * Note: this only runs if the developer adds a remotePathResolve setting
     * @param fileName section file path
     */
    resolveFileName(fileName) {
        let potentialFileName = fileName;
        const remoteLocalPaths = this.configStore.remotePathResolve;
        if (remoteLocalPaths) {
            const remoteFragment = remoteLocalPaths[0];
            const localFragment = remoteLocalPaths[1];
            const paths = fileName.split(remoteFragment);
            // If we have a length of two we have a match and can swap the paths
            // Note: this is because split will give us an array of two with the first element
            // being an empty string and the second being the project path.
            if (paths.length === 2) {
                potentialFileName = localFragment + paths[1];
            }
        }
        return potentialFileName;
    }
    /**
     * Calculates relativePath and workspaceFolder for given TextEditor instance
     * Returned relativePath is normalized relative path (against workspace folder) of editor filename, starts with ###
     * Returned workspaceFolder is name of workspaceFolder
     * Ex. workspace: "c:/Workspace/testProject"
     *     editor file: "c:/workspace/testProject/src/com/MyCompany/lib/Bla.java"
     *     returned relativePath: "###src###com###mycompany###lib###bla.java"
     *     returned workspaceFolder: "testProject"
     * @param textEditor Instance of TextEditor
     */
    calculateEditorData(textEditor) {
        // calculate normalize
        const fileName = textEditor.document.fileName;
        const editorFileUri = vscode_1.Uri.file(fileName);
        const workspaceFolder = vscode_1.workspace.getWorkspaceFolder(editorFileUri);
        if (!workspaceFolder) {
            return;
        } // file is not in workspace - skip it
        const workspaceFsPath = workspaceFolder.uri.fsPath;
        const editorFileAbs = helpers_1.normalizeFileName(fileName);
        const workspaceFile = helpers_1.normalizeFileName(workspaceFsPath);
        const editorFileRelative = editorFileAbs.substring(workspaceFile.length);
        const workspaceFolderName = helpers_1.normalizeFileName(workspaceFolder.name);
        return { relativePath: editorFileRelative, workspaceFolder: workspaceFolderName };
    }
    /**
     * Returns true if relative section matches given editor file
     * @param sectionFileName relative section fileName
     * @param editorFileRelative normalized relative path (against workspace folder) of editor filename, starts with ###
     */
    checkSectionRelative(sectionFileName, editorFileRelative) {
        // editorFileRelative must end with searchable & normalized section
        sectionFileName = helpers_1.makePathSearchable(sectionFileName);
        const sectionFileNormalized = helpers_1.normalizeFileName(sectionFileName);
        return editorFileRelative.endsWith(sectionFileNormalized);
    }
    /**
     * Returns true if absolute section matches given editor file
     * @param sectionFileName absolute section fileName
     * @param editorFileRelative normalized relative path (against workspace folder) of editor filename, starts with ###
     * @param workspaceFolderName workspace folder name
     */
    checkSectionAbsolute(sectionFileName, editorFileRelative, workspaceFolderName) {
        // normalized section must end with /workspaceFolderName/editorFileRelative
        const sectionFileNormalized = helpers_1.normalizeFileName(sectionFileName);
        const matchPattern = `###${workspaceFolderName}${editorFileRelative}`;
        return sectionFileNormalized.endsWith(matchPattern);
    }
}
exports.SectionFinder = SectionFinder;
//# sourceMappingURL=sectionfinder.js.map