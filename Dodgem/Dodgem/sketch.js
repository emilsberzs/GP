/*
DODGEM ARENA

Although at first thought this would be a quick and easy project after, completion of the course up until week 10, 
it turned out to be magnitudes larger than anticipated, and so mucgh more complex when compared to the mini-projects and Hack it exercises we did in coursework.  
The beginning was pretty straightforward, like drawing the arena and the car models, but once it came to getting things in motion,
it did take a fair bit of experimentation on how to actually put it all together in a working program. 
First full and working program was just over 1200 lines of a poorly structured code, that did do the work,
but reading it and, god forbid, changing anything was a pain. After nearly a full day of refactoring the code 
and moving things out in comprehensible functions, im pretty heppy with the result, just under 700 lines of modular, readable and well commented program.
If not for delaying it for too much, i would have gone for an extension where clearing all oponents leads to progressingly 
harder levels where oponents have more speed and health points.

When it comes to physics, it did take a while to find optimal values, but ended with walls having 0.8 restitution for nice, 
but not exaggerated bounce and 0 friction to prevent cars from 'sticking' to them. 
Cars ended up with 0.9 restitution so they are nice and bouncy in car-to-car to car collision and friction/frictionAir set at 0.05.
Gravity, obviously, had to go out of the window for this, unless there's a way of changing axis for it, so cars would be pushed towrda ground of the arena, 
but considering this is a 2D game, did not see value in it.

Opponent logic in Mode 2 starts with spawning in random location at random angle, and with simple one liner function,
that sets the intitial angle using Body.setAngle and then moves on with full throttle, changing direction once the impact has hapened.
I did not implement collision check in modes 2 and 3, due to matter.js not allowing for solid bodies to spawn on top of one another anyway,
so did not see a real need for it to be honest, i might lose some points for it, but i accept that. 
Spawning and initial direction is same as in Mode 3, but instead of heading straight on after spawn, bots weave through arena 
folling predefined sine wave trajectory that is calculated from frameCount and bot id to somewhat randomize it, so each car has predefined, but unique trajectory

With animations I also kept it simple. Yellow ripple on wall impact, and red on car to car impact. On car to car impact, attacker car flashes green,
and the car that was attacked flashes red, to signify that damage has been taken.


Did not have enough time (due to putting it off for too long and underestimating the time required) to implement 
any meanigful extensions. Only major things i felt the Game definitely needed was a Win/Lose clause, otherwise-what's the point of it?
So each taken hit deducts 10 health points, and once all health points have been depleted- car is removed from arena. 
If player is the last man standing-player wins, if player is eliminated-player loses. Would have gone further to 
make damage taken deend on speed difference upon impact, and level progression where opponents gain more health points and speed,
also 5 second 'untouchable' status upon start of the round and nitro tank, which fill from eliminating enemies and 
can be used to gain extra speed and therefore extra damage. But at the moment, that's it. 
Thank You, I did have fun coding the project and it taught me a lot. Not only about graphics and physics coding, but also about refactoring
and managing complexities of code.

*/
// Defining module aliases to make life easier further on
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Events = Matter.Events;

var engine;
var arenaX;
var arenaY;
var arenaWidth;
var arenaHeight;
var walls = [];
var wallThickness;
var wallOptions;
var startZone;
var dirtTexture;
var spawnArmed = false;
var playerSpawned = false;
var gameMode = 1;
var gameState = "spawn";
var botQuantity = 4;
var cars = [];
var barrierPulses = [];
var impactSparks = [];
//////////////////////////////////////////////////

function setup() {
  createCanvas(1500, 800);
  rectMode(CENTER);
  engine = Engine.create();

  // Cancel gravity, as we are in arena, which is a horizontal plane
  engine.world.gravity.scale = 0;

  initializeArena();

  // Arena with lovery perlin dirt surface
  generateSurface();

  // Set mode depending on players choice
  switchMode();

  // CHECK FOR COLLISIONS USING MATTER.JS Events
  Events.on(engine, "collisionStart", collisionsHandler);

  // Add everything to the world
  World.add(engine.world, walls);
}

function draw() {
  // Had to leave this due to information area and canvas outside arena getting 'polluted'
  background(255);
  drawArena();
  drawBarrierPulses();
  drawImpactSparks();
  drawUI();
  manageState();

  // Draw all the cars, but only the ones left in the array
  for (let car of cars) {
    car.update();
    car.draw();
  }

  Engine.update(engine);
}

