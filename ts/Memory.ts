import * as Collections from 'typescript-collections';

export class Memory {
  bytesArray: string[];

  currentIndex: number;

  dictionary: Collections.Dictionary<string, number>;

  constructor() {
    this.dictionary = new Collections.Dictionary<string, number>();
    this.bytesArray = new Array<string>();
    this.currentIndex = 3;

    this.add4Bytes();
  }

  addToMemory(arrayName: string, type: string, values: number[]) {
    var newArray: string[] = new Array<string>();

    switch (type) {
      case '.word': {
        this.goToNextWordIndex();

        this.dictionary.setValue(arrayName, this.currentIndex);

        for (var i = 0; i < values.length; i++) {
          this.goToNextWordIndex();

          var hexString: string = values[i].toString(16);

          var padding: string = '';

          for (var j = 0; j < 8 - hexString.length; j++) {
            padding += '0';
          }

          hexString = padding + hexString;


          for (var k = 7; k > 0; k = k - 2) {
            this.bytesArray[this.currentIndex--] =
                hexString.charAt(k - 1) + hexString.charAt(k);
          }

          this.currentIndex++;

          this.goToNextWordIndex();
        }
        this.currentIndex = this.bytesArray.length - 1;

        break;
      }

      case '.byte': {
        this.goToNextByteIndex();

        this.dictionary.setValue(arrayName, this.currentIndex);

        for (var i = 0; i < values.length; i++) {
          this.goToNextByteIndex();

          var hexString: string = values[i].toString(16);

          if (hexString.length == 1) hexString = '0' + hexString;

          this.bytesArray[this.currentIndex] = hexString;
        }

        break;
      }
    }

    // alert("Memory Constructed. It is " + this.bytesArray.toString() + "
    // number of bytes = " + this.bytesArray.length); alert("The dictionary also
    // works. here it is: " + this.dictionary.toString());
  }

  storeWord(arrayName: string, index: number, byteValue: number) {
    if (index % 4 != 0)
      return;  // throw error
    else {
      var offset: number = this.dictionary.getValue(arrayName) + index;

      var stringValue: string = byteValue.toString(16);

      var padding: string = '';

      for (var j = 0; j < 8 - stringValue.length; j++) {
        padding += '0';
      }

      stringValue = padding + stringValue;

      for (var k = 0; k < 4; k++) {
        this.bytesArray[offset - (3 - k)] =
            stringValue[(k * 2)] + stringValue[(k * 2) + 1];
      }
    }
  }

  loadWord(arrayName: string, index: number): string {
    if (index % 4 != 0)
      return undefined;  // throw error
    else {
      var offset: number = this.dictionary.getValue(arrayName) + index;

      var thingToReturn: string = '';

      // thingToReturn += this.bytesArray[offset] + this.bytesArray[offset - 1]
      // + this.bytesArray[offset - 2] + this.bytesArray[offset - 3];

      // or this

      thingToReturn += this.bytesArray[offset - 3] +
          this.bytesArray[offset - 2] + this.bytesArray[offset - 1] +
          this.bytesArray[offset];

      return thingToReturn;
    }
  }

  storeByte(arrayName: string, index: number, byteValue: number) {
    // alert("this is the given array name " + arrayName + " given index " +
    // index + " given byteValue " + byteValue);

    console.log(
        'arrayName is ' + arrayName + ' index given as ' + index +
        ' byteValue in hex is ' + byteValue.toString(16));

    var offset: number = this.dictionary.getValue(arrayName);

    index++;

    if (index > 4) {
      while (index > 4) {
        offset += 4;
        index -= 4;
      }
    } else
      offset -= (index - 1);

    // alert(offset + " is offset " + index + " this was index");

    // alert("loadbyte offset is " + offset + " return this " +
    // this.bytesArray[offset]);

    console.log(
        'offset after while loop is ' + offset + ' currently its ' +
        this.bytesArray[offset]);

    this.bytesArray[offset] = byteValue.toString(16);

    console.log(
        'this is bytes array after adding f ' + this.bytesArray.toString());
  }

  loadByte(arrayName: string, index: number): string {
    var offset: number = this.dictionary.getValue(arrayName);

    index++;

    if (index > 4) {
      while (index > 4) {
        offset += 4;
        index -= 4;
      }
    } else
      offset -= (index - 1);

    alert('offset in loadByte after while loop is ' + offset);

    alert('loadByte returning this ' + this.bytesArray[offset]);

    return this.bytesArray[offset];
  }

  private goToNextByteIndex() {
    if (this.bytesArray[this.currentIndex] == '0')
      return;
    else {
      if (this.currentIndex % 4 == 0) {
        if (this.currentIndex + 7 > this.bytesArray.length) this.add4Bytes();
        this.currentIndex += 7;
      } else
        this.currentIndex--;
    }
  }

  private goToNextWordIndex() {
    if ((this.currentIndex + 1) % 4 == 0)
      return;
    else {
      while (this.currentIndex % 4 != 0) {
        this.currentIndex--;
      }

      if ((this.currentIndex + 7) > this.bytesArray.length) this.add4Bytes();
      this.currentIndex += 7;
    }
  }

  private add4Bytes() {
    var start = this.bytesArray.length;
    var end = start + 4;

    for (var i = start; i < end; i++) {
      this.bytesArray[i] = '0';
    }
  }
}
