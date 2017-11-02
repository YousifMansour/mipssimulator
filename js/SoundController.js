"use strict";
exports.__esModule = true;
require("./lib/responsivevoice.js");
var SoundController = (function () {
    function SoundController() {
        this.audioOn = true;
        this.player = responsiveVoice;
        responsiveVoice.setDefaultVoice("US English Female");
        console.log("Sound Controller constructed!");
    }
    SoundController.prototype.playSound = function (string) {
        if (this.audioOn) {
            if (this.player.isPlaying())
                this.player.cancel();
            this.player.speak(string);
        }
    };
    SoundController.prototype.toggleAudio = function () {
        this.audioOn = !this.audioOn;
    };
    return SoundController;
}());
exports.SoundController = SoundController;
