function setup() {
    createCanvas(900, 600);
    noLoop();

    // RGB
    colorMode(RGB);
    for(var i=0; i<255;i++){
        for(var j=0;j<255;j++){
            stroke(i,0,j);
            point(i,j,)
        }
    }

    // HSB
    translate(0,300)
    colorMode(HSB);
    for(var i=0; i<360;i++){
        for(var j=0;j<100;j++){
            stroke(i,100,j);
            point(i,j,)
        }
    }
}

function draw() {

}
