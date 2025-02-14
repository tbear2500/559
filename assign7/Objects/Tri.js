"use strict";

var v3 = twgl.v3;

var Tri = function(p1, p2, p3, color) {
    this.set(p1, p2, p3);
    this.color = color;
}

Tri.prototype.set = function(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    //calculate normal here
    this.normal = v3.cross([p2.getX() - p1.getX(), p2.getY() - p1.getY(), p2.getZ() - p1.getZ()], [p3.getX() - p1.getX(), p3.getY() - p1.getY(), p3.getZ() - p1.getZ()]);
}

Tri.prototype.setColor = function(color) {
    this.color = color;
}

Tri.prototype.getNormal = function() {
  return Array.prototype.slice.call(this.normal);
}

Tri.prototype.getP1 = function() {
    return this.p1;
}

Tri.prototype.getP2 = function() {
    return this.p2;
}

Tri.prototype.getP3 = function() {
    return this.p3;
}

Tri.prototype.getVertexArray = function() {
  return [
    this.p1.x, this.p1.y, this.p1.z,
    this.p2.x, this.p2.y, this.p2.z,
    this.p3.x, this.p3.y, this.p3.z
  ];
}

Tri.prototype.getColor = function() {
    return this.color;
}
