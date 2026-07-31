var video;
var threshold = 200;
var threshold_slider;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
  noStroke();

  threshold_slider = createSlider(0, 255, 200);
}

function draw() {
  background(0);
  image(video, 0, 0);
  video.loadPixels();

  var worldRecord = 0;
  var sumX = 0;
  var sumY = 0;
  var avgX = 0;
  var avgY = 0;

  var count = 0;

  threshold = threshold_slider.value();

  for (var x = 0; x < video.width; x++) {
    for (var y = 0; y < video.height; y++) {
      var index = (y * video.width + x) * 4;

      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      if (brightness > threshold) {
        sumX = sumX + x;
        sumY = sumY + y;
        count++;
      }
    }
  }

  if (count > 0) {
    avgX = sumX / count;
    avgY = sumY / count;
  }

  fill(255);
  stroke(0);
  ellipse(avgX, avgY, 20, 20);
}
