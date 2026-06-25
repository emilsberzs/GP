/// <reference types="matter-js" />

function setup() {
    createCanvas(900, 600);
    background(0);
    angleMode(DEGREES);
}

function draw() {
    background(0)
    translate(0, height / 2);

    beginShape();
    noFill()
    for (var x = 0; x <= width; x++) {
        stroke(255)
        var wave_one = sin(x + frameCount) * height / 4;
        vertex(x, wave_one);

    }

    endShape();

    beginShape();
    for (var x = 0; x <= width; x++) {
        stroke(125)
        var wave_two = sin(x * 10+frameCount*20) * height / 20;
        vertex(x, wave_two)

    }
    endShape();



    endShape();
    
    beginShape();
    for (var x = 0; x <= width; x++) {
        stroke(125)
        var wave_three = noise(x/10+frameCount/50)*100;
        vertex(x, wave_three)
    
    }
    endShape();

    beginShape();
    for (var x = 0; x <= width; x++) {
        stroke(125)
        var wave_one = sin(x + frameCount) * height / 4;
        var wave_two = sin(x * 10+frameCount*20) * height / 20;
        var wave_three = noise(x/10+frameCount/50)*100;
        vertex(x, wave_three+wave_one+wave_two)
    
    }
    endShape();
}