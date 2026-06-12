function setup() {
    createCanvas(900, 600);
}

function draw() {
    background(125);
    var mouse = createVector(mouseX, mouseY);
    var center = createVector(width / 2, height / 2);

    mouse.sub(center);

   //mouse.mult(1)

    //Shows magnitude of the mouse vector
    //text("Magnitude: " + int(mouse.mag()), 10, 10)

    // Make rectangle using mouse magnitude
    //rect(1, 20, mouse.mag())

    //NORMALISATION
    // Make copy of mouse vector,so original mouise vector is not affected
    var normal = mouse.copy()

    // Print the normalised vector (essentially direction)
    text("Normal: " + normal.normalize(), 10, 50)

    //Draws constant length line with exact same size as the mouse vector
    normal = normal.mult(25);
    line(60, 60, 60 + normal.x, 60 + normal.y)

    translate(width / 2, height / 2);

    strokeWeight(3);
    line(0, 0, mouse.x, mouse.y)

}