function drawUI() {
  let player = cars.find((car) => car.isPlayer);

  // Displau apropriate tooltip to guide player in how to start a game
  if (playerSpawned == false && spawnArmed == false) {
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text("PRESS 'i' TO PREPARE FOR SPAWN", width / 2, height / 2);
  }
  if (playerSpawned == false && spawnArmed == true) {
    fill(0);
    textSize(30);
    textAlign(CENTER);
    text("LEFT CLICK IN STARTING ZONE TO SPAWN", width / 2, height / 2);
  }

  // Display Number of enemies left, players remaining health points and selected game mode
  fill(0);
  textAlign(LEFT, TOP);
  textSize(20);
  text("Enemies: " + cars.filter((c) => !c.isPlayer).length, 20, 20);
  if (player) {
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text("Health: " + player.health, 150, 20);
  }
  text("Game Mode: " + gameMode, 300, 20);
}

function generateSurface() {
  // GENERATE ARENA SURFACE MATERIAL USING PERLINS NOISE
  // Just big enough to cover the arena
  dirtTexture = createGraphics(arenaWidth, arenaHeight);
  dirtTexture.loadPixels();
  // Played around, but these parameters for noiseDetail() seem to be the sweetspot
  noiseDetail(4, 0.5);
  for (let x = 0; x < arenaWidth; x++) {
    for (let y = 0; y < arenaHeight; y++) {
      // Settled for average granularity
      let n = noise(x * 0.05, y * 0.05);
      let dirtColour;

      // Was experimenting with more shades, but seems like 3 was the sweetspot
      if (n < 0.35) dirtColour = color(120, 90, 55);
      else if (n < 0.6) dirtColour = color(145, 105, 60);
      else dirtColour = color(165, 125, 75);

      dirtTexture.set(x, y, dirtColour);
    }
  }
  dirtTexture.updatePixels();
}

function initializeArena() {
  // Arena dimensions are set as per rubric, but  leaving 50px by 50px margin around it, hence the start coordinates offset by 50
  arenaWidth = 1400;
  arenaHeight = 700;
  arenaX = 50;
  arenaY = 50;
  wallThickness = 10;

  //Make walls quite 'bouncy' at 0.8 restitution, and no friction so cars dont 'stick' to them
  wallOptions = { isStatic: true, restitution: 0.8, friction: 0 };

  // As per rubric, starting zone is a slice on left hand side
  startZone = { x: 140, y: 400, width: 180, height: 680 };

  fill(0);
  // Thick solid walls. x and y coordinates for them are quite messy due to 50px margin around arena, but does the trick
  walls = [
    Bodies.rectangle(45, height / 2, wallThickness, arenaHeight, wallOptions),
    Bodies.rectangle(width / 2, 55, arenaWidth, wallThickness, wallOptions),
    Bodies.rectangle(1445, height / 2, wallThickness, arenaHeight, wallOptions),
    Bodies.rectangle(width / 2, 745, arenaWidth, wallThickness, wallOptions),
  ];
}

// Was considering to merge this back into drawArena where I extracted it from,
// but it got messy there, so here it stays, although being called only once, by drawArena()
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

function drawArena() {
  // Place the dirtTexture, right over arena
  image(dirtTexture, arenaX, arenaY);
  strokeWeight(4);
  fill(0);

  for (let wall of walls) {
    drawVertices(wall.vertices);
  }

  // START ZONE
  // Might have factored it ot in separate function, but I already have plethora of them, and in my opinion start zone belongs to arena anyway
  fill(0, 255, 0, 90);
  rect(startZone.x, startZone.y, startZone.width, startZone.height);

  // Start zone text
  push();
  translate(startZone.x, startZone.y);
  //rotate by 90 degrees
  rotate(-HALF_PI);

  textAlign(CENTER, CENTER);
  textSize(70);
  fill(90);
  noStroke();

  text("STARTING AREA", 0, 0);

  pop();
}

function keyPressed() {
  // Straightforward keyPress management, no fancy things, pure functionality
  if (key === "i" || key === "I") {
    spawnArmed = true;
  } else if (key === "1") {
    gameMode = 1;
    switchMode();
  } else if (key === "2") {
    gameMode = 2;
    switchMode();
  } else if (key === "3") {
    gameMode = 3;
    switchMode();
  }
}

function mousePressed() {
  if (!spawnArmed || playerSpawned) {
    return;
  }
  spawnPlayer(mouseX, mouseY);
}

