var canvas;
var ship;
var asteroids = [];
var lasers = [];
let pause = false;

function setup() {
  canvas = createCanvas(1366, 550);
  ship = new Ship();
  for (let i = 0; i < 9; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(color(51, 51, 51));
  for (let j = asteroids.length - 1; j >= 0; j--) {
    if (asteroids[j] instanceof Asteroid) {
      asteroids[j].show();
      asteroids[j].update();
    }
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].show();
    lasers[i].update();
    let added = [];
    for (let j = asteroids.length - 1; j >= 0; j--) {
      if (lasers[i].hits(asteroids[j])) {
        lasers.splice(i, 1);
        let removed = asteroids.splice(j, 1)[0];
        added = (Asteroid.breakAsteroid(removed));
        break;
      }
    }
    if (added.length == 2) {
      asteroids.push(added[0]);
      asteroids.push(added[1]);
    }
  }

  ship.turn();
  ship.update();
  ship.show();
  displayScore();
  (asteroids.length < 9) && asteroids.push(new Asteroid());


  if (pause) {
    noLoop();
  }
}

function keyReleased() {
  ship.setRotation(0);
  // ship.boosting(false);
  ship.isBoosting = false;

}

function keyPressed() {
  if (key == ' ') {
    ship.fire();
  }
  if (keyCode === RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode === UP_ARROW) {
    ship.isBoosting = true;
  }
}

function displayScore() {
  let elem = document.getElementById('currentScore');
  elem.innerHTML = ship.score;
  let e = document.getElementById('overlay');
  pause && (e.style.display = "block");
}


function restart() {
  location.reload();
}