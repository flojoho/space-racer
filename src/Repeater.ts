import Camera from './Camera.ts';
import Point from './Point.ts';
import Vector from './Vector.ts';


export default class Repeater {
  private points: Point[];
  private size: number;

  constructor(points: Point[], size: number) {
    this.points = points;
    this.size = size;
  }

  calculateNextFrame() {
    const { x: cameraX, y: cameraY, z: cameraZ} = Camera.getPosition();
    for(const point of this.points) {

      const corner = new Vector(
        cameraX - this.size/2,
        cameraY - this.size/2,
        cameraZ - this.size/2
      );
      const { x: relativeX, y: relativeY, z: relativeZ } = corner.to(point.position);

      const positiveMod = (number: number, divider: number) => {
        const modResult = number % divider;
        return modResult > 0 ? modResult : (divider + modResult);
      }

      const relativeVector = (new Vector(
        positiveMod(relativeX, this.size),
        positiveMod(relativeY, this.size),
        positiveMod(relativeZ, this.size)
      ));

      point.position.set(corner.plus(relativeVector));
    }
    
    return this.points;
  }
}