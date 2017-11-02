"use strict";
exports.__esModule = true;
var Animator = (function () {
    function Animator() {
        console.log("Animator constructed");
    }
    Animator.prototype.aniamte = function (_function, time) {
        setTimeout(function () { _function(); }, time);
    };
    Animator.prototype.aniamteArray = function (functions, time) {
        for (var i = 0; i < functions.length; i++) {
            setTimeout(function () { functions[i](); }, time);
        }
    };
    Animator.prototype.animatePath = function (pathFunction, str, time) {
        setTimeout(function () {
            pathFunction(str);
        }, time);
    };
    Animator.prototype.delayFunction = function (functionToDelay, time) {
        setTimeout(function () { functionToDelay(); }, time);
    };
    return Animator;
}());
exports.Animator = Animator;
