var video;
var threshold = 200;
var threshold_slider;
var redTarget, greenTarget, blueTarget;
var button;
var debug = false;
var blobs = [];

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
  noStroke();

  threshold_slider = createSlider(0, 255, 200);
  threshold_slider.position(20, 20);

  button = createButton("Debug Mode");
  button.position(20, 50);
  button.mousePressed(flipDebugMode);

  redTarget = 255;
  greenTarget = 0;
  blueTarget = 0;
}

function draw() {
  background(0);
  image(video, 0, 0);
  video.loadPixels();

  blobs = [];

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

      var redSource = video.pixels[index + 0];
      var greenSource = video.pixels[index + 1];
      var blueSource = video.pixels[index + 2];

      var distance = dist(
        redSource,
        greenSource,
        blueSource,
        redTarget,
        greenTarget,
        blueTarget,
      );

      if (distance < threshold) {
        blobLogic(x, y);
        sumX = sumX + x;
        sumY = sumY + y;
        count++;

        if (debug) {
          video.pixels[index + 0] = 255;
          video.pixels[index + 1] = 0;
          video.pixels[index + 2] = 255;
        }
      }
    }
  }

  if (count > 0) {
    avgX = sumX / count;
    avgY = sumY / count;
  }

  if (debug) video.updatePixels();

  fill(255);
  stroke(0);
  ellipse(avgX, avgY, 20, 20);
  strokeWeight(1);
  noFill();
  stroke(255);
  text(threshold, 160, 35);

  for (var i = 0; i < blobs.length; i++) {
    blobs[i].show();
  }
}

function keyPressed() {
  var color = video.get(mouseX, mouseY);
  redTarget = red(color);
  greenTarget = green(color);
  blueTarget = blue(color);
}

function flipDebugMode() {
  debug = !debug;
  console.log(debug);
}

function blobLogic(x, y) {
  var found = false;
  if (blobs.length > 0) {
    for (var i = 0; i < blobs.length; i++) {
      if (blobs[i].isNear(x, y)) {
        blobs[i].add(x, y);
        found = true;
        break;
      }
    }
  }

  if (!found) {
    blobs.push(new Blob(x, y));
  }
}

class Blob {
  constructor(x, y) {
    this.minx = x;
    this.miny = y;
    this.maxx = x;
    this.maxy = y;
  }

  show() {
    push();
    stroke(0);
    noFill();
    strokeWeight(2);
    rectMode(CORNERS);
    rect(this.minx, this.miny, this.maxx, this.maxy);
    pop();
  }

  add(x, y) {
    this.minx = min(this.minx, x);
    this.miny = min(this.miny, y);
    this.maxx = max(this.maxx, x);
    this.maxy = max(this.maxy, y);
  }

  size() {
    return (this.maxx - this.minx) * (this.maxy - this.miny);
  }

  isNear(x, y) {
    var cx = (this.minx + this.maxx) / 2;
    var cy = (this.miny + this.maxy) / 2;

    var d = dist(cx, cy, x, y);
    if (d < 50) {
      return true;
    } else {
      return false;
    }
  }
}
