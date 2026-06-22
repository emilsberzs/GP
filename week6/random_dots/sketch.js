/// <reference types="matter-js" />

function setup() {
    createCanvas(900, 600);
    background(0);
    // SET A FIXED 'RANDOM' number SEQUENCE
    randomSeed(0);
}

function draw() {
    var randomX = random(0,width);
    var randomY = random(0,height);

    noStroke;
    fill(random(255),random(255),random(255),random(255));
    ellipse(randomX, randomY, random(3,50), random(50,3));
   

}
