/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var HTMLHandler_1 = __webpack_require__(7);
var Animator_1 = __webpack_require__(0);
var InputHandler_1 = __webpack_require__(8);
var DrawingClass_1 = __webpack_require__(6);
var TypeObject_1 = __webpack_require__(1);
var MIPS_1 = __webpack_require__(9);
var Validator_1 = __webpack_require__(15);
var Console_1 = __webpack_require__(5);
var ThemeManager_1 = __webpack_require__(14);
var SoundController_1 = __webpack_require__(13);
var ProgramLoader_1 = __webpack_require__(12);
var MainController = (function () {
    function MainController() {
        this.fullScreen = false;
        this.HTMLHandler = new HTMLHandler_1.HTMLHandler();
        this.soundController = new SoundController_1.SoundController();
        this.animator = new Animator_1.Animator();
        this.iterationIndex = 0;
        this.drawingObject = new DrawingClass_1.DrawingClass(this.HTMLHandler, this.soundController);
        this.typeObjectArray = this.drawingObject.getTypeObjectArray();
        this.mipsObject = new MIPS_1.MIPS(this.typeObjectArray);
        this.inputHandler = new InputHandler_1.InputHandler(this.typeObjectArray, this.mipsObject);
        this.console = new Console_1.Console();
        this.validator = new Validator_1.Validator(this.typeObjectArray, this.inputHandler, this.console);
        this.inputHandler.initValidator(this.validator);
        this.frameIndex = 0;
        this.HTMLHandler.hidePreviousButton();
        this.themeManager = new ThemeManager_1.ThemeManager(this.HTMLHandler, this.drawingObject, this.mipsObject);
        this.programLoader = new ProgramLoader_1.ProgramLoader(this.HTMLHandler.textArea);
        console.log("Main Controller constructed");
    }
    MainController.prototype.setFullScreenMode = function () {
        if (!this.fullScreen) {
            var width = window.innerWidth;
            var height = window.innerHeight;
            var canvasWidth = 0;
            var canvasHeight = 0;
            if ((width / height) < 1.7) {
                canvasWidth = window.innerWidth * 0.87;
                canvasHeight = window.innerHeight * 0.65;
                this.HTMLHandler.registersTable.style.right = "2%";
                this.HTMLHandler.canvas.style.left = "2%";
            }
            else {
                canvasWidth = window.innerWidth * 0.78;
                canvasHeight = window.innerHeight * 0.68;
                this.HTMLHandler.registersTable.style.right = "7%";
                this.HTMLHandler.canvas.style.left = "3%";
            }
            this.drawingObject.canvas.width = canvasWidth;
            this.drawingObject.canvas.height = canvasHeight;
            this.fullScreen = !this.fullScreen;
            this.HTMLHandler.fullScreenMode(true);
            this.drawingObject.brush.font = "12px Arial";
            this.drawingObject.draw(new TypeObject_1.TypeObject("", [], [], "", []));
            this.redrawFrames();
        }
        else {
            var width = window.innerWidth;
            var height = window.innerHeight;
            var canvasWidth = 0;
            var canvasHeight = 0;
            if ((width / height) < 1.7) {
                canvasWidth = window.innerWidth * 0.64;
                canvasHeight = window.innerHeight * 0.52;
                this.HTMLHandler.registersTable.style.right = "2%";
                this.HTMLHandler.canvas.style.left = "24%";
            }
            else {
                canvasWidth = window.innerWidth * 0.57;
                canvasHeight = window.innerHeight * 0.57;
                this.HTMLHandler.registersTable.style.right = "7%";
                this.HTMLHandler.canvas.style.left = "24%";
            }
            this.drawingObject.canvas.width = canvasWidth;
            this.drawingObject.canvas.height = canvasHeight;
            this.drawingObject.brush.font = "10px Arial";
            this.fullScreen = !this.fullScreen;
            this.HTMLHandler.fullScreenMode(false);
            this.drawingObject.draw(new TypeObject_1.TypeObject("", [], [], "", []));
            this.redrawFrames();
        }
    };
    MainController.prototype.updateColor = function () {
        if (this.HTMLHandler.changeColorButton.getAttribute("disabled") == "true")
            return;
        var currentColor = document.getElementById("changeColorButton").style.background;
        if (currentColor == "")
            currentColor = "#ffff66";
        this.drawingObject.setColor(currentColor);
        this.mipsObject.setHighLightColor(currentColor);
        this.mipsObject.highLightRegister();
        this.redrawFrames();
    };
    MainController.prototype.redrawFrames = function () {
        this.drawingObject.setAudio(false);
        this.drawingObject.setUpCanvas();
        if (this.listInOrder == undefined)
            return;
        var tempFramesArray = this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray;
        for (var i = 0; i < this.frameIndex; i++) {
            this.drawingObject.drawFrame(tempFramesArray[i], this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).stringALU, this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).type, this.listInOrder[this.iterationIndex]);
        }
    };
    MainController.prototype.drawEverything = function () {
        this.drawingObject.drawDefault();
        this.HTMLHandler.emptyDetailedTable();
        this.updateButtons();
    };
    MainController.prototype.runAll = function () {
        if (this.listInOrder == undefined)
            this.updateInOrderList();
        this.mipsObject.reset();
        this.mipsObject.loadMemory(this.inputHandler.getDataList());
        this.HTMLHandler.hideTextArea();
        this.HTMLHandler.hideChangeColorButton();
        this.HTMLHandler.hideEditButton();
        this.HTMLHandler.hideNextButton();
        this.HTMLHandler.hidePreviousButton();
        this.HTMLHandler.hideRunButton();
        this.HTMLHandler.hideEditButton();
        if (!this.validator.isItAllValid()) {
            this.updateButtons();
            return;
        }
        var functionReference = this.drawingObject.runInstruction.bind(this);
        var timeForNextInstruction = 0;
        var difference = 0;
        var totalTime = 0;
        for (var i = 0; i < this.listInOrder.length; i++) {
            difference = this.drawingObject.runInstruction(this.listInOrder[i][0], timeForNextInstruction);
            var instructionAndArguments = this.listInOrder[i];
            timeForNextInstruction += difference;
            totalTime += difference;
        }
        for (var i = 0; i < this.listInOrder.length; i++) {
            this.mipsObject.run(this.listInOrder[i]);
        }
        this.mipsObject.highLightNonZero();
        this.animator.aniamte(function () {
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
    };
    MainController.prototype.getNextFrame = function () {
        var instrustionList = this.inputHandler.getInstructionsList(false);
        if (this.frameIndex == this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray.length) {
            if (this.iterationIndex + 1 < this.listInOrder.length) {
                this.iterationIndex++;
                this.frameIndex = 0;
                this.drawingObject.drawDefault();
            }
        }
        console.log("frameIndex = " + this.frameIndex);
        console.log(" iteration index = " + this.iterationIndex + " listInOrder length = " + (this.listInOrder.length - 1));
        console.log(" max frame = " + (this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray.length - 1));
        return this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray[this.frameIndex++];
    };
    MainController.prototype.updateInOrderList = function () {
        if (!this.validator.isItAllValid())
            return;
        this.listInOrder = this.inputHandler.instructionsAndArgumentsInOrder();
    };
    MainController.prototype.runNext = function () {
        if (this.listInOrder == undefined) {
            this.updateInOrderList();
            return;
        }
        if (!this.HTMLHandler.textArea.getAttribute("disabled"))
            this.HTMLHandler.hideTextArea();
        this.drawingObject.setAudio(true);
        this.drawingObject.drawFrame(this.getNextFrame(), this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).stringALU, this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).type, this.listInOrder[this.iterationIndex]);
        if (this.frameIndex - 1 == 0) {
            this.mipsObject.run(this.listInOrder[this.iterationIndex]);
        }
        this.HTMLHandler.updateDetailedTable(this.listInOrder[this.iterationIndex][0], this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).controlSingals);
        this.updateButtons();
    };
    MainController.prototype.getPreviousFrame = function () {
        var instrustionList = this.inputHandler.getInstructionsList(false);
        if (this.frameIndex == 0) {
            if (this.iterationIndex - 1 >= 0) {
                this.iterationIndex--;
                this.frameIndex = 1;
            }
        }
        return this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray[this.frameIndex--];
    };
    MainController.prototype.runPrevious = function () {
        if (this.frameIndex == 1 && this.iterationIndex == 0) {
            this.frameIndex = 0;
            this.mipsObject.reset();
            this.listInOrder = undefined;
            this.console.clear();
            this.HTMLHandler.instructionAndArguments.value = "";
            this.drawEverything();
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
                this.frameIndex = this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray.length;
            }
        }
        this.drawingObject.drawDefault();
        var tempFramesArray = this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray;
        this.drawingObject.setAudio(false);
        for (var i = 0; i < this.frameIndex; i++) {
            if (i == this.frameIndex - 1)
                this.drawingObject.setAudio(true);
            this.drawingObject.drawFrame(tempFramesArray[i], this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).stringALU, this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).type, this.listInOrder[this.iterationIndex]);
        }
        this.HTMLHandler.updateDetailedTable(this.listInOrder[this.iterationIndex][0], this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).controlSingals);
        this.updateButtons();
    };
    MainController.prototype.edit = function () {
        this.iterationIndex = 0;
        this.frameIndex = 0;
        this.HTMLHandler.showTextArea();
        this.updateButtons();
        this.frameIndex = 0;
        this.mipsObject.reset();
        this.listInOrder = undefined;
        this.console.clear();
        this.HTMLHandler.instructionAndArguments.value = "";
        setTimeout(function () { this.HTMLHandler.textArea.focus(); }.bind(this), 50);
        this.drawEverything();
        return;
    };
    MainController.prototype.getTypeObjecet = function (instruction) {
        for (var i = 0; i < this.typeObjectArray.length; i++) {
            if (this.typeObjectArray[i].isThisType(instruction))
                return this.typeObjectArray[i];
        }
        console.log("it actually happened!");
        return null;
    };
    MainController.prototype.updateButtons = function () {
        if (this.iterationIndex == 0 && this.frameIndex == 0)
            this.HTMLHandler.hidePreviousButton();
        else
            this.HTMLHandler.showPreviousButton();
        if (this.listInOrder == undefined)
            return;
        if (this.iterationIndex == this.listInOrder.length - 1 &&
            this.frameIndex == this.getTypeObjecet(this.listInOrder[this.iterationIndex][0]).functionsArray.length)
            this.HTMLHandler.hideNextButton();
        else
            this.HTMLHandler.showNextButton();
        if (this.console.textarea.style.color == 'red')
            this.HTMLHandler.showEditButton();
    };
    return MainController;
}());
exports.MainController = MainController;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (!window.jscolor) {
    window.jscolor = (function () {
        var jsc = {
            register: function () {
                jsc.attachDOMReadyEvent(jsc.init);
                jsc.attachEvent(document, 'mousedown', jsc.onDocumentMouseDown);
                jsc.attachEvent(document, 'touchstart', jsc.onDocumentTouchStart);
                jsc.attachEvent(window, 'resize', jsc.onWindowResize);
            },
            init: function () {
                if (jsc.jscolor.lookupClass) {
                    jsc.jscolor.installByClassName(jsc.jscolor.lookupClass);
                }
            },
            tryInstallOnElements: function (elms, className) {
                var matchClass = new RegExp('(^|\\s)(' + className + ')(\\s*(\\{[^}]*\\})|\\s|$)', 'i');
                for (var i = 0; i < elms.length; i += 1) {
                    if (elms[i].type !== undefined && elms[i].type.toLowerCase() == 'color') {
                        if (jsc.isColorAttrSupported) {
                            continue;
                        }
                    }
                    var m;
                    if (!elms[i].jscolor && elms[i].className && (m = elms[i].className.match(matchClass))) {
                        var targetElm = elms[i];
                        var optsStr = null;
                        var dataOptions = jsc.getDataAttr(targetElm, 'jscolor');
                        if (dataOptions !== null) {
                            optsStr = dataOptions;
                        }
                        else if (m[4]) {
                            optsStr = m[4];
                        }
                        var opts = {};
                        if (optsStr) {
                            try {
                                opts = (new Function('return (' + optsStr + ')'))();
                            }
                            catch (eParseError) {
                                jsc.warn('Error parsing jscolor options: ' + eParseError + ':\n' + optsStr);
                            }
                        }
                        targetElm.jscolor = new jsc.jscolor(targetElm, opts);
                    }
                }
            },
            isColorAttrSupported: (function () {
                var elm = document.createElement('input');
                if (elm.setAttribute) {
                    elm.setAttribute('type', 'color');
                    if (elm.type.toLowerCase() == 'color') {
                        return true;
                    }
                }
                return false;
            })(),
            isCanvasSupported: (function () {
                var elm = document.createElement('canvas');
                return !!(elm.getContext && elm.getContext('2d'));
            })(),
            fetchElement: function (mixed) {
                return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
            },
            isElementType: function (elm, type) {
                return elm.nodeName.toLowerCase() === type.toLowerCase();
            },
            getDataAttr: function (el, name) {
                var attrName = 'data-' + name;
                var attrValue = el.getAttribute(attrName);
                if (attrValue !== null) {
                    return attrValue;
                }
                return null;
            },
            attachEvent: function (el, evnt, func) {
                if (el.addEventListener) {
                    el.addEventListener(evnt, func, false);
                }
                else if (el.attachEvent) {
                    el.attachEvent('on' + evnt, func);
                }
            },
            detachEvent: function (el, evnt, func) {
                if (el.removeEventListener) {
                    el.removeEventListener(evnt, func, false);
                }
                else if (el.detachEvent) {
                    el.detachEvent('on' + evnt, func);
                }
            },
            _attachedGroupEvents: {},
            attachGroupEvent: function (groupName, el, evnt, func) {
                if (!jsc._attachedGroupEvents.hasOwnProperty(groupName)) {
                    jsc._attachedGroupEvents[groupName] = [];
                }
                jsc._attachedGroupEvents[groupName].push([el, evnt, func]);
                jsc.attachEvent(el, evnt, func);
            },
            detachGroupEvents: function (groupName) {
                if (jsc._attachedGroupEvents.hasOwnProperty(groupName)) {
                    for (var i = 0; i < jsc._attachedGroupEvents[groupName].length; i += 1) {
                        var evt = jsc._attachedGroupEvents[groupName][i];
                        jsc.detachEvent(evt[0], evt[1], evt[2]);
                    }
                    delete jsc._attachedGroupEvents[groupName];
                }
            },
            attachDOMReadyEvent: function (func) {
                var fired = false;
                var fireOnce = function () {
                    if (!fired) {
                        fired = true;
                        func();
                    }
                };
                if (document.readyState === 'complete') {
                    setTimeout(fireOnce, 1);
                    return;
                }
                if (document.addEventListener) {
                    document.addEventListener('DOMContentLoaded', fireOnce, false);
                    window.addEventListener('load', fireOnce, false);
                }
                else if (document.attachEvent) {
                    document.attachEvent('onreadystatechange', function () {
                        if (document.readyState === 'complete') {
                            document.detachEvent('onreadystatechange', arguments.callee);
                            fireOnce();
                        }
                    });
                    window.attachEvent('onload', fireOnce);
                    if (document.documentElement.doScroll && window == window.top) {
                        var tryScroll = function () {
                            if (!document.body) {
                                return;
                            }
                            try {
                                document.documentElement.doScroll('left');
                                fireOnce();
                            }
                            catch (e) {
                                setTimeout(tryScroll, 1);
                            }
                        };
                        tryScroll();
                    }
                }
            },
            warn: function (msg) {
                if (window.console && window.console.warn) {
                    window.console.warn(msg);
                }
            },
            preventDefault: function (e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.returnValue = false;
            },
            captureTarget: function (target) {
                if (target.setCapture) {
                    jsc._capturedTarget = target;
                    jsc._capturedTarget.setCapture();
                }
            },
            releaseTarget: function () {
                if (jsc._capturedTarget) {
                    jsc._capturedTarget.releaseCapture();
                    jsc._capturedTarget = null;
                }
            },
            fireEvent: function (el, evnt) {
                if (!el) {
                    return;
                }
                if (document.createEvent) {
                    var ev = document.createEvent('HTMLEvents');
                    ev.initEvent(evnt, true, true);
                    el.dispatchEvent(ev);
                }
                else if (document.createEventObject) {
                    var ev = document.createEventObject();
                    el.fireEvent('on' + evnt, ev);
                }
                else if (el['on' + evnt]) {
                    el['on' + evnt]();
                }
            },
            classNameToList: function (className) {
                return className.replace(/^\s+|\s+$/g, '').split(/\s+/);
            },
            hasClass: function (elm, className) {
                if (!className) {
                    return false;
                }
                return -1 != (' ' + elm.className.replace(/\s+/g, ' ') + ' ').indexOf(' ' + className + ' ');
            },
            setClass: function (elm, className) {
                var classList = jsc.classNameToList(className);
                for (var i = 0; i < classList.length; i += 1) {
                    if (!jsc.hasClass(elm, classList[i])) {
                        elm.className += (elm.className ? ' ' : '') + classList[i];
                    }
                }
            },
            unsetClass: function (elm, className) {
                var classList = jsc.classNameToList(className);
                for (var i = 0; i < classList.length; i += 1) {
                    var repl = new RegExp('^\\s*' + classList[i] + '\\s*|' +
                        '\\s*' + classList[i] + '\\s*$|' +
                        '\\s+' + classList[i] + '(\\s+)', 'g');
                    elm.className = elm.className.replace(repl, '$1');
                }
            },
            getStyle: function (elm) {
                return window.getComputedStyle ? window.getComputedStyle(elm) : elm.currentStyle;
            },
            setStyle: (function () {
                var helper = document.createElement('div');
                var getSupportedProp = function (names) {
                    for (var i = 0; i < names.length; i += 1) {
                        if (names[i] in helper.style) {
                            return names[i];
                        }
                    }
                };
                var props = {
                    borderRadius: getSupportedProp(['borderRadius', 'MozBorderRadius', 'webkitBorderRadius']),
                    boxShadow: getSupportedProp(['boxShadow', 'MozBoxShadow', 'webkitBoxShadow'])
                };
                return function (elm, prop, value) {
                    switch (prop.toLowerCase()) {
                        case 'opacity':
                            var alphaOpacity = Math.round(parseFloat(value) * 100);
                            elm.style.opacity = value;
                            elm.style.filter = 'alpha(opacity=' + alphaOpacity + ')';
                            break;
                        default:
                            elm.style[props[prop]] = value;
                            break;
                    }
                };
            })(),
            setBorderRadius: function (elm, value) {
                jsc.setStyle(elm, 'borderRadius', value || '0');
            },
            setBoxShadow: function (elm, value) {
                jsc.setStyle(elm, 'boxShadow', value || 'none');
            },
            getElementPos: function (e, relativeToViewport) {
                var x = 0, y = 0;
                var rect = e.getBoundingClientRect();
                x = rect.left;
                y = rect.top;
                if (!relativeToViewport) {
                    var viewPos = jsc.getViewPos();
                    x += viewPos[0];
                    y += viewPos[1];
                }
                return [x, y];
            },
            getElementSize: function (e) {
                return [e.offsetWidth, e.offsetHeight];
            },
            getAbsPointerPos: function (e) {
                if (!e) {
                    e = window.event;
                }
                var x = 0, y = 0;
                if (typeof e.changedTouches !== 'undefined' && e.changedTouches.length) {
                    x = e.changedTouches[0].clientX;
                    y = e.changedTouches[0].clientY;
                }
                else if (typeof e.clientX === 'number') {
                    x = e.clientX;
                    y = e.clientY;
                }
                return { x: x, y: y };
            },
            getRelPointerPos: function (e) {
                if (!e) {
                    e = window.event;
                }
                var target = e.target || e.srcElement;
                var targetRect = target.getBoundingClientRect();
                var x = 0, y = 0;
                var clientX = 0, clientY = 0;
                if (typeof e.changedTouches !== 'undefined' && e.changedTouches.length) {
                    clientX = e.changedTouches[0].clientX;
                    clientY = e.changedTouches[0].clientY;
                }
                else if (typeof e.clientX === 'number') {
                    clientX = e.clientX;
                    clientY = e.clientY;
                }
                x = clientX - targetRect.left;
                y = clientY - targetRect.top;
                return { x: x, y: y };
            },
            getViewPos: function () {
                var doc = document.documentElement;
                return [
                    (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
                    (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
                ];
            },
            getViewSize: function () {
                var doc = document.documentElement;
                return [
                    (window.innerWidth || doc.clientWidth),
                    (window.innerHeight || doc.clientHeight),
                ];
            },
            redrawPosition: function () {
                if (jsc.picker && jsc.picker.owner) {
                    var thisObj = jsc.picker.owner;
                    var tp, vp;
                    if (thisObj.fixed) {
                        tp = jsc.getElementPos(thisObj.targetElement, true);
                        vp = [0, 0];
                    }
                    else {
                        tp = jsc.getElementPos(thisObj.targetElement);
                        vp = jsc.getViewPos();
                    }
                    var ts = jsc.getElementSize(thisObj.targetElement);
                    var vs = jsc.getViewSize();
                    var ps = jsc.getPickerOuterDims(thisObj);
                    var a, b, c;
                    switch (thisObj.position.toLowerCase()) {
                        case 'left':
                            a = 1;
                            b = 0;
                            c = -1;
                            break;
                        case 'right':
                            a = 1;
                            b = 0;
                            c = 1;
                            break;
                        case 'top':
                            a = 0;
                            b = 1;
                            c = -1;
                            break;
                        default:
                            a = 0;
                            b = 1;
                            c = 1;
                            break;
                    }
                    var l = (ts[b] + ps[b]) / 2;
                    if (!thisObj.smartPosition) {
                        var pp = [
                            tp[a],
                            tp[b] + ts[b] - l + l * c
                        ];
                    }
                    else {
                        var pp = [
                            -vp[a] + tp[a] + ps[a] > vs[a] ?
                                (-vp[a] + tp[a] + ts[a] / 2 > vs[a] / 2 && tp[a] + ts[a] - ps[a] >= 0 ? tp[a] + ts[a] - ps[a] : tp[a]) :
                                tp[a],
                            -vp[b] + tp[b] + ts[b] + ps[b] - l + l * c > vs[b] ?
                                (-vp[b] + tp[b] + ts[b] / 2 > vs[b] / 2 && tp[b] + ts[b] - l - l * c >= 0 ? tp[b] + ts[b] - l - l * c : tp[b] + ts[b] - l + l * c) :
                                (tp[b] + ts[b] - l + l * c >= 0 ? tp[b] + ts[b] - l + l * c : tp[b] + ts[b] - l - l * c)
                        ];
                    }
                    var x = pp[a];
                    var y = pp[b];
                    var positionValue = thisObj.fixed ? 'fixed' : 'absolute';
                    var contractShadow = (pp[0] + ps[0] > tp[0] || pp[0] < tp[0] + ts[0]) &&
                        (pp[1] + ps[1] < tp[1] + ts[1]);
                    jsc._drawPosition(thisObj, x, y, positionValue, contractShadow);
                }
            },
            _drawPosition: function (thisObj, x, y, positionValue, contractShadow) {
                var vShadow = contractShadow ? 0 : thisObj.shadowBlur;
                jsc.picker.wrap.style.position = positionValue;
                jsc.picker.wrap.style.left = x + 'px';
                jsc.picker.wrap.style.top = y + 'px';
                jsc.setBoxShadow(jsc.picker.boxS, thisObj.shadow ?
                    new jsc.BoxShadow(0, vShadow, thisObj.shadowBlur, 0, thisObj.shadowColor) :
                    null);
            },
            getPickerDims: function (thisObj) {
                var displaySlider = !!jsc.getSliderComponent(thisObj);
                var dims = [
                    2 * thisObj.insetWidth + 2 * thisObj.padding + thisObj.width +
                        (displaySlider ? 2 * thisObj.insetWidth + jsc.getPadToSliderPadding(thisObj) + thisObj.sliderSize : 0),
                    2 * thisObj.insetWidth + 2 * thisObj.padding + thisObj.height +
                        (thisObj.closable ? 2 * thisObj.insetWidth + thisObj.padding + thisObj.buttonHeight : 0)
                ];
                return dims;
            },
            getPickerOuterDims: function (thisObj) {
                var dims = jsc.getPickerDims(thisObj);
                return [
                    dims[0] + 2 * thisObj.borderWidth,
                    dims[1] + 2 * thisObj.borderWidth
                ];
            },
            getPadToSliderPadding: function (thisObj) {
                return Math.max(thisObj.padding, 1.5 * (2 * thisObj.pointerBorderWidth + thisObj.pointerThickness));
            },
            getPadYComponent: function (thisObj) {
                switch (thisObj.mode.charAt(1).toLowerCase()) {
                    case 'v':
                        return 'v';
                        break;
                }
                return 's';
            },
            getSliderComponent: function (thisObj) {
                if (thisObj.mode.length > 2) {
                    switch (thisObj.mode.charAt(2).toLowerCase()) {
                        case 's':
                            return 's';
                            break;
                        case 'v':
                            return 'v';
                            break;
                    }
                }
                return null;
            },
            onDocumentMouseDown: function (e) {
                if (!e) {
                    e = window.event;
                }
                var target = e.target || e.srcElement;
                if (target._jscLinkedInstance) {
                    if (target._jscLinkedInstance.showOnClick) {
                        target._jscLinkedInstance.show();
                    }
                }
                else if (target._jscControlName) {
                    jsc.onControlPointerStart(e, target, target._jscControlName, 'mouse');
                }
                else {
                    if (jsc.picker && jsc.picker.owner) {
                        jsc.picker.owner.hide();
                    }
                }
            },
            onDocumentTouchStart: function (e) {
                if (!e) {
                    e = window.event;
                }
                var target = e.target || e.srcElement;
                if (target._jscLinkedInstance) {
                    if (target._jscLinkedInstance.showOnClick) {
                        target._jscLinkedInstance.show();
                    }
                }
                else if (target._jscControlName) {
                    jsc.onControlPointerStart(e, target, target._jscControlName, 'touch');
                }
                else {
                    if (jsc.picker && jsc.picker.owner) {
                        jsc.picker.owner.hide();
                    }
                }
            },
            onWindowResize: function (e) {
                jsc.redrawPosition();
            },
            onParentScroll: function (e) {
                if (jsc.picker && jsc.picker.owner) {
                    jsc.picker.owner.hide();
                }
            },
            _pointerMoveEvent: {
                mouse: 'mousemove',
                touch: 'touchmove'
            },
            _pointerEndEvent: {
                mouse: 'mouseup',
                touch: 'touchend'
            },
            _pointerOrigin: null,
            _capturedTarget: null,
            onControlPointerStart: function (e, target, controlName, pointerType) {
                var thisObj = target._jscInstance;
                jsc.preventDefault(e);
                jsc.captureTarget(target);
                var registerDragEvents = function (doc, offset) {
                    jsc.attachGroupEvent('drag', doc, jsc._pointerMoveEvent[pointerType], jsc.onDocumentPointerMove(e, target, controlName, pointerType, offset));
                    jsc.attachGroupEvent('drag', doc, jsc._pointerEndEvent[pointerType], jsc.onDocumentPointerEnd(e, target, controlName, pointerType));
                };
                registerDragEvents(document, [0, 0]);
                if (window.parent && window.frameElement) {
                    var rect = window.frameElement.getBoundingClientRect();
                    var ofs = [-rect.left, -rect.top];
                    registerDragEvents(window.parent.window.document, ofs);
                }
                var abs = jsc.getAbsPointerPos(e);
                var rel = jsc.getRelPointerPos(e);
                jsc._pointerOrigin = {
                    x: abs.x - rel.x,
                    y: abs.y - rel.y
                };
                switch (controlName) {
                    case 'pad':
                        switch (jsc.getSliderComponent(thisObj)) {
                            case 's':
                                if (thisObj.hsv[1] === 0) {
                                    thisObj.fromHSV(null, 100, null);
                                }
                                ;
                                break;
                            case 'v':
                                if (thisObj.hsv[2] === 0) {
                                    thisObj.fromHSV(null, null, 100);
                                }
                                ;
                                break;
                        }
                        jsc.setPad(thisObj, e, 0, 0);
                        break;
                    case 'sld':
                        jsc.setSld(thisObj, e, 0);
                        break;
                }
                jsc.dispatchFineChange(thisObj);
            },
            onDocumentPointerMove: function (e, target, controlName, pointerType, offset) {
                return function (e) {
                    var thisObj = target._jscInstance;
                    switch (controlName) {
                        case 'pad':
                            if (!e) {
                                e = window.event;
                            }
                            jsc.setPad(thisObj, e, offset[0], offset[1]);
                            jsc.dispatchFineChange(thisObj);
                            break;
                        case 'sld':
                            if (!e) {
                                e = window.event;
                            }
                            jsc.setSld(thisObj, e, offset[1]);
                            jsc.dispatchFineChange(thisObj);
                            break;
                    }
                };
            },
            onDocumentPointerEnd: function (e, target, controlName, pointerType) {
                return function (e) {
                    var thisObj = target._jscInstance;
                    jsc.detachGroupEvents('drag');
                    jsc.releaseTarget();
                    jsc.dispatchChange(thisObj);
                };
            },
            dispatchChange: function (thisObj) {
                if (thisObj.valueElement) {
                    if (jsc.isElementType(thisObj.valueElement, 'input')) {
                        jsc.fireEvent(thisObj.valueElement, 'change');
                    }
                }
            },
            dispatchFineChange: function (thisObj) {
                if (thisObj.onFineChange) {
                    var callback;
                    if (typeof thisObj.onFineChange === 'string') {
                        callback = new Function(thisObj.onFineChange);
                    }
                    else {
                        callback = thisObj.onFineChange;
                    }
                    callback.call(thisObj);
                }
            },
            setPad: function (thisObj, e, ofsX, ofsY) {
                var pointerAbs = jsc.getAbsPointerPos(e);
                var x = ofsX + pointerAbs.x - jsc._pointerOrigin.x - thisObj.padding - thisObj.insetWidth;
                var y = ofsY + pointerAbs.y - jsc._pointerOrigin.y - thisObj.padding - thisObj.insetWidth;
                var xVal = x * (360 / (thisObj.width - 1));
                var yVal = 100 - (y * (100 / (thisObj.height - 1)));
                switch (jsc.getPadYComponent(thisObj)) {
                    case 's':
                        thisObj.fromHSV(xVal, yVal, null, jsc.leaveSld);
                        break;
                    case 'v':
                        thisObj.fromHSV(xVal, null, yVal, jsc.leaveSld);
                        break;
                }
            },
            setSld: function (thisObj, e, ofsY) {
                var pointerAbs = jsc.getAbsPointerPos(e);
                var y = ofsY + pointerAbs.y - jsc._pointerOrigin.y - thisObj.padding - thisObj.insetWidth;
                var yVal = 100 - (y * (100 / (thisObj.height - 1)));
                switch (jsc.getSliderComponent(thisObj)) {
                    case 's':
                        thisObj.fromHSV(null, yVal, null, jsc.leavePad);
                        break;
                    case 'v':
                        thisObj.fromHSV(null, null, yVal, jsc.leavePad);
                        break;
                }
            },
            _vmlNS: 'jsc_vml_',
            _vmlCSS: 'jsc_vml_css_',
            _vmlReady: false,
            initVML: function () {
                if (!jsc._vmlReady) {
                    var doc = document;
                    if (!doc.namespaces[jsc._vmlNS]) {
                        doc.namespaces.add(jsc._vmlNS, 'urn:schemas-microsoft-com:vml');
                    }
                    if (!doc.styleSheets[jsc._vmlCSS]) {
                        var tags = ['shape', 'shapetype', 'group', 'background', 'path', 'formulas', 'handles', 'fill', 'stroke', 'shadow', 'textbox', 'textpath', 'imagedata', 'line', 'polyline', 'curve', 'rect', 'roundrect', 'oval', 'arc', 'image'];
                        var ss = doc.createStyleSheet();
                        ss.owningElement.id = jsc._vmlCSS;
                        for (var i = 0; i < tags.length; i += 1) {
                            ss.addRule(jsc._vmlNS + '\\:' + tags[i], 'behavior:url(#default#VML);');
                        }
                    }
                    jsc._vmlReady = true;
                }
            },
            createPalette: function () {
                var paletteObj = {
                    elm: null,
                    draw: null
                };
                if (jsc.isCanvasSupported) {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var drawFunc = function (width, height, type) {
                        canvas.width = width;
                        canvas.height = height;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        var hGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
                        hGrad.addColorStop(0 / 6, '#F00');
                        hGrad.addColorStop(1 / 6, '#FF0');
                        hGrad.addColorStop(2 / 6, '#0F0');
                        hGrad.addColorStop(3 / 6, '#0FF');
                        hGrad.addColorStop(4 / 6, '#00F');
                        hGrad.addColorStop(5 / 6, '#F0F');
                        hGrad.addColorStop(6 / 6, '#F00');
                        ctx.fillStyle = hGrad;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        var vGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                        switch (type.toLowerCase()) {
                            case 's':
                                vGrad.addColorStop(0, 'rgba(255,255,255,0)');
                                vGrad.addColorStop(1, 'rgba(255,255,255,1)');
                                break;
                            case 'v':
                                vGrad.addColorStop(0, 'rgba(0,0,0,0)');
                                vGrad.addColorStop(1, 'rgba(0,0,0,1)');
                                break;
                        }
                        ctx.fillStyle = vGrad;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    };
                    paletteObj.elm = canvas;
                    paletteObj.draw = drawFunc;
                }
                else {
                    jsc.initVML();
                    var vmlContainer = document.createElement('div');
                    vmlContainer.style.position = 'relative';
                    vmlContainer.style.overflow = 'hidden';
                    var hGrad = document.createElement(jsc._vmlNS + ':fill');
                    hGrad.type = 'gradient';
                    hGrad.method = 'linear';
                    hGrad.angle = '90';
                    hGrad.colors = '16.67% #F0F, 33.33% #00F, 50% #0FF, 66.67% #0F0, 83.33% #FF0';
                    var hRect = document.createElement(jsc._vmlNS + ':rect');
                    hRect.style.position = 'absolute';
                    hRect.style.left = -1 + 'px';
                    hRect.style.top = -1 + 'px';
                    hRect.stroked = false;
                    hRect.appendChild(hGrad);
                    vmlContainer.appendChild(hRect);
                    var vGrad = document.createElement(jsc._vmlNS + ':fill');
                    vGrad.type = 'gradient';
                    vGrad.method = 'linear';
                    vGrad.angle = '180';
                    vGrad.opacity = '0';
                    var vRect = document.createElement(jsc._vmlNS + ':rect');
                    vRect.style.position = 'absolute';
                    vRect.style.left = -1 + 'px';
                    vRect.style.top = -1 + 'px';
                    vRect.stroked = false;
                    vRect.appendChild(vGrad);
                    vmlContainer.appendChild(vRect);
                    var drawFunc = function (width, height, type) {
                        vmlContainer.style.width = width + 'px';
                        vmlContainer.style.height = height + 'px';
                        hRect.style.width =
                            vRect.style.width =
                                (width + 1) + 'px';
                        hRect.style.height =
                            vRect.style.height =
                                (height + 1) + 'px';
                        hGrad.color = '#F00';
                        hGrad.color2 = '#F00';
                        switch (type.toLowerCase()) {
                            case 's':
                                vGrad.color = vGrad.color2 = '#FFF';
                                break;
                            case 'v':
                                vGrad.color = vGrad.color2 = '#000';
                                break;
                        }
                    };
                    paletteObj.elm = vmlContainer;
                    paletteObj.draw = drawFunc;
                }
                return paletteObj;
            },
            createSliderGradient: function () {
                var sliderObj = {
                    elm: null,
                    draw: null
                };
                if (jsc.isCanvasSupported) {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var drawFunc = function (width, height, color1, color2) {
                        canvas.width = width;
                        canvas.height = height;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                        grad.addColorStop(0, color1);
                        grad.addColorStop(1, color2);
                        ctx.fillStyle = grad;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    };
                    sliderObj.elm = canvas;
                    sliderObj.draw = drawFunc;
                }
                else {
                    jsc.initVML();
                    var vmlContainer = document.createElement('div');
                    vmlContainer.style.position = 'relative';
                    vmlContainer.style.overflow = 'hidden';
                    var grad = document.createElement(jsc._vmlNS + ':fill');
                    grad.type = 'gradient';
                    grad.method = 'linear';
                    grad.angle = '180';
                    var rect = document.createElement(jsc._vmlNS + ':rect');
                    rect.style.position = 'absolute';
                    rect.style.left = -1 + 'px';
                    rect.style.top = -1 + 'px';
                    rect.stroked = false;
                    rect.appendChild(grad);
                    vmlContainer.appendChild(rect);
                    var drawFunc = function (width, height, color1, color2) {
                        vmlContainer.style.width = width + 'px';
                        vmlContainer.style.height = height + 'px';
                        rect.style.width = (width + 1) + 'px';
                        rect.style.height = (height + 1) + 'px';
                        grad.color = color1;
                        grad.color2 = color2;
                    };
                    sliderObj.elm = vmlContainer;
                    sliderObj.draw = drawFunc;
                }
                return sliderObj;
            },
            leaveValue: 1 << 0,
            leaveStyle: 1 << 1,
            leavePad: 1 << 2,
            leaveSld: 1 << 3,
            BoxShadow: (function () {
                var BoxShadow = function (hShadow, vShadow, blur, spread, color, inset) {
                    this.hShadow = hShadow;
                    this.vShadow = vShadow;
                    this.blur = blur;
                    this.spread = spread;
                    this.color = color;
                    this.inset = !!inset;
                };
                BoxShadow.prototype.toString = function () {
                    var vals = [
                        Math.round(this.hShadow) + 'px',
                        Math.round(this.vShadow) + 'px',
                        Math.round(this.blur) + 'px',
                        Math.round(this.spread) + 'px',
                        this.color
                    ];
                    if (this.inset) {
                        vals.push('inset');
                    }
                    return vals.join(' ');
                };
                return BoxShadow;
            })(),
            jscolor: function (targetElement, options) {
                this.value = null;
                this.valueElement = targetElement;
                this.styleElement = targetElement;
                this.required = true;
                this.refine = true;
                this.hash = false;
                this.uppercase = true;
                this.onFineChange = null;
                this.activeClass = 'jscolor-active';
                this.minS = 0;
                this.maxS = 100;
                this.minV = 0;
                this.maxV = 100;
                this.hsv = [0, 0, 100];
                this.rgb = [255, 255, 255];
                this.width = 181;
                this.height = 101;
                this.showOnClick = true;
                this.mode = 'HSV';
                this.position = 'bottom';
                this.smartPosition = true;
                this.sliderSize = 16;
                this.crossSize = 8;
                this.closable = false;
                this.closeText = 'Close';
                this.buttonColor = '#000000';
                this.buttonHeight = 18;
                this.padding = 12;
                this.backgroundColor = '#FFFFFF';
                this.borderWidth = 1;
                this.borderColor = '#BBBBBB';
                this.borderRadius = 8;
                this.insetWidth = 1;
                this.insetColor = '#BBBBBB';
                this.shadow = true;
                this.shadowBlur = 15;
                this.shadowColor = 'rgba(0,0,0,0.2)';
                this.pointerColor = '#4C4C4C';
                this.pointerBorderColor = '#FFFFFF';
                this.pointerBorderWidth = 1;
                this.pointerThickness = 2;
                this.zIndex = 1000;
                this.container = null;
                for (var opt in options) {
                    if (options.hasOwnProperty(opt)) {
                        this[opt] = options[opt];
                    }
                }
                this.hide = function () {
                    if (isPickerOwner()) {
                        detachPicker();
                    }
                };
                this.show = function () {
                    drawPicker();
                };
                this.redraw = function () {
                    if (isPickerOwner()) {
                        drawPicker();
                    }
                };
                this.importColor = function () {
                    if (!this.valueElement) {
                        this.exportColor();
                    }
                    else {
                        if (jsc.isElementType(this.valueElement, 'input')) {
                            if (!this.refine) {
                                if (!this.fromString(this.valueElement.value, jsc.leaveValue)) {
                                    if (this.styleElement) {
                                        this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage;
                                        this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor;
                                        this.styleElement.style.color = this.styleElement._jscOrigStyle.color;
                                    }
                                    this.exportColor(jsc.leaveValue | jsc.leaveStyle);
                                }
                            }
                            else if (!this.required && /^\s*$/.test(this.valueElement.value)) {
                                this.valueElement.value = '';
                                if (this.styleElement) {
                                    this.styleElement.style.backgroundImage = this.styleElement._jscOrigStyle.backgroundImage;
                                    this.styleElement.style.backgroundColor = this.styleElement._jscOrigStyle.backgroundColor;
                                    this.styleElement.style.color = this.styleElement._jscOrigStyle.color;
                                }
                                this.exportColor(jsc.leaveValue | jsc.leaveStyle);
                            }
                            else if (this.fromString(this.valueElement.value)) {
                            }
                            else {
                                this.exportColor();
                            }
                        }
                        else {
                            this.exportColor();
                        }
                    }
                };
                this.exportColor = function (flags) {
                    if (!(flags & jsc.leaveValue) && this.valueElement) {
                        var value = this.toString();
                        if (this.uppercase) {
                            value = value.toUpperCase();
                        }
                        if (this.hash) {
                            value = '#' + value;
                        }
                        if (jsc.isElementType(this.valueElement, 'input')) {
                            this.valueElement.value = value;
                        }
                        else {
                            this.valueElement.innerHTML = value;
                        }
                    }
                    if (!(flags & jsc.leaveStyle)) {
                        if (this.styleElement) {
                            this.styleElement.style.backgroundImage = 'none';
                            this.styleElement.style.backgroundColor = '#' + this.toString();
                            this.styleElement.style.color = this.isLight() ? '#000' : '#FFF';
                        }
                    }
                    if (!(flags & jsc.leavePad) && isPickerOwner()) {
                        redrawPad();
                    }
                    if (!(flags & jsc.leaveSld) && isPickerOwner()) {
                        redrawSld();
                    }
                };
                this.fromHSV = function (h, s, v, flags) {
                    if (h !== null) {
                        if (isNaN(h)) {
                            return false;
                        }
                        h = Math.max(0, Math.min(360, h));
                    }
                    if (s !== null) {
                        if (isNaN(s)) {
                            return false;
                        }
                        s = Math.max(0, Math.min(100, this.maxS, s), this.minS);
                    }
                    if (v !== null) {
                        if (isNaN(v)) {
                            return false;
                        }
                        v = Math.max(0, Math.min(100, this.maxV, v), this.minV);
                    }
                    this.rgb = HSV_RGB(h === null ? this.hsv[0] : (this.hsv[0] = h), s === null ? this.hsv[1] : (this.hsv[1] = s), v === null ? this.hsv[2] : (this.hsv[2] = v));
                    this.exportColor(flags);
                };
                this.fromRGB = function (r, g, b, flags) {
                    if (r !== null) {
                        if (isNaN(r)) {
                            return false;
                        }
                        r = Math.max(0, Math.min(255, r));
                    }
                    if (g !== null) {
                        if (isNaN(g)) {
                            return false;
                        }
                        g = Math.max(0, Math.min(255, g));
                    }
                    if (b !== null) {
                        if (isNaN(b)) {
                            return false;
                        }
                        b = Math.max(0, Math.min(255, b));
                    }
                    var hsv = RGB_HSV(r === null ? this.rgb[0] : r, g === null ? this.rgb[1] : g, b === null ? this.rgb[2] : b);
                    if (hsv[0] !== null) {
                        this.hsv[0] = Math.max(0, Math.min(360, hsv[0]));
                    }
                    if (hsv[2] !== 0) {
                        this.hsv[1] = hsv[1] === null ? null : Math.max(0, this.minS, Math.min(100, this.maxS, hsv[1]));
                    }
                    this.hsv[2] = hsv[2] === null ? null : Math.max(0, this.minV, Math.min(100, this.maxV, hsv[2]));
                    var rgb = HSV_RGB(this.hsv[0], this.hsv[1], this.hsv[2]);
                    this.rgb[0] = rgb[0];
                    this.rgb[1] = rgb[1];
                    this.rgb[2] = rgb[2];
                    this.exportColor(flags);
                };
                this.fromString = function (str, flags) {
                    var m;
                    if (m = str.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i)) {
                        if (m[1].length === 6) {
                            this.fromRGB(parseInt(m[1].substr(0, 2), 16), parseInt(m[1].substr(2, 2), 16), parseInt(m[1].substr(4, 2), 16), flags);
                        }
                        else {
                            this.fromRGB(parseInt(m[1].charAt(0) + m[1].charAt(0), 16), parseInt(m[1].charAt(1) + m[1].charAt(1), 16), parseInt(m[1].charAt(2) + m[1].charAt(2), 16), flags);
                        }
                        return true;
                    }
                    else if (m = str.match(/^\W*rgba?\(([^)]*)\)\W*$/i)) {
                        var params = m[1].split(',');
                        var re = /^\s*(\d*)(\.\d+)?\s*$/;
                        var mR, mG, mB;
                        if (params.length >= 3 &&
                            (mR = params[0].match(re)) &&
                            (mG = params[1].match(re)) &&
                            (mB = params[2].match(re))) {
                            var r = parseFloat((mR[1] || '0') + (mR[2] || ''));
                            var g = parseFloat((mG[1] || '0') + (mG[2] || ''));
                            var b = parseFloat((mB[1] || '0') + (mB[2] || ''));
                            this.fromRGB(r, g, b, flags);
                            return true;
                        }
                    }
                    return false;
                };
                this.toString = function () {
                    return ((0x100 | Math.round(this.rgb[0])).toString(16).substr(1) +
                        (0x100 | Math.round(this.rgb[1])).toString(16).substr(1) +
                        (0x100 | Math.round(this.rgb[2])).toString(16).substr(1));
                };
                this.toHEXString = function () {
                    return '#' + this.toString().toUpperCase();
                };
                this.toRGBString = function () {
                    return ('rgb(' +
                        Math.round(this.rgb[0]) + ',' +
                        Math.round(this.rgb[1]) + ',' +
                        Math.round(this.rgb[2]) + ')');
                };
                this.isLight = function () {
                    return (0.213 * this.rgb[0] +
                        0.715 * this.rgb[1] +
                        0.072 * this.rgb[2] >
                        255 / 2);
                };
                this._processParentElementsInDOM = function () {
                    if (this._linkedElementsProcessed) {
                        return;
                    }
                    this._linkedElementsProcessed = true;
                    var elm = this.targetElement;
                    do {
                        var currStyle = jsc.getStyle(elm);
                        if (currStyle && currStyle.position.toLowerCase() === 'fixed') {
                            this.fixed = true;
                        }
                        if (elm !== this.targetElement) {
                            if (!elm._jscEventsAttached) {
                                jsc.attachEvent(elm, 'scroll', jsc.onParentScroll);
                                elm._jscEventsAttached = true;
                            }
                        }
                    } while ((elm = elm.parentNode) && !jsc.isElementType(elm, 'body'));
                };
                function RGB_HSV(r, g, b) {
                    r /= 255;
                    g /= 255;
                    b /= 255;
                    var n = Math.min(Math.min(r, g), b);
                    var v = Math.max(Math.max(r, g), b);
                    var m = v - n;
                    if (m === 0) {
                        return [null, 0, 100 * v];
                    }
                    var h = r === n ? 3 + (b - g) / m : (g === n ? 5 + (r - b) / m : 1 + (g - r) / m);
                    return [
                        60 * (h === 6 ? 0 : h),
                        100 * (m / v),
                        100 * v
                    ];
                }
                function HSV_RGB(h, s, v) {
                    var u = 255 * (v / 100);
                    if (h === null) {
                        return [u, u, u];
                    }
                    h /= 60;
                    s /= 100;
                    var i = Math.floor(h);
                    var f = i % 2 ? h - i : 1 - (h - i);
                    var m = u * (1 - s);
                    var n = u * (1 - s * f);
                    switch (i) {
                        case 6:
                        case 0: return [u, n, m];
                        case 1: return [n, u, m];
                        case 2: return [m, u, n];
                        case 3: return [m, n, u];
                        case 4: return [n, m, u];
                        case 5: return [u, m, n];
                    }
                }
                function detachPicker() {
                    jsc.unsetClass(THIS.targetElement, THIS.activeClass);
                    jsc.picker.wrap.parentNode.removeChild(jsc.picker.wrap);
                    delete jsc.picker.owner;
                }
                function drawPicker() {
                    THIS._processParentElementsInDOM();
                    if (!jsc.picker) {
                        jsc.picker = {
                            owner: null,
                            wrap: document.createElement('div'),
                            box: document.createElement('div'),
                            boxS: document.createElement('div'),
                            boxB: document.createElement('div'),
                            pad: document.createElement('div'),
                            padB: document.createElement('div'),
                            padM: document.createElement('div'),
                            padPal: jsc.createPalette(),
                            cross: document.createElement('div'),
                            crossBY: document.createElement('div'),
                            crossBX: document.createElement('div'),
                            crossLY: document.createElement('div'),
                            crossLX: document.createElement('div'),
                            sld: document.createElement('div'),
                            sldB: document.createElement('div'),
                            sldM: document.createElement('div'),
                            sldGrad: jsc.createSliderGradient(),
                            sldPtrS: document.createElement('div'),
                            sldPtrIB: document.createElement('div'),
                            sldPtrMB: document.createElement('div'),
                            sldPtrOB: document.createElement('div'),
                            btn: document.createElement('div'),
                            btnT: document.createElement('span')
                        };
                        jsc.picker.pad.appendChild(jsc.picker.padPal.elm);
                        jsc.picker.padB.appendChild(jsc.picker.pad);
                        jsc.picker.cross.appendChild(jsc.picker.crossBY);
                        jsc.picker.cross.appendChild(jsc.picker.crossBX);
                        jsc.picker.cross.appendChild(jsc.picker.crossLY);
                        jsc.picker.cross.appendChild(jsc.picker.crossLX);
                        jsc.picker.padB.appendChild(jsc.picker.cross);
                        jsc.picker.box.appendChild(jsc.picker.padB);
                        jsc.picker.box.appendChild(jsc.picker.padM);
                        jsc.picker.sld.appendChild(jsc.picker.sldGrad.elm);
                        jsc.picker.sldB.appendChild(jsc.picker.sld);
                        jsc.picker.sldB.appendChild(jsc.picker.sldPtrOB);
                        jsc.picker.sldPtrOB.appendChild(jsc.picker.sldPtrMB);
                        jsc.picker.sldPtrMB.appendChild(jsc.picker.sldPtrIB);
                        jsc.picker.sldPtrIB.appendChild(jsc.picker.sldPtrS);
                        jsc.picker.box.appendChild(jsc.picker.sldB);
                        jsc.picker.box.appendChild(jsc.picker.sldM);
                        jsc.picker.btn.appendChild(jsc.picker.btnT);
                        jsc.picker.box.appendChild(jsc.picker.btn);
                        jsc.picker.boxB.appendChild(jsc.picker.box);
                        jsc.picker.wrap.appendChild(jsc.picker.boxS);
                        jsc.picker.wrap.appendChild(jsc.picker.boxB);
                    }
                    var p = jsc.picker;
                    var displaySlider = !!jsc.getSliderComponent(THIS);
                    var dims = jsc.getPickerDims(THIS);
                    var crossOuterSize = (2 * THIS.pointerBorderWidth + THIS.pointerThickness + 2 * THIS.crossSize);
                    var padToSliderPadding = jsc.getPadToSliderPadding(THIS);
                    var borderRadius = Math.min(THIS.borderRadius, Math.round(THIS.padding * Math.PI));
                    var padCursor = 'crosshair';
                    p.wrap.style.clear = 'both';
                    p.wrap.style.width = (dims[0] + 2 * THIS.borderWidth) + 'px';
                    p.wrap.style.height = (dims[1] + 2 * THIS.borderWidth) + 'px';
                    p.wrap.style.zIndex = THIS.zIndex;
                    p.box.style.width = dims[0] + 'px';
                    p.box.style.height = dims[1] + 'px';
                    p.boxS.style.position = 'absolute';
                    p.boxS.style.left = '0';
                    p.boxS.style.top = '0';
                    p.boxS.style.width = '100%';
                    p.boxS.style.height = '100%';
                    jsc.setBorderRadius(p.boxS, borderRadius + 'px');
                    p.boxB.style.position = 'relative';
                    p.boxB.style.border = THIS.borderWidth + 'px solid';
                    p.boxB.style.borderColor = THIS.borderColor;
                    p.boxB.style.background = THIS.backgroundColor;
                    jsc.setBorderRadius(p.boxB, borderRadius + 'px');
                    p.padM.style.background =
                        p.sldM.style.background =
                            '#FFF';
                    jsc.setStyle(p.padM, 'opacity', '0');
                    jsc.setStyle(p.sldM, 'opacity', '0');
                    p.pad.style.position = 'relative';
                    p.pad.style.width = THIS.width + 'px';
                    p.pad.style.height = THIS.height + 'px';
                    p.padPal.draw(THIS.width, THIS.height, jsc.getPadYComponent(THIS));
                    p.padB.style.position = 'absolute';
                    p.padB.style.left = THIS.padding + 'px';
                    p.padB.style.top = THIS.padding + 'px';
                    p.padB.style.border = THIS.insetWidth + 'px solid';
                    p.padB.style.borderColor = THIS.insetColor;
                    p.padM._jscInstance = THIS;
                    p.padM._jscControlName = 'pad';
                    p.padM.style.position = 'absolute';
                    p.padM.style.left = '0';
                    p.padM.style.top = '0';
                    p.padM.style.width = (THIS.padding + 2 * THIS.insetWidth + THIS.width + padToSliderPadding / 2) + 'px';
                    p.padM.style.height = dims[1] + 'px';
                    p.padM.style.cursor = padCursor;
                    p.cross.style.position = 'absolute';
                    p.cross.style.left =
                        p.cross.style.top =
                            '0';
                    p.cross.style.width =
                        p.cross.style.height =
                            crossOuterSize + 'px';
                    p.crossBY.style.position =
                        p.crossBX.style.position =
                            'absolute';
                    p.crossBY.style.background =
                        p.crossBX.style.background =
                            THIS.pointerBorderColor;
                    p.crossBY.style.width =
                        p.crossBX.style.height =
                            (2 * THIS.pointerBorderWidth + THIS.pointerThickness) + 'px';
                    p.crossBY.style.height =
                        p.crossBX.style.width =
                            crossOuterSize + 'px';
                    p.crossBY.style.left =
                        p.crossBX.style.top =
                            (Math.floor(crossOuterSize / 2) - Math.floor(THIS.pointerThickness / 2) - THIS.pointerBorderWidth) + 'px';
                    p.crossBY.style.top =
                        p.crossBX.style.left =
                            '0';
                    p.crossLY.style.position =
                        p.crossLX.style.position =
                            'absolute';
                    p.crossLY.style.background =
                        p.crossLX.style.background =
                            THIS.pointerColor;
                    p.crossLY.style.height =
                        p.crossLX.style.width =
                            (crossOuterSize - 2 * THIS.pointerBorderWidth) + 'px';
                    p.crossLY.style.width =
                        p.crossLX.style.height =
                            THIS.pointerThickness + 'px';
                    p.crossLY.style.left =
                        p.crossLX.style.top =
                            (Math.floor(crossOuterSize / 2) - Math.floor(THIS.pointerThickness / 2)) + 'px';
                    p.crossLY.style.top =
                        p.crossLX.style.left =
                            THIS.pointerBorderWidth + 'px';
                    p.sld.style.overflow = 'hidden';
                    p.sld.style.width = THIS.sliderSize + 'px';
                    p.sld.style.height = THIS.height + 'px';
                    p.sldGrad.draw(THIS.sliderSize, THIS.height, '#000', '#000');
                    p.sldB.style.display = displaySlider ? 'block' : 'none';
                    p.sldB.style.position = 'absolute';
                    p.sldB.style.right = THIS.padding + 'px';
                    p.sldB.style.top = THIS.padding + 'px';
                    p.sldB.style.border = THIS.insetWidth + 'px solid';
                    p.sldB.style.borderColor = THIS.insetColor;
                    p.sldM._jscInstance = THIS;
                    p.sldM._jscControlName = 'sld';
                    p.sldM.style.display = displaySlider ? 'block' : 'none';
                    p.sldM.style.position = 'absolute';
                    p.sldM.style.right = '0';
                    p.sldM.style.top = '0';
                    p.sldM.style.width = (THIS.sliderSize + padToSliderPadding / 2 + THIS.padding + 2 * THIS.insetWidth) + 'px';
                    p.sldM.style.height = dims[1] + 'px';
                    p.sldM.style.cursor = 'default';
                    p.sldPtrIB.style.border =
                        p.sldPtrOB.style.border =
                            THIS.pointerBorderWidth + 'px solid ' + THIS.pointerBorderColor;
                    p.sldPtrOB.style.position = 'absolute';
                    p.sldPtrOB.style.left = -(2 * THIS.pointerBorderWidth + THIS.pointerThickness) + 'px';
                    p.sldPtrOB.style.top = '0';
                    p.sldPtrMB.style.border = THIS.pointerThickness + 'px solid ' + THIS.pointerColor;
                    p.sldPtrS.style.width = THIS.sliderSize + 'px';
                    p.sldPtrS.style.height = sliderPtrSpace + 'px';
                    function setBtnBorder() {
                        var insetColors = THIS.insetColor.split(/\s+/);
                        var outsetColor = insetColors.length < 2 ? insetColors[0] : insetColors[1] + ' ' + insetColors[0] + ' ' + insetColors[0] + ' ' + insetColors[1];
                        p.btn.style.borderColor = outsetColor;
                    }
                    p.btn.style.display = THIS.closable ? 'block' : 'none';
                    p.btn.style.position = 'absolute';
                    p.btn.style.left = THIS.padding + 'px';
                    p.btn.style.bottom = THIS.padding + 'px';
                    p.btn.style.padding = '0 15px';
                    p.btn.style.height = THIS.buttonHeight + 'px';
                    p.btn.style.border = THIS.insetWidth + 'px solid';
                    setBtnBorder();
                    p.btn.style.color = THIS.buttonColor;
                    p.btn.style.font = '12px sans-serif';
                    p.btn.style.textAlign = 'center';
                    try {
                        p.btn.style.cursor = 'pointer';
                    }
                    catch (eOldIE) {
                        p.btn.style.cursor = 'hand';
                    }
                    p.btn.onmousedown = function () {
                        THIS.hide();
                    };
                    p.btnT.style.lineHeight = THIS.buttonHeight + 'px';
                    p.btnT.innerHTML = '';
                    p.btnT.appendChild(document.createTextNode(THIS.closeText));
                    redrawPad();
                    redrawSld();
                    if (jsc.picker.owner && jsc.picker.owner !== THIS) {
                        jsc.unsetClass(jsc.picker.owner.targetElement, THIS.activeClass);
                    }
                    jsc.picker.owner = THIS;
                    if (jsc.isElementType(container, 'body')) {
                        jsc.redrawPosition();
                    }
                    else {
                        jsc._drawPosition(THIS, 0, 0, 'relative', false);
                    }
                    if (p.wrap.parentNode != container) {
                        container.appendChild(p.wrap);
                    }
                    jsc.setClass(THIS.targetElement, THIS.activeClass);
                }
                function redrawPad() {
                    switch (jsc.getPadYComponent(THIS)) {
                        case 's':
                            var yComponent = 1;
                            break;
                        case 'v':
                            var yComponent = 2;
                            break;
                    }
                    var x = Math.round((THIS.hsv[0] / 360) * (THIS.width - 1));
                    var y = Math.round((1 - THIS.hsv[yComponent] / 100) * (THIS.height - 1));
                    var crossOuterSize = (2 * THIS.pointerBorderWidth + THIS.pointerThickness + 2 * THIS.crossSize);
                    var ofs = -Math.floor(crossOuterSize / 2);
                    jsc.picker.cross.style.left = (x + ofs) + 'px';
                    jsc.picker.cross.style.top = (y + ofs) + 'px';
                    switch (jsc.getSliderComponent(THIS)) {
                        case 's':
                            var rgb1 = HSV_RGB(THIS.hsv[0], 100, THIS.hsv[2]);
                            var rgb2 = HSV_RGB(THIS.hsv[0], 0, THIS.hsv[2]);
                            var color1 = 'rgb(' +
                                Math.round(rgb1[0]) + ',' +
                                Math.round(rgb1[1]) + ',' +
                                Math.round(rgb1[2]) + ')';
                            var color2 = 'rgb(' +
                                Math.round(rgb2[0]) + ',' +
                                Math.round(rgb2[1]) + ',' +
                                Math.round(rgb2[2]) + ')';
                            jsc.picker.sldGrad.draw(THIS.sliderSize, THIS.height, color1, color2);
                            break;
                        case 'v':
                            var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 100);
                            var color1 = 'rgb(' +
                                Math.round(rgb[0]) + ',' +
                                Math.round(rgb[1]) + ',' +
                                Math.round(rgb[2]) + ')';
                            var color2 = '#000';
                            jsc.picker.sldGrad.draw(THIS.sliderSize, THIS.height, color1, color2);
                            break;
                    }
                }
                function redrawSld() {
                    var sldComponent = jsc.getSliderComponent(THIS);
                    if (sldComponent) {
                        switch (sldComponent) {
                            case 's':
                                var yComponent = 1;
                                break;
                            case 'v':
                                var yComponent = 2;
                                break;
                        }
                        var y = Math.round((1 - THIS.hsv[yComponent] / 100) * (THIS.height - 1));
                        jsc.picker.sldPtrOB.style.top = (y - (2 * THIS.pointerBorderWidth + THIS.pointerThickness) - Math.floor(sliderPtrSpace / 2)) + 'px';
                    }
                }
                function isPickerOwner() {
                    return jsc.picker && jsc.picker.owner === THIS;
                }
                function blurValue() {
                    THIS.importColor();
                }
                if (typeof targetElement === 'string') {
                    var id = targetElement;
                    var elm = document.getElementById(id);
                    if (elm) {
                        this.targetElement = elm;
                    }
                    else {
                        jsc.warn('Could not find target element with ID \'' + id + '\'');
                    }
                }
                else if (targetElement) {
                    this.targetElement = targetElement;
                }
                else {
                    jsc.warn('Invalid target element: \'' + targetElement + '\'');
                }
                if (this.targetElement._jscLinkedInstance) {
                    jsc.warn('Cannot link jscolor twice to the same element. Skipping.');
                    return;
                }
                this.targetElement._jscLinkedInstance = this;
                this.valueElement = jsc.fetchElement(this.valueElement);
                this.styleElement = jsc.fetchElement(this.styleElement);
                var THIS = this;
                var container = this.container ?
                    jsc.fetchElement(this.container) :
                    document.getElementsByTagName('body')[0];
                var sliderPtrSpace = 3;
                if (jsc.isElementType(this.targetElement, 'button')) {
                    if (this.targetElement.onclick) {
                        var origCallback = this.targetElement.onclick;
                        this.targetElement.onclick = function (evt) {
                            origCallback.call(this, evt);
                            return false;
                        };
                    }
                    else {
                        this.targetElement.onclick = function () { return false; };
                    }
                }
                if (this.valueElement) {
                    if (jsc.isElementType(this.valueElement, 'input')) {
                        var updateField = function () {
                            THIS.fromString(THIS.valueElement.value, jsc.leaveValue);
                            jsc.dispatchFineChange(THIS);
                        };
                        jsc.attachEvent(this.valueElement, 'keyup', updateField);
                        jsc.attachEvent(this.valueElement, 'input', updateField);
                        jsc.attachEvent(this.valueElement, 'blur', blurValue);
                        this.valueElement.setAttribute('autocomplete', 'off');
                    }
                }
                if (this.styleElement) {
                    this.styleElement._jscOrigStyle = {
                        backgroundImage: this.styleElement.style.backgroundImage,
                        backgroundColor: this.styleElement.style.backgroundColor,
                        color: this.styleElement.style.color
                    };
                }
                if (this.value) {
                    this.fromString(this.value) || this.exportColor();
                }
                else {
                    this.importColor();
                }
            }
        };
        jsc.jscolor.lookupClass = 'jscolor';
        jsc.jscolor.installByClassName = function (className) {
            var inputElms = document.getElementsByTagName('input');
            var buttonElms = document.getElementsByTagName('button');
            jsc.tryInstallOnElements(inputElms, className);
            jsc.tryInstallOnElements(buttonElms, className);
        };
        jsc.register();
        return jsc.jscolor;
    })();
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 * splash-screen is very simple to use to setup a splash-screen for your
	 * application
	 *
	 * @author Howard.Zuo
	 * @date   May 11th, 2016
	 *
	 **/
	"use strict";
	var Splash = {
	    version: '2.4.0',
	    enable: function (theme) {
	        loadBody(function ($body) {
	            addClass($body, 'splashing');
	            var $splash = splashDiv();
	            $body.appendChild($splash);
	            if (!theme || !themes[theme]) {
	                theme = 'tailing';
	            }
	            themes[theme]($splash);
	            addClass($splash, theme);
	        });
	    },
	    isRunning: function () {
	        if (!document || !document.body) {
	            return;
	        }
	        return hasClass(document.body, 'splashing');
	    },
	    destroy: function () {
	        loadBody(function ($body) {
	            removeClass($body, 'splashing');
	            var $splash = getSplash($body);
	            if ($splash) {
	                $body.removeChild($splash);
	            }
	        });
	    }
	};
	exports.Splash = Splash;
	var elementClass = function (tag, className) {
	    var ele = document.createElement(tag);
	    ele.setAttribute('class', className);
	    return ele;
	};
	var elementTxt = function (tag, text) {
	    var ele = document.createElement(tag);
	    ele.innerText = text;
	    return ele;
	};
	var splashDiv = function () {
	    return elementClass('div', 'splash');
	};
	var tailingHandler = function ($splash) {
	    $splash.appendChild(elementTxt('span', 'Loading'));
	};
	var windcatcherHandler = function ($splash) {
	    for (var i = 0; i < 8; i++) {
	        $splash.appendChild(elementClass('div', 'blade'));
	    }
	};
	var circularHandler = function ($splash) {
	    var arr = [
	        'spinner-blue',
	        'spinner-red',
	        'spinner-yellow',
	        'spinner-green'
	    ];
	    for (var i = 0; i < arr.length; i++) {
	        var layer = elementClass('div', 'spinner-layer ' + arr[i]);
	        var circleLeft = elementClass('div', 'circle-clipper left');
	        var circle01 = elementClass('div', 'circle');
	        circleLeft.appendChild(circle01);
	        layer.appendChild(circleLeft);
	        var gapPatch = elementClass('div', 'gap-patch');
	        var circle02 = elementClass('div', 'circle');
	        gapPatch.appendChild(circle02);
	        layer.appendChild(gapPatch);
	        var circleRight = elementClass('div', 'circle-clipper right');
	        var circle03 = elementClass('div', 'circle');
	        circleRight.appendChild(circle03);
	        layer.appendChild(circleRight);
	        $splash.appendChild(layer);
	    }
	};
	var emptyHandler = function () { };
	var themes = {
	    tailing: tailingHandler,
	    windcatcher: windcatcherHandler,
	    'audio-wave': emptyHandler,
	    'spinner-section': emptyHandler,
	    'spinner-section-far': emptyHandler,
	    circular: circularHandler
	};
	var hasClass = function (ele, cls) {
	    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	};
	var addClass = function (ele, cls) {
	    if (!hasClass(ele, cls)) {
	        ele.className += ' ' + cls;
	    }
	};
	var removeClass = function (ele, cls) {
	    if (hasClass(ele, cls)) {
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	        ele.className = ele.className.replace(reg, ' ');
	    }
	};
	var loadBody = function (callback) {
	    var $body = document.body;
	    if ($body) {
	        callback($body);
	        return;
	    }
	    setTimeout(function () {
	        $body = document.body;
	        if (!$body) {
	            loadBody(callback);
	            return;
	        }
	        callback($body);
	    }, 100);
	};
	var getSplash = function ($body) {
	    var children = $body.children;
	    for (var i = 0; i < children.length; i++) {
	        if (hasClass(children[i], 'splash')) {
	            return children[i];
	        }
	    }
	};


/***/ }
/******/ ])
});
;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(17);
var TypeObject_1 = __webpack_require__(1);
var Animator_1 = __webpack_require__(0);
var DrawingClass = (function () {
    function DrawingClass(HTMLHandler, soundController) {
        this.defaultColor = "white";
        this.audio = false;
        this.lineWidth = 4;
        this.animationSpeed = 500;
        this.color = '#ffff66';
        this.HTMLHandler = HTMLHandler;
        this.animator = new Animator_1.Animator();
        this.canvas = document.getElementById("canvas");
        this.defaultLineWidth = 2;
        this.brush = this.canvas.getContext("2d");
        this.Rtype = new TypeObject_1.TypeObject("Rtype", "add, addu, sub, subu, and, or, slt, sltu".split(", "), [this.PC.bind(this), this.fromPC.bind(this), this.readAddress.bind(this), this.fromReadAddress.bind(this), this.instruction3126.bind(this), this.drawControl.bind(this), this.regDst.bind(this), this.aluOp.bind(this), this.ALUcontrol.bind(this), this.regWrite.bind(this), this.instruction2521.bind(this), this.instruction2016.bind(this), this.instruction2016_1.bind(this), this.instruction1511.bind(this), this.drawMUX1511.bind(this), this.muxToWriteRegister.bind(this), this.registers.bind(this), this.readData1.bind(this), this.readData2.bind(this), this.muxALU.bind(this), this.muxALUtoALUBottom.bind(this), this.instruction150.bind(this), this.instruction50.bind(this), this.aluControlToAluBottom.bind(this), this.aluBottom.bind(this), this.fromALUResult.bind(this), this.toMuxBottomRight.bind(this), this.bottomRightMux.bind(this), this.bottomRightMuxToWriteData.bind(this)], "10", ["1", "0", "X", "1", "0", "0", "0", "10", "0"]);
        this.Itype = new TypeObject_1.TypeObject("Itype", "addi, addiu, andi, slti, sltiu, ori".split(", "), [this.PC.bind(this), this.fromPC.bind(this), this.readAddress.bind(this), this.fromReadAddress.bind(this), this.instruction3126.bind(this), this.drawControl.bind(this), this.aluOp.bind(this), this.ALUcontrol.bind(this), this.aluSrc.bind(this), this.regWrite.bind(this), this.instruction2521.bind(this), this.instruction2016.bind(this), this.draw2016toMUX.bind(this), this.drawMUX1511.bind(this), this.muxToWriteRegister.bind(this), this.registers.bind(this), this.readData1.bind(this), this.instruction150.bind(this), this.signExtended.bind(this), this.signExtendToShiftLeftBottom.bind(this), this.signExtendToMUX.bind(this), this.muxALU.bind(this), this.muxALUtoALUBottom.bind(this), this.aluControlToAluBottom.bind(this), this.aluBottom.bind(this), this.fromALUResult.bind(this), this.toMuxBottomRight.bind(this), this.bottomRightMux.bind(this), this.bottomRightMuxToWriteData.bind(this)], "10", ["0", "1", "X", "1", "0", "0", "0", "10", "0"]);
        this.lw = new TypeObject_1.TypeObject("lw", "lw, lb".split(", "), [this.PC.bind(this), this.fromPC.bind(this), this.readAddress.bind(this), this.fromReadAddress.bind(this), this.instruction3126.bind(this), this.drawControl.bind(this), this.memRead.bind(this), this.memToReg.bind(this), this.aluOp.bind(this), this.ALUcontrol.bind(this), this.aluSrc.bind(this), this.regWrite.bind(this), this.instruction2521.bind(this), this.instruction2016.bind(this), this.draw2016toMUX.bind(this), this.drawMUX1511.bind(this), this.muxToWriteRegister.bind(this), this.registers.bind(this), this.readData1.bind(this), this.instruction150.bind(this), this.signExtended.bind(this), this.signExtendToShiftLeftBottom.bind(this), this.signExtendToMUX.bind(this), this.muxALU.bind(this), this.muxALUtoALUBottom.bind(this), this.aluControlToAluBottom.bind(this), this.aluBottom.bind(this), this.fromALUResult.bind(this), this.ALUbottomToAddress.bind(this), this.dataMemory.bind(this), this.readDataToMuxBottomRight.bind(this), this.bottomRightMux.bind(this), this.bottomRightMuxToWriteData.bind(this)], "00", ["0", "1", "1", "1", "1", "0", "0", "00", "0"]);
        this.sw = new TypeObject_1.TypeObject("sw", "sw, sb".split(", "), [this.PC.bind(this), this.fromPC.bind(this), this.readAddress.bind(this), this.fromReadAddress.bind(this), this.instruction3126.bind(this), this.drawControl.bind(this), this.aluSrc.bind(this), this.memWrite.bind(this), this.aluOp.bind(this), this.ALUcontrol.bind(this), this.instruction2521.bind(this), this.instruction2016.bind(this), this.instruction2016_1.bind(this), this.registers.bind(this), this.readData1.bind(this), this.instruction150.bind(this), this.signExtended.bind(this), this.signExtendToShiftLeftBottom.bind(this), this.signExtendToMUX.bind(this), this.muxALU.bind(this), this.muxALUtoALUBottom.bind(this), this.aluControlToAluBottom.bind(this), this.aluBottom.bind(this), this.fromALUResult.bind(this), this.ALUbottomToAddress.bind(this), this.readData2ToWriteData.bind(this), this.dataMemory.bind(this)], "00", ["x", "1", "X", "0", "0", "1", "0", "00", "0"]);
        this.beq = new TypeObject_1.TypeObject("beq", "beq, ".split(", "), [this.PC.bind(this), this.fromPC.bind(this), this.readAddress.bind(this), this.fromReadAddress.bind(this), this.instruction3126.bind(this), this.drawControl.bind(this), this.branch.bind(this), this.aluOp.bind(this), this.ALUcontrol.bind(this), this.instruction2521.bind(this), this.instruction2016.bind(this), this.instruction2016_1.bind(this), this.registers.bind(this), this.readData1.bind(this), this.readData2.bind(this), this.muxALU.bind(this), this.muxALUtoALUBottom.bind(this), this.aluControlToAluBottom.bind(this), this.aluBottom.bind(this), this.zeroToHalfCircle.bind(this), this.HalfCircle.bind(this), this.halfCircleToMux.bind(this), this.instruction150.bind(this), this.signExtended.bind(this), this.signExtendToShiftLeftBottom.bind(this), this.toShiftLeft2.bind(this), this.shiftLeftBottom.bind(this), this.shiftLeft2ToALUTop.bind(this), this.toADD.bind(this), this.add4.bind(this), this.drawADD.bind(this), this.addToMux_1.bind(this), this.aluTop.bind(this), this.topALUToMux.bind(this), this.halfCircleMUX.bind(this), this.muxToMux.bind(this), this.topRightMUX.bind(this), this.MuxToPC.bind(this)], "01", ["X", "0", "X", "0", "0", "0", "1", "01", "0"]);
        this.j = new TypeObject_1.TypeObject("j", "j, ".split(", "), [this.PC.bind(this), this.fromPC.bind(this), this.readAddress.bind(this), this.fromReadAddress.bind(this), this.instruction3126.bind(this), this.drawControl.bind(this), this.jump.bind(this), this.instruction250.bind(this), this.shiftLeft2.bind(this), this.fromJumpAddress.bind(this), this.toADD.bind(this), this.add4.bind(this), this.drawADD.bind(this), this.addToJumpAddress.bind(this), this.jumpAddress310.bind(this), this.topRightMUX.bind(this), this.MuxToPC.bind(this)], "XX", ["X", "X", "X", "0", "0", "0", "X", "XX", "1"]);
        this.typeObjectArray = new Array();
        this.typeObjectArray[0] = this.Rtype;
        this.typeObjectArray[1] = this.Itype;
        this.typeObjectArray[2] = this.lw;
        this.typeObjectArray[3] = this.sw;
        this.typeObjectArray[4] = this.beq;
        this.typeObjectArray[5] = this.j;
        this.soundController = soundController;
        console.log("Drawing Object constructed");
    }
    DrawingClass.prototype.setAudio = function (playing) {
        this.audio = playing;
    };
    DrawingClass.prototype.getTypeObjectArray = function () {
        return this.typeObjectArray;
    };
    DrawingClass.prototype.setColor = function (color) {
        this.color = color;
    };
    DrawingClass.prototype.setDefaultColor = function (defaultColor) {
        this.defaultColor = defaultColor;
    };
    DrawingClass.prototype.setAnimationSpeed = function (animationSpeed) {
        this.animationSpeed = animationSpeed;
    };
    DrawingClass.prototype.runInstruction = function (instruction, time) {
        console.log(instruction);
        var functionToDraw;
        var numberOfFunctions;
        if (instruction == "")
            return;
        var arrayToSend = [];
        if (this.Rtype.isThisType(instruction)) {
            functionToDraw = function () { this.draw(this.Rtype); }.bind(this);
            numberOfFunctions = this.Rtype.getNumberOfFunctions();
            arrayToSend = this.Rtype.controlSingals;
        }
        else if (this.Itype.isThisType(instruction)) {
            functionToDraw = function () { this.draw(this.Itype); }.bind(this);
            numberOfFunctions = this.Itype.getNumberOfFunctions();
            arrayToSend = this.Itype.controlSingals;
        }
        else if (this.lw.isThisType(instruction)) {
            functionToDraw = function () { this.draw(this.lw); }.bind(this);
            numberOfFunctions = this.lw.getNumberOfFunctions();
            arrayToSend = this.lw.controlSingals;
        }
        else if (this.sw.isThisType(instruction)) {
            functionToDraw = function () { this.draw(this.sw); }.bind(this);
            numberOfFunctions = this.sw.getNumberOfFunctions();
            arrayToSend = this.sw.controlSingals;
        }
        else if (this.beq.isThisType(instruction)) {
            functionToDraw = function () { this.draw(this.beq); }.bind(this);
            numberOfFunctions = this.beq.getNumberOfFunctions();
            arrayToSend = this.beq.controlSingals;
        }
        else if (this.j.isThisType(instruction)) {
            functionToDraw = function () { this.draw(this.j); }.bind(this);
            numberOfFunctions = this.j.getNumberOfFunctions();
            arrayToSend = this.j.controlSingals;
        }
        console.log(arrayToSend);
        this.animator.aniamte(function () {
            functionToDraw();
            this.HTMLHandler.updateDetailedTable(instruction, arrayToSend);
        }.bind(this), time);
        return ((numberOfFunctions * this.animationSpeed) + 1000);
    };
    DrawingClass.prototype.MuxToPC = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.MuxToPC);
        this.brush.beginPath();
        this.brush.moveTo(0.02 * this.canvas.width, 0.551 * this.canvas.height);
        this.brush.lineTo(0.01 * this.canvas.width, 0.551 * this.canvas.height);
        this.brush.lineTo(0.01 * this.canvas.width, 0.022 * this.canvas.height);
        this.brush.lineTo(0.97 * this.canvas.width, 0.022 * this.canvas.height);
        this.brush.lineTo(0.97 * this.canvas.width, 0.147 * this.canvas.height);
        this.brush.lineTo(0.962 * this.canvas.width, 0.147 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(.02 * this.canvas.width, 0.551 * this.canvas.height);
    };
    DrawingClass.prototype.PC = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.pc);
        this.brush.strokeRect(0.034 * this.canvas.width, 0.482 * this.canvas.height, 0.035 * this.canvas.width, 0.137 * this.canvas.height);
        this.brush.fillText("PC", 0.04 * this.canvas.width, 0.560 * this.canvas.height);
    };
    DrawingClass.prototype.fromPC = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.069 * this.canvas.width, 0.551 * this.canvas.height);
        this.brush.lineTo(0.088 * this.canvas.width, 0.551 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.088 * this.canvas.width, 0.551 * this.canvas.height);
    };
    DrawingClass.prototype.toADD = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.069 * this.canvas.width, 0.551 * this.canvas.height);
        this.brush.lineTo(0.08 * this.canvas.width, 0.551 * this.canvas.height);
        this.brush.lineTo(0.08 * this.canvas.width, 0.105 * this.canvas.height);
        this.brush.lineTo(0.11 * this.canvas.width, 0.105 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.11 * this.canvas.width, 0.105 * this.canvas.height);
    };
    DrawingClass.prototype.drawADD = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.add);
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
        this.brush.fillText("Add", 0.133 * this.canvas.width, 0.13 * this.canvas.height);
    };
    DrawingClass.prototype.topRightMUX = function () {
        this.brush.strokeRect(0.933 * this.canvas.width, 0.078 * this.canvas.height, 0.028 * this.canvas.width, 0.137 * this.canvas.height);
        this.brush.fillText("1", 0.936 * this.canvas.width, 0.103 * this.canvas.height);
        this.brush.fillText("M", 0.937 * this.canvas.width, 0.131 * this.canvas.height);
        this.brush.fillText("u", 0.939 * this.canvas.width, 0.154 * this.canvas.height);
        this.brush.fillText("x", 0.939 * this.canvas.width, 0.177 * this.canvas.height);
        this.brush.fillText("0", 0.936 * this.canvas.width, 0.200 * this.canvas.height);
    };
    DrawingClass.prototype.readAddress = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.readAddress);
        this.brush.strokeRect(0.102 * this.canvas.width, 0.528 * this.canvas.height, 0.081 * this.canvas.width, 0.206 * this.canvas.height);
        this.brush.fillText("Read", 0.108 * this.canvas.width, 0.551 * this.canvas.height);
        this.brush.fillText("Address", 0.108 * this.canvas.width, 0.574 * this.canvas.height);
        this.brush.fillText("Instructions", 0.103 * this.canvas.width, 0.620 * this.canvas.height);
        this.brush.fillText("[31-0]", 0.140 * this.canvas.width, 0.643 * this.canvas.height);
        this.brush.fillText("Instruction", 0.103 * this.canvas.width, 0.689 * this.canvas.height);
        this.brush.fillText("memory", 0.108 * this.canvas.width, 0.712 * this.canvas.height);
    };
    DrawingClass.prototype.fromReadAddress = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.183 * this.canvas.width, 0.632 * this.canvas.height);
        this.brush.lineTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
        this.brush.stroke();
    };
    DrawingClass.prototype.instruction2016 = function (stringALU, instruction3126, instruction2521, instruction2016, instruction1511, instruction150, instruction250) {
        var text = instruction2016;
        if (text == undefined)
            text = "";
        this.brush.beginPath();
        this.brush.moveTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
        this.brush.lineTo(0.198 * this.canvas.width, 0.586 * this.canvas.height);
        this.brush.lineTo(0.267 * this.canvas.width, 0.586 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText(text, 0.201 * this.canvas.width, 0.572 * this.canvas.height);
    };
    DrawingClass.prototype.instruction2016_1 = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.267 * this.canvas.width, 0.586 * this.canvas.height);
        this.brush.lineTo(0.345 * this.canvas.width, 0.586 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.345 * this.canvas.width, 0.586 * this.canvas.height);
    };
    DrawingClass.prototype.instruction2521 = function (stringALU, instruction3126, instruction2521, instruction2016, instruction1511, instruction150, instruction250) {
        var text = "";
        if (this.brush.lineWidth != this.defaultLineWidth)
            text = instruction2521;
        if (text == undefined)
            text = "";
        this.brush.beginPath();
        this.brush.moveTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
        this.brush.lineTo(0.198 * this.canvas.width, 0.54 * this.canvas.height);
        this.brush.lineTo(0.345 * this.canvas.width, 0.54 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.345 * this.canvas.width, 0.54 * this.canvas.height);
        this.brush.fillText(text, 0.201 * this.canvas.width, 0.526 * this.canvas.height);
    };
    DrawingClass.prototype.instruction3126 = function (stringALU, instruction3126, instruction2531, instruction2016, instruction1511, instruction150, instruction250) {
        var str = stringALU;
        var text = "";
        if (this.brush.lineWidth != this.defaultLineWidth)
            text = instruction3126;
        if (text == undefined)
            text = "";
        this.brush.beginPath();
        this.brush.moveTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
        this.brush.lineTo(0.198 * this.canvas.width, 0.372 * this.canvas.height);
        this.brush.lineTo(0.296 * this.canvas.width, 0.372 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.296 * this.canvas.width, 0.372 * this.canvas.height);
        this.brush.fillText(text, 0.198 * this.canvas.width, 0.354 * this.canvas.height);
    };
    DrawingClass.prototype.instruction1511 = function (stringALU, instruction3126, instruction2521, instruction2016, instruction1511, instruction150, instruction250) {
        if (instruction1511 == undefined)
            instruction1511 = "";
        this.brush.beginPath();
        this.brush.moveTo(0.198 * this.canvas.width, 0.632 * this.canvas.height);
        this.brush.lineTo(0.198 * this.canvas.width, 0.678 * this.canvas.height);
        this.brush.lineTo(0.296 * this.canvas.width, 0.678 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.296 * this.canvas.width, 0.678 * this.canvas.height);
        this.brush.fillText(instruction1511, 0.201 * this.canvas.width, 0.666 * this.canvas.height);
    };
    DrawingClass.prototype.instruction150 = function (stringALU, instruction3126, instruction2521, instruction2016, instruction1511, instruction150, instruction250) {
        if (instruction150 == undefined)
            instruction150 = "";
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
        this.brush.fillText(instruction150, 0.201 * this.canvas.width, 0.804 * this.canvas.height);
        this.brush.fillText("16", 0.351 * this.canvas.width, 0.802 * this.canvas.height);
    };
    DrawingClass.prototype.instruction250 = function (stringALU, instruction3126, instruction2521, instruction2016, instruction1511, instruction150, instruction250) {
        if (instruction250 == undefined)
            instruction250 = "";
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
        this.brush.fillText(instruction250, 0.217 * this.canvas.width, 0.058 * this.canvas.height);
        this.brush.fillText("26", 0.27 * this.canvas.width, 0.099 * this.canvas.height);
    };
    DrawingClass.prototype.drawControl = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.drawControl);
        this.brush.beginPath();
        this.brush.ellipse(0.349 * this.canvas.width, 0.356 * this.canvas.height, 0.037 * this.canvas.width, 0.137 * this.canvas.height, 0, 0, 2 * Math.PI);
        this.brush.stroke();
        this.brush.fillText("Control", 0.325 * this.canvas.width, 0.379 * this.canvas.height);
    };
    DrawingClass.prototype.drawMUX1511 = function () {
        this.brush.strokeRect(0.308 * this.canvas.width, 0.610 * this.canvas.height, 0.035 * this.canvas.width, 0.137 * this.canvas.height);
        this.brush.fillText("0", 0.318 * this.canvas.width, 0.645 * this.canvas.height);
        this.brush.fillText("M", 0.318 * this.canvas.width, 0.670 * this.canvas.height);
        this.brush.fillText("u", 0.318 * this.canvas.width, 0.691 * this.canvas.height);
        this.brush.fillText("x", 0.318 * this.canvas.width, 0.710 * this.canvas.height);
        this.brush.fillText("1", 0.318 * this.canvas.width, 0.733 * this.canvas.height);
    };
    DrawingClass.prototype.draw2016toMUX = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.266 * this.canvas.width, 0.586 * this.canvas.height);
        this.brush.lineTo(0.266 * this.canvas.width, 0.620 * this.canvas.height);
        this.brush.lineTo(0.296 * this.canvas.width, 0.620 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.296 * this.canvas.width, 0.620 * this.canvas.height);
    };
    DrawingClass.prototype.signExtended = function () {
        this.brush.beginPath();
        this.brush.ellipse(0.406 * this.canvas.width, 0.820 * this.canvas.height, 0.027 * this.canvas.width, 0.057 * this.canvas.height, 0, 0, 2 * Math.PI);
        this.brush.stroke();
        this.brush.fillText("Sign-", 0.392 * this.canvas.width, 0.813 * this.canvas.height);
        this.brush.fillText("extended", 0.38 * this.canvas.width, 0.836 * this.canvas.height);
    };
    DrawingClass.prototype.muxToWriteRegister = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.muxToWriteRegister);
        this.brush.beginPath();
        this.brush.moveTo(0.343 * this.canvas.width, 0.666 * this.canvas.height);
        this.brush.lineTo(0.345 * this.canvas.width, 0.666 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.345 * this.canvas.width, 0.666 * this.canvas.height);
    };
    DrawingClass.prototype.registers = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.registers);
        this.brush.strokeRect(0.358 * this.canvas.width, 0.517 * this.canvas.height, 0.118 * this.canvas.width, 0.229 * this.canvas.height);
        this.brush.fillText("Read", 0.365 * this.canvas.width, 0.54 * this.canvas.height);
        this.brush.fillText("register 1", 0.365 * this.canvas.width, 0.563 * this.canvas.height);
        this.brush.fillText("Read", 0.365 * this.canvas.width, 0.586 * this.canvas.height);
        this.brush.fillText("register 2", 0.365 * this.canvas.width, 0.609 * this.canvas.height);
        this.brush.fillText("Write", 0.365 * this.canvas.width, 0.655 * this.canvas.height);
        this.brush.fillText("register", 0.365 * this.canvas.width, 0.678 * this.canvas.height);
        this.brush.fillText("Write", 0.365 * this.canvas.width, 0.717 * this.canvas.height);
        this.brush.fillText("data", 0.365 * this.canvas.width, 0.74 * this.canvas.height);
        this.brush.fillText("Read", 0.434 * this.canvas.width, 0.572 * this.canvas.height);
        this.brush.fillText("data 1", 0.432 * this.canvas.width, 0.595 * this.canvas.height);
        this.brush.fillText("Read", 0.434 * this.canvas.width, 0.664 * this.canvas.height);
        this.brush.fillText("data 2", 0.432 * this.canvas.width, 0.687 * this.canvas.height);
        this.brush.fillText("Registers", 0.405 * this.canvas.width, 0.735 * this.canvas.height);
    };
    DrawingClass.prototype.shiftLeft2 = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.shiftLeft2);
        this.brush.beginPath();
        this.brush.ellipse(0.336 * this.canvas.width, 0.08 * this.canvas.height, 0.026 * this.canvas.width, 0.041 * this.canvas.height, 0, 0, 2 * Math.PI);
        this.brush.stroke();
        this.brush.fillText("Shift", 0.32 * this.canvas.width, 0.071 * this.canvas.height);
        this.brush.fillText("left 2", 0.318 * this.canvas.width, 0.098 * this.canvas.height);
    };
    DrawingClass.prototype.regDst = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.regDst);
        this.brush.beginPath();
        this.brush.moveTo(0.374 * this.canvas.width, 0.252 * this.canvas.height);
        this.brush.lineTo(0.391 * this.canvas.width, 0.252 * this.canvas.height);
        this.brush.lineTo(0.391 * this.canvas.width, 0.195 * this.canvas.height);
        this.brush.lineTo(0.194 * this.canvas.width, 0.195 * this.canvas.height);
        this.brush.lineTo(0.194 * this.canvas.width, 0.758 * this.canvas.height);
        this.brush.lineTo(0.325 * this.canvas.width, 0.758 * this.canvas.height);
        this.brush.lineTo(0.325 * this.canvas.width, 0.748 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("RegDst", 0.397 * this.canvas.width, 0.248 * this.canvas.height);
    };
    DrawingClass.prototype.jump = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.jump);
        this.brush.beginPath();
        this.brush.moveTo(0.380 * this.canvas.width, 0.287 * this.canvas.height);
        this.brush.lineTo(0.499 * this.canvas.width, 0.287 * this.canvas.height);
        this.brush.lineTo(0.499 * this.canvas.width, 0.045 * this.canvas.height);
        this.brush.lineTo(0.948 * this.canvas.width, 0.045 * this.canvas.height);
        this.brush.lineTo(0.948 * this.canvas.width, 0.078 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("Jump", 0.398 * this.canvas.width, 0.275 * this.canvas.height);
    };
    DrawingClass.prototype.readData1 = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.readData1);
        this.brush.beginPath();
        this.brush.moveTo(0.477 * this.canvas.width, 0.574 * this.canvas.height);
        this.brush.lineTo(0.574 * this.canvas.width, 0.574 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.574 * this.canvas.width, 0.574 * this.canvas.height);
    };
    DrawingClass.prototype.readData2 = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.readData2);
        this.brush.beginPath();
        this.brush.moveTo(0.477 * this.canvas.width, 0.666 * this.canvas.height);
        this.brush.lineTo(0.518 * this.canvas.width, 0.666 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.518 * this.canvas.width, 0.666 * this.canvas.height);
    };
    DrawingClass.prototype.readData2ToWriteData = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.488 * this.canvas.width, 0.666 * this.canvas.height);
        this.brush.lineTo(0.488 * this.canvas.width, 0.758 * this.canvas.height);
        this.brush.lineTo(0.740 * this.canvas.width, 0.758 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.74 * this.canvas.width, 0.758 * this.canvas.height);
    };
    DrawingClass.prototype.dataMemory = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.dataMemory);
        this.brush.strokeRect(0.755 * this.canvas.width, 0.597 * this.canvas.height, 0.118 * this.canvas.width, 0.29 * this.canvas.height);
        this.brush.fillText("Address", 0.762 * this.canvas.width, 0.643 * this.canvas.height);
        this.brush.fillText("Read", 0.829 * this.canvas.width, 0.636 * this.canvas.height);
        this.brush.fillText("data", 0.835 * this.canvas.width, 0.659 * this.canvas.height);
        this.brush.fillText("Write", 0.762 * this.canvas.width, 0.754 * this.canvas.height);
        this.brush.fillText("data", 0.762 * this.canvas.width, 0.777 * this.canvas.height);
        this.brush.fillText("Data", 0.822 * this.canvas.width, 0.770 * this.canvas.height);
        this.brush.fillText("memory", 0.814 * this.canvas.width, 0.793 * this.canvas.height);
    };
    DrawingClass.prototype.instruction50 = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.343 * this.canvas.width, 0.816 * this.canvas.height);
        this.brush.lineTo(0.343 * this.canvas.width, 0.931 * this.canvas.height);
        this.brush.lineTo(0.530 * this.canvas.width, 0.931 * this.canvas.height);
        this.brush.lineTo(0.530 * this.canvas.width, 0.839 * this.canvas.height);
        this.brush.lineTo(0.536 * this.canvas.width, 0.839 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.536 * this.canvas.width, 0.839 * this.canvas.height);
        this.brush.fillText("Instruction [5-0]", 0.362 * this.canvas.width, 0.912 * this.canvas.height);
    };
    DrawingClass.prototype.ALUcontrol = function () {
        this.brush.beginPath();
        this.brush.ellipse(0.58 * this.canvas.width, 0.845 * this.canvas.height, 0.032 * this.canvas.width, 0.064 * this.canvas.height, 0, 0, 2 * Math.PI);
        this.brush.stroke();
        this.brush.fillText("ALU", 0.565 * this.canvas.width, 0.843 * this.canvas.height);
        this.brush.fillText("control", 0.56 * this.canvas.width, 0.866 * this.canvas.height);
    };
    DrawingClass.prototype.aluBottom = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.aluBottom);
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
        this.brush.fillText("ALU", 0.614 * this.canvas.width, 0.632 * this.canvas.height);
        this.brush.fillText("Zero", 0.651 * this.canvas.width, 0.597 * this.canvas.height);
        this.brush.fillText("ALU", 0.651 * this.canvas.width, 0.643 * this.canvas.height);
        this.brush.fillText("result", 0.644 * this.canvas.width, 0.666 * this.canvas.height);
    };
    DrawingClass.prototype.muxALU = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.muxALU);
        this.brush.strokeRect(0.533 * this.canvas.width, 0.6 * this.canvas.height, 0.028 * this.canvas.width, 0.137 * this.canvas.height);
        this.brush.fillText("0", 0.540 * this.canvas.width, 0.640 * this.canvas.height);
        this.brush.fillText("M", 0.540 * this.canvas.width, 0.665 * this.canvas.height);
        this.brush.fillText("u", 0.540 * this.canvas.width, 0.686 * this.canvas.height);
        this.brush.fillText("x", 0.540 * this.canvas.width, 0.706 * this.canvas.height);
        this.brush.fillText("1", 0.540 * this.canvas.width, 0.728 * this.canvas.height);
    };
    DrawingClass.prototype.muxALUtoALUBottom = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.muxALUtoALUBottom);
        this.brush.beginPath();
        this.brush.moveTo(0.561 * this.canvas.width, 0.689 * this.canvas.height);
        this.brush.lineTo(0.574 * this.canvas.width, 0.689 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.574 * this.canvas.width, 0.689 * this.canvas.height);
    };
    DrawingClass.prototype.ALUbottomToAddress = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.ALUbottomToAddress);
        this.brush.beginPath();
        this.brush.moveTo(0.691 * this.canvas.width, 0.643 * this.canvas.height);
        this.brush.lineTo(0.74 * this.canvas.width, 0.643 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.74 * this.canvas.width, 0.643 * this.canvas.height);
    };
    DrawingClass.prototype.toMuxBottomRight = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.toMuxBottomRight);
        this.brush.beginPath();
        this.brush.moveTo(0.711 * this.canvas.width, 0.643 * this.canvas.height);
        this.brush.lineTo(0.711 * this.canvas.width, 0.930 * this.canvas.height);
        this.brush.lineTo(0.888 * this.canvas.width, 0.930 * this.canvas.height);
        this.brush.lineTo(0.888 * this.canvas.width, 0.689 * this.canvas.height);
        this.brush.lineTo(0.896 * this.canvas.width, 0.689 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.896 * this.canvas.width, 0.689 * this.canvas.height);
    };
    DrawingClass.prototype.readDataToMuxBottomRight = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.readDataToMuxBottomRight);
        this.brush.beginPath();
        this.brush.moveTo(0.873 * this.canvas.width, 0.620 * this.canvas.height);
        this.brush.lineTo(0.896 * this.canvas.width, 0.620 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.896 * this.canvas.width, 0.620 * this.canvas.height);
    };
    DrawingClass.prototype.bottomRightMux = function () {
        this.brush.strokeRect(0.906 * this.canvas.width, 0.590 * this.canvas.height, 0.028 * this.canvas.width, 0.137 * this.canvas.height);
        this.brush.fillText("1", 0.915 * this.canvas.width, 0.609 * this.canvas.height);
        this.brush.fillText("M", 0.915 * this.canvas.width, 0.636 * this.canvas.height);
        this.brush.fillText("u", 0.918 * this.canvas.width, 0.659 * this.canvas.height);
        this.brush.fillText("x", 0.918 * this.canvas.width, 0.682 * this.canvas.height);
        this.brush.fillText("0", 0.915 * this.canvas.width, 0.705 * this.canvas.height);
    };
    DrawingClass.prototype.bottomRightMuxToWriteData = function () {
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
    };
    DrawingClass.prototype.add4 = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.099 * this.canvas.width, 0.167 * this.canvas.height);
        this.brush.lineTo(0.111 * this.canvas.width, 0.167 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.111 * this.canvas.width, 0.167 * this.canvas.height);
        this.brush.fillText("4", 0.087 * this.canvas.width, 0.172 * this.canvas.height);
    };
    DrawingClass.prototype.signExtendToShiftLeftBottom = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.signExtendToShiftLeftBottom);
        this.brush.beginPath();
        this.brush.moveTo(0.434 * this.canvas.width, 0.82 * this.canvas.height);
        this.brush.lineTo(0.508 * this.canvas.width, 0.82 * this.canvas.height);
        this.brush.lineTo(0.508 * this.canvas.width, 0.72 * this.canvas.height);
        this.brush.moveTo(0.465 * this.canvas.width, 0.812 * this.canvas.height);
        this.brush.lineTo(0.474 * this.canvas.width, 0.827 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("32", 0.463 * this.canvas.width, 0.802 * this.canvas.height);
    };
    DrawingClass.prototype.signExtendToMUX = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.signExtendToMUX);
        this.brush.beginPath();
        this.brush.moveTo(0.508 * this.canvas.width, 0.72 * this.canvas.height);
        this.brush.lineTo(0.52 * this.canvas.width, 0.72 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.52 * this.canvas.width, 0.72 * this.canvas.height);
    };
    DrawingClass.prototype.toShiftLeft2 = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.508 * this.canvas.width, 0.72 * this.canvas.height);
        this.brush.lineTo(0.508 * this.canvas.width, 0.268 * this.canvas.height);
        this.brush.lineTo(0.522 * this.canvas.width, 0.268 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.522 * this.canvas.width, 0.268 * this.canvas.height);
    };
    DrawingClass.prototype.shiftLeftBottom = function () {
        this.brush.beginPath();
        this.brush.ellipse(0.552 * this.canvas.width, 0.27 * this.canvas.height, 0.035 * this.canvas.height, 0.041 * this.canvas.height, 0, 0, 2 * Math.PI);
        this.brush.stroke();
        this.brush.fillText("Shift", 0.544 * this.canvas.width, 0.265 * this.canvas.height);
        this.brush.fillText("left 2", 0.544 * this.canvas.width, 0.285 * this.canvas.height);
    };
    DrawingClass.prototype.HalfCircle = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.77 * this.canvas.width, 0.333 * this.canvas.height);
        this.brush.lineTo(0.755 * this.canvas.width, 0.333 * this.canvas.height);
        this.brush.lineTo(0.755 * this.canvas.width, 0.268 * this.canvas.height);
        this.brush.lineTo(0.77 * this.canvas.width, 0.268 * this.canvas.height);
        this.brush.arc(0.77 * this.canvas.width, 0.301 * this.canvas.height, 0.0321 * this.canvas.height, 1.5 * Math.PI, Math.PI / 2);
        this.brush.stroke();
    };
    DrawingClass.prototype.zeroToHalfCircle = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.691 * this.canvas.width, 0.586 * this.canvas.height);
        this.brush.lineTo(0.718 * this.canvas.width, 0.586 * this.canvas.height);
        this.brush.lineTo(0.718 * this.canvas.width, 0.321 * this.canvas.height);
        this.brush.lineTo(0.755 * this.canvas.width, 0.321 * this.canvas.height);
        this.brush.stroke();
    };
    DrawingClass.prototype.branch = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.branch);
        this.brush.beginPath();
        this.brush.moveTo(0.385 * this.canvas.width, 0.314 * this.canvas.height);
        this.brush.lineTo(0.696 * this.canvas.width, 0.314 * this.canvas.height);
        this.brush.lineTo(0.696 * this.canvas.width, 0.275 * this.canvas.height);
        this.brush.lineTo(0.755 * this.canvas.width, 0.275 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("Branch", 0.398 * this.canvas.width, 0.31 * this.canvas.height);
    };
    DrawingClass.prototype.halfCircleToMux = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.785 * this.canvas.width, 0.298 * this.canvas.height);
        this.brush.lineTo(0.82 * this.canvas.width, 0.298 * this.canvas.height);
        this.brush.lineTo(0.82 * this.canvas.width, 0.229 * this.canvas.height);
        this.brush.stroke();
    };
    DrawingClass.prototype.halfCircleMUX = function () {
        this.brush.strokeRect(0.807 * this.canvas.width, 0.093 * this.canvas.height, 0.028 * this.canvas.width, 0.137 * this.canvas.height);
        this.brush.fillText("0", 0.817 * this.canvas.width, 0.115 * this.canvas.height);
        this.brush.fillText("M", 0.819 * this.canvas.width, 0.143 * this.canvas.height);
        this.brush.fillText("u", 0.820 * this.canvas.width, 0.166 * this.canvas.height);
        this.brush.fillText("x", 0.820 * this.canvas.width, 0.189 * this.canvas.height);
        this.brush.fillText("1", 0.817 * this.canvas.width, 0.212 * this.canvas.height);
    };
    DrawingClass.prototype.memRead = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.memRead);
        this.brush.beginPath();
        this.brush.moveTo(0.386 * this.canvas.width, 0.342 * this.canvas.height);
        this.brush.lineTo(0.980 * this.canvas.width, 0.342 * this.canvas.height);
        this.brush.lineTo(0.980 * this.canvas.width, 0.950 * this.canvas.height);
        this.brush.lineTo(0.814 * this.canvas.width, 0.950 * this.canvas.height);
        this.brush.lineTo(0.814 * this.canvas.width, 0.887 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("MemRead", 0.398 * this.canvas.width, 0.337 * this.canvas.height);
    };
    DrawingClass.prototype.memToReg = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.memToReg);
        this.brush.beginPath();
        this.brush.moveTo(0.386 * this.canvas.width, 0.37 * this.canvas.height);
        this.brush.lineTo(0.920 * this.canvas.width, 0.37 * this.canvas.height);
        this.brush.lineTo(0.920 * this.canvas.width, 0.59 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("MemToReg", 0.398 * this.canvas.width, 0.365 * this.canvas.height);
    };
    DrawingClass.prototype.aluOp = function (str) {
        if (this.audio)
            this.soundController.playSound(ttsConfig.aluOp);
        this.brush.beginPath();
        this.brush.moveTo(0.385 * this.canvas.width, 0.397 * this.canvas.height);
        this.brush.lineTo(0.497 * this.canvas.width, 0.397 * this.canvas.height);
        this.brush.lineTo(0.497 * this.canvas.width, 0.954 * this.canvas.height);
        this.brush.lineTo(0.582 * this.canvas.width, 0.954 * this.canvas.height);
        this.brush.lineTo(0.582 * this.canvas.width, 0.908 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("ALUOp", 0.398 * this.canvas.width, 0.393 * this.canvas.height);
        this.brush.fillText(str, 0.588 * this.canvas.width, 0.931 * this.canvas.height);
    };
    DrawingClass.prototype.memWrite = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.memWrite);
        this.brush.beginPath();
        this.brush.moveTo(0.382 * this.canvas.width, 0.425 * this.canvas.height);
        this.brush.lineTo(0.814 * this.canvas.width, 0.425 * this.canvas.height);
        this.brush.lineTo(0.814 * this.canvas.width, 0.600 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("MemWrite", 0.398 * this.canvas.width, 0.42 * this.canvas.height);
    };
    DrawingClass.prototype.aluSrc = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.aluSrc);
        this.brush.beginPath();
        this.brush.moveTo(0.376 * this.canvas.width, 0.452 * this.canvas.height);
        this.brush.lineTo(0.548 * this.canvas.width, 0.452 * this.canvas.height);
        this.brush.lineTo(0.548 * this.canvas.width, 0.601 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("ALUSrc", 0.398 * this.canvas.width, 0.448 * this.canvas.height);
    };
    DrawingClass.prototype.regWrite = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.regWrite);
        this.brush.beginPath();
        this.brush.moveTo(0.365 * this.canvas.width, 0.480 * this.canvas.height);
        this.brush.lineTo(0.414 * this.canvas.width, 0.480 * this.canvas.height);
        this.brush.lineTo(0.414 * this.canvas.width, 0.519 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("RegWrite", 0.398 * this.canvas.width, 0.475 * this.canvas.height);
    };
    DrawingClass.prototype.aluControlToAluBottom = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.611 * this.canvas.width, 0.839 * this.canvas.height);
        this.brush.lineTo(0.637 * this.canvas.width, 0.839 * this.canvas.height);
        this.brush.lineTo(0.637 * this.canvas.width, 0.701 * this.canvas.height);
        this.brush.stroke();
    };
    DrawingClass.prototype.jumpAddress310 = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.jumpAddress310);
        this.brush.beginPath();
        this.brush.moveTo(0.40 * this.canvas.width, 0.062 * this.canvas.height);
        this.brush.lineTo(0.888 * this.canvas.width, 0.062 * this.canvas.height);
        this.brush.lineTo(0.888 * this.canvas.width, 0.085 * this.canvas.height);
        this.brush.lineTo(0.918 * this.canvas.width, 0.085 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.918 * this.canvas.width, 0.085 * this.canvas.height);
    };
    DrawingClass.prototype.fromJumpAddress = function () {
        this.brush.moveTo(0.360 * this.canvas.width, 0.062 * this.canvas.height);
        this.brush.lineTo(0.400 * this.canvas.width, 0.062 * this.canvas.height);
        this.brush.moveTo(0.365 * this.canvas.width, 0.052 * this.canvas.height);
        this.brush.lineTo(0.373 * this.canvas.width, 0.073 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("Jump address [31-0]", 0.36 * this.canvas.width, 0.045 * this.canvas.height);
    };
    DrawingClass.prototype.addToJumpAddress = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.162 * this.canvas.width, 0.144 * this.canvas.height);
        this.brush.lineTo(0.266 * this.canvas.width, 0.144 * this.canvas.height);
        this.brush.lineTo(0.266 * this.canvas.width, 0.131 * this.canvas.height);
        this.brush.lineTo(0.400 * this.canvas.width, 0.131 * this.canvas.height);
        this.brush.lineTo(0.400 * this.canvas.width, 0.062 * this.canvas.height);
        this.brush.stroke();
        this.brush.fillText("PC+4[31-28]", 0.405 * this.canvas.width, 0.134 * this.canvas.height);
    };
    DrawingClass.prototype.addToMux = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.162 * this.canvas.width, 0.144 * this.canvas.height);
        this.brush.lineTo(0.555 * this.canvas.width, 0.144 * this.canvas.height);
        this.brush.lineTo(0.555 * this.canvas.width, 0.087 * this.canvas.height);
        this.brush.lineTo(0.801 * this.canvas.width, 0.087 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.801 * this.canvas.width, 0.087 * this.canvas.height);
    };
    DrawingClass.prototype.aluTop = function () {
        if (this.audio)
            this.soundController.playSound(ttsConfig.aluTop);
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
        this.brush.fillText("Add", 0.629 * this.canvas.width, 0.206 * this.canvas.height);
        this.brush.fillText("ALU", 0.674 * this.canvas.width, 0.195 * this.canvas.height);
        this.brush.fillText("result", 0.666 * this.canvas.width, 0.218 * this.canvas.height);
    };
    DrawingClass.prototype.shiftLeft2ToALUTop = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.568 * this.canvas.width, 0.268 * this.canvas.height);
        this.brush.lineTo(0.594 * this.canvas.width, 0.268 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.594 * this.canvas.width, 0.268 * this.canvas.height);
    };
    DrawingClass.prototype.intoALUTop = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.555 * this.canvas.width, 0.126 * this.canvas.height);
        this.brush.lineTo(0.594 * this.canvas.width, 0.126 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.594 * this.canvas.width, 0.126 * this.canvas.height);
    };
    DrawingClass.prototype.topALUToMux = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.711 * this.canvas.width, 0.195 * this.canvas.height);
        this.brush.lineTo(0.8 * this.canvas.width, 0.195 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.8 * this.canvas.width, 0.195 * this.canvas.height);
    };
    DrawingClass.prototype.muxToMux = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.836 * this.canvas.width, 0.197 * this.canvas.height);
        this.brush.lineTo(0.922 * this.canvas.width, 0.197 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.922 * this.canvas.width, 0.197 * this.canvas.height);
    };
    DrawingClass.prototype.ToJumpAddress = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.266 * this.canvas.width, 0.144 * this.canvas.height);
        this.brush.lineTo(0.266 * this.canvas.width, 0.131 * this.canvas.height);
        this.brush.lineTo(0.400 * this.canvas.width, 0.131 * this.canvas.height);
        this.brush.lineTo(0.400 * this.canvas.width, 0.062 * this.canvas.height);
        this.brush.stroke();
    };
    DrawingClass.prototype.toMux = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.555 * this.canvas.width, 0.124 * this.canvas.height);
        this.brush.lineTo(0.555 * this.canvas.width, 0.087 * this.canvas.height);
        this.brush.lineTo(0.801 * this.canvas.width, 0.087 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.801 * this.canvas.width, 0.087 * this.canvas.height);
    };
    DrawingClass.prototype.fromALUResult = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.691 * this.canvas.width, 0.643 * this.canvas.height);
        this.brush.lineTo(0.711 * this.canvas.width, 0.643 * this.canvas.height);
        this.brush.stroke();
    };
    DrawingClass.prototype.addToMux_1 = function () {
        this.brush.beginPath();
        this.brush.moveTo(0.162 * this.canvas.width, 0.144 * this.canvas.height);
        this.brush.lineTo(0.555 * this.canvas.width, 0.144 * this.canvas.height);
        this.brush.lineTo(0.555 * this.canvas.width, 0.126 * this.canvas.height);
        this.brush.moveTo(0.555 * this.canvas.width, 0.126 * this.canvas.height);
        this.brush.lineTo(0.594 * this.canvas.width, 0.126 * this.canvas.height);
        this.brush.stroke();
        this.drawArrow(0.594 * this.canvas.width, 0.126 * this.canvas.height);
    };
    DrawingClass.prototype.drawArrow = function (x, y) {
        this.brush.beginPath();
        this.brush.moveTo(x, y - 4);
        this.brush.lineTo(x + 7, y);
        this.brush.lineTo(x, y + 4);
        this.brush.lineTo(x, y - 4);
        this.brush.stroke();
        this.brush.fill();
    };
    DrawingClass.prototype.drawFrame = function (func, stringALU, type, instructionAndArguments) {
        this.brush.strokeStyle = this.color;
        this.brush.fillStyle = this.color;
        this.setLineWidth(4);
        var instruction3126;
        var instruction2521;
        var instruction2016;
        var instruction1511;
        var instruction150;
        var instruction250;
        if (type == "Itype" || type == "beq") {
            instruction3126 = instructionAndArguments[0];
            instruction2521 = instructionAndArguments[2];
            instruction2016 = instructionAndArguments[1];
            instruction1511 = "";
            instruction150 = instructionAndArguments[3];
            instruction250 = "";
        }
        else if (type == "lw" || type == "sw" || type == "lb" || type == "sb") {
            console.log("0 ->" + instructionAndArguments[0]);
            console.log("\n1 ->" + instructionAndArguments[1]);
            console.log("\n2 ->" + instructionAndArguments[2]);
            console.log("\n3 ->" + instructionAndArguments[3]);
            var secondString = instructionAndArguments[2];
            var endIndex = secondString.indexOf('(');
            var arrayName = "";
            for (var i = 0; i < endIndex; i++) {
                arrayName += secondString.charAt(i);
            }
            var registerForIndex = "";
            for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                registerForIndex += secondString.charAt(i);
            }
            var registerInsedeBrackets = registerForIndex;
            instruction3126 = instructionAndArguments[0];
            instruction2521 = registerInsedeBrackets;
            instruction2016 = instructionAndArguments[1];
            instruction1511 = "";
            instruction150 = arrayName;
            instruction250 = "";
        }
        else if (type == "Rtype") {
            instruction3126 = instructionAndArguments[0];
            instruction2521 = instructionAndArguments[2];
            instruction2016 = instructionAndArguments[3];
            instruction1511 = instructionAndArguments[1];
            instruction150 = "";
            instruction250 = "";
        }
        else if (type == "j") {
            instruction3126 = instructionAndArguments[0];
            instruction2521 = "";
            instruction2016 = "";
            instruction1511 = "";
            instruction150 = "";
            instruction250 = instructionAndArguments[1];
        }
        func(stringALU, instruction3126, instruction2521, instruction2016, instruction1511, instruction150, instruction250);
    };
    DrawingClass.prototype.drawDefault = function () {
        this.setLineWidth(this.defaultLineWidth);
        this.setUpCanvas();
    };
    DrawingClass.prototype.draw = function (typeobject) {
        var str = typeobject.stringALU;
        this.setUpCanvas();
        this.setLineWidth(4);
        for (var i = 0; i < typeobject.functionsArray.length; i++) {
            this.animator.animatePath(typeobject.functionsArray[i], str, this.animationSpeed * i);
        }
    };
    DrawingClass.prototype.setLineWidth = function (lineWidth) {
        if (lineWidth <= 0 || lineWidth > 4)
            return;
        this.lineWidth = lineWidth;
        this.brush.lineWidth = this.lineWidth;
    };
    DrawingClass.prototype.setUpCanvas = function () {
        this.setAudio(false);
        this.brush.strokeStyle = this.defaultColor;
        this.brush.fillStyle = this.defaultColor;
        this.brush.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.setLineWidth(this.defaultLineWidth);
        this.MuxToPC();
        this.PC();
        this.fromPC();
        this.toADD();
        this.drawADD();
        this.topRightMUX();
        this.readAddress();
        this.fromReadAddress();
        this.instruction2016("", "", "", "", "", "", "");
        this.instruction2521("", "", "", "", "", "", "");
        this.instruction3126("", "", "", "", "", "", "");
        this.instruction1511("", "", "", "", "", "", "");
        this.instruction150("", "", "", "", "", "", "");
        this.instruction250("", "", "", "", "", "", "");
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
        this.aluOp("");
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
        this.instruction2016_1();
        this.muxToMux();
        this.signExtendToMUX();
        this.fromJumpAddress();
        this.toShiftLeft2();
        this.ToJumpAddress();
        this.toMux();
        this.fromALUResult();
        this.brush.strokeStyle = this.color;
        this.brush.fillStyle = this.color;
    };
    return DrawingClass;
}());
exports.DrawingClass = DrawingClass;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var HTMLHandler = (function () {
    function HTMLHandler() {
        this.changeColorButton = document.getElementById("changeColorButton");
        this.changeSpeedButton = document.getElementById("changeSpeedButton");
        this.speedDropDownMenu = document.getElementById("speedDropDown-content");
        this.colorDropDownContent = document.getElementById("colorDropDown-content");
        this.detailedTable = document.getElementById("detailedTable");
        this.fullScreenButton = document.getElementById("fullScreenButton");
        this.colorButton = document.getElementById("colorDropDownMenu");
        this.previousButton = document.getElementById("previousButton");
        this.nextButton = document.getElementById("nextButton");
        this.editButton = document.getElementById("editButton");
        this.textArea = document.getElementById("textInput");
        this.runButton = document.getElementById("runButton");
        this.canvas = document.getElementById("canvas");
        this.footer = document.getElementById("footer");
        this.header = document.getElementById("header");
        this.console = document.getElementById("console");
        this.body = document.body;
        this.logo = document.getElementById("logo");
        this.fasLogo = document.getElementById("fasLogo");
        this.fastButton = document.getElementById("fastButton");
        this.normalButton = document.getElementById("normalButton");
        this.slowButton = document.getElementById("slowButton");
        this.isFullScreen = false;
        this.isSoundOn = true;
        this.soundButton = document.getElementById("soundButton");
        this.registersTable = document.getElementById("registersTable");
        this.instructionAndArguments = document.getElementById("instructionAndArguments");
        this.colors = document.getElementById("colors");
        this.speed = document.getElementById("speed");
        this.changeThemeButton = document.getElementById("changeThemeButton");
        console.log("HTMLHandler constructed");
    }
    HTMLHandler.prototype.toggleSound = function () {
        this.isSoundOn = !this.isSoundOn;
        if (this.body.style.background != "white") {
            if (this.isSoundOn)
                this.soundButton.style.backgroundImage = "url('./res/soundButton.png')";
            else
                this.soundButton.style.backgroundImage = "url('./res/nosoundButton.png')";
        }
        else {
            if (this.isSoundOn)
                this.soundButton.style.backgroundImage = "url('./res/soundButton_black.png')";
            else
                this.soundButton.style.backgroundImage = "url('./res/nosoundButton_black.png')";
        }
    };
    HTMLHandler.prototype.fullScreenMode = function (boolean) {
        this.isFullScreen = boolean;
        if (boolean) {
            this.textArea.style.display = "none";
            this.footer.style.display = "none";
            this.header.style.display = "none";
            this.fasLogo.style.display = "none";
            this.canvas.className = "fullscreen";
            this.editButton.style.display = "none";
            if (this.body.style.background != "white")
                this.fullScreenButton.style.backgroundImage = "url('./res/nofullscreen.png')";
            else
                this.fullScreenButton.style.backgroundImage = "url('./res/nofullscreen_black.png')";
            this.console.style.display = "none";
            this.instructionAndArguments.style.display = "block";
        }
        else {
            this.detailedTable.style.display = "block";
            this.fullScreenButton.style.display = "block";
            this.registersTable.style.display = "block";
            this.instructionAndArguments.style.display = "none";
            if (this.body.style.background != "white")
                this.fullScreenButton.style.backgroundImage = "url('./res/fullscreen.png')";
            else
                this.fullScreenButton.style.backgroundImage = "url('./res/fullscreen_black.png')";
            this.canvas.className = "nofullscreen";
            this.detailedTable.className = "nofullscreen";
            this.nextButton.style.display = "block";
            this.textArea.style.display = "block";
            this.footer.style.display = "block";
            this.header.style.display = "block";
            this.fasLogo.style.display = "block";
            this.editButton.style.display = "block";
            this.console.style.display = "block";
        }
    };
    HTMLHandler.prototype.emptyDetailedTable = function () {
        this.updateDetailedTable("_", [" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    };
    HTMLHandler.prototype.updateDetailedTable = function (instruction, controlSingals) {
        if (controlSingals == undefined && instruction == undefined)
            return;
        document.getElementById("instructionIndicator").innerHTML = instruction;
        document.getElementById("RegDst").innerHTML = controlSingals[0];
        document.getElementById("AluSrc").innerHTML = controlSingals[1];
        document.getElementById("MemReg").innerHTML = controlSingals[2];
        document.getElementById("RegWr").innerHTML = controlSingals[3];
        document.getElementById("MemRd").innerHTML = controlSingals[4];
        document.getElementById("MemWr").innerHTML = controlSingals[5];
        document.getElementById("Branch").innerHTML = controlSingals[6];
        document.getElementById("AluOp").innerHTML = controlSingals[7];
        document.getElementById("Jump").innerHTML = controlSingals[8];
    };
    HTMLHandler.prototype.toggleShowCollors = function () {
        if (this.colors.style.display == "block")
            this.colors.style.display = "none";
        else
            this.colors.style.display = "block";
    };
    HTMLHandler.prototype.toggleShowSpeed = function () {
        if (this.speed.style.display == "block")
            this.speed.style.display = "none";
        else
            this.speed.style.display = "block";
    };
    HTMLHandler.prototype.toggleColorDropDownContent = function () {
        if (this.colorDropDownContent.style.display == "block")
            this.colorDropDownContent.style.display = "none";
        else
            this.colorDropDownContent.style.display = "block";
        this.toggleChangeColorButton();
    };
    HTMLHandler.prototype.toggleSpeedDropDownMenu = function () {
        if (this.speedDropDownMenu.style.display == "block")
            this.speedDropDownMenu.style.display = "none";
        else
            this.speedDropDownMenu.style.display = "block";
        this.toggleChangeSpeedButton();
    };
    HTMLHandler.prototype.toggleChangeColorButton = function () {
        if (this.changeColorButton.style.display == "none")
            this.changeColorButton.style.display = "block";
        else
            this.changeColorButton.style.display == "none";
    };
    HTMLHandler.prototype.toggleChangeSpeedButton = function () {
        if (this.changeSpeedButton.style.display == "none")
            this.changeSpeedButton.style.display = "block";
        else
            this.changeSpeedButton.style.display == "none";
    };
    HTMLHandler.prototype.showTextArea = function () {
        this.textArea.removeAttribute("disabled");
        if (this.body.style.background == "white") {
            this.textArea.style.background = "white";
            this.textArea.style.color = "black";
        }
        else {
            this.textArea.style.background = "#171717";
            this.textArea.style.color = "white";
        }
    };
    HTMLHandler.prototype.hideTextArea = function () {
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
    };
    HTMLHandler.prototype.showNextButton = function () {
        this.nextButton.removeAttribute("disabled");
        if (this.body.style.background != "white") {
            this.nextButton.style.backgroundImage = "url('./res/next.png')";
        }
        else
            this.nextButton.style.backgroundImage = "url('./res/next_black.png')";
    };
    HTMLHandler.prototype.hideNextButton = function () {
        this.nextButton.setAttribute("disabled", "true");
        this.nextButton.style.backgroundImage = "url('./res/nextDisabled.png')";
    };
    HTMLHandler.prototype.showChangeColorButton = function () {
        this.changeColorButton.removeAttribute("disabled");
        this.changeColorButton.style.background = "#ffff66";
    };
    HTMLHandler.prototype.hideChangeColorButton = function () {
        this.changeColorButton.setAttribute("disabled", "true");
        this.changeColorButton.style.background = "gray";
        this.changeColorButton.style.color = "black";
    };
    HTMLHandler.prototype.showPreviousButton = function () {
        this.previousButton.removeAttribute("disabled");
        if (this.body.style.background != "white")
            this.previousButton.style.backgroundImage = "url('./res/previous.png')";
        else
            this.previousButton.style.backgroundImage = "url('./res/previous_black.png')";
    };
    HTMLHandler.prototype.hidePreviousButton = function () {
        this.previousButton.setAttribute("disabled", "true");
        this.previousButton.style.backgroundImage = "url('./res/previousDisabled.png')";
    };
    HTMLHandler.prototype.showEditButton = function () {
        this.editButton.removeAttribute("disabled");
        if (this.body.style.background != "white")
            this.editButton.style.backgroundImage = "url('./res/edit.png')";
        else
            this.editButton.style.backgroundImage = "url('./res/edit_black.png')";
    };
    HTMLHandler.prototype.hideEditButton = function () {
        this.editButton.setAttribute("disabled", "true");
        this.editButton.style.backgroundImage = "url('./res/editDisabled.png')";
    };
    HTMLHandler.prototype.showRunButton = function () {
        this.runButton.removeAttribute("disabled");
        if (this.body.style.background != "white")
            this.runButton.style.backgroundImage = "url('./res/play.png')";
        else
            this.runButton.style.backgroundImage = "url('./res/play_black.png')";
    };
    HTMLHandler.prototype.hideRunButton = function () {
        this.runButton.setAttribute("disabled", "true");
    };
    return HTMLHandler;
}());
exports.HTMLHandler = HTMLHandler;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var InputHandler = (function () {
    function InputHandler(typeObjectArray, mipsObject) {
        this.typeObjectsArray = typeObjectArray;
        this.mipsObject = mipsObject;
        console.log("InputHandler constructed, it has typeObjectsArray (and they work) and validator and mips and everything.");
    }
    InputHandler.prototype.initValidator = function (validator) {
        this.validator = validator;
    };
    InputHandler.prototype.instructionsAndArgumentsInOrder = function () {
        var inputByLines = this.getInstructionsList(true);
        var inputInstructionAndArgumentsList = this.getInstructionsAndArguments(true);
        var inOrder = new Array();
        var inOrderCount = 0;
        var currentIndex = 0;
        this.mipsObject.reset();
        this.mipsObject.loadMemory(this.getDataList());
        while (currentIndex != inputByLines.length) {
            var label = inputInstructionAndArgumentsList[currentIndex][0];
            if (this.validator.isValidLabel(label)) {
                currentIndex++;
            }
            else {
                var instruction = inputInstructionAndArgumentsList[currentIndex][0];
                switch (instruction) {
                    case 'beq': {
                        var willBranch = this.mipsObject.runBeq(inputInstructionAndArgumentsList[currentIndex]);
                        if (willBranch) {
                            var labelToBranchTo = inputInstructionAndArgumentsList[currentIndex][3];
                            var branchIndex = inputByLines.indexOf(labelToBranchTo + ':');
                            if (branchIndex == -1) {
                                this.validator.console.putError(labelToBranchTo + " not found");
                                return undefined;
                            }
                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex = branchIndex + 1;
                        }
                        else {
                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex++;
                        }
                        break;
                    }
                    case 'bne': {
                        var willBranch = this.mipsObject.runBne(inputInstructionAndArgumentsList[currentIndex]);
                        if (willBranch) {
                            var labelToBranchTo = inputInstructionAndArgumentsList[currentIndex][3];
                            var branchIndex = inputByLines.indexOf(labelToBranchTo + ':');
                            if (branchIndex == -1) {
                                this.validator.console.putError(labelToBranchTo + " not found");
                                return undefined;
                            }
                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex = branchIndex + 1;
                        }
                        else {
                            inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                            currentIndex++;
                        }
                        break;
                    }
                    case 'j': {
                        var labelToJumpTo = inputInstructionAndArgumentsList[currentIndex][1];
                        var jumpIndex = inputByLines.indexOf(labelToJumpTo + ':');
                        if (jumpIndex == -1) {
                            this.validator.console.putError(labelToJumpTo + " not found");
                            return undefined;
                        }
                        inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                        currentIndex = jumpIndex + 1;
                        break;
                    }
                    default: {
                        inOrder[inOrderCount++] = inputInstructionAndArgumentsList[currentIndex];
                        this.mipsObject.run(inputInstructionAndArgumentsList[currentIndex]);
                        currentIndex++;
                    }
                }
            }
        }
        this.mipsObject.reset();
        this.mipsObject.loadMemory(this.getDataList());
        return inOrder;
    };
    InputHandler.prototype.getDataList = function () {
        var tempArray = document.getElementById("textInput").value.match(/[^\r\n]+/g);
        if (this.getDotDataLineIndex(tempArray) == -1)
            return undefined;
        var startingIndex = this.getDotDataLineIndex(tempArray) + 1;
        var endingIndex = this.getDotTextLineIndex(tempArray);
        if (endingIndex < startingIndex)
            endingIndex = tempArray.length;
        if (endingIndex == startingIndex) {
            return undefined;
        }
        var arrayToReturn = new Array();
        var count = 0;
        for (var i = startingIndex; i < endingIndex; i++) {
            arrayToReturn[count] = tempArray[i].split(/\s+/g);
            count++;
        }
        for (var i = 0; i < arrayToReturn.length; i++) {
            for (var j = 0; j < arrayToReturn[i].length; j++) {
                if (i == 0 && j == 0)
                    continue;
                arrayToReturn[i][j] = arrayToReturn[i][j].replace(/,/g, "");
            }
        }
        return arrayToReturn;
    };
    InputHandler.prototype.getInstructionsList = function (withLabels) {
        var tempArray = document.getElementById("textInput").value.match(/[^\r\n]+/g);
        var startingIndex = this.getDotTextLineIndex(tempArray) + 1;
        var endingIndex = 0;
        if (this.getDotDataLineIndex(tempArray) < startingIndex)
            endingIndex = tempArray.length;
        else
            endingIndex = this.getDotDataLineIndex(tempArray);
        var arrayToReturn = new Array();
        var counter = 0;
        for (var i = startingIndex; i < endingIndex; i++) {
            if (!withLabels) {
                if ((tempArray[i].split(/\s+/g))[0].charAt(tempArray[i].split(/\s+/g)[0].length - 1) == ':')
                    continue;
            }
            arrayToReturn[counter] = tempArray[i].split(/\s+/g)[0];
            counter++;
        }
        return arrayToReturn;
    };
    InputHandler.prototype.getInstructionsAndArguments = function (withLabels) {
        var tempArray = document.getElementById("textInput").value.match(/[^\r\n]+/g);
        var startingIndex = this.getDotTextLineIndex(tempArray) + 1;
        var endingIndex = 0;
        if (this.getDotDataLineIndex(tempArray) < startingIndex)
            endingIndex = tempArray.length;
        else
            endingIndex = this.getDotDataLineIndex(tempArray);
        if (endingIndex == startingIndex) {
            return undefined;
        }
        var arrayToReturn = new Array();
        var count = 0;
        for (var i = startingIndex; i < endingIndex; i++) {
            if (!withLabels) {
                if ((tempArray[i].split(/\s+/g))[0].charAt(tempArray[i].split(/\s+/g)[0].length - 1) == ':')
                    continue;
            }
            arrayToReturn[count] = tempArray[i].split(/\s+/g);
            count++;
        }
        for (var i = 0; i < arrayToReturn.length; i++) {
            for (var j = 0; j < arrayToReturn[i].length; j++) {
                arrayToReturn[i][j] = arrayToReturn[i][j].replace(/,/g, "");
            }
        }
        return arrayToReturn;
    };
    InputHandler.prototype.allLines = function () {
        var allLines = document.getElementById("textInput").value.match(/[^\r\n]+/g);
        var arrayOfLineAfterSplitting = new Array();
        for (var i = 0; i < allLines.length; i++) {
            arrayOfLineAfterSplitting[i] = allLines[i].split(/\s+/g);
        }
        return arrayOfLineAfterSplitting;
    };
    InputHandler.prototype.getDotTextLineIndex = function (array) {
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i].split(/\s+/g)[0] == ".text") {
                index = i;
            }
        }
        return index;
    };
    InputHandler.prototype.getDotDataLineIndex = function (array) {
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (array[i].split(/\s+/g)[0] == ".data") {
                index = i;
                break;
            }
        }
        return index;
    };
    return InputHandler;
}());
exports.InputHandler = InputHandler;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Memory_1 = __webpack_require__(11);
var MIPS = (function () {
    function MIPS(typeObjectArray) {
        this.validRegisters = ["$zero", "$at", "$v0", "$v1", "$a0",
            "$a1", "$a2", "$a3", "$t0", "$t1", "$t2",
            "$t3", "$t4", "$t5", "$t6", "$t7",
            "$s0", "$s1", "$s2", "$s3", "$s4",
            "$s5", "$s6", "$s7", "$t8", "$t9",
            "$k0", "$k1", "$gp", "$sp", "$fp",
            "$ra"];
        this.defaultRegistersColor = "white";
        this.highlightColor = "cyan";
        this.typeObjectArray = typeObjectArray;
        this.memory = new Memory_1.Memory();
        this.registers = new Array();
        for (var i = 0; i < 32; i++) {
            this.registers[i] = 0;
        }
        this.registerToHighlight = "";
        this.updateRegisters();
        console.log("MIPS class constructed. With registers and everything..");
    }
    MIPS.prototype.setDefaultRegistersColor = function (defaultRegistersColor) {
        this.defaultRegistersColor = defaultRegistersColor;
    };
    MIPS.prototype.setHighLightColor = function (color) {
        this.highlightColor = color;
    };
    MIPS.prototype.reset = function () {
        for (var i = 0; i < 32; i++) {
            this.registers[i] = 0;
        }
        this.memory = new Memory_1.Memory();
        this.registerToHighlight = "";
        this.updateRegisters();
        document.getElementById("instructionAndArguments").value = "";
        console.log("!!!MIPS reset!!!");
    };
    MIPS.prototype.loadMemory = function (dataList) {
        if (dataList == undefined)
            return;
        for (var i = 0; i < dataList.length; i++) {
            var araryName = dataList[i][0].slice(0, -1);
            var type = dataList[i][1];
            var values = dataList[i].slice(2);
            var valuesAsNum = new Array();
            for (var j = 0; j < values.length; j++) {
                valuesAsNum[j] = Number(values[j]);
            }
            this.memory.addToMemory(araryName, type, valuesAsNum);
        }
        console.log(this.memory.bytesArray.toString());
        console.log(this.memory.dictionary.toString());
    };
    MIPS.prototype.run = function (instructionAndArguments) {
        var instruction = instructionAndArguments[0];
        var instructionType = "";
        for (var i = 0; i < this.typeObjectArray.length; i++) {
            if (this.typeObjectArray[i].isThisType(instruction)) {
                instructionType = this.typeObjectArray[i].type;
                break;
            }
        }
        switch (instructionType) {
            case "Rtype": {
                this.runRtype(instructionAndArguments);
                this.updateRegisters();
                break;
            }
            case "Itype": {
                this.runIType(instructionAndArguments);
                this.updateRegisters();
                break;
            }
            case "sw": {
                this.runSW(instructionAndArguments);
                this.updateRegisters();
                break;
            }
            case "lw": {
                this.runLW(instructionAndArguments);
                this.updateRegisters();
                break;
            }
        }
        console.clear();
        console.log("\nMEMORY \n" + this.memory.bytesArray.toString());
        document.getElementById("instructionAndArguments").value = instructionAndArguments[0].replace(/,/g, " ") + " " + instructionAndArguments.slice(1).toString();
    };
    MIPS.prototype.getRegsiterIndex = function (register) {
        return this.validRegisters.indexOf(register);
    };
    MIPS.prototype.runBeq = function (beqAndArguments) {
        return (this.registers[this.getRegsiterIndex(beqAndArguments[1])]) == (this.registers[this.getRegsiterIndex(beqAndArguments[2])]);
    };
    MIPS.prototype.runBne = function (beqAndArguments) {
        return (this.registers[this.getRegsiterIndex(beqAndArguments[1])]) != (this.registers[this.getRegsiterIndex(beqAndArguments[2])]);
    };
    MIPS.prototype.runRtype = function (instructionAndArguments) {
        var instruction = instructionAndArguments[0];
        var argumentsOfInstruction = instructionAndArguments.slice(1);
        var arg2 = this.registers[this.getRegsiterIndex(argumentsOfInstruction[1])];
        var arg3 = this.registers[this.getRegsiterIndex(argumentsOfInstruction[2])];
        switch (instruction) {
            case 'add':
            case 'addu': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 + arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing add");
                break;
            }
            case 'sub':
            case 'subu': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 - arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing sub");
                break;
            }
            case 'and': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 & arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing and");
                break;
            }
            case 'or': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 | arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing or");
                break;
            }
            case 'slt':
            case 'sltu': {
                if (arg2 < arg3)
                    this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 1;
                else
                    this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 0;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing slt");
                break;
            }
        }
        this.updateRegisters();
    };
    MIPS.prototype.runSW = function (instructionAndArguments) {
        var instruction = instructionAndArguments[0];
        var argumentsOfInstruction = instructionAndArguments.slice(1);
        switch (instruction) {
            case 'sb': {
                var register = argumentsOfInstruction[0];
                var valueByte = this.registers[this.getRegsiterIndex(register)];
                var secondString = argumentsOfInstruction[1];
                var endIndex = secondString.indexOf('(');
                var arrayName = "";
                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }
                var registerForIndex = "";
                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }
                var index = this.registers[this.getRegsiterIndex(registerForIndex)];
                this.memory.storeByte(arrayName, index, valueByte);
                this.registerToHighlight = "";
                break;
            }
            case 'sw': {
                var register = argumentsOfInstruction[0];
                var valueByte = this.registers[this.getRegsiterIndex(register)];
                var secondString = argumentsOfInstruction[1];
                var endIndex = secondString.indexOf('(');
                var arrayName = "";
                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }
                var registerForIndex = "";
                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }
                var index = this.registers[this.getRegsiterIndex(registerForIndex)];
                this.memory.storeWord(arrayName, index, valueByte);
                this.registerToHighlight = "";
            }
        }
        this.updateRegisters();
    };
    MIPS.prototype.runLW = function (instructionAndArguments) {
        var instruction = instructionAndArguments[0];
        var argumentsOfInstruction = instructionAndArguments.slice(1);
        switch (instruction) {
            case 'lb': {
                var register = argumentsOfInstruction[0];
                var secondString = argumentsOfInstruction[1];
                var endIndex = secondString.indexOf('(');
                var arrayName = "";
                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }
                var registerForIndex = "";
                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }
                var index = this.registers[this.getRegsiterIndex(registerForIndex)];
                var hexString = this.memory.loadByte(arrayName, index);
                var number = parseInt(hexString, 16);
                this.updateThisRegister(register, number);
                this.registerToHighlight = register;
                break;
            }
            case 'lw': {
                var register = argumentsOfInstruction[0];
                var secondString = argumentsOfInstruction[1];
                var endIndex = secondString.indexOf('(');
                var arrayName = "";
                for (var i = 0; i < endIndex; i++) {
                    arrayName += secondString.charAt(i);
                }
                var registerForIndex = "";
                for (var i = endIndex + 1; i < secondString.length - 1; i++) {
                    registerForIndex += secondString.charAt(i);
                }
                var index = this.registers[this.getRegsiterIndex(registerForIndex)];
                this.registers[this.getRegsiterIndex(register)] = parseInt(this.memory.loadWord(arrayName, index), 16);
                this.registerToHighlight = register;
                break;
            }
        }
        this.updateRegisters();
    };
    MIPS.prototype.updateThisRegister = function (register, value) {
        var index = this.getRegsiterIndex(register);
        this.registers[index] = value;
    };
    MIPS.prototype.runIType = function (instructionAndArguments) {
        var instruction = instructionAndArguments[0];
        var argumentsOfInstruction = instructionAndArguments.slice(1);
        var arg2 = this.registers[this.getRegsiterIndex(argumentsOfInstruction[1])];
        var arg3 = Number(argumentsOfInstruction[2]);
        switch (instruction) {
            case 'addi':
            case 'addiu': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 + arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing addi");
                break;
            }
            case 'andi': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 & arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing andi");
                break;
            }
            case 'ori': {
                this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = arg2 | arg3;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing ori");
                break;
            }
            case 'slti':
            case 'sltiu': {
                if (arg2 < arg3)
                    this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 1;
                else
                    this.registers[this.getRegsiterIndex(argumentsOfInstruction[0])] = 0;
                this.registerToHighlight = argumentsOfInstruction[0];
                console.log("doing slti");
                break;
            }
            case 'beq':
            case 'bne':
            case 'j': {
                console.log("doing beq/j. already done so not really doing anything.");
                this.registerToHighlight = "";
                break;
            }
        }
        this.updateRegisters();
    };
    MIPS.prototype.highLightNonZero = function () {
        for (var i = 0; i < this.registers.length; i++) {
            document.getElementById(this.validRegisters[i]).style.color = 'white';
            if (this.registers[i] != 0) {
                document.getElementById(this.validRegisters[i]).style.color = this.highlightColor;
                document.getElementById(this.validRegisters[i] + "label").style.color = this.highlightColor;
            }
        }
    };
    MIPS.prototype.highLightRegister = function () {
        for (var i = 0; i < this.registers.length; i++) {
            document.getElementById(this.validRegisters[i]).style.color = this.defaultRegistersColor;
            document.getElementById(this.validRegisters[i] + "label").style.color = this.defaultRegistersColor;
        }
        if (this.registerToHighlight == "")
            return;
        document.getElementById(this.registerToHighlight).style.color = this.highlightColor;
        document.getElementById(this.registerToHighlight + "label").style.color = this.highlightColor;
    };
    MIPS.prototype.updateRegisters = function () {
        this.highLightRegister();
        document.getElementById("$zero").innerHTML = "" + this.registers[this.getRegsiterIndex("$zero")];
        document.getElementById("$at").innerHTML = "" + this.registers[this.getRegsiterIndex("$at")];
        document.getElementById("$v0").innerHTML = "" + this.registers[this.getRegsiterIndex("$v0")];
        document.getElementById("$v1").innerHTML = "" + this.registers[this.getRegsiterIndex("$v1")];
        document.getElementById("$a0").innerHTML = "" + this.registers[this.getRegsiterIndex("$a0")];
        document.getElementById("$a1").innerHTML = "" + this.registers[this.getRegsiterIndex("$a1")];
        document.getElementById("$a2").innerHTML = "" + this.registers[this.getRegsiterIndex("$a2")];
        document.getElementById("$a3").innerHTML = "" + this.registers[this.getRegsiterIndex("$a3")];
        document.getElementById("$t0").innerHTML = "" + this.registers[this.getRegsiterIndex("$t0")];
        document.getElementById("$t1").innerHTML = "" + this.registers[this.getRegsiterIndex("$t1")];
        document.getElementById("$t2").innerHTML = "" + this.registers[this.getRegsiterIndex("$t2")];
        document.getElementById("$t3").innerHTML = "" + this.registers[this.getRegsiterIndex("$t3")];
        document.getElementById("$t4").innerHTML = "" + this.registers[this.getRegsiterIndex("$t4")];
        document.getElementById("$t5").innerHTML = "" + this.registers[this.getRegsiterIndex("$t5")];
        document.getElementById("$t6").innerHTML = "" + this.registers[this.getRegsiterIndex("$t6")];
        document.getElementById("$t7").innerHTML = "" + this.registers[this.getRegsiterIndex("$t7")];
        document.getElementById("$s0").innerHTML = "" + this.registers[this.getRegsiterIndex("$s0")];
        document.getElementById("$s1").innerHTML = "" + this.registers[this.getRegsiterIndex("$s1")];
        document.getElementById("$s2").innerHTML = "" + this.registers[this.getRegsiterIndex("$s2")];
        document.getElementById("$s3").innerHTML = "" + this.registers[this.getRegsiterIndex("$s3")];
        document.getElementById("$s4").innerHTML = "" + this.registers[this.getRegsiterIndex("$s4")];
        document.getElementById("$s5").innerHTML = "" + this.registers[this.getRegsiterIndex("$s5")];
        document.getElementById("$s6").innerHTML = "" + this.registers[this.getRegsiterIndex("$s6")];
        document.getElementById("$s7").innerHTML = "" + this.registers[this.getRegsiterIndex("$s7")];
        document.getElementById("$t8").innerHTML = "" + this.registers[this.getRegsiterIndex("$t8")];
        document.getElementById("$t9").innerHTML = "" + this.registers[this.getRegsiterIndex("$t9")];
        document.getElementById("$k0").innerHTML = "" + this.registers[this.getRegsiterIndex("$k0")];
        document.getElementById("$k1").innerHTML = "" + this.registers[this.getRegsiterIndex("$k1")];
        document.getElementById("$gp").innerHTML = "" + this.registers[this.getRegsiterIndex("$gp")];
        document.getElementById("$sp").innerHTML = "" + this.registers[this.getRegsiterIndex("$sp")];
        document.getElementById("$fp").innerHTML = "" + this.registers[this.getRegsiterIndex("$fp")];
        document.getElementById("$ra").innerHTML = "" + this.registers[this.getRegsiterIndex("$ra")];
    };
    return MIPS;
}());
exports.MIPS = MIPS;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var splash_screen_1 = __webpack_require__(4);
__webpack_require__(3);
var MainController_1 = __webpack_require__(2);
window.onload = function () {
    var controller = new MainController_1.MainController();
    var skipped = false;
    controller.HTMLHandler.body.style.backgroundColor = 'white';
    splash_screen_1.Splash.enable('circular');
    setTimeout(function () {
        if (!skipped) {
            splash_screen_1.Splash.destroy();
            document.getElementById("hide").style.display = "block";
            controller.themeManager.changeToBlackTheme();
            document.getElementById("splash-image").style.display = "none";
            document.body.className = "fade-out";
            setTimeout(function () { document.body.className = 'normal'; }, 25);
        }
    }, 3500);
    console.log("Window loaded :)");
    controller.HTMLHandler.instructionAndArguments.style.display = "none";
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasWidth = 0;
    var canvasHeight = 0;
    if ((width / height) < 1.7) {
        canvasWidth = window.innerWidth * 0.64;
        canvasHeight = window.innerHeight * 0.52;
        controller.HTMLHandler.registersTable.style.right = "2%";
        controller.HTMLHandler.canvas.style.left = "24%";
    }
    else {
        canvasWidth = window.innerWidth * 0.57;
        canvasHeight = window.innerHeight * 0.57;
        controller.HTMLHandler.registersTable.style.right = "7%";
        controller.HTMLHandler.canvas.style.left = "24%";
    }
    controller.drawingObject.canvas.width = canvasWidth;
    controller.drawingObject.canvas.height = canvasHeight;
    controller.drawEverything();
    controller.HTMLHandler.runButton.addEventListener("click", function () { controller.runAll(); }, false);
    controller.HTMLHandler.nextButton.addEventListener("click", function () { controller.runNext(); }, false);
    controller.HTMLHandler.body.addEventListener("click", function () { controller.updateColor(); }, false);
    controller.HTMLHandler.changeThemeButton.addEventListener("click", function () { controller.themeManager.toggleTheme(); controller.redrawFrames(); }, false);
    controller.HTMLHandler.soundButton.addEventListener("click", function () { controller.soundController.toggleAudio(); controller.HTMLHandler.toggleSound(); }, false);
    document.onkeydown = function (e) {
        if (splash_screen_1.Splash.isRunning()) {
            skipped = true;
            splash_screen_1.Splash.destroy();
            document.getElementById("hide").style.display = "block";
            controller.themeManager.changeToBlackTheme();
            document.getElementById("splash-image").style.display = "none";
            document.body.className = 'fade-out';
            setTimeout(function () { document.body.className = 'normal'; }, 25);
            return;
        }
        if (document.activeElement != controller.HTMLHandler.textArea) {
            switch (e.keyCode) {
                case 37:
                    if (controller.HTMLHandler.previousButton.getAttribute("disabled") != "true") {
                        controller.HTMLHandler.previousButton.click();
                    }
                    break;
                case 39:
                    if (controller.HTMLHandler.nextButton.getAttribute("disabled") != "true")
                        controller.HTMLHandler.nextButton.click();
                    break;
                case 67:
                    controller.HTMLHandler.changeThemeButton.click();
                    break;
                case 69:
                    controller.HTMLHandler.editButton.click();
                    break;
                case 77:
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
    controller.HTMLHandler.previousButton.addEventListener("click", function () { controller.runPrevious(); }, false);
    controller.HTMLHandler.editButton.addEventListener("click", function () { controller.edit(); }, false);
    controller.HTMLHandler.fullScreenButton.addEventListener("click", function () { controller.setFullScreenMode(); }, false);
    controller.HTMLHandler.changeSpeedButton.addEventListener("click", function () { controller.HTMLHandler.toggleShowSpeed(); });
    controller.HTMLHandler.fastButton.addEventListener("click", function () {
        controller.drawingObject.setAnimationSpeed(100);
        controller.HTMLHandler.toggleShowSpeed();
    });
    controller.HTMLHandler.slowButton.addEventListener("click", function () {
        controller.drawingObject.setAnimationSpeed(750);
        controller.HTMLHandler.toggleShowSpeed();
    });
    controller.HTMLHandler.normalButton.addEventListener("click", function () {
        controller.drawingObject.setAnimationSpeed(350);
        controller.HTMLHandler.toggleShowSpeed();
    });
    controller.HTMLHandler.soundButton.click();
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Collections = __webpack_require__(18);
var Memory = (function () {
    function Memory() {
        this.dictionary = new Collections.Dictionary();
        this.bytesArray = new Array();
        this.currentIndex = 3;
        this.add4Bytes();
    }
    Memory.prototype.addToMemory = function (arrayName, type, values) {
        var newArray = new Array();
        switch (type) {
            case ".word": {
                this.goToNextWordIndex();
                this.dictionary.setValue(arrayName, this.currentIndex);
                for (var i = 0; i < values.length; i++) {
                    this.goToNextWordIndex();
                    var hexString = values[i].toString(16);
                    var padding = "";
                    for (var j = 0; j < 8 - hexString.length; j++) {
                        padding += "0";
                    }
                    hexString = padding + hexString;
                    for (var k = 7; k > 0; k = k - 2) {
                        this.bytesArray[this.currentIndex--] = hexString.charAt(k - 1) + hexString.charAt(k);
                    }
                    this.currentIndex++;
                    this.goToNextWordIndex();
                }
                this.currentIndex = this.bytesArray.length - 1;
                break;
            }
            case ".byte": {
                this.goToNextByteIndex();
                this.dictionary.setValue(arrayName, this.currentIndex);
                for (var i = 0; i < values.length; i++) {
                    this.goToNextByteIndex();
                    var hexString = values[i].toString(16);
                    if (hexString.length == 1)
                        hexString = "0" + hexString;
                    this.bytesArray[this.currentIndex] = hexString;
                }
                break;
            }
        }
    };
    Memory.prototype.storeWord = function (arrayName, index, byteValue) {
        if (index % 4 != 0)
            return;
        else {
            var offset = this.dictionary.getValue(arrayName) + index;
            var stringValue = byteValue.toString(16);
            var padding = "";
            for (var j = 0; j < 8 - stringValue.length; j++) {
                padding += "0";
            }
            stringValue = padding + stringValue;
            for (var k = 0; k < 4; k++) {
                this.bytesArray[offset - (3 - k)] = stringValue[(k * 2)] + stringValue[(k * 2) + 1];
            }
        }
    };
    Memory.prototype.loadWord = function (arrayName, index) {
        if (index % 4 != 0)
            return undefined;
        else {
            var offset = this.dictionary.getValue(arrayName) + index;
            var thingToReturn = "";
            thingToReturn += this.bytesArray[offset - 3] + this.bytesArray[offset - 2] + this.bytesArray[offset - 1] + this.bytesArray[offset];
            return thingToReturn;
        }
    };
    Memory.prototype.storeByte = function (arrayName, index, byteValue) {
        console.log("arrayName is " + arrayName + " index given as " + index + " byteValue in hex is " + byteValue.toString(16));
        var offset = this.dictionary.getValue(arrayName);
        index++;
        if (index > 4) {
            while (index > 4) {
                offset += 4;
                index -= 4;
            }
        }
        else
            offset -= (index - 1);
        console.log("offset after while loop is " + offset + " currently its " + this.bytesArray[offset]);
        this.bytesArray[offset] = byteValue.toString(16);
        console.log("this is bytes array after adding f " + this.bytesArray.toString());
    };
    Memory.prototype.loadByte = function (arrayName, index) {
        var offset = this.dictionary.getValue(arrayName);
        index++;
        if (index > 4) {
            while (index > 4) {
                offset += 4;
                index -= 4;
            }
        }
        else
            offset -= (index - 1);
        alert("offset in loadByte after while loop is " + offset);
        alert("loadByte returning this " + this.bytesArray[offset]);
        return this.bytesArray[offset];
    };
    Memory.prototype.goToNextByteIndex = function () {
        if (this.bytesArray[this.currentIndex] == "0")
            return;
        else {
            if (this.currentIndex % 4 == 0) {
                if (this.currentIndex + 7 > this.bytesArray.length)
                    this.add4Bytes();
                this.currentIndex += 7;
            }
            else
                this.currentIndex--;
        }
    };
    Memory.prototype.goToNextWordIndex = function () {
        if ((this.currentIndex + 1) % 4 == 0)
            return;
        else {
            while (this.currentIndex % 4 != 0) {
                this.currentIndex--;
            }
            if ((this.currentIndex + 7) > this.bytesArray.length)
                this.add4Bytes();
            this.currentIndex += 7;
        }
    };
    Memory.prototype.add4Bytes = function () {
        var start = this.bytesArray.length;
        var end = start + 4;
        for (var i = start; i < end; i++) {
            this.bytesArray[i] = "0";
        }
    };
    return Memory;
}());
exports.Memory = Memory;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ProgramLoader = (function () {
    function ProgramLoader(textArea) {
        this.textArea = textArea;
        this.loadProram(4);
    }
    ProgramLoader.prototype.loadProram = function (id) {
        if (true)
            return;
        var program = this.programs[id];
        this.textArea.value = program;
    };
    return ProgramLoader;
}());
exports.ProgramLoader = ProgramLoader;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(16);
var SoundController = (function () {
    function SoundController() {
        this.audioOn = true;
        this.player = responsiveVoice;
        responsiveVoice.setDefaultVoice("US English Female");
        console.log("Sound Controller constructed!");
    }
    SoundController.prototype.playSound = function (string) {
        if (this.audioOn) {
            if (this.player.isPlaying())
                this.player.cancel();
            this.player.speak(string);
        }
    };
    SoundController.prototype.toggleAudio = function () {
        this.audioOn = !this.audioOn;
    };
    return SoundController;
}());
exports.SoundController = SoundController;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ThemeManager = (function () {
    function ThemeManager(htmlHandler, drawingObject, mipsObject) {
        this.currentTheme = "black";
        this.htmlHandler = htmlHandler;
        this.drawingObject = drawingObject;
        this.mipsObject = mipsObject;
        console.log("Theme Manager constructed.");
    }
    ThemeManager.prototype.toggleTheme = function () {
        if (this.currentTheme == "white")
            this.changeToBlackTheme();
        else
            this.changeToWhiteTheme();
    };
    ThemeManager.prototype.changeToWhiteTheme = function () {
        console.log("changing to white theme");
        this.htmlHandler.logo.src = "./res/mips_logo_black.png";
        this.htmlHandler.runButton.style.backgroundImage = "url('./res/play_black.png')";
        this.htmlHandler.nextButton.style.backgroundImage = "url('./res/next_black.png')";
        this.htmlHandler.previousButton.style.backgroundImage = "url('./res/previous_black.png')";
        if (this.htmlHandler.previousButton.getAttribute("disabled"))
            this.htmlHandler.previousButton.style.backgroundImage = "url('./res/previousDisabled.png')";
        this.htmlHandler.fullScreenButton.style.backgroundImage = "url('./res/fullscreen_black.png')";
        if (this.htmlHandler.isFullScreen)
            this.htmlHandler.fullScreenButton.style.backgroundImage = "url('./res/nofullscreen_black.png')";
        this.htmlHandler.editButton.style.backgroundImage = "url('./res/edit_black.png')";
        if (this.htmlHandler.editButton.getAttribute("disabled"))
            this.htmlHandler.editButton.style.backgroundImage = "url('./res/editDisabled.png')";
        if (this.htmlHandler.isSoundOn)
            this.htmlHandler.soundButton.style.backgroundImage = "url('./res/soundButton_black.png')";
        else
            this.htmlHandler.soundButton.style.backgroundImage = "url('./res/nosoundButton_black.png')";
        this.currentTheme = "white";
        this.drawingObject.setDefaultColor("black");
        this.htmlHandler.body.style.background = "white";
        this.htmlHandler.registersTable.style.color = "black";
        this.mipsObject.defaultRegistersColor = "black";
        this.htmlHandler.canvas.style.background = "#f2f2f2";
        this.htmlHandler.canvas.style.borderColor = "black";
        this.htmlHandler.textArea.style.borderColor = "black";
        this.htmlHandler.console.style.borderColor = "black";
        this.htmlHandler.instructionAndArguments.style.borderColor = "black";
        this.htmlHandler.detailedTable.style.borderColor = "black";
        this.htmlHandler.console.style.background = "#f2f2f2";
        if (this.htmlHandler.textArea.getAttribute("disabled") == "true") {
            this.htmlHandler.textArea.style.background = "#f2f2f2";
            this.htmlHandler.textArea.style.color = "black";
        }
        else {
            this.htmlHandler.textArea.style.background = "white";
            this.htmlHandler.textArea.style.color = "black";
        }
        this.htmlHandler.instructionAndArguments.style.background = this.htmlHandler.textArea.style.background;
        this.htmlHandler.instructionAndArguments.style.color = "black";
        this.htmlHandler.changeSpeedButton.style.background = "white";
        this.htmlHandler.changeSpeedButton.style.color = "black";
        this.htmlHandler.changeThemeButton.style.background = "white";
        this.htmlHandler.changeThemeButton.style.color = "black";
        this.htmlHandler.footer.style.color = "black";
    };
    ThemeManager.prototype.changeToBlackTheme = function () {
        console.log("changing to black theme");
        this.htmlHandler.logo.src = "./res/mips_logo_white.png";
        this.htmlHandler.runButton.style.backgroundImage = "url('./res/play.png')";
        this.htmlHandler.nextButton.style.backgroundImage = "url('./res/next.png')";
        this.htmlHandler.previousButton.style.backgroundImage = "url('./res/previous.png')";
        if (this.htmlHandler.previousButton.getAttribute("disabled"))
            this.htmlHandler.previousButton.style.backgroundImage = "url('./res/previousDisabled.png')";
        this.htmlHandler.fullScreenButton.style.backgroundImage = "url('./res/fullscreen.png')";
        if (this.htmlHandler.isFullScreen)
            this.htmlHandler.fullScreenButton.style.backgroundImage = "url('./res/nofullscreen.png')";
        this.htmlHandler.editButton.style.backgroundImage = "url('./res/edit.png')";
        if (this.htmlHandler.editButton.getAttribute("disabled"))
            this.htmlHandler.editButton.style.backgroundImage = "url('./res/editDisabled.png')";
        if (this.htmlHandler.isSoundOn)
            this.htmlHandler.soundButton.style.backgroundImage = "url('./res/soundButton.png')";
        else
            this.htmlHandler.soundButton.style.backgroundImage = "url('./res/nosoundButton.png')";
        this.currentTheme = "black";
        this.drawingObject.setDefaultColor("white");
        this.htmlHandler.body.style.background = "#0F0F0F";
        this.htmlHandler.registersTable.style.color = "white";
        this.mipsObject.defaultRegistersColor = "white";
        this.htmlHandler.canvas.style.background = "black";
        this.htmlHandler.canvas.style.borderColor = "white";
        this.htmlHandler.textArea.style.borderColor = "white";
        this.htmlHandler.console.style.borderColor = "white";
        this.htmlHandler.detailedTable.style.borderColor = "white";
        this.htmlHandler.instructionAndArguments.style.borderColor = "white";
        this.htmlHandler.console.style.background = "black";
        if (this.htmlHandler.textArea.getAttribute("disabled") == "false") {
            this.htmlHandler.textArea.style.background = "#262626";
            this.htmlHandler.textArea.style.color = "white";
        }
        else {
            this.htmlHandler.textArea.style.background = "#0F0F0F";
            this.htmlHandler.textArea.style.color = "white";
        }
        this.htmlHandler.instructionAndArguments.style.background = this.htmlHandler.textArea.style.background;
        this.htmlHandler.instructionAndArguments.style.color = "white";
        this.htmlHandler.changeSpeedButton.style.background = "#171717";
        this.htmlHandler.changeSpeedButton.style.color = "white";
        this.htmlHandler.changeThemeButton.style.background = "#171717";
        this.htmlHandler.changeThemeButton.style.color = "white";
        this.htmlHandler.footer.style.color = "white";
    };
    return ThemeManager;
}());
exports.ThemeManager = ThemeManager;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Validator = (function () {
    function Validator(typeObjectArray, inputHandler, _console) {
        this._validRegisters = ["$zero", "$at", "$v0", "$v1", "$a0",
            "$a1", "$a2", "$a3", "$t0", "$t1", "$t2",
            "$t3", "$t4", "$t5", "$t6", "$t7",
            "$s0", "$s1", "$s2", "$s3", "$s4",
            "$s5", "$s6", "$s7", "$t8", "$t9",
            "$k0", "$k1", "$gp", "$sp", "$fp",
            "$ra"];
        this.typeObjectArray = typeObjectArray;
        this._inputHandler = inputHandler;
        this.console = _console;
        console.log("Validator constructed");
    }
    Validator.prototype.isItAllValid = function () {
        if (!this.validateText())
            return false;
        else if (!this.validateData())
            return false;
        else {
            this.console.putMessege(".data and .text are all valid.");
            return true;
        }
    };
    Validator.prototype.validateData = function () {
        var dataList = this._inputHandler.getDataList();
        if (dataList == undefined)
            return true;
        var temp = this._inputHandler.getDataList();
        for (var i = 0; i < temp.length; i++) {
            if (!this.validDataLine(temp[i])) {
                return false;
            }
        }
        return true;
    };
    Validator.prototype.validDataLine = function (dataLine) {
        if (dataLine.length <= 2)
            return false;
        else {
            if (dataLine[0].length == 1)
                return false;
            if (!this.isValidDataString(dataLine[0]))
                return false;
            if (dataLine[0].charAt(dataLine[0].length) == ':') {
                return false;
            }
            if (dataLine[1] != ".byte" && dataLine[1] != ".word") {
                this.console.putError("Type not supported in this implementation. Or its a worng type.\n" + dataLine[1]);
                return false;
            }
        }
        for (var i = 2; i < dataLine.length; i++) {
            if (isNaN(Number(dataLine[i]))) {
                this.console.putError("Arguments must be numbers for this type \n" + dataLine[i].toString());
                return false;
            }
        }
        return true;
    };
    Validator.prototype.isValidDataString = function (string) {
        for (var i = 0; i < string.length - 1; i++) {
            if (string.charAt(i) == ',' || string.charAt(i) == ':') {
                this.console.putError("Not valid string\n" + string);
                return false;
            }
        }
        return true;
    };
    Validator.prototype.isValidDotText = function (string) {
        return this.isValidDataString(string);
    };
    Validator.prototype.isValidLabel = function (label) {
        if ((label.charAt(label.length - 1) == ':' && label.length > 1))
            return true;
        else {
            return false;
        }
    };
    Validator.prototype.validateDotText = function () {
        var lines = this._inputHandler.allLines();
        var foundText = false;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i][0] == ".text")
                foundText = true;
        }
        if (!foundText)
            this.console.putError("There is no .text");
        return foundText;
    };
    Validator.prototype.validateText = function () {
        if (!this.validateDotText())
            return false;
        var instrustionList = this._inputHandler.getInstructionsList(false);
        var instructionsAndArguments = this._inputHandler.getInstructionsAndArguments(false);
        for (var i = 0; i < instrustionList.length; i++) {
            if (!this.isValidInstrucion(instrustionList[i])) {
                this.console.putError(instrustionList[i] + " is not an instruction.");
                return false;
            }
            else {
                if (instrustionList[i] == "sw" || instrustionList[i] == "lw"
                    || instrustionList[i] == "sb" || instrustionList[i] == "lb") {
                    if (this._inputHandler.getDataList() == undefined) {
                        this.console.putError("There is no .data");
                        return false;
                    }
                    else {
                        var foundArray = false;
                        var secondString = instructionsAndArguments[i][2];
                        var endIndex = secondString.indexOf('(');
                        var arrayName = "";
                        for (var l = 0; l < endIndex; l++) {
                            arrayName += secondString.charAt(l);
                        }
                        arrayName += ":";
                        var arrayOfData = this._inputHandler.getDataList();
                        for (var l = 0; l < arrayOfData.length; l++) {
                            for (var m = 0; m < arrayOfData[l].length; m++) {
                                if (arrayOfData[l][m] == arrayName)
                                    foundArray = true;
                            }
                        }
                        if (!foundArray) {
                            this.console.putError("The array " + arrayName.substring(0, arrayName.length - 1) + " was not found.");
                            return false;
                        }
                    }
                }
                if (!this.isValidDotText(instrustionList[i]))
                    return false;
            }
        }
        for (var i = 0; i < instructionsAndArguments.length; i++) {
            if (!this.hasValidArguments(instructionsAndArguments[i])) {
                return false;
            }
        }
        return true;
    };
    Validator.prototype.isValidInstrucion = function (instruction) {
        for (var i = 0; i < this.typeObjectArray.length; i++) {
            if (this.typeObjectArray[i].isThisType(instruction))
                return true;
        }
    };
    Validator.prototype.isValidRegister = function (register) {
        for (var i = 0; i < this._validRegisters.length; i++) {
            if (this._validRegisters[i] == register)
                return true;
        }
        this.console.putError(register + " is invalid.");
        return false;
    };
    Validator.prototype.validRegisters = function (registerArray) {
        for (var i = 0; i < registerArray.length; i++) {
            if (!this.isValidRegister(registerArray[i])) {
                if (!(i == registerArray.length - 1 && !isNaN(Number(registerArray[i])))) {
                    return false;
                }
            }
        }
        return true;
    };
    Validator.prototype.hasValidArguments = function (instructionAndArguments) {
        if (instructionAndArguments.length == 1) {
            if (instructionAndArguments[0].slice(-1)[0] != ":")
                return false;
            else
                return true;
        }
        if (this.getTypeObjecet(instructionAndArguments[0]).type == "sw" || this.getTypeObjecet(instructionAndArguments[0]).type == "lw") {
            if (instructionAndArguments.length != 3) {
                this.console.putError("Number of arguments is wrong for this type of instruction. \n" + instructionAndArguments[0] + " needs 3 arguments.");
                return false;
            }
            else
                return true;
        }
        ;
        if (this.getTypeObjecet(instructionAndArguments[0]).type == "Itype") {
            var temp = instructionAndArguments.slice(-1)[0];
            if (isNaN(Number(temp))) {
                this.console.putError("Immediate value needed for this instruction.\n" + instructionAndArguments.toString());
                return false;
            }
        }
        ;
        if (this.getTypeObjecet(instructionAndArguments[0]).type == "Rtype") {
            var temp = instructionAndArguments.slice(-1)[0];
            if (!isNaN(Number(temp))) {
                this.console.putError("This instruction only takes registers as arguments..\n" + instructionAndArguments.toString());
                return false;
            }
        }
        if (instructionAndArguments[0] == "j" || instructionAndArguments[0] == "beq" || instructionAndArguments[0] == "bne") {
            return true;
        }
        return this.validRegisters(instructionAndArguments.slice(1));
    };
    Validator.prototype.getTypeObjecet = function (instruction) {
        for (var i = 0; i < this.typeObjectArray.length; i++) {
            if (this.typeObjectArray[i].isThisType(instruction))
                return this.typeObjectArray[i];
        }
        return null;
    };
    return Validator;
}());
exports.Validator = Validator;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

if ("undefined" != typeof responsiveVoice)
    console.log("ResponsiveVoice already loaded"), console.log(responsiveVoice);
else
    var ResponsiveVoice = function () {
        var a = this;
        a.version = "1.5.2";
        console.log("ResponsiveVoice r" + a.version);
        a.responsivevoices = [{
                name: "UK English Female",
                flag: "gb",
                gender: "f",
                voiceIDs: [3, 5, 1, 6, 7, 171, 278, 201, 257, 258, 8]
            }, {
                name: "UK English Male",
                flag: "gb",
                gender: "m",
                voiceIDs: [0, 4, 2, 75, 277, 202, 256, 159, 6, 7]
            }, {
                name: "US English Female",
                flag: "us",
                gender: "f",
                voiceIDs: [39, 40, 41, 42, 43, 173, 205, 204,
                    235, 44
                ]
            }, {
                name: "Arabic Male",
                flag: "ar",
                gender: "m",
                voiceIDs: [96, 95, 97, 196, 98],
                deprecated: !0
            }, {
                name: "Arabic Female",
                flag: "ar",
                gender: "f",
                voiceIDs: [96, 95, 97, 196, 98]
            }, {
                name: "Armenian Male",
                flag: "hy",
                gender: "f",
                voiceIDs: [99]
            }, {
                name: "Australian Female",
                flag: "au",
                gender: "f",
                voiceIDs: [87, 86, 5, 276, 201, 88]
            }, {
                name: "Brazilian Portuguese Female",
                flag: "br",
                gender: "f",
                voiceIDs: [245, 124, 123, 125, 186, 223, 126]
            }, {
                name: "Chinese Female",
                flag: "cn",
                gender: "f",
                voiceIDs: [249, 58, 59, 60, 155, 191, 281, 231, 268, 269, 61]
            }, {
                name: "Chinese (Hong Kong) Female",
                flag: "hk",
                gender: "f",
                voiceIDs: [192, 193, 232, 250, 251, 270, 252]
            }, {
                name: "Chinese Taiwan Female",
                flag: "tw",
                gender: "f",
                voiceIDs: [252, 194, 233, 253, 254, 255]
            }, {
                name: "Czech Female",
                flag: "cz",
                gender: "f",
                voiceIDs: [101, 100, 102, 197, 103]
            }, {
                name: "Danish Female",
                flag: "dk",
                gender: "f",
                voiceIDs: [105, 104, 106, 198, 107]
            }, {
                name: "Deutsch Female",
                flag: "de",
                gender: "f",
                voiceIDs: [27, 28, 29, 30, 31, 78, 170, 275, 199, 261, 262, 32]
            }, {
                name: "Dutch Female",
                flag: "nl",
                gender: "f",
                voiceIDs: [243, 219, 84, 157, 158, 184, 45]
            }, {
                name: "Finnish Female",
                flag: "fi",
                gender: "f",
                voiceIDs: [90, 89, 91, 209, 92]
            }, {
                name: "French Female",
                flag: "fr",
                gender: "f",
                voiceIDs: [240, 21, 22, 23, 77, 178, 279, 210, 266, 26]
            }, {
                name: "Greek Female",
                flag: "gr",
                gender: "f",
                voiceIDs: [62, 63, 80, 200, 64]
            }, {
                name: "Hindi Female",
                flag: "hi",
                gender: "f",
                voiceIDs: [247, 66, 154, 179, 213, 259, 67]
            }, {
                name: "Hungarian Female",
                flag: "hu",
                gender: "f",
                voiceIDs: [9, 10, 81, 214, 11]
            }, {
                name: "Indonesian Female",
                flag: "id",
                gender: "f",
                voiceIDs: [241, 111, 112, 180, 215, 113]
            }, {
                name: "Italian Female",
                flag: "it",
                gender: "f",
                voiceIDs: [242, 33, 34, 35,
                    36, 37, 79, 181, 216, 271, 38
                ]
            }, {
                name: "Japanese Female",
                flag: "jp",
                gender: "f",
                voiceIDs: [248, 50, 51, 52, 153, 182, 280, 217, 273, 274, 53]
            }, {
                name: "Korean Female",
                flag: "kr",
                gender: "f",
                voiceIDs: [54, 55, 56, 156, 183, 218, 57]
            }, {
                name: "Latin Female",
                flag: "va",
                gender: "f",
                voiceIDs: [114]
            }, {
                name: "Norwegian Female",
                flag: "no",
                gender: "f",
                voiceIDs: [72, 73, 221, 74]
            }, {
                name: "Polish Female",
                flag: "pl",
                gender: "f",
                voiceIDs: [244, 120, 119, 121, 185, 222, 267, 122]
            }, {
                name: "Portuguese Female",
                flag: "br",
                gender: "f",
                voiceIDs: [128, 127, 129, 187, 224, 272, 130]
            },
            {
                name: "Romanian Male",
                flag: "ro",
                gender: "m",
                voiceIDs: [151, 150, 152, 225, 46]
            }, {
                name: "Russian Female",
                flag: "ru",
                gender: "f",
                voiceIDs: [246, 47, 48, 83, 188, 226, 260, 49]
            }, {
                name: "Slovak Female",
                flag: "sk",
                gender: "f",
                voiceIDs: [133, 132, 134, 227, 135]
            }, {
                name: "Spanish Female",
                flag: "es",
                gender: "f",
                voiceIDs: [19, 238, 16, 17, 18, 20, 76, 174, 207, 263, 264, 15]
            }, {
                name: "Spanish Latin American Female",
                flag: "es",
                gender: "f",
                voiceIDs: [239, 137, 136, 138, 175, 208, 265, 139]
            }, {
                name: "Swedish Female",
                flag: "sv",
                gender: "f",
                voiceIDs: [85, 148, 149, 228,
                    65
                ]
            }, {
                name: "Tamil Male",
                flag: "hi",
                gender: "m",
                voiceIDs: [141]
            }, {
                name: "Thai Female",
                flag: "th",
                gender: "f",
                voiceIDs: [143, 142, 144, 189, 229, 145]
            }, {
                name: "Turkish Female",
                flag: "tr",
                gender: "f",
                voiceIDs: [69, 70, 82, 190, 230, 71]
            }, {
                name: "Afrikaans Male",
                flag: "af",
                gender: "m",
                voiceIDs: [93]
            }, {
                name: "Albanian Male",
                flag: "sq",
                gender: "m",
                voiceIDs: [94]
            }, {
                name: "Bosnian Male",
                flag: "bs",
                gender: "m",
                voiceIDs: [14]
            }, {
                name: "Catalan Male",
                flag: "catalonia",
                gender: "m",
                voiceIDs: [68]
            }, {
                name: "Croatian Male",
                flag: "hr",
                gender: "m",
                voiceIDs: [13]
            },
            {
                name: "Czech Male",
                flag: "cz",
                gender: "m",
                voiceIDs: [161]
            }, {
                name: "Danish Male",
                flag: "da",
                gender: "m",
                voiceIDs: [162],
                deprecated: !0
            }, {
                name: "Esperanto Male",
                flag: "eo",
                gender: "m",
                voiceIDs: [108]
            }, {
                name: "Finnish Male",
                flag: "fi",
                gender: "m",
                voiceIDs: [160],
                deprecated: !0
            }, {
                name: "Greek Male",
                flag: "gr",
                gender: "m",
                voiceIDs: [163],
                deprecated: !0
            }, {
                name: "Hungarian Male",
                flag: "hu",
                gender: "m",
                voiceIDs: [164]
            }, {
                name: "Icelandic Male",
                flag: "is",
                gender: "m",
                voiceIDs: [110]
            }, {
                name: "Latin Male",
                flag: "va",
                gender: "m",
                voiceIDs: [165],
                deprecated: !0
            }, {
                name: "Latvian Male",
                flag: "lv",
                gender: "m",
                voiceIDs: [115]
            }, {
                name: "Macedonian Male",
                flag: "mk",
                gender: "m",
                voiceIDs: [116]
            }, {
                name: "Moldavian Male",
                flag: "md",
                gender: "m",
                voiceIDs: [117]
            }, {
                name: "Montenegrin Male",
                flag: "me",
                gender: "m",
                voiceIDs: [118]
            }, {
                name: "Norwegian Male",
                flag: "no",
                gender: "m",
                voiceIDs: [166]
            }, {
                name: "Serbian Male",
                flag: "sr",
                gender: "m",
                voiceIDs: [12]
            }, {
                name: "Serbo-Croatian Male",
                flag: "hr",
                gender: "m",
                voiceIDs: [131]
            }, {
                name: "Slovak Male",
                flag: "sk",
                gender: "m",
                voiceIDs: [167],
                deprecated: !0
            },
            {
                name: "Swahili Male",
                flag: "sw",
                gender: "m",
                voiceIDs: [140]
            }, {
                name: "Swedish Male",
                flag: "sv",
                gender: "m",
                voiceIDs: [168],
                deprecated: !0
            }, {
                name: "Vietnamese Male",
                flag: "vi",
                gender: "m",
                voiceIDs: [146],
                deprecated: !0
            }, {
                name: "Welsh Male",
                flag: "cy",
                gender: "m",
                voiceIDs: [147]
            }, {
                name: "US English Male",
                flag: "us",
                gender: "m",
                voiceIDs: [0, 4, 2, 6, 7, 75, 159, 234, 236, 237]
            }, {
                name: "Fallback UK Female",
                flag: "gb",
                gender: "f",
                voiceIDs: [8]
            }
        ];
        a.voicecollection = [{
                name: "Google UK English Male"
            }, {
                name: "Agnes"
            }, {
                name: "Daniel Compact"
            }, {
                name: "Google UK English Female"
            },
            {
                name: "en-GB",
                rate: .25,
                pitch: 1
            }, {
                name: "en-AU",
                rate: .25,
                pitch: 1
            }, {
                name: "ingl\u00e9s Reino Unido"
            }, {
                name: "English United Kingdom"
            }, {
                name: "Fallback en-GB Female",
                lang: "en-GB",
                fallbackvoice: !0
            }, {
                name: "Eszter Compact"
            }, {
                name: "hu-HU",
                rate: .4
            }, {
                name: "Fallback Hungarian",
                lang: "hu",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Fallback Serbian",
                lang: "sr",
                fallbackvoice: !0
            }, {
                name: "Fallback Croatian",
                lang: "hr",
                fallbackvoice: !0
            }, {
                name: "Fallback Bosnian",
                lang: "bs",
                fallbackvoice: !0
            }, {
                name: "Fallback Spanish",
                lang: "es",
                fallbackvoice: !0
            },
            {
                name: "Spanish Spain"
            }, {
                name: "espa\u00f1ol Espa\u00f1a"
            }, {
                name: "Diego Compact",
                rate: .3
            }, {
                name: "Google Espa\u00f1ol"
            }, {
                name: "es-ES",
                rate: .2
            }, {
                name: "Google Fran\u00e7ais"
            }, {
                name: "French France"
            }, {
                name: "franc\u00e9s Francia"
            }, {
                name: "Virginie Compact",
                rate: .5
            }, {
                name: "fr-FR",
                rate: .25
            }, {
                name: "Fallback French",
                lang: "fr",
                fallbackvoice: !0
            }, {
                name: "Google Deutsch"
            }, {
                name: "German Germany"
            }, {
                name: "alem\u00e1n Alemania"
            }, {
                name: "Yannick Compact",
                rate: .5
            }, {
                name: "de-DE",
                rate: .25
            }, {
                name: "Fallback Deutsch",
                lang: "de",
                fallbackvoice: !0
            }, {
                name: "Google Italiano"
            }, {
                name: "Italian Italy"
            }, {
                name: "italiano Italia"
            }, {
                name: "Paolo Compact",
                rate: .5
            }, {
                name: "it-IT",
                rate: .25
            }, {
                name: "Fallback Italian",
                lang: "it",
                fallbackvoice: !0
            }, {
                name: "Google US English",
                timerSpeed: 1
            }, {
                name: "English United States"
            }, {
                name: "ingl\u00e9s Estados Unidos"
            }, {
                name: "Vicki"
            }, {
                name: "en-US",
                rate: .2,
                pitch: 1,
                timerSpeed: 1.3
            }, {
                name: "Fallback English",
                lang: "en-US",
                fallbackvoice: !0,
                timerSpeed: 0
            }, {
                name: "Fallback Dutch",
                lang: "nl",
                fallbackvoice: !0,
                timerSpeed: 0
            }, {
                name: "Fallback Romanian",
                lang: "ro",
                fallbackvoice: !0
            }, {
                name: "Milena Compact"
            }, {
                name: "ru-RU",
                rate: .25
            }, {
                name: "Fallback Russian",
                lang: "ru",
                fallbackvoice: !0
            }, {
                name: "Google \u65e5\u672c\u4eba",
                timerSpeed: 1
            }, {
                name: "Kyoko Compact"
            }, {
                name: "ja-JP",
                rate: .25
            }, {
                name: "Fallback Japanese",
                lang: "ja",
                fallbackvoice: !0
            }, {
                name: "Google \ud55c\uad6d\uc758",
                timerSpeed: 1
            }, {
                name: "Narae Compact"
            }, {
                name: "ko-KR",
                rate: .25
            }, {
                name: "Fallback Korean",
                lang: "ko",
                fallbackvoice: !0
            }, {
                name: "Google \u4e2d\u56fd\u7684",
                timerSpeed: 1
            }, {
                name: "Ting-Ting Compact"
            }, {
                name: "zh-CN",
                rate: .25
            }, {
                name: "Fallback Chinese",
                lang: "zh-CN",
                fallbackvoice: !0
            }, {
                name: "Alexandros Compact"
            }, {
                name: "el-GR",
                rate: .25
            }, {
                name: "Fallback Greek",
                lang: "el",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Fallback Swedish",
                lang: "sv",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "hi-IN",
                rate: .25
            }, {
                name: "Fallback Hindi",
                lang: "hi",
                fallbackvoice: !0
            }, {
                name: "Fallback Catalan",
                lang: "ca",
                fallbackvoice: !0
            }, {
                name: "Aylin Compact"
            }, {
                name: "tr-TR",
                rate: .25
            }, {
                name: "Fallback Turkish",
                lang: "tr",
                fallbackvoice: !0
            }, {
                name: "Stine Compact"
            }, {
                name: "no-NO",
                rate: .25
            }, {
                name: "Fallback Norwegian",
                lang: "no",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Daniel"
            }, {
                name: "Monica"
            }, {
                name: "Amelie"
            }, {
                name: "Anna"
            }, {
                name: "Alice"
            }, {
                name: "Melina"
            }, {
                name: "Mariska"
            }, {
                name: "Yelda"
            }, {
                name: "Milena"
            }, {
                name: "Xander"
            }, {
                name: "Alva"
            }, {
                name: "Lee Compact"
            }, {
                name: "Karen"
            }, {
                name: "Fallback Australian",
                lang: "en-AU",
                fallbackvoice: !0
            }, {
                name: "Mikko Compact"
            }, {
                name: "Satu"
            }, {
                name: "fi-FI",
                rate: .25
            }, {
                name: "Fallback Finnish",
                lang: "fi",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Fallback Afrikans",
                lang: "af",
                fallbackvoice: !0
            }, {
                name: "Fallback Albanian",
                lang: "sq",
                fallbackvoice: !0
            }, {
                name: "Maged Compact"
            }, {
                name: "Tarik"
            }, {
                name: "ar-SA",
                rate: .25
            }, {
                name: "Fallback Arabic",
                lang: "ar",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Fallback Armenian",
                lang: "hy",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Zuzana Compact"
            }, {
                name: "Zuzana"
            }, {
                name: "cs-CZ",
                rate: .25
            }, {
                name: "Fallback Czech",
                lang: "cs",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Ida Compact"
            }, {
                name: "Sara"
            }, {
                name: "da-DK",
                rate: .25
            }, {
                name: "Fallback Danish",
                lang: "da",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Fallback Esperanto",
                lang: "eo",
                fallbackvoice: !0
            }, {
                name: "Fallback Haitian Creole",
                lang: "ht",
                fallbackvoice: !0
            }, {
                name: "Fallback Icelandic",
                lang: "is",
                fallbackvoice: !0
            }, {
                name: "Damayanti"
            }, {
                name: "id-ID",
                rate: .25
            }, {
                name: "Fallback Indonesian",
                lang: "id",
                fallbackvoice: !0
            }, {
                name: "Fallback Latin",
                lang: "la",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Fallback Latvian",
                lang: "lv",
                fallbackvoice: !0
            }, {
                name: "Fallback Macedonian",
                lang: "mk",
                fallbackvoice: !0
            }, {
                name: "Fallback Moldavian",
                lang: "mo",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Fallback Montenegrin",
                lang: "sr-ME",
                fallbackvoice: !0
            }, {
                name: "Agata Compact"
            }, {
                name: "Zosia"
            }, {
                name: "pl-PL",
                rate: .25
            }, {
                name: "Fallback Polish",
                lang: "pl",
                fallbackvoice: !0
            }, {
                name: "Raquel Compact"
            }, {
                name: "Luciana"
            }, {
                name: "pt-BR",
                rate: .25
            }, {
                name: "Fallback Brazilian Portugese",
                lang: "pt-BR",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Joana Compact"
            }, {
                name: "Joana"
            }, {
                name: "pt-PT",
                rate: .25
            }, {
                name: "Fallback Portuguese",
                lang: "pt-PT",
                fallbackvoice: !0
            }, {
                name: "Fallback Serbo-Croation",
                lang: "sh",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Laura Compact"
            }, {
                name: "Laura"
            }, {
                name: "sk-SK",
                rate: .25
            }, {
                name: "Fallback Slovak",
                lang: "sk",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Javier Compact"
            }, {
                name: "Paulina"
            }, {
                name: "es-MX",
                rate: .25
            }, {
                name: "Fallback Spanish (Latin American)",
                lang: "es-419",
                fallbackvoice: !0,
                service: "g2"
            }, {
                name: "Fallback Swahili",
                lang: "sw",
                fallbackvoice: !0
            }, {
                name: "Fallback Tamil",
                lang: "ta",
                fallbackvoice: !0
            }, {
                name: "Narisa Compact"
            }, {
                name: "Kanya"
            }, {
                name: "th-TH",
                rate: .25
            }, {
                name: "Fallback Thai",
                lang: "th",
                fallbackvoice: !0
            },
            {
                name: "Fallback Vietnamese",
                lang: "vi",
                fallbackvoice: !0
            }, {
                name: "Fallback Welsh",
                lang: "cy",
                fallbackvoice: !0
            }, {
                name: "Oskar Compact"
            }, {
                name: "sv-SE",
                rate: .25
            }, {
                name: "Simona Compact"
            }, {
                name: "Ioana"
            }, {
                name: "ro-RO",
                rate: .25
            }, {
                name: "Kyoko"
            }, {
                name: "Lekha"
            }, {
                name: "Ting-Ting"
            }, {
                name: "Yuna"
            }, {
                name: "Xander Compact"
            }, {
                name: "nl-NL",
                rate: .25
            }, {
                name: "Fallback UK English Male",
                lang: "en-GB",
                fallbackvoice: !0,
                service: "g1",
                voicename: "rjs"
            }, {
                name: "Finnish Male",
                lang: "fi",
                fallbackvoice: !0,
                service: "g1",
                voicename: ""
            }, {
                name: "Czech Male",
                lang: "cs",
                fallbackvoice: !0,
                service: "g1",
                voicename: ""
            }, {
                name: "Danish Male",
                lang: "da",
                fallbackvoice: !0,
                service: "g1",
                voicename: ""
            }, {
                name: "Greek Male",
                lang: "el",
                fallbackvoice: !0,
                service: "g1",
                voicename: "",
                rate: .25
            }, {
                name: "Hungarian Male",
                lang: "hu",
                fallbackvoice: !0,
                service: "g1",
                voicename: ""
            }, {
                name: "Latin Male",
                lang: "la",
                fallbackvoice: !0,
                service: "g1",
                voicename: ""
            }, {
                name: "Norwegian Male",
                lang: "no",
                fallbackvoice: !0,
                service: "g1",
                voicename: ""
            }, {
                name: "Slovak Male",
                lang: "sk",
                fallbackvoice: !0,
                service: "g1",
                voicename: ""
            },
            {
                name: "Swedish Male",
                lang: "sv",
                fallbackvoice: !0,
                service: "g1",
                voicename: ""
            }, {
                name: "Fallback US English Male",
                lang: "en",
                fallbackvoice: !0,
                service: "tts-api",
                voicename: ""
            }, {
                name: "German Germany",
                lang: "de_DE"
            }, {
                name: "English United Kingdom",
                lang: "en_GB"
            }, {
                name: "English India",
                lang: "en_IN"
            }, {
                name: "English United States",
                lang: "en_US"
            }, {
                name: "Spanish Spain",
                lang: "es_ES"
            }, {
                name: "Spanish Mexico",
                lang: "es_MX"
            }, {
                name: "Spanish United States",
                lang: "es_US"
            }, {
                name: "French Belgium",
                lang: "fr_BE"
            }, {
                name: "French France",
                lang: "fr_FR"
            }, {
                name: "Hindi India",
                lang: "hi_IN"
            }, {
                name: "Indonesian Indonesia",
                lang: "in_ID"
            }, {
                name: "Italian Italy",
                lang: "it_IT"
            }, {
                name: "Japanese Japan",
                lang: "ja_JP"
            }, {
                name: "Korean South Korea",
                lang: "ko_KR"
            }, {
                name: "Dutch Netherlands",
                lang: "nl_NL"
            }, {
                name: "Polish Poland",
                lang: "pl_PL"
            }, {
                name: "Portuguese Brazil",
                lang: "pt_BR"
            }, {
                name: "Portuguese Portugal",
                lang: "pt_PT"
            }, {
                name: "Russian Russia",
                lang: "ru_RU"
            }, {
                name: "Thai Thailand",
                lang: "th_TH"
            }, {
                name: "Turkish Turkey",
                lang: "tr_TR"
            }, {
                name: "Chinese China",
                lang: "zh_CN_#Hans"
            },
            {
                name: "Chinese Hong Kong",
                lang: "zh_HK_#Hans"
            }, {
                name: "Chinese Hong Kong",
                lang: "zh_HK_#Hant"
            }, {
                name: "Chinese Taiwan",
                lang: "zh_TW_#Hant"
            }, {
                name: "Alex"
            }, {
                name: "Maged",
                lang: "ar-SA"
            }, {
                name: "Zuzana",
                lang: "cs-CZ"
            }, {
                name: "Sara",
                lang: "da-DK"
            }, {
                name: "Anna",
                lang: "de-DE"
            }, {
                name: "Melina",
                lang: "el-GR"
            }, {
                name: "Karen",
                lang: "en-AU"
            }, {
                name: "Daniel",
                lang: "en-GB"
            }, {
                name: "Moira",
                lang: "en-IE"
            }, {
                name: "Samantha (Enhanced)",
                lang: "en-US"
            }, {
                name: "Samantha",
                lang: "en-US"
            }, {
                name: "Tessa",
                lang: "en-ZA"
            }, {
                name: "Monica",
                lang: "es-ES"
            },
            {
                name: "Paulina",
                lang: "es-MX"
            }, {
                name: "Satu",
                lang: "fi-FI"
            }, {
                name: "Amelie",
                lang: "fr-CA"
            }, {
                name: "Thomas",
                lang: "fr-FR"
            }, {
                name: "Carmit",
                lang: "he-IL"
            }, {
                name: "Lekha",
                lang: "hi-IN"
            }, {
                name: "Mariska",
                lang: "hu-HU"
            }, {
                name: "Damayanti",
                lang: "id-ID"
            }, {
                name: "Alice",
                lang: "it-IT"
            }, {
                name: "Kyoko",
                lang: "ja-JP"
            }, {
                name: "Yuna",
                lang: "ko-KR"
            }, {
                name: "Ellen",
                lang: "nl-BE"
            }, {
                name: "Xander",
                lang: "nl-NL"
            }, {
                name: "Nora",
                lang: "no-NO"
            }, {
                name: "Zosia",
                lang: "pl-PL"
            }, {
                name: "Luciana",
                lang: "pt-BR"
            }, {
                name: "Joana",
                lang: "pt-PT"
            }, {
                name: "Ioana",
                lang: "ro-RO"
            }, {
                name: "Milena",
                lang: "ru-RU"
            }, {
                name: "Laura",
                lang: "sk-SK"
            }, {
                name: "Alva",
                lang: "sv-SE"
            }, {
                name: "Kanya",
                lang: "th-TH"
            }, {
                name: "Yelda",
                lang: "tr-TR"
            }, {
                name: "Ting-Ting",
                lang: "zh-CN"
            }, {
                name: "Sin-Ji",
                lang: "zh-HK"
            }, {
                name: "Mei-Jia",
                lang: "zh-TW"
            }, {
                name: "Microsoft David Mobile - English (United States)",
                lang: "en-US"
            }, {
                name: "Microsoft Zira Mobile - English (United States)",
                lang: "en-US"
            }, {
                name: "Microsoft Mark Mobile - English (United States)",
                lang: "en-US"
            }, {
                name: "native",
                lang: ""
            }, {
                name: "Google espa\u00f1ol"
            },
            {
                name: "Google espa\u00f1ol de Estados Unidos"
            }, {
                name: "Google fran\u00e7ais"
            }, {
                name: "Google Bahasa Indonesia"
            }, {
                name: "Google italiano"
            }, {
                name: "Google Nederlands"
            }, {
                name: "Google polski"
            }, {
                name: "Google portugu\u00eas do Brasil"
            }, {
                name: "Google \u0440\u0443\u0441\u0441\u043a\u0438\u0439"
            }, {
                name: "Google \u0939\u093f\u0928\u094d\u0926\u0940"
            }, {
                name: "Google \u65e5\u672c\u8a9e"
            }, {
                name: "Google \u666e\u901a\u8bdd\uff08\u4e2d\u56fd\u5927\u9646\uff09"
            }, {
                name: "Google \u7ca4\u8a9e\uff08\u9999\u6e2f\uff09"
            }, {
                name: "zh-HK",
                rate: .25
            }, {
                name: "Fallback Chinese (Hong Kong) Female",
                lang: "zh-HK",
                fallbackvoice: !0,
                service: "g1"
            }, {
                name: "Google \u7ca4\u8a9e\uff08\u9999\u6e2f\uff09"
            }, {
                name: "zh-TW",
                rate: .25
            }, {
                name: "Fallback Chinese (Taiwan) Female",
                lang: "zh-TW",
                fallbackvoice: !0,
                service: "g1"
            }, {
                name: "Microsoft George Mobile - English (United Kingdom)",
                lang: "en-GB"
            }, {
                name: "Microsoft Susan Mobile - English (United Kingdom)",
                lang: "en-GB"
            }, {
                name: "Microsoft Hazel Mobile - English (United Kingdom)",
                lang: "en-GB"
            }, {
                name: "Microsoft Heera Mobile - English (India)",
                lang: "en-In"
            }, {
                name: "Microsoft Irina Mobile - Russian (Russia)",
                lang: "ru-RU"
            }, {
                name: "Microsoft Hedda Mobile - German (Germany)",
                lang: "de-DE"
            }, {
                name: "Microsoft Katja Mobile - German (Germany)",
                lang: "de-DE"
            }, {
                name: "Microsoft Helena Mobile - Spanish (Spain)",
                lang: "es-ES"
            }, {
                name: "Microsoft Laura Mobile - Spanish (Spain)",
                lang: "es-ES"
            }, {
                name: "Microsoft Sabina Mobile - Spanish (Mexico)",
                lang: "es-MX"
            }, {
                name: "Microsoft Julie Mobile - French (France)",
                lang: "fr-FR"
            }, {
                name: "Microsoft Paulina Mobile - Polish (Poland)",
                lang: "pl-PL"
            }, {
                name: "Microsoft Huihui Mobile - Chinese (Simplified, PRC)",
                lang: "zh-CN"
            }, {
                name: "Microsoft Yaoyao Mobile - Chinese (Simplified, PRC)",
                lang: "zh-CN"
            }, {
                name: "Microsoft Tracy Mobile - Chinese (Traditional, Hong Kong S.A.R.)",
                lang: "zh-CN"
            }, {
                name: "Microsoft Elsa Mobile - Italian (Italy)",
                lang: "it-IT"
            }, {
                name: "Microsoft Maria Mobile - Portuguese (Brazil)",
                lang: "pt-BR"
            }, {
                name: "Microsoft Ayumi Mobile - Japanese (Japan)",
                lang: "ja-JP"
            }, {
                name: "Microsoft Haruka Mobile - Japanese (Japan)",
                lang: "ja-JP"
            },
            {
                name: "Helena",
                lang: "de-DE"
            }, {
                name: "Catherine",
                lang: "en-AU"
            }, {
                name: "Arthur",
                lang: "en-GB"
            }, {
                name: "Martha",
                lang: "en-GB"
            }, {
                name: "Marie",
                lang: "fr-FR"
            }, {
                name: "O-ren",
                lang: "ja-JP"
            }, {
                name: "Yu-shu",
                lang: "zh-CN"
            }
        ];
        a.iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
        a.iOS9 = /(iphone|ipod|ipad).* os 9_/.test(navigator.userAgent.toLowerCase());
        a.iOS10 = /(iphone|ipod|ipad).* os 10_/.test(navigator.userAgent.toLowerCase());
        a.iOS9plus = /(iphone|ipod|ipad).* os 10_/.test(navigator.userAgent.toLowerCase()) || /(iphone|ipod|ipad).* os 10_/.test(navigator.userAgent.toLowerCase());
        a.is_chrome = -1 < navigator.userAgent.indexOf("Chrome");
        a.is_safari = -1 < navigator.userAgent.indexOf("Safari");
        a.is_chrome && a.is_safari && (a.is_safari = !1);
        a.is_opera = !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/");
        a.is_android = -1 < navigator.userAgent.toLowerCase().indexOf("android");
        a.iOS_initialized = !1;
        a.iOS9_initialized = !1;
        a.iOS10_initialized = !1;
        a.cache_ios_voices = [{
                name: "he-IL",
                voiceURI: "he-IL",
                lang: "he-IL"
            }, {
                name: "th-TH",
                voiceURI: "th-TH",
                lang: "th-TH"
            }, {
                name: "pt-BR",
                voiceURI: "pt-BR",
                lang: "pt-BR"
            },
            {
                name: "sk-SK",
                voiceURI: "sk-SK",
                lang: "sk-SK"
            }, {
                name: "fr-CA",
                voiceURI: "fr-CA",
                lang: "fr-CA"
            }, {
                name: "ro-RO",
                voiceURI: "ro-RO",
                lang: "ro-RO"
            }, {
                name: "no-NO",
                voiceURI: "no-NO",
                lang: "no-NO"
            }, {
                name: "fi-FI",
                voiceURI: "fi-FI",
                lang: "fi-FI"
            }, {
                name: "pl-PL",
                voiceURI: "pl-PL",
                lang: "pl-PL"
            }, {
                name: "de-DE",
                voiceURI: "de-DE",
                lang: "de-DE"
            }, {
                name: "nl-NL",
                voiceURI: "nl-NL",
                lang: "nl-NL"
            }, {
                name: "id-ID",
                voiceURI: "id-ID",
                lang: "id-ID"
            }, {
                name: "tr-TR",
                voiceURI: "tr-TR",
                lang: "tr-TR"
            }, {
                name: "it-IT",
                voiceURI: "it-IT",
                lang: "it-IT"
            }, {
                name: "pt-PT",
                voiceURI: "pt-PT",
                lang: "pt-PT"
            }, {
                name: "fr-FR",
                voiceURI: "fr-FR",
                lang: "fr-FR"
            }, {
                name: "ru-RU",
                voiceURI: "ru-RU",
                lang: "ru-RU"
            }, {
                name: "es-MX",
                voiceURI: "es-MX",
                lang: "es-MX"
            }, {
                name: "zh-HK",
                voiceURI: "zh-HK",
                lang: "zh-HK"
            }, {
                name: "sv-SE",
                voiceURI: "sv-SE",
                lang: "sv-SE"
            }, {
                name: "hu-HU",
                voiceURI: "hu-HU",
                lang: "hu-HU"
            }, {
                name: "zh-TW",
                voiceURI: "zh-TW",
                lang: "zh-TW"
            }, {
                name: "es-ES",
                voiceURI: "es-ES",
                lang: "es-ES"
            }, {
                name: "zh-CN",
                voiceURI: "zh-CN",
                lang: "zh-CN"
            }, {
                name: "nl-BE",
                voiceURI: "nl-BE",
                lang: "nl-BE"
            }, {
                name: "en-GB",
                voiceURI: "en-GB",
                lang: "en-GB"
            }, {
                name: "ar-SA",
                voiceURI: "ar-SA",
                lang: "ar-SA"
            }, {
                name: "ko-KR",
                voiceURI: "ko-KR",
                lang: "ko-KR"
            }, {
                name: "cs-CZ",
                voiceURI: "cs-CZ",
                lang: "cs-CZ"
            }, {
                name: "en-ZA",
                voiceURI: "en-ZA",
                lang: "en-ZA"
            }, {
                name: "en-AU",
                voiceURI: "en-AU",
                lang: "en-AU"
            }, {
                name: "da-DK",
                voiceURI: "da-DK",
                lang: "da-DK"
            }, {
                name: "en-US",
                voiceURI: "en-US",
                lang: "en-US"
            }, {
                name: "en-IE",
                voiceURI: "en-IE",
                lang: "en-IE"
            }, {
                name: "hi-IN",
                voiceURI: "hi-IN",
                lang: "hi-IN"
            }, {
                name: "el-GR",
                voiceURI: "el-GR",
                lang: "el-GR"
            }, {
                name: "ja-JP",
                voiceURI: "ja-JP",
                lang: "ja-JP"
            }
        ];
        a.cache_ios9_voices = [{
                name: "Maged",
                voiceURI: "com.apple.ttsbundle.Maged-compact",
                lang: "ar-SA",
                localService: !0,
                "default": !0
            }, {
                name: "Zuzana",
                voiceURI: "com.apple.ttsbundle.Zuzana-compact",
                lang: "cs-CZ",
                localService: !0,
                "default": !0
            }, {
                name: "Sara",
                voiceURI: "com.apple.ttsbundle.Sara-compact",
                lang: "da-DK",
                localService: !0,
                "default": !0
            }, {
                name: "Anna",
                voiceURI: "com.apple.ttsbundle.Anna-compact",
                lang: "de-DE",
                localService: !0,
                "default": !0
            }, {
                name: "Melina",
                voiceURI: "com.apple.ttsbundle.Melina-compact",
                lang: "el-GR",
                localService: !0,
                "default": !0
            }, {
                name: "Karen",
                voiceURI: "com.apple.ttsbundle.Karen-compact",
                lang: "en-AU",
                localService: !0,
                "default": !0
            }, {
                name: "Daniel",
                voiceURI: "com.apple.ttsbundle.Daniel-compact",
                lang: "en-GB",
                localService: !0,
                "default": !0
            }, {
                name: "Moira",
                voiceURI: "com.apple.ttsbundle.Moira-compact",
                lang: "en-IE",
                localService: !0,
                "default": !0
            }, {
                name: "Samantha (Enhanced)",
                voiceURI: "com.apple.ttsbundle.Samantha-premium",
                lang: "en-US",
                localService: !0,
                "default": !0
            }, {
                name: "Samantha",
                voiceURI: "com.apple.ttsbundle.Samantha-compact",
                lang: "en-US",
                localService: !0,
                "default": !0
            }, {
                name: "Tessa",
                voiceURI: "com.apple.ttsbundle.Tessa-compact",
                lang: "en-ZA",
                localService: !0,
                "default": !0
            }, {
                name: "Monica",
                voiceURI: "com.apple.ttsbundle.Monica-compact",
                lang: "es-ES",
                localService: !0,
                "default": !0
            }, {
                name: "Paulina",
                voiceURI: "com.apple.ttsbundle.Paulina-compact",
                lang: "es-MX",
                localService: !0,
                "default": !0
            }, {
                name: "Satu",
                voiceURI: "com.apple.ttsbundle.Satu-compact",
                lang: "fi-FI",
                localService: !0,
                "default": !0
            }, {
                name: "Amelie",
                voiceURI: "com.apple.ttsbundle.Amelie-compact",
                lang: "fr-CA",
                localService: !0,
                "default": !0
            }, {
                name: "Thomas",
                voiceURI: "com.apple.ttsbundle.Thomas-compact",
                lang: "fr-FR",
                localService: !0,
                "default": !0
            }, {
                name: "Carmit",
                voiceURI: "com.apple.ttsbundle.Carmit-compact",
                lang: "he-IL",
                localService: !0,
                "default": !0
            }, {
                name: "Lekha",
                voiceURI: "com.apple.ttsbundle.Lekha-compact",
                lang: "hi-IN",
                localService: !0,
                "default": !0
            }, {
                name: "Mariska",
                voiceURI: "com.apple.ttsbundle.Mariska-compact",
                lang: "hu-HU",
                localService: !0,
                "default": !0
            }, {
                name: "Damayanti",
                voiceURI: "com.apple.ttsbundle.Damayanti-compact",
                lang: "id-ID",
                localService: !0,
                "default": !0
            }, {
                name: "Alice",
                voiceURI: "com.apple.ttsbundle.Alice-compact",
                lang: "it-IT",
                localService: !0,
                "default": !0
            }, {
                name: "Kyoko",
                voiceURI: "com.apple.ttsbundle.Kyoko-compact",
                lang: "ja-JP",
                localService: !0,
                "default": !0
            }, {
                name: "Yuna",
                voiceURI: "com.apple.ttsbundle.Yuna-compact",
                lang: "ko-KR",
                localService: !0,
                "default": !0
            }, {
                name: "Ellen",
                voiceURI: "com.apple.ttsbundle.Ellen-compact",
                lang: "nl-BE",
                localService: !0,
                "default": !0
            }, {
                name: "Xander",
                voiceURI: "com.apple.ttsbundle.Xander-compact",
                lang: "nl-NL",
                localService: !0,
                "default": !0
            }, {
                name: "Nora",
                voiceURI: "com.apple.ttsbundle.Nora-compact",
                lang: "no-NO",
                localService: !0,
                "default": !0
            }, {
                name: "Zosia",
                voiceURI: "com.apple.ttsbundle.Zosia-compact",
                lang: "pl-PL",
                localService: !0,
                "default": !0
            }, {
                name: "Luciana",
                voiceURI: "com.apple.ttsbundle.Luciana-compact",
                lang: "pt-BR",
                localService: !0,
                "default": !0
            }, {
                name: "Joana",
                voiceURI: "com.apple.ttsbundle.Joana-compact",
                lang: "pt-PT",
                localService: !0,
                "default": !0
            }, {
                name: "Ioana",
                voiceURI: "com.apple.ttsbundle.Ioana-compact",
                lang: "ro-RO",
                localService: !0,
                "default": !0
            }, {
                name: "Milena",
                voiceURI: "com.apple.ttsbundle.Milena-compact",
                lang: "ru-RU",
                localService: !0,
                "default": !0
            }, {
                name: "Laura",
                voiceURI: "com.apple.ttsbundle.Laura-compact",
                lang: "sk-SK",
                localService: !0,
                "default": !0
            }, {
                name: "Alva",
                voiceURI: "com.apple.ttsbundle.Alva-compact",
                lang: "sv-SE",
                localService: !0,
                "default": !0
            }, {
                name: "Kanya",
                voiceURI: "com.apple.ttsbundle.Kanya-compact",
                lang: "th-TH",
                localService: !0,
                "default": !0
            }, {
                name: "Yelda",
                voiceURI: "com.apple.ttsbundle.Yelda-compact",
                lang: "tr-TR",
                localService: !0,
                "default": !0
            }, {
                name: "Ting-Ting",
                voiceURI: "com.apple.ttsbundle.Ting-Ting-compact",
                lang: "zh-CN",
                localService: !0,
                "default": !0
            }, {
                name: "Sin-Ji",
                voiceURI: "com.apple.ttsbundle.Sin-Ji-compact",
                lang: "zh-HK",
                localService: !0,
                "default": !0
            }, {
                name: "Mei-Jia",
                voiceURI: "com.apple.ttsbundle.Mei-Jia-compact",
                lang: "zh-TW",
                localService: !0,
                "default": !0
            }];
        a.cache_ios10_voices = [{
                name: "Maged",
                voiceURI: "com.apple.ttsbundle.Maged-compact",
                lang: "ar-SA"
            }, {
                name: "Zuzana",
                voiceURI: "com.apple.ttsbundle.Zuzana-compact",
                lang: "cs-CZ"
            }, {
                name: "Sara",
                voiceURI: "com.apple.ttsbundle.Sara-compact",
                lang: "da-DK"
            }, {
                name: "Anna",
                voiceURI: "com.apple.ttsbundle.Anna-compact",
                lang: "de-DE"
            }, {
                name: "Helena",
                voiceURI: "com.apple.ttsbundle.siri_female_de-DE_compact",
                lang: "de-DE"
            }, {
                name: "Martin",
                voiceURI: "com.apple.ttsbundle.siri_male_de-DE_compact",
                lang: "de-DE"
            }, {
                name: "Nikos (Enhanced)",
                voiceURI: "com.apple.ttsbundle.Nikos-premium",
                lang: "el-GR"
            }, {
                name: "Melina",
                voiceURI: "com.apple.ttsbundle.Melina-compact",
                lang: "el-GR"
            }, {
                name: "Nikos",
                voiceURI: "com.apple.ttsbundle.Nikos-compact",
                lang: "el-GR"
            }, {
                name: "Catherine",
                voiceURI: "com.apple.ttsbundle.siri_female_en-AU_compact",
                lang: "en-AU"
            }, {
                name: "Gordon",
                voiceURI: "com.apple.ttsbundle.siri_male_en-AU_compact",
                lang: "en-AU"
            }, {
                name: "Karen",
                voiceURI: "com.apple.ttsbundle.Karen-compact",
                lang: "en-AU"
            }, {
                name: "Daniel (Enhanced)",
                voiceURI: "com.apple.ttsbundle.Daniel-premium",
                lang: "en-GB"
            }, {
                name: "Arthur",
                voiceURI: "com.apple.ttsbundle.siri_male_en-GB_compact",
                lang: "en-GB"
            }, {
                name: "Daniel",
                voiceURI: "com.apple.ttsbundle.Daniel-compact",
                lang: "en-GB"
            },
            {
                name: "Martha",
                voiceURI: "com.apple.ttsbundle.siri_female_en-GB_compact",
                lang: "en-GB"
            }, {
                name: "Moira",
                voiceURI: "com.apple.ttsbundle.Moira-compact",
                lang: "en-IE"
            }, {
                name: "Nicky (Enhanced)",
                voiceURI: "com.apple.ttsbundle.siri_female_en-US_premium",
                lang: "en-US"
            }, {
                name: "Samantha (Enhanced)",
                voiceURI: "com.apple.ttsbundle.Samantha-premium",
                lang: "en-US"
            }, {
                name: "Aaron",
                voiceURI: "com.apple.ttsbundle.siri_male_en-US_compact",
                lang: "en-US"
            }, {
                name: "Fred",
                voiceURI: "com.apple.speech.synthesis.voice.Fred",
                lang: "en-US"
            },
            {
                name: "Nicky",
                voiceURI: "com.apple.ttsbundle.siri_female_en-US_compact",
                lang: "en-US"
            }, {
                name: "Samantha",
                voiceURI: "com.apple.ttsbundle.Samantha-compact",
                lang: "en-US"
            }, {
                name: "Tessa",
                voiceURI: "com.apple.ttsbundle.Tessa-compact",
                lang: "en-ZA"
            }, {
                name: "Monica",
                voiceURI: "com.apple.ttsbundle.Monica-compact",
                lang: "es-ES"
            }, {
                name: "Paulina",
                voiceURI: "com.apple.ttsbundle.Paulina-compact",
                lang: "es-MX"
            }, {
                name: "Satu",
                voiceURI: "com.apple.ttsbundle.Satu-compact",
                lang: "fi-FI"
            }, {
                name: "Amelie",
                voiceURI: "com.apple.ttsbundle.Amelie-compact",
                lang: "fr-CA"
            }, {
                name: "Daniel",
                voiceURI: "com.apple.ttsbundle.siri_male_fr-FR_compact",
                lang: "fr-FR"
            }, {
                name: "Marie",
                voiceURI: "com.apple.ttsbundle.siri_female_fr-FR_compact",
                lang: "fr-FR"
            }, {
                name: "Thomas",
                voiceURI: "com.apple.ttsbundle.Thomas-compact",
                lang: "fr-FR"
            }, {
                name: "Carmit",
                voiceURI: "com.apple.ttsbundle.Carmit-compact",
                lang: "he-IL"
            }, {
                name: "Lekha",
                voiceURI: "com.apple.ttsbundle.Lekha-compact",
                lang: "hi-IN"
            }, {
                name: "Mariska",
                voiceURI: "com.apple.ttsbundle.Mariska-compact",
                lang: "hu-HU"
            }, {
                name: "Damayanti",
                voiceURI: "com.apple.ttsbundle.Damayanti-compact",
                lang: "id-ID"
            }, {
                name: "Alice",
                voiceURI: "com.apple.ttsbundle.Alice-compact",
                lang: "it-IT"
            }, {
                name: "Hattori",
                voiceURI: "com.apple.ttsbundle.siri_male_ja-JP_compact",
                lang: "ja-JP"
            }, {
                name: "Kyoko",
                voiceURI: "com.apple.ttsbundle.Kyoko-compact",
                lang: "ja-JP"
            }, {
                name: "O-ren",
                voiceURI: "com.apple.ttsbundle.siri_female_ja-JP_compact",
                lang: "ja-JP"
            }, {
                name: "Yuna",
                voiceURI: "com.apple.ttsbundle.Yuna-compact",
                lang: "ko-KR"
            }, {
                name: "Ellen",
                voiceURI: "com.apple.ttsbundle.Ellen-compact",
                lang: "nl-BE"
            }, {
                name: "Xander",
                voiceURI: "com.apple.ttsbundle.Xander-compact",
                lang: "nl-NL"
            }, {
                name: "Nora",
                voiceURI: "com.apple.ttsbundle.Nora-compact",
                lang: "no-NO"
            }, {
                name: "Zosia",
                voiceURI: "com.apple.ttsbundle.Zosia-compact",
                lang: "pl-PL"
            }, {
                name: "Luciana",
                voiceURI: "com.apple.ttsbundle.Luciana-compact",
                lang: "pt-BR"
            }, {
                name: "Joana",
                voiceURI: "com.apple.ttsbundle.Joana-compact",
                lang: "pt-PT"
            }, {
                name: "Ioana",
                voiceURI: "com.apple.ttsbundle.Ioana-compact",
                lang: "ro-RO"
            }, {
                name: "Milena",
                voiceURI: "com.apple.ttsbundle.Milena-compact",
                lang: "ru-RU"
            }, {
                name: "Laura",
                voiceURI: "com.apple.ttsbundle.Laura-compact",
                lang: "sk-SK"
            }, {
                name: "Alva",
                voiceURI: "com.apple.ttsbundle.Alva-compact",
                lang: "sv-SE"
            }, {
                name: "Kanya",
                voiceURI: "com.apple.ttsbundle.Kanya-compact",
                lang: "th-TH"
            }, {
                name: "Yelda",
                voiceURI: "com.apple.ttsbundle.Yelda-compact",
                lang: "tr-TR"
            }, {
                name: "Li-mu",
                voiceURI: "com.apple.ttsbundle.siri_male_zh-CN_compact",
                lang: "zh-CN"
            }, {
                name: "Ting-Ting",
                voiceURI: "com.apple.ttsbundle.Ting-Ting-compact",
                lang: "zh-CN"
            }, {
                name: "Yu-shu",
                voiceURI: "com.apple.ttsbundle.siri_female_zh-CN_compact",
                lang: "zh-CN"
            }, {
                name: "Sin-Ji",
                voiceURI: "com.apple.ttsbundle.Sin-Ji-compact",
                lang: "zh-HK"
            }, {
                name: "Mei-Jia",
                voiceURI: "com.apple.ttsbundle.Mei-Jia-compact",
                lang: "zh-TW"
            }
        ];
        a.systemvoices = null;
        a.CHARACTER_LIMIT = 100;
        a.VOICESUPPORT_ATTEMPTLIMIT = 5;
        a.voicesupport_attempts = 0;
        a.fallbackMode = !1;
        a.WORDS_PER_MINUTE = 130;
        a.fallback_parts = null;
        a.fallback_part_index = 0;
        a.fallback_audio = null;
        a.fallback_playbackrate = 1;
        a.def_fallback_playbackrate = a.fallback_playbackrate;
        a.fallback_audiopool = [];
        a.msgparameters = null;
        a.timeoutId =
            null;
        a.OnLoad_callbacks = [];
        a.useTimer = !1;
        a.utterances = [];
        a.tstCompiled = function (a) {
            return eval("typeof xy === 'undefined'");
        };
        a.fallbackServicePath = "https://code.responsivevoice.org/" + (a.tstCompiled() ? "" : "develop/") + "getvoice.php";
        a.default_rv = a.responsivevoices[0];
        a.debug = !1;
        a.rvsMapped = !1;
        a.log = function (b) {
            a.debug && console.log(b);
        };
        a.init = function () {
            a.is_android && (a.useTimer = !0);
            a.is_opera || "undefined" === typeof speechSynthesis ? (console.log("RV: Voice synthesis not supported"), a.enableFallbackMode()) :
                setTimeout(function () {
                    var b = setInterval(function () {
                        var c = window.speechSynthesis.getVoices();
                        0 != c.length || null != a.systemvoices && 0 != a.systemvoices.length ? (console.log("RV: Voice support ready"), a.systemVoicesReady(c), clearInterval(b)) : (console.log("Voice support NOT ready"), a.voicesupport_attempts++, a.voicesupport_attempts > a.VOICESUPPORT_ATTEMPTLIMIT && (clearInterval(b), null != window.speechSynthesis ? a.iOS ? (a.iOS10 ? a.systemVoicesReady(a.cache_ios10_voices) : a.iOS9 ? a.systemVoicesReady(a.cache_ios9_voices) :
                            a.systemVoicesReady(a.cache_ios_voices), console.log("RV: Voice support ready (cached)")) : (console.log("RV: speechSynthesis present but no system voices found"), a.enableFallbackMode()) : a.enableFallbackMode()));
                    }, 100);
                }, 100);
            a.Dispatch("OnLoad");
        };
        a.systemVoicesReady = function (b) {
            a.systemvoices = b;
            a.mapRVs();
            null != a.OnVoiceReady && a.OnVoiceReady.call();
            a.Dispatch("OnReady");
            window.hasOwnProperty("dispatchEvent") && window.dispatchEvent(new Event("ResponsiveVoice_OnReady"));
        };
        a.enableFallbackMode = function () {
            a.fallbackMode = !0;
            console.log("RV: Enabling fallback mode");
            a.mapRVs();
            null != a.OnVoiceReady && a.OnVoiceReady.call();
            a.Dispatch("OnReady");
            window.hasOwnProperty("dispatchEvent") && window.dispatchEvent(new Event("ResponsiveVoice_OnReady"));
        };
        a.getVoices = function () {
            for (var b = [], c = 0; c < a.responsivevoices.length; c++)
                b.push({
                    name: a.responsivevoices[c].name
                });
            return b;
        };
        a.speak = function (b, c, d) {
            if (a.rvsMapped) {
                var h = null;
                if (a.iOS9 && !a.iOS9_initialized)
                    a.log("Initializing ios9"), setTimeout(function () {
                        a.speak(b, c, d);
                    }, 100), a.clickEvent(),
                        a.iOS9_initialized = !0;
                else if (a.iOS10 && !a.iOS10_initialized)
                    a.log("Initializing ios10"), setTimeout(function () {
                        a.speak(b, c, d);
                    }, 100), a.clickEvent(), a.iOS10_initialized = !0;
                else {
                    a.isPlaying() && (a.log("Cancelling previous speech"), a.cancel());
                    a.fallbackMode && 0 < a.fallback_audiopool.length && a.clearFallbackPool();
                    b = b.replace(/[\"\`]/gm, "'");
                    a.msgparameters = d || {};
                    a.msgtext = b;
                    a.msgvoicename = c;
                    a.onstartFired = !1;
                    var k = [];
                    if (b.length > a.CHARACTER_LIMIT) {
                        for (var f = b; f.length > a.CHARACTER_LIMIT;) {
                            var g = f.search(/[:!?.;]+/), e = "";
                            if (-1 == g || g >= a.CHARACTER_LIMIT)
                                g = f.search(/[,]+/);
                            -1 == g && -1 == f.search(" ") && (g = 99);
                            if (-1 == g || g >= a.CHARACTER_LIMIT)
                                for (var l = f.split(" "), g = 0; g < l.length && !(e.length + l[g].length + 1 > a.CHARACTER_LIMIT); g++)
                                    e += (0 != g ? " " : "") + l[g];
                            else
                                e = f.substr(0, g + 1);
                            f = f.substr(e.length, f.length - e.length);
                            k.push(e);
                        }
                        0 < f.length && k.push(f);
                    }
                    else
                        k.push(b);
                    a.multipartText = k;
                    null == c ? (g = a.default_rv, a.setDefaultVoice(g.name)) : g = a.getResponsiveVoice(c);
                    !0 === g.deprecated && console.warn("ResponsiveVoice: Voice " + g.name + " is deprecated and will be removed in future releases");
                    f = {};
                    if (null != g.mappedProfile)
                        f = g.mappedProfile;
                    else if (f.systemvoice = a.getMatchedVoice(g), f.collectionvoice = {}, null == f.systemvoice) {
                        console.log("RV: ERROR: No voice found for: " + c);
                        return;
                    }
                    a.msgprofile = f;
                    a.log("Voice picked: " + a.msgprofile.systemvoice.name);
                    a.utterances = [];
                    for (g = 0; g < k.length; g++)
                        if (!a.fallbackMode && a.getServiceEnabled(a.services.NATIVE_TTS))
                            a.log("Using SpeechSynthesis"), h = a.services.NATIVE_TTS, e = new SpeechSynthesisUtterance, e.voiceURI = f.systemvoice.voiceURI, e.volume = a.selectBest([f.collectionvoice.volume,
                                f.systemvoice.volume, 1
                            ]), e.rate = a.selectBest([a.iOS9plus ? 1 : null, f.collectionvoice.rate, f.systemvoice.rate, 1]), e.pitch = a.selectBest([f.collectionvoice.pitch, f.systemvoice.pitch, 1]), e.text = k[g], e.lang = a.selectBest([f.collectionvoice.lang, f.systemvoice.lang]), e.rvIndex = g, e.rvTotal = k.length, 0 == g && (e.onstart = a.speech_onstart), a.msgparameters.onendcalled = !1, null != d ? (e.voice = "undefined" !== typeof d.voice ? d.voice : f.systemvoice, g < k.length - 1 && 1 < k.length ? (e.onend = a.onPartEnd, e.hasOwnProperty("addEventListener") &&
                                e.addEventListener("end", a.onPartEnd)) : (e.onend = a.speech_onend, e.hasOwnProperty("addEventListener") && e.addEventListener("end", a.speech_onend)), e.onerror = d.onerror || function (b) {
                                a.log("RV: Unknow Error");
                                a.log(b);
                            }, e.onpause = d.onpause, e.onresume = d.onresume, e.onmark = d.onmark, e.onboundary = d.onboundary || a.onboundary, e.pitch = null != d.pitch ? d.pitch : e.pitch, e.rate = a.iOS ? (null != d.rate ? d.rate * d.rate : 1) * e.rate : (null != d.rate ? d.rate : 1) * e.rate, e.volume = null != d.volume ? d.volume : e.volume) : (a.log("No Params received for current Utterance"),
                                e.voice = f.systemvoice, e.onend = a.speech_onend, e.onboundary = a.onboundary, e.onerror = function (b) {
                                a.log("RV: Unknow Error");
                                a.log(b);
                            }), a.utterances.push(e), 0 == g && (a.currentMsg = e), console.log(e), a.tts_speak(e);
                        else if (a.fallbackMode && a.getServiceEnabled(a.services.FALLBACK_AUDIO)) {
                            h = a.services.FALLBACK_AUDIO;
                            a.fallback_playbackrate = a.def_fallback_playbackrate;
                            var e = a.selectBest([f.collectionvoice.pitch, f.systemvoice.pitch, 1]), l = a.selectBest([a.iOS9plus ? 1 : null, f.collectionvoice.rate, f.systemvoice.rate, 1]), m = a.selectBest([f.collectionvoice.volume, f.systemvoice.volume, 1]), n;
                            null != d && (e *= null != d.pitch ? d.pitch : 1, l *= null != d.rate ? d.rate : 1, m *= null != d.volume ? d.volume : 1, n = d.extraParams || null);
                            e /= 2;
                            l /= 2;
                            m *= 2;
                            e = Math.min(Math.max(e, 0), 1);
                            l = Math.min(Math.max(l, 0), 1);
                            m = Math.min(Math.max(m, 0), 1);
                            e = a.fallbackServicePath + "?t=" + encodeURIComponent(k[g]) + "&tl=" + (f.collectionvoice.lang || f.systemvoice.lang || "en-US") + "&sv=" + (f.collectionvoice.service || f.systemvoice.service || "") + "&vn=" + (f.collectionvoice.voicename || f.systemvoice.voicename ||
                                "") + "&pitch=" + e.toString() + "&rate=" + l.toString() + "&vol=" + m.toString();
                            n && (e += "&extraParams=" + JSON.stringify(n));
                            l = document.createElement("AUDIO");
                            l.src = e;
                            l.playbackRate = a.fallback_playbackrate;
                            l.preload = "auto";
                            l.load();
                            a.fallback_parts.push(l);
                        }
                    a.fallbackMode && a.getServiceEnabled(a.services.FALLBACK_AUDIO) && (a.fallback_part_index = 0, a.fallback_startPart());
                    a.log("Service used: " + h);
                }
            }
            else
                setTimeout(function () {
                    a.speak(b, c, d);
                }, 15);
        };
        a.startTimeout = function (b, c) {
            var d = a.msgprofile.collectionvoice.timerSpeed;
            null == a.msgprofile.collectionvoice.timerSpeed && (d = 1);
            0 >= d || (a.timeoutId = setTimeout(c, a.getEstimatedTimeLength(b, d)), a.log("Timeout ID: " + a.timeoutId));
        };
        a.checkAndCancelTimeout = function () {
            null != a.timeoutId && (clearTimeout(a.timeoutId), a.timeoutId = null);
        };
        a.speech_timedout = function () {
            a.cancel();
            a.cancelled = !1;
            a.speech_onend();
        };
        a.speech_onend = function () {
            a.checkAndCancelTimeout();
            !0 === a.cancelled ? a.cancelled = !1 : (a.log("on end fired"), null != a.msgparameters && null != a.msgparameters.onend && 1 != a.msgparameters.onendcalled &&
                (a.log("Speech on end called  -" + a.msgtext), a.msgparameters.onendcalled = !0, a.msgparameters.onend()));
        };
        a.speech_onstart = function () {
            if (!a.onstartFired) {
                a.onstartFired = !0;
                a.log("Speech start");
                if (a.iOS || a.is_safari || a.useTimer)
                    a.fallbackMode || a.startTimeout(a.msgtext, a.speech_timedout);
                a.msgparameters.onendcalled = !1;
                if (null != a.msgparameters && null != a.msgparameters.onstart)
                    a.msgparameters.onstart();
            }
        };
        a.fallback_startPart = function () {
            0 == a.fallback_part_index && a.speech_onstart();
            a.fallback_audio = a.fallback_parts[a.fallback_part_index];
            if (null == a.fallback_audio)
                a.log("RV: Fallback Audio is not available");
            else {
                var b = a.fallback_audio;
                a.fallback_audiopool.push(b);
                setTimeout(function () {
                    b.playbackRate = a.fallback_playbackrate;
                }, 50);
                b.onloadedmetadata = function () {
                    b.play();
                    b.playbackRate = a.fallback_playbackrate;
                };
                a.fallback_errors && (a.log("RV: Speech cancelled due to errors"), a.speech_onend());
                a.fallback_audio.play();
                a.fallback_audio.addEventListener("ended", a.fallback_finishPart);
                a.useTimer && a.startTimeout(a.multipartText[a.fallback_part_index], a.fallback_finishPart);
            }
        };
        a.isFallbackAudioPlaying = function () {
            var b;
            for (b = 0; b < a.fallback_audiopool.length; b++) {
                var c = a.fallback_audiopool[b];
                if (!c.paused && !c.ended && c.currentTime != c.duration)
                    return !0;
            }
            return !1;
        };
        a.fallback_finishPart = function (b) {
            a.isFallbackAudioPlaying() ? (a.checkAndCancelTimeout(), a.timeoutId = setTimeout(a.fallback_finishPart, 1E3 * (a.fallback_audio.duration - a.fallback_audio.currentTime))) : (a.checkAndCancelTimeout(), a.fallback_part_index < a.fallback_parts.length - 1 ? (a.fallback_part_index++,
                a.fallback_startPart()) : a.speech_onend());
        };
        a.cancel = function () {
            a.checkAndCancelTimeout();
            a.fallbackMode ? (null != a.fallback_audio && a.fallback_audio.pause(), a.clearFallbackPool()) : (a.cancelled = !0, speechSynthesis.cancel());
        };
        a.voiceSupport = function () {
            return "speechSynthesis" in window;
        };
        a.OnFinishedPlaying = function (b) {
            if (null != a.msgparameters && null != a.msgparameters.onend)
                a.msgparameters.onend();
        };
        a.setDefaultVoice = function (b) {
            if (a.rvsMapped) {
                var c = a.getResponsiveVoice(b);
                null != c && (a.default_rv = c);
            }
            else
                setTimeout(function () {
                    a.setDefaultVoice(b);
                }, 15);
        };
        a.mapRVs = function () {
            for (var b = 0; b < a.responsivevoices.length; b++)
                for (var c = a.responsivevoices[b], d = 0; d < c.voiceIDs.length; d++) {
                    var h = a.voicecollection[c.voiceIDs[d]];
                    if (1 != h.fallbackvoice) {
                        var k = a.getSystemVoice(h.name);
                        if (null != k) {
                            c.mappedProfile = {
                                systemvoice: k,
                                collectionvoice: h
                            };
                            break;
                        }
                    }
                    else {
                        c.mappedProfile = {
                            systemvoice: {},
                            collectionvoice: h
                        };
                        break;
                    }
                }
            a.rvsMapped = !0;
        };
        a.getMatchedVoice = function (b) {
            for (var c = 0; c < b.voiceIDs.length; c++) {
                var d = a.getSystemVoice(a.voicecollection[b.voiceIDs[c]].name);
                if (null !=
                    d)
                    return d;
            }
            return null;
        };
        a.getSystemVoice = function (b) {
            var c = String.fromCharCode(160);
            b = b.replace(new RegExp("\\s+|" + c, "g"), "");
            if ("undefined" === typeof a.systemvoices || null === a.systemvoices)
                return null;
            for (var d = 0; d < a.systemvoices.length; d++)
                if (0 === a.systemvoices[d].name.replace(new RegExp("\\s+|" + c, "g"), "").replace(/ *\([^)]*\) */g, "").localeCompare(b))
                    return a.systemvoices[d];
            return null;
        };
        a.getResponsiveVoice = function (b) {
            for (var c = 0; c < a.responsivevoices.length; c++)
                if (a.responsivevoices[c].name == b)
                    return !0 ===
                        a.responsivevoices[c].mappedProfile.collectionvoice.fallbackvoice || !0 === a.fallbackMode ? (a.fallbackMode = !0, a.fallback_parts = []) : a.fallbackMode = !1, a.responsivevoices[c];
            return null;
        };
        a.Dispatch = function (b) {
            if (a.hasOwnProperty(b + "_callbacks") && null != a[b + "_callbacks"] && 0 < a[b + "_callbacks"].length) {
                for (var c = a[b + "_callbacks"], d = 0; d < c.length; d++)
                    c[d]();
                return !0;
            }
            var h = b + "_callbacks_timeout", k = b + "_callbacks_timeoutCount";
            a.hasOwnProperty(h) || (a[k] = 10, a[h] = setInterval(function () {
                --a[k];
                (a.Dispatch(b) || 0 > a[k]) &&
                    clearTimeout(a[h]);
            }, 50));
            return !1;
        };
        a.AddEventListener = function (b, c) {
            a.hasOwnProperty(b + "_callbacks") || (a[b + "_callbacks"] = []);
            a[b + "_callbacks"].push(c);
        };
        a.addEventListener = a.AddEventListener;
        a.clickEvent = function () {
            if (a.iOS && !a.iOS_initialized) {
                a.log("Initializing iOS click event");
                var b = new SpeechSynthesisUtterance(" ");
                speechSynthesis.speak(b);
                a.iOS_initialized = !0;
            }
        };
        a.isPlaying = function () {
            return a.fallbackMode ? null != a.fallback_audio && !a.fallback_audio.ended && !a.fallback_audio.paused : speechSynthesis.speaking;
        };
        a.clearFallbackPool = function () {
            for (var b = 0; b < a.fallback_audiopool.length; b++)
                null != a.fallback_audiopool[b] && (a.fallback_audiopool[b].pause(), a.fallback_audiopool[b].src = "");
            a.fallback_audiopool = [];
        };
        "interactive" === document.readyState ? a.init() : document.addEventListener("DOMContentLoaded", function () {
            a.init();
        });
        a.selectBest = function (a) {
            for (var b = 0; b < a.length; b++)
                if (null != a[b])
                    return a[b];
            return null;
        };
        a.pause = function () {
            a.fallbackMode ? null != a.fallback_audio && a.fallback_audio.pause() : speechSynthesis.pause();
        };
        a.resume = function () {
            a.fallbackMode ? null != a.fallback_audio && a.fallback_audio.play() : speechSynthesis.resume();
        };
        a.tts_speak = function (b) {
            setTimeout(function () {
                a.cancelled = !1;
                speechSynthesis.speak(b);
            }, .01);
        };
        a.setVolume = function (b) {
            if (a.isPlaying())
                if (a.fallbackMode) {
                    for (var c = 0; c < a.fallback_parts.length; c++)
                        a.fallback_parts[c].volume = b;
                    for (c = 0; c < a.fallback_audiopool.length; c++)
                        a.fallback_audiopool[c].volume = b;
                    a.fallback_audio.volume = b;
                }
                else
                    for (c = 0; c < a.utterances.length; c++)
                        a.utterances[c].volume = b;
        };
        a.onPartEnd =
            function (b) {
                if (null != a.msgparameters && null != a.msgparameters.onchuckend)
                    a.msgparameters.onchuckend();
                a.Dispatch("OnPartEnd");
                b = a.utterances.indexOf(b.utterance);
                a.currentMsg = a.utterances[b + 1];
            };
        a.onboundary = function (b) {
            a.log("On Boundary");
            a.iOS && !a.onstartFired && a.speech_onstart();
        };
        a.numToWords = function (b) {
            function c(a) {
                if (Array.isArray(a)) {
                    for (var b = 0, c = Array(a.length); b < a.length; b++)
                        c[b] = a[b];
                    return c;
                }
                return Array.from(a);
            }
            var d = function () {
                return function (a, b) {
                    if (Array.isArray(a))
                        return a;
                    if (Symbol.iterator in
                        Object(a)) {
                        var c = [], d = !0, e = !1, f = void 0;
                        try {
                            for (var g = a[Symbol.iterator](), h; !(d = (h = g.next()).done) && (c.push(h.value), !b || c.length !== b); d = !0)
                                ;
                        }
                        catch (r) {
                            e = !0, f = r;
                        }
                        finally {
                            try {
                                if (!d && g["return"])
                                    g["return"]();
                            }
                            finally {
                                if (e)
                                    throw f;
                            }
                        }
                        return c;
                    }
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }(), h = function (a) {
                return 0 === a.length;
            }, k = function (a) {
                return function (b) {
                    return b.slice(0, a);
                };
            }, f = function (a) {
                return function (b) {
                    return b.slice(a);
                };
            }, g = function (a) {
                return a.slice(0).reverse();
            }, e = function (a) {
                return function (b) {
                    return function (c) {
                        return a(b(c));
                    };
                };
            }, l = function (a) {
                return !a;
            }, m = function q(a) {
                return function (b) {
                    return h(b) ? [] : [k(a)(b)].concat(c(q(a)(f(a)(b))));
                };
            }, n = " one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" "), p = "  twenty thirty forty fifty sixty seventy eighty ninety".split(" "), t = " thousand million billion trillion quadrillion quintillion sextillion septillion octillion nonillion".split(" "), u = function (a) {
                var b = d(a, 3);
                a = b[0];
                var c = b[1], b = b[2];
                return [0 === (Number(b) || 0) ? "" : n[b] + " hundred ", 0 === (Number(a) || 0) ? p[c] : p[c] && p[c] + " " || "", n[c + a] || n[a]].join("");
            }, v = function (a, b) {
                return "" === a ? a : a + " " + t[b];
            };
            return "number" === typeof b ? a.numToWords(String(b)) : "0" === b ? "zero" : e(m(3))(g)(Array.from(b)).map(u).map(v).filter(e(l)(h)).reverse().join(" ").trim();
        };
        a.getWords = function (b) {
            for (var c = b.split(/(\s*[\s,]\s*|\?|;|:|\.|\(|\)|!)/), c = c.filter(function (a) {
                return /[^\s]/.test(a);
            }), d = 0; d < c.length; d++)
                null !=
                    (b = c[d].toString().match(/\d+/)) && (c.splice(d, 1), a.numToWords(+b[0]).split(/\s+/).map(function (a) {
                    c.push(a);
                }));
            return c;
        };
        a.getEstimatedTimeLength = function (b, c) {
            var d = a.getWords(b), h = 0, k = a.fallbackMode ? 1300 : 700;
            c = c || 1;
            d.map(function (a, b) {
                h += (a.toString().match(/[^ ]/igm) || a).length;
            });
            var f = d.length, g = 60 / a.WORDS_PER_MINUTE * c * 1E3 * f;
            5 > f && (g = c * (k + 50 * h));
            a.log("Estimated time length: " + g + " ms, words: [" + d + "], charsCount: " + h);
            return g;
        };
        a.services = {
            NATIVE_TTS: 0,
            FALLBACK_AUDIO: 1
        };
        a.servicesPriority = [0, 1];
        a.servicesEnabled = [];
        a.setServiceEnabled = function (b, c) {
            a.servicesEnabled[b] = c;
        };
        a.getServiceEnabled = function (b) {
            return a.servicesEnabled[b] || !1;
        };
        a.setServiceEnabled(a.services.NATIVE_TTS, !0);
        a.setServiceEnabled(a.services.FALLBACK_AUDIO, !0);
    }, responsiveVoice = new ResponsiveVoice;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var ttsConfig = {
    pc: "p c gets the address of the next instruction",
    readAddress: "read the address of the next instruction from the instruction memory",
    drawControl: "control unit decides which control signals are asserted or deasserted",
    regDst: "register destination is asserted",
    jump: "jump is asserted",
    branch: "branch is asserted",
    memRead: "memory read is asserted",
    memToReg: "memory to register is asserted",
    memWrite: "memory write is asserted",
    aluSrc: "A L U source is asserted",
    regWrite: "register write is asserted",
    aluOp: "a l u op is specified",
    MuxToPC: "going back to program counter to get next instruction",
    add: "adding four bits to program counter",
    registers: " ",
    shiftLeft2: "shifting left two bits",
    dataMemory: "data Memory is cool",
    muxToWriteRegister: "",
    readData1: "value of register one is sent to A L U",
    readData2: "value two is sent to m u x",
    ALUcontrol: "A L U operation specified",
    aluBottom: "A L U performing operation on values",
    muxALU: "",
    muxALUtoALUBottom: "value is sent to A L U",
    ALUbottomToAddress: "A L U bottom to address",
    toMuxBottomRight: "",
    readDataToMuxBottomRight: "data read is sent to m u x",
    bottomRightMuxToWriteData: "value is sent to register",
    signExtendToMUX: "sign extended goes to m u x ",
    signExtendToShiftLeftBottom: "sign extend the immediate to thirty two bits",
    jumpAddress310: "jump destination determined",
    aluTop: "A L U performing operation on values"
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;var require;(function(f) {
    if (true) {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.listComponent = f()
    }
})(function() {
        var define, module, exports;
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var util = require('./util');
var Queue_1 = require('./Queue');
var BSTree = (function () {
    /**
     * Creates an empty binary search tree.
     * @class <p>A binary search tree is a binary tree in which each
     * internal node stores an element such that the elements stored in the
     * left subtree are less than it and the elements
     * stored in the right subtree are greater.</p>
     * <p>Formally, a binary search tree is a node-based binary tree data structure which
     * has the following properties:</p>
     * <ul>
     * <li>The left subtree of a node contains only nodes with elements less
     * than the node's element</li>
     * <li>The right subtree of a node contains only nodes with elements greater
     * than the node's element</li>
     * <li>Both the left and right subtrees must also be binary search trees.</li>
     * </ul>
     * <p>If the inserted elements are custom objects a compare function must
     * be provided at construction time, otherwise the <=, === and >= operators are
     * used to compare elements. Example:</p>
     * <pre>
     * function compare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return -1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return 1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     * @constructor
     * @param {function(Object,Object):number=} compareFunction optional
     * function used to compare two elements. Must return a negative integer,
     * zero, or a positive integer as the first argument is less than, equal to,
     * or greater than the second.
     */
    function BSTree(compareFunction) {
        this.root = null;
        this.compare = compareFunction || util.defaultCompare;
        this.nElements = 0;
    }
    /**
     * Adds the specified element to this tree if it is not already present.
     * @param {Object} element the element to insert.
     * @return {boolean} true if this tree did not already contain the specified element.
     */
    BSTree.prototype.add = function (element) {
        if (util.isUndefined(element)) {
            return false;
        }
        if (this.insertNode(this.createNode(element)) !== null) {
            this.nElements++;
            return true;
        }
        return false;
    };
    /**
     * Removes all of the elements from this tree.
     */
    BSTree.prototype.clear = function () {
        this.root = null;
        this.nElements = 0;
    };
    /**
     * Returns true if this tree contains no elements.
     * @return {boolean} true if this tree contains no elements.
     */
    BSTree.prototype.isEmpty = function () {
        return this.nElements === 0;
    };
    /**
     * Returns the number of elements in this tree.
     * @return {number} the number of elements in this tree.
     */
    BSTree.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this tree contains the specified element.
     * @param {Object} element element to search for.
     * @return {boolean} true if this tree contains the specified element,
     * false otherwise.
     */
    BSTree.prototype.contains = function (element) {
        if (util.isUndefined(element)) {
            return false;
        }
        return this.searchNode(this.root, element) !== null;
    };
    /**
     * Removes the specified element from this tree if it is present.
     * @return {boolean} true if this tree contained the specified element.
     */
    BSTree.prototype.remove = function (element) {
        var node = this.searchNode(this.root, element);
        if (node === null) {
            return false;
        }
        this.removeNode(node);
        this.nElements--;
        return true;
    };
    /**
     * Executes the provided function once for each element present in this tree in
     * in-order.
     * @param {function(Object):*} callback function to execute, it is invoked with one
     * argument: the element value, to break the iteration you can optionally return false.
     */
    BSTree.prototype.inorderTraversal = function (callback) {
        this.inorderTraversalAux(this.root, callback, {
            stop: false
        });
    };
    /**
     * Executes the provided function once for each element present in this tree in pre-order.
     * @param {function(Object):*} callback function to execute, it is invoked with one
     * argument: the element value, to break the iteration you can optionally return false.
     */
    BSTree.prototype.preorderTraversal = function (callback) {
        this.preorderTraversalAux(this.root, callback, {
            stop: false
        });
    };
    /**
     * Executes the provided function once for each element present in this tree in post-order.
     * @param {function(Object):*} callback function to execute, it is invoked with one
     * argument: the element value, to break the iteration you can optionally return false.
     */
    BSTree.prototype.postorderTraversal = function (callback) {
        this.postorderTraversalAux(this.root, callback, {
            stop: false
        });
    };
    /**
     * Executes the provided function once for each element present in this tree in
     * level-order.
     * @param {function(Object):*} callback function to execute, it is invoked with one
     * argument: the element value, to break the iteration you can optionally return false.
     */
    BSTree.prototype.levelTraversal = function (callback) {
        this.levelTraversalAux(this.root, callback);
    };
    /**
     * Returns the minimum element of this tree.
     * @return {*} the minimum element of this tree or undefined if this tree is
     * is empty.
     */
    BSTree.prototype.minimum = function () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.minimumAux(this.root).element;
    };
    /**
     * Returns the maximum element of this tree.
     * @return {*} the maximum element of this tree or undefined if this tree is
     * is empty.
     */
    BSTree.prototype.maximum = function () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.maximumAux(this.root).element;
    };
    /**
     * Executes the provided function once for each element present in this tree in inorder.
     * Equivalent to inorderTraversal.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    BSTree.prototype.forEach = function (callback) {
        this.inorderTraversal(callback);
    };
    /**
     * Returns an array containing all of the elements in this tree in in-order.
     * @return {Array} an array containing all of the elements in this tree in in-order.
     */
    BSTree.prototype.toArray = function () {
        var array = [];
        this.inorderTraversal(function (element) {
            array.push(element);
            return true;
        });
        return array;
    };
    /**
     * Returns the height of this tree.
     * @return {number} the height of this tree or -1 if is empty.
     */
    BSTree.prototype.height = function () {
        return this.heightAux(this.root);
    };
    /**
    * @private
    */
    BSTree.prototype.searchNode = function (node, element) {
        var cmp = null;
        while (node !== null && cmp !== 0) {
            cmp = this.compare(element, node.element);
            if (cmp < 0) {
                node = node.leftCh;
            }
            else if (cmp > 0) {
                node = node.rightCh;
            }
        }
        return node;
    };
    /**
    * @private
    */
    BSTree.prototype.transplant = function (n1, n2) {
        if (n1.parent === null) {
            this.root = n2;
        }
        else if (n1 === n1.parent.leftCh) {
            n1.parent.leftCh = n2;
        }
        else {
            n1.parent.rightCh = n2;
        }
        if (n2 !== null) {
            n2.parent = n1.parent;
        }
    };
    /**
    * @private
    */
    BSTree.prototype.removeNode = function (node) {
        if (node.leftCh === null) {
            this.transplant(node, node.rightCh);
        }
        else if (node.rightCh === null) {
            this.transplant(node, node.leftCh);
        }
        else {
            var y = this.minimumAux(node.rightCh);
            if (y.parent !== node) {
                this.transplant(y, y.rightCh);
                y.rightCh = node.rightCh;
                y.rightCh.parent = y;
            }
            this.transplant(node, y);
            y.leftCh = node.leftCh;
            y.leftCh.parent = y;
        }
    };
    /**
    * @private
    */
    BSTree.prototype.inorderTraversalAux = function (node, callback, signal) {
        if (node === null || signal.stop) {
            return;
        }
        this.inorderTraversalAux(node.leftCh, callback, signal);
        if (signal.stop) {
            return;
        }
        signal.stop = callback(node.element) === false;
        if (signal.stop) {
            return;
        }
        this.inorderTraversalAux(node.rightCh, callback, signal);
    };
    /**
    * @private
    */
    BSTree.prototype.levelTraversalAux = function (node, callback) {
        var queue = new Queue_1.default();
        if (node !== null) {
            queue.enqueue(node);
        }
        while (!queue.isEmpty()) {
            node = queue.dequeue();
            if (callback(node.element) === false) {
                return;
            }
            if (node.leftCh !== null) {
                queue.enqueue(node.leftCh);
            }
            if (node.rightCh !== null) {
                queue.enqueue(node.rightCh);
            }
        }
    };
    /**
    * @private
    */
    BSTree.prototype.preorderTraversalAux = function (node, callback, signal) {
        if (node === null || signal.stop) {
            return;
        }
        signal.stop = callback(node.element) === false;
        if (signal.stop) {
            return;
        }
        this.preorderTraversalAux(node.leftCh, callback, signal);
        if (signal.stop) {
            return;
        }
        this.preorderTraversalAux(node.rightCh, callback, signal);
    };
    /**
    * @private
    */
    BSTree.prototype.postorderTraversalAux = function (node, callback, signal) {
        if (node === null || signal.stop) {
            return;
        }
        this.postorderTraversalAux(node.leftCh, callback, signal);
        if (signal.stop) {
            return;
        }
        this.postorderTraversalAux(node.rightCh, callback, signal);
        if (signal.stop) {
            return;
        }
        signal.stop = callback(node.element) === false;
    };
    /**
    * @private
    */
    BSTree.prototype.minimumAux = function (node) {
        while (node.leftCh !== null) {
            node = node.leftCh;
        }
        return node;
    };
    /**
    * @private
    */
    BSTree.prototype.maximumAux = function (node) {
        while (node.rightCh !== null) {
            node = node.rightCh;
        }
        return node;
    };
    /**
      * @private
      */
    BSTree.prototype.heightAux = function (node) {
        if (node === null) {
            return -1;
        }
        return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
    };
    /*
    * @private
    */
    BSTree.prototype.insertNode = function (node) {
        var parent = null;
        var position = this.root;
        var cmp = null;
        while (position !== null) {
            cmp = this.compare(node.element, position.element);
            if (cmp === 0) {
                return null;
            }
            else if (cmp < 0) {
                parent = position;
                position = position.leftCh;
            }
            else {
                parent = position;
                position = position.rightCh;
            }
        }
        node.parent = parent;
        if (parent === null) {
            // tree is empty
            this.root = node;
        }
        else if (this.compare(node.element, parent.element) < 0) {
            parent.leftCh = node;
        }
        else {
            parent.rightCh = node;
        }
        return node;
    };
    /**
    * @private
    */
    BSTree.prototype.createNode = function (element) {
        return {
            element: element,
            leftCh: null,
            rightCh: null,
            parent: null
        };
    };
    return BSTree;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BSTree;

},{"./Queue":11,"./util":15}],2:[function(require,module,exports){
"use strict";
var util = require('./util');
var Dictionary_1 = require('./Dictionary');
var Set_1 = require('./Set');
var Bag = (function () {
    /**
     * Creates an empty bag.
     * @class <p>A bag is a special kind of set in which members are
     * allowed to appear more than once.</p>
     * <p>If the inserted elements are custom objects a function
     * which converts elements to unique strings must be provided. Example:</p>
     *
     * <pre>
     * function petToString(pet) {
     *  return pet.name;
     * }
     * </pre>
     *
     * @constructor
     * @param {function(Object):string=} toStrFunction optional function used
     * to convert elements to strings. If the elements aren't strings or if toString()
     * is not appropriate, a custom function which receives an object and returns a
     * unique string must be provided.
     */
    function Bag(toStrFunction) {
        this.toStrF = toStrFunction || util.defaultToString;
        this.dictionary = new Dictionary_1.default(this.toStrF);
        this.nElements = 0;
    }
    /**
    * Adds nCopies of the specified object to this bag.
    * @param {Object} element element to add.
    * @param {number=} nCopies the number of copies to add, if this argument is
    * undefined 1 copy is added.
    * @return {boolean} true unless element is undefined.
    */
    Bag.prototype.add = function (element, nCopies) {
        if (nCopies === void 0) { nCopies = 1; }
        if (util.isUndefined(element) || nCopies <= 0) {
            return false;
        }
        if (!this.contains(element)) {
            var node = {
                value: element,
                copies: nCopies
            };
            this.dictionary.setValue(element, node);
        }
        else {
            this.dictionary.getValue(element).copies += nCopies;
        }
        this.nElements += nCopies;
        return true;
    };
    /**
    * Counts the number of copies of the specified object in this bag.
    * @param {Object} element the object to search for..
    * @return {number} the number of copies of the object, 0 if not found
    */
    Bag.prototype.count = function (element) {
        if (!this.contains(element)) {
            return 0;
        }
        else {
            return this.dictionary.getValue(element).copies;
        }
    };
    /**
     * Returns true if this bag contains the specified element.
     * @param {Object} element element to search for.
     * @return {boolean} true if this bag contains the specified element,
     * false otherwise.
     */
    Bag.prototype.contains = function (element) {
        return this.dictionary.containsKey(element);
    };
    /**
    * Removes nCopies of the specified object to this bag.
    * If the number of copies to remove is greater than the actual number
    * of copies in the Bag, all copies are removed.
    * @param {Object} element element to remove.
    * @param {number=} nCopies the number of copies to remove, if this argument is
    * undefined 1 copy is removed.
    * @return {boolean} true if at least 1 element was removed.
    */
    Bag.prototype.remove = function (element, nCopies) {
        if (nCopies === void 0) { nCopies = 1; }
        if (util.isUndefined(element) || nCopies <= 0) {
            return false;
        }
        if (!this.contains(element)) {
            return false;
        }
        else {
            var node = this.dictionary.getValue(element);
            if (nCopies > node.copies) {
                this.nElements -= node.copies;
            }
            else {
                this.nElements -= nCopies;
            }
            node.copies -= nCopies;
            if (node.copies <= 0) {
                this.dictionary.remove(element);
            }
            return true;
        }
    };
    /**
     * Returns an array containing all of the elements in this big in arbitrary order,
     * including multiple copies.
     * @return {Array} an array containing all of the elements in this bag.
     */
    Bag.prototype.toArray = function () {
        var a = [];
        var values = this.dictionary.values();
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var node = values_1[_i];
            var element = node.value;
            var copies = node.copies;
            for (var j = 0; j < copies; j++) {
                a.push(element);
            }
        }
        return a;
    };
    /**
     * Returns a set of unique elements in this bag.
     * @return {collections.Set<T>} a set of unique elements in this bag.
     */
    Bag.prototype.toSet = function () {
        var toret = new Set_1.default(this.toStrF);
        var elements = this.dictionary.values();
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var ele = elements_1[_i];
            var value = ele.value;
            toret.add(value);
        }
        return toret;
    };
    /**
     * Executes the provided function once for each element
     * present in this bag, including multiple copies.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element. To break the iteration you can
     * optionally return false.
     */
    Bag.prototype.forEach = function (callback) {
        this.dictionary.forEach(function (k, v) {
            var value = v.value;
            var copies = v.copies;
            for (var i = 0; i < copies; i++) {
                if (callback(value) === false) {
                    return false;
                }
            }
            return true;
        });
    };
    /**
     * Returns the number of elements in this bag.
     * @return {number} the number of elements in this bag.
     */
    Bag.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this bag contains no elements.
     * @return {boolean} true if this bag contains no elements.
     */
    Bag.prototype.isEmpty = function () {
        return this.nElements === 0;
    };
    /**
     * Removes all of the elements from this bag.
     */
    Bag.prototype.clear = function () {
        this.nElements = 0;
        this.dictionary.clear();
    };
    return Bag;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Bag; // End of bag

},{"./Dictionary":3,"./Set":12,"./util":15}],3:[function(require,module,exports){
"use strict";
var util = require('./util');
var Dictionary = (function () {
    /**
     * Creates an empty dictionary.
     * @class <p>Dictionaries map keys to values; each key can map to at most one value.
     * This implementation accepts any kind of objects as keys.</p>
     *
     * <p>If the keys are custom objects a function which converts keys to unique
     * strings must be provided. Example:</p>
     * <pre>
     * function petToString(pet) {
     *  return pet.name;
     * }
     * </pre>
     * @constructor
     * @param {function(Object):string=} toStrFunction optional function used
     * to convert keys to strings. If the keys aren't strings or if toString()
     * is not appropriate, a custom function which receives a key and returns a
     * unique string must be provided.
     */
    function Dictionary(toStrFunction) {
        this.table = {};
        this.nElements = 0;
        this.toStr = toStrFunction || util.defaultToString;
    }
    /**
     * Returns the value to which this dictionary maps the specified key.
     * Returns undefined if this dictionary contains no mapping for this key.
     * @param {Object} key key whose associated value is to be returned.
     * @return {*} the value to which this dictionary maps the specified key or
     * undefined if the map contains no mapping for this key.
     */
    Dictionary.prototype.getValue = function (key) {
        var pair = this.table['$' + this.toStr(key)];
        if (util.isUndefined(pair)) {
            return undefined;
        }
        return pair.value;
    };
    /**
     * Associates the specified value with the specified key in this dictionary.
     * If the dictionary previously contained a mapping for this key, the old
     * value is replaced by the specified value.
     * @param {Object} key key with which the specified value is to be
     * associated.
     * @param {Object} value value to be associated with the specified key.
     * @return {*} previous value associated with the specified key, or undefined if
     * there was no mapping for the key or if the key/value are undefined.
     */
    Dictionary.prototype.setValue = function (key, value) {
        if (util.isUndefined(key) || util.isUndefined(value)) {
            return undefined;
        }
        var ret;
        var k = '$' + this.toStr(key);
        var previousElement = this.table[k];
        if (util.isUndefined(previousElement)) {
            this.nElements++;
            ret = undefined;
        }
        else {
            ret = previousElement.value;
        }
        this.table[k] = {
            key: key,
            value: value
        };
        return ret;
    };
    /**
     * Removes the mapping for this key from this dictionary if it is present.
     * @param {Object} key key whose mapping is to be removed from the
     * dictionary.
     * @return {*} previous value associated with specified key, or undefined if
     * there was no mapping for key.
     */
    Dictionary.prototype.remove = function (key) {
        var k = '$' + this.toStr(key);
        var previousElement = this.table[k];
        if (!util.isUndefined(previousElement)) {
            delete this.table[k];
            this.nElements--;
            return previousElement.value;
        }
        return undefined;
    };
    /**
     * Returns an array containing all of the keys in this dictionary.
     * @return {Array} an array containing all of the keys in this dictionary.
     */
    Dictionary.prototype.keys = function () {
        var array = [];
        for (var name_1 in this.table) {
            if (util.has(this.table, name_1)) {
                var pair = this.table[name_1];
                array.push(pair.key);
            }
        }
        return array;
    };
    /**
     * Returns an array containing all of the values in this dictionary.
     * @return {Array} an array containing all of the values in this dictionary.
     */
    Dictionary.prototype.values = function () {
        var array = [];
        for (var name_2 in this.table) {
            if (util.has(this.table, name_2)) {
                var pair = this.table[name_2];
                array.push(pair.value);
            }
        }
        return array;
    };
    /**
    * Executes the provided function once for each key-value pair
    * present in this dictionary.
    * @param {function(Object,Object):*} callback function to execute, it is
    * invoked with two arguments: key and value. To break the iteration you can
    * optionally return false.
    */
    Dictionary.prototype.forEach = function (callback) {
        for (var name_3 in this.table) {
            if (util.has(this.table, name_3)) {
                var pair = this.table[name_3];
                var ret = callback(pair.key, pair.value);
                if (ret === false) {
                    return;
                }
            }
        }
    };
    /**
     * Returns true if this dictionary contains a mapping for the specified key.
     * @param {Object} key key whose presence in this dictionary is to be
     * tested.
     * @return {boolean} true if this dictionary contains a mapping for the
     * specified key.
     */
    Dictionary.prototype.containsKey = function (key) {
        return !util.isUndefined(this.getValue(key));
    };
    /**
    * Removes all mappings from this dictionary.
    * @this {collections.Dictionary}
    */
    Dictionary.prototype.clear = function () {
        this.table = {};
        this.nElements = 0;
    };
    /**
     * Returns the number of keys in this dictionary.
     * @return {number} the number of key-value mappings in this dictionary.
     */
    Dictionary.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this dictionary contains no mappings.
     * @return {boolean} true if this dictionary contains no mappings.
     */
    Dictionary.prototype.isEmpty = function () {
        return this.nElements <= 0;
    };
    Dictionary.prototype.toString = function () {
        var toret = '{';
        this.forEach(function (k, v) {
            toret += "\n\t" + k + " : " + v;
        });
        return toret + '\n}';
    };
    return Dictionary;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dictionary; // End of dictionary

},{"./util":15}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dictionary_1 = require('./Dictionary');
var util = require('./util');
var FactoryDictionary = (function (_super) {
    __extends(FactoryDictionary, _super);
    /**
     * Creates an empty dictionary.
     * @class <p>Dictionaries map keys to values; each key can map to at most one value.
     * This implementation accepts any kind of objects as keys.</p>
     *
     * <p>The default factory function should return a new object of the provided
     * type. Example:</p>
     * <pre>
     * function petFactory() {
     *  return new Pet();
     * }
     * </pre>
     *
     * <p>If the keys are custom objects a function which converts keys to unique
     * strings must be provided. Example:</p>
     * <pre>
     * function petToString(pet) {
     *  return pet.name;
     * }
     * </pre>
     * @constructor
     * @param {function():V=} defaultFactoryFunction function used to create a
     * default object.
     * @param {function(Object):string=} toStrFunction optional function used
     * to convert keys to strings. If the keys aren't strings or if toString()
     * is not appropriate, a custom function which receives a key and returns a
     * unique string must be provided.
     */
    function FactoryDictionary(defaultFactoryFunction, toStrFunction) {
        _super.call(this, toStrFunction);
        this.defaultFactoryFunction = defaultFactoryFunction;
    }
    /**
     * Associates the specified default value with the specified key in this dictionary,
     * if it didn't contain the key yet. If the key existed, the existing value will be used.
     * @param {Object} key key with which the specified value is to be
     * associated.
     * @param {Object} defaultValue default value to be associated with the specified key.
     * @return {*} previous value associated with the specified key, or the default value,
     * if the key didn't exist yet.
     */
    FactoryDictionary.prototype.setDefault = function (key, defaultValue) {
        var currentValue = _super.prototype.getValue.call(this, key);
        if (util.isUndefined(currentValue)) {
            this.setValue(key, defaultValue);
            return defaultValue;
        }
        return currentValue;
    };
    /**
     * Returns the value to which this dictionary maps the specified key.
     * Returns a default value created by the factory passed in the constructor,
     * if this dictionary contains no mapping for this key. The missing key will
     * automatically be added to the dictionary.
     * @param {Object} key key whose associated value is to be returned.
     * @return {*} the value to which this dictionary maps the specified key or
     * a default value if the map contains no mapping for this key.
     */
    FactoryDictionary.prototype.getValue = function (key) {
        return this.setDefault(key, this.defaultFactoryFunction());
    };
    return FactoryDictionary;
}(Dictionary_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FactoryDictionary;

},{"./Dictionary":3,"./util":15}],5:[function(require,module,exports){
"use strict";
var collections = require('./util');
var arrays = require('./arrays');
var Heap = (function () {
    /**
     * Creates an empty Heap.
     * @class
     * <p>A heap is a binary tree, where the nodes maintain the heap property:
     * each node is smaller than each of its children and therefore a MinHeap
     * This implementation uses an array to store elements.</p>
     * <p>If the inserted elements are custom objects a compare function must be provided,
     *  at construction time, otherwise the <=, === and >= operators are
     * used to compare elements. Example:</p>
     *
     * <pre>
     * function compare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return -1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return 1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     *
     * <p>If a Max-Heap is wanted (greater elements on top) you can a provide a
     * reverse compare function to accomplish that behavior. Example:</p>
     *
     * <pre>
     * function reverseCompare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return 1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return -1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     *
     * @constructor
     * @param {function(Object,Object):number=} compareFunction optional
     * function used to compare two elements. Must return a negative integer,
     * zero, or a positive integer as the first argument is less than, equal to,
     * or greater than the second.
     */
    function Heap(compareFunction) {
        /**
         * Array used to store the elements od the heap.
         * @type {Array.<Object>}
         * @private
         */
        this.data = [];
        this.compare = compareFunction || collections.defaultCompare;
    }
    /**
     * Returns the index of the left child of the node at the given index.
     * @param {number} nodeIndex The index of the node to get the left child
     * for.
     * @return {number} The index of the left child.
     * @private
     */
    Heap.prototype.leftChildIndex = function (nodeIndex) {
        return (2 * nodeIndex) + 1;
    };
    /**
     * Returns the index of the right child of the node at the given index.
     * @param {number} nodeIndex The index of the node to get the right child
     * for.
     * @return {number} The index of the right child.
     * @private
     */
    Heap.prototype.rightChildIndex = function (nodeIndex) {
        return (2 * nodeIndex) + 2;
    };
    /**
     * Returns the index of the parent of the node at the given index.
     * @param {number} nodeIndex The index of the node to get the parent for.
     * @return {number} The index of the parent.
     * @private
     */
    Heap.prototype.parentIndex = function (nodeIndex) {
        return Math.floor((nodeIndex - 1) / 2);
    };
    /**
     * Returns the index of the smaller child node (if it exists).
     * @param {number} leftChild left child index.
     * @param {number} rightChild right child index.
     * @return {number} the index with the minimum value or -1 if it doesn't
     * exists.
     * @private
     */
    Heap.prototype.minIndex = function (leftChild, rightChild) {
        if (rightChild >= this.data.length) {
            if (leftChild >= this.data.length) {
                return -1;
            }
            else {
                return leftChild;
            }
        }
        else {
            if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                return leftChild;
            }
            else {
                return rightChild;
            }
        }
    };
    /**
     * Moves the node at the given index up to its proper place in the heap.
     * @param {number} index The index of the node to move up.
     * @private
     */
    Heap.prototype.siftUp = function (index) {
        var parent = this.parentIndex(index);
        while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
            arrays.swap(this.data, parent, index);
            index = parent;
            parent = this.parentIndex(index);
        }
    };
    /**
     * Moves the node at the given index down to its proper place in the heap.
     * @param {number} nodeIndex The index of the node to move down.
     * @private
     */
    Heap.prototype.siftDown = function (nodeIndex) {
        //smaller child index
        var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
        while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
            arrays.swap(this.data, min, nodeIndex);
            nodeIndex = min;
            min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
        }
    };
    /**
     * Retrieves but does not remove the root element of this heap.
     * @return {*} The value at the root of the heap. Returns undefined if the
     * heap is empty.
     */
    Heap.prototype.peek = function () {
        if (this.data.length > 0) {
            return this.data[0];
        }
        else {
            return undefined;
        }
    };
    /**
     * Adds the given element into the heap.
     * @param {*} element the element.
     * @return true if the element was added or fals if it is undefined.
     */
    Heap.prototype.add = function (element) {
        if (collections.isUndefined(element)) {
            return undefined;
        }
        this.data.push(element);
        this.siftUp(this.data.length - 1);
        return true;
    };
    /**
     * Retrieves and removes the root element of this heap.
     * @return {*} The value removed from the root of the heap. Returns
     * undefined if the heap is empty.
     */
    Heap.prototype.removeRoot = function () {
        if (this.data.length > 0) {
            var obj = this.data[0];
            this.data[0] = this.data[this.data.length - 1];
            this.data.splice(this.data.length - 1, 1);
            if (this.data.length > 0) {
                this.siftDown(0);
            }
            return obj;
        }
        return undefined;
    };
    /**
     * Returns true if this heap contains the specified element.
     * @param {Object} element element to search for.
     * @return {boolean} true if this Heap contains the specified element, false
     * otherwise.
     */
    Heap.prototype.contains = function (element) {
        var equF = collections.compareToEquals(this.compare);
        return arrays.contains(this.data, element, equF);
    };
    /**
     * Returns the number of elements in this heap.
     * @return {number} the number of elements in this heap.
     */
    Heap.prototype.size = function () {
        return this.data.length;
    };
    /**
     * Checks if this heap is empty.
     * @return {boolean} true if and only if this heap contains no items; false
     * otherwise.
     */
    Heap.prototype.isEmpty = function () {
        return this.data.length <= 0;
    };
    /**
     * Removes all of the elements from this heap.
     */
    Heap.prototype.clear = function () {
        this.data.length = 0;
    };
    /**
     * Executes the provided function once for each element present in this heap in
     * no particular order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    Heap.prototype.forEach = function (callback) {
        arrays.forEach(this.data, callback);
    };
    return Heap;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Heap;

},{"./arrays":14,"./util":15}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dictionary_1 = require('./Dictionary');
var util = require('./util');
/**
 * This class is used by the LinkedDictionary Internally
 * Has to be a class, not an interface, because it needs to have
 * the 'unlink' function defined.
 */
var LinkedDictionaryPair = (function () {
    function LinkedDictionaryPair(key, value) {
        this.key = key;
        this.value = value;
    }
    LinkedDictionaryPair.prototype.unlink = function () {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    };
    return LinkedDictionaryPair;
}());
var LinkedDictionary = (function (_super) {
    __extends(LinkedDictionary, _super);
    function LinkedDictionary(toStrFunction) {
        _super.call(this, toStrFunction);
        this.head = new LinkedDictionaryPair(null, null);
        this.tail = new LinkedDictionaryPair(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    /**
     * Inserts the new node to the 'tail' of the list, updating the
     * neighbors, and moving 'this.tail' (the End of List indicator) that
     * to the end.
     */
    LinkedDictionary.prototype.appendToTail = function (entry) {
        var lastNode = this.tail.prev;
        lastNode.next = entry;
        entry.prev = lastNode;
        entry.next = this.tail;
        this.tail.prev = entry;
    };
    /**
     * Retrieves a linked dictionary from the table internally
     */
    LinkedDictionary.prototype.getLinkedDictionaryPair = function (key) {
        if (util.isUndefined(key)) {
            return undefined;
        }
        var k = '$' + this.toStr(key);
        var pair = (this.table[k]);
        return pair;
    };
    /**
     * Returns the value to which this dictionary maps the specified key.
     * Returns undefined if this dictionary contains no mapping for this key.
     * @param {Object} key key whose associated value is to be returned.
     * @return {*} the value to which this dictionary maps the specified key or
     * undefined if the map contains no mapping for this key.
     */
    LinkedDictionary.prototype.getValue = function (key) {
        var pair = this.getLinkedDictionaryPair(key);
        if (!util.isUndefined(pair)) {
            return pair.value;
        }
        return undefined;
    };
    /**
     * Removes the mapping for this key from this dictionary if it is present.
     * Also, if a value is present for this key, the entry is removed from the
     * insertion ordering.
     * @param {Object} key key whose mapping is to be removed from the
     * dictionary.
     * @return {*} previous value associated with specified key, or undefined if
     * there was no mapping for key.
     */
    LinkedDictionary.prototype.remove = function (key) {
        var pair = this.getLinkedDictionaryPair(key);
        if (!util.isUndefined(pair)) {
            _super.prototype.remove.call(this, key); // This will remove it from the table
            pair.unlink(); // This will unlink it from the chain
            return pair.value;
        }
        return undefined;
    };
    /**
    * Removes all mappings from this LinkedDictionary.
    * @this {collections.LinkedDictionary}
    */
    LinkedDictionary.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    };
    /**
     * Internal function used when updating an existing KeyValue pair.
     * It places the new value indexed by key into the table, but maintains
     * its place in the linked ordering.
     */
    LinkedDictionary.prototype.replace = function (oldPair, newPair) {
        var k = '$' + this.toStr(newPair.key);
        // set the new Pair's links to existingPair's links
        newPair.next = oldPair.next;
        newPair.prev = oldPair.prev;
        // Delete Existing Pair from the table, unlink it from chain.
        // As a result, the nElements gets decremented by this operation
        this.remove(oldPair.key);
        // Link new Pair in place of where oldPair was,
        // by pointing the old pair's neighbors to it.
        newPair.prev.next = newPair;
        newPair.next.prev = newPair;
        this.table[k] = newPair;
        // To make up for the fact that the number of elements was decremented,
        // We need to increase it by one.
        ++this.nElements;
    };
    /**
     * Associates the specified value with the specified key in this dictionary.
     * If the dictionary previously contained a mapping for this key, the old
     * value is replaced by the specified value.
     * Updating of a key that already exists maintains its place in the
     * insertion order into the map.
     * @param {Object} key key with which the specified value is to be
     * associated.
     * @param {Object} value value to be associated with the specified key.
     * @return {*} previous value associated with the specified key, or undefined if
     * there was no mapping for the key or if the key/value are undefined.
     */
    LinkedDictionary.prototype.setValue = function (key, value) {
        if (util.isUndefined(key) || util.isUndefined(value)) {
            return undefined;
        }
        var existingPair = this.getLinkedDictionaryPair(key);
        var newPair = new LinkedDictionaryPair(key, value);
        var k = '$' + this.toStr(key);
        // If there is already an element for that key, we
        // keep it's place in the LinkedList
        if (!util.isUndefined(existingPair)) {
            this.replace(existingPair, newPair);
            return existingPair.value;
        }
        else {
            this.appendToTail(newPair);
            this.table[k] = newPair;
            ++this.nElements;
            return undefined;
        }
    };
    /**
     * Returns an array containing all of the keys in this LinkedDictionary, ordered
     * by insertion order.
     * @return {Array} an array containing all of the keys in this LinkedDictionary,
     * ordered by insertion order.
     */
    LinkedDictionary.prototype.keys = function () {
        var array = [];
        this.forEach(function (key, value) {
            array.push(key);
        });
        return array;
    };
    /**
     * Returns an array containing all of the values in this LinkedDictionary, ordered by
     * insertion order.
     * @return {Array} an array containing all of the values in this LinkedDictionary,
     * ordered by insertion order.
     */
    LinkedDictionary.prototype.values = function () {
        var array = [];
        this.forEach(function (key, value) {
            array.push(value);
        });
        return array;
    };
    /**
    * Executes the provided function once for each key-value pair
    * present in this LinkedDictionary. It is done in the order of insertion
    * into the LinkedDictionary
    * @param {function(Object,Object):*} callback function to execute, it is
    * invoked with two arguments: key and value. To break the iteration you can
    * optionally return false.
    */
    LinkedDictionary.prototype.forEach = function (callback) {
        var crawlNode = this.head.next;
        while (crawlNode.next != null) {
            var ret = callback(crawlNode.key, crawlNode.value);
            if (ret === false) {
                return;
            }
            crawlNode = crawlNode.next;
        }
    };
    return LinkedDictionary;
}(Dictionary_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LinkedDictionary; // End of LinkedDictionary
// /**
//  * Returns true if this dictionary is equal to the given dictionary.
//  * Two dictionaries are equal if they contain the same mappings.
//  * @param {collections.Dictionary} other the other dictionary.
//  * @param {function(Object,Object):boolean=} valuesEqualFunction optional
//  * function used to check if two values are equal.
//  * @return {boolean} true if this dictionary is equal to the given dictionary.
//  */
// collections.Dictionary.prototype.equals = function(other,valuesEqualFunction) {
// 	const eqF = valuesEqualFunction || collections.defaultEquals;
// 	if(!(other instanceof collections.Dictionary)){
// 		return false;
// 	}
// 	if(this.size() !== other.size()){
// 		return false;
// 	}
// 	return this.equalsAux(this.firstNode,other.firstNode,eqF);
// }

},{"./Dictionary":3,"./util":15}],7:[function(require,module,exports){
"use strict";
var util = require('./util');
var arrays = require('./arrays');
var LinkedList = (function () {
    /**
    * Creates an empty Linked List.
    * @class A linked list is a data structure consisting of a group of nodes
    * which together represent a sequence.
    * @constructor
    */
    function LinkedList() {
        /**
        * First node in the list
        * @type {Object}
        * @private
        */
        this.firstNode = null;
        /**
        * Last node in the list
        * @type {Object}
        * @private
        */
        this.lastNode = null;
        /**
        * Number of elements in the list
        * @type {number}
        * @private
        */
        this.nElements = 0;
    }
    /**
    * Adds an element to this list.
    * @param {Object} item element to be added.
    * @param {number=} index optional index to add the element. If no index is specified
    * the element is added to the end of this list.
    * @return {boolean} true if the element was added or false if the index is invalid
    * or if the element is undefined.
    */
    LinkedList.prototype.add = function (item, index) {
        if (util.isUndefined(index)) {
            index = this.nElements;
        }
        if (index < 0 || index > this.nElements || util.isUndefined(item)) {
            return false;
        }
        var newNode = this.createNode(item);
        if (this.nElements === 0) {
            // First node in the list.
            this.firstNode = newNode;
            this.lastNode = newNode;
        }
        else if (index === this.nElements) {
            // Insert at the end.
            this.lastNode.next = newNode;
            this.lastNode = newNode;
        }
        else if (index === 0) {
            // Change first node.
            newNode.next = this.firstNode;
            this.firstNode = newNode;
        }
        else {
            var prev = this.nodeAtIndex(index - 1);
            newNode.next = prev.next;
            prev.next = newNode;
        }
        this.nElements++;
        return true;
    };
    /**
    * Returns the first element in this list.
    * @return {*} the first element of the list or undefined if the list is
    * empty.
    */
    LinkedList.prototype.first = function () {
        if (this.firstNode !== null) {
            return this.firstNode.element;
        }
        return undefined;
    };
    /**
    * Returns the last element in this list.
    * @return {*} the last element in the list or undefined if the list is
    * empty.
    */
    LinkedList.prototype.last = function () {
        if (this.lastNode !== null) {
            return this.lastNode.element;
        }
        return undefined;
    };
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index desired index.
     * @return {*} the element at the given index or undefined if the index is
     * out of bounds.
     */
    LinkedList.prototype.elementAtIndex = function (index) {
        var node = this.nodeAtIndex(index);
        if (node === null) {
            return undefined;
        }
        return node.element;
    };
    /**
     * Returns the index in this list of the first occurrence of the
     * specified element, or -1 if the List does not contain this element.
     * <p>If the elements inside this list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {number} the index in this list of the first occurrence
     * of the specified element, or -1 if this list does not contain the
     * element.
     */
    LinkedList.prototype.indexOf = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (util.isUndefined(item)) {
            return -1;
        }
        var currentNode = this.firstNode;
        var index = 0;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                return index;
            }
            index++;
            currentNode = currentNode.next;
        }
        return -1;
    };
    /**
       * Returns true if this list contains the specified element.
       * <p>If the elements inside the list are
       * not comparable with the === operator a custom equals function should be
       * provided to perform searches, the function must receive two arguments and
       * return true if they are equal, false otherwise. Example:</p>
       *
       * <pre>
       * const petsAreEqualByName = function(pet1, pet2) {
       *  return pet1.name === pet2.name;
       * }
       * </pre>
       * @param {Object} item element to search for.
       * @param {function(Object,Object):boolean=} equalsFunction Optional
       * function used to check if two elements are equal.
       * @return {boolean} true if this list contains the specified element, false
       * otherwise.
       */
    LinkedList.prototype.contains = function (item, equalsFunction) {
        return (this.indexOf(item, equalsFunction) >= 0);
    };
    /**
     * Removes the first occurrence of the specified element in this list.
     * <p>If the elements inside the list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to be removed from this list, if present.
     * @return {boolean} true if the list contained the specified element.
     */
    LinkedList.prototype.remove = function (item, equalsFunction) {
        var equalsF = equalsFunction || util.defaultEquals;
        if (this.nElements < 1 || util.isUndefined(item)) {
            return false;
        }
        var previous = null;
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (equalsF(currentNode.element, item)) {
                if (currentNode === this.firstNode) {
                    this.firstNode = this.firstNode.next;
                    if (currentNode === this.lastNode) {
                        this.lastNode = null;
                    }
                }
                else if (currentNode === this.lastNode) {
                    this.lastNode = previous;
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                else {
                    previous.next = currentNode.next;
                    currentNode.next = null;
                }
                this.nElements--;
                return true;
            }
            previous = currentNode;
            currentNode = currentNode.next;
        }
        return false;
    };
    /**
     * Removes all of the elements from this list.
     */
    LinkedList.prototype.clear = function () {
        this.firstNode = null;
        this.lastNode = null;
        this.nElements = 0;
    };
    /**
     * Returns true if this list is equal to the given list.
     * Two lists are equal if they have the same elements in the same order.
     * @param {LinkedList} other the other list.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function used to check if two elements are equal. If the elements in the lists
     * are custom objects you should provide a function, otherwise
     * the === operator is used to check equality between elements.
     * @return {boolean} true if this list is equal to the given list.
     */
    LinkedList.prototype.equals = function (other, equalsFunction) {
        var eqF = equalsFunction || util.defaultEquals;
        if (!(other instanceof LinkedList)) {
            return false;
        }
        if (this.size() !== other.size()) {
            return false;
        }
        return this.equalsAux(this.firstNode, other.firstNode, eqF);
    };
    /**
    * @private
    */
    LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
        while (n1 !== null) {
            if (!eqF(n1.element, n2.element)) {
                return false;
            }
            n1 = n1.next;
            n2 = n2.next;
        }
        return true;
    };
    /**
     * Removes the element at the specified position in this list.
     * @param {number} index given index.
     * @return {*} removed element or undefined if the index is out of bounds.
     */
    LinkedList.prototype.removeElementAtIndex = function (index) {
        if (index < 0 || index >= this.nElements) {
            return undefined;
        }
        var element;
        if (this.nElements === 1) {
            //First node in the list.
            element = this.firstNode.element;
            this.firstNode = null;
            this.lastNode = null;
        }
        else {
            var previous = this.nodeAtIndex(index - 1);
            if (previous === null) {
                element = this.firstNode.element;
                this.firstNode = this.firstNode.next;
            }
            else if (previous.next === this.lastNode) {
                element = this.lastNode.element;
                this.lastNode = previous;
            }
            if (previous !== null) {
                element = previous.next.element;
                previous.next = previous.next.next;
            }
        }
        this.nElements--;
        return element;
    };
    /**
     * Executes the provided function once for each element present in this list in order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    LinkedList.prototype.forEach = function (callback) {
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            if (callback(currentNode.element) === false) {
                break;
            }
            currentNode = currentNode.next;
        }
    };
    /**
     * Reverses the order of the elements in this linked list (makes the last
     * element first, and the first element last).
     */
    LinkedList.prototype.reverse = function () {
        var previous = null;
        var current = this.firstNode;
        var temp = null;
        while (current !== null) {
            temp = current.next;
            current.next = previous;
            previous = current;
            current = temp;
        }
        temp = this.firstNode;
        this.firstNode = this.lastNode;
        this.lastNode = temp;
    };
    /**
     * Returns an array containing all of the elements in this list in proper
     * sequence.
     * @return {Array.<*>} an array containing all of the elements in this list,
     * in proper sequence.
     */
    LinkedList.prototype.toArray = function () {
        var array = [];
        var currentNode = this.firstNode;
        while (currentNode !== null) {
            array.push(currentNode.element);
            currentNode = currentNode.next;
        }
        return array;
    };
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list.
     */
    LinkedList.prototype.size = function () {
        return this.nElements;
    };
    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements.
     */
    LinkedList.prototype.isEmpty = function () {
        return this.nElements <= 0;
    };
    LinkedList.prototype.toString = function () {
        return arrays.toString(this.toArray());
    };
    /**
     * @private
     */
    LinkedList.prototype.nodeAtIndex = function (index) {
        if (index < 0 || index >= this.nElements) {
            return null;
        }
        if (index === (this.nElements - 1)) {
            return this.lastNode;
        }
        var node = this.firstNode;
        for (var i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    };
    /**
     * @private
     */
    LinkedList.prototype.createNode = function (item) {
        return {
            element: item,
            next: null
        };
    };
    return LinkedList;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LinkedList; // End of linked list

},{"./arrays":14,"./util":15}],8:[function(require,module,exports){
"use strict";
var util = require('./util');
var Dictionary_1 = require('./Dictionary');
var arrays = require('./arrays');
var MultiDictionary = (function () {
    /**
     * Creates an empty multi dictionary.
     * @class <p>A multi dictionary is a special kind of dictionary that holds
     * multiple values against each key. Setting a value into the dictionary will
     * add the value to an array at that key. Getting a key will return an array,
     * holding all the values set to that key.
     * You can configure to allow duplicates in the values.
     * This implementation accepts any kind of objects as keys.</p>
     *
     * <p>If the keys are custom objects a function which converts keys to strings must be
     * provided. Example:</p>
     *
     * <pre>
     * function petToString(pet) {
       *  return pet.name;
       * }
     * </pre>
     * <p>If the values are custom objects a function to check equality between values
     * must be provided. Example:</p>
     *
     * <pre>
     * function petsAreEqualByAge(pet1,pet2) {
       *  return pet1.age===pet2.age;
       * }
     * </pre>
     * @constructor
     * @param {function(Object):string=} toStrFunction optional function
     * to convert keys to strings. If the keys aren't strings or if toString()
     * is not appropriate, a custom function which receives a key and returns a
     * unique string must be provided.
     * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
     * function to check if two values are equal.
     *
     * @param allowDuplicateValues
     */
    function MultiDictionary(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
        if (allowDuplicateValues === void 0) { allowDuplicateValues = false; }
        this.dict = new Dictionary_1.default(toStrFunction);
        this.equalsF = valuesEqualsFunction || util.defaultEquals;
        this.allowDuplicate = allowDuplicateValues;
    }
    /**
    * Returns an array holding the values to which this dictionary maps
    * the specified key.
    * Returns an empty array if this dictionary contains no mappings for this key.
    * @param {Object} key key whose associated values are to be returned.
    * @return {Array} an array holding the values to which this dictionary maps
    * the specified key.
    */
    MultiDictionary.prototype.getValue = function (key) {
        var values = this.dict.getValue(key);
        if (util.isUndefined(values)) {
            return [];
        }
        return arrays.copy(values);
    };
    /**
     * Adds the value to the array associated with the specified key, if
     * it is not already present.
     * @param {Object} key key with which the specified value is to be
     * associated.
     * @param {Object} value the value to add to the array at the key
     * @return {boolean} true if the value was not already associated with that key.
     */
    MultiDictionary.prototype.setValue = function (key, value) {
        if (util.isUndefined(key) || util.isUndefined(value)) {
            return false;
        }
        if (!this.containsKey(key)) {
            this.dict.setValue(key, [value]);
            return true;
        }
        var array = this.dict.getValue(key);
        if (!this.allowDuplicate) {
            if (arrays.contains(array, value, this.equalsF)) {
                return false;
            }
        }
        array.push(value);
        return true;
    };
    /**
     * Removes the specified values from the array of values associated with the
     * specified key. If a value isn't given, all values associated with the specified
     * key are removed.
     * @param {Object} key key whose mapping is to be removed from the
     * dictionary.
     * @param {Object=} value optional argument to specify the value to remove
     * from the array associated with the specified key.
     * @return {*} true if the dictionary changed, false if the key doesn't exist or
     * if the specified value isn't associated with the specified key.
     */
    MultiDictionary.prototype.remove = function (key, value) {
        if (util.isUndefined(value)) {
            var v = this.dict.remove(key);
            return !util.isUndefined(v);
        }
        var array = this.dict.getValue(key);
        if (arrays.remove(array, value, this.equalsF)) {
            if (array.length === 0) {
                this.dict.remove(key);
            }
            return true;
        }
        return false;
    };
    /**
     * Returns an array containing all of the keys in this dictionary.
     * @return {Array} an array containing all of the keys in this dictionary.
     */
    MultiDictionary.prototype.keys = function () {
        return this.dict.keys();
    };
    /**
     * Returns an array containing all of the values in this dictionary.
     * @return {Array} an array containing all of the values in this dictionary.
     */
    MultiDictionary.prototype.values = function () {
        var values = this.dict.values();
        var array = [];
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var v = values_1[_i];
            for (var _a = 0, v_1 = v; _a < v_1.length; _a++) {
                var w = v_1[_a];
                array.push(w);
            }
        }
        return array;
    };
    /**
     * Returns true if this dictionary at least one value associatted the specified key.
     * @param {Object} key key whose presence in this dictionary is to be
     * tested.
     * @return {boolean} true if this dictionary at least one value associatted
     * the specified key.
     */
    MultiDictionary.prototype.containsKey = function (key) {
        return this.dict.containsKey(key);
    };
    /**
     * Removes all mappings from this dictionary.
     */
    MultiDictionary.prototype.clear = function () {
        this.dict.clear();
    };
    /**
     * Returns the number of keys in this dictionary.
     * @return {number} the number of key-value mappings in this dictionary.
     */
    MultiDictionary.prototype.size = function () {
        return this.dict.size();
    };
    /**
     * Returns true if this dictionary contains no mappings.
     * @return {boolean} true if this dictionary contains no mappings.
     */
    MultiDictionary.prototype.isEmpty = function () {
        return this.dict.isEmpty();
    };
    return MultiDictionary;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MultiDictionary; // end of multi dictionary

},{"./Dictionary":3,"./arrays":14,"./util":15}],9:[function(require,module,exports){
"use strict";
var Direction;
(function (Direction) {
    Direction[Direction["BEFORE"] = 0] = "BEFORE";
    Direction[Direction["AFTER"] = 1] = "AFTER";
    Direction[Direction["INSIDE_AT_END"] = 2] = "INSIDE_AT_END";
    Direction[Direction["INSIDE_AT_START"] = 3] = "INSIDE_AT_START";
})(Direction || (Direction = {}));
var MultiRootTree = (function () {
    function MultiRootTree(rootIds, nodes) {
        if (rootIds === void 0) { rootIds = []; }
        if (nodes === void 0) { nodes = {}; }
        this.rootIds = rootIds;
        this.nodes = nodes;
        this.initRootIds();
        this.initNodes();
    }
    MultiRootTree.prototype.initRootIds = function () {
        for (var _i = 0, _a = this.rootIds; _i < _a.length; _i++) {
            var rootId = _a[_i];
            this.createEmptyNodeIfNotExist(rootId);
        }
    };
    MultiRootTree.prototype.initNodes = function () {
        for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                for (var _i = 0, _a = this.nodes[nodeKey]; _i < _a.length; _i++) {
                    var nodeListItem = _a[_i];
                    this.createEmptyNodeIfNotExist(nodeListItem);
                }
            }
        }
    };
    MultiRootTree.prototype.createEmptyNodeIfNotExist = function (nodeKey) {
        if (!this.nodes[nodeKey]) {
            this.nodes[nodeKey] = [];
        }
    };
    MultiRootTree.prototype.getRootIds = function () {
        var clone = this.rootIds.slice();
        return clone;
    };
    MultiRootTree.prototype.getNodes = function () {
        var clone = {};
        for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                clone[nodeKey] = this.nodes[nodeKey].slice();
            }
        }
        return clone;
    };
    MultiRootTree.prototype.getObject = function () {
        return {
            rootIds: this.getRootIds(),
            nodes: this.getNodes(),
        };
    };
    MultiRootTree.prototype.toObject = function () {
        return this.getObject();
    };
    MultiRootTree.prototype.flatten = function () {
        var _this = this;
        var extraPropsObject = [];
        for (var i = 0; i < this.rootIds.length; i++) {
            var rootId = this.rootIds[i];
            extraPropsObject.push({
                id: rootId,
                level: 0,
                hasParent: false,
                childrenCount: undefined,
            });
            traverse(rootId, this.nodes, extraPropsObject, 0);
        }
        for (var _i = 0, extraPropsObject_1 = extraPropsObject; _i < extraPropsObject_1.length; _i++) {
            var o = extraPropsObject_1[_i];
            o.childrenCount = countChildren(o.id);
        }
        return extraPropsObject;
        function countChildren(id) {
            if (!_this.nodes[id]) {
                return 0;
            }
            else {
                var childrenCount = _this.nodes[id].length;
                return childrenCount;
            }
        }
        function traverse(startId, nodes, returnArray, level) {
            if (level === void 0) { level = 0; }
            if (!startId || !nodes || !returnArray || !nodes[startId]) {
                return;
            }
            level++;
            var idsList = nodes[startId];
            for (var i = 0; i < idsList.length; i++) {
                var id = idsList[i];
                returnArray.push({ id: id, level: level, hasParent: true });
                traverse(id, nodes, returnArray, level);
            }
            level--;
        }
    };
    MultiRootTree.prototype.moveIdBeforeId = function (moveId, beforeId) {
        return this.moveId(moveId, beforeId, Direction.BEFORE);
    };
    MultiRootTree.prototype.moveIdAfterId = function (moveId, afterId) {
        return this.moveId(moveId, afterId, Direction.AFTER);
    };
    MultiRootTree.prototype.moveIdIntoId = function (moveId, insideId, atStart) {
        if (atStart === void 0) { atStart = true; }
        if (atStart) {
            return this.moveId(moveId, insideId, Direction.INSIDE_AT_START);
        }
        else {
            return this.moveId(moveId, insideId, Direction.INSIDE_AT_END);
        }
    };
    MultiRootTree.prototype.swapRootIdWithRootId = function (rootId, withRootId) {
        var leftIndex = this.findRootId(rootId);
        var rightIndex = this.findRootId(withRootId);
        this.swapRootPositionWithRootPosition(leftIndex, rightIndex);
    };
    MultiRootTree.prototype.swapRootPositionWithRootPosition = function (swapRootPosition, withRootPosition) {
        var temp = this.rootIds[withRootPosition];
        this.rootIds[withRootPosition] = this.rootIds[swapRootPosition];
        this.rootIds[swapRootPosition] = temp;
    };
    MultiRootTree.prototype.deleteId = function (id) {
        this.rootDeleteId(id);
        this.nodeAndSubNodesDelete(id);
        this.nodeRefrencesDelete(id);
    };
    MultiRootTree.prototype.insertIdBeforeId = function (beforeId, insertId) {
        var foundRootIdIndex = this.findRootId(beforeId);
        if (foundRootIdIndex > -1) {
            this.insertIdIntoRoot(insertId, foundRootIdIndex);
        }
        for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                var foundNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                if (foundNodeIdIndex > -1) {
                    this.insertIdIntoNode(nodeKey, insertId, foundNodeIdIndex);
                }
            }
        }
    };
    MultiRootTree.prototype.insertIdAfterId = function (belowId, insertId) {
        var foundRootIdIndex = this.findRootId(belowId);
        if (foundRootIdIndex > -1) {
            this.insertIdIntoRoot(insertId, foundRootIdIndex + 1);
        }
        for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                var foundNodeIdIndex = this.findNodeId(nodeKey, belowId);
                if (foundNodeIdIndex > -1) {
                    this.insertIdIntoNode(nodeKey, insertId, foundNodeIdIndex + 1);
                }
            }
        }
    };
    MultiRootTree.prototype.insertIdIntoId = function (insideId, insertId) {
        this.nodeInsertAtEnd(insideId, insertId);
        this.nodes[insertId] = [];
    };
    MultiRootTree.prototype.insertIdIntoRoot = function (id, position) {
        if (position === undefined) {
            this.rootInsertAtEnd(id);
        }
        else {
            if (position < 0) {
                var length_1 = this.rootIds.length;
                this.rootIds.splice((position + length_1 + 1), 0, id);
            }
            else {
                this.rootIds.splice(position, 0, id);
            }
        }
        this.nodes[id] = this.nodes[id] || [];
    };
    MultiRootTree.prototype.insertIdIntoNode = function (nodeKey, id, position) {
        this.nodes[nodeKey] = this.nodes[nodeKey] || [];
        this.nodes[id] = this.nodes[id] || [];
        if (position === undefined) {
            this.nodeInsertAtEnd(nodeKey, id);
        }
        else {
            if (position < 0) {
                var length_2 = this.nodes[nodeKey].length;
                this.nodes[nodeKey].splice((position + length_2 + 1), 0, id);
            }
            else {
                this.nodes[nodeKey].splice(position, 0, id);
            }
        }
    };
    MultiRootTree.prototype.moveId = function (moveId, beforeId, direction) {
        var sourceId = moveId;
        var sourceRootIndex = this.findRootId(sourceId);
        var sourceNodeKey;
        var sourceNodeIdIndex;
        if (this.nodes[beforeId]) {
            sourceNodeKey = beforeId;
        }
        for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                sourceNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                break;
            }
        }
        // got all
        var targetId = beforeId;
        var targetRootIndex = this.findRootId(targetId);
        var targetNodeKey;
        var targetNodeIdIndex;
        if (this.nodes[beforeId]) {
            targetNodeKey = beforeId;
        }
        for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                targetNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                break;
            }
        }
        // got all
        if (sourceRootIndex > -1) {
            if (targetRootIndex > -1) {
                // moving root to root
                // console.log(`Moving ROOT to ROOT`);
                // console.log(`RootIds:`);
                // console.log(this.rootIds);
                // console.log(`TargetIndex=${targetRootIndex}, SourceIndex=${sourceRootIndex}`);
                // console.log(`TargetId=${targetId}, SourceId=${sourceId}`);
                this.rootDelete(sourceRootIndex); // indexes change now
                if (targetRootIndex > sourceRootIndex) {
                    targetRootIndex--;
                }
                else {
                }
                switch (direction) {
                    case Direction.BEFORE:
                        this.insertIdIntoRoot(sourceId, targetRootIndex);
                        break;
                    case Direction.AFTER:
                        this.insertIdIntoRoot(sourceId, targetRootIndex + 1);
                        break;
                    case Direction.INSIDE_AT_START:
                        this.nodeInsertAtStart(targetId, sourceId);
                        break;
                    case Direction.INSIDE_AT_END:
                        this.nodeInsertAtEnd(targetId, sourceId);
                        break;
                }
            }
            else {
                // moving root (source) ABOVE node (target)
                // will remove one entry from roots
                this.rootDelete(sourceRootIndex);
                for (var nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        var index = this.findNodeId(nodeKey, targetId);
                        if (index > -1) {
                            switch (direction) {
                                case Direction.BEFORE:
                                    this.insertIdIntoNode(nodeKey, sourceId, index);
                                    break;
                                case Direction.AFTER:
                                    this.insertIdIntoNode(nodeKey, sourceId, index + 1);
                                    break;
                                case Direction.INSIDE_AT_START:
                                    this.nodeInsertAtStart(targetId, sourceId);
                                    break;
                                case Direction.INSIDE_AT_END:
                                    this.nodeInsertAtEnd(targetId, sourceId);
                                    break;
                            }
                            break;
                        }
                    }
                }
            }
        }
        else {
            if (targetRootIndex > -1) {
                // moving node (source) ABOVE root (target)
                // delete source id from each node
                for (var nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        var index = this.findNodeId(nodeKey, sourceId);
                        if (index > -1) {
                            // this.nodeInsertId(nodeKey, sourceId, index);
                            this.nodeDeleteAtIndex(nodeKey, index);
                            break;
                        }
                    }
                }
                switch (direction) {
                    case Direction.BEFORE:
                        this.insertIdIntoRoot(sourceId, targetRootIndex);
                        break;
                    case Direction.AFTER:
                        this.insertIdIntoRoot(sourceId, targetRootIndex + 1);
                        break;
                    case Direction.INSIDE_AT_START:
                        this.nodeInsertAtStart(targetId, sourceId);
                        break;
                    case Direction.INSIDE_AT_END:
                        this.nodeInsertAtEnd(targetId, sourceId);
                        break;
                }
            }
            else {
                // moving node (source) ABOVE node (target)
                // delete source id from each node
                for (var nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        var index = this.findNodeId(nodeKey, sourceId);
                        if (index > -1) {
                            this.nodeDeleteAtIndex(nodeKey, index);
                            break;
                        }
                    }
                }
                for (var nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        var index = this.findNodeId(nodeKey, targetId);
                        if (index > -1) {
                            switch (direction) {
                                case Direction.BEFORE:
                                    this.insertIdIntoNode(nodeKey, sourceId, index);
                                    break;
                                case Direction.AFTER:
                                    this.insertIdIntoNode(nodeKey, sourceId, index + 1);
                                    break;
                                case Direction.INSIDE_AT_START:
                                    this.nodeInsertAtStart(targetId, sourceId);
                                    break;
                                case Direction.INSIDE_AT_END:
                                    this.nodeInsertAtEnd(targetId, sourceId);
                                    break;
                            }
                            break;
                        }
                    }
                }
            }
        }
    };
    MultiRootTree.prototype.swapArrayElements = function (arr, indexA, indexB) {
        var temp = arr[indexA];
        arr[indexA] = arr[indexB];
        arr[indexB] = temp;
        return arr;
    };
    ;
    MultiRootTree.prototype.rootDeleteId = function (id) {
        var index = this.findRootId(id);
        if (index > -1) {
            this.rootDelete(index);
        }
    };
    MultiRootTree.prototype.nodeAndSubNodesDelete = function (nodeKey) {
        var toDeleteLater = [];
        for (var i = 0; i < this.nodes[nodeKey].length; i++) {
            var id = this.nodes[nodeKey][i];
            this.nodeAndSubNodesDelete(id);
            toDeleteLater.push(nodeKey);
        }
        this.nodeDelete(nodeKey);
        for (var i = 0; i < toDeleteLater.length; i++) {
            this.nodeDelete(toDeleteLater[i]);
        }
    };
    MultiRootTree.prototype.nodeRefrencesDelete = function (id) {
        for (var nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                for (var i = 0; i < this.nodes[nodeKey].length; i++) {
                    var targetId = this.nodes[nodeKey][i];
                    if (targetId === id) {
                        this.nodeDeleteAtIndex(nodeKey, i);
                    }
                }
            }
        }
    };
    MultiRootTree.prototype.nodeDelete = function (nodeKey) {
        delete this.nodes[nodeKey];
    };
    MultiRootTree.prototype.findRootId = function (id) {
        return this.rootIds.indexOf(id);
    };
    MultiRootTree.prototype.findNodeId = function (nodeKey, id) {
        return this.nodes[nodeKey].indexOf(id);
    };
    MultiRootTree.prototype.findNode = function (nodeKey) {
        return this.nodes[nodeKey];
    };
    MultiRootTree.prototype.nodeInsertAtStart = function (nodeKey, id) {
        this.nodes[nodeKey].unshift(id);
    };
    MultiRootTree.prototype.nodeInsertAtEnd = function (nodeKey, id) {
        this.nodes[nodeKey].push(id);
    };
    MultiRootTree.prototype.rootDelete = function (index) {
        this.rootIds.splice(index, 1);
    };
    MultiRootTree.prototype.nodeDeleteAtIndex = function (nodeKey, index) {
        this.nodes[nodeKey].splice(index, 1);
    };
    MultiRootTree.prototype.rootInsertAtStart = function (id) {
        this.rootIds.unshift(id);
    };
    MultiRootTree.prototype.rootInsertAtEnd = function (id) {
        this.rootIds.push(id);
    };
    return MultiRootTree;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MultiRootTree;

},{}],10:[function(require,module,exports){
"use strict";
var util = require('./util');
var Heap_1 = require('./Heap');
var PriorityQueue = (function () {
    /**
     * Creates an empty priority queue.
     * @class <p>In a priority queue each element is associated with a "priority",
     * elements are dequeued in highest-priority-first order (the elements with the
     * highest priority are dequeued first). Priority Queues are implemented as heaps.
     * If the inserted elements are custom objects a compare function must be provided,
     * otherwise the <=, === and >= operators are used to compare object priority.</p>
     * <pre>
     * function compare(a, b) {
     *  if (a is less than b by some ordering criterion) {
     *     return -1;
     *  } if (a is greater than b by the ordering criterion) {
     *     return 1;
     *  }
     *  // a must be equal to b
     *  return 0;
     * }
     * </pre>
     * @constructor
     * @param {function(Object,Object):number=} compareFunction optional
     * function used to compare two element priorities. Must return a negative integer,
     * zero, or a positive integer as the first argument is less than, equal to,
     * or greater than the second.
     */
    function PriorityQueue(compareFunction) {
        this.heap = new Heap_1.default(util.reverseCompareFunction(compareFunction));
    }
    /**
     * Inserts the specified element into this priority queue.
     * @param {Object} element the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    PriorityQueue.prototype.enqueue = function (element) {
        return this.heap.add(element);
    };
    /**
     * Inserts the specified element into this priority queue.
     * @param {Object} element the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    PriorityQueue.prototype.add = function (element) {
        return this.heap.add(element);
    };
    /**
     * Retrieves and removes the highest priority element of this queue.
     * @return {*} the the highest priority element of this queue,
     *  or undefined if this queue is empty.
     */
    PriorityQueue.prototype.dequeue = function () {
        if (this.heap.size() !== 0) {
            var el = this.heap.peek();
            this.heap.removeRoot();
            return el;
        }
        return undefined;
    };
    /**
     * Retrieves, but does not remove, the highest priority element of this queue.
     * @return {*} the highest priority element of this queue, or undefined if this queue is empty.
     */
    PriorityQueue.prototype.peek = function () {
        return this.heap.peek();
    };
    /**
     * Returns true if this priority queue contains the specified element.
     * @param {Object} element element to search for.
     * @return {boolean} true if this priority queue contains the specified element,
     * false otherwise.
     */
    PriorityQueue.prototype.contains = function (element) {
        return this.heap.contains(element);
    };
    /**
     * Checks if this priority queue is empty.
     * @return {boolean} true if and only if this priority queue contains no items; false
     * otherwise.
     */
    PriorityQueue.prototype.isEmpty = function () {
        return this.heap.isEmpty();
    };
    /**
     * Returns the number of elements in this priority queue.
     * @return {number} the number of elements in this priority queue.
     */
    PriorityQueue.prototype.size = function () {
        return this.heap.size();
    };
    /**
     * Removes all of the elements from this priority queue.
     */
    PriorityQueue.prototype.clear = function () {
        this.heap.clear();
    };
    /**
     * Executes the provided function once for each element present in this queue in
     * no particular order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    PriorityQueue.prototype.forEach = function (callback) {
        this.heap.forEach(callback);
    };
    return PriorityQueue;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PriorityQueue; // end of priority queue

},{"./Heap":5,"./util":15}],11:[function(require,module,exports){
"use strict";
var LinkedList_1 = require('./LinkedList');
var Queue = (function () {
    /**
     * Creates an empty queue.
     * @class A queue is a First-In-First-Out (FIFO) data structure, the first
     * element added to the queue will be the first one to be removed. This
     * implementation uses a linked list as a container.
     * @constructor
     */
    function Queue() {
        this.list = new LinkedList_1.default();
    }
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.enqueue = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Inserts the specified element into the end of this queue.
     * @param {Object} elem the element to insert.
     * @return {boolean} true if the element was inserted, or false if it is undefined.
     */
    Queue.prototype.add = function (elem) {
        return this.list.add(elem);
    };
    /**
     * Retrieves and removes the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.dequeue = function () {
        if (this.list.size() !== 0) {
            var el = this.list.first();
            this.list.removeElementAtIndex(0);
            return el;
        }
        return undefined;
    };
    /**
     * Retrieves, but does not remove, the head of this queue.
     * @return {*} the head of this queue, or undefined if this queue is empty.
     */
    Queue.prototype.peek = function () {
        if (this.list.size() !== 0) {
            return this.list.first();
        }
        return undefined;
    };
    /**
     * Returns the number of elements in this queue.
     * @return {number} the number of elements in this queue.
     */
    Queue.prototype.size = function () {
        return this.list.size();
    };
    /**
     * Returns true if this queue contains the specified element.
     * <p>If the elements inside this stack are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName (pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} elem element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function to check if two elements are equal.
     * @return {boolean} true if this queue contains the specified element,
     * false otherwise.
     */
    Queue.prototype.contains = function (elem, equalsFunction) {
        return this.list.contains(elem, equalsFunction);
    };
    /**
     * Checks if this queue is empty.
     * @return {boolean} true if and only if this queue contains no items; false
     * otherwise.
     */
    Queue.prototype.isEmpty = function () {
        return this.list.size() <= 0;
    };
    /**
     * Removes all of the elements from this queue.
     */
    Queue.prototype.clear = function () {
        this.list.clear();
    };
    /**
     * Executes the provided function once for each element present in this queue in
     * FIFO order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    Queue.prototype.forEach = function (callback) {
        this.list.forEach(callback);
    };
    return Queue;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Queue; // End of queue

},{"./LinkedList":7}],12:[function(require,module,exports){
"use strict";
var util = require('./util');
var arrays = require('./arrays');
var Dictionary_1 = require('./Dictionary');
var Set = (function () {
    /**
     * Creates an empty set.
     * @class <p>A set is a data structure that contains no duplicate items.</p>
     * <p>If the inserted elements are custom objects a function
     * which converts elements to strings must be provided. Example:</p>
     *
     * <pre>
     * function petToString(pet) {
     *  return pet.name;
     * }
     * </pre>
     *
     * @constructor
     * @param {function(Object):string=} toStringFunction optional function used
     * to convert elements to strings. If the elements aren't strings or if toString()
     * is not appropriate, a custom function which receives a onject and returns a
     * unique string must be provided.
     */
    function Set(toStringFunction) {
        this.dictionary = new Dictionary_1.default(toStringFunction);
    }
    /**
     * Returns true if this set contains the specified element.
     * @param {Object} element element to search for.
     * @return {boolean} true if this set contains the specified element,
     * false otherwise.
     */
    Set.prototype.contains = function (element) {
        return this.dictionary.containsKey(element);
    };
    /**
     * Adds the specified element to this set if it is not already present.
     * @param {Object} element the element to insert.
     * @return {boolean} true if this set did not already contain the specified element.
     */
    Set.prototype.add = function (element) {
        if (this.contains(element) || util.isUndefined(element)) {
            return false;
        }
        else {
            this.dictionary.setValue(element, element);
            return true;
        }
    };
    /**
     * Performs an intersecion between this an another set.
     * Removes all values that are not present this set and the given set.
     * @param {collections.Set} otherSet other set.
     */
    Set.prototype.intersection = function (otherSet) {
        var set = this;
        this.forEach(function (element) {
            if (!otherSet.contains(element)) {
                set.remove(element);
            }
            return true;
        });
    };
    /**
     * Performs a union between this an another set.
     * Adds all values from the given set to this set.
     * @param {collections.Set} otherSet other set.
     */
    Set.prototype.union = function (otherSet) {
        var set = this;
        otherSet.forEach(function (element) {
            set.add(element);
            return true;
        });
    };
    /**
     * Performs a difference between this an another set.
     * Removes from this set all the values that are present in the given set.
     * @param {collections.Set} otherSet other set.
     */
    Set.prototype.difference = function (otherSet) {
        var set = this;
        otherSet.forEach(function (element) {
            set.remove(element);
            return true;
        });
    };
    /**
     * Checks whether the given set contains all the elements in this set.
     * @param {collections.Set} otherSet other set.
     * @return {boolean} true if this set is a subset of the given set.
     */
    Set.prototype.isSubsetOf = function (otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        }
        var isSub = true;
        this.forEach(function (element) {
            if (!otherSet.contains(element)) {
                isSub = false;
                return false;
            }
            return true;
        });
        return isSub;
    };
    /**
     * Removes the specified element from this set if it is present.
     * @return {boolean} true if this set contained the specified element.
     */
    Set.prototype.remove = function (element) {
        if (!this.contains(element)) {
            return false;
        }
        else {
            this.dictionary.remove(element);
            return true;
        }
    };
    /**
     * Executes the provided function once for each element
     * present in this set.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one arguments: the element. To break the iteration you can
     * optionally return false.
     */
    Set.prototype.forEach = function (callback) {
        this.dictionary.forEach(function (k, v) {
            return callback(v);
        });
    };
    /**
     * Returns an array containing all of the elements in this set in arbitrary order.
     * @return {Array} an array containing all of the elements in this set.
     */
    Set.prototype.toArray = function () {
        return this.dictionary.values();
    };
    /**
     * Returns true if this set contains no elements.
     * @return {boolean} true if this set contains no elements.
     */
    Set.prototype.isEmpty = function () {
        return this.dictionary.isEmpty();
    };
    /**
     * Returns the number of elements in this set.
     * @return {number} the number of elements in this set.
     */
    Set.prototype.size = function () {
        return this.dictionary.size();
    };
    /**
     * Removes all of the elements from this set.
     */
    Set.prototype.clear = function () {
        this.dictionary.clear();
    };
    /*
    * Provides a string representation for display
    */
    Set.prototype.toString = function () {
        return arrays.toString(this.toArray());
    };
    return Set;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Set; // end of Set

},{"./Dictionary":3,"./arrays":14,"./util":15}],13:[function(require,module,exports){
"use strict";
var LinkedList_1 = require('./LinkedList');
var Stack = (function () {
    /**
     * Creates an empty Stack.
     * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
     * element added to the stack will be the first one to be removed. This
     * implementation uses a linked list as a container.
     * @constructor
     */
    function Stack() {
        this.list = new LinkedList_1.default();
    }
    /**
     * Pushes an item onto the top of this stack.
     * @param {Object} elem the element to be pushed onto this stack.
     * @return {boolean} true if the element was pushed or false if it is undefined.
     */
    Stack.prototype.push = function (elem) {
        return this.list.add(elem, 0);
    };
    /**
     * Pushes an item onto the top of this stack.
     * @param {Object} elem the element to be pushed onto this stack.
     * @return {boolean} true if the element was pushed or false if it is undefined.
     */
    Stack.prototype.add = function (elem) {
        return this.list.add(elem, 0);
    };
    /**
     * Removes the object at the top of this stack and returns that object.
     * @return {*} the object at the top of this stack or undefined if the
     * stack is empty.
     */
    Stack.prototype.pop = function () {
        return this.list.removeElementAtIndex(0);
    };
    /**
     * Looks at the object at the top of this stack without removing it from the
     * stack.
     * @return {*} the object at the top of this stack or undefined if the
     * stack is empty.
     */
    Stack.prototype.peek = function () {
        return this.list.first();
    };
    /**
     * Returns the number of elements in this stack.
     * @return {number} the number of elements in this stack.
     */
    Stack.prototype.size = function () {
        return this.list.size();
    };
    /**
     * Returns true if this stack contains the specified element.
     * <p>If the elements inside this stack are
     * not comparable with the === operator, a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName (pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} elem element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction optional
     * function to check if two elements are equal.
     * @return {boolean} true if this stack contains the specified element,
     * false otherwise.
     */
    Stack.prototype.contains = function (elem, equalsFunction) {
        return this.list.contains(elem, equalsFunction);
    };
    /**
     * Checks if this stack is empty.
     * @return {boolean} true if and only if this stack contains no items; false
     * otherwise.
     */
    Stack.prototype.isEmpty = function () {
        return this.list.isEmpty();
    };
    /**
     * Removes all of the elements from this stack.
     */
    Stack.prototype.clear = function () {
        this.list.clear();
    };
    /**
     * Executes the provided function once for each element present in this stack in
     * LIFO order.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    Stack.prototype.forEach = function (callback) {
        this.list.forEach(callback);
    };
    return Stack;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stack; // End of stack

},{"./LinkedList":7}],14:[function(require,module,exports){
"use strict";
var util = require('./util');
/**
 * Returns the position of the first occurrence of the specified item
 * within the specified array.4
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the first occurrence of the specified element
 * within the specified array, or -1 if not found.
 */
function indexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.indexOf = indexOf;
/**
 * Returns the position of the last occurrence of the specified element
 * within the specified array.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the position of the last occurrence of the specified element
 * within the specified array or -1 if not found.
 */
function lastIndexOf(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    for (var i = length - 1; i >= 0; i--) {
        if (equals(array[i], item)) {
            return i;
        }
    }
    return -1;
}
exports.lastIndexOf = lastIndexOf;
/**
 * Returns true if the specified array contains the specified element.
 * @param {*} array the array in which to search the element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the specified array contains the specified element.
 */
function contains(array, item, equalsFunction) {
    return indexOf(array, item, equalsFunction) >= 0;
}
exports.contains = contains;
/**
 * Removes the first ocurrence of the specified element from the specified array.
 * @param {*} array the array in which to search element.
 * @param {Object} item the element to search.
 * @param {function(Object,Object):boolean=} equalsFunction optional function to
 * check equality between 2 elements.
 * @return {boolean} true if the array changed after this call.
 */
function remove(array, item, equalsFunction) {
    var index = indexOf(array, item, equalsFunction);
    if (index < 0) {
        return false;
    }
    array.splice(index, 1);
    return true;
}
exports.remove = remove;
/**
 * Returns the number of elements in the specified array equal
 * to the specified object.
 * @param {Array} array the array in which to determine the frequency of the element.
 * @param {Object} item the element whose frequency is to be determined.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between 2 elements.
 * @return {number} the number of elements in the specified array
 * equal to the specified object.
 */
function frequency(array, item, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    var length = array.length;
    var freq = 0;
    for (var i = 0; i < length; i++) {
        if (equals(array[i], item)) {
            freq++;
        }
    }
    return freq;
}
exports.frequency = frequency;
/**
 * Returns true if the two specified arrays are equal to one another.
 * Two arrays are considered equal if both arrays contain the same number
 * of elements, and all corresponding pairs of elements in the two
 * arrays are equal and are in the same order.
 * @param {Array} array1 one array to be tested for equality.
 * @param {Array} array2 the other array to be tested for equality.
 * @param {function(Object,Object):boolean=} equalsFunction optional function used to
 * check equality between elemements in the arrays.
 * @return {boolean} true if the two arrays are equal
 */
function equals(array1, array2, equalsFunction) {
    var equals = equalsFunction || util.defaultEquals;
    if (array1.length !== array2.length) {
        return false;
    }
    var length = array1.length;
    for (var i = 0; i < length; i++) {
        if (!equals(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
/**
 * Returns shallow a copy of the specified array.
 * @param {*} array the array to copy.
 * @return {Array} a copy of the specified array
 */
function copy(array) {
    return array.concat();
}
exports.copy = copy;
/**
 * Swaps the elements at the specified positions in the specified array.
 * @param {Array} array The array in which to swap elements.
 * @param {number} i the index of one element to be swapped.
 * @param {number} j the index of the other element to be swapped.
 * @return {boolean} true if the array is defined and the indexes are valid.
 */
function swap(array, i, j) {
    if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
        return false;
    }
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    return true;
}
exports.swap = swap;
function toString(array) {
    return '[' + array.toString() + ']';
}
exports.toString = toString;
/**
 * Executes the provided function once for each element present in this array
 * starting from index 0 to length - 1.
 * @param {Array} array The array in which to iterate.
 * @param {function(Object):*} callback function to execute, it is
 * invoked with one argument: the element value, to break the iteration you can
 * optionally return false.
 */
function forEach(array, callback) {
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var ele = array_1[_i];
        if (callback(ele) === false) {
            return;
        }
    }
}
exports.forEach = forEach;

},{"./util":15}],15:[function(require,module,exports){
"use strict";
var _hasOwnProperty = Object.prototype.hasOwnProperty;
exports.has = function (obj, prop) {
    return _hasOwnProperty.call(obj, prop);
};
/**
 * Default function to compare element order.
 * @function
 */
function defaultCompare(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a === b) {
        return 0;
    }
    else {
        return 1;
    }
}
exports.defaultCompare = defaultCompare;
/**
 * Default function to test equality.
 * @function
 */
function defaultEquals(a, b) {
    return a === b;
}
exports.defaultEquals = defaultEquals;
/**
 * Default function to convert an object to a string.
 * @function
 */
function defaultToString(item) {
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return '$s' + item;
    }
    else {
        return '$o' + item.toString();
    }
}
exports.defaultToString = defaultToString;
/**
* Joins all the properies of the object using the provided join string
*/
function makeString(item, join) {
    if (join === void 0) { join = ','; }
    if (item === null) {
        return 'COLLECTION_NULL';
    }
    else if (isUndefined(item)) {
        return 'COLLECTION_UNDEFINED';
    }
    else if (isString(item)) {
        return item.toString();
    }
    else {
        var toret = '{';
        var first = true;
        for (var prop in item) {
            if (exports.has(item, prop)) {
                if (first) {
                    first = false;
                }
                else {
                    toret = toret + join;
                }
                toret = toret + prop + ':' + item[prop];
            }
        }
        return toret + '}';
    }
}
exports.makeString = makeString;
/**
 * Checks if the given argument is a function.
 * @function
 */
function isFunction(func) {
    return (typeof func) === 'function';
}
exports.isFunction = isFunction;
/**
 * Checks if the given argument is undefined.
 * @function
 */
function isUndefined(obj) {
    return (typeof obj) === 'undefined';
}
exports.isUndefined = isUndefined;
/**
 * Checks if the given argument is a string.
 * @function
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
exports.isString = isString;
/**
 * Reverses a compare function.
 * @function
 */
function reverseCompareFunction(compareFunction) {
    if (!isFunction(compareFunction)) {
        return function (a, b) {
            if (a < b) {
                return 1;
            }
            else if (a === b) {
                return 0;
            }
            else {
                return -1;
            }
        };
    }
    else {
        return function (d, v) {
            return compareFunction(d, v) * -1;
        };
    }
}
exports.reverseCompareFunction = reverseCompareFunction;
/**
 * Returns an equal function given a compare function.
 * @function
 */
function compareToEquals(compareFunction) {
    return function (a, b) {
        return compareFunction(a, b) === 0;
    };
}
exports.compareToEquals = compareToEquals;

},{}],"typescript-collections":[function(require,module,exports){
"use strict";
// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
//
// Licensed under MIT open source license http://opensource.org/licenses/MIT
//
// Orginal javascript code was by Mauricio Santos
//
var _arrays = require('./arrays');
exports.arrays = _arrays;
var Bag_1 = require('./Bag');
exports.Bag = Bag_1.default;
var BSTree_1 = require('./BSTree');
exports.BSTree = BSTree_1.default;
var Dictionary_1 = require('./Dictionary');
exports.Dictionary = Dictionary_1.default;
var Heap_1 = require('./Heap');
exports.Heap = Heap_1.default;
var LinkedDictionary_1 = require('./LinkedDictionary');
exports.LinkedDictionary = LinkedDictionary_1.default;
var LinkedList_1 = require('./LinkedList');
exports.LinkedList = LinkedList_1.default;
var MultiDictionary_1 = require('./MultiDictionary');
exports.MultiDictionary = MultiDictionary_1.default;
var FactoryDictionary_1 = require('./FactoryDictionary');
exports.FactoryDictionary = FactoryDictionary_1.default;
var FactoryDictionary_2 = require('./FactoryDictionary');
exports.DefaultDictionary = FactoryDictionary_2.default;
var Queue_1 = require('./Queue');
exports.Queue = Queue_1.default;
var PriorityQueue_1 = require('./PriorityQueue');
exports.PriorityQueue = PriorityQueue_1.default;
var Set_1 = require('./Set');
exports.Set = Set_1.default;
var Stack_1 = require('./Stack');
exports.Stack = Stack_1.default;
var MultiRootTree_1 = require('./MultiRootTree');
exports.MultiRootTree = MultiRootTree_1.default;
var _util = require('./util');
exports.util = _util;

},{"./BSTree":1,"./Bag":2,"./Dictionary":3,"./FactoryDictionary":4,"./Heap":5,"./LinkedDictionary":6,"./LinkedList":7,"./MultiDictionary":8,"./MultiRootTree":9,"./PriorityQueue":10,"./Queue":11,"./Set":12,"./Stack":13,"./arrays":14,"./util":15}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2xpYi9CU1RyZWUuanMiLCJkaXN0L2xpYi9CYWcuanMiLCJkaXN0L2xpYi9EaWN0aW9uYXJ5LmpzIiwiZGlzdC9saWIvRmFjdG9yeURpY3Rpb25hcnkuanMiLCJkaXN0L2xpYi9IZWFwLmpzIiwiZGlzdC9saWIvTGlua2VkRGljdGlvbmFyeS5qcyIsImRpc3QvbGliL0xpbmtlZExpc3QuanMiLCJkaXN0L2xpYi9NdWx0aURpY3Rpb25hcnkuanMiLCJkaXN0L2xpYi9NdWx0aVJvb3RUcmVlLmpzIiwiZGlzdC9saWIvUHJpb3JpdHlRdWV1ZS5qcyIsImRpc3QvbGliL1F1ZXVlLmpzIiwiZGlzdC9saWIvU2V0LmpzIiwiZGlzdC9saWIvU3RhY2suanMiLCJkaXN0L2xpYi9hcnJheXMuanMiLCJkaXN0L2xpYi91dGlsLmpzIiwiZGlzdC9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBRdWV1ZV8xID0gcmVxdWlyZSgnLi9RdWV1ZScpO1xudmFyIEJTVHJlZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBiaW5hcnkgc2VhcmNoIHRyZWUuXG4gICAgICogQGNsYXNzIDxwPkEgYmluYXJ5IHNlYXJjaCB0cmVlIGlzIGEgYmluYXJ5IHRyZWUgaW4gd2hpY2ggZWFjaFxuICAgICAqIGludGVybmFsIG5vZGUgc3RvcmVzIGFuIGVsZW1lbnQgc3VjaCB0aGF0IHRoZSBlbGVtZW50cyBzdG9yZWQgaW4gdGhlXG4gICAgICogbGVmdCBzdWJ0cmVlIGFyZSBsZXNzIHRoYW4gaXQgYW5kIHRoZSBlbGVtZW50c1xuICAgICAqIHN0b3JlZCBpbiB0aGUgcmlnaHQgc3VidHJlZSBhcmUgZ3JlYXRlci48L3A+XG4gICAgICogPHA+Rm9ybWFsbHksIGEgYmluYXJ5IHNlYXJjaCB0cmVlIGlzIGEgbm9kZS1iYXNlZCBiaW5hcnkgdHJlZSBkYXRhIHN0cnVjdHVyZSB3aGljaFxuICAgICAqIGhhcyB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6PC9wPlxuICAgICAqIDx1bD5cbiAgICAgKiA8bGk+VGhlIGxlZnQgc3VidHJlZSBvZiBhIG5vZGUgY29udGFpbnMgb25seSBub2RlcyB3aXRoIGVsZW1lbnRzIGxlc3NcbiAgICAgKiB0aGFuIHRoZSBub2RlJ3MgZWxlbWVudDwvbGk+XG4gICAgICogPGxpPlRoZSByaWdodCBzdWJ0cmVlIG9mIGEgbm9kZSBjb250YWlucyBvbmx5IG5vZGVzIHdpdGggZWxlbWVudHMgZ3JlYXRlclxuICAgICAqIHRoYW4gdGhlIG5vZGUncyBlbGVtZW50PC9saT5cbiAgICAgKiA8bGk+Qm90aCB0aGUgbGVmdCBhbmQgcmlnaHQgc3VidHJlZXMgbXVzdCBhbHNvIGJlIGJpbmFyeSBzZWFyY2ggdHJlZXMuPC9saT5cbiAgICAgKiA8L3VsPlxuICAgICAqIDxwPklmIHRoZSBpbnNlcnRlZCBlbGVtZW50cyBhcmUgY3VzdG9tIG9iamVjdHMgYSBjb21wYXJlIGZ1bmN0aW9uIG11c3RcbiAgICAgKiBiZSBwcm92aWRlZCBhdCBjb25zdHJ1Y3Rpb24gdGltZSwgb3RoZXJ3aXNlIHRoZSA8PSwgPT09IGFuZCA+PSBvcGVyYXRvcnMgYXJlXG4gICAgICogdXNlZCB0byBjb21wYXJlIGVsZW1lbnRzLiBFeGFtcGxlOjwvcD5cbiAgICAgKiA8cHJlPlxuICAgICAqIGZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuICAgICAqICBpZiAoYSBpcyBsZXNzIHRoYW4gYiBieSBzb21lIG9yZGVyaW5nIGNyaXRlcmlvbikge1xuICAgICAqICAgICByZXR1cm4gLTE7XG4gICAgICogIH0gaWYgKGEgaXMgZ3JlYXRlciB0aGFuIGIgYnkgdGhlIG9yZGVyaW5nIGNyaXRlcmlvbikge1xuICAgICAqICAgICByZXR1cm4gMTtcbiAgICAgKiAgfVxuICAgICAqICAvLyBhIG11c3QgYmUgZXF1YWwgdG8gYlxuICAgICAqICByZXR1cm4gMDtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpudW1iZXI9fSBjb21wYXJlRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNvbXBhcmUgdHdvIGVsZW1lbnRzLiBNdXN0IHJldHVybiBhIG5lZ2F0aXZlIGludGVnZXIsXG4gICAgICogemVybywgb3IgYSBwb3NpdGl2ZSBpbnRlZ2VyIGFzIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBsZXNzIHRoYW4sIGVxdWFsIHRvLFxuICAgICAqIG9yIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEJTVHJlZShjb21wYXJlRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5yb290ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb21wYXJlID0gY29tcGFyZUZ1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdENvbXBhcmU7XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgdG8gdGhpcyB0cmVlIGlmIGl0IGlzIG5vdCBhbHJlYWR5IHByZXNlbnQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyB0cmVlIGRpZCBub3QgYWxyZWFkeSBjb250YWluIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW5zZXJ0Tm9kZSh0aGlzLmNyZWF0ZU5vZGUoZWxlbWVudCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm5FbGVtZW50cysrO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIGVsZW1lbnRzIGZyb20gdGhpcyB0cmVlLlxuICAgICAqL1xuICAgIEJTVHJlZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucm9vdCA9IG51bGw7XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHRyZWUgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHRyZWUgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICovXG4gICAgQlNUcmVlLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHMgPT09IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyB0cmVlLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHRyZWUuXG4gICAgICovXG4gICAgQlNUcmVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyB0cmVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCBlbGVtZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHRyZWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LFxuICAgICAqIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hOb2RlKHRoaXMucm9vdCwgZWxlbWVudCkgIT09IG51bGw7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoaXMgdHJlZSBpZiBpdCBpcyBwcmVzZW50LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyB0cmVlIGNvbnRhaW5lZCB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICovXG4gICAgQlNUcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuc2VhcmNoTm9kZSh0aGlzLnJvb3QsIGVsZW1lbnQpO1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlTm9kZShub2RlKTtcbiAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyB0cmVlIGluXG4gICAgICogaW4tb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzIGludm9rZWQgd2l0aCBvbmVcbiAgICAgKiBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhbiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLmlub3JkZXJUcmF2ZXJzYWwgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5pbm9yZGVyVHJhdmVyc2FsQXV4KHRoaXMucm9vdCwgY2FsbGJhY2ssIHtcbiAgICAgICAgICAgIHN0b3A6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgdHJlZSBpbiBwcmUtb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzIGludm9rZWQgd2l0aCBvbmVcbiAgICAgKiBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhbiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLnByZW9yZGVyVHJhdmVyc2FsID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucHJlb3JkZXJUcmF2ZXJzYWxBdXgodGhpcy5yb290LCBjYWxsYmFjaywge1xuICAgICAgICAgICAgc3RvcDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyB0cmVlIGluIHBvc3Qtb3JkZXIuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzIGludm9rZWQgd2l0aCBvbmVcbiAgICAgKiBhcmd1bWVudDogdGhlIGVsZW1lbnQgdmFsdWUsIHRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhbiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLnBvc3RvcmRlclRyYXZlcnNhbCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnBvc3RvcmRlclRyYXZlcnNhbEF1eCh0aGlzLnJvb3QsIGNhbGxiYWNrLCB7XG4gICAgICAgICAgICBzdG9wOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHRyZWUgaW5cbiAgICAgKiBsZXZlbC1vcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXMgaW52b2tlZCB3aXRoIG9uZVxuICAgICAqIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICAgICAqL1xuICAgIEJTVHJlZS5wcm90b3R5cGUubGV2ZWxUcmF2ZXJzYWwgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5sZXZlbFRyYXZlcnNhbEF1eCh0aGlzLnJvb3QsIGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG1pbmltdW0gZWxlbWVudCBvZiB0aGlzIHRyZWUuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIG1pbmltdW0gZWxlbWVudCBvZiB0aGlzIHRyZWUgb3IgdW5kZWZpbmVkIGlmIHRoaXMgdHJlZSBpc1xuICAgICAqIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIEJTVHJlZS5wcm90b3R5cGUubWluaW11bSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1pbmltdW1BdXgodGhpcy5yb290KS5lbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWF4aW11bSBlbGVtZW50IG9mIHRoaXMgdHJlZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgbWF4aW11bSBlbGVtZW50IG9mIHRoaXMgdHJlZSBvciB1bmRlZmluZWQgaWYgdGhpcyB0cmVlIGlzXG4gICAgICogaXMgZW1wdHkuXG4gICAgICovXG4gICAgQlNUcmVlLnByb3RvdHlwZS5tYXhpbXVtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWF4aW11bUF1eCh0aGlzLnJvb3QpLmVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyB0cmVlIGluIGlub3JkZXIuXG4gICAgICogRXF1aXZhbGVudCB0byBpbm9yZGVyVHJhdmVyc2FsLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5pbm9yZGVyVHJhdmVyc2FsKGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgdHJlZSBpbiBpbi1vcmRlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgdHJlZSBpbiBpbi1vcmRlci5cbiAgICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICB0aGlzLmlub3JkZXJUcmF2ZXJzYWwoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGhlaWdodCBvZiB0aGlzIHRyZWUuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgaGVpZ2h0IG9mIHRoaXMgdHJlZSBvciAtMSBpZiBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLmhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0QXV4KHRoaXMucm9vdCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBwcml2YXRlXG4gICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLnNlYXJjaE5vZGUgPSBmdW5jdGlvbiAobm9kZSwgZWxlbWVudCkge1xuICAgICAgICB2YXIgY21wID0gbnVsbDtcbiAgICAgICAgd2hpbGUgKG5vZGUgIT09IG51bGwgJiYgY21wICE9PSAwKSB7XG4gICAgICAgICAgICBjbXAgPSB0aGlzLmNvbXBhcmUoZWxlbWVudCwgbm9kZS5lbGVtZW50KTtcbiAgICAgICAgICAgIGlmIChjbXAgPCAwKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IG5vZGUubGVmdENoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY21wID4gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLnJpZ2h0Q2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBwcml2YXRlXG4gICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLnRyYW5zcGxhbnQgPSBmdW5jdGlvbiAobjEsIG4yKSB7XG4gICAgICAgIGlmIChuMS5wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IG4yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG4xID09PSBuMS5wYXJlbnQubGVmdENoKSB7XG4gICAgICAgICAgICBuMS5wYXJlbnQubGVmdENoID0gbjI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuMS5wYXJlbnQucmlnaHRDaCA9IG4yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbjIucGFyZW50ID0gbjEucGFyZW50O1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBwcml2YXRlXG4gICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLnJlbW92ZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5sZWZ0Q2ggPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwbGFudChub2RlLCBub2RlLnJpZ2h0Q2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5vZGUucmlnaHRDaCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BsYW50KG5vZGUsIG5vZGUubGVmdENoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5taW5pbXVtQXV4KG5vZGUucmlnaHRDaCk7XG4gICAgICAgICAgICBpZiAoeS5wYXJlbnQgIT09IG5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcGxhbnQoeSwgeS5yaWdodENoKTtcbiAgICAgICAgICAgICAgICB5LnJpZ2h0Q2ggPSBub2RlLnJpZ2h0Q2g7XG4gICAgICAgICAgICAgICAgeS5yaWdodENoLnBhcmVudCA9IHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRyYW5zcGxhbnQobm9kZSwgeSk7XG4gICAgICAgICAgICB5LmxlZnRDaCA9IG5vZGUubGVmdENoO1xuICAgICAgICAgICAgeS5sZWZ0Q2gucGFyZW50ID0geTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgKiBAcHJpdmF0ZVxuICAgICovXG4gICAgQlNUcmVlLnByb3RvdHlwZS5pbm9yZGVyVHJhdmVyc2FsQXV4ID0gZnVuY3Rpb24gKG5vZGUsIGNhbGxiYWNrLCBzaWduYWwpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwgfHwgc2lnbmFsLnN0b3ApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlub3JkZXJUcmF2ZXJzYWxBdXgobm9kZS5sZWZ0Q2gsIGNhbGxiYWNrLCBzaWduYWwpO1xuICAgICAgICBpZiAoc2lnbmFsLnN0b3ApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzaWduYWwuc3RvcCA9IGNhbGxiYWNrKG5vZGUuZWxlbWVudCkgPT09IGZhbHNlO1xuICAgICAgICBpZiAoc2lnbmFsLnN0b3ApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlub3JkZXJUcmF2ZXJzYWxBdXgobm9kZS5yaWdodENoLCBjYWxsYmFjaywgc2lnbmFsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIEJTVHJlZS5wcm90b3R5cGUubGV2ZWxUcmF2ZXJzYWxBdXggPSBmdW5jdGlvbiAobm9kZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlXzEuZGVmYXVsdCgpO1xuICAgICAgICBpZiAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcXVldWUuZW5xdWV1ZShub2RlKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoIXF1ZXVlLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgbm9kZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhub2RlLmVsZW1lbnQpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLmxlZnRDaCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLmVucXVldWUobm9kZS5sZWZ0Q2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGUucmlnaHRDaCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLmVucXVldWUobm9kZS5yaWdodENoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgKiBAcHJpdmF0ZVxuICAgICovXG4gICAgQlNUcmVlLnByb3RvdHlwZS5wcmVvcmRlclRyYXZlcnNhbEF1eCA9IGZ1bmN0aW9uIChub2RlLCBjYWxsYmFjaywgc2lnbmFsKSB7XG4gICAgICAgIGlmIChub2RlID09PSBudWxsIHx8IHNpZ25hbC5zdG9wKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2lnbmFsLnN0b3AgPSBjYWxsYmFjayhub2RlLmVsZW1lbnQpID09PSBmYWxzZTtcbiAgICAgICAgaWYgKHNpZ25hbC5zdG9wKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVvcmRlclRyYXZlcnNhbEF1eChub2RlLmxlZnRDaCwgY2FsbGJhY2ssIHNpZ25hbCk7XG4gICAgICAgIGlmIChzaWduYWwuc3RvcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJlb3JkZXJUcmF2ZXJzYWxBdXgobm9kZS5yaWdodENoLCBjYWxsYmFjaywgc2lnbmFsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIEJTVHJlZS5wcm90b3R5cGUucG9zdG9yZGVyVHJhdmVyc2FsQXV4ID0gZnVuY3Rpb24gKG5vZGUsIGNhbGxiYWNrLCBzaWduYWwpIHtcbiAgICAgICAgaWYgKG5vZGUgPT09IG51bGwgfHwgc2lnbmFsLnN0b3ApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvc3RvcmRlclRyYXZlcnNhbEF1eChub2RlLmxlZnRDaCwgY2FsbGJhY2ssIHNpZ25hbCk7XG4gICAgICAgIGlmIChzaWduYWwuc3RvcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zdG9yZGVyVHJhdmVyc2FsQXV4KG5vZGUucmlnaHRDaCwgY2FsbGJhY2ssIHNpZ25hbCk7XG4gICAgICAgIGlmIChzaWduYWwuc3RvcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNpZ25hbC5zdG9wID0gY2FsbGJhY2sobm9kZS5lbGVtZW50KSA9PT0gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBwcml2YXRlXG4gICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLm1pbmltdW1BdXggPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB3aGlsZSAobm9kZS5sZWZ0Q2ggIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmxlZnRDaDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIEJTVHJlZS5wcm90b3R5cGUubWF4aW11bUF1eCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHdoaWxlIChub2RlLnJpZ2h0Q2ggIT09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnJpZ2h0Q2g7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgICogQHByaXZhdGVcbiAgICAgICovXG4gICAgQlNUcmVlLnByb3RvdHlwZS5oZWlnaHRBdXggPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNYXRoLm1heCh0aGlzLmhlaWdodEF1eChub2RlLmxlZnRDaCksIHRoaXMuaGVpZ2h0QXV4KG5vZGUucmlnaHRDaCkpICsgMTtcbiAgICB9O1xuICAgIC8qXG4gICAgKiBAcHJpdmF0ZVxuICAgICovXG4gICAgQlNUcmVlLnByb3RvdHlwZS5pbnNlcnROb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IG51bGw7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMucm9vdDtcbiAgICAgICAgdmFyIGNtcCA9IG51bGw7XG4gICAgICAgIHdoaWxlIChwb3NpdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY21wID0gdGhpcy5jb21wYXJlKG5vZGUuZWxlbWVudCwgcG9zaXRpb24uZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoY21wID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjbXAgPCAwKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbi5sZWZ0Q2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLnJpZ2h0Q2g7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIHRyZWUgaXMgZW1wdHlcbiAgICAgICAgICAgIHRoaXMucm9vdCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jb21wYXJlKG5vZGUuZWxlbWVudCwgcGFyZW50LmVsZW1lbnQpIDwgMCkge1xuICAgICAgICAgICAgcGFyZW50LmxlZnRDaCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQucmlnaHRDaCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAqIEBwcml2YXRlXG4gICAgKi9cbiAgICBCU1RyZWUucHJvdG90eXBlLmNyZWF0ZU5vZGUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIGxlZnRDaDogbnVsbCxcbiAgICAgICAgICAgIHJpZ2h0Q2g6IG51bGwsXG4gICAgICAgICAgICBwYXJlbnQ6IG51bGxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBCU1RyZWU7XG59KCkpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gQlNUcmVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QlNUcmVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBEaWN0aW9uYXJ5XzEgPSByZXF1aXJlKCcuL0RpY3Rpb25hcnknKTtcbnZhciBTZXRfMSA9IHJlcXVpcmUoJy4vU2V0Jyk7XG52YXIgQmFnID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IGJhZy5cbiAgICAgKiBAY2xhc3MgPHA+QSBiYWcgaXMgYSBzcGVjaWFsIGtpbmQgb2Ygc2V0IGluIHdoaWNoIG1lbWJlcnMgYXJlXG4gICAgICogYWxsb3dlZCB0byBhcHBlYXIgbW9yZSB0aGFuIG9uY2UuPC9wPlxuICAgICAqIDxwPklmIHRoZSBpbnNlcnRlZCBlbGVtZW50cyBhcmUgY3VzdG9tIG9iamVjdHMgYSBmdW5jdGlvblxuICAgICAqIHdoaWNoIGNvbnZlcnRzIGVsZW1lbnRzIHRvIHVuaXF1ZSBzdHJpbmdzIG11c3QgYmUgcHJvdmlkZWQuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBmdW5jdGlvbiBwZXRUb1N0cmluZyhwZXQpIHtcbiAgICAgKiAgcmV0dXJuIHBldC5uYW1lO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KTpzdHJpbmc9fSB0b1N0ckZ1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWRcbiAgICAgKiB0byBjb252ZXJ0IGVsZW1lbnRzIHRvIHN0cmluZ3MuIElmIHRoZSBlbGVtZW50cyBhcmVuJ3Qgc3RyaW5ncyBvciBpZiB0b1N0cmluZygpXG4gICAgICogaXMgbm90IGFwcHJvcHJpYXRlLCBhIGN1c3RvbSBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhbiBvYmplY3QgYW5kIHJldHVybnMgYVxuICAgICAqIHVuaXF1ZSBzdHJpbmcgbXVzdCBiZSBwcm92aWRlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBCYWcodG9TdHJGdW5jdGlvbikge1xuICAgICAgICB0aGlzLnRvU3RyRiA9IHRvU3RyRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0VG9TdHJpbmc7XG4gICAgICAgIHRoaXMuZGljdGlvbmFyeSA9IG5ldyBEaWN0aW9uYXJ5XzEuZGVmYXVsdCh0aGlzLnRvU3RyRik7XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBBZGRzIG5Db3BpZXMgb2YgdGhlIHNwZWNpZmllZCBvYmplY3QgdG8gdGhpcyBiYWcuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCBlbGVtZW50IHRvIGFkZC5cbiAgICAqIEBwYXJhbSB7bnVtYmVyPX0gbkNvcGllcyB0aGUgbnVtYmVyIG9mIGNvcGllcyB0byBhZGQsIGlmIHRoaXMgYXJndW1lbnQgaXNcbiAgICAqIHVuZGVmaW5lZCAxIGNvcHkgaXMgYWRkZWQuXG4gICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIHVubGVzcyBlbGVtZW50IGlzIHVuZGVmaW5lZC5cbiAgICAqL1xuICAgIEJhZy5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW1lbnQsIG5Db3BpZXMpIHtcbiAgICAgICAgaWYgKG5Db3BpZXMgPT09IHZvaWQgMCkgeyBuQ29waWVzID0gMTsgfVxuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChlbGVtZW50KSB8fCBuQ29waWVzIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuY29udGFpbnMoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIGNvcGllczogbkNvcGllc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZGljdGlvbmFyeS5zZXRWYWx1ZShlbGVtZW50LCBub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGljdGlvbmFyeS5nZXRWYWx1ZShlbGVtZW50KS5jb3BpZXMgKz0gbkNvcGllcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5FbGVtZW50cyArPSBuQ29waWVzO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQ291bnRzIHRoZSBudW1iZXIgb2YgY29waWVzIG9mIHRoZSBzcGVjaWZpZWQgb2JqZWN0IGluIHRoaXMgYmFnLlxuICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgdGhlIG9iamVjdCB0byBzZWFyY2ggZm9yLi5cbiAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBjb3BpZXMgb2YgdGhlIG9iamVjdCwgMCBpZiBub3QgZm91bmRcbiAgICAqL1xuICAgIEJhZy5wcm90b3R5cGUuY291bnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGFpbnMoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGljdGlvbmFyeS5nZXRWYWx1ZShlbGVtZW50KS5jb3BpZXM7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGJhZyBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBiYWcgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LFxuICAgICAqIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBCYWcucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGljdGlvbmFyeS5jb250YWluc0tleShlbGVtZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogUmVtb3ZlcyBuQ29waWVzIG9mIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHRvIHRoaXMgYmFnLlxuICAgICogSWYgdGhlIG51bWJlciBvZiBjb3BpZXMgdG8gcmVtb3ZlIGlzIGdyZWF0ZXIgdGhhbiB0aGUgYWN0dWFsIG51bWJlclxuICAgICogb2YgY29waWVzIGluIHRoZSBCYWcsIGFsbCBjb3BpZXMgYXJlIHJlbW92ZWQuXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCBlbGVtZW50IHRvIHJlbW92ZS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyPX0gbkNvcGllcyB0aGUgbnVtYmVyIG9mIGNvcGllcyB0byByZW1vdmUsIGlmIHRoaXMgYXJndW1lbnQgaXNcbiAgICAqIHVuZGVmaW5lZCAxIGNvcHkgaXMgcmVtb3ZlZC5cbiAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYXQgbGVhc3QgMSBlbGVtZW50IHdhcyByZW1vdmVkLlxuICAgICovXG4gICAgQmFnLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZWxlbWVudCwgbkNvcGllcykge1xuICAgICAgICBpZiAobkNvcGllcyA9PT0gdm9pZCAwKSB7IG5Db3BpZXMgPSAxOyB9XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGVsZW1lbnQpIHx8IG5Db3BpZXMgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5jb250YWlucyhlbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmRpY3Rpb25hcnkuZ2V0VmFsdWUoZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAobkNvcGllcyA+IG5vZGUuY29waWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uRWxlbWVudHMgLT0gbm9kZS5jb3BpZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cyAtPSBuQ29waWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5jb3BpZXMgLT0gbkNvcGllcztcbiAgICAgICAgICAgIGlmIChub2RlLmNvcGllcyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWN0aW9uYXJ5LnJlbW92ZShlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGJpZyBpbiBhcmJpdHJhcnkgb3JkZXIsXG4gICAgICogaW5jbHVkaW5nIG11bHRpcGxlIGNvcGllcy5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGVsZW1lbnRzIGluIHRoaXMgYmFnLlxuICAgICAqL1xuICAgIEJhZy5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGEgPSBbXTtcbiAgICAgICAgdmFyIHZhbHVlcyA9IHRoaXMuZGljdGlvbmFyeS52YWx1ZXMoKTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCB2YWx1ZXNfMSA9IHZhbHVlczsgX2kgPCB2YWx1ZXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdmFsdWVzXzFbX2ldO1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBub2RlLnZhbHVlO1xuICAgICAgICAgICAgdmFyIGNvcGllcyA9IG5vZGUuY29waWVzO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb3BpZXM7IGorKykge1xuICAgICAgICAgICAgICAgIGEucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzZXQgb2YgdW5pcXVlIGVsZW1lbnRzIGluIHRoaXMgYmFnLlxuICAgICAqIEByZXR1cm4ge2NvbGxlY3Rpb25zLlNldDxUPn0gYSBzZXQgb2YgdW5pcXVlIGVsZW1lbnRzIGluIHRoaXMgYmFnLlxuICAgICAqL1xuICAgIEJhZy5wcm90b3R5cGUudG9TZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0b3JldCA9IG5ldyBTZXRfMS5kZWZhdWx0KHRoaXMudG9TdHJGKTtcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gdGhpcy5kaWN0aW9uYXJ5LnZhbHVlcygpO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGVsZW1lbnRzXzEgPSBlbGVtZW50czsgX2kgPCBlbGVtZW50c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGVsZSA9IGVsZW1lbnRzXzFbX2ldO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gZWxlLnZhbHVlO1xuICAgICAgICAgICAgdG9yZXQuYWRkKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9yZXQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50XG4gICAgICogcHJlc2VudCBpbiB0aGlzIGJhZywgaW5jbHVkaW5nIG11bHRpcGxlIGNvcGllcy5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudC4gVG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgQmFnLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZGljdGlvbmFyeS5mb3JFYWNoKGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB2LnZhbHVlO1xuICAgICAgICAgICAgdmFyIGNvcGllcyA9IHYuY29waWVzO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3BpZXM7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayh2YWx1ZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBiYWcuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgYmFnLlxuICAgICAqL1xuICAgIEJhZy5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgYmFnIGNvbnRhaW5zIG5vIGVsZW1lbnRzLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBiYWcgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICovXG4gICAgQmFnLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHMgPT09IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGJhZy5cbiAgICAgKi9cbiAgICBCYWcucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5FbGVtZW50cyA9IDA7XG4gICAgICAgIHRoaXMuZGljdGlvbmFyeS5jbGVhcigpO1xuICAgIH07XG4gICAgcmV0dXJuIEJhZztcbn0oKSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBCYWc7IC8vIEVuZCBvZiBiYWdcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJhZy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgRGljdGlvbmFyeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBkaWN0aW9uYXJ5LlxuICAgICAqIEBjbGFzcyA8cD5EaWN0aW9uYXJpZXMgbWFwIGtleXMgdG8gdmFsdWVzOyBlYWNoIGtleSBjYW4gbWFwIHRvIGF0IG1vc3Qgb25lIHZhbHVlLlxuICAgICAqIFRoaXMgaW1wbGVtZW50YXRpb24gYWNjZXB0cyBhbnkga2luZCBvZiBvYmplY3RzIGFzIGtleXMuPC9wPlxuICAgICAqXG4gICAgICogPHA+SWYgdGhlIGtleXMgYXJlIGN1c3RvbSBvYmplY3RzIGEgZnVuY3Rpb24gd2hpY2ggY29udmVydHMga2V5cyB0byB1bmlxdWVcbiAgICAgKiBzdHJpbmdzIG11c3QgYmUgcHJvdmlkZWQuIEV4YW1wbGU6PC9wPlxuICAgICAqIDxwcmU+XG4gICAgICogZnVuY3Rpb24gcGV0VG9TdHJpbmcocGV0KSB7XG4gICAgICogIHJldHVybiBwZXQubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOnN0cmluZz19IHRvU3RyRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZFxuICAgICAqIHRvIGNvbnZlcnQga2V5cyB0byBzdHJpbmdzLiBJZiB0aGUga2V5cyBhcmVuJ3Qgc3RyaW5ncyBvciBpZiB0b1N0cmluZygpXG4gICAgICogaXMgbm90IGFwcHJvcHJpYXRlLCBhIGN1c3RvbSBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhIGtleSBhbmQgcmV0dXJucyBhXG4gICAgICogdW5pcXVlIHN0cmluZyBtdXN0IGJlIHByb3ZpZGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIERpY3Rpb25hcnkodG9TdHJGdW5jdGlvbikge1xuICAgICAgICB0aGlzLnRhYmxlID0ge307XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICAgICAgdGhpcy50b1N0ciA9IHRvU3RyRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0VG9TdHJpbmc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIHRvIHdoaWNoIHRoaXMgZGljdGlvbmFyeSBtYXBzIHRoZSBzcGVjaWZpZWQga2V5LlxuICAgICAqIFJldHVybnMgdW5kZWZpbmVkIGlmIHRoaXMgZGljdGlvbmFyeSBjb250YWlucyBubyBtYXBwaW5nIGZvciB0aGlzIGtleS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5IGtleSB3aG9zZSBhc3NvY2lhdGVkIHZhbHVlIGlzIHRvIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm4geyp9IHRoZSB2YWx1ZSB0byB3aGljaCB0aGlzIGRpY3Rpb25hcnkgbWFwcyB0aGUgc3BlY2lmaWVkIGtleSBvclxuICAgICAqIHVuZGVmaW5lZCBpZiB0aGUgbWFwIGNvbnRhaW5zIG5vIG1hcHBpbmcgZm9yIHRoaXMga2V5LlxuICAgICAqL1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgcGFpciA9IHRoaXMudGFibGVbJyQnICsgdGhpcy50b1N0cihrZXkpXTtcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQocGFpcikpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhaXIudmFsdWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBc3NvY2lhdGVzIHRoZSBzcGVjaWZpZWQgdmFsdWUgd2l0aCB0aGUgc3BlY2lmaWVkIGtleSBpbiB0aGlzIGRpY3Rpb25hcnkuXG4gICAgICogSWYgdGhlIGRpY3Rpb25hcnkgcHJldmlvdXNseSBjb250YWluZWQgYSBtYXBwaW5nIGZvciB0aGlzIGtleSwgdGhlIG9sZFxuICAgICAqIHZhbHVlIGlzIHJlcGxhY2VkIGJ5IHRoZSBzcGVjaWZpZWQgdmFsdWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSBrZXkgd2l0aCB3aGljaCB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIHRvIGJlXG4gICAgICogYXNzb2NpYXRlZC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgdmFsdWUgdG8gYmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpZWQga2V5LlxuICAgICAqIEByZXR1cm4geyp9IHByZXZpb3VzIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3BlY2lmaWVkIGtleSwgb3IgdW5kZWZpbmVkIGlmXG4gICAgICogdGhlcmUgd2FzIG5vIG1hcHBpbmcgZm9yIHRoZSBrZXkgb3IgaWYgdGhlIGtleS92YWx1ZSBhcmUgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoa2V5KSB8fCB1dGlsLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmV0O1xuICAgICAgICB2YXIgayA9ICckJyArIHRoaXMudG9TdHIoa2V5KTtcbiAgICAgICAgdmFyIHByZXZpb3VzRWxlbWVudCA9IHRoaXMudGFibGVba107XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKHByZXZpb3VzRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMubkVsZW1lbnRzKys7XG4gICAgICAgICAgICByZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXQgPSBwcmV2aW91c0VsZW1lbnQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWJsZVtrXSA9IHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBtYXBwaW5nIGZvciB0aGlzIGtleSBmcm9tIHRoaXMgZGljdGlvbmFyeSBpZiBpdCBpcyBwcmVzZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkga2V5IHdob3NlIG1hcHBpbmcgaXMgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoZVxuICAgICAqIGRpY3Rpb25hcnkuXG4gICAgICogQHJldHVybiB7Kn0gcHJldmlvdXMgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHNwZWNpZmllZCBrZXksIG9yIHVuZGVmaW5lZCBpZlxuICAgICAqIHRoZXJlIHdhcyBubyBtYXBwaW5nIGZvciBrZXkuXG4gICAgICovXG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgayA9ICckJyArIHRoaXMudG9TdHIoa2V5KTtcbiAgICAgICAgdmFyIHByZXZpb3VzRWxlbWVudCA9IHRoaXMudGFibGVba107XG4gICAgICAgIGlmICghdXRpbC5pc1VuZGVmaW5lZChwcmV2aW91c0VsZW1lbnQpKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy50YWJsZVtrXTtcbiAgICAgICAgICAgIHRoaXMubkVsZW1lbnRzLS07XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNFbGVtZW50LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBrZXlzIGluIHRoaXMgZGljdGlvbmFyeS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGtleXMgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICAqL1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBuYW1lXzEgaW4gdGhpcy50YWJsZSkge1xuICAgICAgICAgICAgaWYgKHV0aWwuaGFzKHRoaXMudGFibGUsIG5hbWVfMSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFpciA9IHRoaXMudGFibGVbbmFtZV8xXTtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHBhaXIua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSB2YWx1ZXMgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgdmFsdWVzIGluIHRoaXMgZGljdGlvbmFyeS5cbiAgICAgKi9cbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBuYW1lXzIgaW4gdGhpcy50YWJsZSkge1xuICAgICAgICAgICAgaWYgKHV0aWwuaGFzKHRoaXMudGFibGUsIG5hbWVfMikpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFpciA9IHRoaXMudGFibGVbbmFtZV8yXTtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHBhaXIudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2gga2V5LXZhbHVlIHBhaXJcbiAgICAqIHByZXNlbnQgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICogaW52b2tlZCB3aXRoIHR3byBhcmd1bWVudHM6IGtleSBhbmQgdmFsdWUuIFRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgKi9cbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAodmFyIG5hbWVfMyBpbiB0aGlzLnRhYmxlKSB7XG4gICAgICAgICAgICBpZiAodXRpbC5oYXModGhpcy50YWJsZSwgbmFtZV8zKSkge1xuICAgICAgICAgICAgICAgIHZhciBwYWlyID0gdGhpcy50YWJsZVtuYW1lXzNdO1xuICAgICAgICAgICAgICAgIHZhciByZXQgPSBjYWxsYmFjayhwYWlyLmtleSwgcGFpci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgZGljdGlvbmFyeSBjb250YWlucyBhIG1hcHBpbmcgZm9yIHRoZSBzcGVjaWZpZWQga2V5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkga2V5IHdob3NlIHByZXNlbmNlIGluIHRoaXMgZGljdGlvbmFyeSBpcyB0byBiZVxuICAgICAqIHRlc3RlZC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgZGljdGlvbmFyeSBjb250YWlucyBhIG1hcHBpbmcgZm9yIHRoZVxuICAgICAqIHNwZWNpZmllZCBrZXkuXG4gICAgICovXG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuY29udGFpbnNLZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiAhdXRpbC5pc1VuZGVmaW5lZCh0aGlzLmdldFZhbHVlKGtleSkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBSZW1vdmVzIGFsbCBtYXBwaW5ncyBmcm9tIHRoaXMgZGljdGlvbmFyeS5cbiAgICAqIEB0aGlzIHtjb2xsZWN0aW9ucy5EaWN0aW9uYXJ5fVxuICAgICovXG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGFibGUgPSB7fTtcbiAgICAgICAgdGhpcy5uRWxlbWVudHMgPSAwO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGtleXMgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBrZXktdmFsdWUgbWFwcGluZ3MgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICAqL1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5FbGVtZW50cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGRpY3Rpb25hcnkgY29udGFpbnMgbm8gbWFwcGluZ3MuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGRpY3Rpb25hcnkgY29udGFpbnMgbm8gbWFwcGluZ3MuXG4gICAgICovXG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzIDw9IDA7XG4gICAgfTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRvcmV0ID0gJ3snO1xuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgICAgICAgIHRvcmV0ICs9IFwiXFxuXFx0XCIgKyBrICsgXCIgOiBcIiArIHY7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdG9yZXQgKyAnXFxufSc7XG4gICAgfTtcbiAgICByZXR1cm4gRGljdGlvbmFyeTtcbn0oKSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBEaWN0aW9uYXJ5OyAvLyBFbmQgb2YgZGljdGlvbmFyeVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGljdGlvbmFyeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIERpY3Rpb25hcnlfMSA9IHJlcXVpcmUoJy4vRGljdGlvbmFyeScpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBGYWN0b3J5RGljdGlvbmFyeSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZhY3RvcnlEaWN0aW9uYXJ5LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gZW1wdHkgZGljdGlvbmFyeS5cbiAgICAgKiBAY2xhc3MgPHA+RGljdGlvbmFyaWVzIG1hcCBrZXlzIHRvIHZhbHVlczsgZWFjaCBrZXkgY2FuIG1hcCB0byBhdCBtb3N0IG9uZSB2YWx1ZS5cbiAgICAgKiBUaGlzIGltcGxlbWVudGF0aW9uIGFjY2VwdHMgYW55IGtpbmQgb2Ygb2JqZWN0cyBhcyBrZXlzLjwvcD5cbiAgICAgKlxuICAgICAqIDxwPlRoZSBkZWZhdWx0IGZhY3RvcnkgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIG5ldyBvYmplY3Qgb2YgdGhlIHByb3ZpZGVkXG4gICAgICogdHlwZS4gRXhhbXBsZTo8L3A+XG4gICAgICogPHByZT5cbiAgICAgKiBmdW5jdGlvbiBwZXRGYWN0b3J5KCkge1xuICAgICAqICByZXR1cm4gbmV3IFBldCgpO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKlxuICAgICAqIDxwPklmIHRoZSBrZXlzIGFyZSBjdXN0b20gb2JqZWN0cyBhIGZ1bmN0aW9uIHdoaWNoIGNvbnZlcnRzIGtleXMgdG8gdW5pcXVlXG4gICAgICogc3RyaW5ncyBtdXN0IGJlIHByb3ZpZGVkLiBFeGFtcGxlOjwvcD5cbiAgICAgKiA8cHJlPlxuICAgICAqIGZ1bmN0aW9uIHBldFRvU3RyaW5nKHBldCkge1xuICAgICAqICByZXR1cm4gcGV0Lm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTpWPX0gZGVmYXVsdEZhY3RvcnlGdW5jdGlvbiBmdW5jdGlvbiB1c2VkIHRvIGNyZWF0ZSBhXG4gICAgICogZGVmYXVsdCBvYmplY3QuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOnN0cmluZz19IHRvU3RyRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZFxuICAgICAqIHRvIGNvbnZlcnQga2V5cyB0byBzdHJpbmdzLiBJZiB0aGUga2V5cyBhcmVuJ3Qgc3RyaW5ncyBvciBpZiB0b1N0cmluZygpXG4gICAgICogaXMgbm90IGFwcHJvcHJpYXRlLCBhIGN1c3RvbSBmdW5jdGlvbiB3aGljaCByZWNlaXZlcyBhIGtleSBhbmQgcmV0dXJucyBhXG4gICAgICogdW5pcXVlIHN0cmluZyBtdXN0IGJlIHByb3ZpZGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEZhY3RvcnlEaWN0aW9uYXJ5KGRlZmF1bHRGYWN0b3J5RnVuY3Rpb24sIHRvU3RyRnVuY3Rpb24pIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdG9TdHJGdW5jdGlvbik7XG4gICAgICAgIHRoaXMuZGVmYXVsdEZhY3RvcnlGdW5jdGlvbiA9IGRlZmF1bHRGYWN0b3J5RnVuY3Rpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFzc29jaWF0ZXMgdGhlIHNwZWNpZmllZCBkZWZhdWx0IHZhbHVlIHdpdGggdGhlIHNwZWNpZmllZCBrZXkgaW4gdGhpcyBkaWN0aW9uYXJ5LFxuICAgICAqIGlmIGl0IGRpZG4ndCBjb250YWluIHRoZSBrZXkgeWV0LiBJZiB0aGUga2V5IGV4aXN0ZWQsIHRoZSBleGlzdGluZyB2YWx1ZSB3aWxsIGJlIHVzZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSBrZXkgd2l0aCB3aGljaCB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIHRvIGJlXG4gICAgICogYXNzb2NpYXRlZC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdFZhbHVlIGRlZmF1bHQgdmFsdWUgdG8gYmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpZWQga2V5LlxuICAgICAqIEByZXR1cm4geyp9IHByZXZpb3VzIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3BlY2lmaWVkIGtleSwgb3IgdGhlIGRlZmF1bHQgdmFsdWUsXG4gICAgICogaWYgdGhlIGtleSBkaWRuJ3QgZXhpc3QgeWV0LlxuICAgICAqL1xuICAgIEZhY3RvcnlEaWN0aW9uYXJ5LnByb3RvdHlwZS5zZXREZWZhdWx0ID0gZnVuY3Rpb24gKGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciBjdXJyZW50VmFsdWUgPSBfc3VwZXIucHJvdG90eXBlLmdldFZhbHVlLmNhbGwodGhpcywga2V5KTtcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShrZXksIGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSB0byB3aGljaCB0aGlzIGRpY3Rpb25hcnkgbWFwcyB0aGUgc3BlY2lmaWVkIGtleS5cbiAgICAgKiBSZXR1cm5zIGEgZGVmYXVsdCB2YWx1ZSBjcmVhdGVkIGJ5IHRoZSBmYWN0b3J5IHBhc3NlZCBpbiB0aGUgY29uc3RydWN0b3IsXG4gICAgICogaWYgdGhpcyBkaWN0aW9uYXJ5IGNvbnRhaW5zIG5vIG1hcHBpbmcgZm9yIHRoaXMga2V5LiBUaGUgbWlzc2luZyBrZXkgd2lsbFxuICAgICAqIGF1dG9tYXRpY2FsbHkgYmUgYWRkZWQgdG8gdGhlIGRpY3Rpb25hcnkuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSBrZXkgd2hvc2UgYXNzb2NpYXRlZCB2YWx1ZSBpcyB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgdmFsdWUgdG8gd2hpY2ggdGhpcyBkaWN0aW9uYXJ5IG1hcHMgdGhlIHNwZWNpZmllZCBrZXkgb3JcbiAgICAgKiBhIGRlZmF1bHQgdmFsdWUgaWYgdGhlIG1hcCBjb250YWlucyBubyBtYXBwaW5nIGZvciB0aGlzIGtleS5cbiAgICAgKi9cbiAgICBGYWN0b3J5RGljdGlvbmFyeS5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldERlZmF1bHQoa2V5LCB0aGlzLmRlZmF1bHRGYWN0b3J5RnVuY3Rpb24oKSk7XG4gICAgfTtcbiAgICByZXR1cm4gRmFjdG9yeURpY3Rpb25hcnk7XG59KERpY3Rpb25hcnlfMS5kZWZhdWx0KSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBGYWN0b3J5RGljdGlvbmFyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZhY3RvcnlEaWN0aW9uYXJ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIGNvbGxlY3Rpb25zID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgYXJyYXlzID0gcmVxdWlyZSgnLi9hcnJheXMnKTtcbnZhciBIZWFwID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IEhlYXAuXG4gICAgICogQGNsYXNzXG4gICAgICogPHA+QSBoZWFwIGlzIGEgYmluYXJ5IHRyZWUsIHdoZXJlIHRoZSBub2RlcyBtYWludGFpbiB0aGUgaGVhcCBwcm9wZXJ0eTpcbiAgICAgKiBlYWNoIG5vZGUgaXMgc21hbGxlciB0aGFuIGVhY2ggb2YgaXRzIGNoaWxkcmVuIGFuZCB0aGVyZWZvcmUgYSBNaW5IZWFwXG4gICAgICogVGhpcyBpbXBsZW1lbnRhdGlvbiB1c2VzIGFuIGFycmF5IHRvIHN0b3JlIGVsZW1lbnRzLjwvcD5cbiAgICAgKiA8cD5JZiB0aGUgaW5zZXJ0ZWQgZWxlbWVudHMgYXJlIGN1c3RvbSBvYmplY3RzIGEgY29tcGFyZSBmdW5jdGlvbiBtdXN0IGJlIHByb3ZpZGVkLFxuICAgICAqICBhdCBjb25zdHJ1Y3Rpb24gdGltZSwgb3RoZXJ3aXNlIHRoZSA8PSwgPT09IGFuZCA+PSBvcGVyYXRvcnMgYXJlXG4gICAgICogdXNlZCB0byBjb21wYXJlIGVsZW1lbnRzLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gICAgICogIGlmIChhIGlzIGxlc3MgdGhhbiBiIGJ5IHNvbWUgb3JkZXJpbmcgY3JpdGVyaW9uKSB7XG4gICAgICogICAgIHJldHVybiAtMTtcbiAgICAgKiAgfSBpZiAoYSBpcyBncmVhdGVyIHRoYW4gYiBieSB0aGUgb3JkZXJpbmcgY3JpdGVyaW9uKSB7XG4gICAgICogICAgIHJldHVybiAxO1xuICAgICAqICB9XG4gICAgICogIC8vIGEgbXVzdCBiZSBlcXVhbCB0byBiXG4gICAgICogIHJldHVybiAwO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKlxuICAgICAqIDxwPklmIGEgTWF4LUhlYXAgaXMgd2FudGVkIChncmVhdGVyIGVsZW1lbnRzIG9uIHRvcCkgeW91IGNhbiBhIHByb3ZpZGUgYVxuICAgICAqIHJldmVyc2UgY29tcGFyZSBmdW5jdGlvbiB0byBhY2NvbXBsaXNoIHRoYXQgYmVoYXZpb3IuIEV4YW1wbGU6PC9wPlxuICAgICAqXG4gICAgICogPHByZT5cbiAgICAgKiBmdW5jdGlvbiByZXZlcnNlQ29tcGFyZShhLCBiKSB7XG4gICAgICogIGlmIChhIGlzIGxlc3MgdGhhbiBiIGJ5IHNvbWUgb3JkZXJpbmcgY3JpdGVyaW9uKSB7XG4gICAgICogICAgIHJldHVybiAxO1xuICAgICAqICB9IGlmIChhIGlzIGdyZWF0ZXIgdGhhbiBiIGJ5IHRoZSBvcmRlcmluZyBjcml0ZXJpb24pIHtcbiAgICAgKiAgICAgcmV0dXJuIC0xO1xuICAgICAqICB9XG4gICAgICogIC8vIGEgbXVzdCBiZSBlcXVhbCB0byBiXG4gICAgICogIHJldHVybiAwO1xuICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6bnVtYmVyPX0gY29tcGFyZUZ1bmN0aW9uIG9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdXNlZCB0byBjb21wYXJlIHR3byBlbGVtZW50cy4gTXVzdCByZXR1cm4gYSBuZWdhdGl2ZSBpbnRlZ2VyLFxuICAgICAqIHplcm8sIG9yIGEgcG9zaXRpdmUgaW50ZWdlciBhcyB0aGUgZmlyc3QgYXJndW1lbnQgaXMgbGVzcyB0aGFuLCBlcXVhbCB0byxcbiAgICAgKiBvciBncmVhdGVyIHRoYW4gdGhlIHNlY29uZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBIZWFwKGNvbXBhcmVGdW5jdGlvbikge1xuICAgICAgICAvKipcbiAgICAgICAgICogQXJyYXkgdXNlZCB0byBzdG9yZSB0aGUgZWxlbWVudHMgb2QgdGhlIGhlYXAuXG4gICAgICAgICAqIEB0eXBlIHtBcnJheS48T2JqZWN0Pn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLmNvbXBhcmUgPSBjb21wYXJlRnVuY3Rpb24gfHwgY29sbGVjdGlvbnMuZGVmYXVsdENvbXBhcmU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBsZWZ0IGNoaWxkIG9mIHRoZSBub2RlIGF0IHRoZSBnaXZlbiBpbmRleC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbm9kZUluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZSB0byBnZXQgdGhlIGxlZnQgY2hpbGRcbiAgICAgKiBmb3IuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGxlZnQgY2hpbGQuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBIZWFwLnByb3RvdHlwZS5sZWZ0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uIChub2RlSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICgyICogbm9kZUluZGV4KSArIDE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgcmlnaHQgY2hpbGQgb2YgdGhlIG5vZGUgYXQgdGhlIGdpdmVuIGluZGV4LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBub2RlSW5kZXggVGhlIGluZGV4IG9mIHRoZSBub2RlIHRvIGdldCB0aGUgcmlnaHQgY2hpbGRcbiAgICAgKiBmb3IuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIHJpZ2h0IGNoaWxkLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgSGVhcC5wcm90b3R5cGUucmlnaHRDaGlsZEluZGV4ID0gZnVuY3Rpb24gKG5vZGVJbmRleCkge1xuICAgICAgICByZXR1cm4gKDIgKiBub2RlSW5kZXgpICsgMjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBwYXJlbnQgb2YgdGhlIG5vZGUgYXQgdGhlIGdpdmVuIGluZGV4LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBub2RlSW5kZXggVGhlIGluZGV4IG9mIHRoZSBub2RlIHRvIGdldCB0aGUgcGFyZW50IGZvci5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgcGFyZW50LlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgSGVhcC5wcm90b3R5cGUucGFyZW50SW5kZXggPSBmdW5jdGlvbiAobm9kZUluZGV4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChub2RlSW5kZXggLSAxKSAvIDIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIHNtYWxsZXIgY2hpbGQgbm9kZSAoaWYgaXQgZXhpc3RzKS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGVmdENoaWxkIGxlZnQgY2hpbGQgaW5kZXguXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJpZ2h0Q2hpbGQgcmlnaHQgY2hpbGQgaW5kZXguXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgaW5kZXggd2l0aCB0aGUgbWluaW11bSB2YWx1ZSBvciAtMSBpZiBpdCBkb2Vzbid0XG4gICAgICogZXhpc3RzLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgSGVhcC5wcm90b3R5cGUubWluSW5kZXggPSBmdW5jdGlvbiAobGVmdENoaWxkLCByaWdodENoaWxkKSB7XG4gICAgICAgIGlmIChyaWdodENoaWxkID49IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChsZWZ0Q2hpbGQgPj0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0Q2hpbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb21wYXJlKHRoaXMuZGF0YVtsZWZ0Q2hpbGRdLCB0aGlzLmRhdGFbcmlnaHRDaGlsZF0pIDw9IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdENoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJpZ2h0Q2hpbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1vdmVzIHRoZSBub2RlIGF0IHRoZSBnaXZlbiBpbmRleCB1cCB0byBpdHMgcHJvcGVyIHBsYWNlIGluIHRoZSBoZWFwLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIG5vZGUgdG8gbW92ZSB1cC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIEhlYXAucHJvdG90eXBlLnNpZnRVcCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnRJbmRleChpbmRleCk7XG4gICAgICAgIHdoaWxlIChpbmRleCA+IDAgJiYgdGhpcy5jb21wYXJlKHRoaXMuZGF0YVtwYXJlbnRdLCB0aGlzLmRhdGFbaW5kZXhdKSA+IDApIHtcbiAgICAgICAgICAgIGFycmF5cy5zd2FwKHRoaXMuZGF0YSwgcGFyZW50LCBpbmRleCk7XG4gICAgICAgICAgICBpbmRleCA9IHBhcmVudDtcbiAgICAgICAgICAgIHBhcmVudCA9IHRoaXMucGFyZW50SW5kZXgoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBNb3ZlcyB0aGUgbm9kZSBhdCB0aGUgZ2l2ZW4gaW5kZXggZG93biB0byBpdHMgcHJvcGVyIHBsYWNlIGluIHRoZSBoZWFwLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBub2RlSW5kZXggVGhlIGluZGV4IG9mIHRoZSBub2RlIHRvIG1vdmUgZG93bi5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIEhlYXAucHJvdG90eXBlLnNpZnREb3duID0gZnVuY3Rpb24gKG5vZGVJbmRleCkge1xuICAgICAgICAvL3NtYWxsZXIgY2hpbGQgaW5kZXhcbiAgICAgICAgdmFyIG1pbiA9IHRoaXMubWluSW5kZXgodGhpcy5sZWZ0Q2hpbGRJbmRleChub2RlSW5kZXgpLCB0aGlzLnJpZ2h0Q2hpbGRJbmRleChub2RlSW5kZXgpKTtcbiAgICAgICAgd2hpbGUgKG1pbiA+PSAwICYmIHRoaXMuY29tcGFyZSh0aGlzLmRhdGFbbm9kZUluZGV4XSwgdGhpcy5kYXRhW21pbl0pID4gMCkge1xuICAgICAgICAgICAgYXJyYXlzLnN3YXAodGhpcy5kYXRhLCBtaW4sIG5vZGVJbmRleCk7XG4gICAgICAgICAgICBub2RlSW5kZXggPSBtaW47XG4gICAgICAgICAgICBtaW4gPSB0aGlzLm1pbkluZGV4KHRoaXMubGVmdENoaWxkSW5kZXgobm9kZUluZGV4KSwgdGhpcy5yaWdodENoaWxkSW5kZXgobm9kZUluZGV4KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBidXQgZG9lcyBub3QgcmVtb3ZlIHRoZSByb290IGVsZW1lbnQgb2YgdGhpcyBoZWFwLlxuICAgICAqIEByZXR1cm4geyp9IFRoZSB2YWx1ZSBhdCB0aGUgcm9vdCBvZiB0aGUgaGVhcC4gUmV0dXJucyB1bmRlZmluZWQgaWYgdGhlXG4gICAgICogaGVhcCBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBIZWFwLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBnaXZlbiBlbGVtZW50IGludG8gdGhlIGhlYXAuXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50IHRoZSBlbGVtZW50LlxuICAgICAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgYWRkZWQgb3IgZmFscyBpZiBpdCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgSGVhcC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGNvbGxlY3Rpb25zLmlzVW5kZWZpbmVkKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5wdXNoKGVsZW1lbnQpO1xuICAgICAgICB0aGlzLnNpZnRVcCh0aGlzLmRhdGEubGVuZ3RoIC0gMSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGFuZCByZW1vdmVzIHRoZSByb290IGVsZW1lbnQgb2YgdGhpcyBoZWFwLlxuICAgICAqIEByZXR1cm4geyp9IFRoZSB2YWx1ZSByZW1vdmVkIGZyb20gdGhlIHJvb3Qgb2YgdGhlIGhlYXAuIFJldHVybnNcbiAgICAgKiB1bmRlZmluZWQgaWYgdGhlIGhlYXAgaXMgZW1wdHkuXG4gICAgICovXG4gICAgSGVhcC5wcm90b3R5cGUucmVtb3ZlUm9vdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5kYXRhWzBdO1xuICAgICAgICAgICAgdGhpcy5kYXRhWzBdID0gdGhpcy5kYXRhW3RoaXMuZGF0YS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zcGxpY2UodGhpcy5kYXRhLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWZ0RG93bigwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGhlYXAgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgSGVhcCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIGZhbHNlXG4gICAgICogb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIEhlYXAucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVxdUYgPSBjb2xsZWN0aW9ucy5jb21wYXJlVG9FcXVhbHModGhpcy5jb21wYXJlKTtcbiAgICAgICAgcmV0dXJuIGFycmF5cy5jb250YWlucyh0aGlzLmRhdGEsIGVsZW1lbnQsIGVxdUYpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgaGVhcC5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBoZWFwLlxuICAgICAqL1xuICAgIEhlYXAucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoaXMgaGVhcCBpcyBlbXB0eS5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGFuZCBvbmx5IGlmIHRoaXMgaGVhcCBjb250YWlucyBubyBpdGVtczsgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgSGVhcC5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5sZW5ndGggPD0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgaGVhcC5cbiAgICAgKi9cbiAgICBIZWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kYXRhLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBoZWFwIGluXG4gICAgICogbm8gcGFydGljdWxhciBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgSGVhcC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBhcnJheXMuZm9yRWFjaCh0aGlzLmRhdGEsIGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBIZWFwO1xufSgpKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IEhlYXA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1IZWFwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgRGljdGlvbmFyeV8xID0gcmVxdWlyZSgnLi9EaWN0aW9uYXJ5Jyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHVzZWQgYnkgdGhlIExpbmtlZERpY3Rpb25hcnkgSW50ZXJuYWxseVxuICogSGFzIHRvIGJlIGEgY2xhc3MsIG5vdCBhbiBpbnRlcmZhY2UsIGJlY2F1c2UgaXQgbmVlZHMgdG8gaGF2ZVxuICogdGhlICd1bmxpbmsnIGZ1bmN0aW9uIGRlZmluZWQuXG4gKi9cbnZhciBMaW5rZWREaWN0aW9uYXJ5UGFpciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlua2VkRGljdGlvbmFyeVBhaXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBMaW5rZWREaWN0aW9uYXJ5UGFpci5wcm90b3R5cGUudW5saW5rID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnByZXYubmV4dCA9IHRoaXMubmV4dDtcbiAgICAgICAgdGhpcy5uZXh0LnByZXYgPSB0aGlzLnByZXY7XG4gICAgfTtcbiAgICByZXR1cm4gTGlua2VkRGljdGlvbmFyeVBhaXI7XG59KCkpO1xudmFyIExpbmtlZERpY3Rpb25hcnkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMaW5rZWREaWN0aW9uYXJ5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIExpbmtlZERpY3Rpb25hcnkodG9TdHJGdW5jdGlvbikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0b1N0ckZ1bmN0aW9uKTtcbiAgICAgICAgdGhpcy5oZWFkID0gbmV3IExpbmtlZERpY3Rpb25hcnlQYWlyKG51bGwsIG51bGwpO1xuICAgICAgICB0aGlzLnRhaWwgPSBuZXcgTGlua2VkRGljdGlvbmFyeVBhaXIobnVsbCwgbnVsbCk7XG4gICAgICAgIHRoaXMuaGVhZC5uZXh0ID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwucHJldiA9IHRoaXMuaGVhZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgbmV3IG5vZGUgdG8gdGhlICd0YWlsJyBvZiB0aGUgbGlzdCwgdXBkYXRpbmcgdGhlXG4gICAgICogbmVpZ2hib3JzLCBhbmQgbW92aW5nICd0aGlzLnRhaWwnICh0aGUgRW5kIG9mIExpc3QgaW5kaWNhdG9yKSB0aGF0XG4gICAgICogdG8gdGhlIGVuZC5cbiAgICAgKi9cbiAgICBMaW5rZWREaWN0aW9uYXJ5LnByb3RvdHlwZS5hcHBlbmRUb1RhaWwgPSBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgdmFyIGxhc3ROb2RlID0gdGhpcy50YWlsLnByZXY7XG4gICAgICAgIGxhc3ROb2RlLm5leHQgPSBlbnRyeTtcbiAgICAgICAgZW50cnkucHJldiA9IGxhc3ROb2RlO1xuICAgICAgICBlbnRyeS5uZXh0ID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwucHJldiA9IGVudHJ5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGEgbGlua2VkIGRpY3Rpb25hcnkgZnJvbSB0aGUgdGFibGUgaW50ZXJuYWxseVxuICAgICAqL1xuICAgIExpbmtlZERpY3Rpb25hcnkucHJvdG90eXBlLmdldExpbmtlZERpY3Rpb25hcnlQYWlyID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrID0gJyQnICsgdGhpcy50b1N0cihrZXkpO1xuICAgICAgICB2YXIgcGFpciA9ICh0aGlzLnRhYmxlW2tdKTtcbiAgICAgICAgcmV0dXJuIHBhaXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSB0byB3aGljaCB0aGlzIGRpY3Rpb25hcnkgbWFwcyB0aGUgc3BlY2lmaWVkIGtleS5cbiAgICAgKiBSZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGlzIGRpY3Rpb25hcnkgY29udGFpbnMgbm8gbWFwcGluZyBmb3IgdGhpcyBrZXkuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSBrZXkgd2hvc2UgYXNzb2NpYXRlZCB2YWx1ZSBpcyB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgdmFsdWUgdG8gd2hpY2ggdGhpcyBkaWN0aW9uYXJ5IG1hcHMgdGhlIHNwZWNpZmllZCBrZXkgb3JcbiAgICAgKiB1bmRlZmluZWQgaWYgdGhlIG1hcCBjb250YWlucyBubyBtYXBwaW5nIGZvciB0aGlzIGtleS5cbiAgICAgKi9cbiAgICBMaW5rZWREaWN0aW9uYXJ5LnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHBhaXIgPSB0aGlzLmdldExpbmtlZERpY3Rpb25hcnlQYWlyKGtleSk7XG4gICAgICAgIGlmICghdXRpbC5pc1VuZGVmaW5lZChwYWlyKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhaXIudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIG1hcHBpbmcgZm9yIHRoaXMga2V5IGZyb20gdGhpcyBkaWN0aW9uYXJ5IGlmIGl0IGlzIHByZXNlbnQuXG4gICAgICogQWxzbywgaWYgYSB2YWx1ZSBpcyBwcmVzZW50IGZvciB0aGlzIGtleSwgdGhlIGVudHJ5IGlzIHJlbW92ZWQgZnJvbSB0aGVcbiAgICAgKiBpbnNlcnRpb24gb3JkZXJpbmcuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSBrZXkgd2hvc2UgbWFwcGluZyBpcyB0byBiZSByZW1vdmVkIGZyb20gdGhlXG4gICAgICogZGljdGlvbmFyeS5cbiAgICAgKiBAcmV0dXJuIHsqfSBwcmV2aW91cyB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggc3BlY2lmaWVkIGtleSwgb3IgdW5kZWZpbmVkIGlmXG4gICAgICogdGhlcmUgd2FzIG5vIG1hcHBpbmcgZm9yIGtleS5cbiAgICAgKi9cbiAgICBMaW5rZWREaWN0aW9uYXJ5LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBwYWlyID0gdGhpcy5nZXRMaW5rZWREaWN0aW9uYXJ5UGFpcihrZXkpO1xuICAgICAgICBpZiAoIXV0aWwuaXNVbmRlZmluZWQocGFpcikpIHtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUucmVtb3ZlLmNhbGwodGhpcywga2V5KTsgLy8gVGhpcyB3aWxsIHJlbW92ZSBpdCBmcm9tIHRoZSB0YWJsZVxuICAgICAgICAgICAgcGFpci51bmxpbmsoKTsgLy8gVGhpcyB3aWxsIHVubGluayBpdCBmcm9tIHRoZSBjaGFpblxuICAgICAgICAgICAgcmV0dXJuIHBhaXIudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICogUmVtb3ZlcyBhbGwgbWFwcGluZ3MgZnJvbSB0aGlzIExpbmtlZERpY3Rpb25hcnkuXG4gICAgKiBAdGhpcyB7Y29sbGVjdGlvbnMuTGlua2VkRGljdGlvbmFyeX1cbiAgICAqL1xuICAgIExpbmtlZERpY3Rpb25hcnkucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNsZWFyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuaGVhZC5uZXh0ID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwucHJldiA9IHRoaXMuaGVhZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEludGVybmFsIGZ1bmN0aW9uIHVzZWQgd2hlbiB1cGRhdGluZyBhbiBleGlzdGluZyBLZXlWYWx1ZSBwYWlyLlxuICAgICAqIEl0IHBsYWNlcyB0aGUgbmV3IHZhbHVlIGluZGV4ZWQgYnkga2V5IGludG8gdGhlIHRhYmxlLCBidXQgbWFpbnRhaW5zXG4gICAgICogaXRzIHBsYWNlIGluIHRoZSBsaW5rZWQgb3JkZXJpbmcuXG4gICAgICovXG4gICAgTGlua2VkRGljdGlvbmFyeS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChvbGRQYWlyLCBuZXdQYWlyKSB7XG4gICAgICAgIHZhciBrID0gJyQnICsgdGhpcy50b1N0cihuZXdQYWlyLmtleSk7XG4gICAgICAgIC8vIHNldCB0aGUgbmV3IFBhaXIncyBsaW5rcyB0byBleGlzdGluZ1BhaXIncyBsaW5rc1xuICAgICAgICBuZXdQYWlyLm5leHQgPSBvbGRQYWlyLm5leHQ7XG4gICAgICAgIG5ld1BhaXIucHJldiA9IG9sZFBhaXIucHJldjtcbiAgICAgICAgLy8gRGVsZXRlIEV4aXN0aW5nIFBhaXIgZnJvbSB0aGUgdGFibGUsIHVubGluayBpdCBmcm9tIGNoYWluLlxuICAgICAgICAvLyBBcyBhIHJlc3VsdCwgdGhlIG5FbGVtZW50cyBnZXRzIGRlY3JlbWVudGVkIGJ5IHRoaXMgb3BlcmF0aW9uXG4gICAgICAgIHRoaXMucmVtb3ZlKG9sZFBhaXIua2V5KTtcbiAgICAgICAgLy8gTGluayBuZXcgUGFpciBpbiBwbGFjZSBvZiB3aGVyZSBvbGRQYWlyIHdhcyxcbiAgICAgICAgLy8gYnkgcG9pbnRpbmcgdGhlIG9sZCBwYWlyJ3MgbmVpZ2hib3JzIHRvIGl0LlxuICAgICAgICBuZXdQYWlyLnByZXYubmV4dCA9IG5ld1BhaXI7XG4gICAgICAgIG5ld1BhaXIubmV4dC5wcmV2ID0gbmV3UGFpcjtcbiAgICAgICAgdGhpcy50YWJsZVtrXSA9IG5ld1BhaXI7XG4gICAgICAgIC8vIFRvIG1ha2UgdXAgZm9yIHRoZSBmYWN0IHRoYXQgdGhlIG51bWJlciBvZiBlbGVtZW50cyB3YXMgZGVjcmVtZW50ZWQsXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gaW5jcmVhc2UgaXQgYnkgb25lLlxuICAgICAgICArK3RoaXMubkVsZW1lbnRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXNzb2NpYXRlcyB0aGUgc3BlY2lmaWVkIHZhbHVlIHdpdGggdGhlIHNwZWNpZmllZCBrZXkgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICAqIElmIHRoZSBkaWN0aW9uYXJ5IHByZXZpb3VzbHkgY29udGFpbmVkIGEgbWFwcGluZyBmb3IgdGhpcyBrZXksIHRoZSBvbGRcbiAgICAgKiB2YWx1ZSBpcyByZXBsYWNlZCBieSB0aGUgc3BlY2lmaWVkIHZhbHVlLlxuICAgICAqIFVwZGF0aW5nIG9mIGEga2V5IHRoYXQgYWxyZWFkeSBleGlzdHMgbWFpbnRhaW5zIGl0cyBwbGFjZSBpbiB0aGVcbiAgICAgKiBpbnNlcnRpb24gb3JkZXIgaW50byB0aGUgbWFwLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkga2V5IHdpdGggd2hpY2ggdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyB0byBiZVxuICAgICAqIGFzc29jaWF0ZWQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIHZhbHVlIHRvIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3BlY2lmaWVkIGtleS5cbiAgICAgKiBAcmV0dXJuIHsqfSBwcmV2aW91cyB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmllZCBrZXksIG9yIHVuZGVmaW5lZCBpZlxuICAgICAqIHRoZXJlIHdhcyBubyBtYXBwaW5nIGZvciB0aGUga2V5IG9yIGlmIHRoZSBrZXkvdmFsdWUgYXJlIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBMaW5rZWREaWN0aW9uYXJ5LnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGtleSkgfHwgdXRpbC5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV4aXN0aW5nUGFpciA9IHRoaXMuZ2V0TGlua2VkRGljdGlvbmFyeVBhaXIoa2V5KTtcbiAgICAgICAgdmFyIG5ld1BhaXIgPSBuZXcgTGlua2VkRGljdGlvbmFyeVBhaXIoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHZhciBrID0gJyQnICsgdGhpcy50b1N0cihrZXkpO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IGFuIGVsZW1lbnQgZm9yIHRoYXQga2V5LCB3ZVxuICAgICAgICAvLyBrZWVwIGl0J3MgcGxhY2UgaW4gdGhlIExpbmtlZExpc3RcbiAgICAgICAgaWYgKCF1dGlsLmlzVW5kZWZpbmVkKGV4aXN0aW5nUGFpcikpIHtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZShleGlzdGluZ1BhaXIsIG5ld1BhaXIpO1xuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nUGFpci52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kVG9UYWlsKG5ld1BhaXIpO1xuICAgICAgICAgICAgdGhpcy50YWJsZVtrXSA9IG5ld1BhaXI7XG4gICAgICAgICAgICArK3RoaXMubkVsZW1lbnRzO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUga2V5cyBpbiB0aGlzIExpbmtlZERpY3Rpb25hcnksIG9yZGVyZWRcbiAgICAgKiBieSBpbnNlcnRpb24gb3JkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBrZXlzIGluIHRoaXMgTGlua2VkRGljdGlvbmFyeSxcbiAgICAgKiBvcmRlcmVkIGJ5IGluc2VydGlvbiBvcmRlci5cbiAgICAgKi9cbiAgICBMaW5rZWREaWN0aW9uYXJ5LnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBhcnJheS5wdXNoKGtleSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSB2YWx1ZXMgaW4gdGhpcyBMaW5rZWREaWN0aW9uYXJ5LCBvcmRlcmVkIGJ5XG4gICAgICogaW5zZXJ0aW9uIG9yZGVyLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgdmFsdWVzIGluIHRoaXMgTGlua2VkRGljdGlvbmFyeSxcbiAgICAgKiBvcmRlcmVkIGJ5IGluc2VydGlvbiBvcmRlci5cbiAgICAgKi9cbiAgICBMaW5rZWREaWN0aW9uYXJ5LnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2godmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG4gICAgLyoqXG4gICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBrZXktdmFsdWUgcGFpclxuICAgICogcHJlc2VudCBpbiB0aGlzIExpbmtlZERpY3Rpb25hcnkuIEl0IGlzIGRvbmUgaW4gdGhlIG9yZGVyIG9mIGluc2VydGlvblxuICAgICogaW50byB0aGUgTGlua2VkRGljdGlvbmFyeVxuICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICogaW52b2tlZCB3aXRoIHR3byBhcmd1bWVudHM6IGtleSBhbmQgdmFsdWUuIFRvIGJyZWFrIHRoZSBpdGVyYXRpb24geW91IGNhblxuICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgKi9cbiAgICBMaW5rZWREaWN0aW9uYXJ5LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjcmF3bE5vZGUgPSB0aGlzLmhlYWQubmV4dDtcbiAgICAgICAgd2hpbGUgKGNyYXdsTm9kZS5uZXh0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhciByZXQgPSBjYWxsYmFjayhjcmF3bE5vZGUua2V5LCBjcmF3bE5vZGUudmFsdWUpO1xuICAgICAgICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcmF3bE5vZGUgPSBjcmF3bE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIExpbmtlZERpY3Rpb25hcnk7XG59KERpY3Rpb25hcnlfMS5kZWZhdWx0KSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBMaW5rZWREaWN0aW9uYXJ5OyAvLyBFbmQgb2YgTGlua2VkRGljdGlvbmFyeVxuLy8gLyoqXG4vLyAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBkaWN0aW9uYXJ5IGlzIGVxdWFsIHRvIHRoZSBnaXZlbiBkaWN0aW9uYXJ5LlxuLy8gICogVHdvIGRpY3Rpb25hcmllcyBhcmUgZXF1YWwgaWYgdGhleSBjb250YWluIHRoZSBzYW1lIG1hcHBpbmdzLlxuLy8gICogQHBhcmFtIHtjb2xsZWN0aW9ucy5EaWN0aW9uYXJ5fSBvdGhlciB0aGUgb3RoZXIgZGljdGlvbmFyeS5cbi8vICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IHZhbHVlc0VxdWFsRnVuY3Rpb24gb3B0aW9uYWxcbi8vICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIHZhbHVlcyBhcmUgZXF1YWwuXG4vLyAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgZGljdGlvbmFyeSBpcyBlcXVhbCB0byB0aGUgZ2l2ZW4gZGljdGlvbmFyeS5cbi8vICAqL1xuLy8gY29sbGVjdGlvbnMuRGljdGlvbmFyeS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24ob3RoZXIsdmFsdWVzRXF1YWxGdW5jdGlvbikge1xuLy8gXHRjb25zdCBlcUYgPSB2YWx1ZXNFcXVhbEZ1bmN0aW9uIHx8IGNvbGxlY3Rpb25zLmRlZmF1bHRFcXVhbHM7XG4vLyBcdGlmKCEob3RoZXIgaW5zdGFuY2VvZiBjb2xsZWN0aW9ucy5EaWN0aW9uYXJ5KSl7XG4vLyBcdFx0cmV0dXJuIGZhbHNlO1xuLy8gXHR9XG4vLyBcdGlmKHRoaXMuc2l6ZSgpICE9PSBvdGhlci5zaXplKCkpe1xuLy8gXHRcdHJldHVybiBmYWxzZTtcbi8vIFx0fVxuLy8gXHRyZXR1cm4gdGhpcy5lcXVhbHNBdXgodGhpcy5maXJzdE5vZGUsb3RoZXIuZmlyc3ROb2RlLGVxRik7XG4vLyB9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MaW5rZWREaWN0aW9uYXJ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBhcnJheXMgPSByZXF1aXJlKCcuL2FycmF5cycpO1xudmFyIExpbmtlZExpc3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICogQ3JlYXRlcyBhbiBlbXB0eSBMaW5rZWQgTGlzdC5cbiAgICAqIEBjbGFzcyBBIGxpbmtlZCBsaXN0IGlzIGEgZGF0YSBzdHJ1Y3R1cmUgY29uc2lzdGluZyBvZiBhIGdyb3VwIG9mIG5vZGVzXG4gICAgKiB3aGljaCB0b2dldGhlciByZXByZXNlbnQgYSBzZXF1ZW5jZS5cbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICovXG4gICAgZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICogRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdFxuICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICogQHByaXZhdGVcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgKiBMYXN0IG5vZGUgaW4gdGhlIGxpc3RcbiAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICovXG4gICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgKiBOdW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGxpc3RcbiAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICovXG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBBZGRzIGFuIGVsZW1lbnQgdG8gdGhpcyBsaXN0LlxuICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gZWxlbWVudCB0byBiZSBhZGRlZC5cbiAgICAqIEBwYXJhbSB7bnVtYmVyPX0gaW5kZXggb3B0aW9uYWwgaW5kZXggdG8gYWRkIHRoZSBlbGVtZW50LiBJZiBubyBpbmRleCBpcyBzcGVjaWZpZWRcbiAgICAqIHRoZSBlbGVtZW50IGlzIGFkZGVkIHRvIHRoZSBlbmQgb2YgdGhpcyBsaXN0LlxuICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgYWRkZWQgb3IgZmFsc2UgaWYgdGhlIGluZGV4IGlzIGludmFsaWRcbiAgICAqIG9yIGlmIHRoZSBlbGVtZW50IGlzIHVuZGVmaW5lZC5cbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZChpbmRleCkpIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5uRWxlbWVudHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMubkVsZW1lbnRzIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3Tm9kZSA9IHRoaXMuY3JlYXRlTm9kZShpdGVtKTtcbiAgICAgICAgaWYgKHRoaXMubkVsZW1lbnRzID09PSAwKSB7XG4gICAgICAgICAgICAvLyBGaXJzdCBub2RlIGluIHRoZSBsaXN0LlxuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBuZXdOb2RlO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IHRoaXMubkVsZW1lbnRzKSB7XG4gICAgICAgICAgICAvLyBJbnNlcnQgYXQgdGhlIGVuZC5cbiAgICAgICAgICAgIHRoaXMubGFzdE5vZGUubmV4dCA9IG5ld05vZGU7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gQ2hhbmdlIGZpcnN0IG5vZGUuXG4gICAgICAgICAgICBuZXdOb2RlLm5leHQgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gdGhpcy5ub2RlQXRJbmRleChpbmRleCAtIDEpO1xuICAgICAgICAgICAgbmV3Tm9kZS5uZXh0ID0gcHJldi5uZXh0O1xuICAgICAgICAgICAgcHJldi5uZXh0ID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5FbGVtZW50cysrO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGlzIGxpc3QuXG4gICAgKiBAcmV0dXJuIHsqfSB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCBvciB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXNcbiAgICAqIGVtcHR5LlxuICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmZpcnN0Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3ROb2RlLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICogUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IGluIHRoaXMgbGlzdC5cbiAgICAqIEByZXR1cm4geyp9IHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGxpc3Qgb3IgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzXG4gICAgKiBlbXB0eS5cbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3ROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0Tm9kZS5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50IGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhpcyBsaXN0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBkZXNpcmVkIGluZGV4LlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCBvciB1bmRlZmluZWQgaWYgdGhlIGluZGV4IGlzXG4gICAgICogb3V0IG9mIGJvdW5kcy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5lbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZUF0SW5kZXgoaW5kZXgpO1xuICAgICAgICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZS5lbGVtZW50O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggaW4gdGhpcyBsaXN0IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZVxuICAgICAqIHNwZWNpZmllZCBlbGVtZW50LCBvciAtMSBpZiB0aGUgTGlzdCBkb2VzIG5vdCBjb250YWluIHRoaXMgZWxlbWVudC5cbiAgICAgKiA8cD5JZiB0aGUgZWxlbWVudHMgaW5zaWRlIHRoaXMgbGlzdCBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBPcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBpbmRleCBpbiB0aGlzIGxpc3Qgb2YgdGhlIGZpcnN0IG9jY3VycmVuY2VcbiAgICAgKiBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIG9yIC0xIGlmIHRoaXMgbGlzdCBkb2VzIG5vdCBjb250YWluIHRoZVxuICAgICAqIGVsZW1lbnQuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXF1YWxzRiA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgaWYgKHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBsaXN0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhlIGxpc3QgYXJlXG4gICAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAgICogcHJvdmlkZWQgdG8gcGVyZm9ybSBzZWFyY2hlcywgdGhlIGZ1bmN0aW9uIG11c3QgcmVjZWl2ZSB0d28gYXJndW1lbnRzIGFuZFxuICAgICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICAgKlxuICAgICAgICogPHByZT5cbiAgICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSA9IGZ1bmN0aW9uKHBldDEsIHBldDIpIHtcbiAgICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICAgKiB9XG4gICAgICAgKiA8L3ByZT5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIE9wdGlvbmFsXG4gICAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsIGZhbHNlXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICByZXR1cm4gKHRoaXMuaW5kZXhPZihpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbiB0aGlzIGxpc3QuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGUgbGlzdCBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lID0gZnVuY3Rpb24ocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIGVsZW1lbnQgdG8gYmUgcmVtb3ZlZCBmcm9tIHRoaXMgbGlzdCwgaWYgcHJlc2VudC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBsaXN0IGNvbnRhaW5lZCB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBlcXVhbHNGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPCAxIHx8IHV0aWwuaXNVbmRlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgd2hpbGUgKGN1cnJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZXF1YWxzRihjdXJyZW50Tm9kZS5lbGVtZW50LCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZSA9PT0gdGhpcy5maXJzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSB0aGlzLmZpcnN0Tm9kZS5uZXh0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IHRoaXMubGFzdE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnROb2RlID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdE5vZGUgPSBwcmV2aW91cztcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMubmV4dCA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5FbGVtZW50cy0tO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldmlvdXMgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZWxlbWVudHMgZnJvbSB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMubkVsZW1lbnRzID0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICogVHdvIGxpc3RzIGFyZSBlcXVhbCBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgb3JkZXIuXG4gICAgICogQHBhcmFtIHtMaW5rZWRMaXN0fSBvdGhlciB0aGUgb3RoZXIgbGlzdC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHVzZWQgdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC4gSWYgdGhlIGVsZW1lbnRzIGluIHRoZSBsaXN0c1xuICAgICAqIGFyZSBjdXN0b20gb2JqZWN0cyB5b3Ugc2hvdWxkIHByb3ZpZGUgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlXG4gICAgICogdGhlID09PSBvcGVyYXRvciBpcyB1c2VkIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIGxpc3QgaXMgZXF1YWwgdG8gdGhlIGdpdmVuIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG90aGVyLCBlcXVhbHNGdW5jdGlvbikge1xuICAgICAgICB2YXIgZXFGID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgICAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIExpbmtlZExpc3QpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSgpICE9PSBvdGhlci5zaXplKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHNBdXgodGhpcy5maXJzdE5vZGUsIG90aGVyLmZpcnN0Tm9kZSwgZXFGKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmVxdWFsc0F1eCA9IGZ1bmN0aW9uIChuMSwgbjIsIGVxRikge1xuICAgICAgICB3aGlsZSAobjEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICghZXFGKG4xLmVsZW1lbnQsIG4yLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbjEgPSBuMS5uZXh0O1xuICAgICAgICAgICAgbjIgPSBuMi5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZWxlbWVudCBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoaXMgbGlzdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggZ2l2ZW4gaW5kZXguXG4gICAgICogQHJldHVybiB7Kn0gcmVtb3ZlZCBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiB0aGUgaW5kZXggaXMgb3V0IG9mIGJvdW5kcy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmVFbGVtZW50QXRJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubkVsZW1lbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICBpZiAodGhpcy5uRWxlbWVudHMgPT09IDEpIHtcbiAgICAgICAgICAgIC8vRmlyc3Qgbm9kZSBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLmZpcnN0Tm9kZS5lbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5maXJzdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcHJldmlvdXMgPSB0aGlzLm5vZGVBdEluZGV4KGluZGV4IC0gMSk7XG4gICAgICAgICAgICBpZiAocHJldmlvdXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gdGhpcy5maXJzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Tm9kZSA9IHRoaXMuZmlyc3ROb2RlLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcmV2aW91cy5uZXh0ID09PSB0aGlzLmxhc3ROb2RlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMubGFzdE5vZGUuZWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3ROb2RlID0gcHJldmlvdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJldmlvdXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcHJldmlvdXMubmV4dC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHByZXZpb3VzLm5leHQgPSBwcmV2aW91cy5uZXh0Lm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uRWxlbWVudHMtLTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gb25jZSBmb3IgZWFjaCBlbGVtZW50IHByZXNlbnQgaW4gdGhpcyBsaXN0IGluIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayhjdXJyZW50Tm9kZS5lbGVtZW50KSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV2ZXJzZXMgdGhlIG9yZGVyIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpbmtlZCBsaXN0IChtYWtlcyB0aGUgbGFzdFxuICAgICAqIGVsZW1lbnQgZmlyc3QsIGFuZCB0aGUgZmlyc3QgZWxlbWVudCBsYXN0KS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJldmlvdXMgPSBudWxsO1xuICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuZmlyc3ROb2RlO1xuICAgICAgICB2YXIgdGVtcCA9IG51bGw7XG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0ZW1wID0gY3VycmVudC5uZXh0O1xuICAgICAgICAgICAgY3VycmVudC5uZXh0ID0gcHJldmlvdXM7XG4gICAgICAgICAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XG4gICAgICAgICAgICBjdXJyZW50ID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICB0ZW1wID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHRoaXMuZmlyc3ROb2RlID0gdGhpcy5sYXN0Tm9kZTtcbiAgICAgICAgdGhpcy5sYXN0Tm9kZSA9IHRlbXA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIGxpc3QgaW4gcHJvcGVyXG4gICAgICogc2VxdWVuY2UuXG4gICAgICogQHJldHVybiB7QXJyYXkuPCo+fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgZWxlbWVudHMgaW4gdGhpcyBsaXN0LFxuICAgICAqIGluIHByb3BlciBzZXF1ZW5jZS5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5maXJzdE5vZGU7XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChjdXJyZW50Tm9kZS5lbGVtZW50KTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBsaXN0LlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIGxpc3QuXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubkVsZW1lbnRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgbGlzdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRWxlbWVudHMgPD0gMDtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJyYXlzLnRvU3RyaW5nKHRoaXMudG9BcnJheSgpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgTGlua2VkTGlzdC5wcm90b3R5cGUubm9kZUF0SW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLm5FbGVtZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09PSAodGhpcy5uRWxlbWVudHMgLSAxKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmZpcnN0Tm9kZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleDsgaSsrKSB7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5jcmVhdGVOb2RlID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGl0ZW0sXG4gICAgICAgICAgICBuZXh0OiBudWxsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gTGlua2VkTGlzdDtcbn0oKSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBMaW5rZWRMaXN0OyAvLyBFbmQgb2YgbGlua2VkIGxpc3Rcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxpbmtlZExpc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xudmFyIERpY3Rpb25hcnlfMSA9IHJlcXVpcmUoJy4vRGljdGlvbmFyeScpO1xudmFyIGFycmF5cyA9IHJlcXVpcmUoJy4vYXJyYXlzJyk7XG52YXIgTXVsdGlEaWN0aW9uYXJ5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IG11bHRpIGRpY3Rpb25hcnkuXG4gICAgICogQGNsYXNzIDxwPkEgbXVsdGkgZGljdGlvbmFyeSBpcyBhIHNwZWNpYWwga2luZCBvZiBkaWN0aW9uYXJ5IHRoYXQgaG9sZHNcbiAgICAgKiBtdWx0aXBsZSB2YWx1ZXMgYWdhaW5zdCBlYWNoIGtleS4gU2V0dGluZyBhIHZhbHVlIGludG8gdGhlIGRpY3Rpb25hcnkgd2lsbFxuICAgICAqIGFkZCB0aGUgdmFsdWUgdG8gYW4gYXJyYXkgYXQgdGhhdCBrZXkuIEdldHRpbmcgYSBrZXkgd2lsbCByZXR1cm4gYW4gYXJyYXksXG4gICAgICogaG9sZGluZyBhbGwgdGhlIHZhbHVlcyBzZXQgdG8gdGhhdCBrZXkuXG4gICAgICogWW91IGNhbiBjb25maWd1cmUgdG8gYWxsb3cgZHVwbGljYXRlcyBpbiB0aGUgdmFsdWVzLlxuICAgICAqIFRoaXMgaW1wbGVtZW50YXRpb24gYWNjZXB0cyBhbnkga2luZCBvZiBvYmplY3RzIGFzIGtleXMuPC9wPlxuICAgICAqXG4gICAgICogPHA+SWYgdGhlIGtleXMgYXJlIGN1c3RvbSBvYmplY3RzIGEgZnVuY3Rpb24gd2hpY2ggY29udmVydHMga2V5cyB0byBzdHJpbmdzIG11c3QgYmVcbiAgICAgKiBwcm92aWRlZC4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGZ1bmN0aW9uIHBldFRvU3RyaW5nKHBldCkge1xuICAgICAgICogIHJldHVybiBwZXQubmFtZTtcbiAgICAgICAqIH1cbiAgICAgKiA8L3ByZT5cbiAgICAgKiA8cD5JZiB0aGUgdmFsdWVzIGFyZSBjdXN0b20gb2JqZWN0cyBhIGZ1bmN0aW9uIHRvIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gdmFsdWVzXG4gICAgICogbXVzdCBiZSBwcm92aWRlZC4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGZ1bmN0aW9uIHBldHNBcmVFcXVhbEJ5QWdlKHBldDEscGV0Mikge1xuICAgICAgICogIHJldHVybiBwZXQxLmFnZT09PXBldDIuYWdlO1xuICAgICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KTpzdHJpbmc9fSB0b1N0ckZ1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uXG4gICAgICogdG8gY29udmVydCBrZXlzIHRvIHN0cmluZ3MuIElmIHRoZSBrZXlzIGFyZW4ndCBzdHJpbmdzIG9yIGlmIHRvU3RyaW5nKClcbiAgICAgKiBpcyBub3QgYXBwcm9wcmlhdGUsIGEgY3VzdG9tIGZ1bmN0aW9uIHdoaWNoIHJlY2VpdmVzIGEga2V5IGFuZCByZXR1cm5zIGFcbiAgICAgKiB1bmlxdWUgc3RyaW5nIG11c3QgYmUgcHJvdmlkZWQuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gdmFsdWVzRXF1YWxzRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB0byBjaGVjayBpZiB0d28gdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhbGxvd0R1cGxpY2F0ZVZhbHVlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIE11bHRpRGljdGlvbmFyeSh0b1N0ckZ1bmN0aW9uLCB2YWx1ZXNFcXVhbHNGdW5jdGlvbiwgYWxsb3dEdXBsaWNhdGVWYWx1ZXMpIHtcbiAgICAgICAgaWYgKGFsbG93RHVwbGljYXRlVmFsdWVzID09PSB2b2lkIDApIHsgYWxsb3dEdXBsaWNhdGVWYWx1ZXMgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLmRpY3QgPSBuZXcgRGljdGlvbmFyeV8xLmRlZmF1bHQodG9TdHJGdW5jdGlvbik7XG4gICAgICAgIHRoaXMuZXF1YWxzRiA9IHZhbHVlc0VxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICAgICAgdGhpcy5hbGxvd0R1cGxpY2F0ZSA9IGFsbG93RHVwbGljYXRlVmFsdWVzO1xuICAgIH1cbiAgICAvKipcbiAgICAqIFJldHVybnMgYW4gYXJyYXkgaG9sZGluZyB0aGUgdmFsdWVzIHRvIHdoaWNoIHRoaXMgZGljdGlvbmFyeSBtYXBzXG4gICAgKiB0aGUgc3BlY2lmaWVkIGtleS5cbiAgICAqIFJldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgdGhpcyBkaWN0aW9uYXJ5IGNvbnRhaW5zIG5vIG1hcHBpbmdzIGZvciB0aGlzIGtleS5cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBrZXkga2V5IHdob3NlIGFzc29jaWF0ZWQgdmFsdWVzIGFyZSB0byBiZSByZXR1cm5lZC5cbiAgICAqIEByZXR1cm4ge0FycmF5fSBhbiBhcnJheSBob2xkaW5nIHRoZSB2YWx1ZXMgdG8gd2hpY2ggdGhpcyBkaWN0aW9uYXJ5IG1hcHNcbiAgICAqIHRoZSBzcGVjaWZpZWQga2V5LlxuICAgICovXG4gICAgTXVsdGlEaWN0aW9uYXJ5LnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IHRoaXMuZGljdC5nZXRWYWx1ZShrZXkpO1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZCh2YWx1ZXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5cy5jb3B5KHZhbHVlcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSB2YWx1ZSB0byB0aGUgYXJyYXkgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpZWQga2V5LCBpZlxuICAgICAqIGl0IGlzIG5vdCBhbHJlYWR5IHByZXNlbnQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSBrZXkgd2l0aCB3aGljaCB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIHRvIGJlXG4gICAgICogYXNzb2NpYXRlZC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgdGhlIHZhbHVlIHRvIGFkZCB0byB0aGUgYXJyYXkgYXQgdGhlIGtleVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHZhbHVlIHdhcyBub3QgYWxyZWFkeSBhc3NvY2lhdGVkIHdpdGggdGhhdCBrZXkuXG4gICAgICovXG4gICAgTXVsdGlEaWN0aW9uYXJ5LnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICh1dGlsLmlzVW5kZWZpbmVkKGtleSkgfHwgdXRpbC5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuY29udGFpbnNLZXkoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5kaWN0LnNldFZhbHVlKGtleSwgW3ZhbHVlXSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXJyYXkgPSB0aGlzLmRpY3QuZ2V0VmFsdWUoa2V5KTtcbiAgICAgICAgaWYgKCF0aGlzLmFsbG93RHVwbGljYXRlKSB7XG4gICAgICAgICAgICBpZiAoYXJyYXlzLmNvbnRhaW5zKGFycmF5LCB2YWx1ZSwgdGhpcy5lcXVhbHNGKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhcnJheS5wdXNoKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgdmFsdWVzIGZyb20gdGhlIGFycmF5IG9mIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggdGhlXG4gICAgICogc3BlY2lmaWVkIGtleS4gSWYgYSB2YWx1ZSBpc24ndCBnaXZlbiwgYWxsIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmllZFxuICAgICAqIGtleSBhcmUgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0ga2V5IGtleSB3aG9zZSBtYXBwaW5nIGlzIHRvIGJlIHJlbW92ZWQgZnJvbSB0aGVcbiAgICAgKiBkaWN0aW9uYXJ5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0PX0gdmFsdWUgb3B0aW9uYWwgYXJndW1lbnQgdG8gc3BlY2lmeSB0aGUgdmFsdWUgdG8gcmVtb3ZlXG4gICAgICogZnJvbSB0aGUgYXJyYXkgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpZWQga2V5LlxuICAgICAqIEByZXR1cm4geyp9IHRydWUgaWYgdGhlIGRpY3Rpb25hcnkgY2hhbmdlZCwgZmFsc2UgaWYgdGhlIGtleSBkb2Vzbid0IGV4aXN0IG9yXG4gICAgICogaWYgdGhlIHNwZWNpZmllZCB2YWx1ZSBpc24ndCBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmllZCBrZXkuXG4gICAgICovXG4gICAgTXVsdGlEaWN0aW9uYXJ5LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodXRpbC5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhciB2ID0gdGhpcy5kaWN0LnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuICF1dGlsLmlzVW5kZWZpbmVkKHYpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhcnJheSA9IHRoaXMuZGljdC5nZXRWYWx1ZShrZXkpO1xuICAgICAgICBpZiAoYXJyYXlzLnJlbW92ZShhcnJheSwgdmFsdWUsIHRoaXMuZXF1YWxzRikpIHtcbiAgICAgICAgICAgIGlmIChhcnJheS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpY3QucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBrZXlzIGluIHRoaXMgZGljdGlvbmFyeS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGtleXMgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICAqL1xuICAgIE11bHRpRGljdGlvbmFyeS5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGljdC5rZXlzKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSB2YWx1ZXMgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgdmFsdWVzIGluIHRoaXMgZGljdGlvbmFyeS5cbiAgICAgKi9cbiAgICBNdWx0aURpY3Rpb25hcnkucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IHRoaXMuZGljdC52YWx1ZXMoKTtcbiAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgdmFsdWVzXzEgPSB2YWx1ZXM7IF9pIDwgdmFsdWVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgdiA9IHZhbHVlc18xW19pXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgdl8xID0gdjsgX2EgPCB2XzEubGVuZ3RoOyBfYSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHcgPSB2XzFbX2FdO1xuICAgICAgICAgICAgICAgIGFycmF5LnB1c2godyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgZGljdGlvbmFyeSBhdCBsZWFzdCBvbmUgdmFsdWUgYXNzb2NpYXR0ZWQgdGhlIHNwZWNpZmllZCBrZXkuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGtleSBrZXkgd2hvc2UgcHJlc2VuY2UgaW4gdGhpcyBkaWN0aW9uYXJ5IGlzIHRvIGJlXG4gICAgICogdGVzdGVkLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBkaWN0aW9uYXJ5IGF0IGxlYXN0IG9uZSB2YWx1ZSBhc3NvY2lhdHRlZFxuICAgICAqIHRoZSBzcGVjaWZpZWQga2V5LlxuICAgICAqL1xuICAgIE11bHRpRGljdGlvbmFyeS5wcm90b3R5cGUuY29udGFpbnNLZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpY3QuY29udGFpbnNLZXkoa2V5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG1hcHBpbmdzIGZyb20gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICAqL1xuICAgIE11bHRpRGljdGlvbmFyeS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGljdC5jbGVhcigpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGtleXMgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBrZXktdmFsdWUgbWFwcGluZ3MgaW4gdGhpcyBkaWN0aW9uYXJ5LlxuICAgICAqL1xuICAgIE11bHRpRGljdGlvbmFyeS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGljdC5zaXplKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBkaWN0aW9uYXJ5IGNvbnRhaW5zIG5vIG1hcHBpbmdzLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBkaWN0aW9uYXJ5IGNvbnRhaW5zIG5vIG1hcHBpbmdzLlxuICAgICAqL1xuICAgIE11bHRpRGljdGlvbmFyeS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGljdC5pc0VtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gTXVsdGlEaWN0aW9uYXJ5O1xufSgpKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IE11bHRpRGljdGlvbmFyeTsgLy8gZW5kIG9mIG11bHRpIGRpY3Rpb25hcnlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU11bHRpRGljdGlvbmFyeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBEaXJlY3Rpb247XG4oZnVuY3Rpb24gKERpcmVjdGlvbikge1xuICAgIERpcmVjdGlvbltEaXJlY3Rpb25bXCJCRUZPUkVcIl0gPSAwXSA9IFwiQkVGT1JFXCI7XG4gICAgRGlyZWN0aW9uW0RpcmVjdGlvbltcIkFGVEVSXCJdID0gMV0gPSBcIkFGVEVSXCI7XG4gICAgRGlyZWN0aW9uW0RpcmVjdGlvbltcIklOU0lERV9BVF9FTkRcIl0gPSAyXSA9IFwiSU5TSURFX0FUX0VORFwiO1xuICAgIERpcmVjdGlvbltEaXJlY3Rpb25bXCJJTlNJREVfQVRfU1RBUlRcIl0gPSAzXSA9IFwiSU5TSURFX0FUX1NUQVJUXCI7XG59KShEaXJlY3Rpb24gfHwgKERpcmVjdGlvbiA9IHt9KSk7XG52YXIgTXVsdGlSb290VHJlZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTXVsdGlSb290VHJlZShyb290SWRzLCBub2Rlcykge1xuICAgICAgICBpZiAocm9vdElkcyA9PT0gdm9pZCAwKSB7IHJvb3RJZHMgPSBbXTsgfVxuICAgICAgICBpZiAobm9kZXMgPT09IHZvaWQgMCkgeyBub2RlcyA9IHt9OyB9XG4gICAgICAgIHRoaXMucm9vdElkcyA9IHJvb3RJZHM7XG4gICAgICAgIHRoaXMubm9kZXMgPSBub2RlcztcbiAgICAgICAgdGhpcy5pbml0Um9vdElkcygpO1xuICAgICAgICB0aGlzLmluaXROb2RlcygpO1xuICAgIH1cbiAgICBNdWx0aVJvb3RUcmVlLnByb3RvdHlwZS5pbml0Um9vdElkcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMucm9vdElkczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciByb290SWQgPSBfYVtfaV07XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUVtcHR5Tm9kZUlmTm90RXhpc3Qocm9vdElkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuaW5pdE5vZGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBub2RlS2V5IGluIHRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzLmhhc093blByb3BlcnR5KG5vZGVLZXkpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMubm9kZXNbbm9kZUtleV07IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlTGlzdEl0ZW0gPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRW1wdHlOb2RlSWZOb3RFeGlzdChub2RlTGlzdEl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuY3JlYXRlRW1wdHlOb2RlSWZOb3RFeGlzdCA9IGZ1bmN0aW9uIChub2RlS2V5KSB7XG4gICAgICAgIGlmICghdGhpcy5ub2Rlc1tub2RlS2V5XSkge1xuICAgICAgICAgICAgdGhpcy5ub2Rlc1tub2RlS2V5XSA9IFtdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNdWx0aVJvb3RUcmVlLnByb3RvdHlwZS5nZXRSb290SWRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2xvbmUgPSB0aGlzLnJvb3RJZHMuc2xpY2UoKTtcbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuZ2V0Tm9kZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbG9uZSA9IHt9O1xuICAgICAgICBmb3IgKHZhciBub2RlS2V5IGluIHRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzLmhhc093blByb3BlcnR5KG5vZGVLZXkpKSB7XG4gICAgICAgICAgICAgICAgY2xvbmVbbm9kZUtleV0gPSB0aGlzLm5vZGVzW25vZGVLZXldLnNsaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsb25lO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuZ2V0T2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm9vdElkczogdGhpcy5nZXRSb290SWRzKCksXG4gICAgICAgICAgICBub2RlczogdGhpcy5nZXROb2RlcygpLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE9iamVjdCgpO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuZmxhdHRlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGV4dHJhUHJvcHNPYmplY3QgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvb3RJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByb290SWQgPSB0aGlzLnJvb3RJZHNbaV07XG4gICAgICAgICAgICBleHRyYVByb3BzT2JqZWN0LnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiByb290SWQsXG4gICAgICAgICAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgICAgICAgICAgaGFzUGFyZW50OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbkNvdW50OiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyYXZlcnNlKHJvb3RJZCwgdGhpcy5ub2RlcywgZXh0cmFQcm9wc09iamVjdCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBleHRyYVByb3BzT2JqZWN0XzEgPSBleHRyYVByb3BzT2JqZWN0OyBfaSA8IGV4dHJhUHJvcHNPYmplY3RfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBvID0gZXh0cmFQcm9wc09iamVjdF8xW19pXTtcbiAgICAgICAgICAgIG8uY2hpbGRyZW5Db3VudCA9IGNvdW50Q2hpbGRyZW4oby5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dHJhUHJvcHNPYmplY3Q7XG4gICAgICAgIGZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oaWQpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMubm9kZXNbaWRdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW5Db3VudCA9IF90aGlzLm5vZGVzW2lkXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuQ291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gdHJhdmVyc2Uoc3RhcnRJZCwgbm9kZXMsIHJldHVybkFycmF5LCBsZXZlbCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSB2b2lkIDApIHsgbGV2ZWwgPSAwOyB9XG4gICAgICAgICAgICBpZiAoIXN0YXJ0SWQgfHwgIW5vZGVzIHx8ICFyZXR1cm5BcnJheSB8fCAhbm9kZXNbc3RhcnRJZF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbCsrO1xuICAgICAgICAgICAgdmFyIGlkc0xpc3QgPSBub2Rlc1tzdGFydElkXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaWRzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpZCA9IGlkc0xpc3RbaV07XG4gICAgICAgICAgICAgICAgcmV0dXJuQXJyYXkucHVzaCh7IGlkOiBpZCwgbGV2ZWw6IGxldmVsLCBoYXNQYXJlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgdHJhdmVyc2UoaWQsIG5vZGVzLCByZXR1cm5BcnJheSwgbGV2ZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV2ZWwtLTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUubW92ZUlkQmVmb3JlSWQgPSBmdW5jdGlvbiAobW92ZUlkLCBiZWZvcmVJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlSWQobW92ZUlkLCBiZWZvcmVJZCwgRGlyZWN0aW9uLkJFRk9SRSk7XG4gICAgfTtcbiAgICBNdWx0aVJvb3RUcmVlLnByb3RvdHlwZS5tb3ZlSWRBZnRlcklkID0gZnVuY3Rpb24gKG1vdmVJZCwgYWZ0ZXJJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlSWQobW92ZUlkLCBhZnRlcklkLCBEaXJlY3Rpb24uQUZURVIpO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUubW92ZUlkSW50b0lkID0gZnVuY3Rpb24gKG1vdmVJZCwgaW5zaWRlSWQsIGF0U3RhcnQpIHtcbiAgICAgICAgaWYgKGF0U3RhcnQgPT09IHZvaWQgMCkgeyBhdFN0YXJ0ID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoYXRTdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW92ZUlkKG1vdmVJZCwgaW5zaWRlSWQsIERpcmVjdGlvbi5JTlNJREVfQVRfU1RBUlQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW92ZUlkKG1vdmVJZCwgaW5zaWRlSWQsIERpcmVjdGlvbi5JTlNJREVfQVRfRU5EKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuc3dhcFJvb3RJZFdpdGhSb290SWQgPSBmdW5jdGlvbiAocm9vdElkLCB3aXRoUm9vdElkKSB7XG4gICAgICAgIHZhciBsZWZ0SW5kZXggPSB0aGlzLmZpbmRSb290SWQocm9vdElkKTtcbiAgICAgICAgdmFyIHJpZ2h0SW5kZXggPSB0aGlzLmZpbmRSb290SWQod2l0aFJvb3RJZCk7XG4gICAgICAgIHRoaXMuc3dhcFJvb3RQb3NpdGlvbldpdGhSb290UG9zaXRpb24obGVmdEluZGV4LCByaWdodEluZGV4KTtcbiAgICB9O1xuICAgIE11bHRpUm9vdFRyZWUucHJvdG90eXBlLnN3YXBSb290UG9zaXRpb25XaXRoUm9vdFBvc2l0aW9uID0gZnVuY3Rpb24gKHN3YXBSb290UG9zaXRpb24sIHdpdGhSb290UG9zaXRpb24pIHtcbiAgICAgICAgdmFyIHRlbXAgPSB0aGlzLnJvb3RJZHNbd2l0aFJvb3RQb3NpdGlvbl07XG4gICAgICAgIHRoaXMucm9vdElkc1t3aXRoUm9vdFBvc2l0aW9uXSA9IHRoaXMucm9vdElkc1tzd2FwUm9vdFBvc2l0aW9uXTtcbiAgICAgICAgdGhpcy5yb290SWRzW3N3YXBSb290UG9zaXRpb25dID0gdGVtcDtcbiAgICB9O1xuICAgIE11bHRpUm9vdFRyZWUucHJvdG90eXBlLmRlbGV0ZUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHRoaXMucm9vdERlbGV0ZUlkKGlkKTtcbiAgICAgICAgdGhpcy5ub2RlQW5kU3ViTm9kZXNEZWxldGUoaWQpO1xuICAgICAgICB0aGlzLm5vZGVSZWZyZW5jZXNEZWxldGUoaWQpO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuaW5zZXJ0SWRCZWZvcmVJZCA9IGZ1bmN0aW9uIChiZWZvcmVJZCwgaW5zZXJ0SWQpIHtcbiAgICAgICAgdmFyIGZvdW5kUm9vdElkSW5kZXggPSB0aGlzLmZpbmRSb290SWQoYmVmb3JlSWQpO1xuICAgICAgICBpZiAoZm91bmRSb290SWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydElkSW50b1Jvb3QoaW5zZXJ0SWQsIGZvdW5kUm9vdElkSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIG5vZGVLZXkgaW4gdGhpcy5ub2Rlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMuaGFzT3duUHJvcGVydHkobm9kZUtleSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm91bmROb2RlSWRJbmRleCA9IHRoaXMuZmluZE5vZGVJZChub2RlS2V5LCBiZWZvcmVJZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kTm9kZUlkSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydElkSW50b05vZGUobm9kZUtleSwgaW5zZXJ0SWQsIGZvdW5kTm9kZUlkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuaW5zZXJ0SWRBZnRlcklkID0gZnVuY3Rpb24gKGJlbG93SWQsIGluc2VydElkKSB7XG4gICAgICAgIHZhciBmb3VuZFJvb3RJZEluZGV4ID0gdGhpcy5maW5kUm9vdElkKGJlbG93SWQpO1xuICAgICAgICBpZiAoZm91bmRSb290SWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydElkSW50b1Jvb3QoaW5zZXJ0SWQsIGZvdW5kUm9vdElkSW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBub2RlS2V5IGluIHRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzLmhhc093blByb3BlcnR5KG5vZGVLZXkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kTm9kZUlkSW5kZXggPSB0aGlzLmZpbmROb2RlSWQobm9kZUtleSwgYmVsb3dJZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kTm9kZUlkSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydElkSW50b05vZGUobm9kZUtleSwgaW5zZXJ0SWQsIGZvdW5kTm9kZUlkSW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE11bHRpUm9vdFRyZWUucHJvdG90eXBlLmluc2VydElkSW50b0lkID0gZnVuY3Rpb24gKGluc2lkZUlkLCBpbnNlcnRJZCkge1xuICAgICAgICB0aGlzLm5vZGVJbnNlcnRBdEVuZChpbnNpZGVJZCwgaW5zZXJ0SWQpO1xuICAgICAgICB0aGlzLm5vZGVzW2luc2VydElkXSA9IFtdO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuaW5zZXJ0SWRJbnRvUm9vdCA9IGZ1bmN0aW9uIChpZCwgcG9zaXRpb24pIHtcbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEluc2VydEF0RW5kKGlkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoXzEgPSB0aGlzLnJvb3RJZHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdElkcy5zcGxpY2UoKHBvc2l0aW9uICsgbGVuZ3RoXzEgKyAxKSwgMCwgaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290SWRzLnNwbGljZShwb3NpdGlvbiwgMCwgaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZXNbaWRdID0gdGhpcy5ub2Rlc1tpZF0gfHwgW107XG4gICAgfTtcbiAgICBNdWx0aVJvb3RUcmVlLnByb3RvdHlwZS5pbnNlcnRJZEludG9Ob2RlID0gZnVuY3Rpb24gKG5vZGVLZXksIGlkLCBwb3NpdGlvbikge1xuICAgICAgICB0aGlzLm5vZGVzW25vZGVLZXldID0gdGhpcy5ub2Rlc1tub2RlS2V5XSB8fCBbXTtcbiAgICAgICAgdGhpcy5ub2Rlc1tpZF0gPSB0aGlzLm5vZGVzW2lkXSB8fCBbXTtcbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZUluc2VydEF0RW5kKG5vZGVLZXksIGlkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoXzIgPSB0aGlzLm5vZGVzW25vZGVLZXldLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVzW25vZGVLZXldLnNwbGljZSgocG9zaXRpb24gKyBsZW5ndGhfMiArIDEpLCAwLCBpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVzW25vZGVLZXldLnNwbGljZShwb3NpdGlvbiwgMCwgaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNdWx0aVJvb3RUcmVlLnByb3RvdHlwZS5tb3ZlSWQgPSBmdW5jdGlvbiAobW92ZUlkLCBiZWZvcmVJZCwgZGlyZWN0aW9uKSB7XG4gICAgICAgIHZhciBzb3VyY2VJZCA9IG1vdmVJZDtcbiAgICAgICAgdmFyIHNvdXJjZVJvb3RJbmRleCA9IHRoaXMuZmluZFJvb3RJZChzb3VyY2VJZCk7XG4gICAgICAgIHZhciBzb3VyY2VOb2RlS2V5O1xuICAgICAgICB2YXIgc291cmNlTm9kZUlkSW5kZXg7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzW2JlZm9yZUlkXSkge1xuICAgICAgICAgICAgc291cmNlTm9kZUtleSA9IGJlZm9yZUlkO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIG5vZGVLZXkgaW4gdGhpcy5ub2Rlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMuaGFzT3duUHJvcGVydHkobm9kZUtleSkpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VOb2RlSWRJbmRleCA9IHRoaXMuZmluZE5vZGVJZChub2RlS2V5LCBiZWZvcmVJZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ290IGFsbFxuICAgICAgICB2YXIgdGFyZ2V0SWQgPSBiZWZvcmVJZDtcbiAgICAgICAgdmFyIHRhcmdldFJvb3RJbmRleCA9IHRoaXMuZmluZFJvb3RJZCh0YXJnZXRJZCk7XG4gICAgICAgIHZhciB0YXJnZXROb2RlS2V5O1xuICAgICAgICB2YXIgdGFyZ2V0Tm9kZUlkSW5kZXg7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzW2JlZm9yZUlkXSkge1xuICAgICAgICAgICAgdGFyZ2V0Tm9kZUtleSA9IGJlZm9yZUlkO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIG5vZGVLZXkgaW4gdGhpcy5ub2Rlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMuaGFzT3duUHJvcGVydHkobm9kZUtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXROb2RlSWRJbmRleCA9IHRoaXMuZmluZE5vZGVJZChub2RlS2V5LCBiZWZvcmVJZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ290IGFsbFxuICAgICAgICBpZiAoc291cmNlUm9vdEluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRSb290SW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIC8vIG1vdmluZyByb290IHRvIHJvb3RcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgTW92aW5nIFJPT1QgdG8gUk9PVGApO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBSb290SWRzOmApO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm9vdElkcyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYFRhcmdldEluZGV4PSR7dGFyZ2V0Um9vdEluZGV4fSwgU291cmNlSW5kZXg9JHtzb3VyY2VSb290SW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYFRhcmdldElkPSR7dGFyZ2V0SWR9LCBTb3VyY2VJZD0ke3NvdXJjZUlkfWApO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdERlbGV0ZShzb3VyY2VSb290SW5kZXgpOyAvLyBpbmRleGVzIGNoYW5nZSBub3dcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Um9vdEluZGV4ID4gc291cmNlUm9vdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFJvb3RJbmRleC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uQkVGT1JFOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnRJZEludG9Sb290KHNvdXJjZUlkLCB0YXJnZXRSb290SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLkFGVEVSOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnRJZEludG9Sb290KHNvdXJjZUlkLCB0YXJnZXRSb290SW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5JTlNJREVfQVRfU1RBUlQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGVJbnNlcnRBdFN0YXJ0KHRhcmdldElkLCBzb3VyY2VJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uSU5TSURFX0FUX0VORDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZUluc2VydEF0RW5kKHRhcmdldElkLCBzb3VyY2VJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBtb3Zpbmcgcm9vdCAoc291cmNlKSBBQk9WRSBub2RlICh0YXJnZXQpXG4gICAgICAgICAgICAgICAgLy8gd2lsbCByZW1vdmUgb25lIGVudHJ5IGZyb20gcm9vdHNcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3REZWxldGUoc291cmNlUm9vdEluZGV4KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBub2RlS2V5IGluIHRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMuaGFzT3duUHJvcGVydHkobm9kZUtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZmluZE5vZGVJZChub2RlS2V5LCB0YXJnZXRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLkJFRk9SRTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0SWRJbnRvTm9kZShub2RlS2V5LCBzb3VyY2VJZCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLkFGVEVSOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnRJZEludG9Ob2RlKG5vZGVLZXksIHNvdXJjZUlkLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLklOU0lERV9BVF9TVEFSVDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZUluc2VydEF0U3RhcnQodGFyZ2V0SWQsIHNvdXJjZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5JTlNJREVfQVRfRU5EOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlSW5zZXJ0QXRFbmQodGFyZ2V0SWQsIHNvdXJjZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRSb290SW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIC8vIG1vdmluZyBub2RlIChzb3VyY2UpIEFCT1ZFIHJvb3QgKHRhcmdldClcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgc291cmNlIGlkIGZyb20gZWFjaCBub2RlXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbm9kZUtleSBpbiB0aGlzLm5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVzLmhhc093blByb3BlcnR5KG5vZGVLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmZpbmROb2RlSWQobm9kZUtleSwgc291cmNlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGVJbnNlcnRJZChub2RlS2V5LCBzb3VyY2VJZCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZURlbGV0ZUF0SW5kZXgobm9kZUtleSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLkJFRk9SRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0SWRJbnRvUm9vdChzb3VyY2VJZCwgdGFyZ2V0Um9vdEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIERpcmVjdGlvbi5BRlRFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0SWRJbnRvUm9vdChzb3VyY2VJZCwgdGFyZ2V0Um9vdEluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uSU5TSURFX0FUX1NUQVJUOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlSW5zZXJ0QXRTdGFydCh0YXJnZXRJZCwgc291cmNlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLklOU0lERV9BVF9FTkQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGVJbnNlcnRBdEVuZCh0YXJnZXRJZCwgc291cmNlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbW92aW5nIG5vZGUgKHNvdXJjZSkgQUJPVkUgbm9kZSAodGFyZ2V0KVxuICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBzb3VyY2UgaWQgZnJvbSBlYWNoIG5vZGVcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBub2RlS2V5IGluIHRoaXMubm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMuaGFzT3duUHJvcGVydHkobm9kZUtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZmluZE5vZGVJZChub2RlS2V5LCBzb3VyY2VJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZURlbGV0ZUF0SW5kZXgobm9kZUtleSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIG5vZGVLZXkgaW4gdGhpcy5ub2Rlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2Rlcy5oYXNPd25Qcm9wZXJ0eShub2RlS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5maW5kTm9kZUlkKG5vZGVLZXksIHRhcmdldElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uQkVGT1JFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnRJZEludG9Ob2RlKG5vZGVLZXksIHNvdXJjZUlkLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uQUZURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydElkSW50b05vZGUobm9kZUtleSwgc291cmNlSWQsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBEaXJlY3Rpb24uSU5TSURFX0FUX1NUQVJUOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlSW5zZXJ0QXRTdGFydCh0YXJnZXRJZCwgc291cmNlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRGlyZWN0aW9uLklOU0lERV9BVF9FTkQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGVJbnNlcnRBdEVuZCh0YXJnZXRJZCwgc291cmNlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBNdWx0aVJvb3RUcmVlLnByb3RvdHlwZS5zd2FwQXJyYXlFbGVtZW50cyA9IGZ1bmN0aW9uIChhcnIsIGluZGV4QSwgaW5kZXhCKSB7XG4gICAgICAgIHZhciB0ZW1wID0gYXJyW2luZGV4QV07XG4gICAgICAgIGFycltpbmRleEFdID0gYXJyW2luZGV4Ql07XG4gICAgICAgIGFycltpbmRleEJdID0gdGVtcDtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9O1xuICAgIDtcbiAgICBNdWx0aVJvb3RUcmVlLnByb3RvdHlwZS5yb290RGVsZXRlSWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5maW5kUm9vdElkKGlkKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdERlbGV0ZShpbmRleCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE11bHRpUm9vdFRyZWUucHJvdG90eXBlLm5vZGVBbmRTdWJOb2Rlc0RlbGV0ZSA9IGZ1bmN0aW9uIChub2RlS2V5KSB7XG4gICAgICAgIHZhciB0b0RlbGV0ZUxhdGVyID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ub2Rlc1tub2RlS2V5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5ub2Rlc1tub2RlS2V5XVtpXTtcbiAgICAgICAgICAgIHRoaXMubm9kZUFuZFN1Yk5vZGVzRGVsZXRlKGlkKTtcbiAgICAgICAgICAgIHRvRGVsZXRlTGF0ZXIucHVzaChub2RlS2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGVEZWxldGUobm9kZUtleSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9EZWxldGVMYXRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ub2RlRGVsZXRlKHRvRGVsZXRlTGF0ZXJbaV0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBNdWx0aVJvb3RUcmVlLnByb3RvdHlwZS5ub2RlUmVmcmVuY2VzRGVsZXRlID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIGZvciAodmFyIG5vZGVLZXkgaW4gdGhpcy5ub2Rlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMubm9kZXMuaGFzT3duUHJvcGVydHkobm9kZUtleSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubm9kZXNbbm9kZUtleV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldElkID0gdGhpcy5ub2Rlc1tub2RlS2V5XVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldElkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlRGVsZXRlQXRJbmRleChub2RlS2V5LCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUubm9kZURlbGV0ZSA9IGZ1bmN0aW9uIChub2RlS2V5KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm5vZGVzW25vZGVLZXldO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuZmluZFJvb3RJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb290SWRzLmluZGV4T2YoaWQpO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUuZmluZE5vZGVJZCA9IGZ1bmN0aW9uIChub2RlS2V5LCBpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlc1tub2RlS2V5XS5pbmRleE9mKGlkKTtcbiAgICB9O1xuICAgIE11bHRpUm9vdFRyZWUucHJvdG90eXBlLmZpbmROb2RlID0gZnVuY3Rpb24gKG5vZGVLZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXNbbm9kZUtleV07XG4gICAgfTtcbiAgICBNdWx0aVJvb3RUcmVlLnByb3RvdHlwZS5ub2RlSW5zZXJ0QXRTdGFydCA9IGZ1bmN0aW9uIChub2RlS2V5LCBpZCkge1xuICAgICAgICB0aGlzLm5vZGVzW25vZGVLZXldLnVuc2hpZnQoaWQpO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUubm9kZUluc2VydEF0RW5kID0gZnVuY3Rpb24gKG5vZGVLZXksIGlkKSB7XG4gICAgICAgIHRoaXMubm9kZXNbbm9kZUtleV0ucHVzaChpZCk7XG4gICAgfTtcbiAgICBNdWx0aVJvb3RUcmVlLnByb3RvdHlwZS5yb290RGVsZXRlID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRoaXMucm9vdElkcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUubm9kZURlbGV0ZUF0SW5kZXggPSBmdW5jdGlvbiAobm9kZUtleSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5ub2Rlc1tub2RlS2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUucm9vdEluc2VydEF0U3RhcnQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdGhpcy5yb290SWRzLnVuc2hpZnQoaWQpO1xuICAgIH07XG4gICAgTXVsdGlSb290VHJlZS5wcm90b3R5cGUucm9vdEluc2VydEF0RW5kID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHRoaXMucm9vdElkcy5wdXNoKGlkKTtcbiAgICB9O1xuICAgIHJldHVybiBNdWx0aVJvb3RUcmVlO1xufSgpKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IE11bHRpUm9vdFRyZWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NdWx0aVJvb3RUcmVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBIZWFwXzEgPSByZXF1aXJlKCcuL0hlYXAnKTtcbnZhciBQcmlvcml0eVF1ZXVlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IHByaW9yaXR5IHF1ZXVlLlxuICAgICAqIEBjbGFzcyA8cD5JbiBhIHByaW9yaXR5IHF1ZXVlIGVhY2ggZWxlbWVudCBpcyBhc3NvY2lhdGVkIHdpdGggYSBcInByaW9yaXR5XCIsXG4gICAgICogZWxlbWVudHMgYXJlIGRlcXVldWVkIGluIGhpZ2hlc3QtcHJpb3JpdHktZmlyc3Qgb3JkZXIgKHRoZSBlbGVtZW50cyB3aXRoIHRoZVxuICAgICAqIGhpZ2hlc3QgcHJpb3JpdHkgYXJlIGRlcXVldWVkIGZpcnN0KS4gUHJpb3JpdHkgUXVldWVzIGFyZSBpbXBsZW1lbnRlZCBhcyBoZWFwcy5cbiAgICAgKiBJZiB0aGUgaW5zZXJ0ZWQgZWxlbWVudHMgYXJlIGN1c3RvbSBvYmplY3RzIGEgY29tcGFyZSBmdW5jdGlvbiBtdXN0IGJlIHByb3ZpZGVkLFxuICAgICAqIG90aGVyd2lzZSB0aGUgPD0sID09PSBhbmQgPj0gb3BlcmF0b3JzIGFyZSB1c2VkIHRvIGNvbXBhcmUgb2JqZWN0IHByaW9yaXR5LjwvcD5cbiAgICAgKiA8cHJlPlxuICAgICAqIGZ1bmN0aW9uIGNvbXBhcmUoYSwgYikge1xuICAgICAqICBpZiAoYSBpcyBsZXNzIHRoYW4gYiBieSBzb21lIG9yZGVyaW5nIGNyaXRlcmlvbikge1xuICAgICAqICAgICByZXR1cm4gLTE7XG4gICAgICogIH0gaWYgKGEgaXMgZ3JlYXRlciB0aGFuIGIgYnkgdGhlIG9yZGVyaW5nIGNyaXRlcmlvbikge1xuICAgICAqICAgICByZXR1cm4gMTtcbiAgICAgKiAgfVxuICAgICAqICAvLyBhIG11c3QgYmUgZXF1YWwgdG8gYlxuICAgICAqICByZXR1cm4gMDtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpudW1iZXI9fSBjb21wYXJlRnVuY3Rpb24gb3B0aW9uYWxcbiAgICAgKiBmdW5jdGlvbiB1c2VkIHRvIGNvbXBhcmUgdHdvIGVsZW1lbnQgcHJpb3JpdGllcy4gTXVzdCByZXR1cm4gYSBuZWdhdGl2ZSBpbnRlZ2VyLFxuICAgICAqIHplcm8sIG9yIGEgcG9zaXRpdmUgaW50ZWdlciBhcyB0aGUgZmlyc3QgYXJndW1lbnQgaXMgbGVzcyB0aGFuLCBlcXVhbCB0byxcbiAgICAgKiBvciBncmVhdGVyIHRoYW4gdGhlIHNlY29uZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBQcmlvcml0eVF1ZXVlKGNvbXBhcmVGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmhlYXAgPSBuZXcgSGVhcF8xLmRlZmF1bHQodXRpbC5yZXZlcnNlQ29tcGFyZUZ1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBpbnRvIHRoaXMgcHJpb3JpdHkgcXVldWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgUHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlYXAuYWRkKGVsZW1lbnQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGlzIHByaW9yaXR5IHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFByaW9yaXR5UXVldWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlYXAuYWRkKGVsZW1lbnQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIGFuZCByZW1vdmVzIHRoZSBoaWdoZXN0IHByaW9yaXR5IGVsZW1lbnQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgdGhlIGhpZ2hlc3QgcHJpb3JpdHkgZWxlbWVudCBvZiB0aGlzIHF1ZXVlLFxuICAgICAqICBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5oZWFwLnNpemUoKSAhPT0gMCkge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5oZWFwLnBlZWsoKTtcbiAgICAgICAgICAgIHRoaXMuaGVhcC5yZW1vdmVSb290KCk7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcywgYnV0IGRvZXMgbm90IHJlbW92ZSwgdGhlIGhpZ2hlc3QgcHJpb3JpdHkgZWxlbWVudCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoaWdoZXN0IHByaW9yaXR5IGVsZW1lbnQgb2YgdGhpcyBxdWV1ZSwgb3IgdW5kZWZpbmVkIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICovXG4gICAgUHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhcC5wZWVrKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBwcmlvcml0eSBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBwcmlvcml0eSBxdWV1ZSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQsXG4gICAgICogZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIFByaW9yaXR5UXVldWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhcC5jb250YWlucyhlbGVtZW50KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGlzIHByaW9yaXR5IHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgYW5kIG9ubHkgaWYgdGhpcyBwcmlvcml0eSBxdWV1ZSBjb250YWlucyBubyBpdGVtczsgZmFsc2VcbiAgICAgKiBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhcC5pc0VtcHR5KCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBwcmlvcml0eSBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBwcmlvcml0eSBxdWV1ZS5cbiAgICAgKi9cbiAgICBQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWFwLnNpemUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgcHJpb3JpdHkgcXVldWUuXG4gICAgICovXG4gICAgUHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaGVhcC5jbGVhcigpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgcXVldWUgaW5cbiAgICAgKiBubyBwYXJ0aWN1bGFyIG9yZGVyLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KToqfSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlLCBpdCBpc1xuICAgICAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuaGVhcC5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIHJldHVybiBQcmlvcml0eVF1ZXVlO1xufSgpKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFByaW9yaXR5UXVldWU7IC8vIGVuZCBvZiBwcmlvcml0eSBxdWV1ZVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UHJpb3JpdHlRdWV1ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBMaW5rZWRMaXN0XzEgPSByZXF1aXJlKCcuL0xpbmtlZExpc3QnKTtcbnZhciBRdWV1ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBxdWV1ZS5cbiAgICAgKiBAY2xhc3MgQSBxdWV1ZSBpcyBhIEZpcnN0LUluLUZpcnN0LU91dCAoRklGTykgZGF0YSBzdHJ1Y3R1cmUsIHRoZSBmaXJzdFxuICAgICAqIGVsZW1lbnQgYWRkZWQgdG8gdGhlIHF1ZXVlIHdpbGwgYmUgdGhlIGZpcnN0IG9uZSB0byBiZSByZW1vdmVkLiBUaGlzXG4gICAgICogaW1wbGVtZW50YXRpb24gdXNlcyBhIGxpbmtlZCBsaXN0IGFzIGEgY29udGFpbmVyLlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFF1ZXVlKCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBuZXcgTGlua2VkTGlzdF8xLmRlZmF1bHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaW50byB0aGUgZW5kIG9mIHRoaXMgcXVldWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGVsZW1lbnQgd2FzIGluc2VydGVkLCBvciBmYWxzZSBpZiBpdCBpcyB1bmRlZmluZWQuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGludG8gdGhlIGVuZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBpbnNlcnRlZCwgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhbmQgcmVtb3ZlcyB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLlxuICAgICAqIEByZXR1cm4geyp9IHRoZSBoZWFkIG9mIHRoaXMgcXVldWUsIG9yIHVuZGVmaW5lZCBpZiB0aGlzIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIFF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0LnNpemUoKSAhPT0gMCkge1xuICAgICAgICAgICAgdmFyIGVsID0gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgICAgICAgICB0aGlzLmxpc3QucmVtb3ZlRWxlbWVudEF0SW5kZXgoMCk7XG4gICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcywgYnV0IGRvZXMgbm90IHJlbW92ZSwgdGhlIGhlYWQgb2YgdGhpcyBxdWV1ZS5cbiAgICAgKiBAcmV0dXJuIHsqfSB0aGUgaGVhZCBvZiB0aGlzIHF1ZXVlLCBvciB1bmRlZmluZWQgaWYgdGhpcyBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdC5zaXplKCkgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3QuZmlyc3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgcXVldWUuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Quc2l6ZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgcXVldWUgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqIDxwPklmIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBzdGFjayBhcmVcbiAgICAgKiBub3QgY29tcGFyYWJsZSB3aXRoIHRoZSA9PT0gb3BlcmF0b3IsIGEgY3VzdG9tIGVxdWFscyBmdW5jdGlvbiBzaG91bGQgYmVcbiAgICAgKiBwcm92aWRlZCB0byBwZXJmb3JtIHNlYXJjaGVzLCB0aGUgZnVuY3Rpb24gbXVzdCByZWNlaXZlIHR3byBhcmd1bWVudHMgYW5kXG4gICAgICogcmV0dXJuIHRydWUgaWYgdGhleSBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGNvbnN0IHBldHNBcmVFcXVhbEJ5TmFtZSAocGV0MSwgcGV0Mikge1xuICAgICAqICByZXR1cm4gcGV0MS5uYW1lID09PSBwZXQyLm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbFxuICAgICAqIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHR3byBlbGVtZW50cyBhcmUgZXF1YWwuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCxcbiAgICAgKiBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGVsZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuY29udGFpbnMoZWxlbSwgZXF1YWxzRnVuY3Rpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoaXMgcXVldWUgaXMgZW1wdHkuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBhbmQgb25seSBpZiB0aGlzIHF1ZXVlIGNvbnRhaW5zIG5vIGl0ZW1zOyBmYWxzZVxuICAgICAqIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBRdWV1ZS5wcm90b3R5cGUuaXNFbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCkgPD0gMDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgcXVldWUuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxpc3QuY2xlYXIoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHF1ZXVlIGluXG4gICAgICogRklGTyBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgUXVldWUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goY2FsbGJhY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFF1ZXVlO1xufSgpKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFF1ZXVlOyAvLyBFbmQgb2YgcXVldWVcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBhcnJheXMgPSByZXF1aXJlKCcuL2FycmF5cycpO1xudmFyIERpY3Rpb25hcnlfMSA9IHJlcXVpcmUoJy4vRGljdGlvbmFyeScpO1xudmFyIFNldCA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBzZXQuXG4gICAgICogQGNsYXNzIDxwPkEgc2V0IGlzIGEgZGF0YSBzdHJ1Y3R1cmUgdGhhdCBjb250YWlucyBubyBkdXBsaWNhdGUgaXRlbXMuPC9wPlxuICAgICAqIDxwPklmIHRoZSBpbnNlcnRlZCBlbGVtZW50cyBhcmUgY3VzdG9tIG9iamVjdHMgYSBmdW5jdGlvblxuICAgICAqIHdoaWNoIGNvbnZlcnRzIGVsZW1lbnRzIHRvIHN0cmluZ3MgbXVzdCBiZSBwcm92aWRlZC4gRXhhbXBsZTo8L3A+XG4gICAgICpcbiAgICAgKiA8cHJlPlxuICAgICAqIGZ1bmN0aW9uIHBldFRvU3RyaW5nKHBldCkge1xuICAgICAqICByZXR1cm4gcGV0Lm5hbWU7XG4gICAgICogfVxuICAgICAqIDwvcHJlPlxuICAgICAqXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOnN0cmluZz19IHRvU3RyaW5nRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdXNlZFxuICAgICAqIHRvIGNvbnZlcnQgZWxlbWVudHMgdG8gc3RyaW5ncy4gSWYgdGhlIGVsZW1lbnRzIGFyZW4ndCBzdHJpbmdzIG9yIGlmIHRvU3RyaW5nKClcbiAgICAgKiBpcyBub3QgYXBwcm9wcmlhdGUsIGEgY3VzdG9tIGZ1bmN0aW9uIHdoaWNoIHJlY2VpdmVzIGEgb25qZWN0IGFuZCByZXR1cm5zIGFcbiAgICAgKiB1bmlxdWUgc3RyaW5nIG11c3QgYmUgcHJvdmlkZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gU2V0KHRvU3RyaW5nRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5kaWN0aW9uYXJ5ID0gbmV3IERpY3Rpb25hcnlfMS5kZWZhdWx0KHRvU3RyaW5nRnVuY3Rpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBzZXQgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgc2V0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgZWxlbWVudCxcbiAgICAgKiBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgU2V0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpY3Rpb25hcnkuY29udGFpbnNLZXkoZWxlbWVudCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBzcGVjaWZpZWQgZWxlbWVudCB0byB0aGlzIHNldCBpZiBpdCBpcyBub3QgYWxyZWFkeSBwcmVzZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IHRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgc2V0IGRpZCBub3QgYWxyZWFkeSBjb250YWluIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5zKGVsZW1lbnQpIHx8IHV0aWwuaXNVbmRlZmluZWQoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGljdGlvbmFyeS5zZXRWYWx1ZShlbGVtZW50LCBlbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBpbnRlcnNlY2lvbiBiZXR3ZWVuIHRoaXMgYW4gYW5vdGhlciBzZXQuXG4gICAgICogUmVtb3ZlcyBhbGwgdmFsdWVzIHRoYXQgYXJlIG5vdCBwcmVzZW50IHRoaXMgc2V0IGFuZCB0aGUgZ2l2ZW4gc2V0LlxuICAgICAqIEBwYXJhbSB7Y29sbGVjdGlvbnMuU2V0fSBvdGhlclNldCBvdGhlciBzZXQuXG4gICAgICovXG4gICAgU2V0LnByb3RvdHlwZS5pbnRlcnNlY3Rpb24gPSBmdW5jdGlvbiAob3RoZXJTZXQpIHtcbiAgICAgICAgdmFyIHNldCA9IHRoaXM7XG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKCFvdGhlclNldC5jb250YWlucyhlbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHNldC5yZW1vdmUoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIHVuaW9uIGJldHdlZW4gdGhpcyBhbiBhbm90aGVyIHNldC5cbiAgICAgKiBBZGRzIGFsbCB2YWx1ZXMgZnJvbSB0aGUgZ2l2ZW4gc2V0IHRvIHRoaXMgc2V0LlxuICAgICAqIEBwYXJhbSB7Y29sbGVjdGlvbnMuU2V0fSBvdGhlclNldCBvdGhlciBzZXQuXG4gICAgICovXG4gICAgU2V0LnByb3RvdHlwZS51bmlvbiA9IGZ1bmN0aW9uIChvdGhlclNldCkge1xuICAgICAgICB2YXIgc2V0ID0gdGhpcztcbiAgICAgICAgb3RoZXJTZXQuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgc2V0LmFkZChlbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoaXMgYW4gYW5vdGhlciBzZXQuXG4gICAgICogUmVtb3ZlcyBmcm9tIHRoaXMgc2V0IGFsbCB0aGUgdmFsdWVzIHRoYXQgYXJlIHByZXNlbnQgaW4gdGhlIGdpdmVuIHNldC5cbiAgICAgKiBAcGFyYW0ge2NvbGxlY3Rpb25zLlNldH0gb3RoZXJTZXQgb3RoZXIgc2V0LlxuICAgICAqL1xuICAgIFNldC5wcm90b3R5cGUuZGlmZmVyZW5jZSA9IGZ1bmN0aW9uIChvdGhlclNldCkge1xuICAgICAgICB2YXIgc2V0ID0gdGhpcztcbiAgICAgICAgb3RoZXJTZXQuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgc2V0LnJlbW92ZShlbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBzZXQgY29udGFpbnMgYWxsIHRoZSBlbGVtZW50cyBpbiB0aGlzIHNldC5cbiAgICAgKiBAcGFyYW0ge2NvbGxlY3Rpb25zLlNldH0gb3RoZXJTZXQgb3RoZXIgc2V0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhpcyBzZXQgaXMgYSBzdWJzZXQgb2YgdGhlIGdpdmVuIHNldC5cbiAgICAgKi9cbiAgICBTZXQucHJvdG90eXBlLmlzU3Vic2V0T2YgPSBmdW5jdGlvbiAob3RoZXJTZXQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSgpID4gb3RoZXJTZXQuc2l6ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlzU3ViID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoIW90aGVyU2V0LmNvbnRhaW5zKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgaXNTdWIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpc1N1YjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBlbGVtZW50IGZyb20gdGhpcyBzZXQgaWYgaXQgaXMgcHJlc2VudC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgc2V0IGNvbnRhaW5lZCB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICovXG4gICAgU2V0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGFpbnMoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGljdGlvbmFyeS5yZW1vdmUoZWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudFxuICAgICAqIHByZXNlbnQgaW4gdGhpcyBzZXQuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpOip9IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGUsIGl0IGlzXG4gICAgICogaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudHM6IHRoZSBlbGVtZW50LiBUbyBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAgICAgKiBvcHRpb25hbGx5IHJldHVybiBmYWxzZS5cbiAgICAgKi9cbiAgICBTZXQucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5kaWN0aW9uYXJ5LmZvckVhY2goZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh2KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIHNldCBpbiBhcmJpdHJhcnkgb3JkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZSBlbGVtZW50cyBpbiB0aGlzIHNldC5cbiAgICAgKi9cbiAgICBTZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpY3Rpb25hcnkudmFsdWVzKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBzZXQgY29udGFpbnMgbm8gZWxlbWVudHMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGlzIHNldCBjb250YWlucyBubyBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBTZXQucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpY3Rpb25hcnkuaXNFbXB0eSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoaXMgc2V0LlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGlzIHNldC5cbiAgICAgKi9cbiAgICBTZXQucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpY3Rpb25hcnkuc2l6ZSgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgb2YgdGhlIGVsZW1lbnRzIGZyb20gdGhpcyBzZXQuXG4gICAgICovXG4gICAgU2V0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kaWN0aW9uYXJ5LmNsZWFyKCk7XG4gICAgfTtcbiAgICAvKlxuICAgICogUHJvdmlkZXMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gZm9yIGRpc3BsYXlcbiAgICAqL1xuICAgIFNldC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcnJheXMudG9TdHJpbmcodGhpcy50b0FycmF5KCkpO1xuICAgIH07XG4gICAgcmV0dXJuIFNldDtcbn0oKSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBTZXQ7IC8vIGVuZCBvZiBTZXRcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNldC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBMaW5rZWRMaXN0XzEgPSByZXF1aXJlKCcuL0xpbmtlZExpc3QnKTtcbnZhciBTdGFjayA9IChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBTdGFjay5cbiAgICAgKiBAY2xhc3MgQSBTdGFjayBpcyBhIExhc3QtSW4tRmlyc3QtT3V0IChMSUZPKSBkYXRhIHN0cnVjdHVyZSwgdGhlIGxhc3RcbiAgICAgKiBlbGVtZW50IGFkZGVkIHRvIHRoZSBzdGFjayB3aWxsIGJlIHRoZSBmaXJzdCBvbmUgdG8gYmUgcmVtb3ZlZC4gVGhpc1xuICAgICAqIGltcGxlbWVudGF0aW9uIHVzZXMgYSBsaW5rZWQgbGlzdCBhcyBhIGNvbnRhaW5lci5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBTdGFjaygpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IExpbmtlZExpc3RfMS5kZWZhdWx0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhbiBpdGVtIG9udG8gdGhlIHRvcCBvZiB0aGlzIHN0YWNrLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtIHRoZSBlbGVtZW50IHRvIGJlIHB1c2hlZCBvbnRvIHRoaXMgc3RhY2suXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgZWxlbWVudCB3YXMgcHVzaGVkIG9yIGZhbHNlIGlmIGl0IGlzIHVuZGVmaW5lZC5cbiAgICAgKi9cbiAgICBTdGFjay5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuYWRkKGVsZW0sIDApO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGFuIGl0ZW0gb250byB0aGUgdG9wIG9mIHRoaXMgc3RhY2suXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gdGhlIGVsZW1lbnQgdG8gYmUgcHVzaGVkIG9udG8gdGhpcyBzdGFjay5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBlbGVtZW50IHdhcyBwdXNoZWQgb3IgZmFsc2UgaWYgaXQgaXMgdW5kZWZpbmVkLlxuICAgICAqL1xuICAgIFN0YWNrLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmFkZChlbGVtLCAwKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIG9iamVjdCBhdCB0aGUgdG9wIG9mIHRoaXMgc3RhY2sgYW5kIHJldHVybnMgdGhhdCBvYmplY3QuXG4gICAgICogQHJldHVybiB7Kn0gdGhlIG9iamVjdCBhdCB0aGUgdG9wIG9mIHRoaXMgc3RhY2sgb3IgdW5kZWZpbmVkIGlmIHRoZVxuICAgICAqIHN0YWNrIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIFN0YWNrLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QucmVtb3ZlRWxlbWVudEF0SW5kZXgoMCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBMb29rcyBhdCB0aGUgb2JqZWN0IGF0IHRoZSB0b3Agb2YgdGhpcyBzdGFjayB3aXRob3V0IHJlbW92aW5nIGl0IGZyb20gdGhlXG4gICAgICogc3RhY2suXG4gICAgICogQHJldHVybiB7Kn0gdGhlIG9iamVjdCBhdCB0aGUgdG9wIG9mIHRoaXMgc3RhY2sgb3IgdW5kZWZpbmVkIGlmIHRoZVxuICAgICAqIHN0YWNrIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIFN0YWNrLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmZpcnN0KCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBzdGFjay5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhpcyBzdGFjay5cbiAgICAgKi9cbiAgICBTdGFjay5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5zaXplKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBzdGFjayBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gICAgICogPHA+SWYgdGhlIGVsZW1lbnRzIGluc2lkZSB0aGlzIHN0YWNrIGFyZVxuICAgICAqIG5vdCBjb21wYXJhYmxlIHdpdGggdGhlID09PSBvcGVyYXRvciwgYSBjdXN0b20gZXF1YWxzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgICAqIHByb3ZpZGVkIHRvIHBlcmZvcm0gc2VhcmNoZXMsIHRoZSBmdW5jdGlvbiBtdXN0IHJlY2VpdmUgdHdvIGFyZ3VtZW50cyBhbmRcbiAgICAgKiByZXR1cm4gdHJ1ZSBpZiB0aGV5IGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBFeGFtcGxlOjwvcD5cbiAgICAgKlxuICAgICAqIDxwcmU+XG4gICAgICogY29uc3QgcGV0c0FyZUVxdWFsQnlOYW1lIChwZXQxLCBwZXQyKSB7XG4gICAgICogIHJldHVybiBwZXQxLm5hbWUgPT09IHBldDIubmFtZTtcbiAgICAgKiB9XG4gICAgICogPC9wcmU+XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW0gZWxlbWVudCB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsXG4gICAgICogZnVuY3Rpb24gdG8gY2hlY2sgaWYgdHdvIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoaXMgc3RhY2sgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LFxuICAgICAqIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBTdGFjay5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoZWxlbSwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5jb250YWlucyhlbGVtLCBlcXVhbHNGdW5jdGlvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhpcyBzdGFjayBpcyBlbXB0eS5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGFuZCBvbmx5IGlmIHRoaXMgc3RhY2sgY29udGFpbnMgbm8gaXRlbXM7IGZhbHNlXG4gICAgICogb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIFN0YWNrLnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0LmlzRW1wdHkoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBlbGVtZW50cyBmcm9tIHRoaXMgc3RhY2suXG4gICAgICovXG4gICAgU3RhY2sucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxpc3QuY2xlYXIoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBvbmNlIGZvciBlYWNoIGVsZW1lbnQgcHJlc2VudCBpbiB0aGlzIHN0YWNrIGluXG4gICAgICogTElGTyBvcmRlci5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAgICAgKiBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiB0aGUgZWxlbWVudCB2YWx1ZSwgdG8gYnJlYWsgdGhlIGl0ZXJhdGlvbiB5b3UgY2FuXG4gICAgICogb3B0aW9uYWxseSByZXR1cm4gZmFsc2UuXG4gICAgICovXG4gICAgU3RhY2sucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5saXN0LmZvckVhY2goY2FsbGJhY2spO1xuICAgIH07XG4gICAgcmV0dXJuIFN0YWNrO1xufSgpKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFN0YWNrOyAvLyBFbmQgb2Ygc3RhY2tcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0YWNrLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBpdGVtXG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS40XG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiB0aGUgc3BlY2lmaWVkIGVsZW1lbnRcbiAqIHdpdGhpbiB0aGUgc3BlY2lmaWVkIGFycmF5LCBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKSB7XG4gICAgdmFyIGVxdWFscyA9IGVxdWFsc0Z1bmN0aW9uIHx8IHV0aWwuZGVmYXVsdEVxdWFscztcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYXJyYXkgdGhlIGFycmF5IGluIHdoaWNoIHRvIHNlYXJjaCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgdGhlIHNwZWNpZmllZCBlbGVtZW50XG4gKiB3aXRoaW4gdGhlIHNwZWNpZmllZCBhcnJheSBvciAtMSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGVxdWFscyhhcnJheVtpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmV4cG9ydHMubGFzdEluZGV4T2YgPSBsYXN0SW5kZXhPZjtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgYXJyYXkgY29udGFpbnMgdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuICogQHBhcmFtIHsqfSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gc2VhcmNoIHRoZSBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gdGhlIGVsZW1lbnQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QsT2JqZWN0KTpib29sZWFuPX0gZXF1YWxzRnVuY3Rpb24gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHNwZWNpZmllZCBhcnJheSBjb250YWlucyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHJldHVybiBpbmRleE9mKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikgPj0gMDtcbn1cbmV4cG9ydHMuY29udGFpbnMgPSBjb250YWlucztcbi8qKlxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2N1cnJlbmNlIG9mIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBmcm9tIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSBpbiB3aGljaCB0byBzZWFyY2ggZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIHRoZSBlbGVtZW50IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIDIgZWxlbWVudHMuXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBhcnJheSBjaGFuZ2VkIGFmdGVyIHRoaXMgY2FsbC5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoYXJyYXksIGl0ZW0sIGVxdWFsc0Z1bmN0aW9uKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMucmVtb3ZlID0gcmVtb3ZlO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBhcnJheSBlcXVhbFxuICogdG8gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSB0aGUgYXJyYXkgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gaXRlbSB0aGUgZWxlbWVudCB3aG9zZSBmcmVxdWVuY3kgaXMgdG8gYmUgZGV0ZXJtaW5lZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0LE9iamVjdCk6Ym9vbGVhbj19IGVxdWFsc0Z1bmN0aW9uIG9wdGlvbmFsIGZ1bmN0aW9uIHVzZWQgdG9cbiAqIGNoZWNrIGVxdWFsaXR5IGJldHdlZW4gMiBlbGVtZW50cy5cbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKiBlcXVhbCB0byB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gZnJlcXVlbmN5KGFycmF5LCBpdGVtLCBlcXVhbHNGdW5jdGlvbikge1xuICAgIHZhciBlcXVhbHMgPSBlcXVhbHNGdW5jdGlvbiB8fCB1dGlsLmRlZmF1bHRFcXVhbHM7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB2YXIgZnJlcSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZXF1YWxzKGFycmF5W2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgZnJlcSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmcmVxO1xufVxuZXhwb3J0cy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIHNwZWNpZmllZCBhcnJheXMgYXJlIGVxdWFsIHRvIG9uZSBhbm90aGVyLlxuICogVHdvIGFycmF5cyBhcmUgY29uc2lkZXJlZCBlcXVhbCBpZiBib3RoIGFycmF5cyBjb250YWluIHRoZSBzYW1lIG51bWJlclxuICogb2YgZWxlbWVudHMsIGFuZCBhbGwgY29ycmVzcG9uZGluZyBwYWlycyBvZiBlbGVtZW50cyBpbiB0aGUgdHdvXG4gKiBhcnJheXMgYXJlIGVxdWFsIGFuZCBhcmUgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTEgb25lIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgdGhlIG90aGVyIGFycmF5IHRvIGJlIHRlc3RlZCBmb3IgZXF1YWxpdHkuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCxPYmplY3QpOmJvb2xlYW49fSBlcXVhbHNGdW5jdGlvbiBvcHRpb25hbCBmdW5jdGlvbiB1c2VkIHRvXG4gKiBjaGVjayBlcXVhbGl0eSBiZXR3ZWVuIGVsZW1lbWVudHMgaW4gdGhlIGFycmF5cy5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIHR3byBhcnJheXMgYXJlIGVxdWFsXG4gKi9cbmZ1bmN0aW9uIGVxdWFscyhhcnJheTEsIGFycmF5MiwgZXF1YWxzRnVuY3Rpb24pIHtcbiAgICB2YXIgZXF1YWxzID0gZXF1YWxzRnVuY3Rpb24gfHwgdXRpbC5kZWZhdWx0RXF1YWxzO1xuICAgIGlmIChhcnJheTEubGVuZ3RoICE9PSBhcnJheTIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5MS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWVxdWFscyhhcnJheTFbaV0sIGFycmF5MltpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydHMuZXF1YWxzID0gZXF1YWxzO1xuLyoqXG4gKiBSZXR1cm5zIHNoYWxsb3cgYSBjb3B5IG9mIHRoZSBzcGVjaWZpZWQgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFycmF5IHRoZSBhcnJheSB0byBjb3B5LlxuICogQHJldHVybiB7QXJyYXl9IGEgY29weSBvZiB0aGUgc3BlY2lmaWVkIGFycmF5XG4gKi9cbmZ1bmN0aW9uIGNvcHkoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXkuY29uY2F0KCk7XG59XG5leHBvcnRzLmNvcHkgPSBjb3B5O1xuLyoqXG4gKiBTd2FwcyB0aGUgZWxlbWVudHMgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbnMgaW4gdGhlIHNwZWNpZmllZCBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSBpbiB3aGljaCB0byBzd2FwIGVsZW1lbnRzLlxuICogQHBhcmFtIHtudW1iZXJ9IGkgdGhlIGluZGV4IG9mIG9uZSBlbGVtZW50IHRvIGJlIHN3YXBwZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gaiB0aGUgaW5kZXggb2YgdGhlIG90aGVyIGVsZW1lbnQgdG8gYmUgc3dhcHBlZC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgdGhlIGFycmF5IGlzIGRlZmluZWQgYW5kIHRoZSBpbmRleGVzIGFyZSB2YWxpZC5cbiAqL1xuZnVuY3Rpb24gc3dhcChhcnJheSwgaSwgaikge1xuICAgIGlmIChpIDwgMCB8fCBpID49IGFycmF5Lmxlbmd0aCB8fCBqIDwgMCB8fCBqID49IGFycmF5Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB0ZW1wID0gYXJyYXlbaV07XG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICBhcnJheVtqXSA9IHRlbXA7XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLnN3YXAgPSBzd2FwO1xuZnVuY3Rpb24gdG9TdHJpbmcoYXJyYXkpIHtcbiAgICByZXR1cm4gJ1snICsgYXJyYXkudG9TdHJpbmcoKSArICddJztcbn1cbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZztcbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIG9uY2UgZm9yIGVhY2ggZWxlbWVudCBwcmVzZW50IGluIHRoaXMgYXJyYXlcbiAqIHN0YXJ0aW5nIGZyb20gaW5kZXggMCB0byBsZW5ndGggLSAxLlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IGluIHdoaWNoIHRvIGl0ZXJhdGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCk6Kn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZSwgaXQgaXNcbiAqIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6IHRoZSBlbGVtZW50IHZhbHVlLCB0byBicmVhayB0aGUgaXRlcmF0aW9uIHlvdSBjYW5cbiAqIG9wdGlvbmFsbHkgcmV0dXJuIGZhbHNlLlxuICovXG5mdW5jdGlvbiBmb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICAgIGZvciAodmFyIF9pID0gMCwgYXJyYXlfMSA9IGFycmF5OyBfaSA8IGFycmF5XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBlbGUgPSBhcnJheV8xW19pXTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGVsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmZvckVhY2ggPSBmb3JFYWNoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5leHBvcnRzLmhhcyA9IGZ1bmN0aW9uIChvYmosIHByb3ApIHtcbiAgICByZXR1cm4gX2hhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn07XG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29tcGFyZSBlbGVtZW50IG9yZGVyLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlKGEsIGIpIHtcbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0Q29tcGFyZSA9IGRlZmF1bHRDb21wYXJlO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIHRlc3QgZXF1YWxpdHkuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG59XG5leHBvcnRzLmRlZmF1bHRFcXVhbHMgPSBkZWZhdWx0RXF1YWxzO1xuLyoqXG4gKiBEZWZhdWx0IGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRUb1N0cmluZyhpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdDT0xMRUNUSU9OX05VTEwnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1VuZGVmaW5lZChpdGVtKSkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fVU5ERUZJTkVEJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuICckcycgKyBpdGVtO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICckbycgKyBpdGVtLnRvU3RyaW5nKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0VG9TdHJpbmcgPSBkZWZhdWx0VG9TdHJpbmc7XG4vKipcbiogSm9pbnMgYWxsIHRoZSBwcm9wZXJpZXMgb2YgdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQgam9pbiBzdHJpbmdcbiovXG5mdW5jdGlvbiBtYWtlU3RyaW5nKGl0ZW0sIGpvaW4pIHtcbiAgICBpZiAoam9pbiA9PT0gdm9pZCAwKSB7IGpvaW4gPSAnLCc7IH1cbiAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ0NPTExFQ1RJT05fTlVMTCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVW5kZWZpbmVkKGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiAnQ09MTEVDVElPTl9VTkRFRklORUQnO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0cmluZyhpdGVtKSkge1xuICAgICAgICByZXR1cm4gaXRlbS50b1N0cmluZygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHRvcmV0ID0gJ3snO1xuICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLmhhcyhpdGVtLCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG9yZXQgPSB0b3JldCArIGpvaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvcmV0ID0gdG9yZXQgKyBwcm9wICsgJzonICsgaXRlbVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9yZXQgKyAnfSc7XG4gICAgfVxufVxuZXhwb3J0cy5tYWtlU3RyaW5nID0gbWFrZVN0cmluZztcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYykge1xuICAgIHJldHVybiAodHlwZW9mIGZ1bmMpID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudCBpcyB1bmRlZmluZWQuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqKSA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYSBzdHJpbmcuXG4gKiBAZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcbi8qKlxuICogUmV2ZXJzZXMgYSBjb21wYXJlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHJldmVyc2VDb21wYXJlRnVuY3Rpb24oY29tcGFyZUZ1bmN0aW9uKSB7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKGNvbXBhcmVGdW5jdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICBpZiAoYSA8IGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZCwgdikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihkLCB2KSAqIC0xO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMucmV2ZXJzZUNvbXBhcmVGdW5jdGlvbiA9IHJldmVyc2VDb21wYXJlRnVuY3Rpb247XG4vKipcbiAqIFJldHVybnMgYW4gZXF1YWwgZnVuY3Rpb24gZ2l2ZW4gYSBjb21wYXJlIGZ1bmN0aW9uLlxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVUb0VxdWFscyhjb21wYXJlRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKSA9PT0gMDtcbiAgICB9O1xufVxuZXhwb3J0cy5jb21wYXJlVG9FcXVhbHMgPSBjb21wYXJlVG9FcXVhbHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IDIwMTMgQmFzYXJhdCBBbGkgU3llZC4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciBNSVQgb3BlbiBzb3VyY2UgbGljZW5zZSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gT3JnaW5hbCBqYXZhc2NyaXB0IGNvZGUgd2FzIGJ5IE1hdXJpY2lvIFNhbnRvc1xuLy9cbnZhciBfYXJyYXlzID0gcmVxdWlyZSgnLi9hcnJheXMnKTtcbmV4cG9ydHMuYXJyYXlzID0gX2FycmF5cztcbnZhciBCYWdfMSA9IHJlcXVpcmUoJy4vQmFnJyk7XG5leHBvcnRzLkJhZyA9IEJhZ18xLmRlZmF1bHQ7XG52YXIgQlNUcmVlXzEgPSByZXF1aXJlKCcuL0JTVHJlZScpO1xuZXhwb3J0cy5CU1RyZWUgPSBCU1RyZWVfMS5kZWZhdWx0O1xudmFyIERpY3Rpb25hcnlfMSA9IHJlcXVpcmUoJy4vRGljdGlvbmFyeScpO1xuZXhwb3J0cy5EaWN0aW9uYXJ5ID0gRGljdGlvbmFyeV8xLmRlZmF1bHQ7XG52YXIgSGVhcF8xID0gcmVxdWlyZSgnLi9IZWFwJyk7XG5leHBvcnRzLkhlYXAgPSBIZWFwXzEuZGVmYXVsdDtcbnZhciBMaW5rZWREaWN0aW9uYXJ5XzEgPSByZXF1aXJlKCcuL0xpbmtlZERpY3Rpb25hcnknKTtcbmV4cG9ydHMuTGlua2VkRGljdGlvbmFyeSA9IExpbmtlZERpY3Rpb25hcnlfMS5kZWZhdWx0O1xudmFyIExpbmtlZExpc3RfMSA9IHJlcXVpcmUoJy4vTGlua2VkTGlzdCcpO1xuZXhwb3J0cy5MaW5rZWRMaXN0ID0gTGlua2VkTGlzdF8xLmRlZmF1bHQ7XG52YXIgTXVsdGlEaWN0aW9uYXJ5XzEgPSByZXF1aXJlKCcuL011bHRpRGljdGlvbmFyeScpO1xuZXhwb3J0cy5NdWx0aURpY3Rpb25hcnkgPSBNdWx0aURpY3Rpb25hcnlfMS5kZWZhdWx0O1xudmFyIEZhY3RvcnlEaWN0aW9uYXJ5XzEgPSByZXF1aXJlKCcuL0ZhY3RvcnlEaWN0aW9uYXJ5Jyk7XG5leHBvcnRzLkZhY3RvcnlEaWN0aW9uYXJ5ID0gRmFjdG9yeURpY3Rpb25hcnlfMS5kZWZhdWx0O1xudmFyIEZhY3RvcnlEaWN0aW9uYXJ5XzIgPSByZXF1aXJlKCcuL0ZhY3RvcnlEaWN0aW9uYXJ5Jyk7XG5leHBvcnRzLkRlZmF1bHREaWN0aW9uYXJ5ID0gRmFjdG9yeURpY3Rpb25hcnlfMi5kZWZhdWx0O1xudmFyIFF1ZXVlXzEgPSByZXF1aXJlKCcuL1F1ZXVlJyk7XG5leHBvcnRzLlF1ZXVlID0gUXVldWVfMS5kZWZhdWx0O1xudmFyIFByaW9yaXR5UXVldWVfMSA9IHJlcXVpcmUoJy4vUHJpb3JpdHlRdWV1ZScpO1xuZXhwb3J0cy5Qcmlvcml0eVF1ZXVlID0gUHJpb3JpdHlRdWV1ZV8xLmRlZmF1bHQ7XG52YXIgU2V0XzEgPSByZXF1aXJlKCcuL1NldCcpO1xuZXhwb3J0cy5TZXQgPSBTZXRfMS5kZWZhdWx0O1xudmFyIFN0YWNrXzEgPSByZXF1aXJlKCcuL1N0YWNrJyk7XG5leHBvcnRzLlN0YWNrID0gU3RhY2tfMS5kZWZhdWx0O1xudmFyIE11bHRpUm9vdFRyZWVfMSA9IHJlcXVpcmUoJy4vTXVsdGlSb290VHJlZScpO1xuZXhwb3J0cy5NdWx0aVJvb3RUcmVlID0gTXVsdGlSb290VHJlZV8xLmRlZmF1bHQ7XG52YXIgX3V0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbmV4cG9ydHMudXRpbCA9IF91dGlsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl19
return require('typescript-collections');
});

/***/ })
/******/ ]);