class Asteroid {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.radius = random(40, 70);
    this.total = random(10, 15);
    this.velocity = p5.Vector.random2D();
  }
}


Asteroid.prototype.update = function() {
  this.pos.add(this.velocity);
  this.wrap();
};


Asteroid.prototype.show = function() {
  push();
  fill(color(189, 195, 199));
  noStroke();
  translate(this.pos.x, this.pos.y);

  beginShape()
  for (let i = 0; i < this.total; i++) {
    var angle = map(i, 0, this.total, 0, 2 * PI);
    let x = this.radius * cos(angle);
    let y = this.radius * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  fill(color(51, 51, 51));
  noStroke();
  ellipse(0 + 15, 0 + 15, 10, 10);
  ellipse(0, 0 + 5, 10, 10);
  ellipse(0 + 15, 0 - 15, 10, 10);


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