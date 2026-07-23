function setup() {
  createCanvas(900, 600, WEBGL);
  angleMode(DEGREES);
  background(0);
}

function draw() {
  background(120);
  rectMode(CENTER);

  rotateX(frameCount);
  rotateZ(frameCount);
  rotateY(frameCount);
  translate(200, 0, 0)

    

  box(100);
}
