// Code was getting too  messy, I've decided to put each image in object,
// together with all the supporting data, such as name, color space, thresholds,
// location, fade, zoom.
// In this way I can just maipulate each object to perform the animation.
// Thinking about it more, perhaps an Actor class would be even better.
// This way I can implement all the animation, and fading/zooming as class methods

/*
● Animate transitions (e.g., smooth scrolling, fade or zoom effects)
● The processed foreground (i.e. people only) images should appear using
the following animation sequence: 
    (i) fade in, zoom in, fade out, then 
    (ii) fade in, zoom out, fade out, then 
    (i), (ii), and so on. 
    Also, the person's image should move from left to right as seen in the demo.
● The background image should also animate and smoothly move from left
to right. You can use an image of your liking for the background.
● Finally, the text should also use the same animation as the person but the
text should move from right to left. You should not use translate() for these
tasks.
*/

class Actor {
  constructor(name, image) {
    this.name = name;
    this.image = image;
    this.reset();
  }

  reset() {
    this.imageX = -this.image.width;
    this.nameX = width;
    this.zoom = 1;
    this.fade = 0;
    this.mode = 0;
    this.progress = 0;
    this.finished = false;
  }
  update() {
    // Fade and zoom animation
    if (this.mode == 0) {
      // (i) Fade in + zoom in
      this.fade = this.progress * 255;
      this.zoom = 1 + this.progress * 0.3;
    } else if (this.mode == 1) {
      // (i) Fade out
      this.fade = (1 - this.progress) * 255;
    } else if (this.mode == 2) {
      // (ii) Fade in + zoom out
      this.fade = this.progress * 255;
      this.zoom = 1.3 - this.progress * 0.3;
    } else if (this.mode == 3) {
      // (ii) Fade out
      this.fade = (1 - this.progress) * 255;
    }

    // Move actor left to right (7px/frame is spot on to move the full width with fade in/out cycle)
    this.imageX += 7;
    // Text right to left, full width
    this.nameX -= 7;

    // Animation timing
    this.progress += 0.015;

    if (this.progress >= 1) {
      this.progress = 0;
      this.mode++;
    }

    // Actor only finishes after travelling across the canvas
    if (this.imageX > width) {
      this.finished = true;
    }
  }
}
var images = [];
var actors = [];

// To be fair, all images performed better with RGB color space, but I made one to use
// HSB just to satisfy the rubric and show that ive used it.
var thresholds = [
  [0, 190, 120, 192],
  [0, 236, 240, 239],
  [0, 207, 197, 203],
  [0, 250, 233, 228],
  [0, 190, 195, 185],
  [0, 239, 236, 232],
  [1, 12, 31, 1],
  [0, 183, 224, 214],
];

var names = [
  "Actor One",
  "Actor Two",
  "Actor Three",
  "Actor Four",
  "Actor Five",
  "Actor Six",
  "Actor Seven",
  "Actor Eight",
];

// Flags for prompts and functionality
var carouselLoaded = false; // When false prompts user for C command, then starts carousel background
var imagesLoaded = false; // When false prompts for L command, then loads images removing background and pushing them into array
var animationStarted = false; // When false prompts for S command, and then starts updating image locations
var activeActor = 0;
// Background starts with smallest square at left side
var backgroundX = -300;

function preload() {
  for (let i = 1; i <= 8; i++) {
    images.push(loadImage("assets/" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(1200, 900);
}

function draw() {
  background(5, 5, 30);

  if (!carouselLoaded) {
    message("Press C to load carousel");
    return;
  }

  drawBackground();

  if (!imagesLoaded) {
    message("Press L to load images");
    return;
  }

  if (!animationStarted) {
    message("Press S to start animation");
  }

  drawCarousel();

  if (animationStarted) {
    actors[activeActor].update();

    // Once actor reaches right side, switch to next actor
    if (actors[activeActor].finished) {
      activeActor = (activeActor + 1) % actors.length;
      // Reset active actor values before starting
      actors[activeActor].reset();
    }
  }
}

function drawCarousel() {
  // Get the current actor from the array
  let a = actors[activeActor];
  // Apply correct fade level for where in progression animation is
  tint(255, a.fade);
  // Draw imager at correct position and zoom level
  image(a.image, a.imageX, 50, a.image.width * a.zoom, a.image.height * a.zoom);
  // Reset tint so name text is not affected
  noTint();
  // Specify and draw name in correct location for animations progression
  fill(255);
  textSize(40);
  text(a.name, a.nameX, 100);
}

function drawBackground() {
  // Move background from left to right each frame
  // These values move background fully over the screen while all 8 actors
  // do their thing, then reset to left hand side
  backgroundX += 0.4;
  if (backgroundX > 600) {
    backgroundX = 0;
  }

  noStroke();
  noFill();
  stroke(45, 45, 90);
  strokeWeight(3);
  rectMode(CENTER);
  rect(480 + backgroundX, 190, 340, 340);
  rect(480 + backgroundX, 190, 680, 680);
  rect(480 + backgroundX, 190, 1020, 1020);
  rect(480 + backgroundX, 190, 1360, 1360);
  rect(480 + backgroundX, 190, 1800, 1800);
}

// Prompt display
function message(txt) {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(txt, width / 2, height / 2);
  textAlign(LEFT, BASELINE);
}

// The hard nut of the application.
// Don't even know how many times this has been rewritten and refactored.
// Thankfully finally works with no unexplainable quirks.
function removeBackground(img, mode, c1, c2, c3) {
  let result = createImage(img.width, img.height);

  img.loadPixels();
  result.loadPixels();

  let bgH, bgS, bgB;

  // HSB
  if (mode == 1) {
    colorMode(RGB, 255);
    let bg = color(img.pixels[0], img.pixels[1], img.pixels[2]);
    colorMode(HSB, 360, 100, 100);
    bgH = hue(bg);
    bgS = saturation(bg);
    bgB = brightness(bg);
  }

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let i = (x + y * img.width) * 4;

      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];

      let remove = false;

      if (mode == 0) {
        remove = r > c1 && g > c2 && b > c3;
      } else {
        colorMode(RGB, 255);
        let col = color(r, g, b);
        colorMode(HSB, 360, 100, 100);

        let h = abs(hue(col) - bgH);
        let s = abs(saturation(col) - bgS);
        let v = abs(brightness(col) - bgB);

        if (h > 180) {
          h = 360 - h;
        }

        remove = h < c1 && s < c2 && v < c3;
      }
      result.pixels[i] = r;
      result.pixels[i + 1] = g;
      result.pixels[i + 2] = b;
      result.pixels[i + 3] = remove ? 0 : 255;
    }
  }
  result.updatePixels();
  colorMode(RGB, 255);
  return result;
}

function keyPressed() {
  if (key == "c" || key == "C") {
    carouselLoaded = true;
  }

  if (key == "l" || key == "L") {
    if (!carouselLoaded) return;
    actors = [];
    for (let i = 0; i < 8; i++) {
      let t = thresholds[i];
      actors.push(
        new Actor(
          names[i],
          removeBackground(images[i], t[0], t[1], t[2], t[3]),
        ),
      );
    }

    imagesLoaded = true;
    console.log("Images loaded");
  }

  if (key == "s" || key == "S") {
    if (!imagesLoaded) return;
    animationStarted = !animationStarted;
    if (animationStarted) {
      actors[activeActor].reset();
    }
  }
}
