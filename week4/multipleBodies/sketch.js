/// <reference types="matter-js" />
//////////////////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////////////////////
// Example is based on examples from:
// http://brm.io/matter-js/
// https://github.com/shiffman/p5-matter
// https://github.com/b-g/p5-matter-examples

// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;

var engine;
var box, circle, polygon, trapezoid, polygon2;
var ground1, ground2, ground3;
var boxes = [];
///////////////////////////////////////////////////////////
function setup() {
  createCanvas(1900, 950);

  // create an engine
  engine = Engine.create();

  // create two boxes and a ground
  box = Bodies.rectangle(50, 0, 50, 50, { restitution: .9, friction: .01 });
  circle = Bodies.circle(80, 0, 20, { restitution: .8, friction: .5 });
  polygon = Bodies.polygon(100, 0, 5, 30, { restitution: .8, friction: .5 });
  polygon2 = Bodies.polygon(100, 0, 8, 30, { restitution: .8, friction: .5 });
  trapezoid = Bodies.trapezoid(70, 0, 40, 40, 0.5, { restitution: .99, friction: .001 });
  ground1 = Bodies.rectangle(100, 200, 500, 10, { isStatic: true, angle: Math.PI * 0.1 });
  ground2 = Bodies.rectangle(500, 500, 500, 10, { isStatic: true, angle: Math.PI * -0.06 });
  ground3 = Bodies.rectangle(50, 800, 900, 10, { isStatic: true, angle: Math.PI * 0.08 });

  // add all of the bodies to the world
  World.add(engine.world, [box, ground1, ground2, ground3, circle, polygon, polygon2, trapezoid]);
}
/////////////////////////////////////////////////////////
function draw() {
  background(0);
  Engine.update(engine);

  fill(255);
  drawVertices(box.vertices);
  drawVertices(circle.vertices);
  drawVertices(polygon.vertices);
  drawVertices(trapezoid.vertices);
  drawVertices(polygon2.vertices);

  // Calling object generator on every frame
  generateObjects(width/3,0)

  // Draw all objects on every frame
  for (var i = 0; i< boxes.length; i++) {
    drawVertices(boxes[i].vertices)
    
    // Remove the body once its off the screen
    if (isOffScreen(boxes[i])){
      World.remove(engine.world, boxes[i]) // This removes the body from engine and avoids overload
      // Remove 1 item at index i. Will cause boxes flickering, as array have to be shifted every time an element is removed
      // THIS DOES NOT REMOVE BODY FROM PHYSICS ENGINE AND WILL CAUSE LAG EVENTUALLY
      boxes.splice(i,1)
      // Added to get rid of flicker
      i--;
    }
  }

  fill(128);
  drawVertices(ground1.vertices);
  drawVertices(ground2.vertices);
  drawVertices(ground3.vertices);
}
///////////////////////////////////////////////////////////
// HELPER FUNCTIONS

// Object generator (we will use it to generate onject on every frame)
function generateObjects(x, y) {
  var temp_body = Bodies.rectangle(x, y, random(10, 30), random(10, 30), { restitution: .8, friction: .1 });
  boxes.push(temp_body)
  World.add(engine.world, [temp_body])
}

// Delete body once it's off the screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y>height || pos.x > width || pos.x < 0);
}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
