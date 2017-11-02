import { Splash } from "splash-screen";
import "./lib/jscolor";
import { MainController } from './MainController';


// responsiveVoice.speak("hello");

window.onload = function(): void {
    let controller: MainController = new MainController();

    var skipped: boolean = false;
    controller.HTMLHandler.body.style.backgroundColor = 'white';
    Splash.enable('circular');

    setTimeout(function() {
        if (!skipped) {
            Splash.destroy();
            document.getElementById("hide").style.display = "block";
            controller.themeManager.changeToBlackTheme();
            document.getElementById("splash-image").style.display = "none";
            document.body.className = "fade-out";
            setTimeout(function() { document.body.className = 'normal'; }, 25);
        }
    }, 3500);

    console.log("Window loaded :)");

    controller.HTMLHandler.instructionAndArguments.style.display = "none";

    var width = window.innerWidth;
    var height = window.innerHeight;

    var canvasWidth = 0;
    var canvasHeight = 0;

    if ((width / height) < 1.7) {
        // 4:3
        canvasWidth = window.innerWidth * 0.64;
        canvasHeight = window.innerHeight * 0.52;
        controller.HTMLHandler.registersTable.style.right = "2%";
        controller.HTMLHandler.canvas.style.left = "24%";
    } else {
        // 16:9
        canvasWidth = window.innerWidth * 0.57;
        canvasHeight = window.innerHeight * 0.57;
        controller.HTMLHandler.registersTable.style.right = "7%";
        controller.HTMLHandler.canvas.style.left = "24%";
    }

    controller.drawingObject.canvas.width = canvasWidth;
    controller.drawingObject.canvas.height = canvasHeight

    controller.drawEverything();

    controller.HTMLHandler.runButton.addEventListener("click", function() { controller.runAll() }, false);

    controller.HTMLHandler.nextButton.addEventListener("click", function() { controller.runNext() }, false);

    controller.HTMLHandler.body.addEventListener("click", function() { controller.updateColor(); }, false);

    controller.HTMLHandler.changeThemeButton.addEventListener("click", function() { controller.themeManager.toggleTheme(); controller.redrawFrames(); }, false);

    controller.HTMLHandler.soundButton.addEventListener("click", function() { controller.soundController.toggleAudio(); controller.HTMLHandler.toggleSound(); }, false);

    document.onkeydown = function(e) {

        if (Splash.isRunning()) {
            skipped = true;
            Splash.destroy();
            document.getElementById("hide").style.display = "block";
            controller.themeManager.changeToBlackTheme();
            document.getElementById("splash-image").style.display = "none";
            document.body.className = 'fade-out';
            setTimeout(function() { document.body.className = 'normal'; }, 25);
            return;
        }

        if (document.activeElement != controller.HTMLHandler.textArea) {

            switch (e.keyCode) {
                case 37:
                    // 'left'
                    if (controller.HTMLHandler.previousButton.getAttribute("disabled") != "true") {
                        controller.HTMLHandler.previousButton.click();
                    }
                    break;

                case 39:
                    // 'right'
                    if (controller.HTMLHandler.nextButton.getAttribute("disabled") != "true")
                        controller.HTMLHandler.nextButton.click();
                    break;

                case 67:
                    // C

                    controller.HTMLHandler.changeThemeButton.click();
                    break;

                case 69:
                    controller.HTMLHandler.editButton.click();
                    break;

                case 77:
                    // M
                    controller.HTMLHandler.soundButton.click();
                    break;

                case 70:
                    controller.HTMLHandler.fullScreenButton.click();
                    break;

                case 80:
                    controller.HTMLHandler.runButton.click();
                    break;

            }
        }
    };

    controller.HTMLHandler.previousButton.addEventListener("click", function() { controller.runPrevious() }, false);
    controller.HTMLHandler.editButton.addEventListener("click", function() { controller.edit() }, false);
    controller.HTMLHandler.fullScreenButton.addEventListener("click", function() { controller.setFullScreenMode() }, false);

    controller.HTMLHandler.changeSpeedButton.addEventListener("click", function() { controller.HTMLHandler.toggleShowSpeed(); });

    controller.HTMLHandler.fastButton.addEventListener("click", function() {
        controller.drawingObject.setAnimationSpeed(100);
        controller.HTMLHandler.toggleShowSpeed();
    });

    controller.HTMLHandler.slowButton.addEventListener("click", function() {
        controller.drawingObject.setAnimationSpeed(750);
        controller.HTMLHandler.toggleShowSpeed();
    });

    controller.HTMLHandler.normalButton.addEventListener("click", function() {
        controller.drawingObject.setAnimationSpeed(350);
        controller.HTMLHandler.toggleShowSpeed();
    });

    controller.HTMLHandler.soundButton.click();
}
