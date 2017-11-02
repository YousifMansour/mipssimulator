import { HTMLHandler } from './HTMLHandler';
import { DrawingClass } from './DrawingClass';
import { MIPS } from './MIPS';
import { Console } from './Console';

export class ThemeManager {

    htmlHandler: HTMLHandler;
    drawingObject: DrawingClass;
    mipsObject: MIPS;
    currentTheme: string;

    constructor(htmlHandler: HTMLHandler, drawingObject: DrawingClass, mipsObject: MIPS) {
        this.currentTheme = "black";
        this.htmlHandler = htmlHandler;
        this.drawingObject = drawingObject;
        this.mipsObject = mipsObject;


        console.log("Theme Manager constructed.");
    }

    toggleTheme() {
        if (this.currentTheme == "white") this.changeToBlackTheme();
        else this.changeToWhiteTheme();
    }

    changeToWhiteTheme() {
        console.log("changing to white theme");

        this.htmlHandler.logo.src = "./res/mips_logo_black.png";
        this.htmlHandler.runButton.style.backgroundImage = "url('./res/play_black.png')";
        this.htmlHandler.nextButton.style.backgroundImage = "url('./res/next_black.png')";
        this.htmlHandler.previousButton.style.backgroundImage = "url('./res/previous_black.png')";
        if (this.htmlHandler.previousButton.getAttribute("disabled"))
            this.htmlHandler.previousButton.style.backgroundImage = "url('./res/previousDisabled.png')";
        this.htmlHandler.fullScreenButton.style.backgroundImage = "url('./res/fullscreen_black.png')";

        if (this.htmlHandler.isFullScreen)
            this.htmlHandler.fullScreenButton.style.backgroundImage = "url('./res/nofullscreen_black.png')";

        this.htmlHandler.editButton.style.backgroundImage = "url('./res/edit_black.png')";
        if (this.htmlHandler.editButton.getAttribute("disabled"))
            this.htmlHandler.editButton.style.backgroundImage = "url('./res/editDisabled.png')";

        if (this.htmlHandler.isSoundOn)
            this.htmlHandler.soundButton.style.backgroundImage = "url('./res/soundButton_black.png')";
        else this.htmlHandler.soundButton.style.backgroundImage = "url('./res/nosoundButton_black.png')";


        this.currentTheme = "white";
        this.drawingObject.setDefaultColor("black");

        this.htmlHandler.body.style.background = "white";

        this.htmlHandler.registersTable.style.color = "black";
        this.mipsObject.defaultRegistersColor = "black";

        this.htmlHandler.canvas.style.background = "#f2f2f2";

        this.htmlHandler.canvas.style.borderColor = "black";
        this.htmlHandler.textArea.style.borderColor = "black";
        this.htmlHandler.console.style.borderColor = "black";
        this.htmlHandler.instructionAndArguments.style.borderColor = "black";

        this.htmlHandler.detailedTable.style.borderColor = "black"

        this.htmlHandler.console.style.background = "#f2f2f2";

        if (this.htmlHandler.textArea.getAttribute("disabled") == "true") {
            this.htmlHandler.textArea.style.background = "#f2f2f2";
            this.htmlHandler.textArea.style.color = "black";

        } else {
            this.htmlHandler.textArea.style.background = "white";
            this.htmlHandler.textArea.style.color = "black";
        }

        this.htmlHandler.instructionAndArguments.style.background = this.htmlHandler.textArea.style.background;
        this.htmlHandler.instructionAndArguments.style.color = "black";

        this.htmlHandler.changeSpeedButton.style.background = "white";
        this.htmlHandler.changeSpeedButton.style.color = "black";

        this.htmlHandler.changeThemeButton.style.background = "white";
        this.htmlHandler.changeThemeButton.style.color = "black";

        this.htmlHandler.footer.style.color = "black";

    }

    changeToBlackTheme() {
        console.log("changing to black theme");

        this.htmlHandler.logo.src = "./res/mips_logo_white.png";
        this.htmlHandler.runButton.style.backgroundImage = "url('./res/play.png')";
        this.htmlHandler.nextButton.style.backgroundImage = "url('./res/next.png')";
        this.htmlHandler.previousButton.style.backgroundImage = "url('./res/previous.png')";
        if (this.htmlHandler.previousButton.getAttribute("disabled"))
            this.htmlHandler.previousButton.style.backgroundImage = "url('./res/previousDisabled.png')";
        this.htmlHandler.fullScreenButton.style.backgroundImage = "url('./res/fullscreen.png')";
        if (this.htmlHandler.isFullScreen)
            this.htmlHandler.fullScreenButton.style.backgroundImage = "url('./res/nofullscreen.png')";

        this.htmlHandler.editButton.style.backgroundImage = "url('./res/edit.png')";
        if (this.htmlHandler.editButton.getAttribute("disabled"))
            this.htmlHandler.editButton.style.backgroundImage = "url('./res/editDisabled.png')";


        if (this.htmlHandler.isSoundOn)
            this.htmlHandler.soundButton.style.backgroundImage = "url('./res/soundButton.png')";
        else this.htmlHandler.soundButton.style.backgroundImage = "url('./res/nosoundButton.png')";


        this.currentTheme = "black";
        this.drawingObject.setDefaultColor("white");

        this.htmlHandler.body.style.background = "#0F0F0F";

        this.htmlHandler.registersTable.style.color = "white";
        this.mipsObject.defaultRegistersColor = "white";

        this.htmlHandler.canvas.style.background = "black";

        this.htmlHandler.canvas.style.borderColor = "white";
        this.htmlHandler.textArea.style.borderColor = "white";
        this.htmlHandler.console.style.borderColor = "white";
        this.htmlHandler.detailedTable.style.borderColor = "white";
        this.htmlHandler.instructionAndArguments.style.borderColor = "white";

        this.htmlHandler.console.style.background = "black";

        if (this.htmlHandler.textArea.getAttribute("disabled") == "false") {
            this.htmlHandler.textArea.style.background = "#262626";
            this.htmlHandler.textArea.style.color = "white";

        } else {
            this.htmlHandler.textArea.style.background = "#0F0F0F";
            this.htmlHandler.textArea.style.color = "white";
        }

        this.htmlHandler.instructionAndArguments.style.background = this.htmlHandler.textArea.style.background;
        this.htmlHandler.instructionAndArguments.style.color = "white";

        this.htmlHandler.changeSpeedButton.style.background = "#171717";
        this.htmlHandler.changeSpeedButton.style.color = "white";

        this.htmlHandler.changeThemeButton.style.background = "#171717";
        this.htmlHandler.changeThemeButton.style.color = "white";

        this.htmlHandler.footer.style.color = "white";
    }
}
