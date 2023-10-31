import { ProjectionObject } from './Projector';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const width = 1280;
const height = 720;

const ctx = canvas.getContext('2d')!;

const fillCircle = (x: number, y: number, r: number) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
}

const focalDistance = 30;

const lineWidthFromDistance = (distance: number) => {
  const minWidth = 2;
  const maxWidth = 20;

  const lineWidth = 150/distance;

  if(lineWidth < minWidth) return minWidth;
  if(lineWidth > maxWidth) return maxWidth;

  return lineWidth;
};

const renderPoints = (projectionObjects: ProjectionObject[]) => {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  for(const projectionObject of projectionObjects) {
    const { projection, visible, previousProjection } = projectionObject;
    const { position } = projection;
    let {x, y, z} = position;

    if(!visible) continue;

    const canvasX = x;
    const canvasY = y;


    if(previousProjection) {
      const { x: prevX, y: prevY } = previousProjection;

      ctx.strokeStyle = '#ffffff';
      ctx.lineCap = 'round';
      ctx.lineWidth = lineWidthFromDistance(z);
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }



    continue;
    // circles + blur
    const innerRadius = 50/z;
    const outerRadius = 50/z + 5 * Math.abs(z - focalDistance)/z;

    const gradient = ctx.createRadialGradient(
      canvasX, canvasY, innerRadius,
      canvasX, canvasY, outerRadius
    );
    gradient.addColorStop(0, `rgba(0, 255, 0, ${ Math.max(1 * 20/z, 0.25) })`);
    gradient.addColorStop(1, `rgba(0, 255, 0, ${ z < focalDistance ? 0 : 0.3 })`);
    ctx.fillStyle = gradient;
    fillCircle(
      canvasX,
      canvasY,
      outerRadius
    );

  }
}

export default { renderPoints, width, height };