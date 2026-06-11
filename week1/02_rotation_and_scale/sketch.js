function setup() {
  createCanvas(900, 500)
}

//Play around, change order of transformations.
function draw() {
  rectMode(CENTER)
  background(0);

  fill(255);
  rect(200, 100, 100, 100);

  // ROTATE and the TRANSLATE
  fill(125)
  //Rotates the canvas around origin.
  rotate(radians(45));
  translate(200, 100)
  scale(.5)
  rect(0, 0, 100, 100)


  //TRANSLATE and then ROTATE
  fill(255, 0, 0)
  translate(200, 100)
  rotate(radians(22.5))
  scale(3)
  rect(0, 0, 100, 100)
}