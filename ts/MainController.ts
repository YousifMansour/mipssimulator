import {Animator} from './Animator';
import {Console} from './Console';
import {DrawingClass} from './DrawingClass';
import {HTMLHandler} from './HTMLHandler';
import {InputHandler} from './InputHandler';
import {MIPS} from './MIPS';
import {ProgramLoader} from './ProgramLoader';
import {SoundController} from './SoundController';
import {ThemeManager} from './ThemeManager';
import {TypeObject} from './TypeObject';
import {Validator} from './Validator';

export class MainController {
  fullScreen: boolean = false;
  HTMLHandler: HTMLHandler;
  animator: Animator;
  inputHandler: InputHandler;
  drawingObject: DrawingClass;
  mipsObject: MIPS
  validator: Validator;
  typeObjectArray: TypeObject[];

  listInOrder: string[][];

  frameIndex: number;

  console: Console;

  themeManager: ThemeManager;

  private iterationIndex: number;

  soundController: SoundController;

  programLoader: ProgramLoader;

  constructor() {
    // responsiveVoice.speak("hello");

    this.HTMLHandler = new HTMLHandler();
    this.soundController = new SoundController();
    this.animator = new Animator();
    this.iterationIndex = 0;
    this.drawingObject = new DrawingClass(
        this.HTMLHandler, this.soundController,
        new MIPS(new Array<TypeObject>()));
    this.typeObjectArray = this.drawingObject.getTypeObjectArray();

    this.mipsObject = new MIPS(this.typeObjectArray);
    this.drawingObject = new DrawingClass(
        this.HTMLHandler, this.soundController, this.mipsObject);
    this.inputHandler = new InputHandler(this.typeObjectArray, this.mipsObject);

    this.console = new Console();
    this.validator =
        new Validator(this.typeObjectArray, this.inputHandler, this.console);

    this.inputHandler.initValidator(this.validator);

    this.frameIndex = 0;

    this.HTMLHandler.hidePreviousButton();

    this.themeManager =
        new ThemeManager(this.HTMLHandler, this.drawingObject, this.mipsObject);

    this.programLoader = new ProgramLoader(this.HTMLHandler.textArea);

    console.log('Main Controller constructed');
  }

  setFullScreenMode() {
    if (!this.fullScreen) {
      var width = window.innerWidth;
      var height = window.innerHeight;

      var canvasWidth = 0;
      var canvasHeight = 0;

      if ((width / height) < 1.7) {
        // 4:3
        canvasWidth = window.innerWidth * 0.87;
        canvasHeight = window.innerHeight * 0.65;
        this.HTMLHandler.registersTable.style.right = '2%';
        this.HTMLHandler.canvas.style.left = '2%';

      } else {
        // 16:9
        canvasWidth = window.innerWidth * 0.78;
        canvasHeight = window.innerHeight * 0.68;
        this.HTMLHandler.registersTable.style.right = '7%';
        this.HTMLHandler.canvas.style.left = '3%';
      }

      this.drawingObject.canvas.width = canvasWidth;
      this.drawingObject.canvas.height = canvasHeight;

      this.fullScreen = !this.fullScreen;
      this.HTMLHandler.fullScreenMode(true);

      this.drawingObject.brush.font = '12px Arial';

      // redraw optional
      this.drawingObject.draw(new TypeObject('', [], [], '', []));

      this.redrawFrames();

    } else {
      var width = window.innerWidth;
      var height = window.innerHeight;

      var canvasWidth = 0;
      var canvasHeight = 0;

      if ((width / height) < 1.7) {
        canvasWidth = window.innerWidth * 0.64;
        canvasHeight = window.innerHeight * 0.52;
        this.HTMLHandler.registersTable.style.right = '2%';
        this.HTMLHandler.canvas.style.left = '24%';
      } else {
        canvasWidth = window.innerWidth * 0.57;
        canvasHeight = window.innerHeight * 0.57;
        this.HTMLHandler.registersTable.style.right = '7%';
        this.HTMLHandler.canvas.style.left = '24%';
      }

      this.drawingObject.canvas.width = canvasWidth;
      this.drawingObject.canvas.height = canvasHeight;

      this.drawingObject.brush.font = '10px Arial';

      this.fullScreen = !this.fullScreen;
      this.HTMLHandler.fullScreenMode(false);

      // redraw optional

      this.drawingObject.draw(new TypeObject('', [], [], '', []));

      this.redrawFrames();
    }
  }