function spawnPlayer(x, y) {
  // CHECK IF CLICK IS INSIDE START ZONE
  if (
    x < startZone.x - startZone.width / 2 ||
    x > startZone.x + startZone.width / 2 ||
    y < startZone.y - startZone.height / 2 ||
    y > startZone.y + startZone.height / 2
  ) {
    return;
  }

  // CHECK IF NOT OVERLAPPING EXISTING CAR
  // Admittedly not ideal, and couldve been implemented using collision detection tought in module,
  // but it works for this application.
  const spawnBuffer = 80;

  for (let car of cars) {
    let distance = dist(x, y, car.body.position.x, car.body.position.y);

    if (distance < spawnBuffer) {
      return;
    }
  }

  cars.push(new Car(x, y, "standard", true));

  playerSpawned = true;
  spawnArmed = false;
  gameState = "active";
}

function switchMode() {
  clearArena();

  // SPAWN FOUR  STATIC CARS IN START ZONE
  if (gameMode == 1) {
    cars.push(new Car(150, 100, "standard", false));
    cars.push(new Car(150, 300, "slow", false));
    cars.push(new Car(150, 500, "standard", false));
    cars.push(new Car(150, 700, "slow", false));
  }

  // FOUR CARS IN RANDOM LOCATIONS
  // Quite proud of this bit of code, short, simple and sweet. I guess my favourite chunk in whole project.
  else if (gameMode == 2 || gameMode == 3) {
    for (let i = 0; i < botQuantity; i++) {
      let bot = new Car(
        random(100, 1400),
        random(50, 700),
        i % 2 == 0 ? "standard" : "slow",
        false,
      );

      Body.setAngle(bot.body, random(TWO_PI));
      bot.targetAngle = bot.body.angle;

      cars.push(bot);
    }
  }
}

function collisionsHandler(event) {
  // USING Matter.js events to get simple implementation
  // While messy due to pairs of bodies, it does work and don't see any real drawbacks for this implementation
  for (let pair of event.pairs) {
    let bodyA = pair.bodyA;
    let bodyB = pair.bodyB;

    let carA = cars.find((car) => car.body === bodyA);
    let carB = cars.find((car) => car.body === bodyB);

    // Car hits wall
    if (carA && walls.includes(bodyB)) {
      // CHANGE ANGLE by 180 degrees WHEN HITTING THE WALL
      carA.targetAngle = carA.body.angle + PI;
      // STORE IMPACT PULSE IN THE ARRAY
      barrierPulses.push({
        // This took a lot of research, and still not confident I completely understand
        // the 'behind the scenes' of pair.collision.supports[0]
        x: pair.collision.supports[0].x,
        y: pair.collision.supports[0].y,
        radius: 10,
        alpha: 180,
      });
    }

    if (carB && walls.includes(bodyA)) {
      carB.targetAngle = carB.body.angle + PI;
      barrierPulses.push({
        x: pair.collision.supports[0].x,
        y: pair.collision.supports[0].y,
        radius: 10,
        alpha: 180,
      });
    }

    // Car hits another car
    if (carA && carB) {
      // turn by 90 degrees (half pi) left or right
      let turn = random() < 0.5 ? HALF_PI : -HALF_PI;
      carA.targetAngle = carA.body.angle + turn;
      carB.targetAngle = carB.body.angle - turn;

      // Decide the 'attacker' and 'victim' in a collision, as I wanted to deduct life from only 'victim' car
      // not to penalise attacks. Fastest car out of the two wins
      let speedA = Matter.Vector.magnitude(carA.body.velocity);
      let speedB = Matter.Vector.magnitude(carB.body.velocity);

      let attacker, victim;

      if (speedA > speedB) {
        attacker = carA;
        victim = carB;
      } else {
        attacker = carB;
        victim = carA;
      }

      impactSparks.push({
        x: pair.collision.supports[0].x,
        y: pair.collision.supports[0].y,
        radius: 5,
        alpha: 255,
      });

      // On impact, attacker flashes green, and attacked flashes red, to distinguish who loses points
      attacker.collision_flash_timer = 10;
      attacker.flashColor = color(0, 150, 0);

      victim.collision_flash_timer = 10;
      victim.flashColor = color(150, 0, 0);

      // Initially had -20, but ten hits per life seems more appropriatre
      victim.health -= 10;

      if (victim.health <= 0) {
        destroyCar(victim);
      }
    }
  }
}

