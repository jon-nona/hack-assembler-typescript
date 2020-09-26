// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed.
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.


(LOOP)
  @KBD
  D=M
  // // if the value of this register is 0 then no key is pressed so we should jump to the clear loop
  @CLEAR
  D;JEQ // if d === 0 go to CLEAR
  // // if the value of this register is greater than 0 then we should jump to the darken loop
  @DARKEN
  D;JGT // if d > 0 go to DARKEN

  (DARKEN)
    @R0
    M=-1
    @DRAW
    0;JMP // Goto DRAW
  (CLEAR)
    @R0
    M=0
    @DRAW
    0;JMP // Goto DRAW

  (DRAW)
    // Set the counter (R1) to 8192 (this is how many 16-bit words we need to write).
    // We will keep counting down with this as we draw.
    @8192
    D=A // so
    @R1
    M=D // R 1 is equal to 8192

    (WRITEPIXEL)
        // calculate the address to write to
        @R1 // load R1 into the D register
        D=M
        @position // set position = R1
        M=D
        @SCREEN // load the screen register
        D=A // make d = to the screen address
        @position // load position
        M=M+D // so now we know where the hell we are in the map now and we've stored the current value in @position


        @R0
        D=M // get what value to write into the address
        @position
        A=M // set A to the value of M ... i.e. the position it should write to...16 thousand etc
        M=D // write the value into the position

        // decrement the counter
        @R1
        D=M-1
        M=D

        @WRITEPIXEL
        D;JGT

//Loop to beginning
@LOOP
  0;JMP
