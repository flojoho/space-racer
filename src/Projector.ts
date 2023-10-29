import Vector from './Vector';
import Camera from './Camera';
import Point from './Point';

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

    projectionObject.visible = projection.position.y > 0;
  }
}

const projectOntoSensor = (projectionObjects: ProjectionObject[]) => {
  for(const projectionObject of projectionObjects) {
    const { projection } = projectionObject;

    const { x, y, z } = projection.position;
    const sensorX = x/y;
    const sensorY = z/y;

    projectionObject.projection = new Point(sensorX, sensorY, y, projection.size);
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