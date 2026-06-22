/// <reference types="matter-js" />


function setup() {
    createCanvas(300, 300);
    background(0);
}

function draw() {
    noisyGrid()
}



// Depemding on scale value of noise, very wide use
function noisyGrid() {
        for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            // Framecount works as a third parameter
            var n = noise(x/50,y/50,frameCount/20);
            var c = map(n,0,1,0,255)
            stroke(c);
            point(x, y);
        }
    }
}
