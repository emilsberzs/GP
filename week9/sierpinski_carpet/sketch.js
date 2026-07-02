/// <reference types="matter-js" />

var startSize;
var functionCalls;

function setup() {
    createCanvas(1200,1200);
    background(255);
    fill(0);
    noStroke();
    noSmooth();
    rectMode(CENTER);
    startSize = pow(3, 6); //3*3*3*3*3*3
    functionCalls = 0;
}

function draw() {
    translate(width / 2, height / 2)
    mySquare(startSize);
    noLoop();
}

function mySquare(side) {
    side = side / 3;
    functionCalls +=1;

    // Base case (end condition). Carries on while side is atleast one pixel
    if (side >= 1) {
        rect(0, 0, side, side)

        //left side 
        push();
        translate(-side, 0);
        mySquare(side)
        pop();

        //left and above 
        push();
        translate(-side, -side);
        mySquare(side)
        pop();

        //top side
        push();
        translate(0, -side);
        mySquare(side)
        pop();

        //top right side
        push();
        translate(side, -side);
        mySquare(side)
        pop();

        //right side of main square
        push();
        translate(side,0);
        mySquare(side)
        pop();

        //right lower side of main square
        push();
        translate(side,side);
        mySquare(side)
        pop();

        //lower side of main square
        push();
        translate(0,side);
        mySquare(side)
        pop();

        //lower left side of main square
        push();
        translate(-side,side);
        mySquare(side)
        pop();



       
    }
}