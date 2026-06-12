function setup() {
    createCanvas(900, 600);
}

function draw() {
    background(125);
    var mouse = createVector(mouseX, mouseY);
    var center = createVector(width / 2, height / 2);

    mouse.sub(center);

    // Scaling:

    // Line is half the mouse distance from center
    mouse.mult(0.5)
    // Which is same as 
    mouse.div()

    translate(width / 2, height / 2);

    strokeWeight(3);
    line(0, 0, mouse.x, mouse.y)

}
