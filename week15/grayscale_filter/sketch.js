var imgIn;

function preload() {
  imgIn = loadImage("assets/seaNettles.jpg");
}

function setup() {
  createCanvas(imgIn.width * 2 + 20, imgIn.height);
  pixelDensity(1);
  noLoop();
}

function draw() {
  image(imgIn, 0, 0);
  image(grayscaleFilter(imgIn), imgIn.width + 20, 0);
  noLoop();
}

function grayscaleFilter(img) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (y * img.width + x) * 4;

      // GET PIXEL VALUES FOR ALL CHANNELS
      r = img.pixels[index + 0];
      g = img.pixels[index + 1];
      b = img.pixels[index + 2];
      a = img.pixels[index + 3];

      // SET OUTPUT PUXEL VALUES
      // Weighted values to represent human vision
      // (luma calculation)
      gray = 0.299 * r + 0.587 * g + 0.114 * b;

      imgOut.pixels[index + 0] = gray;
      imgOut.pixels[index + 1] = gray;
      imgOut.pixels[index + 2] = gray;
      imgOut.pixels[index + 3] = a;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}
