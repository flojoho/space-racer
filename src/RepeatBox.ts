import Camera from './Camera';
import Point from './Point.ts';
import Vector from './Vector.ts';


export default class RepeatBox {
  private points: Point[];
  private size: Number;

  constructor(points: Point[], size: number) {
    this.points = points;
    this.size = size;
  }

  calculateNextFrame() {
    
    //TODO
    
    return this.points;
  }
}