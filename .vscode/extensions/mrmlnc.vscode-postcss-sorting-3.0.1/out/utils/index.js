'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function output(channel, message, autoShowOutput = true) {
    if (!channel) {
        channel = vscode.window.createOutputChannel('Stylefmt');
    }
    channel.clear();
    channel.appendLine('[Stylefmt]');
    channel.append(message.toString());
    if (autoShowOutput) {
        channel.show();
    }
}
exports.output = output;