function destroyCar(car) {
  World.remove(engine.world, car.body);
  // Remove the car by creating a new array, without the car that has been removed.
  // Does feel a bit hacky, but simple, and works
  cars = cars.filter((c) => c !== car);
  // Game lost, if player has been destroyed
  if (car.isPlayer) gameState = "lost";
  // CHECK IF THE PLAYER CAR IS THE ONLY ONE LEFT
  if (cars.filter((c) => !c.isPlayer).length == 0) gameState = "won";
}

function clearArena() {
  // Helper function to clear the scene when changing modes or starting a new game
  for (let i = cars.length - 1; i >= 0; i--) {
    if (!cars[i].isPlayer) {
      World.remove(engine.world, cars[i].body);
      cars.splice(i, 1);
    }
  }
}

function manageState() {
  // Helper function that simply keeps checking global state variable to deduct whether game has been lost/won
  if (gameState === "won") {
    fill(0, 180, 0);
    textAlign(CENTER, CENTER);
    textSize(70);
    text("YOU WIN!", width / 2, height / 2);
    noLoop();
  }

  if (gameState === "lost") {
    fill(220, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(70);
    text("GAME OVER", width / 2, height / 2);
    noLoop();
  }
}
function drawBarrierPulses() {
  // Basic, but does fit the purpose
  push();
  noFill();
  strokeWeight(3);

  for (let i = barrierPulses.length - 1; i >= 0; i--) {
    let pulse = barrierPulses[i];

    stroke(255, 255, 0, pulse.alpha);

    ellipse(pulse.x, pulse.y, pulse.radius);

    pulse.radius += 4;
    pulse.alpha -= 8;

    if (pulse.alpha <= 0) {
      barrierPulses.splice(i, 1);
    }
  }
  pop();
}

function drawImpactSparks() {
  // Same idea as behind the barrier pulses. Not too happy with these two functions, but procrastination and lack of time caught up to me
  push();

  noFill();
  strokeWeight(3);

  for (let i = impactSparks.length - 1; i >= 0; i--) {
    let spark = impactSparks[i];

    stroke(200, 0, 0, spark.alpha);

    ellipse(spark.x, spark.y, spark.radius);

    spark.radius += 3;
    spark.alpha -= 18;

    if (spark.alpha <= 0) {
      impactSparks.splice(i, 1);
    }
  }

  pop();
}

class Car {
  constructor(x, y, type, isPlayer) {
    this.type = type;
    this.isPlayer = isPlayer;
    this.width = 80;
    this.height = 40;

    this.body = Bodies.rectangle(x, y, this.width, this.height, {
      restitution: 0.9,
      friction: 0.05,
      frictionAir: 0.05,
    });

    // SET TARGET ANGLE FOR THE BOT CAR AND PARAMETERS FOR BEHAVIOUR
    this.targetAngle = this.body.angle;
    this.botThrottle = 1;

    // Health points for game logic
    this.health = 100;

    // Timer to keep track of collision flash
    this.collision_flash_timer = 0;

    /// PHYSICS
    if (type === "standard") {
      this.enginePower = 0.005;
      this.maxSpeed = 10;
      this.maxReverse = 3;
    } else {
      this.enginePower = 0.0015;
      this.maxSpeed = 7;
      this.maxReverse = 2;
      Matter.Body.setMass(this.body, 3);
    }

    // COLORS
    if (isPlayer) {
      this.color = color(255, 0, 0);
    } else if (type === "standard") {
      this.color = color(0, 255, 0);
    } else {
      this.color = color(0, 0, 255);
    }
    this.flashColor = this.color;

    //Store history for motion trail
    this.trail = [];
    World.add(engine.world, this.body);
  }

  update() {
    // Feels like this should be moved elsewhere, but can't quite figure where exactly
    if (this.collision_flash_timer > 0) {
      this.collision_flash_timer--;
    }

    // Delegate to responsible function depending on whether player or bot, and keep speed in check
    if (this.isPlayer) {
      this.handleControls();
    } else {
      this.updateBot();
    }
    this.limitSpeed();

    // Push frames to motion trail array, but only if speed exceeds 2
    let speed = Matter.Vector.magnitude(this.body.velocity);

    if (speed > 2) {
      this.trail.push({
        x: this.body.position.x,
        y: this.body.position.y,
      });
    }
    // Keep the trail under 20 frames, otherwise gets overwhelming
    if (this.trail.length > 30) {
      this.trail.shift();
    }
  }

  handleControls() {
    if (keyIsDown(UP_ARROW)) {
      this.applyThrottle(1);
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.applyThrottle(-1);
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.steer(-1);
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.steer(1);
    }
  }
  applyThrottle(direction) {
    // FORCE implemented by sin and cos
    let force = {
      x: Math.cos(this.body.angle) * this.enginePower * direction,
      y: Math.sin(this.body.angle) * this.enginePower * direction,
    };

    Body.applyForce(this.body, this.body.position, force);
  }

  steer(direction) {
    Body.setAngle(this.body, this.body.angle + direction * 0.05);
  }

  limitSpeed() {
    let velocity = this.body.velocity;
    // Building up speed as in course, summing it up from bits
    let speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    // LIMITTER
    if (speed > this.maxSpeed) {
      let scale = this.maxSpeed / speed;
      Body.setVelocity(this.body, {
        x: velocity.x * scale,
        y: velocity.y * scale,
      });
    }
  }

  updateBot() {
    // Initially was much shorter and simpler, but bloated due to cars spinning in circles on impact and too basic behaviour
    if (gameMode == 1) {
      return;
    }

    this.applyThrottle(this.botThrottle);

    // PREDEFINED TRAJECTORIES FOR MODE 3
    if (gameMode == 3) {
      this.targetAngle += sin(frameCount * 0.02 + this.body.id) * 0.1;
    }

    let angleDifference = this.targetAngle - this.body.angle;

    // Keep angle between -PI and PI
    while (angleDifference > PI) {
      angleDifference -= TWO_PI;
    }

    while (angleDifference < -PI) {
      angleDifference += TWO_PI;
    }

    if (angleDifference > 0.05) {
      this.steer(1);
    } else if (angleDifference < -0.05) {
      this.steer(-1);
    }
  }

  leaveTrail() {
    // WRAPPED in push/pop as messed with car colors
    push();
    noStroke();

    for (let i = 0; i < this.trail.length; i++) {
      let position = this.trail[i];

      let alpha = map(i, 0, this.trail.length - 1, 20, 30);
      let size = map(i, 0, this.trail.length - 1, 4, 30);

      fill(red(this.color), green(this.color), blue(this.color), alpha);

      ellipse(position.x, position.y, size);
    }
    pop();
  }

  drawCar() {
    // BODY
    rect(0, 0, this.width, this.height, 0, 8, 8, 0);

    // WHEELS
    fill(50);
    // FR
    rect(this.width / 3, this.height / 2, 20, 10, 2, 2);
    // RR
    rect(0 - this.width / 3, this.height / 2, 20, 10, 2, 2);
    // FL
    rect(this.width / 3, 0 - this.height / 2, 20, 10, 2, 2);
    // RL
    rect(0 - this.width / 3, 0 - this.height / 2, 20, 10, 2, 2);

    // BUMPER
    fill(180);
    rect(this.width / 2 - 2, 0, 4, this.height + 6, 2);

    // HEADLIGHTS
    fill(255, 255, 0);
    ellipse(this.width / 2 - 3, this.height / 2 - 10, 9);
    ellipse(this.width / 2 - 3, this.height / 2 - 30, 9);

    // TAILLIGHT
    fill(255, 0, 0);
    rect(0 - this.width / 2, 0, 5, this.height + 10);

    //SEAT and STEERING WHEEL
    fill(80);
    rect(0, 0, 30, 20, 0, 5, 5, 0);
    noFill();
    strokeWeight(2);
    ellipse(10, 0, 15);
    strokeWeight(2);
    rect(10, 0, 3, 10);

    // DRIVER
    fill(241, 194, 125);
    rect(-10, 0, 7, 20);
    ellipse(-10, 0, 10);
  }
  draw() {
    this.leaveTrail();
    // push/pop + translate for individual locations
    // position and angle come from matter
    push();

    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    strokeWeight(2);

    // CHECK IF COLLISION FLASH IS ACTIVE, IF NOT, DRAW IN SPECIFIED COLOR
    if (this.collision_flash_timer > 0) {
      fill(this.flashColor);
    } else {
      fill(this.color);
    }

    this.drawCar();

    // HEALTH DISPLAY
    push();
    // Had to stick with radians due to degreeMode affecting starting area
    rotate(1.5708);
    textSize(20);
    fill(0);
    strokeWeight(2);
    textAlign(CENTER);
    text(this.health, 0, 20);
    pop();

    pop();
  }
}