  updateColor() {
    if (this.HTMLHandler.changeColorButton.getAttribute('disabled') == 'true')
      return;

    var currentColor =
        document.getElementById('changeColorButton').style.background;
    if (currentColor == '') currentColor = '#ffff66';
    this.drawingObject.setColor(currentColor);
    this.mipsObject.setHighLightColor(currentColor);
    this.mipsObject.highLightRegister();
    this.redrawFrames();
    // console.log("updated color");
  }

  redrawFrames() {
    this.drawingObject.setAudio(false);

    this.drawingObject.setUpCanvas();
    if (this.listInOrder == undefined) return;  // its ok :)

    var tempFramesArray =
        this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
            .functionsArray;

    for (var i = 0; i < this.frameIndex; i++) {
      this.drawingObject.drawFrame(
          tempFramesArray[i],
          this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
              .stringALU,
          this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).type,
          this.listInOrder[this.iterationIndex]);
    }
  }

  drawEverything() {
    this.drawingObject.drawDefault();  // gives an empty typeobject to be drawn
    this.HTMLHandler.emptyDetailedTable();
    this.updateButtons();  // always update
  }

  runAll() {
    // to make this work whgen going fullscreen, this.frameIndex needs to be
    // incremented inside runInstruction method.

    if (this.listInOrder == undefined) this.updateInOrderList();

    this.mipsObject.reset();
    this.mipsObject.loadMemory(this.inputHandler.getDataList());

    this.HTMLHandler.hideTextArea();
    this.HTMLHandler.hideChangeColorButton();

    // hides buttons
    this.HTMLHandler.hideEditButton();
    this.HTMLHandler.hideNextButton();
    this.HTMLHandler.hidePreviousButton();
    this.HTMLHandler.hideRunButton();
    this.HTMLHandler.hideEditButton();

    if (!this.validator.isItAllValid()) {
      this.updateButtons();
      return;
    }
    // instructions valid.

    var functionReference = this.drawingObject.runInstruction.bind(this);

    // this is to make the timings work well.
    var timeForNextInstruction = 0;
    var difference = 0;
    var totalTime = 0;

    for (var i = 0; i < this.listInOrder.length; i++) {
      difference = this.drawingObject.runInstruction(
          this.listInOrder[i][0], timeForNextInstruction);
      var instructionAndArguments = this.listInOrder[i];

      timeForNextInstruction += difference;
      totalTime += difference;
    }

    for (var i = 0; i < this.listInOrder.length; i++) {
      this.mipsObject.run(this.listInOrder[i]);
    }

    this.mipsObject.highLightNonZero();

    this.animator.aniamte(function() {
      this.HTMLHandler.showEditButton();
      this.HTMLHandler.showTextArea();
      this.HTMLHandler.showNextButton();
      this.HTMLHandler.showPreviousButton();
      this.HTMLHandler.showRunButton();
      this.HTMLHandler.showChangeColorButton();
      this.updateColor();
      this.mipsObject.reset();
      this.drawEverything();

    }.bind(this), (totalTime + 1000));
  }

  private getNextFrame(): Function {
    var instrustionList: string[] =
        this.inputHandler.getInstructionsList(false);

    if (this.frameIndex ==
        this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
            .functionsArray.length) {
      if (this.iterationIndex + 1 < this.listInOrder.length) {
        this.iterationIndex++;
        this.frameIndex = 0;
        this.drawingObject.drawDefault();
        // alert(this.listInOrder[this.iterationIndex]);
        // alert(this.listInOrder);
      }
    }

    // console.log("frameIndex = " + this.frameIndex);
    // console.log(" iteration index = " + this.iterationIndex + " listInOrder
    // length = " + (this.listInOrder.length - 1)); console.log(" max frame = "
    // +
    // (this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray.length
    // - 1));

    return this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
        .functionsArray[this.frameIndex++];
  }

  updateInOrderList() {
    if (!this.validator.isItAllValid()) return;
    this.listInOrder = this.inputHandler.instructionsAndArgumentsInOrder();
  }

  runNext() {
    if (this.listInOrder == undefined) {
      this.updateInOrderList();
      return;
    }


    if (!this.HTMLHandler.textArea.getAttribute('disabled'))
      this.HTMLHandler.hideTextArea();

    this.drawingObject.setAudio(true);

    this.drawingObject.drawFrame(
        this.getNextFrame(),
        this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).stringALU,
        this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).type,
        this.listInOrder[this.iterationIndex]);

    if (this.frameIndex - 1 == 0) {
      this.mipsObject.run(this.listInOrder[this.iterationIndex]);
    }

    this.HTMLHandler.updateDetailedTable(
        this.listInOrder[this.iterationIndex][0],
        this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
            .controlSingals);

    this.updateButtons();
  }

  private getPreviousFrame(): Function {
    var instrustionList: string[] =
        this.inputHandler.getInstructionsList(false);

    if (this.frameIndex == 0) {
      if (this.iterationIndex - 1 >= 0) {
        this.iterationIndex--;
        this.frameIndex = 1;
      }
    }

    return this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
        .functionsArray[this.frameIndex--];
  }

  runPrevious() {
    // if (this.listInOrder == undefined) this.updateInOrderList();

    if (this.frameIndex == 1 && this.iterationIndex == 0) {
      this.frameIndex = 0;
      this.mipsObject.reset();
      this.listInOrder = undefined;
      this.console.clear();
      this.HTMLHandler.instructionAndArguments.value = '';
      this.drawEverything();
      // this.HTMLHandler.showTextArea();
      // this.HTMLHandler.textArea.focus();
      return;
    }

    this.frameIndex--;

    if (this.frameIndex == 0) {
      if (this.iterationIndex - 1 >= 0) {
        this.mipsObject.reset();
        this.mipsObject.loadMemory(this.inputHandler.getDataList());

        for (var i = 0; i < this.iterationIndex; i++) {
          this.mipsObject.run(this.listInOrder[i]);
        }

        this.iterationIndex--;

        this.frameIndex =
            this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
                .functionsArray.length;  //-1
      }
    }

    this.drawingObject.drawDefault();

    var tempFramesArray =
        this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
            .functionsArray;

    this.drawingObject.setAudio(false);

    for (var i = 0; i < this.frameIndex; i++) {
      if (i == this.frameIndex - 1) this.drawingObject.setAudio(true);
      this.drawingObject.drawFrame(
          tempFramesArray[i],
          this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
              .stringALU,
          this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).type,
          this.listInOrder[this.iterationIndex]);
    }


    this.HTMLHandler.updateDetailedTable(
        this.listInOrder[this.iterationIndex][0],
        this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
            .controlSingals);

    this.updateButtons();
  }

  edit() {
    this.iterationIndex = 0;
    this.frameIndex = 0;
    this.HTMLHandler.showTextArea();
    this.updateButtons();
    this.frameIndex = 0;
    this.mipsObject.reset();
    this.listInOrder = undefined;
    this.console.clear();
    this.HTMLHandler.instructionAndArguments.value = '';
    setTimeout(function() {
      this.HTMLHandler.textArea.focus();
    }.bind(this), 50);
    this.drawEverything();
    return;
  }

  private getTypeObjecet(instruction: string): TypeObject {
    for (var i = 0; i < this.typeObjectArray.length; i++) {
      if (this.typeObjectArray[i].isThisType(instruction))
        return this.typeObjectArray[i];
    }

    // should never happen
    console.log('it actually happened!');
    return null;
  }

  private updateButtons() {
    // need to know where .data is

    if (this.iterationIndex == 0 && this.frameIndex == 0)
      this.HTMLHandler.hidePreviousButton();

    else
      this.HTMLHandler.showPreviousButton();

    if (this.listInOrder == undefined) return;  // its ok

    if (this.iterationIndex == this.listInOrder.length - 1 &&
        this.frameIndex ==
            this.getTypeObjecet(this.listInOrder[this.iterationIndex][0])
                .functionsArray.length)
      this.HTMLHandler.hideNextButton();
    else
      this.HTMLHandler.showNextButton();

    if (this.console.textarea.style.color == 'red')
      this.HTMLHandler.showEditButton();
  }
}
