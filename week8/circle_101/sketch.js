/// <reference types="matter-js" />

function setup() {
    createCanvas(900, 600);
    background(0);
    // SWITCH p5 ANGLE MODE FROM RADIANS TO DEGREES
    angleMode(DEGREES);

}

function draw() {
    background(0)
    translate(width/2, height/2);
    fill(255)
    // RADIAL TO CARTESIAN CONVERSION
    var radius = 200;
    for (var theta = 0; theta<360;theta=theta+20){
        var x = cos(theta) * radius
        var y = sin(theta) * radius
        ellipse(x,y,15)
    }

}
