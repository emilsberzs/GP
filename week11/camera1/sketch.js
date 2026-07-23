function setup() {
  createCanvas(900, 600, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(125);

  // CHANGE LOCATION OF THE CAMERA

  //create oscilating in and out motion
  //var zLoc = ((sin(frameCount)+1)/2*height)+300;
  //same as
  //var zLoc = map(sin(frameCount),-1,1,200,800);
  //var zLoc = height;

  // all axis judder with perlin noise
  // var xLoc = map(noise(frameCount/100+10),0,1,-1500,1500)
  // var yLoc = map(noise(frameCount/100+100),0,1,-1500,1500)
  // var zLoc = map(noise(frameCount/100+35),0,1,300,800)

  // // circling around torus
  // var xLoc = cos(frameCount)*height;
  // var yLoc = sin(frameCount)*300
  // var zLoc = sin(frameCount)*height

  // First three are location of camera,
  // next three are where to point the camera
  // last three direction x/y/z(x,y,z,x,y,z,0/1,0/1,0/1)
  // camera(xLoc,yLoc,zLoc,0,0,0,0,1,0);

  // Change where camera is pointing at7

  // swings left/right
  var xAim = sin(frameCount) * 300;
  //swings up/down
  var yAim = sin(frameCount) * 300;
  //swings on z axis
  var zAim = sin(frameCount) * 300;
  camera(0, 0, height, xAim, yAim, zAim, 0, 1, 0);

  normalMaterial();
  torus(200, 50, 50, 50);
  translate(0, 100, 0);
  rotateX(90);
  fill(200);
  plane(600);
}
