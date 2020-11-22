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
var ChoosingService_1 = require("../../ChoosingService");
var ComponentPathService_1 = require("../ComponentPathService");
var ComponentNameService_1 = require("../ComponentNameService");
var SvelteDocument_1 = require("../../../SvelteDocument");
var ComponentsSectionService = /** @class */ (function (_super) {
    __extends(ComponentsSectionService, _super);
    function ComponentsSectionService() {
        return _super.call(this, [
            new ComponentNameService_1.ComponentNameService(),
            new ComponentPathService_1.ComponentPathService()
        ]) || this;
    }
    ComponentsSectionService.prototype.getSupportedSvelteVersions = function () {
        return [SvelteDocument_1.SVELTE_VERSION_2];
    };
    ComponentsSectionService.prototype.reduceContext = function (context) {
        var openBlockIndex = context.content.lastIndexOf('components', context.offset);
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
        var match = /components\s*:\s*\{/gi.exec(innerContent);
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
    return ComponentsSectionService;
}(ChoosingService_1.ChoosingService));
exports.ComponentsSectionService = ComponentsSectionService;
//# sourceMappingURL=ComponentsSectionService.js.map