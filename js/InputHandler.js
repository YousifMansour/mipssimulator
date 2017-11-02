"use strict";
exports.__esModule = true;
var InputHandler = (function () {
    function InputHandler(typeObjectArray, mipsObject) {
        this.typeObjectsArray = typeObjectArray;
        this.mipsObject = mipsObject;
        console.log("InputHandler constructed, it has typeObjectsArray (and they work) and validator and mips and everything.");
    }
    InputHandler.prototype.initValidator = function (validator) {
        this.validator = validator;
    };
    InputHandler.prototype.instructionsAndArgumentsInOrder = function () {
        var inputByLines = this.getInstructionsList(true);
        var inputInstructionAndArgumentsList = this.getInstructionsAndArguments(true);
        var inOrder = new Array();
        var inOrderCount = 0;
        var currentIndex = 0;
        this.mipsObject.reset();
        this.mipsObject.loadMemory(this.getDataList());
        while (currentIndex != inputByLines.length) {
            var label = inputInstructionAndArgumentsList[currentIndex][0];
            if (this.validator.isValidLabel(label)) {
                currentIndex++;
            }
            else {
                var instruction = inputInstructionAndArgumentsList[currentIndex][0];
                switch (instruction) {
                    case 'beq': {
                        var willBranch = this.mipsObject.runBeq(inputInstructionAndArgumentsList[currentIndex]);
                        if (willBranch) {
                            var labelToBranchTo = inputInstructionAndArgumentsList[currentIndex][3];
                            var branchIndex = inputByLines.indexOf(labelToBranchTo + ':');
                            if (branchIndex == -1) {
                                this.validator.console.putError(labelToBranchTo + " not found");
                                return undefined;
                            }
                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex = branchIndex + 1;
                        }
                        else {
                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex++;
                        }
                        break;
                    }
                    case 'bne': {
                        var willBranch = this.mipsObject.runBne(inputInstructionAndArgumentsList[currentIndex]);
                        if (willBranch) {
                            var labelToBranchTo = inputInstructionAndArgumentsList[currentIndex][3];
                            var branchIndex = inputByLines.indexOf(labelToBranchTo + ':');
                            if (branchIndex == -1) {
                                this.validator.console.putError(labelToBranchTo + " not found");
                                return undefined;
                            }
                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex = branchIndex + 1;
                        }
                        else {
                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex++;
                        }
                        break;
                    }
                    case 'j': {
                        var labelToJumpTo = inputInstructionAndArgumentsList[currentIndex][1];
                        var jumpIndex = inputByLines.indexOf(labelToJumpTo + ':');
                        if (jumpIndex == -1) {
                            this.validator.console.putError(labelToJumpTo + " not found");
                            return undefined;
                        }
                        inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                        currentIndex = jumpIndex + 1;
                        break;
                    }
                    default: {
                        inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                        this.mipsObject.run(inputInstructionAndArgumentsList[currentIndex]);
                        currentIndex++;
                    }
                }
            }
        }
        this.mipsObject.reset();
        this.mipsObject.loadMemory(this.getDataList());
        return inOrder;
    };
    InputHandler.prototype.getDataList = function () {
        var tempArray = document.getElementById("textInput").value.match(/[^\r\n]+/g);
        if (this.getDotDataLineIndex(tempArray) == -1)
            return undefined;
        var startingIndex = this.getDotDataLineIndex(tempArray) + 1;
        var endingIndex = this.getDotTextLineIndex(tempArray);
        if (endingIndex < startingIndex)
            endingIndex = tempArray.length;
        if (endingIndex == startingIndex) {
            return undefined;
        }
        var arrayToReturn = new Array();
        var count = 0;
        for (var i = startingIndex; i < endingIndex; i++) {
            arrayToReturn[count] = tempArray[i].split(/\s+/g);
            count++;
        }
        for (var i = 0; i < arrayToReturn.length; i++) {
            for (var j = 0; j < arrayToReturn[i].length; j++) {
                if (i == 0 && j == 0)
                    continue;
                arrayToReturn[i][j] = arrayToReturn[i][j].replace(/,/g, "");
            }
        }
        return arrayToReturn;
    };
    InputHandler.prototype.getInstructionsList = function (withLabels) {
        var tempArray = document.getElementById("textInput").value.match(/[^\r\n]+/g);
        var startingIndex = this.getDotTextLineIndex(tempArray) + 1;
        var endingIndex = 0;
        if (this.getDotDataLineIndex(tempArray) < startingIndex)
            endingIndex = tempArray.length;
        else
            endingIndex = this.getDotDataLineIndex(tempArray);
        var arrayToReturn = new Array();
        var counter = 0;
        for (var i = startingIndex; i < endingIndex; i++) {
            if (!withLabels) {
                if ((tempArray[i].split(/\s+/g))[0].charAt(tempArray[i].split(/\s+/g)[0].length - 1) == ':')
                    continue;
            }
            arrayToReturn[counter] = tempArray[i].split(/\s+/g)[0];
            counter++;
        }
        return arrayToReturn;
    };
    InputHandler.prototype.getInstructionsAndArguments = function (withLabels) {
        var tempArray = document.getElementById("textInput").value.match(/[^\r\n]+/g);
        var startingIndex = this.getDotTextLineIndex(tempArray) + 1;
        var endingIndex = 0;
        if (this.getDotDataLineIndex(tempArray) < startingIndex)
            endingIndex = tempArray.length;
        else
            endingIndex = this.getDotDataLineIndex(tempArray);
        if (endingIndex == startingIndex) {
            return undefined;
        }
        var arrayToReturn = new Array();
        var count = 0;
        for (var i = startingIndex; i < endingIndex; i++) {
            if (!withLabels) {
                if ((tempArray[i].split(/\s+/g))[0].charAt(tempArray[i].split(/\s+/g)[0].length - 1) == ':')
                    continue;
            }
            arrayToReturn[count] = tempArray[i].split(/\s+/g);
            count++;
        }
        for (var i = 0; i < arrayToReturn.length; i++) {
            for (var j = 0; j < arrayToReturn[i].length; j++) {
                arrayToReturn[i][j] = arrayToReturn[i][j].replace(/,/g, "");
            }
        }
        return arrayToReturn;
    };
    InputHandler.prototype.allLines = function () {
        var allLines = document.getElementById("textInput").value.match(/[^\r\n]+/g);
        var arrayOfLineAfterSplitting = new Array();
        for (var i = 0; i < allLines.length; i++) {
            arrayOfLineAfterSplitting[i] = allLines[i].split(/\s+/g);
        }
        return arrayOfLineAfterSplitting;
    };
    InputHandler.prototype.getDotTextLineIndex = function (array) {
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i].split(/\s+/g)[0] == ".text") {
                index = i;
            }
        }
        return index;
    };
    InputHandler.prototype.getDotDataLineIndex = function (array) {
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i].split(/\s+/g)[0] == ".data") {
                index = i;
                break;
            }
        }
        return index;
    };
    return InputHandler;
}());
exports.InputHandler = InputHandler;
