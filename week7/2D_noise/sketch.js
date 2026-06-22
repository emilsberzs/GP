/// <reference types="matter-js" />


function setup() {
    createCanvas(300, 300);
    background(0);
}

function draw() {
    //randomGrid();
    //noLoop();
    noiseGrid()
}


//Makes it look like old TV static
function randomGrid() {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var c = random(0, 255);
            stroke(c);
            point(x, y);
        }
    }
}

// Depemding on scale value of noise, very wide use
function noiseGrid() {
        for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            // Scale down to give natural look, changes granularity
            var n = noise(x/50,y/50);
            // Map noise to color
            var c = map(n,0,1,0,255)
            stroke(c);
            point(x, y);
        }
    }
}
