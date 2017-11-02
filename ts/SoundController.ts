import './lib/responsivevoice.js';

export class SoundController {
    audioOn: boolean = true;
    player: any = responsiveVoice;
    constructor() {
        responsiveVoice.setDefaultVoice("US English Female");
        console.log("Sound Controller constructed!");
    }

    playSound(string: string) {
        if (this.audioOn) {
            if (this.player.isPlaying()) this.player.cancel();
            this.player.speak(string);
        }
    }

    toggleAudio() {
        this.audioOn = !this.audioOn;
        // this.player.speak(this.audioOn + "");
    }
}
