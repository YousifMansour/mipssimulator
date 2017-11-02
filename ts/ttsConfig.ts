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
    registers: " ", // this is the square in the middle below control circle
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
    // signExtendToShiftLeftBottom: "sign extended to shift",
    signExtendToMUX: "sign extended goes to m u x ",
    signExtendToShiftLeftBottom: "sign extend the immediate to thirty two bits",
    
    jumpAddress310: "jump destination determined",

    
    
    
    
    aluTop: "A L U performing operation on values",
}
