"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var vscode_languageserver_1 = require("vscode-languageserver");
var sep = path.sep || '/';
var svelteFileExtensions = ['', '.svelte', '.html'];
/**
 * File URI to Path function. Taken from https://github.com/TooTallNate/file-uri-to-path.
 *
 * @param {String} uri
 * @return {String} path
 */
function fileUriToPath(uri) {
    if ('string' !== typeof uri ||
        uri.length <= 7 ||
        'file://' !== uri.substring(0, 7)) {
        throw new TypeError('must pass in a file:// URI to convert to a file path');
    }
    var rest = decodeURIComponent(uri.substring(7));
    var firstSlash = rest.indexOf('/');
    var host = rest.substring(0, firstSlash);
    var path = rest.substring(firstSlash + 1);
    // 2.  Scheme Definition
    // As a special case, <host> can be the string "localhost" or the empty
    // string; this is interpreted as "the machine from which the URL is
    // being interpreted".
    if ('localhost' === host) {
        host = '';
    }
    if (host) {
        host = sep + sep + host;
    }
    // 3.2  Drives, drive letters, mount points, file system root
    // Drive letters are mapped into the top of a file URI in various ways,
    // depending on the implementation; some applications substitute
    // vertical bar ("|") for the colon after the drive letter, yielding
    // "file:///c|/tmp/test.txt".  In some cases, the colon is left
    // unchanged, as in "file:///c:/tmp/test.txt".  In other cases, the
    // colon is simply omitted, as in "file:///c/tmp/test.txt".
    path = path.replace(/^(.+)\|/, '$1:');
    // for Windows, we need to invert the path separators from what a URI uses
    if (sep === '\\') {
        path = path.replace(/\//g, '\\');
    }
    if (/^.+\:/.test(path)) {
        // has Windows drive at beginning of path
    }
    else {
        // unix path…
        path = sep + path;
    }
    return host + path;
}
exports.fileUriToPath = fileUriToPath;
/**
 * Path to File URI function.
 *
 * @param {String} filePath
 * @return {String} uri
 */
function pathToFileUri(filePath) {
    // Require a leading slash, on windows prefixed with drive letter
    if (!/^(?:[a-z]:)?[\\\/]/i.test(filePath)) {
        throw new Error(filePath + " is not an absolute path");
    }
    var parts = filePath.split(/[\\\/]/);
    // If the first segment is a Windows drive letter, prefix with a slash and skip encoding
    var head = parts.shift();
    if (head !== '') {
        head = '/' + head;
    }
    else {
        head = encodeURIComponent(head);
    }
    return "file://" + head + "/" + parts.map(encodeURIComponent).join('/');
}
exports.pathToFileUri = pathToFileUri;
/**
 * Checks if svelte file (with .svelte or .html extension) exists based on a given file path and returns its real path.
 * @param {String} filepath File path with or without extension.
 * @returns {String} Full file path with extension. null if file not found.
 */
function findSvelteFile(filepath) {
    for (var index = 0; index < svelteFileExtensions.length; index++) {
        var extension = svelteFileExtensions[index];
        if (extension === '' || !filepath.endsWith(extension)) {
            var svelteFilePath = filepath + extension;
            if (fs.existsSync(svelteFilePath)) {
                return svelteFilePath;
            }
        }
    }
    return null;
}
exports.findSvelteFile = findSvelteFile;
/**
 * Checks if svelte file (with .svelte or .html extension) exists based on a given file path and returns document from cache.
 * @param {String} filepath File path with or without extension.
 * @param {DocumentsCache} documentsCache Documents cache to search in.
 * @returns {SvelteDocument} Document from cache, null if not found.
 */
function findSvelteDocumentInCache(filepath, documentsCache) {
    for (var index = 0; index < svelteFileExtensions.length; index++) {
        var extension = svelteFileExtensions[index];
        if (extension === '' || !filepath.endsWith(extension)) {
            var svelteFilePath = filepath + extension;
            if (documentsCache.has(svelteFilePath)) {
                return documentsCache.get(svelteFilePath);
            }
        }
    }
    return null;
}
exports.findSvelteDocumentInCache = findSvelteDocumentInCache;
/**
 * Finds node_modules directory going up from the given directory.
 * @param startDir Directory to start search from.
 */
function findNodeModules(startDir) {
    var currentDir = startDir;
    var nodeModulesDir = 'node_modules';
    while (currentDir !== '.') {
        var candidate = path.join(currentDir, nodeModulesDir);
        if (fs.existsSync(candidate)) {
            return candidate;
        }
        var newCurrentDir = path.dirname(currentDir);
        if (newCurrentDir === currentDir) {
            break;
        }
        currentDir = newCurrentDir;
    }
    return null;
}
exports.findNodeModules = findNodeModules;
/**
 * Creates TextDocument for the given file.
 * @param path Path to the document.
 */
function createTextDocument(path, uri) {
    var buffer = fs.readFileSync(path);
    return vscode_languageserver_1.TextDocument.create(uri || pathToFileUri(path), 'svelte', 0, buffer.toString());
}
exports.createTextDocument = createTextDocument;
//# sourceMappingURL=utils.js.map