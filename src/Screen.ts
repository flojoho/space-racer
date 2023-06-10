import Vector from './Vector';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const width = 1280;
const height = 720;

const ctx = canvas.getContext('2d')!;

const fillCircle = (x: number, y: number, r: number) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
}

type ImagePoints = {
  position: Vector,
  distance: number
}

const focalLength = 1000;
const focalDistance = 30;

const renderPoints = (points: ImagePoints[]) => {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  for(const point of points) {
    const { position, distance } = point;
    const {x, y} = position;

    // ctx.fillStyle = `rgba(0, 255, 0, 0.2)`;
    // fillCircle(
    //   focalLength * x + width / 2,
    //   -focalLength * y + height / 2,
    //   100/distance + 7*Math.abs(distance - focalDistance)/distance
    // );

    // ctx.fillStyle = `rgba(0, 255, 0, ${ 10/distance })`;
    // fillCircle(
    //   focalLength * x + width / 2,
    //   -focalLength * y + height / 2,
    //   100/distance
    // );

    const canvasX = focalLength * x + width / 2;
    const canvasY = -focalLength * y + height / 2;

    const innerRadius = 50/distance;
    const outerRadius = 50/distance + 5 * Math.abs(distance - focalDistance)/distance;

    const gradient = ctx.createRadialGradient(
      canvasX, canvasY, innerRadius,
      canvasX, canvasY, outerRadius
    );
    gradient.addColorStop(0, `rgba(0, 255, 0, ${ Math.max(1 * 20/distance, 0.25) })`);
    gradient.addColorStop(1, `rgba(0, 255, 0, ${ distance < focalDistance ? 0 : 0.3 })`);
    ctx.fillStyle = gradient;
    fillCircle(
      canvasX,
      canvasY,
      outerRadius
    );

  }
}

export default { renderPoints };