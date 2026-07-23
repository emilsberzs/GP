function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(125);
  normalMaterial();

  // tilt camer slightly, view from above
  camera(0, -200, height, 0, 0, 0, 0, 1, 0);
  // Default is in radians, make sure to set angleMode(DEGREES)
  // (fov,aspect ratio, near plane, far plane)
  perspective(60, width / height, mouseY, mouseX);

  // Road that extends into distance and gets clipped
  for (var i = -600; i <= 600; i += 150) {
    push();
    translate(i, 0, 0);
    box(80, 80, 500);
    pop();
  }
}
