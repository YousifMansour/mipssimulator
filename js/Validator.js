"use strict";
exports.__esModule = true;
var Validator = (function () {
    function Validator(typeObjectArray, inputHandler, _console) {
        this._validRegisters = ["$zero", "$at", "$v0", "$v1", "$a0",
            "$a1", "$a2", "$a3", "$t0", "$t1", "$t2",
            "$t3", "$t4", "$t5", "$t6", "$t7",
            "$s0", "$s1", "$s2", "$s3", "$s4",
            "$s5", "$s6", "$s7", "$t8", "$t9",
            "$k0", "$k1", "$gp", "$sp", "$fp",
            "$ra"];
        this.typeObjectArray = typeObjectArray;
        this._inputHandler = inputHandler;
        this.console = _console;
        console.log("Validator constructed");
    }
    Validator.prototype.isItAllValid = function () {
        if (!this.validateText())
            return false;
        else if (!this.validateData())
            return false;
        else {
            this.console.putMessege(".data and .text are all valid.");
            return true;
        }
    };
    Validator.prototype.validateData = function () {
        var dataList = this._inputHandler.getDataList();
        if (dataList == undefined)
            return true;
        var temp = this._inputHandler.getDataList();
        for (var i = 0; i < temp.length; i++) {
            if (!this.validDataLine(temp[i])) {
                return false;
            }
        }
        return true;
    };
    Validator.prototype.validDataLine = function (dataLine) {
        if (dataLine.length <= 2)
            return false;
        else {
            if (dataLine[0].length == 1)
                return false;
            if (!this.isValidDataString(dataLine[0]))
                return false;
            if (dataLine[0].charAt(dataLine[0].length) == ':') {
                return false;
            }
            if (dataLine[1] != ".byte" && dataLine[1] != ".word") {
                this.console.putError("Type not supported in this implementation. Or its a worng type.\n" + dataLine[1]);
                return false;
            }
        }
        for (var i = 2; i < dataLine.length; i++) {
            if (isNaN(Number(dataLine[i]))) {
                this.console.putError("Arguments must be numbers for this type \n" + dataLine[i].toString());
                return false;
            }
        }
        return true;
    };
    Validator.prototype.isValidDataString = function (string) {
        for (var i = 0; i < string.length - 1; i++) {
            if (string.charAt(i) == ',' || string.charAt(i) == ':') {
                this.console.putError("Not valid string\n" + string);
                return false;
            }
        }
        return true;
    };
    Validator.prototype.isValidDotText = function (string) {
        return this.isValidDataString(string);
    };
    Validator.prototype.isValidLabel = function (label) {
        if ((label.charAt(label.length - 1) == ':' && label.length > 1))
            return true;
        else {
            return false;
        }
    };
    Validator.prototype.validateDotText = function () {
        var lines = this._inputHandler.allLines();
        var foundText = false;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i][0] == ".text")
                foundText = true;
        }
        if (!foundText)
            this.console.putError("There is no .text");
        return foundText;
    };
    Validator.prototype.validateText = function () {
        if (!this.validateDotText())
            return false;
        var instrustionList = this._inputHandler.getInstructionsList(false);
        var instructionsAndArguments = this._inputHandler.getInstructionsAndArguments(false);
        for (var i = 0; i < instrustionList.length; i++) {
            if (!this.isValidInstrucion(instrustionList[i])) {
                this.console.putError(instrustionList[i] + " is not an instruction.");
                return false;
            }
            else {
                if (instrustionList[i] == "sw" || instrustionList[i] == "lw"
                    || instrustionList[i] == "sb" || instrustionList[i] == "lb") {
                    if (this._inputHandler.getDataList() == undefined) {
                        this.console.putError("There is no .data");
                        return false;
                    }
                    else {
                        var foundArray = false;
                        var secondString = instructionsAndArguments[i][2];
                        var endIndex = secondString.indexOf('(');
                        var arrayName = "";
                        for (var l = 0; l < endIndex; l++) {
                            arrayName += secondString.charAt(l);
                        }
                        arrayName += ":";
                        var arrayOfData = this._inputHandler.getDataList();
                        for (var l = 0; l < arrayOfData.length; l++) {
                            for (var m = 0; m < arrayOfData[l].length; m++) {
                                if (arrayOfData[l][m] == arrayName)
                                    foundArray = true;
                            }
                        }
                        if (!foundArray) {
                            this.console.putError("The array " + arrayName.substring(0, arrayName.length - 1) + " was not found.");
                            return false;
                        }
                    }
                }
                if (!this.isValidDotText(instrustionList[i]))
                    return false;
            }
        }
        for (var i = 0; i < instructionsAndArguments.length; i++) {
            if (!this.hasValidArguments(instructionsAndArguments[i])) {
                return false;
            }
        }
        return true;
    };
    Validator.prototype.isValidInstrucion = function (instruction) {
        for (var i = 0; i < this.typeObjectArray.length; i++) {
            if (this.typeObjectArray[i].isThisType(instruction))
                return true;
        }
    };
    Validator.prototype.isValidRegister = function (register) {
        for (var i = 0; i < this._validRegisters.length; i++) {
            if (this._validRegisters[i] == register)
                return true;
        }
        this.console.putError(register + " is invalid.");
        return false;
    };
    Validator.prototype.validRegisters = function (registerArray) {
        for (var i = 0; i < registerArray.length; i++) {
            if (!this.isValidRegister(registerArray[i])) {
                if (!(i == registerArray.length - 1 && !isNaN(Number(registerArray[i])))) {
                    return false;
                }
            }
        }
        return true;
    };
    Validator.prototype.hasValidArguments = function (instructionAndArguments) {
        if (instructionAndArguments.length == 1) {
            if (instructionAndArguments[0].slice(-1)[0] != ":")
                return false;
            else
                return true;
        }
        if (this.getTypeObjecet(instructionAndArguments[0]).type == "sw" || this.getTypeObjecet(instructionAndArguments[0]).type == "lw") {
            if (instructionAndArguments.length != 3) {
                this.console.putError("Number of arguments is wrong for this type of instruction. \n" + instructionAndArguments[0] + " needs 3 arguments.");
                return false;
            }
            else
                return true;
        }
        ;
        if (this.getTypeObjecet(instructionAndArguments[0]).type == "Itype") {
            var temp = instructionAndArguments.slice(-1)[0];
            if (isNaN(Number(temp))) {
                this.console.putError("Immediate value needed for this instruction.\n" + instructionAndArguments.toString());
                return false;
            }
        }
        ;
        if (this.getTypeObjecet(instructionAndArguments[0]).type == "Rtype") {
            var temp = instructionAndArguments.slice(-1)[0];
            if (!isNaN(Number(temp))) {
                this.console.putError("This instruction only takes registers as arguments..\n" + instructionAndArguments.toString());
                return false;
            }
        }
        if (instructionAndArguments[0] == "j" || instructionAndArguments[0] == "beq" || instructionAndArguments[0] == "bne") {
            return true;
        }
        return this.validRegisters(instructionAndArguments.slice(1));
    };
    Validator.prototype.getTypeObjecet = function (instruction) {
        for (var i = 0; i < this.typeObjectArray.length; i++) {
            if (this.typeObjectArray[i].isThisType(instruction))
                return this.typeObjectArray[i];
        }
        return null;
    };
    return Validator;
}());
exports.Validator = Validator;
