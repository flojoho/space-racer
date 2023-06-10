import Vector from './Vector';
import Camera from './Camera';

const cameraTranslation = (points: Vector[]) => {
  const camPos = Camera.getPosition();
  for(const point of points) {
    point.set(camPos.to(point));

    const { x, y, z } = point;
    const scale = 10000;
    const mod = (number: number, divider: number) => {
      const modResult = number % divider;
      return modResult > 0 ? modResult : (divider + modResult);
    }
    point.set(new Vector(
      mod(x, scale) - scale/2,
      mod(y, scale) - scale/2,
      mod(z, scale) - scale/2
    ));
  }
}

const cameraRotation = (points: Vector[]) => {
  const unit = Camera.getDirectionVector();
  const normal = new Vector(unit.y, -unit.x, 0);

  for(const point of points) {
    const relativeX = point.dot(normal);
    const relativeY = point.dot(unit);
    point.x = relativeX;
    point.y = relativeY;
  }
}

const removePointsBehindCamera = (points: Vector[]) => {
  return points.filter(point => point.y > 0);
}

const projectOntoSensor = (points: Vector[]) => {
  return points.map(point => {
    const { x, y, z } = point;
    const sensorX = x/y;
    const sensorY = z/y;

    return {
      position: new Vector(sensorX, sensorY, 0),
      distance: y
    }
  });
}

const projectPoints = (points: Vector[]) => {
  let transformedPoints = points.map(point => {
    const { x, y, z } = point
    return new Vector(x, y, z);
  });

  cameraTranslation(transformedPoints);
  cameraRotation(transformedPoints);
  transformedPoints = removePointsBehindCamera(transformedPoints);

  return projectOntoSensor(transformedPoints);
}

export default projectPoints;