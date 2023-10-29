import Vector from './Vector';

export default class Point {
  public position: Vector;
  public size: number;
  public previousProjection: Vector | undefined;

  constructor(initialX: number, initialY: number, initialZ: number, size: number) {
    this.position = new Vector(initialX, initialY, initialZ);
    this.size = size;
  }
}