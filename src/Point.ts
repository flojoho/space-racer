import Vector from './Vector';

export default class Point {
  public position: Vector;
  public size: number;
  private lastPosition: Vector;

  constructor(initialX: number, initialY: number, initialZ: number, size: number) {
    this.position = new Vector(initialX, initialY, initialZ);
    this.lastPosition = new Vector(initialX, initialY, initialZ);
    this.size = size;
  }

}