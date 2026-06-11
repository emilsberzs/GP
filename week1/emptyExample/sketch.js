function setup() {
    createCanvas(900, 600);
    background(0);
}

function draw() {
    background(0)
    fill(255)
    ellipse(width / 2, height / 2, 100, 100)
    rect(mouseX, mouseY, 100, 50)
}
