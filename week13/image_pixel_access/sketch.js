var img;
function preload() {
  img = loadImage("assets/rockets.png");
}

function setup() {
  createCanvas(900, 600);
  pixelDensity(1);
}

function draw() {
  background(255);
  image(img, 0, 0);

  // Simple way of reading out pixels from image by coordinates
  // var c = img.get(mouseX,mouseY);
  // fill(c);
  // rect(mouseX,mouseY,50,50);

  // Better way
  img.loadPixels();

  // Get index of each pixel start in RGBA pixel array
  // Much faster when thing get more complicated
  var index = ((img.width * mouseY) + mouseX) * 4;
  var redChannel = img.pixels[index + 0];
  var greenChannel = img.pixels[index + 1];
  var blueChannel = img.pixels[index + 2];
  var alphaChannel = img.pixels[index + 3];

  fill(redChannel,greenChannel,blueChannel,alphaChannel);
  rect(mouseX, mouseY, 50, 50);
}
