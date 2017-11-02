import { TypeObject } from './TypeObject';
import { InputHandler } from './InputHandler';
import { Console } from './Console';

export class Validator {

    // _variableName means its private

    private _inputHandler: InputHandler;
    console: Console;

    private _validRegisters: string[] = ["$zero", "$at", "$v0", "$v1", "$a0",
        "$a1", "$a2", "$a3", "$t0", "$t1", "$t2",
        "$t3", "$t4", "$t5", "$t6", "$t7",
        "$s0", "$s1", "$s2", "$s3", "$s4",
        "$s5", "$s6", "$s7", "$t8", "$t9",
        "$k0", "$k1", "$gp", "$sp", "$fp",
        "$ra"];

    typeObjectArray: TypeObject[];

    constructor(typeObjectArray: TypeObject[], inputHandler: InputHandler, _console: Console) {
        this.typeObjectArray = typeObjectArray;
        this._inputHandler = inputHandler;
        this.console = _console;
        console.log("Validator constructed");
    }

    isItAllValid(): boolean {

        if (!this.validateText()) return false;

        else if (!this.validateData()) return false;

        else {
            this.console.putMessege(".data and .text are all valid.");
            return true;
        }
    }

    validateData(): boolean {

        var dataList: string[][] = this._inputHandler.getDataList();

        if (dataList == undefined) return true;

        var temp: string[][] = this._inputHandler.getDataList();

        for (var i = 0; i < temp.length; i++) {
            if (!this.validDataLine(temp[i])) {
                // this.console.putError("This line is not valid. \n" + temp[i]);
                return false;
            }
        }

        return true;
    }

    validDataLine(dataLine: string[]): boolean {

        if (dataLine.length <= 2) return false;
        else {
            if (dataLine[0].length == 1) return false;

            if (!this.isValidDataString(dataLine[0])) return false;

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
    }

    private isValidDataString(string: string) {
        for (var i = 0; i < string.length - 1; i++) {
            if (string.charAt(i) == ',' || string.charAt(i) == ':') {
                this.console.putError("Not valid string\n" + string);
                return false;
            }
        }

        return true;
    }

    private isValidDotText(string: string) {
        return this.isValidDataString(string);
        // dont tell anyone..
    }

    isValidLabel(label: string) {
        if ((label.charAt(label.length - 1) == ':' && label.length > 1)) return true;
        else {
            // this.console.putError("Invalid label\n" + label);
            return false;
        }
    }

    validateDotText(): boolean {
        var lines: string[][] = this._inputHandler.allLines();
        var foundText = false;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i][0] == ".text") foundText = true;
        }

        if (!foundText) this.console.putError("There is no .text");

        return foundText;
    }

    validateText(): boolean {

        if (!this.validateDotText()) return false;

        var instrustionList: string[] = this._inputHandler.getInstructionsList(false);

        var instructionsAndArguments: string[][] = this._inputHandler.getInstructionsAndArguments(false);

        for (var i = 0; i < instrustionList.length; i++) {

            if (!this.isValidInstrucion(instrustionList[i])) {
                this.console.putError(instrustionList[i] + " is not an instruction.");
                return false;
            } else {

                if (instrustionList[i] == "sw" || instrustionList[i] == "lw"
                    || instrustionList[i] == "sb" || instrustionList[i] == "lb") {
                    if (this._inputHandler.getDataList() == undefined) {
                        this.console.putError("There is no .data");
                        return false;
                    }
                    else {

                        var foundArray: boolean = false;

                        var secondString = instructionsAndArguments[i][2];

                        var endIndex = secondString.indexOf('(');

                        var arrayName: string = "";

                        for (var l = 0; l < endIndex; l++) {
                            arrayName += secondString.charAt(l);
                        }

                        arrayName += ":";

                        var arrayOfData: string[][] = this._inputHandler.getDataList();
                        for (var l = 0; l < arrayOfData.length; l++) {
                            for (var m = 0; m < arrayOfData[l].length; m++) {
                                if (arrayOfData[l][m] == arrayName) foundArray = true;
                            }
                        }

                        if (!foundArray) {
                            this.console.putError("The array " + arrayName.substring(0, arrayName.length - 1) + " was not found.");
                            return false;
                        }
                    }
                    // need to search for array argument withotu the register
                }

                if (!this.isValidDotText(instrustionList[i])) return false;
            }
        }

        for (var i = 0; i < instructionsAndArguments.length; i++) {

            if (!this.hasValidArguments(instructionsAndArguments[i])) {
                return false;
            }
        }

        return true;
    }


    isValidInstrucion(instruction: string): boolean {
        for (var i = 0; i < this.typeObjectArray.length; i++) {
            if (this.typeObjectArray[i].isThisType(instruction)) return true;
        }
    }

    private isValidRegister(register: string): boolean {

        for (var i = 0; i < this._validRegisters.length; i++) {
            if (this._validRegisters[i] == register) return true;
        }
        this.console.putError(register + " is invalid.");
        return false;

    }

    private validRegisters(registerArray: string[]): boolean {

        // you need to check for the registers bro

        for (var i = 0; i < registerArray.length; i++) {
            if (!this.isValidRegister(registerArray[i])) {
                if (!(i == registerArray.length - 1 && !isNaN(Number(registerArray[i])))) {
                    return false;
                }
            }
        }

        return true;
    }

    hasValidArguments(instructionAndArguments: string[]): boolean {

        if (instructionAndArguments.length == 1) {
            if (instructionAndArguments[0].slice(-1)[0] != ":") return false;
            else return true;
        }

        // if (instructionAndArguments.length <= 2 && ) return false;

        if (this.getTypeObjecet(instructionAndArguments[0]).type == "sw" || this.getTypeObjecet(instructionAndArguments[0]).type == "lw") {
            if (instructionAndArguments.length != 3) {
                this.console.putError("Number of arguments is wrong for this type of instruction. \n" + instructionAndArguments[0] + " needs 3 arguments.");
                return false;
            }
            else return true;

        };

        if (this.getTypeObjecet(instructionAndArguments[0]).type == "Itype") {
            var temp = instructionAndArguments.slice(-1)[0];

            if (isNaN(Number(temp))) {
                this.console.putError("Immediate value needed for this instruction.\n" + instructionAndArguments.toString());
                return false; 
            }
        };

        if (this.getTypeObjecet(instructionAndArguments[0]).type == "Rtype") {
            var temp = instructionAndArguments.slice(-1)[0];

            if (!isNaN(Number(temp))) {
                this.console.putError("This instruction only takes registers as arguments..\n" + instructionAndArguments.toString());
                return false;
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (instructionAndArguments[0] == "j" || instructionAndArguments[0] == "beq" || instructionAndArguments[0] == "bne") {
            return true;
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        return this.validRegisters(instructionAndArguments.slice(1));
    }

    private getTypeObjecet(instruction: string): TypeObject {
        for (var i = 0; i < this.typeObjectArray.length; i++) {
            if (this.typeObjectArray[i].isThisType(instruction)) return this.typeObjectArray[i];
        }

        // should never happen
        return null;
    }
}
