import './ttsConfig.js';

import {Animator} from './Animator';
import {HTMLHandler} from './HTMLHandler';
import {SoundController} from './SoundController';
import {TypeObject} from './TypeObject';

export class DrawingClass {
  HTMLHandler: HTMLHandler;
  animator: Animator;
  canvas: HTMLCanvasElement;

  // typeobjects should be here
  Rtype: TypeObject;
  Itype: TypeObject;
  lw: TypeObject;
  sw: TypeObject;
  beq: TypeObject;
  j: TypeObject;

  typeObjectArray: TypeObject[];

  brush: any;
  color: string;

  lineWidth: number;  // this is the default

  animationSpeed: number;
  defaultLineWidth: number;

  defaultColor: string = 'white';

  audio: boolean = false;

  soundController: SoundController;

  constructor(HTMLHandler: HTMLHandler, soundController: SoundController) {
    this.lineWidth = 4;
    this.animationSpeed = 500;
    this.color = '#ffff66';

    this.HTMLHandler = HTMLHandler;
    this.animator = new Animator();
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');

    this.defaultLineWidth = 2;

    this.brush = this.canvas.getContext('2d');

    this.Rtype = new TypeObject(
        'Rtype', 'add, addu, sub, subu, and, or, slt, sltu'.split(', '),
        [
          this.PC.bind(this),
          this.fromPC.bind(this),
          this.readAddress.bind(this),
          this.fromReadAddress.bind(this),
          this.instruction3126.bind(this),
          this.drawControl.bind(this),
          this.regDst.bind(this),
          this.aluOp.bind(this),
          this.ALUcontrol.bind(this),
          this.regWrite.bind(this),
          this.instruction2521.bind(this),
          this.instruction2016.bind(this),
          this.instruction2016_1.bind(this),
          this.instruction1511.bind(this),
          this.drawMUX1511.bind(this),
          this.muxToWriteRegister.bind(this),
          this.registers.bind(this),
          this.readData1.bind(this),
          this.readData2.bind(this),
          this.muxALU.bind(this),
          this.muxALUtoALUBottom.bind(this),
          this.instruction150.bind(this),
          this.instruction50.bind(this),
          this.aluControlToAluBottom.bind(this),
          this.aluBottom.bind(this),
          this.fromALUResult.bind(this),
          this.toMuxBottomRight.bind(this),
          this.bottomRightMux.bind(this),
          this.bottomRightMuxToWriteData.bind(this)
        ],
        '10',
        ['1', '0', 'X', '1', '0', '0', '0', '10', '0']);  // RegDst RegWr ALUOp
    this.Itype = new TypeObject(
        'Itype', 'addi, addiu, andi, slti, sltiu, ori'.split(', '),
        [
          this.PC.bind(this),
          this.fromPC.bind(this),
          this.readAddress.bind(this),
          this.fromReadAddress.bind(this),
          this.instruction3126.bind(this),
          this.drawControl.bind(this),
          this.aluOp.bind(this),
          this.ALUcontrol.bind(this),
          this.aluSrc.bind(this),
          this.regWrite.bind(this),
          this.instruction2521.bind(this),
          this.instruction2016.bind(this),
          this.draw2016toMUX.bind(this),
          this.drawMUX1511.bind(this),
          this.muxToWriteRegister.bind(this),
          this.registers.bind(this),
          this.readData1.bind(this),
          this.instruction150.bind(this),
          this.signExtended.bind(this),
          this.signExtendToShiftLeftBottom.bind(this),
          this.signExtendToMUX.bind(this),
          this.muxALU.bind(this),
          this.muxALUtoALUBottom.bind(this),
          this.aluControlToAluBottom.bind(this),
          this.aluBottom.bind(this),
          this.fromALUResult.bind(this),
          this.toMuxBottomRight.bind(this),
          this.bottomRightMux.bind(this),
          this.bottomRightMuxToWriteData.bind(this)
        ],
        '10', ['0', '1', 'X', '1', '0', '0', '0', '10', '0']);
    this.lw = new TypeObject(
        'lw', 'lw, lb'.split(', '),
        [
          this.PC.bind(this),
          this.fromPC.bind(this),
          this.readAddress.bind(this),
          this.fromReadAddress.bind(this),
          this.instruction3126.bind(this),
          this.drawControl.bind(this),
          this.memRead.bind(this),
          this.memToReg.bind(this),
          this.aluOp.bind(this),
          this.ALUcontrol.bind(this),
          this.aluSrc.bind(this),
          this.regWrite.bind(this),
          this.instruction2521.bind(this),
          this.instruction2016.bind(this),
          this.draw2016toMUX.bind(this),
          this.drawMUX1511.bind(this),
          this.muxToWriteRegister.bind(this),
          this.registers.bind(this),
          this.readData1.bind(this),
          this.instruction150.bind(this),
          this.signExtended.bind(this),
          this.signExtendToShiftLeftBottom.bind(this),
          this.signExtendToMUX.bind(this),
          this.muxALU.bind(this),
          this.muxALUtoALUBottom.bind(this),
          this.aluControlToAluBottom.bind(this),
          this.aluBottom.bind(this),
          this.fromALUResult.bind(this),
          this.ALUbottomToAddress.bind(this),
          this.dataMemory.bind(this),
          this.readDataToMuxBottomRight.bind(this),
          this.bottomRightMux.bind(this),
          this.bottomRightMuxToWriteData.bind(this)
        ],
        '00', [
          '0', '1', '1', '1', '1', '0', '0', '00', '0'
        ]);  //ALUSrc MEMReg RegWr MemRd
    this.sw = new TypeObject(
        'sw', 'sw, sb'.split(', '),
        [
          this.PC.bind(this),
          this.fromPC.bind(this),
          this.readAddress.bind(this),
          this.fromReadAddress.bind(this),
          this.instruction3126.bind(this),
          this.drawControl.bind(this),
          this.aluSrc.bind(this),
          this.memWrite.bind(this),
          this.aluOp.bind(this),
          this.ALUcontrol.bind(this),
          this.instruction2521.bind(this),
          this.instruction2016.bind(this),
          this.instruction2016_1.bind(this),
          this.registers.bind(this),
          this.readData1.bind(this),
          this.instruction150.bind(this),
          this.signExtended.bind(this),
          this.signExtendToShiftLeftBottom.bind(this),
          this.signExtendToMUX.bind(this),
          this.muxALU.bind(this),
          this.muxALUtoALUBottom.bind(this),
          this.aluControlToAluBottom.bind(this),
          this.aluBottom.bind(this),
          this.fromALUResult.bind(this),
          this.ALUbottomToAddress.bind(this),
          this.readData2ToWriteData.bind(this),
          this.dataMemory.bind(this)
        ],
        '00', ['x', '1', 'X', '0', '0', '1', '0', '00', '0']);
    this.beq = new TypeObject(
        'beq', 'beq, '.split(', '),
        [
          this.PC.bind(this),
          this.fromPC.bind(this),
          this.readAddress.bind(this),
          this.fromReadAddress.bind(this),
          this.instruction3126.bind(this),
          this.drawControl.bind(this),
          this.branch.bind(this),
          this.aluOp.bind(this),
          this.ALUcontrol.bind(this),
          this.instruction2521.bind(this),
          this.instruction2016.bind(this),
          this.instruction2016_1.bind(this),
          this.registers.bind(this),
          this.readData1.bind(this),
          this.readData2.bind(this),
          this.muxALU.bind(this),
          this.muxALUtoALUBottom.bind(this),
          this.aluControlToAluBottom.bind(this),
          this.aluBottom.bind(this),
          this.zeroToHalfCircle.bind(this),
          this.HalfCircle.bind(this),
          this.halfCircleToMux.bind(this),
          this.instruction150.bind(this),
          this.signExtended.bind(this),
          this.signExtendToShiftLeftBottom.bind(this),
          this.toShiftLeft2.bind(this),
          this.shiftLeftBottom.bind(this),
          this.shiftLeft2ToALUTop.bind(this),
          this.toADD.bind(this),
          this.add4.bind(this),
          this.drawADD.bind(this),
          this.addToMux_1.bind(this),
          this.aluTop.bind(this),
          this.topALUToMux.bind(this),
          this.halfCircleMUX.bind(this),
          this.muxToMux.bind(this),
          this.topRightMUX.bind(this),
          this.MuxToPC.bind(this)
        ],
        '01',
        ['X', '0', 'X', '0', '0', '0', '1', '01', '0']);  // branch ALUOp = 01
    this.j = new TypeObject(
        'j', 'j, '.split(', '),
        [
          this.PC.bind(this), this.fromPC.bind(this),
          this.readAddress.bind(this), this.fromReadAddress.bind(this),
          this.instruction3126.bind(this), this.drawControl.bind(this),
          this.jump.bind(this), this.instruction250.bind(this),
          this.shiftLeft2.bind(this), this.fromJumpAddress.bind(this),
          this.toADD.bind(this), this.add4.bind(this), this.drawADD.bind(this),
          this.addToJumpAddress.bind(this), this.jumpAddress310.bind(this),
          this.topRightMUX.bind(this), this.MuxToPC.bind(this)
        ],
        'XX', ['X', 'X', 'X', '0', '0', '0', 'X', 'XX', '1']);  // JumpI


    this.typeObjectArray = new Array<TypeObject>();
    this.typeObjectArray[0] = this.Rtype;
    this.typeObjectArray[1] = this.Itype;
    this.typeObjectArray[2] = this.lw;
    this.typeObjectArray[3] = this.sw;
    this.typeObjectArray[4] = this.beq;
    this.typeObjectArray[5] = this.j;

    this.soundController = soundController;

    console.log('Drawing Object constructed');
  }

