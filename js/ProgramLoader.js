"use strict";
exports.__esModule = true;
var ProgramLoader = (function () {
    function ProgramLoader(textArea) {
        this.textArea = textArea;
        this.loadProram(4);
    }
    ProgramLoader.prototype.loadProram = function (id) {
        if (1 == 1)
            return;
        var program = this.programs[id];
        this.textArea.value = program;
    };
    return ProgramLoader;
}());
exports.ProgramLoader = ProgramLoader;
