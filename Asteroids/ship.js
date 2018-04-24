class Ship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.head = 0;
    this.rotation = 0;
    this.velocity = createVector(0, 0);
    this.isBoosting = false;
    this.score = 0;
  }
}

Ship.prototype.update = function() {
  this.pos.add(this.velocity);
  this.wrap();
  this.velocity.mult(0.95);
  if (this.isBoosting) {
    this.boost();
  }
  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i] instanceof Asteroid) {
      let d = dist(this.pos.x, this.pos.y, asteroids[i].pos.x, asteroids[i].pos.y);
      if (d < asteroids[i].radius) {
        pause = true;
      }
    }
  }
};


Ship.prototype.boost = function() {
  let force = p5.Vector.fromAngle(this.head - PI / 2);
  this.velocity.add(force.mult(0.5));
};



Ship.prototype.show = function() {
  push();
  fill(color(255, 77, 77));
  noStroke();
  translate(this.pos.x, this.pos.y);
  rotate(this.head);
  triangle(-this.r + 5, this.r, this.r - 5, this.r, 0, -this.r);
  pop();
};

Ship.prototype.setRotation = function(angle) {
  this.rotation = angle;
};

Ship.prototype.turn = function() {
  this.head += this.rotation;
};

Ship.prototype.fire = function() {
  lasers.push(new Laser(this));
};

Ship.prototype.wrap = function() {
  if (this.pos.x < -this.r) {
    this.pos.x = width + this.r;
  }
  if (this.pos.x > width + this.r) {
    this.pos.x = 0 + this.r;
  }
  if (this.pos.y < -this.r) {
    this.pos.y = height + this.r;
  }
  if (this.pos.y > height + this.r) {
    this.pos.y = 0 + this.r;
  }

  for (let i = 0; i < lasers.length; i++) {
    if (lasers[i].position.x < 0 || lasers[i].position.x > width || lasers[i].position.y < 0 || lasers[i].position.y > height) {
      lasers.splice(i, 1);
    }
  }
};