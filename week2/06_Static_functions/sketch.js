var ball;
function setup() {
    createCanvas(900, 600);
    background(0)
    ball = new Ball();
}


function draw() {
    ball.run()
}

class Ball {
    constructor() {
        this.velocity = new createVector(0, 0);
        this.location = new createVector(width / 2, height / 2);
        // Leave a trace
        this.prevLocation = new createVector(width / 2, height / 2);
        this.acceleration = new createVector(0, 0);
        // The bigger the maxVelocity, the more it will overshoot the mouse coordinates
        this.maxVelocity = 10;
    }

    run() {
        this.draw();
        this.move();
        this.edges();
    }

    draw() {
        //fill(125);
        stroke(255);
        strokeWeight(3)
        //ellipse(this.location.x, this.location.y, 40, 40);
        line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y)
        this.prevLocation = this.location.copy();
    }

    move() {
        // Get mouse coords
        var mouse = createVector(mouseX, mouseY);
        // Get direction from ball to mouse
        var direction = p5.Vector.sub(mouse, this.location);
        // Normalize to get just the direction
        direction.normalize();
        // Multiply to increase above 1
        direction.mult(0.3)
        // And set it as acceleration
        this.acceleration = direction;

        // Increases velocity by the acceleration vector on each frame
        this.velocity.add(this.acceleration);
        //limit max velocity to specified value
        this.velocity.limit(this.maxVelocity);
        // Change location based on velocity
        this.location.add(this.velocity);
    }

    edges() {
        if (this.location.x < 0) this.location.x = width;
        else if (this.location.x > width) this.location.x = 0;
        else if (this.location.y < 0) this.location.y = height;
        else if (this.location.y > height) this.location.y = 0;
    }
}
