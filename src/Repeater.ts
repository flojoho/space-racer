import Camera from './Camera.ts';
import Point from './Point.ts';
import Vector from './Vector.ts';

type UniquePoint = {
  point: Point,
  sector: Vector,
  visible: boolean
}

const positiveMod = (number: number, divider: number) => {
  const modResult = number % divider;
  return modResult > 0 ? modResult : (divider + modResult);
}
const integerDivision = (number: number, divider: number) => {
  return Math.floor(number/divider);
}

export default class Repeater {
  private uniquePoints: UniquePoint[];
  private size: number;

  constructor(points: Point[], size: number) {
    this.uniquePoints = points.map(point => {
      return {
        point,
        sector: new Vector(0, 0, 0)
      }
    });
    this.size = size;
  }

  calculateNextFrame() {
    const { x: cameraX, y: cameraY, z: cameraZ} = Camera.getPosition();
    for(const uniquePoint of this.uniquePoints) {
      const { point, sector } = uniquePoint;

      const corner = new Vector(
        cameraX - this.size/2,
        cameraY - this.size/2,
        cameraZ - this.size/2
      );
      const { x: relativeX, y: relativeY, z: relativeZ } = corner.to(point.position);

      const relativeVector = (new Vector(
        positiveMod(relativeX, this.size),
        positiveMod(relativeY, this.size),
        positiveMod(relativeZ, this.size)
      ));

      point.position.set(corner.plus(relativeVector));

      const newSector = new Vector(
        integerDivision(relativeX, this.size),
        integerDivision(relativeY, this.size),
        integerDivision(relativeZ, this.size)
      );

      uniquePoint.visible = sector.x === newSector.x && sector.y === newSector.y && sector.z === newSector.z;
      if(!uniquePoint.visible) uniquePoint.point.previousProjection = undefined;

      uniquePoint.sector = newSector;
    }

    const uniquePoints = this.uniquePoints
      .filter(uniquePoint => uniquePoint.visible)
      .map(uniquePoint => {
        return uniquePoint.point;
      });

    return uniquePoints;
  }
}