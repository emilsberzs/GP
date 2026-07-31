var video;

function setup() {
  createCanvas(640, 400);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
  noStroke();
}

function draw() {
  background(0);
  image(video, 0, 0);
  video.loadPixels();

  var worldRecord = 0;
  var recordX = 0;
  var recordY = 0;

  for (var x = 0; x < video.width; x++) {
    for (var y = 0; y < video.height; y++) {
      var index = (y * video.width + x) * 4;

      var r = video.pixels[index + 0];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];

      var brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      if (brightness > worldRecord) {
        worldRecord = brightness;
        recordX = x;
        recordY = y;
      }
    }
  }

  fill(255);
  stroke(0);
  ellipse(recordX, recordY, 20, 20)
}
