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
var ChoosingService_1 = require("../ChoosingService");
var ComputedDependencyService_1 = require("./ComputedDependencyService");
var ComputedSectionService = /** @class */ (function (_super) {
    __extends(ComputedSectionService, _super);
    function ComputedSectionService() {
        return _super.call(this, [
            new ComputedDependencyService_1.ComputedDependencyService()
        ]) || this;
    }
    ComputedSectionService.prototype.reduceContext = function (context) {
        var openBlockIndex = context.content.lastIndexOf('computed', context.offset);
        if (openBlockIndex < 0) {
            return null;
        }
        var closeBlockIndex = context.content.indexOf('}', openBlockIndex);
        if (closeBlockIndex > 0 && closeBlockIndex < context.offset) {
            return null;
        }
        var innerContent = closeBlockIndex < 0
            ? context.content.substring(openBlockIndex)
            : context.content.substring(openBlockIndex, closeBlockIndex);
        var match = /computed\s*:\s*\{/gi.exec(innerContent);
        if (match) {
            var matchOffset = match.index + match[0].length;
            return {
                documentOffset: context.documentOffset,
                content: innerContent.substring(matchOffset),
                offset: context.offset - openBlockIndex - matchOffset,
                data: context.data
            };
        }
        return null;
    };
    return ComputedSectionService;
}(ChoosingService_1.ChoosingService));
exports.ComputedSectionService = ComputedSectionService;
//# sourceMappingURL=ComputedSectionService.js.map