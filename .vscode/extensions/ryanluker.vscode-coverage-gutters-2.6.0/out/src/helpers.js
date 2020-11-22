"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Finds the matching suffixes of the string, stripping off the non-matching starting characters.
 * @param base
 * @param comparee
 */
function findIntersect(base, comparee) {
    const a = [...base].reverse();
    const b = [...comparee].reverse();
    // find the intersection and reverse it back into a string
    const intersection = [];
    let pos = 0;
    // stop when strings at pos are no longer are equal
    while (a[pos] === b[pos]) {
        // if we reached the end or there isnt a value for that pos
        // exit the while loop
        if (!a[pos] || !b[pos]) {
            break;
        }
        intersection.push(a[pos]);
        pos++;
    }
    const subInt = intersection.reverse().join("");
    return subInt;
}
exports.findIntersect = findIntersect;
/**
 * Helps make a file path that is standard for all OSs
 * @param fileName File name to remove OS specific features
 */
function normalizeFileName(fileName) {
    let name = fileName;
    // make file path relative and OS independent
    name = name.toLocaleLowerCase();
    // remove all file slashes
    name = name.replace(/\//g, "###");
    name = name.replace(/\\/g, "###");
    return name;
}
exports.normalizeFileName = normalizeFileName;
/**
 * Returns true if given path is absolute, false otherwise
 * @param path path to be tested
 */
function isPathAbsolute(path) {
    // Note 1: some coverage generators can start with no slash #160
    // Note 2: accounts for windows and linux style file paths
    // windows as they start with drives (ie: c:\ or C:/)
    // linux as they start with forward slashes
    // both windows and linux use ./ or .\ for relative
    const unixRoot = path.startsWith("/");
    const windowsRoot = path[1] === ":" && (path[2] === "\\" || path[2] === "/");
    return (unixRoot || windowsRoot);
}
exports.isPathAbsolute = isPathAbsolute;
/**
 * Converts given relative path to string that can be used for searching regardles of OS
 * @param relativePath relative path to be converted
 */
function makePathSearchable(relativePath) {
    relativePath = relativePath.replace(/\\/g, "/");
    if (relativePath.indexOf("./") === 0) {
        return relativePath.substring(1); // remove leading "."
    }
    if (relativePath.indexOf("/") === 0) { // should not happen - path should be relative
        return relativePath;
    }
    return `/${relativePath}`; // add / at the begining so that we find that specific directory
}
exports.makePathSearchable = makePathSearchable;
//# sourceMappingURL=helpers.js.map