"use strict";
exports.__esModule = true;
var Console = (function () {
    function Console() {
        this.textarea = document.getElementById("console");
    }
    Console.prototype.putError = function (error) {
        this.textarea.style.color = 'red';
        this.textarea.value = error + "\n";
    };
    Console.prototype.putMessege = function (message) {
        this.textarea.style.color = 'lightgreen';
        this.textarea.value = message + "\n";
    };
    Console.prototype.clear = function () {
        this.putMessege("");
    };
    return Console;
}());
exports.Console = Console;
