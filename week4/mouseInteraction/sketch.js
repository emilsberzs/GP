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
var Constraint = Matter.Constraint;

// GET THE MOUSE
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var box, circle, polygon, trapezoid, polygon2;
var ground;
var constraint1;
var polygon1A;
var polygon1B;
// CANVAS VARIABLE TO STORE THE MOUSE
var canvas;

///////////////////////////////////////////////////////////

function setup() {
  createCanvas(1900, 950);

  // create an engine
  engine = Engine.create();


  box = Bodies.rectangle(1200, 0, 50, 50, { restitution: .9, friction: .01 });
  circle = Bodies.circle(1100, 0, 20, { restitution: .8, friction: .5 });
  polygon = Bodies.polygon(700, 0, 5, 30, { restitution: .8, friction: .5 });
  polygon2 = Bodies.polygon(1300, 0, 8, 30, { restitution: .8, friction: .5 });
  trapezoid = Bodies.trapezoid(500, 0, 40, 40, 0.5, { restitution: .99, friction: .001 });
  ground = Bodies.rectangle(width / 2, height - 20, 1900, 10, { isStatic: true, angle: 0 });
  polygon1A = Bodies.polygon(800, 0, 6, 20, { restitution: 1, friction: 0 });
  polygon1B = Bodies.polygon(700, 60, 9, 50, { restitution: 1 });

  constraint1 = Constraint.create({
    bodyA: polygon1A,
    pointA: { x: 0, y: 0 },
    bodyB: polygon1B,
    pointB: { x: -10, y: -10 },
    stiffness: 0.001,
    damping: 0.2

  });

  constraint2 = Constraint.create({
    bodyA: polygon1A,
    pointA: { x: 0, y: 0 },
    bodyB: polygon,
    pointB: { x: 0, y: 0 },
    stiffness: 0.1,

  });
  constraint3 = Constraint.create({
    pointA: { x: 300, y: 50 },
    bodyB: polygon1B,
    pointB: { x: 0, y: 0 }
  })

  constraint4 = Constraint.create({
    pointA: { x: 1200, y: 50 },
    bodyB: polygon2,
    pointB: { x: 0, y: 0 }
  })

  constraint5 = Constraint.create({
    bodyA: circle,
    pointA: { x: 0, y: 0 },
    bodyB: polygon2,
    pointB: { x: 0, y: 0 },
    stiffness: 0
  });

  constraint6 = Constraint.create({
    bodyA: circle,
    pointA: { x: 0, y: 0 },
    bodyB: box,
    pointB: { x: 0, y: 0 },
    stiffness: 0
  });

  constraint7 = Constraint.create({
    bodyA: box,
    pointA: { x: 0, y: 0 },
    bodyB: polygon,
    pointB: { x: 0, y: 0 },
    stiffness: 0.001
  });

  // add all of the bodies to the world
  World.add(engine.world,
    [ground,
      box,
      circle,
      polygon,
      polygon2,
      trapezoid,
      polygon1A,
      polygon1B,
      constraint1,
      constraint2,
      constraint3,
      constraint4,
      constraint5,
      constraint6,
      constraint7,
    ]);

  // MOUSE STAFF
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse
  };

  var mouseConstraint = MouseConstraint.create(engine, mouseParams);
  // ADD MOUSE CONSTRAINT TO THE WORLD
  World.add(engine.world, mouseConstraint)

}
/////////////////////////////////////////////////////////
function draw() {
  background(0);
  Engine.update(engine);
  strokeWeight(0)
  fill(255);
  drawVertices(box.vertices);
  drawVertices(circle.vertices);
  drawVertices(polygon.vertices);
  drawVertices(trapezoid.vertices);
  drawVertices(polygon2.vertices);
  drawVertices(polygon1A.vertices);
  drawVertices(polygon1B.vertices);

  // DRAW CONSTRAINT
  stroke(128);
  strokeWeight(3);
  drawConstraint(constraint1);
  drawConstraint(constraint2);
  drawConstraint(constraint3);
  drawConstraint(constraint4);
  drawConstraint(constraint5);
  drawConstraint(constraint6);
  drawConstraint(constraint7);
  fill(128);
  drawVertices(ground.vertices);

}
///////////////////////////////////////////////////////////
// HELPER FUNCTIONS

function drawConstraint(constraint) {
  var offsetA = constraint.pointA;
  var posA = { x: 0, y: 0 };
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = { x: 0, y: 0 };
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

