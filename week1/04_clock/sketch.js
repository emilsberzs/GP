var secLength = 160;
var secWidth = 2;
var minuteLength = 140;
var minuteWidth = 4;
var hourLength = 90;
var hourWidth = 6;

function setup() {
  createCanvas(900, 600);
  background(0);
}

function draw() {
  background(255);
  translate(width / 2, height / 2)
  ellipse(0, 0, 350, 350)

  // Seconds hand
  push();
  strokeWeight(secWidth);
  stroke(200, 0, 0);
  var secAngle = map(second(), 0, 60, 0, 360);
  rotate(radians(secAngle));
  line(0, 0, 0, -secLength);
  pop();

  // Miuntes hand
  push();
  strokeWeight(minuteWidth);
  stroke(0, 200, 0);
  var minuteAngle = map(minute(), 0, 60, 0, 360);
  rotate(radians(minuteAngle));
  line(0, 0, 0, -minuteLength);
  pop();


  // Hours hand
  push();
  strokeWeight(hourWidth);
  stroke(0, 0, 200);
  var hourAngle = map(hour(), 0, 12, 0, 360);
  rotate(radians(hourAngle));
  line(0, 0, 0, -hourLength);

  // Add a small elipse to hourhand using nested transformation, that inherits the outer transformation data
  push()
  translate(0, -hourLength + 20);
  ellipse(0, 0, 15, 15)
  pop()

  pop();

  // Add hour marks to the clock
  var hours = 12;
  var hourStep = 360 / hours;
  for (var i = 0; i < hours; i++) {
    push();
    rotate(radians(hourStep * i));
    translate(0, -150);
    strokeWeight(3)
    line(0, 0, 0, -15)
    pop();
  }

}