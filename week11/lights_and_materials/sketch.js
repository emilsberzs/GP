/// <reference types="matter-js" />
/** @type {WebGLRenderingContext} */

function setup() {
  createCanvas(900, 600, WEBGL);
}

function draw() {
  background(125);

  // Needs light
  //ambientMaterial(255);
  specularMaterial(255);
  // (r,g,b,x,y,size)
  //pointLight(255, 0, 0, mouseX - width / 2, mouseY - height / 2, 200);
  //pointLight(0, 150, 0, -200, 100, 100);

  //(r,g,b,x,y,z) 
  directionalLight(255,0,0,0,0,1)
  sphere(100, 25, 25);

  normalMaterial();
}
