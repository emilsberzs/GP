## Threshold hunting code:
`
    selectedImage = images[int(imageSelect.value()) - 1];

    let processed;

    if (colorToggle.checked()) {

    // -------------------------
    // HSB
    // -------------------------

    redSlider.hide();
    greenSlider.hide();
    blueSlider.hide();

    hueSlider.show();
    saturationSlider.show();
    brightnesSlider.show();

    processed = removeBackgroundHSB(
    selectedImage,
    hueSlider.value(),
    saturationSlider.value(),
    brightnesSlider.value()
    );

    } else {

    // -------------------------
    // RGB
    // -------------------------

    hueSlider.hide();
    saturationSlider.hide();
    brightnesSlider.hide();

    redSlider.show();
    greenSlider.show();
    blueSlider.show();

    processed = removeBackgroundRGB(
    selectedImage,
    redSlider.value(),
    greenSlider.value(),
    blueSlider.value()
    );
    }

    // Display processed image
    image(processed, 0, 0);

    // Display slider values
    if (colorToggle.checked()) {

    text("Hue tolerance: " + hueSlider.value(), 100, 35);
    text("Saturation tolerance: " + saturationSlider.value(), 250, 35);
    text("Brightness tolerance: " + brightnesSlider.value(), 400, 35);

    } else {

    text("Red: " + redSlider.value(), 100, 35);
    text("Green: " + greenSlider.value(), 250, 35);
    text("Blue: " + blueSlider.value(), 400, 35);
    }
    }


`

var thresholds = [
  [0, 190, 120, 192], // Image 1
  [0, 236, 240, 239], // Image 2
  [0, 207, 197, 203], // Image 3
  [0, 250, 233, 228], // Image 4
  [0, 190, 195, 185], // Image 5
  [0, 239, 236, 232], // Image 6
  [1, 230, 10, 1], // Image 7
  [0, 183, 224, 214], // Image 8
];



var images = [];
var thresholds = [];
var processed_images = [];

function preload() {
  for (let i = 1; i <= 8; i++) {
    images.push(loadImage("assets/" + i + ".jpg"));
  }
}

function setup() {

  // Total width of all images combined
  canvasWidth = images.reduce((sum, img) => sum + img.width, 0);

  // Height of tallest image
  canvasHeight = Math.max(...images.map((img) => img.height));

  createCanvas(canvasWidth, canvasHeight);

  // Image selector for debugging
  imageSelect = createSelect();
  imageSelect.position(0, 0);

  for (let i = 1; i <= 8; i++) {
    imageSelect.option(i);
  }

  imageSelect.selected(1);

  // RGB/HSB switch
  colorToggle = createCheckbox("HSB", false);
  colorToggle.position(50, 0);

  // HSB sliders
  hueSlider = createSlider(0, 360, 20, 1);
  hueSlider.position(100, 0);

  saturationSlider = createSlider(0, 100, 10, 1);
  saturationSlider.position(250, 0);

  brightnesSlider = createSlider(0, 100, 10, 1);
  brightnesSlider.position(400, 0);

  // RGB sliders
  redSlider = createSlider(0, 255, 120, 1);
  redSlider.position(100, 0);

  greenSlider = createSlider(0, 255, 120, 1);
  greenSlider.position(250, 0);

  blueSlider = createSlider(0, 255, 120, 1);
  blueSlider.position(400, 0);

  background(0);
}


function draw() {
    fill(255,0,0)
  background(0);

  // Get currently selected image
  selectedImage = images[int(imageSelect.value()) - 1];

  let processed;

  if (colorToggle.checked()) {

    // -------------------------
    // HSB
    // -------------------------

    redSlider.hide();
    greenSlider.hide();
    blueSlider.hide();

    hueSlider.show();
    saturationSlider.show();
    brightnesSlider.show();

    processed = removeBackgroundHSB(
      selectedImage,
      hueSlider.value(),
      saturationSlider.value(),
      brightnesSlider.value()
    );

  } else {

    // -------------------------
    // RGB
    // -------------------------

    hueSlider.hide();
    saturationSlider.hide();
    brightnesSlider.hide();

    redSlider.show();
    greenSlider.show();
    blueSlider.show();

    processed = removeBackgroundRGB(
      selectedImage,
      redSlider.value(),
      greenSlider.value(),
      blueSlider.value()
    );
  }

  // Display processed image
  image(processed, 0, 0);

  // Display slider values
  if (colorToggle.checked()) {

    text("Hue tolerance: " + hueSlider.value(), 100, 35);
    text("Saturation tolerance: " + saturationSlider.value(), 250, 35);
    text("Brightness tolerance: " + brightnesSlider.value(), 400, 35);

  } else {

    text("Red: " + redSlider.value(), 100, 35);
    text("Green: " + greenSlider.value(), 250, 35);
    text("Blue: " + blueSlider.value(), 400, 35);
  }
}