  setAudio(playing: boolean) {
    this.audio = playing;
  }

  getTypeObjectArray(): TypeObject[] {
    return this.typeObjectArray;
  }

  setColor(color: string) {
    this.color = color;
  }

  setDefaultColor(defaultColor: string) {
    this.defaultColor = defaultColor;
  }

  setAnimationSpeed(animationSpeed: number) {
    this.animationSpeed = animationSpeed;
  }

  runInstruction(instruction: string, time: number): number {
    console.log(instruction);


    // I love javascript
    var functionToDraw: Function;
    var numberOfFunctions: number;

    if (instruction == '') return;

    var arrayToSend: string[] = [];

    // this.animator.aniamte(function () { this.draw(this.Rtype) }.bind(this),
    // 3000 * i)

    if (this.Rtype.isThisType(instruction)) {
      functionToDraw = function() {
        this.draw(this.Rtype)
      }.bind(this);
      numberOfFunctions = this.Rtype.getNumberOfFunctions();
      arrayToSend = this.Rtype.controlSingals;
    } else if (this.Itype.isThisType(instruction)) {
      functionToDraw = function() {
        this.draw(this.Itype)
      }.bind(this);
      numberOfFunctions = this.Itype.getNumberOfFunctions();
      arrayToSend = this.Itype.controlSingals;
    } else if (this.lw.isThisType(instruction)) {
      functionToDraw = function() {
        this.draw(this.lw)
      }.bind(this);
      numberOfFunctions = this.lw.getNumberOfFunctions();
      arrayToSend = this.lw.controlSingals;
    } else if (this.sw.isThisType(instruction)) {
      functionToDraw = function() {
        this.draw(this.sw)
      }.bind(this);
      numberOfFunctions = this.sw.getNumberOfFunctions();
      arrayToSend = this.sw.controlSingals;
    } else if (this.beq.isThisType(instruction)) {
      functionToDraw = function() {
        this.draw(this.beq)
      }.bind(this);
      numberOfFunctions = this.beq.getNumberOfFunctions();
      arrayToSend = this.beq.controlSingals;
    } else if (this.j.isThisType(instruction)) {
      functionToDraw = function() {
        this.draw(this.j)
      }.bind(this);
      numberOfFunctions = this.j.getNumberOfFunctions();
      arrayToSend = this.j.controlSingals;
    }

    console.log(arrayToSend);

    this.animator.aniamte(
        function() {
          functionToDraw();
          this.HTMLHandler.updateDetailedTable(instruction, arrayToSend);
        }.bind(this),
        time)

        return ((numberOfFunctions * this.animationSpeed) + 1000);
  }

