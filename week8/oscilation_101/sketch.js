/// <reference types="matter-js" />

function setup() {
    createCanvas(900, 600);
    background(0);
    angleMode(DEGREES);
}

function draw() {
    background(0)
    translate(width / 2, height / 2);
    fill(255);

    // AMPLITUDE OF THE MOVEMENT (HALF OF RANGE)
    var amp = width / 2;

    // HOW MANY FRAMES FOR A FULL CYCLE
    var period = 60;
    // OFFSET OF TH WAVE (Where it will start), 0-360
    var phase = 0;
    var locationX = sin(360 * frameCount / period + phase) * amp;
    ellipse(locationX, 0, 30);

    var freq = 1;
    var locationY = sin(frameCount * 6 * freq + phase)*amp;
    fill(125)
    ellipse(locationY, 50,30)
}
