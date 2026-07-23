// APPLYING IMAGE AS A SURFACE/TEXTURe

var img;

function preload(){
    img= loadImage('assets/rocks.jpg')
}
function setup() {
    createCanvas(900, 600,WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    texture(img);
    rotateY(frameCount);
    rotateX(-frameCount)
    box(300);
}