  MuxToPC() {  // Draws the line that goes from MUX to PC

    if (this.audio) this.soundController.playSound(ttsConfig.MuxToPC);

    this.brush.beginPath();  // line
    this.brush.moveTo(0.02 * this.canvas.width, 0.551 * this.canvas.height);
    this.brush.lineTo(0.01 * this.canvas.width, 0.551 * this.canvas.height);
    this.brush.lineTo(0.01 * this.canvas.width, 0.022 * this.canvas.height);
    this.brush.lineTo(0.97 * this.canvas.width, 0.022 * this.canvas.height);
    this.brush.lineTo(0.97 * this.canvas.width, 0.147 * this.canvas.height);
    this.brush.lineTo(0.962 * this.canvas.width, 0.147 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(.02 * this.canvas.width, 0.551 * this.canvas.height);
  }

  PC() {  // Draws the PC rectangle

    if (this.audio) this.soundController.playSound(ttsConfig.pc);

    this.brush.strokeRect(
        0.034 * this.canvas.width, 0.482 * this.canvas.height,
        0.035 * this.canvas.width, 0.137 * this.canvas.height);
    this.brush.fillText(
        'PC', 0.04 * this.canvas.width, 0.560 * this.canvas.height);
  }

  fromPC() {  // Draws the line that comes from PC

    this.brush.beginPath();  // line
    this.brush.moveTo(0.069 * this.canvas.width, 0.551 * this.canvas.height);
    this.brush.lineTo(0.088 * this.canvas.width, 0.551 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.088 * this.canvas.width, 0.551 * this.canvas.height);
  }

  toADD() {
    this.brush.beginPath();
    this.brush.moveTo(0.069 * this.canvas.width, 0.551 * this.canvas.height);
    this.brush.lineTo(0.08 * this.canvas.width, 0.551 * this.canvas.height);
    this.brush.lineTo(0.08 * this.canvas.width, 0.105 * this.canvas.height);
    this.brush.lineTo(0.11 * this.canvas.width, 0.105 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.11 * this.canvas.width, 0.105 * this.canvas.height);
  }

  drawADD() {  // draws the Add figure

    if (this.audio) this.soundController.playSound(ttsConfig.add);

    this.brush.beginPath();
    this.brush.moveTo(0.124 * this.canvas.width, 0.082 * this.canvas.height);
    this.brush.lineTo(0.124 * this.canvas.width, 0.124 * this.canvas.height);
    this.brush.lineTo(0.134 * this.canvas.width, 0.140 * this.canvas.height);
    this.brush.lineTo(0.124 * this.canvas.width, 0.151 * this.canvas.height);
    this.brush.lineTo(0.124 * this.canvas.width, 0.197 * this.canvas.height);
    this.brush.lineTo(0.162 * this.canvas.width, 0.163 * this.canvas.height);
    this.brush.lineTo(0.162 * this.canvas.width, 0.117 * this.canvas.height);
    this.brush.lineTo(0.124 * this.canvas.width, 0.082 * this.canvas.height);
    this.brush.stroke();
    this.brush.fillText(
        'Add', 0.133 * this.canvas.width, 0.13 * this.canvas.height);
  }

  topRightMUX() {  // draws the top right mux connected to the PC

    this.brush.strokeRect(
        0.933 * this.canvas.width, 0.078 * this.canvas.height,
        0.028 * this.canvas.width, 0.137 * this.canvas.height);

    this.brush.fillText(
        '1', 0.936 * this.canvas.width, 0.103 * this.canvas.height);
    this.brush.fillText(
        'M', 0.937 * this.canvas.width, 0.131 * this.canvas.height);
    this.brush.fillText(
        'u', 0.939 * this.canvas.width, 0.154 * this.canvas.height);
    this.brush.fillText(
        'x', 0.939 * this.canvas.width, 0.177 * this.canvas.height);
    this.brush.fillText(
        '0', 0.936 * this.canvas.width, 0.200 * this.canvas.height);
  }

  // address: string
  readAddress() {  // draws the rectangle containing read address

    if (this.audio) this.soundController.playSound(ttsConfig.readAddress);

    this.brush.strokeRect(
        0.102 * this.canvas.width, 0.528 * this.canvas.height,
        0.081 * this.canvas.width, 0.206 * this.canvas.height);
    this.brush.fillText(
        'Read', 0.108 * this.canvas.width, 0.551 * this.canvas.height);
    this.brush.fillText(
        'Address', 0.108 * this.canvas.width, 0.574 * this.canvas.height);
    this.brush.fillText(
        'Instructions', 0.103 * this.canvas.width, 0.620 * this.canvas.height);
    this.brush.fillText(
        '[31-0]', 0.140 * this.canvas.width, 0.643 * this.canvas.height);
    this.brush.fillText(
        'Instruction', 0.103 * this.canvas.width, 0.689 * this.canvas.height);
    this.brush.fillText(
        'memory', 0.108 * this.canvas.width, 0.712 * this.canvas.height);
  }

  fromReadAddress() {
    this.brush.beginPath();
    this.brush.moveTo(0.183 * this.canvas.width, 0.632 * this.canvas.height);
    this.brush.lineTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
    this.brush.stroke();
  }

  instruction2016(
      stringALU: string, instruction3126: string, instruction2521: string,
      instruction2016: string, instruction1511: string, instruction150: string,
      instruction250: string) {
    var text: string = instruction2016;
    if (text == undefined) text = '';

    this.brush.beginPath();
    this.brush.moveTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
    this.brush.lineTo(0.198 * this.canvas.width, 0.586 * this.canvas.height);
    this.brush.lineTo(0.267 * this.canvas.width, 0.586 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        text, 0.201 * this.canvas.width, 0.572 * this.canvas.height);
  }

  instruction2016_1() {
    this.brush.beginPath();
    this.brush.moveTo(0.267 * this.canvas.width, 0.586 * this.canvas.height);
    this.brush.lineTo(0.345 * this.canvas.width, 0.586 * this.canvas.height);
    this.brush.stroke();
    this.drawArrow(0.345 * this.canvas.width, 0.586 * this.canvas.height);
  }

  instruction2521(
      stringALU: string, instruction3126: string, instruction2521: string,
      instruction2016: string, instruction1511: string, instruction150: string,
      instruction250: string) {
    var text: string = '';
    if (this.brush.lineWidth != this.defaultLineWidth) text = instruction2521;

    if (text == undefined) text = '';

    this.brush.beginPath();
    this.brush.moveTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
    this.brush.lineTo(0.198 * this.canvas.width, 0.54 * this.canvas.height);
    this.brush.lineTo(0.345 * this.canvas.width, 0.54 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.345 * this.canvas.width, 0.54 * this.canvas.height);

    this.brush.fillText(
        text, 0.201 * this.canvas.width, 0.526 * this.canvas.height);
  }

  instruction3126(
      stringALU: string, instruction3126: string, instruction2531: string,
      instruction2016: string, instruction1511: string, instruction150: string,
      instruction250: string) {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    var str: string = stringALU;

    var text: string = '';

    // all sent variables are recevieved!!!

    if (this.brush.lineWidth != this.defaultLineWidth) text = instruction3126;

    if (text == undefined) text = '';

    this.brush.beginPath();
    this.brush.moveTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
    this.brush.lineTo(0.198 * this.canvas.width, 0.372 * this.canvas.height);
    this.brush.lineTo(0.296 * this.canvas.width, 0.372 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.296 * this.canvas.width, 0.372 * this.canvas.height);


    // change color
    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;

    this.brush.fillText(
        text, 0.198 * this.canvas.width, 0.354 * this.canvas.height);
  }

  instruction1511(
      stringALU: string, instruction3126: string, instruction2521: string,
      instruction2016: string, instruction1511: string, instruction150: string,
      instruction250: string) {
    if (instruction1511 == undefined) instruction1511 = '';

    this.brush.beginPath();
    this.brush.moveTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
    this.brush.lineTo(0.198 * this.canvas.width, 0.678 * this.canvas.height);
    this.brush.lineTo(0.296 * this.canvas.width, 0.678 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.296 * this.canvas.width, 0.678 * this.canvas.height);

    this.brush.fillText(
        instruction1511, 0.201 * this.canvas.width, 0.666 * this.canvas.height);
  }

  instruction150(
      stringALU: string, instruction3126: string, instruction2521: string,
      instruction2016: string, instruction1511: string, instruction150: string,
      instruction250: string) {
    if (instruction150 == undefined) instruction150 = '';

    this.brush.beginPath();
    this.brush.moveTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
    this.brush.lineTo(0.198 * this.canvas.width, 0.816 * this.canvas.height);
    this.brush.lineTo(0.370 * this.canvas.width, 0.816 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.37 * this.canvas.width, 0.816 * this.canvas.height);

    this.brush.beginPath();
    this.brush.moveTo(0.351 * this.canvas.width, 0.804 * this.canvas.height);
    this.brush.lineTo(0.362 * this.canvas.width, 0.827 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        instruction150, 0.201 * this.canvas.width, 0.804 * this.canvas.height);
    this.brush.fillText(
        '16', 0.351 * this.canvas.width, 0.802 * this.canvas.height);
  }

  instruction250(
      stringALU: string, instruction3126: string, instruction2521: string,
      instruction2016: string, instruction1511: string, instruction150: string,
      instruction250: string) {
    if (instruction250 == undefined) instruction250 = '';

    this.brush.beginPath();
    this.brush.moveTo(0.189 * this.canvas.width, 0.632 * this.canvas.height);
    this.brush.lineTo(0.189 * this.canvas.width, 0.078 * this.canvas.height);
    this.brush.lineTo(0.296 * this.canvas.width, 0.078 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.296 * this.canvas.width, 0.078 * this.canvas.height);

    this.brush.beginPath();
    this.brush.moveTo(0.281 * this.canvas.width, 0.068 * this.canvas.height);
    this.brush.lineTo(0.291 * this.canvas.width, 0.087 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        instruction250, 0.217 * this.canvas.width, 0.058 * this.canvas.height);
    this.brush.fillText(
        '26', 0.27 * this.canvas.width, 0.099 * this.canvas.height);
  }

  drawControl() {
    if (this.audio) this.soundController.playSound(ttsConfig.drawControl);

    // change color
    var temp: string = this.brush.strokeStyle;
    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    this.brush.beginPath();
    this.brush.ellipse(
        0.349 * this.canvas.width, 0.356 * this.canvas.height,
        0.037 * this.canvas.width, 0.137 * this.canvas.height, 0, 0,
        2 * Math.PI);
    this.brush.stroke();
    this.brush.fillText(
        'Control', 0.325 * this.canvas.width, 0.379 * this.canvas.height);

    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  drawMUX1511() {
    this.brush.strokeRect(
        0.308 * this.canvas.width, 0.610 * this.canvas.height,
        0.035 * this.canvas.width, 0.137 * this.canvas.height);

    this.brush.fillText(
        '0', 0.318 * this.canvas.width, 0.645 * this.canvas.height);  // x
    this.brush.fillText(
        'M', 0.318 * this.canvas.width, 0.670 * this.canvas.height);  // x+9
    this.brush.fillText(
        'u', 0.318 * this.canvas.width, 0.691 * this.canvas.height);  // x+16
    this.brush.fillText(
        'x', 0.318 * this.canvas.width, 0.710 * this.canvas.height);  // x+24
    this.brush.fillText(
        '1', 0.318 * this.canvas.width, 0.733 * this.canvas.height);  // x+34
  }

  draw2016toMUX() {
    this.brush.beginPath();
    this.brush.moveTo(0.266 * this.canvas.width, 0.586 * this.canvas.height);
    this.brush.lineTo(0.266 * this.canvas.width, 0.620 * this.canvas.height);
    this.brush.lineTo(0.296 * this.canvas.width, 0.620 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.296 * this.canvas.width, 0.620 * this.canvas.height);
  }

  signExtended() {
    this.brush.beginPath();
    this.brush.ellipse(
        0.406 * this.canvas.width, 0.820 * this.canvas.height,
        0.027 * this.canvas.width, 0.057 * this.canvas.height, 0, 0,
        2 * Math.PI);
    this.brush.stroke();

    this.brush.fillText(
        'Sign-', 0.392 * this.canvas.width, 0.813 * this.canvas.height);
    this.brush.fillText(
        'extended', 0.38 * this.canvas.width, 0.836 * this.canvas.height);
  }

  muxToWriteRegister() {
    if (this.audio)
      this.soundController.playSound(ttsConfig.muxToWriteRegister);

    this.brush.beginPath();
    this.brush.moveTo(0.343 * this.canvas.width, 0.666 * this.canvas.height);
    this.brush.lineTo(0.345 * this.canvas.width, 0.666 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.345 * this.canvas.width, 0.666 * this.canvas.height);
  }

  registers() {
    if (this.audio) this.soundController.playSound(ttsConfig.registers);

    this.brush.strokeRect(
        0.358 * this.canvas.width, 0.517 * this.canvas.height,
        0.118 * this.canvas.width, 0.229 * this.canvas.height);
    this.brush.fillText(
        'Read', 0.365 * this.canvas.width, 0.54 * this.canvas.height);
    this.brush.fillText(
        'register 1', 0.365 * this.canvas.width, 0.563 * this.canvas.height);

    this.brush.fillText(
        'Read', 0.365 * this.canvas.width, 0.586 * this.canvas.height);
    this.brush.fillText(
        'register 2', 0.365 * this.canvas.width, 0.609 * this.canvas.height);

    this.brush.fillText(
        'Write', 0.365 * this.canvas.width, 0.655 * this.canvas.height);
    this.brush.fillText(
        'register', 0.365 * this.canvas.width, 0.678 * this.canvas.height);

    this.brush.fillText(
        'Write', 0.365 * this.canvas.width, 0.717 * this.canvas.height);
    this.brush.fillText(
        'data', 0.365 * this.canvas.width, 0.74 * this.canvas.height);

    this.brush.fillText(
        'Read', 0.434 * this.canvas.width, 0.572 * this.canvas.height);
    this.brush.fillText(
        'data 1', 0.432 * this.canvas.width, 0.595 * this.canvas.height);

    this.brush.fillText(
        'Read', 0.434 * this.canvas.width, 0.664 * this.canvas.height);
    this.brush.fillText(
        'data 2', 0.432 * this.canvas.width, 0.687 * this.canvas.height);

    this.brush.fillText(
        'Registers', 0.405 * this.canvas.width, 0.735 * this.canvas.height);
  }

  shiftLeft2() {
    if (this.audio) this.soundController.playSound(ttsConfig.shiftLeft2);

    this.brush.beginPath();
    this.brush.ellipse(
        0.336 * this.canvas.width, 0.08 * this.canvas.height,
        0.026 * this.canvas.width, 0.041 * this.canvas.height, 0, 0,
        2 * Math.PI);
    this.brush.stroke();

    this.brush.fillText(
        'Shift', 0.32 * this.canvas.width, 0.071 * this.canvas.height);
    this.brush.fillText(
        'left 2', 0.318 * this.canvas.width, 0.098 * this.canvas.height);
  }

  regDst() {
    // change color
    var temp: string = this.brush.strokeStyle;
    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    if (this.audio) this.soundController.playSound(ttsConfig.regDst);

    this.brush.beginPath();
    this.brush.moveTo(0.374 * this.canvas.width, 0.252 * this.canvas.height);
    this.brush.lineTo(0.391 * this.canvas.width, 0.252 * this.canvas.height);
    this.brush.lineTo(0.391 * this.canvas.width, 0.195 * this.canvas.height);
    this.brush.lineTo(0.194 * this.canvas.width, 0.195 * this.canvas.height);
    this.brush.lineTo(0.194 * this.canvas.width, 0.758 * this.canvas.height);
    this.brush.lineTo(0.325 * this.canvas.width, 0.758 * this.canvas.height);
    this.brush.lineTo(0.325 * this.canvas.width, 0.748 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'RegDst', 0.397 * this.canvas.width, 0.248 * this.canvas.height);

    // change color

    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  jump() {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    if (this.audio) this.soundController.playSound(ttsConfig.jump);

    this.brush.beginPath();
    this.brush.moveTo(0.380 * this.canvas.width, 0.287 * this.canvas.height);
    this.brush.lineTo(0.499 * this.canvas.width, 0.287 * this.canvas.height);
    this.brush.lineTo(0.499 * this.canvas.width, 0.045 * this.canvas.height);
    this.brush.lineTo(0.948 * this.canvas.width, 0.045 * this.canvas.height);
    this.brush.lineTo(0.948 * this.canvas.width, 0.078 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'Jump', 0.398 * this.canvas.width, 0.275 * this.canvas.height);

    // change color

    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  readData1() {
    if (this.audio) this.soundController.playSound(ttsConfig.readData1);

    this.brush.beginPath();
    this.brush.moveTo(0.477 * this.canvas.width, 0.574 * this.canvas.height);
    this.brush.lineTo(0.574 * this.canvas.width, 0.574 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.574 * this.canvas.width, 0.574 * this.canvas.height);
  }

  readData2() {
    if (this.audio) this.soundController.playSound(ttsConfig.readData2);

    this.brush.beginPath();
    this.brush.moveTo(0.477 * this.canvas.width, 0.666 * this.canvas.height);
    this.brush.lineTo(0.518 * this.canvas.width, 0.666 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.518 * this.canvas.width, 0.666 * this.canvas.height);
  }

  readData2ToWriteData() {
    this.brush.beginPath();
    this.brush.moveTo(0.488 * this.canvas.width, 0.666 * this.canvas.height);
    this.brush.lineTo(0.488 * this.canvas.width, 0.758 * this.canvas.height);
    this.brush.lineTo(0.740 * this.canvas.width, 0.758 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.74 * this.canvas.width, 0.758 * this.canvas.height);
  }

  dataMemory() {
    if (this.audio) this.soundController.playSound(ttsConfig.dataMemory);

    this.brush.strokeRect(
        0.755 * this.canvas.width, 0.597 * this.canvas.height,
        0.118 * this.canvas.width, 0.29 * this.canvas.height);

    this.brush.fillText(
        'Address', 0.762 * this.canvas.width, 0.643 * this.canvas.height);

    this.brush.fillText(
        'Read', 0.829 * this.canvas.width, 0.636 * this.canvas.height);
    this.brush.fillText(
        'data', 0.835 * this.canvas.width, 0.659 * this.canvas.height);

    this.brush.fillText(
        'Write', 0.762 * this.canvas.width, 0.754 * this.canvas.height);
    this.brush.fillText(
        'data', 0.762 * this.canvas.width, 0.777 * this.canvas.height);

    this.brush.fillText(
        'Data', 0.822 * this.canvas.width, 0.770 * this.canvas.height);
    this.brush.fillText(
        'memory', 0.814 * this.canvas.width, 0.793 * this.canvas.height);
  }

  instruction50() {
    this.brush.beginPath();
    this.brush.moveTo(0.343 * this.canvas.width, 0.816 * this.canvas.height);
    this.brush.lineTo(0.343 * this.canvas.width, 0.931 * this.canvas.height);
    this.brush.lineTo(0.530 * this.canvas.width, 0.931 * this.canvas.height);
    this.brush.lineTo(0.530 * this.canvas.width, 0.839 * this.canvas.height);
    this.brush.lineTo(0.536 * this.canvas.width, 0.839 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.536 * this.canvas.width, 0.839 * this.canvas.height);

    this.brush.fillText(
        'Instruction [5-0]', 0.362 * this.canvas.width,
        0.912 * this.canvas.height);
  }

  ALUcontrol() {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    this.brush.beginPath();
    this.brush.ellipse(
        0.58 * this.canvas.width, 0.845 * this.canvas.height,
        0.032 * this.canvas.width, 0.064 * this.canvas.height, 0, 0,
        2 * Math.PI);
    this.brush.stroke();

    this.brush.fillText(
        'ALU', 0.565 * this.canvas.width, 0.843 * this.canvas.height);
    this.brush.fillText(
        'control', 0.56 * this.canvas.width, 0.866 * this.canvas.height);

    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  aluBottom() {
    if (this.audio) this.soundController.playSound(ttsConfig.aluBottom);

    this.brush.beginPath();
    this.brush.moveTo(0.588 * this.canvas.width, 0.528 * this.canvas.height);
    this.brush.lineTo(0.588 * this.canvas.width, 0.597 * this.canvas.height);
    this.brush.lineTo(0.602 * this.canvas.width, 0.620 * this.canvas.height);
    this.brush.lineTo(0.588 * this.canvas.width, 0.643 * this.canvas.height);
    this.brush.lineTo(0.588 * this.canvas.width, 0.712 * this.canvas.height);
    this.brush.lineTo(0.691 * this.canvas.width, 0.689 * this.canvas.height);
    this.brush.lineTo(0.691 * this.canvas.width, 0.574 * this.canvas.height);
    this.brush.lineTo(0.588 * this.canvas.width, 0.528 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'ALU', 0.614 * this.canvas.width, 0.632 * this.canvas.height);
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';
    this.brush.fillText(
        'Zero', 0.651 * this.canvas.width, 0.597 * this.canvas.height);

    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;

    this.brush.fillText(
        'ALU', 0.651 * this.canvas.width, 0.643 * this.canvas.height);
    this.brush.fillText(
        'result', 0.644 * this.canvas.width, 0.666 * this.canvas.height);
  }

  muxALU() {
    if (this.audio) this.soundController.playSound(ttsConfig.muxALU);

    this.brush.strokeRect(
        0.533 * this.canvas.width, 0.6 * this.canvas.height,
        0.028 * this.canvas.width, 0.137 * this.canvas.height);

    this.brush.fillText(
        '0', 0.540 * this.canvas.width, 0.640 * this.canvas.height);  // x
    this.brush.fillText(
        'M', 0.540 * this.canvas.width, 0.665 * this.canvas.height);  // x+9
    this.brush.fillText(
        'u', 0.540 * this.canvas.width, 0.686 * this.canvas.height);  // x+16
    this.brush.fillText(
        'x', 0.540 * this.canvas.width, 0.706 * this.canvas.height);  // x+24
    this.brush.fillText(
        '1', 0.540 * this.canvas.width, 0.728 * this.canvas.height);  // x+34
  }

  muxALUtoALUBottom() {
    if (this.audio) this.soundController.playSound(ttsConfig.muxALUtoALUBottom);

    this.brush.beginPath();
    this.brush.moveTo(0.561 * this.canvas.width, 0.689 * this.canvas.height);
    this.brush.lineTo(0.574 * this.canvas.width, 0.689 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.574 * this.canvas.width, 0.689 * this.canvas.height);
  }

  ALUbottomToAddress() {
    if (this.audio)
      this.soundController.playSound(ttsConfig.ALUbottomToAddress);

    this.brush.beginPath();
    this.brush.moveTo(0.691 * this.canvas.width, 0.643 * this.canvas.height);
    this.brush.lineTo(0.74 * this.canvas.width, 0.643 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.74 * this.canvas.width, 0.643 * this.canvas.height);
  }

  toMuxBottomRight() {
    if (this.audio) this.soundController.playSound(ttsConfig.toMuxBottomRight);

    this.brush.beginPath();
    this.brush.moveTo(0.711 * this.canvas.width, 0.643 * this.canvas.height);
    this.brush.lineTo(0.711 * this.canvas.width, 0.930 * this.canvas.height);
    this.brush.lineTo(0.888 * this.canvas.width, 0.930 * this.canvas.height);
    this.brush.lineTo(0.888 * this.canvas.width, 0.689 * this.canvas.height);
    this.brush.lineTo(0.896 * this.canvas.width, 0.689 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.896 * this.canvas.width, 0.689 * this.canvas.height);
  }

  readDataToMuxBottomRight() {
    if (this.audio)
      this.soundController.playSound(ttsConfig.readDataToMuxBottomRight);

    this.brush.beginPath();
    this.brush.moveTo(0.873 * this.canvas.width, 0.620 * this.canvas.height);
    this.brush.lineTo(0.896 * this.canvas.width, 0.620 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.896 * this.canvas.width, 0.620 * this.canvas.height);
  }

  bottomRightMux() {
    this.brush.strokeRect(
        0.906 * this.canvas.width, 0.590 * this.canvas.height,
        0.028 * this.canvas.width, 0.137 * this.canvas.height);

    this.brush.fillText(
        '1', 0.915 * this.canvas.width, 0.609 * this.canvas.height);
    this.brush.fillText(
        'M', 0.915 * this.canvas.width, 0.636 * this.canvas.height);
    this.brush.fillText(
        'u', 0.918 * this.canvas.width, 0.659 * this.canvas.height);
    this.brush.fillText(
        'x', 0.918 * this.canvas.width, 0.682 * this.canvas.height);
    this.brush.fillText(
        '0', 0.915 * this.canvas.width, 0.705 * this.canvas.height);
  }

  bottomRightMuxToWriteData() {
    if (this.audio)
      this.soundController.playSound(ttsConfig.bottomRightMuxToWriteData);

    this.brush.beginPath();
    this.brush.moveTo(0.934 * this.canvas.width, 0.659 * this.canvas.height);
    this.brush.lineTo(0.957 * this.canvas.width, 0.659 * this.canvas.height);
    this.brush.lineTo(0.957 * this.canvas.width, 0.965 * this.canvas.height);
    this.brush.lineTo(0.345 * this.canvas.width, 0.965 * this.canvas.height);
    this.brush.lineTo(0.345 * this.canvas.width, 0.724 * this.canvas.height);
    this.brush.lineTo(0.350 * this.canvas.width, 0.724 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.350 * this.canvas.width, 0.724 * this.canvas.height);
  }

  add4() {
    this.brush.beginPath();
    this.brush.moveTo(0.099 * this.canvas.width, 0.167 * this.canvas.height);
    this.brush.lineTo(0.111 * this.canvas.width, 0.167 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.111 * this.canvas.width, 0.167 * this.canvas.height);

    this.brush.fillText(
        '4', 0.087 * this.canvas.width, 0.172 * this.canvas.height);
  }

  signExtendToShiftLeftBottom() {
    if (this.audio)
      this.soundController.playSound(ttsConfig.signExtendToShiftLeftBottom);

    this.brush.beginPath();
    this.brush.moveTo(0.434 * this.canvas.width, 0.82 * this.canvas.height);
    this.brush.lineTo(0.508 * this.canvas.width, 0.82 * this.canvas.height);
    this.brush.lineTo(0.508 * this.canvas.width, 0.72 * this.canvas.height);
    this.brush.moveTo(0.465 * this.canvas.width, 0.812 * this.canvas.height);
    this.brush.lineTo(0.474 * this.canvas.width, 0.827 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        '32', 0.463 * this.canvas.width, 0.802 * this.canvas.height);
  }

  signExtendToMUX() {
    if (this.audio) this.soundController.playSound(ttsConfig.signExtendToMUX);

    this.brush.beginPath();
    this.brush.moveTo(0.508 * this.canvas.width, 0.72 * this.canvas.height);
    this.brush.lineTo(0.52 * this.canvas.width, 0.72 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.52 * this.canvas.width, 0.72 * this.canvas.height);
  }

  toShiftLeft2() {
    this.brush.beginPath();
    this.brush.moveTo(0.508 * this.canvas.width, 0.72 * this.canvas.height);
    this.brush.lineTo(0.508 * this.canvas.width, 0.268 * this.canvas.height);
    this.brush.lineTo(0.522 * this.canvas.width, 0.268 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.522 * this.canvas.width, 0.268 * this.canvas.height);
  }

  shiftLeftBottom() {
    /// if (this.audio)
    /// this.soundController.playSound(ttsConfig.shiftLeftBottom);

    this.brush.beginPath();
    this.brush.ellipse(
        0.552 * this.canvas.width, 0.27 * this.canvas.height,
        0.035 * this.canvas.height, 0.041 * this.canvas.height, 0, 0,
        2 * Math.PI);
    this.brush.stroke();

    this.brush.fillText(
        'Shift', 0.544 * this.canvas.width, 0.265 * this.canvas.height);
    this.brush.fillText(
        'left 2', 0.544 * this.canvas.width, 0.285 * this.canvas.height);
  }

  HalfCircle() {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    this.brush.beginPath();
    this.brush.moveTo(0.77 * this.canvas.width, 0.333 * this.canvas.height);
    this.brush.lineTo(0.755 * this.canvas.width, 0.333 * this.canvas.height);
    this.brush.lineTo(0.755 * this.canvas.width, 0.268 * this.canvas.height);
    this.brush.lineTo(0.77 * this.canvas.width, 0.268 * this.canvas.height);
    this.brush.arc(
        0.77 * this.canvas.width, 0.301 * this.canvas.height,
        0.0321 * this.canvas.height, 1.5 * Math.PI, Math.PI / 2);
    this.brush.stroke();


    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  zeroToHalfCircle() {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';
    this.brush.beginPath();
    this.brush.moveTo(0.691 * this.canvas.width, 0.586 * this.canvas.height);
    this.brush.lineTo(0.718 * this.canvas.width, 0.586 * this.canvas.height);
    this.brush.lineTo(0.718 * this.canvas.width, 0.321 * this.canvas.height);
    this.brush.lineTo(0.755 * this.canvas.width, 0.321 * this.canvas.height);
    this.brush.stroke();

    // change color
    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  branch() {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    if (this.audio) this.soundController.playSound(ttsConfig.branch);

    this.brush.beginPath();
    this.brush.moveTo(0.385 * this.canvas.width, 0.314 * this.canvas.height);
    this.brush.lineTo(0.696 * this.canvas.width, 0.314 * this.canvas.height);
    this.brush.lineTo(0.696 * this.canvas.width, 0.275 * this.canvas.height);
    this.brush.lineTo(0.755 * this.canvas.width, 0.275 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'Branch', 0.398 * this.canvas.width, 0.31 * this.canvas.height);
    // change color

    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  halfCircleToMux() {
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    this.brush.beginPath();
    this.brush.moveTo(0.785 * this.canvas.width, 0.298 * this.canvas.height);
    this.brush.lineTo(0.82 * this.canvas.width, 0.298 * this.canvas.height);
    this.brush.lineTo(0.82 * this.canvas.width, 0.229 * this.canvas.height);
    this.brush.stroke();

    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  halfCircleMUX() {
    this.brush.strokeRect(
        0.807 * this.canvas.width, 0.093 * this.canvas.height,
        0.028 * this.canvas.width, 0.137 * this.canvas.height);

    this.brush.fillText(
        '0', 0.817 * this.canvas.width, 0.115 * this.canvas.height);
    this.brush.fillText(
        'M', 0.819 * this.canvas.width, 0.143 * this.canvas.height);
    this.brush.fillText(
        'u', 0.820 * this.canvas.width, 0.166 * this.canvas.height);
    this.brush.fillText(
        'x', 0.820 * this.canvas.width, 0.189 * this.canvas.height);
    this.brush.fillText(
        '1', 0.817 * this.canvas.width, 0.212 * this.canvas.height);
  }

  memRead() {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    if (this.audio) this.soundController.playSound(ttsConfig.memRead);

    this.brush.beginPath();
    this.brush.moveTo(0.386 * this.canvas.width, 0.342 * this.canvas.height);
    this.brush.lineTo(0.980 * this.canvas.width, 0.342 * this.canvas.height);
    this.brush.lineTo(0.980 * this.canvas.width, 0.950 * this.canvas.height);
    this.brush.lineTo(0.814 * this.canvas.width, 0.950 * this.canvas.height);
    this.brush.lineTo(0.814 * this.canvas.width, 0.887 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'MemRead', 0.398 * this.canvas.width, 0.337 * this.canvas.height);

    // change color
    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  memToReg() {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    if (this.audio) this.soundController.playSound(ttsConfig.memToReg);

    this.brush.beginPath();
    this.brush.moveTo(0.386 * this.canvas.width, 0.37 * this.canvas.height);
    this.brush.lineTo(0.920 * this.canvas.width, 0.37 * this.canvas.height);
    this.brush.lineTo(0.920 * this.canvas.width, 0.59 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'MemToReg', 0.398 * this.canvas.width, 0.365 * this.canvas.height);
    // change color

    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  aluOp(str: string) {
    if (this.audio) this.soundController.playSound(ttsConfig.aluOp);

    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    this.brush.beginPath();
    this.brush.moveTo(0.385 * this.canvas.width, 0.397 * this.canvas.height);
    this.brush.lineTo(0.497 * this.canvas.width, 0.397 * this.canvas.height);
    this.brush.lineTo(0.497 * this.canvas.width, 0.954 * this.canvas.height);
    this.brush.lineTo(0.582 * this.canvas.width, 0.954 * this.canvas.height);
    this.brush.lineTo(0.582 * this.canvas.width, 0.908 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'ALUOp', 0.398 * this.canvas.width, 0.393 * this.canvas.height);
    // change color
    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;

    this.brush.fillText(
        str, 0.588 * this.canvas.width, 0.931 * this.canvas.height);
  }

  memWrite() {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    if (this.audio) this.soundController.playSound(ttsConfig.memWrite);

    this.brush.beginPath();
    this.brush.moveTo(0.382 * this.canvas.width, 0.425 * this.canvas.height);
    this.brush.lineTo(0.814 * this.canvas.width, 0.425 * this.canvas.height);
    this.brush.lineTo(0.814 * this.canvas.width, 0.600 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'MemWrite', 0.398 * this.canvas.width, 0.42 * this.canvas.height);

    // change color
    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  aluSrc() {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    if (this.audio) this.soundController.playSound(ttsConfig.aluSrc);

    this.brush.beginPath();
    this.brush.moveTo(0.376 * this.canvas.width, 0.452 * this.canvas.height);
    this.brush.lineTo(0.548 * this.canvas.width, 0.452 * this.canvas.height);
    this.brush.lineTo(0.548 * this.canvas.width, 0.601 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'ALUSrc', 0.398 * this.canvas.width, 0.448 * this.canvas.height);

    // change color
    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  regWrite() {
    // change color
    var temp: string = this.brush.strokeStyle;

    this.brush.strokeStyle = '#006eca';
    this.brush.fillStyle = '#006eca';

    if (this.audio) this.soundController.playSound(ttsConfig.regWrite);

    this.brush.beginPath();
    this.brush.moveTo(0.365 * this.canvas.width, 0.480 * this.canvas.height);
    this.brush.lineTo(0.414 * this.canvas.width, 0.480 * this.canvas.height);
    this.brush.lineTo(0.414 * this.canvas.width, 0.519 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'RegWrite', 0.398 * this.canvas.width, 0.475 * this.canvas.height);

    // change color
    this.brush.strokeStyle = temp;
    this.brush.fillStyle = temp;
  }

  aluControlToAluBottom() {
    this.brush.beginPath();
    this.brush.moveTo(0.611 * this.canvas.width, 0.839 * this.canvas.height);
    this.brush.lineTo(0.637 * this.canvas.width, 0.839 * this.canvas.height);
    this.brush.lineTo(0.637 * this.canvas.width, 0.701 * this.canvas.height);
    this.brush.stroke();
  }

  jumpAddress310() {
    if (this.audio) this.soundController.playSound(ttsConfig.jumpAddress310);

    this.brush.beginPath();
    this.brush.moveTo(0.40 * this.canvas.width, 0.062 * this.canvas.height);
    this.brush.lineTo(0.888 * this.canvas.width, 0.062 * this.canvas.height);
    this.brush.lineTo(0.888 * this.canvas.width, 0.085 * this.canvas.height);
    this.brush.lineTo(0.918 * this.canvas.width, 0.085 * this.canvas.height);

    this.brush.stroke();

    this.drawArrow(0.918 * this.canvas.width, 0.085 * this.canvas.height);
  }

  fromJumpAddress() {
    this.brush.moveTo(0.360 * this.canvas.width, 0.062 * this.canvas.height);
    this.brush.lineTo(0.400 * this.canvas.width, 0.062 * this.canvas.height);

    this.brush.moveTo(0.365 * this.canvas.width, 0.052 * this.canvas.height);
    this.brush.lineTo(0.373 * this.canvas.width, 0.073 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'Jump address [31-0]', 0.36 * this.canvas.width,
        0.045 * this.canvas.height);
  }

  addToJumpAddress() {
    this.brush.beginPath();
    this.brush.moveTo(0.162 * this.canvas.width, 0.144 * this.canvas.height);
    this.brush.lineTo(0.266 * this.canvas.width, 0.144 * this.canvas.height);
    this.brush.lineTo(0.266 * this.canvas.width, 0.131 * this.canvas.height);
    this.brush.lineTo(0.400 * this.canvas.width, 0.131 * this.canvas.height);
    this.brush.lineTo(0.400 * this.canvas.width, 0.062 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'PC+4[31-28]', 0.405 * this.canvas.width, 0.134 * this.canvas.height);
  }

  addToMux() {
    this.brush.beginPath();
    this.brush.moveTo(0.162 * this.canvas.width, 0.144 * this.canvas.height);
    this.brush.lineTo(0.555 * this.canvas.width, 0.144 * this.canvas.height);
    this.brush.lineTo(0.555 * this.canvas.width, 0.087 * this.canvas.height);
    this.brush.lineTo(0.801 * this.canvas.width, 0.087 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.801 * this.canvas.width, 0.087 * this.canvas.height);
  }

  aluTop() {
    if (this.audio) this.soundController.playSound(ttsConfig.aluTop);

    this.brush.beginPath();
    this.brush.moveTo(0.607 * this.canvas.width, 0.103 * this.canvas.height);
    this.brush.lineTo(0.607 * this.canvas.width, 0.172 * this.canvas.height);
    this.brush.lineTo(0.622 * this.canvas.width, 0.195 * this.canvas.height);
    this.brush.lineTo(0.607 * this.canvas.width, 0.218 * this.canvas.height);
    this.brush.lineTo(0.607 * this.canvas.width, 0.287 * this.canvas.height);
    this.brush.lineTo(0.711 * this.canvas.width, 0.268 * this.canvas.height);
    this.brush.lineTo(0.711 * this.canvas.width, 0.149 * this.canvas.height);
    this.brush.lineTo(0.607 * this.canvas.width, 0.103 * this.canvas.height);
    this.brush.stroke();

    this.brush.fillText(
        'Add', 0.629 * this.canvas.width, 0.206 * this.canvas.height);
    this.brush.fillText(
        'ALU', 0.674 * this.canvas.width, 0.195 * this.canvas.height);
    this.brush.fillText(
        'result', 0.666 * this.canvas.width, 0.218 * this.canvas.height);
  }

  shiftLeft2ToALUTop() {
    this.brush.beginPath();
    this.brush.moveTo(0.568 * this.canvas.width, 0.268 * this.canvas.height);
    this.brush.lineTo(0.594 * this.canvas.width, 0.268 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.594 * this.canvas.width, 0.268 * this.canvas.height);
  }

  intoALUTop() {
    this.brush.beginPath();
    this.brush.moveTo(0.555 * this.canvas.width, 0.126 * this.canvas.height);
    this.brush.lineTo(0.594 * this.canvas.width, 0.126 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.594 * this.canvas.width, 0.126 * this.canvas.height);
  }

  topALUToMux() {
    this.brush.beginPath();
    this.brush.moveTo(0.711 * this.canvas.width, 0.195 * this.canvas.height);
    this.brush.lineTo(0.8 * this.canvas.width, 0.195 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.8 * this.canvas.width, 0.195 * this.canvas.height);
  }

  muxToMux() {
    this.brush.beginPath();
    this.brush.moveTo(0.836 * this.canvas.width, 0.197 * this.canvas.height);
    this.brush.lineTo(0.922 * this.canvas.width, 0.197 * this.canvas.height);
    this.brush.stroke();
    this.drawArrow(0.922 * this.canvas.width, 0.197 * this.canvas.height);
  }

  ToJumpAddress() {
    this.brush.beginPath();
    this.brush.moveTo(0.266 * this.canvas.width, 0.144 * this.canvas.height);
    this.brush.lineTo(0.266 * this.canvas.width, 0.131 * this.canvas.height);
    this.brush.lineTo(0.400 * this.canvas.width, 0.131 * this.canvas.height);
    this.brush.lineTo(0.400 * this.canvas.width, 0.062 * this.canvas.height);
    this.brush.stroke();
  }

  toMux() {
    this.brush.beginPath();
    this.brush.moveTo(0.555 * this.canvas.width, 0.124 * this.canvas.height);
    this.brush.lineTo(0.555 * this.canvas.width, 0.087 * this.canvas.height);
    this.brush.lineTo(0.801 * this.canvas.width, 0.087 * this.canvas.height);
    this.brush.stroke();
    this.drawArrow(0.801 * this.canvas.width, 0.087 * this.canvas.height);
  }

  fromALUResult() {
    this.brush.beginPath();
    this.brush.moveTo(0.691 * this.canvas.width, 0.643 * this.canvas.height);
    this.brush.lineTo(0.711 * this.canvas.width, 0.643 * this.canvas.height);
    this.brush.stroke();
  }


  addToMux_1() {
    this.brush.beginPath();
    this.brush.moveTo(0.162 * this.canvas.width, 0.144 * this.canvas.height);
    this.brush.lineTo(0.555 * this.canvas.width, 0.144 * this.canvas.height);
    this.brush.lineTo(0.555 * this.canvas.width, 0.126 * this.canvas.height);
    this.brush.moveTo(0.555 * this.canvas.width, 0.126 * this.canvas.height);
    this.brush.lineTo(0.594 * this.canvas.width, 0.126 * this.canvas.height);
    this.brush.stroke();

    this.drawArrow(0.594 * this.canvas.width, 0.126 * this.canvas.height);

    // this.brush.lineTo(0.555 * this.canvas.width, 0.087 * this.canvas.height);
    // this.brush.lineTo(0.801 * this.canvas.width, 0.087 * this.canvas.height);
    // this.brush.stroke();
    // this.drawArrow(0.801 * this.canvas.width, 0.087 * this.canvas.height);
  }


  drawArrow(x: number, y: number) {
    this.brush.beginPath();
    this.brush.moveTo(x, y - 4);
    this.brush.lineTo(x + 7, y);
    this.brush.lineTo(x, y + 4);
    this.brush.lineTo(x, y - 4);
    this.brush.stroke();
    this.brush.fill();
  }


  drawFrame(
      func: Function, stringALU: string, type: string,
      instructionAndArguments: string[]) {
    // need to implenet a lookup table thing that converts
    // instructionAndArguments into hex/binary
    // stringALU: string, instruction3126: string, instruction2521: string,
    // instruction2016: string, instruction1511: string, instruction150: string,
    // instruction250: string

    this.brush.strokeStyle = this.color;
    this.brush.fillStyle = this.color;

    this.setLineWidth(4);

    var instruction3126: string;
    var instruction2521: string;
    var instruction2016: string;
    var instruction1511: string;
    var instruction150: string;
    var instruction250: string;

    if (type == 'Itype' || type == 'beq') {
      // wow
      // console.log("0 ->" + instructionAndArguments[0]);
      // console.log("\n1 ->" + instructionAndArguments[1]);
      // console.log("\n2 ->" + instructionAndArguments[2]);
      // console.log("\n3 ->" + instructionAndArguments[3]);

      instruction3126 = instructionAndArguments[0];  // for instruction
      instruction2521 = instructionAndArguments[2];  // first argument
      instruction2016 = instructionAndArguments[1];
      // might need to switch 2 and 1
      instruction1511 = '';
      instruction150 = instructionAndArguments[3];
      instruction250 = '';

    } else if (type == 'lw' || type == 'sw' || type == 'lb' || type == 'sb') {
    //   console.log('0 ->' + instructionAndArguments[0]);
    //   console.log('\n1 ->' + instructionAndArguments[1]);
    //   console.log('\n2 ->' + instructionAndArguments[2]);
    //   console.log('\n3 ->' + instructionAndArguments[3]);

      var secondString = instructionAndArguments[2];

      var endIndex = secondString.indexOf('(');

      var arrayName: string = '';

      for (var i = 0; i < endIndex; i++) {
        arrayName += secondString.charAt(i);
      }

      var registerForIndex: string = '';

      for (var i = endIndex + 1; i < secondString.length - 1; i++) {
        registerForIndex += secondString.charAt(i);
      }

      var registerInsedeBrackets: string = registerForIndex;


      instruction3126 = instructionAndArguments[0];  // for instruction
      instruction2521 = registerInsedeBrackets;
      instruction2016 = instructionAndArguments[1];
      instruction1511 = '';
      instruction150 = arrayName;
      instruction250 = '';

    } else if (type == 'Rtype') {
      instruction3126 = instructionAndArguments[0];  // for instruction
      instruction2521 = instructionAndArguments[2];
      instruction2016 = instructionAndArguments[3];
      instruction1511 = instructionAndArguments[1];
      instruction150 = '';
      instruction250 = '';

    } else if (type == 'j') {
      instruction3126 = instructionAndArguments[0];  // for instruction
      instruction2521 = '';
      instruction2016 = '';
      instruction1511 = '';
      instruction150 = '';
      instruction250 = instructionAndArguments[1];
    }

    func(
        stringALU, instruction3126, instruction2521, instruction2016,
        instruction1511, instruction150, instruction250);
  }

  drawDefault() {
    this.setLineWidth(this.defaultLineWidth);

    // this.draw(new TypeObject("", [], [], "", [])); // i know this isnt the
    // best way to do this but sorry
    this.setUpCanvas();
  }

  draw(typeobject: TypeObject) {
    var str = typeobject.stringALU;

    this.setUpCanvas();

    this.setLineWidth(4);


    // draws animation

    for (var i = 0; i < typeobject.functionsArray.length; i++) {
      this.animator.animatePath(
          typeobject.functionsArray[i], str, this.animationSpeed * i);
    }
  }

  setLineWidth(lineWidth: number) {
    if (lineWidth <= 0 || lineWidth > 4) return;

    this.lineWidth = lineWidth;
    this.brush.lineWidth = this.lineWidth;
  }

  setUpCanvas() {
    // this.brush.strokeStyle = '#CAE1FF';
    // this.brush.fillStyle = '#CAE1FF';

    this.setAudio(false);

    this.brush.strokeStyle = this.defaultColor;
    this.brush.fillStyle = this.defaultColor;

    this.brush.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // clears canvas

    this.setLineWidth(this.defaultLineWidth);

    // draws everything normally
    this.MuxToPC();
    this.PC();
    this.fromPC();
    this.toADD();
    this.drawADD();
    this.topRightMUX();
    this.readAddress();
    this.fromReadAddress();
    this.instruction2016('', '', '', '', '', '', '');

    this.instruction2521('', '', '', '', '', '', '');
    this.instruction3126('', '', '', '', '', '', '');
    this.instruction1511('', '', '', '', '', '', '');
    this.instruction150('', '', '', '', '', '', '');
    this.instruction250('', '', '', '', '', '', '');
    this.drawControl();
    this.drawMUX1511();
    this.draw2016toMUX();
    this.signExtended();
    this.muxToWriteRegister();
    this.registers();
    this.shiftLeft2();
    this.regDst();
    this.jump();
    this.readData1();
    this.readData2();
    this.readData2ToWriteData();
    this.dataMemory();
    this.instruction50();
    this.ALUcontrol();
    this.aluBottom();
    this.muxALU();
    this.muxALUtoALUBottom();
    this.ALUbottomToAddress();
    this.toMuxBottomRight();
    this.readDataToMuxBottomRight();
    this.bottomRightMux();
    this.bottomRightMuxToWriteData();
    this.add4();
    this.signExtendToShiftLeftBottom();
    this.shiftLeftBottom();
    this.HalfCircle();
    this.zeroToHalfCircle();
    this.branch();
    this.halfCircleToMux();
    this.halfCircleMUX();
    this.memRead();
    this.memToReg();
    this.aluOp('');
    this.memWrite();
    this.aluSrc();
    this.regWrite();
    this.aluControlToAluBottom();
    this.jumpAddress310();
    this.addToJumpAddress();
    this.addToMux();
    this.aluTop();
    this.shiftLeft2ToALUTop();
    this.intoALUTop();
    this.topALUToMux();


    // new Lines
    this.instruction2016_1();
    this.muxToMux();
    this.signExtendToMUX();
    this.fromJumpAddress();
    this.toShiftLeft2();
    this.ToJumpAddress();
    this.toMux();
    this.fromALUResult();

    // change color
    this.brush.strokeStyle = this.color;
    this.brush.fillStyle = this.color;
  }
}
