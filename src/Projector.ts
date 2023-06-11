import Vector from './Vector';
import Camera from './Camera';
import Point from './Point';

const cameraTranslation = (points: Point[]) => {
  const camPos = Camera.getPosition();
  for(const point of points) {
    point.position.set(camPos.to(point.position));
  }
}

const cameraRotation = (points: Point[]) => {
  const unit = Camera.getDirectionVector();
  const normal = new Vector(unit.y, -unit.x, 0);

  for(const point of points) {
    const relativeX = point.position.dot(normal);
    const relativeY = point.position.dot(unit);
    point.position.x = relativeX;
    point.position.y = relativeY;
  }
}

const removePointsBehindCamera = (points: Point[]) => {
  return points.filter(point => point.position.y > 0);
}

const projectOntoSensor = (points: Point[]) => {
  return points.map(point => {
    const { x, y, z } = point.position;
    const sensorX = x/y;
    const sensorY = z/y;

    return {
      position: new Vector(sensorX, sensorY, 0),
      distance: y
    }
  });
}

const projectPoints = (points: Point[]) => {
  let transformedPoints = points.map(point => {
    const { position, size } = point;
    const { x, y, z } = position;
    return new Point(x, y, z, size);
  });

  cameraTranslation(transformedPoints);
  cameraRotation(transformedPoints);
  transformedPoints = removePointsBehindCamera(transformedPoints);

  return projectOntoSensor(transformedPoints);
}

export default projectPoints;