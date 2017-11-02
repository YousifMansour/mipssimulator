import { TypeObject } from './TypeObject';
import { Memory } from './Memory';

export class MIPS {

    validRegisters: string[] = ["$zero", "$at", "$v0", "$v1", "$a0",
        "$a1", "$a2", "$a3", "$t0", "$t1", "$t2",
        "$t3", "$t4", "$t5", "$t6", "$t7",
        "$s0", "$s1", "$s2", "$s3", "$s4",
        "$s5", "$s6", "$s7", "$t8", "$t9",
        "$k0", "$k1", "$gp", "$sp", "$fp",
        "$ra"];

    registers: Array<number>;
    typeObjectArray: TypeObject[];
    memory: Memory;

    defaultRegistersColor: string = "white";
    highlightColor: string = "cyan";

    registerToHighlight: string;

    constructor(typeObjectArray: TypeObject[]) {
        this.typeObjectArray = typeObjectArray;

        this.memory = new Memory();

        this.registers = new Array<number>();
        for (var i = 0; i < 32; i++) {

            this.registers[i] = 0;
            // this.registers[i] = Math.floor((Math.random() * 10) + 1);;
        }

        this.registerToHighlight = "";

        this.updateRegisters();
        // creates the registers and memory array

        console.log("MIPS class constructed. With registers and everything..");
    }

    setDefaultRegistersColor(defaultRegistersColor: string) {
        this.defaultRegistersColor = defaultRegistersColor;
    }

    setHighLightColor(color: string) {
        this.highlightColor = color;
    }

    reset() {

        for (var i = 0; i < 32; i++) {
            this.registers[i] = 0;
            // this.registers[i] = Math.floor((Math.random() * 10) + 1);;
        }

        this.memory = new Memory();

        this.registerToHighlight = "";

        this.updateRegisters();

        (<HTMLTextAreaElement>document.getElementById("instructionAndArguments")).value = "";

        console.log("!!!MIPS reset!!!");

    }

    loadMemory(dataList: string[][]) {
        if (dataList == undefined) return;
        for (var i = 0; i < dataList.length; i++) {
            var araryName = dataList[i][0].slice(0, -1);
            var type = dataList[i][1];

            var values = dataList[i].slice(2);
            var valuesAsNum: number[] = new Array<number>();
            for (var j = 0; j < values.length; j++) {
                valuesAsNum[j] = Number(values[j]);
            }

            this.memory.addToMemory(araryName, type, valuesAsNum);

        }
        console.log(this.memory.bytesArray.toString());
        console.log(this.memory.dictionary.toString());
    }

    run(instructionAndArguments: string[]) {
        // gets the type of isntruciton and calling the coresponding run function.
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
        // for (var i = 0; i < this.registers.length; i++) {
        //     console.log(this.validRegisters[i] + " = " + this.registers[i] + "\n");
        // }

        console.log("\nMEMORY \n" + this.memory.bytesArray.toString());
        (<HTMLTextAreaElement>document.getElementById("instructionAndArguments")).value = instructionAndArguments[0].replace(/,/g, " ") + " " + instructionAndArguments.slice(1).toString();
    }

    private getRegsiterIndex(register: string): number {

        // this will return the index of the regiter in the array.
        return this.validRegisters.indexOf(register);
    }

    runBeq(beqAndArguments: string[]): boolean {
        return (this.registers[this.getRegsiterIndex(beqAndArguments[1])]) == (this.registers[this.getRegsiterIndex(beqAndArguments[2])]);
    }

    runBne(beqAndArguments: string[]): boolean {
        return (this.registers[this.getRegsiterIndex(beqAndArguments[1])]) != (this.registers[this.getRegsiterIndex(beqAndArguments[2])]);
    }

