class Asteroid {
  constructor(vect) {
    if (vect) {
      this.pos = vect.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }
    this.radius = random(35, 60);
    this.total = random(7, 12);
    this.velocity = p5.Vector.random2D();
    this.offsets = [];
    for (let i = 0; i < this.total; i++) {
      this.offsets[i] = random(-8, 8);
    }
  }

  static breakAsteroid(asteroid) {
    ship.score++;
    var a = [];
    if (asteroid.radius > 30) {
      a[0] = new Asteroid(asteroid.pos);
      a[0].radius = asteroid.radius / 2;
      a[1] = new Asteroid(asteroid.pos);
      a[1].radius = asteroid.radius / 2;
    }
    return a;
  }
}


Asteroid.prototype.update = function() {
  this.pos.add(this.velocity);
  this.wrap();
};


Asteroid.prototype.show = function() {
  push();
  fill(color(51, 51, 51));
  // noStroke();
  stroke(255);
  translate(this.pos.x, this.pos.y);

  beginShape()
  for (let i = 0; i < this.total; i++) {
    var angle = map(i, 0, this.total, 0, 2 * PI);
    let x = this.radius * cos(angle) + this.offsets[i];
    let y = this.radius * sin(angle) + this.offsets[i];
    vertex(x, y);
  }
  endShape(CLOSE);
  if (this.radius > 30) {
    ellipse(floor(-0.1 * this.radius), floor(0.1 * this.radius), 4, 4);
    ellipse(floor(0.1 * this.radius), floor(-0.1 * this.radius), 4, 4);
    ellipse(floor(0.15 * this.radius), floor(0.1 * this.radius), 4, 4);
  }

  pop();
};

Asteroid.prototype.wrap = function() {
  if (this.pos.x < -this.radius) {
    this.pos.x = width + this.radius;
  }
  if (this.pos.x > width + this.radius) {
    this.pos.x = 0 + this.radius;
  }
  if (this.pos.y < -this.radius) {
    this.pos.y = height + this.radius;
  }
  if (this.pos.y > height + this.radius) {
    this.pos.y = 0 + this.radius;
  }
};

Asteroid.prototype.hits = function(ship) {
  let d = dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y);
  if (d < this.radius) {
    return true;
  } else {
    return false;
  }
};