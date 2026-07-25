var imgIn;
var thresholdSlider;

function preload() {
  imgIn = loadImage("assets/seaNettles.jpg");
}

function setup() {
  createCanvas(imgIn.width * 2 + 20, imgIn.height);
  thresholdSlider = createSlider(0, 255, 125, 1);
}

function draw() {
  image(imgIn, 0, 0);
  image(thresholdFilter(imgIn), imgIn.width + 20, 0);
}

function thresholdFilter(img) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      // GET INDEX OF EACH PIXELS FIRST 4 BIT DATA BLOCK
      var index = (y * img.width + x) * 4;
      // GET EACH CHANNELS VALUE
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];
      var a = img.pixels[index + 3];

      var gray = (r + g + b) / 3;

      // USE EACH PIXELS GRAYSCALE VALUE TO CONVERT IMAGE TO JUST HARD BLACK AND WHITE
      if (gray > thresholdSlider.value()) {
        gray = 255;
      } else {
        gray = 0;
      }

      imgOut.pixels[index + 0] = gray;
      imgOut.pixels[index + 1] = gray;
      imgOut.pixels[index + 2] = gray;
      imgOut.pixels[index + 3] = a;
    }
  }

  imgOut.updatePixels();
  return imgOut;
}
