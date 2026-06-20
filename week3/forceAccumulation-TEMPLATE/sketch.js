//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

var ball;
///////////////////////////////////////////////
function setup() {
  createCanvas(600, 400);
  ball = new Ball();
}
///////////////////////////////////////////////
function draw() {
  background(0);
  // Define gravity vector
  var gravity = createVector(0, 0.1);
  // Apply gravity to the ball (without friction wont be quite right)
  ball.applyForce(gravity);
  // IMPLEMENT FRICTION
  // Get copy of velocity vector
  var friction = ball.velocity.copy();
  // Calculate opposite vector by multiplying with -1
  friction.mult(-1);
  // Set friction to unit vector
  friction.normalize();
  // Scale by friction coefficient
  friction.mult(0.01);
  // Apply friction to the ball
  ball.applyForce(friction);
  ball.run();
}
///////////////////////////////////////////////
class Ball {

  constructor() {
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width / 2, height / 2);
    this.acceleration = new createVector(0, 0);
    this.size = 40;
  }

  run() {
    this.draw();
    this.move();
    this.bounce();
  }

  draw() {
    fill(125);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  move() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    // Reset acceleration befpre next frame
    this.acceleration.mult(0);
    // Speed limit
    this.velocity.limit(6);
  }

  bounce() {
    if (this.location.x > width - this.size / 2) {
      this.location.x = width - this.size / 2;
      this.velocity.x *= -1;
    } else if (this.location.x < this.size / 2) {
      this.velocity.x *= -1;
      this.location.x = this.size / 2;
    }
    if (this.location.y > height - this.size / 2) {
      this.velocity.y *= -1;
      this.location.y = height - this.size / 2;
    }
  }

  // Code from video
  applyForce(force) {
    this.acceleration.add(force);
  }

}
