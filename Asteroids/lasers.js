class Laser {
  constructor(ship) {
    this.position = createVector(ship.pos.x, ship.pos.y);
    this.velocity = p5.Vector.fromAngle(ship.head - PI / 2);
    this.velocity.mult(8);
  }
}

Laser.prototype.update = function() {
  this.position.add(this.velocity);
};

Laser.prototype.show = function() {
  push();
  translate(this.position.x, this.position.y);
  stroke(255);
  strokeWeight(3);
  point(0, 0);
  pop();
};

Laser.prototype.hits = function(asteroid) {
  let d = dist(this.position.x, this.position.y, asteroid.pos.x, asteroid.pos.y);
  if (d < asteroid.radius) {
    return true;
  } else {
    return false;
  }
};