// =====================================================
// RGB BACKGROUND REMOVAL
// =====================================================

function removeBackgroundRGB(
  img,
  redThreshold,
  greenThreshold,
  blueThreshold
) {

  let result = createImage(img.width, img.height);

  img.loadPixels();
  result.loadPixels();

  for (let x = 0; x < img.width; x++) {

    for (let y = 0; y < img.height; y++) {

      let index = (x + y * img.width) * 4;

      let red = img.pixels[index + 0];
      let green = img.pixels[index + 1];
      let blue = img.pixels[index + 2];

      if (
        red > redThreshold &&
        green > greenThreshold &&
        blue > blueThreshold
      ) {

        // Background → transparent

        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 0;

      } else {

        // Person → keep

        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 255;
      }
    }
  }

  result.updatePixels();

  return result;
}


// =====================================================
// HSB BACKGROUND REMOVAL
// =====================================================

function removeBackgroundHSB(
  img,
  hueThreshold,
  saturationThreshold,
  brightnessThreshold
) {

  let result = createImage(img.width, img.height);

  img.loadPixels();
  result.loadPixels();

  // Get the RGB values of the top-left pixel.
  // This is our sample of the background colour.
  let backgroundRed = img.pixels[0];
  let backgroundGreen = img.pixels[1];
  let backgroundBlue = img.pixels[2];

  // Convert background colour from RGB to HSB
  colorMode(RGB, 255);

  let backgroundColour = color(
    backgroundRed,
    backgroundGreen,
    backgroundBlue
  );

  colorMode(HSB, 360, 100, 100);

  let backgroundH = hue(backgroundColour);
  let backgroundS = saturation(backgroundColour);
  let backgroundB = brightness(backgroundColour);

  // Process every pixel
  for (let x = 0; x < img.width; x++) {

    for (let y = 0; y < img.height; y++) {

      let index = (x + y * img.width) * 4;

      let red = img.pixels[index + 0];
      let green = img.pixels[index + 1];
      let blue = img.pixels[index + 2];

      // Convert current pixel from RGB to HSB
      colorMode(RGB, 255);

      let pixelColour = color(red, green, blue);

      colorMode(HSB, 360, 100, 100);

      let h = hue(pixelColour);
      let s = saturation(pixelColour);
      let b = brightness(pixelColour);

      // Calculate difference from sampled background
      let hueDifference = abs(h - backgroundH);
      let saturationDifference = abs(s - backgroundS);
      let brightnessDifference = abs(b - backgroundB);

      // Hue wraps around at 360.
      // For example, 359 and 1 are only 2 degrees apart.
      hueDifference = min(
        hueDifference,
        360 - hueDifference
      );

      if (
        hueDifference < hueThreshold &&
        saturationDifference < saturationThreshold &&
        brightnessDifference < brightnessThreshold
      ) {

        // Background → transparent

        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 0;

      } else {

        // Person → keep

        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 255;
      }
    }
  }

  result.updatePixels();

  colorMode(RGB, 255);

  return result;
}


var images = [];

var thresholds = [
  [0, 190, 120, 192], // Image 1 - RGB
  [0, 236, 240, 239], // Image 2 - RGB
  [0, 207, 197, 203], // Image 3 - RGB
  [0, 250, 233, 228], // Image 4 - RGB
  [0, 190, 195, 185], // Image 5 - RGB
  [0, 239, 236, 232], // Image 6 - RGB
  [1, 230, 10, 1],    // Image 7 - HSB
  [0, 183, 224, 214]  // Image 8 - RGB
];

var processed_images = [];


function preload() {

  for (let i = 1; i <= 8; i++) {
    images.push(loadImage("assets/" + i + ".jpg"));
  }

}


