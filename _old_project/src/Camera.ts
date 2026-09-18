import Vector from "./Vector";

let rotation = 0;

let position = new Vector(0, 0, 0);
let velocity = new Vector(0, 0, 0);

const getPosition = () => {
  return position;
}

const increaseRotation = (speed: number) => {
  rotation += speed;
}

const getDirectionVector = () => {
  return new Vector(
    Math.cos(rotation),
    Math.sin(rotation),
    0
  )
}

const accelerate = () => {
  velocity.set(velocity.plus(getDirectionVector().times(0.01)));
}

const decelerate = () => {
  velocity.set(velocity.plus(getDirectionVector().times(-0.01)));
}

const update = () => {
  position.set(position.plus(velocity));
}

export default { increaseRotation, getDirectionVector, accelerate, decelerate, getPosition, update };