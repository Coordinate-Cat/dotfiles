"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extensionerror_1 = require("../extension/extensionerror");
class MissingFileError extends extensionerror_1.ExtensionError {
    constructor(message = "Did not choose a file!") {
        super(message);
        this.name = "MissingFileError";
        // Prevent this error from being reported to the crash module
        this.reportCrash = false;
    }
}
exports.MissingFileError = MissingFileError;
//# sourceMappingURL=missingfileerror.js.map