    runRtype(instructionAndArguments: string[]) {
        // runs and updates registers


        var instruction: string = instructionAndArguments[0];
        var argumentsOfInstruction: string[] = instructionAndArguments.slice(1);

        var arg2 = this.registers[this.getRegsiterIndex(argumentsOfInstruction[1])];
        var arg3 = this.registers[this.getRegsiterIndex(argumentsOfInstruction[2])];

        switch (instruction) {
            case 'add':
            case 'addu': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 + arg3;
                // do the add stff

                this.registerToHighlight = argumentsOfInstruction[0];

                console.log("doing add");
                // arguments are assumed to be corrected
                break;
            }

            case 'sub':
            case 'subu': {
                // do the sub stuff

                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 - arg3;
                // do the add stff

                this.registerToHighlight = argumentsOfInstruction[0];

                console.log("doing sub");
                break;
            }

            case 'and': {
                // do the and stuff

                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 & arg3;

                this.registerToHighlight = argumentsOfInstruction[0];

                // convert argument 2 to binary
                // convery argument 3 to binary
                // add arg 2 and 3
                // convert result to decimal and store in arg 1

                console.log("doing and");
                break;
            }

            case 'or': {
                // do the or stuff

                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 | arg3;

                this.registerToHighlight = argumentsOfInstruction[0];

                console.log("doing or");
                break;
            }

            case 'slt':
            case 'sltu': {
                // do the sltu stuff

                if (arg2 < arg3)
                    this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 1;
                else this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 0;

                this.registerToHighlight = argumentsOfInstruction[0];

                console.log("doing slt");
                break;
            }

        }

