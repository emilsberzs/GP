var imgIn;

function preload() {
  imgIn = loadImage("assets/seaNettles.jpg");
}

function setup() {
  createCanvas(imgIn.width*2, imgIn.height);
  pixelDensity(1);
}

function draw() {
  image(imgIn, 0, 0);
  image(invertFilter(imgIn), imgIn.width+20, 0);
  noLoop();
}

function invertFilter(img) {
  var imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (y * img.width + x) * 4;

      // INVERT EACH CHANNEL
      // red
      var r = 255 - img.pixels[index + 0];
      // green
      var g = 255 - img.pixels[index + 1];
      // red
      var b = 255 - img.pixels[index + 2];

      imgOut.pixels[index+0] = r;
      imgOut.pixels[index+1] = g;
      imgOut.pixels[index+2] = b;
      imgOut.pixels[index+3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}
