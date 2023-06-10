

export default class Vector {
  public x: number
  public y: number
  public z: number

  constructor(initialX: number, initialY: number, initialZ: number) {
    this.x = initialX;
    this.y = initialY;
    this.z = initialZ;
  }

  dot(vector: Vector) {
    const { x, y, z } = vector;
    return this.x * x + this.y * y + this.z * z;
  }

  plus(vector: Vector) {
    const { x, y, z } = vector;
    return new Vector(
      this.x + x,
      this.y + y,
      this.z + z
    );
  }

  to(vector: Vector) {
    const { x, y, z } = vector;
    return new Vector(
      x - this.x,
      y - this.y,
      z - this.z
    );
  }

  set(vector: Vector) {
    const { x, y, z } = vector;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  times(factor: number) {
    this.x *= factor;
    this.y *= factor;
    this.z *= factor;
    return this;
  }
}