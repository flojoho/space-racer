import './style.css';
import Screen from './Screen';
import Vector from './Vector';
import projectPoints from './Projector';
import Camera from './Camera';

const fps = 60;

type pressedKeys = {
  [key: string]: boolean
}

const pressedKeys: pressedKeys = {};

const randomCubeVector = () => {
  const size = 10000;
  return new Vector(
    size * (Math.random() - 0.5),
    size * (Math.random() - 0.5),
    size * (Math.random() - 0.5)
  )
}

const points = Array.from({length: 1000}, randomCubeVector );

const gridSize = 50;
for(let i = -gridSize; i <= gridSize; i+=4) {
  for(let j = -gridSize; j <= gridSize; j+=4) {
    points.push(new Vector(i - 5000, j - 5000, 4999));
  }
}

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

  Screen.renderPoints(projectPoints(points));
}, 1000/fps);

document.addEventListener('keydown', e => {
  pressedKeys[e.code] = true
});
document.addEventListener('keyup', e => {
  pressedKeys[e.code] = false
});