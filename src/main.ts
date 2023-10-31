import './style.css';
import Screen from './Screen';
import projectPoints from './Projector';
import Camera from './Camera';
import Point from './Point';
import Repeater from './Repeater';

const fps = 60;

type pressedKeys = {
  [key: string]: boolean
}
const pressedKeys: pressedKeys = {};


const randomCubePoint = () => {
  const size = 10_000;
  return new Point(
    size * (Math.random() - 0.5),
    size * (Math.random() - 0.5),
    size * (Math.random() - 0.5),
    1
  )
}
const stars = Array.from({length: 1000}, randomCubePoint );
const starRepeater = new Repeater(stars, 10_000);

const grid: Point[] = [];
const gridSize = 200;
const gridStep = 10;
for(let i = -gridSize; i <= gridSize; i+=gridStep) {
  for(let j = -gridSize; j <= gridSize; j+=gridStep) {
    grid.push(new Point(i, j, -1, 1));
  }
}
const gridRepeater = new Repeater(grid, 2*gridSize);


setInterval(() => {

  if(pressedKeys['ArrowLeft']) {
    Camera.increaseRotation(0.02);
  } else if (pressedKeys['ArrowRight']) {
    Camera.increaseRotation(-0.02);
  }

  if(pressedKeys['ArrowUp']) {
    Camera.accelerate();
  }
  if(pressedKeys['ArrowDown']) {
    Camera.decelerate();
  }

  Camera.update();

  const points = [
    ...gridRepeater.calculateNextFrame(),
    ...starRepeater.calculateNextFrame()
  ]

  Screen.renderPoints(projectPoints(points));
}, 1000/fps);

document.addEventListener('keydown', e => {
  pressedKeys[e.code] = true
});
document.addEventListener('keyup', e => {
  pressedKeys[e.code] = false
});