        this.updateRegisters();
    }

    runSW(instructionAndArguments: string[]) {

        var instruction: string = instructionAndArguments[0];
        var argumentsOfInstruction: string[] = instructionAndArguments.slice(1);

        switch (instruction) {
            case 'sb': {

                var register: string = argumentsOfInstruction[0]; // $t1
                var valueByte = this.registers[this.getRegsiterIndex(register)];
                var secondString = argumentsOfInstruction[1];

                var endIndex = secondString.indexOf('(');

                var arrayName: string = "";

                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }

                var registerForIndex: string = "";

                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }

                var index = this.registers[this.getRegsiterIndex(registerForIndex)];

                this.memory.storeByte(arrayName, index, valueByte);
                this.registerToHighlight = "";
                break;
            }

            case 'sw': {
                var register: string = argumentsOfInstruction[0];
                var valueByte = this.registers[this.getRegsiterIndex(register)];
                var secondString = argumentsOfInstruction[1];

                var endIndex = secondString.indexOf('(');

                var arrayName: string = "";

                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }

                var registerForIndex: string = "";

                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }

                var index = this.registers[this.getRegsiterIndex(registerForIndex)];

                this.memory.storeWord(arrayName, index, valueByte);

                this.registerToHighlight = "";
            }
        }

        this.updateRegisters();

        // console.log("Memory Constructed. It is " + this.memory.bytesArray.toString() + " number of bytes = " + this.memory.bytesArray.length);
    }

    runLW(instructionAndArguments: string[]) {

        var instruction: string = instructionAndArguments[0];
        var argumentsOfInstruction: string[] = instructionAndArguments.slice(1);

        switch (instruction) {
            case 'lb': {

                var register: string = argumentsOfInstruction[0];

                var secondString = argumentsOfInstruction[1];

                // alert("secondString " + secondString);

                var endIndex = secondString.indexOf('(');

                var arrayName: string = "";

                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }

                var registerForIndex: string = "";

                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }

                var index: number = this.registers[this.getRegsiterIndex(registerForIndex)];

                // alert("index = " + index + " regiter was given as " + register);

                var hexString = this.memory.loadByte(arrayName, index);

                var number: number = parseInt(hexString, 16);

                // alert("numebr to add is " + number);

                // for(var i =0; i<)

                this.updateThisRegister(register, number);

                this.registerToHighlight = register;

                break;

                // this.registers[(this.getRegsiterIndex(register))] = 99;
            }

            case 'lw': {

                var register: string = argumentsOfInstruction[0];

                var secondString = argumentsOfInstruction[1];

                // alert("secondString " + secondString);

                var endIndex = secondString.indexOf('(');

                var arrayName: string = "";

                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }

                var registerForIndex: string = "";

                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }

                var index: number = this.registers[this.getRegsiterIndex(registerForIndex)];

                // alert("index = " + index + " regiter was given as " + register);

                this.registers[this.getRegsiterIndex(register)] = parseInt(this.memory.loadWord(arrayName, index), 16);

                // this.registers[this.getRegsiterIndex(register)] = parseInthis.memory.loadWord(arrayName, index); // stays hex

                this.registerToHighlight = register;
                break;
            }
        }

        // console.log("Memory Constructed. It is " + this.memory.bytesArray.toString() + " number of bytes = " + this.memory.bytesArray.length);
        this.updateRegisters();
    }

    private updateThisRegister(register: string, value: number) {
        var index = this.getRegsiterIndex(register);
        this.registers[index] = value;

        // alert(this.registers[index]);
    }

    runIType(instructionAndArguments: string[]) {
        // runs and updates registers

        var instruction: string = instructionAndArguments[0];
        var argumentsOfInstruction: string[] = instructionAndArguments.slice(1);

        var arg2 = this.registers[this.getRegsiterIndex(argumentsOfInstruction[1])];

        var arg3: number = Number(argumentsOfInstruction[2]);

        switch (instruction) {
            case 'addi':
            case 'addiu': {

                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 + arg3;
                // do the add stff

                this.registerToHighlight = argumentsOfInstruction[0];

                console.log("doing addi");
                // arguments are assumed to be corrected
                break;
            }

            case 'andi': {
                // do the and stuff

                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 & arg3;

                this.registerToHighlight = argumentsOfInstruction[0];

                // convert argument 2 to binary
                // convery argument 3 to binary
                // add arg 2 and 3
                // convert result to decimal and store in arg 1

                console.log("doing andi");
                break;
            }

            case 'ori': {
                // do the or stuff

                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 | arg3;

                this.registerToHighlight = argumentsOfInstruction[0];

                console.log("doing ori");
                break;
            }

            case 'slti':
            case 'sltiu': {
                // do the sltu stuff

                if (arg2 < arg3)
                    this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 1;
                else this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 0;

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

    }

    highLightNonZero() {
        // this is for run all because it wasnt wokring with the time based running of instructions.
        for (var i = 0; i < this.registers.length; i++) {
            document.getElementById(this.validRegisters[i]).style.color = 'white';

            if (this.registers[i] != 0) {
                document.getElementById(this.validRegisters[i]).style.color = this.highlightColor;
                document.getElementById(this.validRegisters[i] + "label").style.color = this.highlightColor;
            }
        }
    }

    highLightRegister() {
        for (var i = 0; i < this.registers.length; i++) {
            document.getElementById(this.validRegisters[i]).style.color = this.defaultRegistersColor;

            document.getElementById(this.validRegisters[i] + "label").style.color = this.defaultRegistersColor;
        }

        if (this.registerToHighlight == "") return;
        document.getElementById(this.registerToHighlight).style.color = this.highlightColor;


        document.getElementById(this.registerToHighlight + "label").style.color = this.highlightColor;
    }

    updateRegisters() {

        this.highLightRegister();

        (<HTMLTableRowElement>document.getElementById("$zero")).innerHTML = "" + this.registers[this.getRegsiterIndex("$zero")];
        (<HTMLTableRowElement>document.getElementById("$at")).innerHTML = "" + this.registers[this.getRegsiterIndex("$at")];
        (<HTMLTableRowElement>document.getElementById("$v0")).innerHTML = "" + this.registers[this.getRegsiterIndex("$v0")];
        (<HTMLTableRowElement>document.getElementById("$v1")).innerHTML = "" + this.registers[this.getRegsiterIndex("$v1")];
        (<HTMLTableRowElement>document.getElementById("$a0")).innerHTML = "" + this.registers[this.getRegsiterIndex("$a0")];
        (<HTMLTableRowElement>document.getElementById("$a1")).innerHTML = "" + this.registers[this.getRegsiterIndex("$a1")];
        (<HTMLTableRowElement>document.getElementById("$a2")).innerHTML = "" + this.registers[this.getRegsiterIndex("$a2")];
        (<HTMLTableRowElement>document.getElementById("$a3")).innerHTML = "" + this.registers[this.getRegsiterIndex("$a3")];
        (<HTMLTableRowElement>document.getElementById("$t0")).innerHTML = "" + this.registers[this.getRegsiterIndex("$t0")];
        (<HTMLTableRowElement>document.getElementById("$t1")).innerHTML = "" + this.registers[this.getRegsiterIndex("$t1")];
        (<HTMLTableRowElement>document.getElementById("$t2")).innerHTML = "" + this.registers[this.getRegsiterIndex("$t2")];
        (<HTMLTableRowElement>document.getElementById("$t3")).innerHTML = "" + this.registers[this.getRegsiterIndex("$t3")];
        (<HTMLTableRowElement>document.getElementById("$t4")).innerHTML = "" + this.registers[this.getRegsiterIndex("$t4")];
        (<HTMLTableRowElement>document.getElementById("$t5")).innerHTML = "" + this.registers[this.getRegsiterIndex("$t5")];
        (<HTMLTableRowElement>document.getElementById("$t6")).innerHTML = "" + this.registers[this.getRegsiterIndex("$t6")];
        (<HTMLTableRowElement>document.getElementById("$t7")).innerHTML = "" + this.registers[this.getRegsiterIndex("$t7")];
        (<HTMLTableRowElement>document.getElementById("$s0")).innerHTML = "" + this.registers[this.getRegsiterIndex("$s0")];
        (<HTMLTableRowElement>document.getElementById("$s1")).innerHTML = "" + this.registers[this.getRegsiterIndex("$s1")];
        (<HTMLTableRowElement>document.getElementById("$s2")).innerHTML = "" + this.registers[this.getRegsiterIndex("$s2")];
        (<HTMLTableRowElement>document.getElementById("$s3")).innerHTML = "" + this.registers[this.getRegsiterIndex("$s3")];
        (<HTMLTableRowElement>document.getElementById("$s4")).innerHTML = "" + this.registers[this.getRegsiterIndex("$s4")];
        (<HTMLTableRowElement>document.getElementById("$s5")).innerHTML = "" + this.registers[this.getRegsiterIndex("$s5")];
        (<HTMLTableRowElement>document.getElementById("$s6")).innerHTML = "" + this.registers[this.getRegsiterIndex("$s6")];
        (<HTMLTableRowElement>document.getElementById("$s7")).innerHTML = "" + this.registers[this.getRegsiterIndex("$s7")];
        (<HTMLTableRowElement>document.getElementById("$t8")).innerHTML = "" + this.registers[this.getRegsiterIndex("$t8")];
        (<HTMLTableRowElement>document.getElementById("$t9")).innerHTML = "" + this.registers[this.getRegsiterIndex("$t9")];
        (<HTMLTableRowElement>document.getElementById("$k0")).innerHTML = "" + this.registers[this.getRegsiterIndex("$k0")];
        (<HTMLTableRowElement>document.getElementById("$k1")).innerHTML = "" + this.registers[this.getRegsiterIndex("$k1")];
        (<HTMLTableRowElement>document.getElementById("$gp")).innerHTML = "" + this.registers[this.getRegsiterIndex("$gp")];
        (<HTMLTableRowElement>document.getElementById("$sp")).innerHTML = "" + this.registers[this.getRegsiterIndex("$sp")];
        (<HTMLTableRowElement>document.getElementById("$fp")).innerHTML = "" + this.registers[this.getRegsiterIndex("$fp")];
        (<HTMLTableRowElement>document.getElementById("$ra")).innerHTML = "" + this.registers[this.getRegsiterIndex("$ra")];



        // writes to registersTable the current state of all registers.
    }

}
