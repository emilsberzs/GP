var ball;
function setup() {
    createCanvas(900, 600);
    ball = new Ball();
}

function draw() {
    background(0);
    ball.run();
}

class Ball {
    constructor() {
        // this.speedX = random(-2, 2);
        // this.speedY = random(-2, 2);
        // Replaced by this.velocity
        this.velocity = new createVector(random(-3,3), random(-3,3));

        // this.locX = random(width);
        // this.locY = random(height);
        // Replaced by this.location
        this.location = new createVector(random(width), random(height));
    }

    run() {
        this.draw();
        this.move();
        this.bounce();
    }

    draw() {
        fill(125);
        ellipse(this.location.x, this.location.y, 40, 40);
    }

    move() {
        this.location.x += this.velocity.x;
        this.location.y += this.velocity.y;
    }

    bounce() {
        if (this.location.x > width || this.location.x < 0) this.velocity.x *= -1;
        if (this.location.y > height || this.location.y < 0) this.velocity.y *= -1;
    }
}
