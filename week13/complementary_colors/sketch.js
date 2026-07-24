function setup() {
    createCanvas(900, 600);
    colorMode(HSB);
    noStroke();
    rectMode(CENTER);
}

function draw() {
    background(0)

    var startColor =0;
    var colorDiff = 360/3;



    fill(startColor,100,100)
    rect(width/2, height/2, 300,300)
    
    fill(startColor+colorDiff,100,100);
    rect(width/2, height/2, 200,200)
   
    fill(startColor+colorDiff*2,100,100);
    rect(width/2, height/2, 100,100)

}
