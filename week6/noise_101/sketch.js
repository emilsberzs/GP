/// <reference types="matter-js" />

var time = 0;
function setup() {
    createCanvas(900, 600);
    rectMode(CENTER);
}

function draw() {
    background(0);
    time += 0.001;
    // GETIING PERLINS NOISE VALUE AT SPECIFIC POINT IN 'TIME'
    var noiseX = noise(time);
    var noiseY = noise(time)
    // SCALING NOISE TO SIZE OF OUR CANVAS
    var locationX = map(noiseX, 0, 1, 0, width);
    var locationY = map(noiseY, 0, 1, 0, height);
    // PERLIN NOISE DEPENDANT COLOR
    var green = map(noiseX, 0, 1, 0, 255)
    // PERLIN DEPENDANT ANGLE
    var rotation = map(noiseX, 0, 1, -5, 5)
    // TRANSLATE COORDINATES TO
    translate(locationX, locationY);
    // PERLIN DEPENDANT ROTATION
    rotate(rotation)
    // PERLIN DEPENDANT COLOR
    fill(0, green, 0);


    // DRAW RECTANGLE IN SCALED AND TRANSLATED COORDINATES
    rect(0, 0, 100, 100);

}
