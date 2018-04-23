var canvas;
var ship;
var asteroids = [];

function setup() {
  canvas = createCanvas(1366, 550);
  ship = new Ship();
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(color(51, 51, 51));
  for (asteroid of asteroids) {
    asteroid.show();
    asteroid.update();
  }
  ship.turn();
  ship.update();
  ship.show();
}

function keyReleased() {
  ship.setRotation(0);
  // ship.boosting(false);
  ship.isBoosting = false;

}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode === UP_ARROW) {
    // ship.boosting(true);
    ship.isBoosting = true;
  }
}