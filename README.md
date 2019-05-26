# mipssimulator
MIPS Simulator is a website that simulates a MIPS program and shows the CPU data-paths associated with each instruction as it is running, along with the state of registers.

https://www.yousifmansour.space/mipssimulator/


Supported Instructions: 
-------------------------

R Type: add, addu, sub, subu, and, or, slt, sltu. 

I Type: addi, addiu, andi, slti, sltiu, ori. 

lw, lb. 

sw, sb. 

beq, j. 

Supported array data types: 
byte, word.


How it works: 
-------------------------

1) Enter a program using the supported synatx. 
2) The program will be checked for erros. If an error is found you will get a messege on the console.
3) If there are no errors you can run the instructions one by one and view their animation and output.

Keyboard Shortcuts: 
-------------------------

F : toggle fullscreen. 

C : change theme color.

M : mute/unmute audio.

P : play animation in sequence.

right arrow: show next frame/instruction.

left arrrow: show previous frame/instruction.

How To Build: 
-------------------------
1) Make sure you have npm, tsc, and webpack installed for you operating system.
2) Open termianl (or cmd) and run npm install. This will install/update node_moduels which are used in the project.
3) Change directory to ts/. Then run `tsc && webpack`.
This will run the typescript compiler and then the webpack module bundler. The commands will execute the options in the files "tsconfig.json" and "webpack.config.js". 
4) The output will be stored in `script/`.
5) You can now open `index.html` in a browser.
6) For hosting, only the following folder/files are needed:
    "css", "script", "res", "index.html".

Details:
-------------------------

Project made for the CMPS 253 course (Software Engineering) at AUB.

By: David Daou, Hussein Harakeh, Raymond Edde and Yousif Mansour.

LISCENCE:
-------------------------

GPL V3.