function setup() {

  // Total width of all images combined
  let canvasWidth = images.reduce(
    (sum, img) => sum + img.width,
    0
  );

  // Height of tallest image
  let canvasHeight = Math.max(
    ...images.map(img => img.height)
  );

  createCanvas(canvasWidth, canvasHeight);

  // Process each image using its stored threshold values
  for (let i = 0; i < images.length; i++) {

    let colourSpace = thresholds[i][0];

    let c1 = thresholds[i][1];
    let c2 = thresholds[i][2];
    let c3 = thresholds[i][3];

    if (colourSpace === 0) {

      // RGB
      processed_images[i] = removeBackgroundRGB(
        images[i],
        c1,
        c2,
        c3
      );

    } else {

      // HSB
      processed_images[i] = removeBackgroundHSB(
        images[i],
        c1,
        c2,
        c3
      );
    }
  }
}


function draw() {

  background(0);

  let start_x = 0;

  // Display all processed images in a row
  for (let i = 0; i < processed_images.length; i++) {

    image(
      processed_images[i],
      start_x,
      0
    );

    start_x += processed_images[i].width;
  }
}


// =====================================================
// RGB BACKGROUND REMOVAL
// =====================================================

function removeBackgroundRGB(
  img,
  redThreshold,
  greenThreshold,
  blueThreshold
) {

  let result = createImage(
    img.width,
    img.height
  );

  img.loadPixels();
  result.loadPixels();

  for (let x = 0; x < img.width; x++) {

    for (let y = 0; y < img.height; y++) {

      let index = (x + y * img.width) * 4;

      let red = img.pixels[index + 0];
      let green = img.pixels[index + 1];
      let blue = img.pixels[index + 2];

      if (
        red > redThreshold &&
        green > greenThreshold &&
        blue > blueThreshold
      ) {

        // Background -> transparent
        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 0;

      } else {

        // Foreground -> keep
        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 255;
      }
    }
  }

  result.updatePixels();

  return result;
}


// =====================================================
// HSB BACKGROUND REMOVAL
// =====================================================

function removeBackgroundHSB(
  img,
  hueThreshold,
  saturationThreshold,
  brightnessThreshold
) {

  let result = createImage(
    img.width,
    img.height
  );

  img.loadPixels();
  result.loadPixels();

  colorMode(RGB, 255);

  for (let x = 0; x < img.width; x++) {

    for (let y = 0; y < img.height; y++) {

      let index = (x + y * img.width) * 4;

      let red = img.pixels[index + 0];
      let green = img.pixels[index + 1];
      let blue = img.pixels[index + 2];

      let pixelColour = color(
        red,
        green,
        blue
      );

      colorMode(HSB, 360, 100, 100);

      let h = hue(pixelColour);
      let s = saturation(pixelColour);
      let b = brightness(pixelColour);

      if (
        h > hueThreshold &&
        s < saturationThreshold &&
        b > brightnessThreshold
      ) {

        // Background -> transparent
        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 0;

      } else {

        // Foreground -> keep
        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 255;
      }

      colorMode(RGB, 255);
    }
  }

  result.updatePixels();

  return result;
}

# Working slider version
var images = [];
var thresholds = [];
var processed_images = [];

function preload() {
  for (let i = 1; i <= 8; i++) {
    images.push(loadImage("assets/" + i + ".jpg"));
  }
}

function setup() {
    stroke(255,0,0)
  // Total width of all images combined
  canvasWidth = images.reduce((sum, img) => sum + img.width, 0);

  // Height of tallest image
  canvasHeight = Math.max(...images.map((img) => img.height));

  createCanvas(canvasWidth, canvasHeight);

  // Image selector for debugging
  imageSelect = createSelect();
  imageSelect.position(0, 0);

  for (let i = 1; i <= 8; i++) {
    imageSelect.option(i);
  }

  imageSelect.selected(1);

  // RGB/HSB switch
  colorToggle = createCheckbox("HSB", false);
  colorToggle.position(50, 0);

  // HSB sliders
  hueSlider = createSlider(0, 360, 20, 1);
  hueSlider.position(100, 0);

  saturationSlider = createSlider(0, 100, 10, 1);
  saturationSlider.position(250, 0);

  brightnesSlider = createSlider(0, 100, 10, 1);
  brightnesSlider.position(400, 0);

  // RGB sliders
  redSlider = createSlider(0, 255, 120, 1);
  redSlider.position(100, 0);

  greenSlider = createSlider(0, 255, 120, 1);
  greenSlider.position(250, 0);

  blueSlider = createSlider(0, 255, 120, 1);
  blueSlider.position(400, 0);

  background(0);
}

