import { TypeObject } from './TypeObject';
import { MIPS } from './MIPS';
import { Validator } from './Validator';

export class InputHandler {

    typeObjectsArray: TypeObject[];
    mipsObject: MIPS;
    validator: Validator;

    constructor(typeObjectArray: TypeObject[], mipsObject: MIPS) {
        this.typeObjectsArray = typeObjectArray;
        this.mipsObject = mipsObject;

        console.log("InputHandler constructed, it has typeObjectsArray (and they work) and validator and mips and everything.");
    }

    initValidator(validator: Validator) {
        this.validator = validator;
    }

    instructionsAndArgumentsInOrder(): string[][] {
        var inputByLines: string[] = this.getInstructionsList(true)

        var inputInstructionAndArgumentsList: string[][] = this.getInstructionsAndArguments(true);

        var inOrder: string[][] = new Array<Array<string>>();
        var inOrderCount: number = 0;
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

                    // case 'li': {
                    //
                    // }
                    case 'beq': {
                        var willBranch: boolean = this.mipsObject.runBeq(inputInstructionAndArgumentsList[currentIndex]);
                        if (willBranch) {
                            var labelToBranchTo = inputInstructionAndArgumentsList[currentIndex][3];
                            var branchIndex = inputByLines.indexOf(labelToBranchTo + ':');

                            if (branchIndex == -1) {
                                this.validator.console.putError(labelToBranchTo + " not found");
                                return undefined;
                            }

                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex = branchIndex + 1;

                        } else {
                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex++;
                        }
                        break;
                    }

                    case 'bne': {
                        var willBranch: boolean = this.mipsObject.runBne(inputInstructionAndArgumentsList[currentIndex]);
                        if (willBranch) {
                            var labelToBranchTo = inputInstructionAndArgumentsList[currentIndex][3];
                            var branchIndex = inputByLines.indexOf(labelToBranchTo + ':');

                            if (branchIndex == -1) {
                                this.validator.console.putError(labelToBranchTo + " not found");
                                return undefined;
                            }

                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex = branchIndex + 1;

                        } else {
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

        // alert(inOrder.toString());

        return inOrder;
    }

    getDataList(): string[][] {

        var tempArray = (<HTMLTextAreaElement>document.getElementById("textInput")).value.match(/[^\r\n]+/g);
        // splits by new line

        if (this.getDotDataLineIndex(tempArray) == -1) return undefined;

        var startingIndex: number = this.getDotDataLineIndex(tempArray) + 1;


        var endingIndex: number = this.getDotTextLineIndex(tempArray);

        if (endingIndex < startingIndex) endingIndex = tempArray.length;
        if (endingIndex == startingIndex) {
            // wtf
            return undefined;
        }

        var arrayToReturn = new Array<Array<string>>();

        var count = 0;

        for (var i = startingIndex; i < endingIndex; i++) {
            // splitting things in the line
            arrayToReturn[count] = tempArray[i].split(/\s+/g);
            count++;
        }

        for (var i = 0; i < arrayToReturn.length; i++) {
            for (var j = 0; j < arrayToReturn[i].length; j++) {
                if (i == 0 && j == 0) continue;
                arrayToReturn[i][j] = arrayToReturn[i][j].replace(/,/g, "");
            }
        }

        return arrayToReturn;
    }

    getInstructionsList(withLabels: boolean): string[] {

        // returns all the tokens in a one dimentional array. doesnt care for whitespaces they will be valid typeobject insturctions

        var tempArray = (<HTMLTextAreaElement>document.getElementById("textInput")).value.match(/[^\r\n]+/g);
        // splits by new line

        var startingIndex: number = this.getDotTextLineIndex(tempArray) + 1;
        var endingIndex: number = 0;

        if (this.getDotDataLineIndex(tempArray) < startingIndex) endingIndex = tempArray.length;
        else endingIndex = this.getDotDataLineIndex(tempArray);

        var arrayToReturn = new Array<string>();

        var counter = 0;

        for (var i = startingIndex; i < endingIndex; i++) {

            if (!withLabels) {
                if ((tempArray[i].split(/\s+/g))[0].charAt(tempArray[i].split(/\s+/g)[0].length - 1) == ':') continue;
            }
            //console.log(secondTempArray[0]);
            arrayToReturn[counter] = tempArray[i].split(/\s+/g)[0]; // only instruction and we're sure its not a label
            counter++;
        }

        return arrayToReturn;
    }

    getInstructionsAndArguments(withLabels: boolean): string[][] {

        var tempArray = (<HTMLTextAreaElement>document.getElementById("textInput")).value.match(/[^\r\n]+/g);
        // split by line.

        var startingIndex: number = this.getDotTextLineIndex(tempArray) + 1;
        var endingIndex: number = 0;

        if (this.getDotDataLineIndex(tempArray) < startingIndex) endingIndex = tempArray.length;
        else endingIndex = this.getDotDataLineIndex(tempArray);

        if (endingIndex == startingIndex) {
            // wtf
            return undefined;
        }

        var arrayToReturn = new Array<Array<string>>();

        var count = 0;

        for (var i = startingIndex; i < endingIndex; i++) {

            if (!withLabels) {
                if ((tempArray[i].split(/\s+/g))[0].charAt(tempArray[i].split(/\s+/g)[0].length - 1) == ':') continue;
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
    }

    allLines(): string[][] {
        var allLines = (<HTMLTextAreaElement>document.getElementById("textInput")).value.match(/[^\r\n]+/g);
        var arrayOfLineAfterSplitting = new Array<Array<string>>()

        for (var i = 0; i < allLines.length; i++) {
            arrayOfLineAfterSplitting[i] = allLines[i].split(/\s+/g);
        }

        return arrayOfLineAfterSplitting;
    }

    private getDotTextLineIndex(array: string[]): number {

        var index: number = -1;

        for (var i = 0; i < array.length; i++) {

            if (array[i].split(/\s+/g)[0] == ".text") {
                index = i;
            }
        }

        // if not found complain

        return index;

    }


    private getDotDataLineIndex(array: string[]): number {

        var index: number = -1;

        for (var i = 0; i < array.length; i++) {

            if (array[i].split(/\s+/g)[0] == ".data") {
                index = i;
                break;
            }
        }

        // if not found its ok

        return index;

    }
}
