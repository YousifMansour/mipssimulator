"use strict";
exports.__esModule = true;
var Memory_1 = require("./Memory");
var MIPS = (function () {
    function MIPS(typeObjectArray) {
        this.validRegisters = ["$zero", "$at", "$v0", "$v1", "$a0",
            "$a1", "$a2", "$a3", "$t0", "$t1", "$t2",
            "$t3", "$t4", "$t5", "$t6", "$t7",
            "$s0", "$s1", "$s2", "$s3", "$s4",
            "$s5", "$s6", "$s7", "$t8", "$t9",
            "$k0", "$k1", "$gp", "$sp", "$fp",
            "$ra"];
        this.defaultRegistersColor = "white";
        this.highlightColor = "cyan";
        this.typeObjectArray = typeObjectArray;
        this.memory = new Memory_1.Memory();
        this.registers = new Array();
        for (var i = 0; i < 32; i++) {
            this.registers[i] = 0;
        }
        this.registerToHighlight = "";
        this.updateRegisters();
        console.log("MIPS class constructed. With registers and everything..");
    }
    MIPS.prototype.setDefaultRegistersColor = function (defaultRegistersColor) {
        this.defaultRegistersColor = defaultRegistersColor;
    };
    MIPS.prototype.setHighLightColor = function (color) {
        this.highlightColor = color;
    };
    MIPS.prototype.reset = function () {
        for (var i = 0; i < 32; i++) {
            this.registers[i] = 0;
        }
        this.memory = new Memory_1.Memory();
        this.registerToHighlight = "";
        this.updateRegisters();
        document.getElementById("instructionAndArguments").value = "";
        console.log("!!!MIPS reset!!!");
    };
    MIPS.prototype.loadMemory = function (dataList) {
        if (dataList == undefined)
            return;
        for (var i = 0; i < dataList.length; i++) {
            var araryName = dataList[i][0].slice(0, -1);
            var type = dataList[i][1];
            var values = dataList[i].slice(2);
            var valuesAsNum = new Array();
            for (var j = 0; j < values.length; j++) {
                valuesAsNum[j] = Number(values[j]);
            }
            this.memory.addToMemory(araryName, type, valuesAsNum);
        }
        console.log(this.memory.bytesArray.toString());
        console.log(this.memory.dictionary.toString());
    };
    MIPS.prototype.run = function (instructionAndArguments) {
        var instruction = instructionAndArguments[0];
        var instructionType = "";
        for (var i = 0; i < this.typeObjectArray.length; i++) {
            if (this.typeObjectArray[i].isThisType(instruction)) {
                instructionType = this.typeObjectArray[i].type;
                break;
            }
        }
        switch (instructionType) {
            case "Rtype": {
                this.runRtype(instructionAndArguments);
                this.updateRegisters();
                break;
            }
            case "Itype": {
                this.runIType(instructionAndArguments);
                this.updateRegisters();
                break;
            }
            case "sw": {
                this.runSW(instructionAndArguments);
                this.updateRegisters();
                break;
            }
            case "lw": {
                this.runLW(instructionAndArguments);
                this.updateRegisters();
                break;
            }
        }
        console.clear();
        console.log("\nMEMORY \n" + this.memory.bytesArray.toString());
        document.getElementById("instructionAndArguments").value = instructionAndArguments[0].replace(/,/g, " ") + " " + instructionAndArguments.slice(1).toString();
    };
    MIPS.prototype.getRegsiterIndex = function (register) {
        return this.validRegisters.indexOf(register);
    };
    MIPS.prototype.runBeq = function (beqAndArguments) {
        return (this.registers[this.getRegsiterIndex(beqAndArguments[1])]) == (this.registers[this.getRegsiterIndex(beqAndArguments[2])]);
    };
    MIPS.prototype.runBne = function (beqAndArguments) {
        return (this.registers[this.getRegsiterIndex(beqAndArguments[1])]) != (this.registers[this.getRegsiterIndex(beqAndArguments[2])]);
    };
    MIPS.prototype.runRtype = function (instructionAndArguments) {
        var instruction = instructionAndArguments[0];
        var argumentsOfInstruction = instructionAndArguments.slice(1);
        var arg2 = this.registers[this.getRegsiterIndex(argumentsOfInstruction[1])];
        var arg3 = this.registers[this.getRegsiterIndex(argumentsOfInstruction[2])];
        switch (instruction) {
            case 'add':
            case 'addu': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 + arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing add");
                break;
            }
            case 'sub':
            case 'subu': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 - arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing sub");
                break;
            }
            case 'and': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 & arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing and");
                break;
            }
            case 'or': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 | arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing or");
                break;
            }
            case 'slt':
            case 'sltu': {
                if (arg2 < arg3)
                    this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 1;
                else
                    this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 0;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing slt");
                break;
            }
        }
        this.updateRegisters();
    };
    MIPS.prototype.runSW = function (instructionAndArguments) {
        var instruction = instructionAndArguments[0];
        var argumentsOfInstruction = instructionAndArguments.slice(1);
        switch (instruction) {
            case 'sb': {
                var register = argumentsOfInstruction[0];
                var valueByte = this.registers[this.getRegsiterIndex(register)];
                var secondString = argumentsOfInstruction[1];
                var endIndex = secondString.indexOf('(');
                var arrayName = "";
                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }
                var registerForIndex = "";
                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }
                var index = this.registers[this.getRegsiterIndex(registerForIndex)];
                this.memory.storeByte(arrayName, index, valueByte);
                this.registerToHighlight = "";
                break;
            }
            case 'sw': {
                var register = argumentsOfInstruction[0];
                var valueByte = this.registers[this.getRegsiterIndex(register)];
                var secondString = argumentsOfInstruction[1];
                var endIndex = secondString.indexOf('(');
                var arrayName = "";
                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }
                var registerForIndex = "";
                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }
                var index = this.registers[this.getRegsiterIndex(registerForIndex)];
                this.memory.storeWord(arrayName, index, valueByte);
                this.registerToHighlight = "";
            }
        }
        this.updateRegisters();
    };
    MIPS.prototype.runLW = function (instructionAndArguments) {
        var instruction = instructionAndArguments[0];
        var argumentsOfInstruction = instructionAndArguments.slice(1);
        switch (instruction) {
            case 'lb': {
                var register = argumentsOfInstruction[0];
                var secondString = argumentsOfInstruction[1];
                var endIndex = secondString.indexOf('(');
                var arrayName = "";
                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }
                var registerForIndex = "";
                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }
                var index = this.registers[this.getRegsiterIndex(registerForIndex)];
                var hexString = this.memory.loadByte(arrayName, index);
                var number = parseInt(hexString, 16);
                this.updateThisRegister(register, number);
                this.registerToHighlight = register;
                break;
            }
            case 'lw': {
                var register = argumentsOfInstruction[0];
                var secondString = argumentsOfInstruction[1];
                var endIndex = secondString.indexOf('(');
                var arrayName = "";
                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }
                var registerForIndex = "";
                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }
                var index = this.registers[this.getRegsiterIndex(registerForIndex)];
                this.registers[this.getRegsiterIndex(register)] = parseInt(this.memory.loadWord(arrayName, index), 16);
                this.registerToHighlight = register;
                break;
            }
        }
        this.updateRegisters();
    };
    MIPS.prototype.updateThisRegister = function (register, value) {
        var index = this.getRegsiterIndex(register);
        this.registers[index] = value;
    };
    MIPS.prototype.runIType = function (instructionAndArguments) {
        var instruction = instructionAndArguments[0];
        var argumentsOfInstruction = instructionAndArguments.slice(1);
        var arg2 = this.registers[this.getRegsiterIndex(argumentsOfInstruction[1])];
        var arg3 = Number(argumentsOfInstruction[2]);
        switch (instruction) {
            case 'addi':
            case 'addiu': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 + arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing addi");
                break;
            }
            case 'andi': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 & arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing andi");
                break;
            }
            case 'ori': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 | arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing ori");
                break;
            }
            case 'slti':
            case 'sltiu': {
                if (arg2 < arg3)
                    this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 1;
                else
                    this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 0;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing slti");
                break;
            }
            case 'beq':
            case 'bne':
            case 'j': {
                console.log("doing beq/j. already done so not really doing anything.");
                this.registerToHighlight = "";
                break;
            }
        }
        this.updateRegisters();
    };
    MIPS.prototype.highLightNonZero = function () {
        for (var i = 0; i < this.registers.length; i++) {
            document.getElementById(this.validRegisters[i]).style.color = 'white';
            if (this.registers[i] != 0) {
                document.getElementById(this.validRegisters[i]).style.color = this.highlightColor;
                document.getElementById(this.validRegisters[i] + "label").style.color = this.highlightColor;
            }
        }
    };
    MIPS.prototype.highLightRegister = function () {
        for (var i = 0; i < this.registers.length; i++) {
            document.getElementById(this.validRegisters[i]).style.color = this.defaultRegistersColor;
            document.getElementById(this.validRegisters[i] + "label").style.color = this.defaultRegistersColor;
        }
        if (this.registerToHighlight == "")
            return;
        document.getElementById(this.registerToHighlight).style.color = this.highlightColor;
        document.getElementById(this.registerToHighlight + "label").style.color = this.highlightColor;
    };
    MIPS.prototype.updateRegisters = function () {
        this.highLightRegister();
        document.getElementById("$zero").innerHTML = "" + this.registers[this.getRegsiterIndex("$zero")];
        document.getElementById("$at").innerHTML = "" + this.registers[this.getRegsiterIndex("$at")];
        document.getElementById("$v0").innerHTML = "" + this.registers[this.getRegsiterIndex("$v0")];
        document.getElementById("$v1").innerHTML = "" + this.registers[this.getRegsiterIndex("$v1")];
        document.getElementById("$a0").innerHTML = "" + this.registers[this.getRegsiterIndex("$a0")];
        document.getElementById("$a1").innerHTML = "" + this.registers[this.getRegsiterIndex("$a1")];
        document.getElementById("$a2").innerHTML = "" + this.registers[this.getRegsiterIndex("$a2")];
        document.getElementById("$a3").innerHTML = "" + this.registers[this.getRegsiterIndex("$a3")];
        document.getElementById("$t0").innerHTML = "" + this.registers[this.getRegsiterIndex("$t0")];
        document.getElementById("$t1").innerHTML = "" + this.registers[this.getRegsiterIndex("$t1")];
        document.getElementById("$t2").innerHTML = "" + this.registers[this.getRegsiterIndex("$t2")];
        document.getElementById("$t3").innerHTML = "" + this.registers[this.getRegsiterIndex("$t3")];
        document.getElementById("$t4").innerHTML = "" + this.registers[this.getRegsiterIndex("$t4")];
        document.getElementById("$t5").innerHTML = "" + this.registers[this.getRegsiterIndex("$t5")];
        document.getElementById("$t6").innerHTML = "" + this.registers[this.getRegsiterIndex("$t6")];
        document.getElementById("$t7").innerHTML = "" + this.registers[this.getRegsiterIndex("$t7")];
        document.getElementById("$s0").innerHTML = "" + this.registers[this.getRegsiterIndex("$s0")];
        document.getElementById("$s1").innerHTML = "" + this.registers[this.getRegsiterIndex("$s1")];
        document.getElementById("$s2").innerHTML = "" + this.registers[this.getRegsiterIndex("$s2")];
        document.getElementById("$s3").innerHTML = "" + this.registers[this.getRegsiterIndex("$s3")];
        document.getElementById("$s4").innerHTML = "" + this.registers[this.getRegsiterIndex("$s4")];
        document.getElementById("$s5").innerHTML = "" + this.registers[this.getRegsiterIndex("$s5")];
        document.getElementById("$s6").innerHTML = "" + this.registers[this.getRegsiterIndex("$s6")];
        document.getElementById("$s7").innerHTML = "" + this.registers[this.getRegsiterIndex("$s7")];
        document.getElementById("$t8").innerHTML = "" + this.registers[this.getRegsiterIndex("$t8")];
        document.getElementById("$t9").innerHTML = "" + this.registers[this.getRegsiterIndex("$t9")];
        document.getElementById("$k0").innerHTML = "" + this.registers[this.getRegsiterIndex("$k0")];
        document.getElementById("$k1").innerHTML = "" + this.registers[this.getRegsiterIndex("$k1")];
        document.getElementById("$gp").innerHTML = "" + this.registers[this.getRegsiterIndex("$gp")];
        document.getElementById("$sp").innerHTML = "" + this.registers[this.getRegsiterIndex("$sp")];
        document.getElementById("$fp").innerHTML = "" + this.registers[this.getRegsiterIndex("$fp")];
        document.getElementById("$ra").innerHTML = "" + this.registers[this.getRegsiterIndex("$ra")];
    };
    return MIPS;
}());
exports.MIPS = MIPS;
