/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
// code adapted from Coding Train (https://thecodingtrain.com/)
// released under MIT license by Daniel Shiffman

// Sea nettles image is taken from Wikipedia
// it is released under a creative commons license:
// https://es.wikipedia.org/wiki/Chrysaora#/media/Archivo:Six-Sea-Nettles.jpg
var imgIn;

// Same process as blur filter  
// but different matrix values
var matrix = [
  [-1,-1,-1],
  [-1,9,-1],
  [-1,-1,-1]
];
function preload() {
  imgIn = loadImage("assets/seaNettles.jpg");
}
/////////////////////////////////////////////////////////////

function setup() {
  createCanvas(imgIn.width * 2 + 20, imgIn.height);
  pixelDensity(1);
}

/////////////////////////////////////////////////////////////
function draw() {
  background(255);

  image(imgIn, 0, 0);
  image(sharpen(imgIn), imgIn.width + 20, 0);

  noLoop();
}

/////////////////////////////////////////////////////////////
function sharpen(img) {
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  // read every pixel
  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4;

      // Get sharpened pixel for each pixel
      var c = convolution(x, y, matrix, matrixSize, imgIn);
      imgOut.pixels[index + 0] = c[0];
      imgOut.pixels[index + 1] = c[1];
      imgOut.pixels[index + 2] = c[2];
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0;
  var totalGreen = 0;
  var totalBlue = 0;

  // Without offset, would shift mask one index right and down.
  // Offset centers it
  // floor(3/2)=1.
  var offset = floor(matrixSize / 2);

  // Goes down column by column and puts pixel values in xLoc/yLoc
  for (var i = 0; i < matrixSize; i++) {
    for (var j = 0; j < matrixSize; j++) {
      var xLoc = x + i - offset;
      var yLoc = y + i - offset;

      var index = (img.width * y + xLoc) * 4;

      // Constrain indices to size of the array
      index = constrain(index, 0, img.pixels.length - 1);

      totalRed += img.pixels[index + 0] * matrix[i][j];
      totalGreen += img.pixels[index + 1] * matrix[i][j];
      totalBlue += img.pixels[index + 2] * matrix[i][j];
    }
  }
  return [totalRed, totalGreen, totalBlue];
}
