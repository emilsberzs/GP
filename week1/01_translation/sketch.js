function setup() {
  createCanvas(900, 500)
}

function draw() {
  background(220);
  fill(0);
  translate(60, 60, 60);
  rect(10, 10, 100, 100, 5, 5, 5, 5);
  // Due to translation, th 0,0 coordinate ha been moved to 60,60
  ellipse(0, 0, 40);
}