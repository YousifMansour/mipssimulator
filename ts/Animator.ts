export class Animator {

    constructor() {
        console.log("Animator constructed");
    }

    aniamte(_function: Function, time: number) {

        setTimeout(function () { _function(); }, time);
    }

    aniamteArray(functions: Function[], time: number) {

        for (var i = 0; i < functions.length; i++) {
            setTimeout(function () { functions[i]() }, time);
        }
    }

    animatePath(pathFunction: Function, str: string, time: number) {

        setTimeout(function () {
            pathFunction(str);
        }, time);
    }

    delayFunction(functionToDelay: Function, time: number) {
        setTimeout(function () { functionToDelay(); }, time);
    }

}