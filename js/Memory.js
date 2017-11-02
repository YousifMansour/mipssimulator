"use strict";
exports.__esModule = true;
var Collections = require("typescript-collections");
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
