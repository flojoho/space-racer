import Vector from './Vector';
import Camera from './Camera';
import Point from './Point';
import Screen from './Screen';

export type ProjectionObject = {
  point: Point,
  projection: Point,
  previousProjection: Vector | undefined,
  visible: boolean
}

const cameraTranslation = (projectionObjects: ProjectionObject[]) => {
  const camPos = Camera.getPosition();
  for(const projectionObject of projectionObjects) {
    const { projection } = projectionObject;

    projection.position.set(camPos.to(projection.position));
  }
}

const cameraRotation = (projectionObjects: ProjectionObject[]) => {
  const unit = Camera.getDirectionVector();
  const normal = new Vector(unit.y, -unit.x, 0);

  for(const projectionObject of projectionObjects) {
    const { projection } = projectionObject;

    const relativeX = projection.position.dot(normal);
    const relativeY = projection.position.dot(unit);
    projection.position.x = relativeX;
    projection.position.y = relativeY;
  }
}

const removePointsBehindCamera = (projectionObjects: ProjectionObject[]) => {
  for(const projectionObject of projectionObjects) {
    const { projection } = projectionObject;

    const visible = projection.position.y > 0

    projectionObject.visible = visible;
  }
}

const focalLength = 1000;

const projectOntoSensor = (projectionObjects: ProjectionObject[]) => {
  for(const projectionObject of projectionObjects) {
    const { projection, point } = projectionObject;

    const { x, y, z } = projection.position;
    const sensorX = x/y;
    const sensorY = z/y;

    const canvasX = focalLength * sensorX + Screen.width / 2;
    const canvasY = -focalLength * sensorY + Screen.height / 2;

    point.previousProjection = new Vector(canvasX, canvasY, y);
    projectionObject.projection = new Point(canvasX, canvasY, y, projection.size);
  }
}

const projectPoints = (points: Point[]) => {
  let projectionObjects = points.map(point => {
    const { position, size } = point;
    const { x, y, z } = position;

    return {
      point,
      projection: new Point(x, y, z, size),
      previousProjection: point.previousProjection,
      visible: false
    }
  });

  cameraTranslation(projectionObjects);
  cameraRotation(projectionObjects);
  removePointsBehindCamera(projectionObjects);
  projectOntoSensor(projectionObjects);

  return projectionObjects;
}

export default projectPoints;