function draw() {
  fill(255, 0, 0);
  background(0);

  // Get currently selected image
  selectedImage = images[int(imageSelect.value()) - 1];

  let processed;

  if (colorToggle.checked()) {
    // -------------------------
    // HSB
    // -------------------------

    redSlider.hide();
    greenSlider.hide();
    blueSlider.hide();

    hueSlider.show();
    saturationSlider.show();
    brightnesSlider.show();

    processed = removeBackgroundHSB(
      selectedImage,
      hueSlider.value(),
      saturationSlider.value(),
      brightnesSlider.value(),
    );
  } else {
    // -------------------------
    // RGB
    // -------------------------

    hueSlider.hide();
    saturationSlider.hide();
    brightnesSlider.hide();

    redSlider.show();
    greenSlider.show();
    blueSlider.show();

    processed = removeBackgroundRGB(
      selectedImage,
      redSlider.value(),
      greenSlider.value(),
      blueSlider.value(),
    );
  }

  // Display processed image
  image(processed, 0, 0);

  // Display slider values
  if (colorToggle.checked()) {
    text("Hue tolerance: " + hueSlider.value(), 100, 35);
    text("Saturation tolerance: " + saturationSlider.value(), 250, 35);
    text("Brightness tolerance: " + brightnesSlider.value(), 400, 35);
  } else {
    text("Red: " + redSlider.value(), 100, 35);
    text("Green: " + greenSlider.value(), 250, 35);
    text("Blue: " + blueSlider.value(), 400, 35);
  }
}

// =====================================================
// RGB BACKGROUND REMOVAL
// =====================================================

function removeBackgroundRGB(img, redThreshold, greenThreshold, blueThreshold) {
  let result = createImage(img.width, img.height);

  img.loadPixels();
  result.loadPixels();

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = (x + y * img.width) * 4;

      let red = img.pixels[index + 0];
      let green = img.pixels[index + 1];
      let blue = img.pixels[index + 2];

      if (
        red > redThreshold &&
        green > greenThreshold &&
        blue > blueThreshold
      ) {
        // Background → transparent

        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 0;
      } else {
        // Person → keep

        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 255;
      }
    }
  }

  result.updatePixels();

  return result;
}

// =====================================================
// HSB BACKGROUND REMOVAL
// =====================================================

function removeBackgroundHSB(
  img,
  hueThreshold,
  saturationThreshold,
  brightnessThreshold,
) {
  let result = createImage(img.width, img.height);

  img.loadPixels();
  result.loadPixels();

  // Get the RGB values of the top-left pixel.
  // This is our sample of the background colour.
  let backgroundRed = img.pixels[0];
  let backgroundGreen = img.pixels[1];
  let backgroundBlue = img.pixels[2];

  // Convert background colour from RGB to HSB
  colorMode(RGB, 255);

  let backgroundColour = color(backgroundRed, backgroundGreen, backgroundBlue);

  colorMode(HSB, 360, 100, 100);

  let backgroundH = hue(backgroundColour);
  let backgroundS = saturation(backgroundColour);
  let backgroundB = brightness(backgroundColour);

  // Process every pixel
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = (x + y * img.width) * 4;

      let red = img.pixels[index + 0];
      let green = img.pixels[index + 1];
      let blue = img.pixels[index + 2];

      // Convert current pixel from RGB to HSB
      colorMode(RGB, 255);

      let pixelColour = color(red, green, blue);

      colorMode(HSB, 360, 100, 100);

      let h = hue(pixelColour);
      let s = saturation(pixelColour);
      let b = brightness(pixelColour);

      // Calculate difference from sampled background
      let hueDifference = abs(h - backgroundH);
      let saturationDifference = abs(s - backgroundS);
      let brightnessDifference = abs(b - backgroundB);

      // Hue wraps around at 360.
      // For example, 359 and 1 are only 2 degrees apart.
      hueDifference = min(hueDifference, 360 - hueDifference);

      if (
        hueDifference < hueThreshold &&
        saturationDifference < saturationThreshold &&
        brightnessDifference < brightnessThreshold
      ) {
        // Background → transparent

        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 0;
      } else {
        // Person → keep

        result.pixels[index + 0] = red;
        result.pixels[index + 1] = green;
        result.pixels[index + 2] = blue;
        result.pixels[index + 3] = 255;
      }
    }
  }

  result.updatePixels();

  colorMode(RGB, 255);

  return result;
}
