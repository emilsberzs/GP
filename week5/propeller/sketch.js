/// <reference types="matter-js" />
//////////////////////////////////////////////////

// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;

var engine;
var ground;
var boxes = [];
var propeller;
var angle = 0;
var angleSpeed = 0.1;
///////////////////////////////////////////////////////////
function setup() {
  createCanvas(1900, 950);

  // create an engine
  engine = Engine.create();

  // create two boxes and a ground
  ground = Bodies.rectangle(width/2, height -30, width, 10, { isStatic: true, angle:0 });

  // CREATE PROPELLER
  propeller = Bodies.rectangle(width/2, height/2, height/1.5, 20,{isStatic:true, angle: angle})

  // add all of the bodies to the world
  World.add(engine.world, [ground, propeller]);
}
/////////////////////////////////////////////////////////
function draw() {
  background(0);
  Engine.update(engine);

  fill(255);


  // Calling object generator on every other frame
  if (random(0, 1) > 0.2) {
    generateObjects(width / 2, 0)
  }


  // Draw all objects on every frame
  for (var i = 0; i < boxes.length; i++) {
    drawVertices(boxes[i].vertices)
    if (isOffScreen(boxes[i])) {
      World.remove(engine.world, boxes[i])
      boxes.splice(i, 1)
      i--;
    }
  }

  fill(128);
  drawVertices(ground.vertices);
  fill(255,0,0)
  drawVertices(propeller.vertices);

  // SPIN THE PROPELLER
  Body.setAngle(propeller, angle);

  // ANGULAR VELOCITY
  Body.setAngularVelocity(propeller, angleSpeed)
  angle+=angleSpeed;
}
///////////////////////////////////////////////////////////
// HELPER FUNCTIONS

// Object generator (we will use it to generate onject on every frame)
function generateObjects(x, y) {
  var temp_body = Bodies.polygon(x, y, int(random(1,9)), random(5, 20), { restitution: .999, friction: .1 });
  boxes.push(temp_body)
  World.add(engine.world, [temp_body])
}

// Delete body once it's off the screen
function isOffScreen(body) {
  var pos = body.position;
  return (pos.y > height || pos.x > width || pos.x < 0);
}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
