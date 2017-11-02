"use strict";
exports.__esModule = true;
var TypeObject = (function () {
    function TypeObject(type, instructionsArray, functionsArray, stringALU, controlSingals) {
        this.type = type;
        this.instructionsArray = instructionsArray;
        this.functionsArray = functionsArray;
        this.stringALU = stringALU;
        this.controlSingals = controlSingals;
    }
    TypeObject.prototype.isThisType = function (instruction) {
        for (var i = 0; i < this.instructionsArray.length; i++) {
            if (this.instructionsArray[i] == instruction)
                return true;
        }
        return false;
    };
    TypeObject.prototype.getNumberOfFunctions = function () {
        return this.functionsArray.length;
    };
    return TypeObject;
}());
exports.TypeObject = TypeObject;
