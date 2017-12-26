"use strict";
exports.__esModule = true;
var HTMLHandler_1 = require("./HTMLHandler");
var Animator_1 = require("./Animator");
var InputHandler_1 = require("./InputHandler");
var DrawingClass_1 = require("./DrawingClass");
var TypeObject_1 = require("./TypeObject");
var MIPS_1 = require("./MIPS");
var Validator_1 = require("./Validator");
var Console_1 = require("./Console");
var ThemeManager_1 = require("./ThemeManager");
var SoundController_1 = require("./SoundController");
var ProgramLoader_1 = require("./ProgramLoader");
var MainController = (function () {
    function MainController() {
        this.fullScreen = false;
        this.HTMLHandler = new HTMLHandler_1.HTMLHandler();
        this.soundController = new SoundController_1.SoundController();
        this.animator = new Animator_1.Animator();
        this.iterationIndex = 0;
        this.drawingObject = new DrawingClass_1.DrawingClass(this.HTMLHandler, this.soundController);
        this.typeObjectArray = this.drawingObject.getTypeObjectArray();
        this.mipsObject = new MIPS_1.MIPS(this.typeObjectArray);
        this.inputHandler = new InputHandler_1.InputHandler(this.typeObjectArray, this.mipsObject);
        this.console = new Console_1.Console();
        this.validator = new Validator_1.Validator(this.typeObjectArray, this.inputHandler, this.console);
        this.inputHandler.initValidator(this.validator);
        this.frameIndex = 0;
        this.HTMLHandler.hidePreviousButton();
        this.themeManager = new ThemeManager_1.ThemeManager(this.HTMLHandler, this.drawingObject, this.mipsObject);
        this.programLoader = new ProgramLoader_1.ProgramLoader(this.HTMLHandler.textArea);
        console.log("Main Controller constructed");
    }
    MainController.prototype.setFullScreenMode = function () {
        if (!this.fullScreen) {
            var width = window.innerWidth;
            var height = window.innerHeight;
            var canvasWidth = 0;
            var canvasHeight = 0;
            if ((width / height) < 1.7) {
                canvasWidth = window.innerWidth * 0.87;
                canvasHeight = window.innerHeight * 0.65;
                this.HTMLHandler.registersTable.style.right = "2%";
                this.HTMLHandler.canvas.style.left = "2%";
            }
            else {
                canvasWidth = window.innerWidth * 0.78;
                canvasHeight = window.innerHeight * 0.68;
                this.HTMLHandler.registersTable.style.right = "7%";
                this.HTMLHandler.canvas.style.left = "3%";
            }
            this.drawingObject.canvas.width = canvasWidth;
            this.drawingObject.canvas.height = canvasHeight;
            this.fullScreen = !this.fullScreen;
            this.HTMLHandler.fullScreenMode(true);
            this.drawingObject.brush.font = "12px Arial";
            this.drawingObject.draw(new TypeObject_1.TypeObject("", [], [], "", []));
            this.redrawFrames();
        }
        else {
            var width = window.innerWidth;
            var height = window.innerHeight;
            var canvasWidth = 0;
            var canvasHeight = 0;
            if ((width / height) < 1.7) {
                canvasWidth = window.innerWidth * 0.64;
                canvasHeight = window.innerHeight * 0.52;
                this.HTMLHandler.registersTable.style.right = "2%";
                this.HTMLHandler.canvas.style.left = "24%";
            }
            else {
                canvasWidth = window.innerWidth * 0.57;
                canvasHeight = window.innerHeight * 0.57;
                this.HTMLHandler.registersTable.style.right = "7%";
                this.HTMLHandler.canvas.style.left = "24%";
            }
            this.drawingObject.canvas.width = canvasWidth;
            this.drawingObject.canvas.height = canvasHeight;
            this.drawingObject.brush.font = "10px Arial";
            this.fullScreen = !this.fullScreen;
            this.HTMLHandler.fullScreenMode(false);
            this.drawingObject.draw(new TypeObject_1.TypeObject("", [], [], "", []));
            this.redrawFrames();
        }
    };
    MainController.prototype.updateColor = function () {
        if (this.HTMLHandler.changeColorButton.getAttribute("disabled") == "true")
            return;
        var currentColor = document.getElementById("changeColorButton").style.background;
        if (currentColor == "")
            currentColor = "#ffff66";
        this.drawingObject.setColor(currentColor);
        this.mipsObject.setHighLightColor(currentColor);
        this.mipsObject.highLightRegister();
        this.redrawFrames();
    };
    MainController.prototype.redrawFrames = function () {
        this.drawingObject.setAudio(false);
        this.drawingObject.setUpCanvas();
        if (this.listInOrder == undefined)
            return;
        var tempFramesArray = this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray;
        for (var i = 0; i < this.frameIndex; i++) {
            this.drawingObject.drawFrame(tempFramesArray[i], this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).stringALU, this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).type, this.listInOrder[this.iterationIndex]);
        }
    };
    MainController.prototype.drawEverything = function () {
        this.drawingObject.drawDefault();
        this.HTMLHandler.emptyDetailedTable();
        this.updateButtons();
    };
    MainController.prototype.runAll = function () {
        if (this.listInOrder == undefined)
            this.updateInOrderList();
        this.mipsObject.reset();
        this.mipsObject.loadMemory(this.inputHandler.getDataList());
        this.HTMLHandler.hideTextArea();
        this.HTMLHandler.hideChangeColorButton();
        this.HTMLHandler.hideEditButton();
        this.HTMLHandler.hideNextButton();
        this.HTMLHandler.hidePreviousButton();
        this.HTMLHandler.hideRunButton();
        this.HTMLHandler.hideEditButton();
        if (!this.validator.isItAllValid()) {
            this.updateButtons();
            return;
        }
        var functionReference = this.drawingObject.runInstruction.bind(this);
        var timeForNextInstruction = 0;
        var difference = 0;
        var totalTime = 0;
        for (var i = 0; i < this.listInOrder.length; i++) {
            difference = this.drawingObject.runInstruction(this.listInOrder[i][0], timeForNextInstruction);
            var instructionAndArguments = this.listInOrder[i];
            timeForNextInstruction += difference;
            totalTime += difference;
        }
        for (var i = 0; i < this.listInOrder.length; i++) {
            this.mipsObject.run(this.listInOrder[i]);
        }
        this.mipsObject.highLightNonZero();
        this.animator.aniamte(function () {
            this.HTMLHandler.showEditButton();
            this.HTMLHandler.showTextArea();
            this.HTMLHandler.showNextButton();
            this.HTMLHandler.showPreviousButton();
            this.HTMLHandler.showRunButton();
            this.HTMLHandler.showChangeColorButton();
            this.updateColor();
            this.mipsObject.reset();
            this.drawEverything();
        }.bind(this), (totalTime + 1000));
    };
    MainController.prototype.getNextFrame = function () {
        var instrustionList = this.inputHandler.getInstructionsList(false);
        if (this.frameIndex == this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray.length) {
            if (this.iterationIndex + 1 < this.listInOrder.length) {
                this.iterationIndex++;
                this.frameIndex = 0;
                this.drawingObject.drawDefault();
            }
        }
        return this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray[this.frameIndex++];
    };
    MainController.prototype.updateInOrderList = function () {
        if (!this.validator.isItAllValid())
            return;
        this.listInOrder = this.inputHandler.instructionsAndArgumentsInOrder();
    };
    MainController.prototype.runNext = function () {
        if (this.listInOrder == undefined) {
            this.updateInOrderList();
            return;
        }
        if (!this.HTMLHandler.textArea.getAttribute("disabled"))
            this.HTMLHandler.hideTextArea();
        this.drawingObject.setAudio(true);
        this.drawingObject.drawFrame(this.getNextFrame(), this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).stringALU, this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).type, this.listInOrder[this.iterationIndex]);
        if (this.frameIndex - 1 == 0) {
            this.mipsObject.run(this.listInOrder[this.iterationIndex]);
        }
        this.HTMLHandler.updateDetailedTable(this.listInOrder[this.iterationIndex][0], this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).controlSingals);
        this.updateButtons();
    };
    MainController.prototype.getPreviousFrame = function () {
        var instrustionList = this.inputHandler.getInstructionsList(false);
        if (this.frameIndex == 0) {
            if (this.iterationIndex - 1 >= 0) {
                this.iterationIndex--;
                this.frameIndex = 1;
            }
        }
        return this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray[this.frameIndex--];
    };
    MainController.prototype.runPrevious = function () {
        if (this.frameIndex == 1 && this.iterationIndex == 0) {
            this.frameIndex = 0;
            this.mipsObject.reset();
            this.listInOrder = undefined;
            this.console.clear();
            this.HTMLHandler.instructionAndArguments.value = "";
            this.drawEverything();
            return;
        }
        this.frameIndex--;
        if (this.frameIndex == 0) {
            if (this.iterationIndex - 1 >= 0) {
                this.mipsObject.reset();
                this.mipsObject.loadMemory(this.inputHandler.getDataList());
                for (var i = 0; i < this.iterationIndex; i++) {
                    this.mipsObject.run(this.listInOrder[i]);
                }
                this.iterationIndex--;
                this.frameIndex = this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray.length;
            }
        }
        this.drawingObject.drawDefault();
        var tempFramesArray = this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray;
        this.drawingObject.setAudio(false);
        for (var i = 0; i < this.frameIndex; i++) {
            if (i == this.frameIndex - 1)
                this.drawingObject.setAudio(true);
            this.drawingObject.drawFrame(tempFramesArray[i], this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).stringALU, this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).type, this.listInOrder[this.iterationIndex]);
        }
        this.HTMLHandler.updateDetailedTable(this.listInOrder[this.iterationIndex][0], this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).controlSingals);
        this.updateButtons();
    };
    MainController.prototype.edit = function () {
        this.iterationIndex = 0;
        this.frameIndex = 0;
        this.HTMLHandler.showTextArea();
        this.updateButtons();
        this.frameIndex = 0;
        this.mipsObject.reset();
        this.listInOrder = undefined;
        this.console.clear();
        this.HTMLHandler.instructionAndArguments.value = "";
        setTimeout(function () { this.HTMLHandler.textArea.focus(); }.bind(this), 50);
        this.drawEverything();
        return;
    };
    MainController.prototype.getTypeObjecet = function (instruction) {
        for (var i = 0; i < this.typeObjectArray.length; i++) {
            if (this.typeObjectArray[i].isThisType(instruction))
                return this.typeObjectArray[i];
        }
        console.log("it actually happened!");
        return null;
    };
    MainController.prototype.updateButtons = function () {
        if (this.iterationIndex == 0 && this.frameIndex == 0)
            this.HTMLHandler.hidePreviousButton();
        else
            this.HTMLHandler.showPreviousButton();
        if (this.listInOrder == undefined)
            return;
        if (this.iterationIndex == this.listInOrder.length - 1 &&
            this.frameIndex == this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray.length)
            this.HTMLHandler.hideNextButton();
        else
            this.HTMLHandler.showNextButton();
        if (this.console.textarea.style.color == 'red')
            this.HTMLHandler.showEditButton();
    };
    return MainController;
}());
exports.MainController = MainController;
