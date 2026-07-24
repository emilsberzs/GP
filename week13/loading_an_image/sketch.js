var img;

// Make sure to preload image
function preload() {
  img = loadImage("assets/rockets.png");
}

function setup() {
  createCanvas(900, 600);
}

function draw() {
  background(255);
  // Last 2 parameters are for scaling
  image(img, mouseX, mouseY, img.width/4,img.height/4);
}
