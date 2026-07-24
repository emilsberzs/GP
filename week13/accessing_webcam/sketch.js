

var video;



function setup() {
    createCanvas(900, 600);
    pixelDensity(1);
    // Optional params due to audio cutting out otherwise
    video = createCapture({video:true, audio:false});
    video.hide();
}

function draw() {
    background(255);
    
    imageMode(CENTER);

    translate(width/2, height/2)

    // Flip the image
    scale(-1,1,1)

    image(video, 0,0);

    // Get value of color of pixel under mouse
    var c = video.get(mouseX, mouseY);
    stroke(1);
    text(c, 0,0)
}
