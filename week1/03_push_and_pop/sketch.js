function setup() {
  createCanvas(900, 500);
  rectMode(CENTER);
}

function draw() {
  background(220);
  fill(0);

  translate(200, 200);
  //rotate(radians(45));
  rect(0, 0, 200, 200);

  // Draw an ellipse in each corner of rect

  //PUSH and POP sort of makes the trnaslate temporary, creates safe place, and throws everything out afterwards.

  //BOTTOM RIGHT
  push();
  fill(255,0,0);
  translate(100, 100);
  ellipse(0,0,30,30);
  pop();

  //TOP LEFT
  push();
  fill(0,255,0)
  translate(-100,-100);
  ellipse(0,0,30, 30);
  pop(); 

  //BOTTOM LEFT
  push()
  fill(0,0,255);
  translate(100,-100);
  ellipse(0,0, 30, 30)
  pop(); 

  //TOP RIGHT
  push();
  fill(120,120,120)
  translate(-100, 100)
  ellipse(0,0,30,30)
  pop();

  //ORIGIN POINT
  fill(255)
  ellipse(0,0,30,30)
}