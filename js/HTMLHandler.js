"use strict";
exports.__esModule = true;
var HTMLHandler = (function () {
    function HTMLHandler() {
        this.changeColorButton = document.getElementById("changeColorButton");
        this.changeSpeedButton = document.getElementById("changeSpeedButton");
        this.speedDropDownMenu = document.getElementById("speedDropDown-content");
        this.colorDropDownContent = document.getElementById("colorDropDown-content");
        this.detailedTable = document.getElementById("detailedTable");
        this.fullScreenButton = document.getElementById("fullScreenButton");
        this.colorButton = document.getElementById("colorDropDownMenu");
        this.previousButton = document.getElementById("previousButton");
        this.nextButton = document.getElementById("nextButton");
        this.editButton = document.getElementById("editButton");
        this.textArea = document.getElementById("textInput");
        this.runButton = document.getElementById("runButton");
        this.canvas = document.getElementById("canvas");
        this.footer = document.getElementById("footer");
        this.header = document.getElementById("header");
        this.console = document.getElementById("console");
        this.body = document.body;
        this.logo = document.getElementById("logo");
        this.fasLogo = document.getElementById("fasLogo");
        this.github = document.getElementById("github");
        this.fastButton = document.getElementById("fastButton");
        this.normalButton = document.getElementById("normalButton");
        this.slowButton = document.getElementById("slowButton");
        this.isFullScreen = false;
        this.isSoundOn = true;
        this.soundButton = document.getElementById("soundButton");
        this.registersTable = document.getElementById("registersTable");
        this.instructionAndArguments = document.getElementById("instructionAndArguments");
        this.colors = document.getElementById("colors");
        this.speed = document.getElementById("speed");
        this.changeThemeButton = document.getElementById("changeThemeButton");
        console.log("HTMLHandler constructed");
    }
    HTMLHandler.prototype.toggleSound = function () {
        this.isSoundOn = !this.isSoundOn;
        if (this.body.style.background != "white") {
            if (this.isSoundOn)
                this.soundButton.style.backgroundImage = "url('./res/soundButton.png')";
            else
                this.soundButton.style.backgroundImage = "url('./res/nosoundButton.png')";
        }
        else {
            if (this.isSoundOn)
                this.soundButton.style.backgroundImage = "url('./res/soundButton_black.png')";
            else
                this.soundButton.style.backgroundImage = "url('./res/nosoundButton_black.png')";
        }
    };
    HTMLHandler.prototype.fullScreenMode = function (boolean) {
        this.isFullScreen = boolean;
        if (boolean) {
            this.textArea.style.display = "none";
            this.footer.style.display = "none";
            this.header.style.display = "none";
            this.fasLogo.style.display = "none";
            this.github.style.display = "none";
            this.canvas.className = "fullscreen";
            this.editButton.style.display = "none";
            if (this.body.style.background != "white")
                this.fullScreenButton.style.backgroundImage = "url('./res/nofullscreen.png')";
            else
                this.fullScreenButton.style.backgroundImage = "url('./res/nofullscreen_black.png')";
            this.console.style.display = "none";
            this.instructionAndArguments.style.display = "block";
        }
        else {
            this.detailedTable.style.display = "block";
            this.fullScreenButton.style.display = "block";
            this.registersTable.style.display = "block";
            this.instructionAndArguments.style.display = "none";
            if (this.body.style.background != "white")
                this.fullScreenButton.style.backgroundImage = "url('./res/fullscreen.png')";
            else
                this.fullScreenButton.style.backgroundImage = "url('./res/fullscreen_black.png')";
            this.canvas.className = "nofullscreen";
            this.detailedTable.className = "nofullscreen";
            this.nextButton.style.display = "block";
            this.textArea.style.display = "block";
            this.footer.style.display = "block";
            this.header.style.display = "block";
            this.fasLogo.style.display = "block";
            this.github.style.display = "block";
            this.editButton.style.display = "block";
            this.console.style.display = "block";
        }
    };
    HTMLHandler.prototype.emptyDetailedTable = function () {
        this.updateDetailedTable("_", [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    };
    HTMLHandler.prototype.updateDetailedTable = function (instruction, controlSingals) {
        if (controlSingals == undefined && instruction == undefined)
            return;
        document.getElementById("instructionIndicator").innerHTML = instruction;
        document.getElementById("RegDst").innerHTML = controlSingals[0];
        document.getElementById("AluSrc").innerHTML = controlSingals[1];
        document.getElementById("MemReg").innerHTML = controlSingals[2];
        document.getElementById("RegWr").innerHTML = controlSingals[3];
        document.getElementById("MemRd").innerHTML = controlSingals[4];
        document.getElementById("MemWr").innerHTML = controlSingals[5];
        document.getElementById("Branch").innerHTML = controlSingals[6];
        document.getElementById("AluOp").innerHTML = controlSingals[7];
        document.getElementById("Jump").innerHTML = controlSingals[8];
    };
    HTMLHandler.prototype.toggleShowCollors = function () {
        if (this.colors.style.display == "block")
            this.colors.style.display = "none";
        else
            this.colors.style.display = "block";
    };
    HTMLHandler.prototype.toggleShowSpeed = function () {
        if (this.speed.style.display == "block")
            this.speed.style.display = "none";
        else
            this.speed.style.display = "block";
    };
    HTMLHandler.prototype.toggleColorDropDownContent = function () {
        if (this.colorDropDownContent.style.display == "block")
            this.colorDropDownContent.style.display = "none";
        else
            this.colorDropDownContent.style.display = "block";
        this.toggleChangeColorButton();
    };
    HTMLHandler.prototype.toggleSpeedDropDownMenu = function () {
        if (this.speedDropDownMenu.style.display == "block")
            this.speedDropDownMenu.style.display = "none";
        else
            this.speedDropDownMenu.style.display = "block";
        this.toggleChangeSpeedButton();
    };
    HTMLHandler.prototype.toggleChangeColorButton = function () {
        if (this.changeColorButton.style.display == "none")
            this.changeColorButton.style.display = "block";
        else
            this.changeColorButton.style.display == "none";
    };
    HTMLHandler.prototype.toggleChangeSpeedButton = function () {
        if (this.changeSpeedButton.style.display == "none")
            this.changeSpeedButton.style.display = "block";
        else
            this.changeSpeedButton.style.display == "none";
    };
    HTMLHandler.prototype.showTextArea = function () {
        this.textArea.removeAttribute("disabled");
        if (this.body.style.background == "white") {
            this.textArea.style.background = "white";
            this.textArea.style.color = "black";
        }
        else {
            this.textArea.style.background = "#171717";
            this.textArea.style.color = "white";
        }
    };
    HTMLHandler.prototype.hideTextArea = function () {
        this.textArea.setAttribute("disabled", "true");
        if (this.body.style.background == "white") {
            this.textArea.style.background = "#f2f2f2";
            this.textArea.style.color = "black";
            this.instructionAndArguments.style.background = this.textArea.style.background;
            this.instructionAndArguments.style.color = this.textArea.style.color;
        }
        else {
            this.textArea.style.background = "#262626";
            this.textArea.style.color = "#f2f2f2";
            this.instructionAndArguments.style.background = "#0F0F0F";
            this.instructionAndArguments.style.color = "white";
        }
    };
    HTMLHandler.prototype.showNextButton = function () {
        this.nextButton.removeAttribute("disabled");
        if (this.body.style.background != "white") {
            this.nextButton.style.backgroundImage = "url('./res/next.png')";
        }
        else
            this.nextButton.style.backgroundImage = "url('./res/next_black.png')";
    };
    HTMLHandler.prototype.hideNextButton = function () {
        this.nextButton.setAttribute("disabled", "true");
        this.nextButton.style.backgroundImage = "url('./res/nextDisabled.png')";
    };
    HTMLHandler.prototype.showChangeColorButton = function () {
        this.changeColorButton.removeAttribute("disabled");
        this.changeColorButton.style.background = "#ffff66";
    };
    HTMLHandler.prototype.hideChangeColorButton = function () {
        this.changeColorButton.setAttribute("disabled", "true");
        this.changeColorButton.style.background = "gray";
        this.changeColorButton.style.color = "black";
    };
    HTMLHandler.prototype.showPreviousButton = function () {
        this.previousButton.removeAttribute("disabled");
        if (this.body.style.background != "white")
            this.previousButton.style.backgroundImage = "url('./res/previous.png')";
        else
            this.previousButton.style.backgroundImage = "url('./res/previous_black.png')";
    };
    HTMLHandler.prototype.hidePreviousButton = function () {
        this.previousButton.setAttribute("disabled", "true");
        this.previousButton.style.backgroundImage = "url('./res/previousDisabled.png')";
    };
    HTMLHandler.prototype.showEditButton = function () {
        this.editButton.removeAttribute("disabled");
        if (this.body.style.background != "white")
            this.editButton.style.backgroundImage = "url('./res/edit.png')";
        else
            this.editButton.style.backgroundImage = "url('./res/edit_black.png')";
    };
    HTMLHandler.prototype.hideEditButton = function () {
        this.editButton.setAttribute("disabled", "true");
        this.editButton.style.backgroundImage = "url('./res/editDisabled.png')";
    };
    HTMLHandler.prototype.showRunButton = function () {
        this.runButton.removeAttribute("disabled");
        if (this.body.style.background != "white")
            this.runButton.style.backgroundImage = "url('./res/play.png')";
        else
            this.runButton.style.backgroundImage = "url('./res/play_black.png')";
    };
    HTMLHandler.prototype.hideRunButton = function () {
        this.runButton.setAttribute("disabled", "true");
    };
    return HTMLHandler;
}());
exports.HTMLHandler = HTMLHandler;
