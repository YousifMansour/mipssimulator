export class HTMLHandler {

    fullScreenButton: HTMLButtonElement;
    previousButton: HTMLButtonElement;
    nextButton: HTMLButtonElement;
    editButton: HTMLButtonElement;
    textArea: HTMLTextAreaElement;
    runButton: HTMLButtonElement;
    canvas: HTMLCanvasElement;
    footer: HTMLFontElement;
    header: HTMLElement;
    detailedTable: HTMLTableElement;
    table1: HTMLTableElement;
    table2: HTMLTableElement;
    table3: HTMLTableElement;
    colorDropDownContent: HTMLDivElement;
    colorButton: HTMLButtonElement;

    speedDropDownMenu: HTMLDirectoryElement;
    changeColorButton: HTMLButtonElement;
    changeSpeedButton: HTMLButtonElement;
    registersTable: HTMLTableElement;

    instructionAndArguments: HTMLTextAreaElement;

    console: HTMLTextAreaElement;

    fastButton: HTMLButtonElement;
    normalButton: HTMLButtonElement;
    slowButton: HTMLButtonElement;

    colors: HTMLDivElement;
    speed: HTMLDivElement;
    body: HTMLBodyElement;
    logo: HTMLImageElement;
    fasLogo: HTMLImageElement;
    github: HTMLImageElement;

    isFullScreen: boolean;
    isSoundOn: boolean;

    changeThemeButton: HTMLButtonElement;

    soundButton: HTMLButtonElement;

    constructor() {
        this.changeColorButton = <HTMLButtonElement>document.getElementById("changeColorButton");
        this.changeSpeedButton = <HTMLButtonElement>document.getElementById("changeSpeedButton");
        this.speedDropDownMenu = <HTMLDirectoryElement>document.getElementById("speedDropDown-content");
        this.colorDropDownContent = <HTMLDivElement>document.getElementById("colorDropDown-content");
        this.detailedTable = <HTMLTableElement>document.getElementById("detailedTable");
        this.fullScreenButton = <HTMLButtonElement>document.getElementById("fullScreenButton");
        this.colorButton = <HTMLButtonElement>document.getElementById("colorDropDownMenu");
        this.previousButton = <HTMLButtonElement>document.getElementById("previousButton");
        this.nextButton = <HTMLButtonElement>document.getElementById("nextButton");
        this.editButton = <HTMLButtonElement>document.getElementById("editButton");
        this.textArea = <HTMLTextAreaElement>document.getElementById("textInput");
        this.runButton = <HTMLButtonElement>document.getElementById("runButton");
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.footer = <HTMLFontElement>document.getElementById("footer");
        this.header = <HTMLElement>document.getElementById("header");
        this.console = <HTMLTextAreaElement>document.getElementById("console");
        this.body = <HTMLBodyElement>document.body;
        this.logo = <HTMLImageElement>document.getElementById("logo");
        this.fasLogo = <HTMLImageElement>document.getElementById("fasLogo");
        this.github = <HTMLImageElement>document.getElementById("github");
        

        this.fastButton = <HTMLButtonElement>document.getElementById("fastButton");
        this.normalButton = <HTMLButtonElement>document.getElementById("normalButton");
        this.slowButton = <HTMLButtonElement>document.getElementById("slowButton");

        this.isFullScreen = false;
        this.isSoundOn = true;

        this.soundButton = <HTMLButtonElement>document.getElementById("soundButton");

        // this.table1 = <HTMLTableElement>document.getElementById("firsttable");
        // this.table2 = <HTMLTableElement>document.getElementById("secondtable");
        // this.table3 = <HTMLTableElement>document.getElementById("thirdtable");
        this.registersTable = <HTMLTableElement>document.getElementById("registersTable");

        this.instructionAndArguments = <HTMLTextAreaElement>document.getElementById("instructionAndArguments");

        this.colors = <HTMLDivElement>document.getElementById("colors");
        this.speed = <HTMLDivElement>document.getElementById("speed");

        this.changeThemeButton = <HTMLButtonElement>document.getElementById("changeThemeButton");

        console.log("HTMLHandler constructed");
    }

    toggleSound() {
        this.isSoundOn = !this.isSoundOn;
        if (this.body.style.background != "white") {
            if (this.isSoundOn)
                this.soundButton.style.backgroundImage = "url('./res/soundButton.png')";
            else this.soundButton.style.backgroundImage = "url('./res/nosoundButton.png')";
        } else {
            if (this.isSoundOn)
                this.soundButton.style.backgroundImage = "url('./res/soundButton_black.png')";
            else this.soundButton.style.backgroundImage = "url('./res/nosoundButton_black.png')";
        }
    }

    fullScreenMode(boolean: boolean) {
        this.isFullScreen = boolean;
        if (boolean) {

            // hide the div!
            // document.getElementById("wrapper").style.display = "none";

            // this.nextButton.style.display = "none";

            this.textArea.style.display = "none";
            this.footer.style.display = "none";
            this.header.style.display = "none";
            this.fasLogo.style.display = "none";
            this.github.style.display = "none";
            // this.githubWhite.style.display = "none";

            // this.registersTable.style.display = "none";

            this.canvas.className = "fullscreen";
            // this.detailedTable.className = "fullscreen";




            // this.previousButton.style.display = "none";

            this.editButton.style.display = "none";

            if (this.body.style.background != "white")
                this.fullScreenButton.style.backgroundImage = "url('./res/nofullscreen.png')";
            else this.fullScreenButton.style.backgroundImage = "url('./res/nofullscreen_black.png')";

            this.console.style.display = "none";
            this.instructionAndArguments.style.display = "block";

            // this.table1.style.display = "none";
            // this.table2.style.display = "none";
            // this.table3.style.display = "none";


        } else {

            // show the div
            // document.getElementById("wrapper").style.display = "block";

            // this.fullScreenButton.style.display = "none";

            this.detailedTable.style.display = "block";



            this.fullScreenButton.style.display = "block";

            this.registersTable.style.display = "block";
            this.instructionAndArguments.style.display = "none";

            if (this.body.style.background != "white")
                this.fullScreenButton.style.backgroundImage = "url('./res/fullscreen.png')";
            else this.fullScreenButton.style.backgroundImage = "url('./res/fullscreen_black.png')";

            this.canvas.className = "nofullscreen";
            this.detailedTable.className = "nofullscreen";


            this.nextButton.style.display = "block";

            this.textArea.style.display = "block";
            this.footer.style.display = "block";
            this.header.style.display = "block";
            this.fasLogo.style.display = "block";
            this.github.style.display = "block";

            // this.previousButton.style.display = "block";

            this.editButton.style.display = "block";

            this.console.style.display = "block";

            // this.table1.style.display = "block";
            // this.table2.style.display = "block";
            // this.table3.style.display = "block";

        }
    }

    emptyDetailedTable() {

        this.updateDetailedTable("_", [" ", " ", " ", " ", " ", " ", " ", " ", " "]); // gives an empty controll signal[]
    }

    updateDetailedTable(instruction: string, controlSingals: string[]) {

        if (controlSingals == undefined && instruction == undefined) return;

        (<HTMLTableRowElement>document.getElementById("instructionIndicator")).innerHTML = instruction;

        (<HTMLTableRowElement>document.getElementById("RegDst")).innerHTML = controlSingals[0];
        (<HTMLTableRowElement>document.getElementById("AluSrc")).innerHTML = controlSingals[1];
        (<HTMLTableRowElement>document.getElementById("MemReg")).innerHTML = controlSingals[2];
        (<HTMLTableRowElement>document.getElementById("RegWr")).innerHTML = controlSingals[3];
        (<HTMLTableRowElement>document.getElementById("MemRd")).innerHTML = controlSingals[4];
        (<HTMLTableRowElement>document.getElementById("MemWr")).innerHTML = controlSingals[5];
        (<HTMLTableRowElement>document.getElementById("Branch")).innerHTML = controlSingals[6];
        (<HTMLTableRowElement>document.getElementById("AluOp")).innerHTML = controlSingals[7];
        (<HTMLTableRowElement>document.getElementById("Jump")).innerHTML = controlSingals[8];

        // this.detailedTable.value = instruction;
    }

    toggleShowCollors() {
        if (this.colors.style.display == "block") this.colors.style.display = "none";
        else this.colors.style.display = "block";
    }

    toggleShowSpeed() {
        if (this.speed.style.display == "block") this.speed.style.display = "none";
        else this.speed.style.display = "block";
    }

    toggleColorDropDownContent() {
        if (this.colorDropDownContent.style.display == "block") this.colorDropDownContent.style.display = "none";
        else this.colorDropDownContent.style.display = "block";
        this.toggleChangeColorButton();
    }

    toggleSpeedDropDownMenu() {
        if (this.speedDropDownMenu.style.display == "block") this.speedDropDownMenu.style.display = "none";
        else this.speedDropDownMenu.style.display = "block";
        this.toggleChangeSpeedButton();
    }

    toggleChangeColorButton() {
        if (this.changeColorButton.style.display == "none") this.changeColorButton.style.display = "block";
        else this.changeColorButton.style.display == "none";
    }

    toggleChangeSpeedButton() {
        if (this.changeSpeedButton.style.display == "none") this.changeSpeedButton.style.display = "block";
        else this.changeSpeedButton.style.display == "none";
    }

    // showColorDropDownContent() {
    //     this.colorDropDownContent.style.display = "block";
    // }

    // hideColorDropDownContent() {
    //     this.colorDropDownContent.style.display = "none";
    // }

    showTextArea() {
        this.textArea.removeAttribute("disabled");
        if (this.body.style.background == "white") {
            this.textArea.style.background = "white";
            this.textArea.style.color = "black";
        }
        else {
            this.textArea.style.background = "#171717";
            this.textArea.style.color = "white";
        }
    }

    hideTextArea() {
        this.textArea.setAttribute("disabled", "true");
        if (this.body.style.background == "white") {
            this.textArea.style.background = "#f2f2f2";
            this.textArea.style.color = "black";

            this.instructionAndArguments.style.background = this.textArea.style.background;
            this.instructionAndArguments.style.color = this.textArea.style.color;

        }
        else {
            this.textArea.style.background = "#262626";
            this.textArea.style.color = "#f2f2f2";

            this.instructionAndArguments.style.background = "#0F0F0F";
            this.instructionAndArguments.style.color = "white";
        }
    }

    showNextButton() {
        // this works..
        this.nextButton.removeAttribute("disabled");

        if (this.body.style.background != "white") {

            this.nextButton.style.backgroundImage = "url('./res/next.png')";
        }
        else this.nextButton.style.backgroundImage = "url('./res/next_black.png')";
    }

    hideNextButton() {
        this.nextButton.setAttribute("disabled", "true");
        this.nextButton.style.backgroundImage = "url('./res/nextDisabled.png')";
    }

    showChangeColorButton() {
        this.changeColorButton.removeAttribute("disabled");
        this.changeColorButton.style.background = "#ffff66";
    }

    hideChangeColorButton() {
        this.changeColorButton.setAttribute("disabled", "true");
        this.changeColorButton.style.background = "gray";
        this.changeColorButton.style.color = "black";
    }

    showPreviousButton() {
        this.previousButton.removeAttribute("disabled");
        if (this.body.style.background != "white")
            this.previousButton.style.backgroundImage = "url('./res/previous.png')";
        else this.previousButton.style.backgroundImage = "url('./res/previous_black.png')";
    }

    hidePreviousButton() {
        this.previousButton.setAttribute("disabled", "true");
        this.previousButton.style.backgroundImage = "url('./res/previousDisabled.png')";
    }

    showEditButton() {
        this.editButton.removeAttribute("disabled");
        if (this.body.style.background != "white")
            this.editButton.style.backgroundImage = "url('./res/edit.png')";
        else this.editButton.style.backgroundImage = "url('./res/edit_black.png')";

    }

    hideEditButton() {
        this.editButton.setAttribute("disabled", "true");
        this.editButton.style.backgroundImage = "url('./res/editDisabled.png')";
    }

    showRunButton() {
        this.runButton.removeAttribute("disabled");
        if (this.body.style.background != "white")
            this.runButton.style.backgroundImage = "url('./res/play.png')";
        else this.runButton.style.backgroundImage = "url('./res/play_black.png')";
    }

    hideRunButton() {
        this.runButton.setAttribute("disabled", "true");
    }
}
