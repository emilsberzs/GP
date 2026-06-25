/// <reference types="matter-js" />

function setup() {
    createCanvas(900, 600);
    background(0);
    // SWITCH p5 ANGLE MODE FROM RADIANS TO DEGREES
    angleMode(DEGREES);
    noStroke()

}

function draw() {
    translate(width / 2, height / 2);
    fill(255)
    // MAKES ELIPSE ROTATE IN CIRCLE
    var radius = 200;
    var theta = frameCount;
    var radius = frameCount/10;
    var x = cos(theta) * radius
    var y = sin(theta) * radius
    ellipse(x, y, 15)


}
