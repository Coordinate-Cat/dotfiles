"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("../../Common");
var SvelteDocument_1 = require("../../../SvelteDocument");
var ComponentSetDataService = /** @class */ (function (_super) {
    __extends(ComponentSetDataService, _super);
    function ComponentSetDataService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComponentSetDataService.prototype.getSupportedSvelteVersions = function () {
        return [SvelteDocument_1.SVELTE_VERSION_2];
    };
    ComponentSetDataService.prototype.getCompletitionItems = function (document, context) {
        var indexOfLastOpenBrace = this.findNearestOpenBraceIndex(context.content, context.offset);
        if (indexOfLastOpenBrace < 0) {
            return null;
        }
        if (/\s*this\s*\.\s*set\s*\(\s*$/g.test(context.content.substring(0, indexOfLastOpenBrace))) {
            return document.metadata
                ? document.metadata.data
                : [];
        }
        return null;
    };
    ComponentSetDataService.prototype.findNearestOpenBraceIndex = function (content, offset) {
        var currentPosition = offset - 1;
        var countOfUnclosedBraces = 0;
        while (currentPosition >= 0) {
            var currentChar = content.charAt(currentPosition);
            if (currentChar === '}') {
                countOfUnclosedBraces++;
            }
            else if (currentChar === '{') {
                if (countOfUnclosedBraces === 0) {
                    return currentPosition;
                }
                else {
                    countOfUnclosedBraces--;
                }
            }
            currentPosition--;
        }
        return -1;
    };
    return ComponentSetDataService;
}(Common_1.BaseService));
exports.ComponentSetDataService = ComponentSetDataService;
//# sourceMappingURL=ComponentSetDataService.js.map