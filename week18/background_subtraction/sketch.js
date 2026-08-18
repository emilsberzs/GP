var video;
var threshold =20 ;
var thresholdSlider;
var button;
var backgroundImage;
var currentImage;
var differentImage;

function setup() {
  createCanvas(640 * 2, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
  noStroke();

  thresholdSlider = createSlider(0, 255, 120, 1);
  thresholdSlider.position(20, 20);
}

function draw() {
  background(0);
  image(video, 0, 0);

  currentImage = createImage(video.width, video.height);
  currentImage.copy(
    video,
    0,
    0,
    video.width,
    video.height,
    0,
    0,
    video.width,
    video.height
  );

  currentImage.loadPixels();

  differentImage = createImage(video.width, video.height);
  differentImage.loadPixels();

  threshold = thresholdSlider.value();

  if (backgroundImage) {
    backgroundImage.loadPixels();

    for (var x = 0; x < video.width; x++) {
      for (var y = 0; y < video.height; y++) {
        var index = (x + y * video.width) * 4;

        var redSource = currentImage.pixels[index + 0];
        var greenSource = currentImage.pixels[index + 1];
        var blueSource = currentImage.pixels[index + 2];

        var redBackground = backgroundImage.pixels[index + 0];
        var greenBackground = backgroundImage.pixels[index + 1];
        var blueBackground = backgroundImage.pixels[index + 2];

        var d = dist(
          redSource,
          greenSource,
          blueSource,
          redBackground,
          greenBackground,
          blueBackground
        );

        if (d < threshold) {
          differentImage.pixels[index + 0] = 0;
          differentImage.pixels[index + 1] = 0;
          differentImage.pixels[index + 2] = 0;
          differentImage.pixels[index + 3] = 255;
        } else {
          differentImage.pixels[index + 0] = 255;
          differentImage.pixels[index + 1] = 255;
          differentImage.pixels[index + 2] = 255;
          differentImage.pixels[index + 3] = 255;
        }
      }
    }
  }

  differentImage.updatePixels();
  image(differentImage, 640, 0);
}

function keyPressed() {
  backgroundImage = createImage(
    currentImage.width,
    currentImage.height
  );

  backgroundImage.copy(
    currentImage,
    0,
    0,
    currentImage.width,
    currentImage.height,
    0,
    0,
    currentImage.width,
    currentImage.height
  );

  backgroundImage.loadPixels();

  console.log("Image updated");
}