function setup() {
    createCanvas(900, 900,WEBGL);
    angleMode(DEGREES);
    noStroke();
    buffer = createGraphics(300,300);
    buffer.background(255)
    
}

function draw() {
    background(125);

    buffer.fill(255,0,255);
    buffer.noStroke();
    buffer.ellipse(random(0,buffer.width),random(0,buffer.height),10,10);

    rotateX(frameCount);
    rotateY(frameCount);
    texture(buffer);

    sphere(300,100,100)
}
