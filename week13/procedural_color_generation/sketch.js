function setup() {
    createCanvas(720, 400);
    colorMode(HSB);
    noStroke();
    noLoop();


    var brickWidth = 72;
    var brickHeight = 40;
    var hueStart = 30;
    var variation = 5

    for(var x=0;x<=width;x+=brickWidth){
        for(var y=0;y<=height;y+=brickHeight){


            var randVar = random(-variation,variation);
            fill(hueStart+randVar,random(80,100),random(50,100));
            rect(x,y,brickWidth,brickHeight);
        }
    }

}

function draw() {

}
