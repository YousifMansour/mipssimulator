export class TypeObject {

  type: string;
  instructionsArray: string[];
  functionsArray: any[];
  stringALU: string;
  controlSingals: string[];


  constructor(type: string, instructionsArray: string[], functionsArray: any[], stringALU: string, controlSingals: string[]) {
    this.type = type;
    this.instructionsArray = instructionsArray;
    this.functionsArray = functionsArray;
    this.stringALU = stringALU;
    this.controlSingals = controlSingals;
  }

  public isThisType(instruction: string): boolean {
    for (var i = 0; i < this.instructionsArray.length; i++) {
      if (this.instructionsArray[i] == instruction) return true;
    }
    return false;
  }

  public getNumberOfFunctions() {
    return this.functionsArray.length;
  }

}