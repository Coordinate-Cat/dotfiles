'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Player = require('player');
const player = new Player("C:\\Users\\cohoov\\Documents\\GitHub\\vscode-powermode\\src\\gun.wav");
class AudioPlayer {
    constructor() {
        this.playAudio = () => {
            player.play(this.onEnd);
        };
        this.onEnd = (err, player) => {
            console.log('end');
            if (err) {
                console.log(JSON.stringify(err));
            }
        };
    }
}
exports.AudioPlayer = AudioPlayer;
//# sourceMappingURL=sound-player.js.map