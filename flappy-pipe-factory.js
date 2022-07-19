import FlappyPipe from './flappy-pipe.js';


const PIPE_INTERVAL = 800;
const PIPE_SPEED = 0.75;
const pipes = [];
let timeSinceLastPipe;
let passedPipeCount;


export function setupPipes() {
  pipes.forEach(pipe => pipe.remove());
  timeSinceLastPipe = PIPE_INTERVAL;
  passedPipeCount = 0;
}

export function updatePipes(delta) {
  timeSinceLastPipe += delta;

  if (timeSinceLastPipe > PIPE_INTERVAL) {
    timeSinceLastPipe -= PIPE_INTERVAL;
    const pipe = new FlappyPipe();
    pipes.push(pipe);
  }

  pipes.forEach(pipe => {
    if (pipe.outside) {
      passedPipeCount++;
      return pipe.remove();
    }
    pipe.left -= delta * PIPE_SPEED;
  });
}

export function getPassedPipesCount() {
  return passedPipeCount;
}

export function getPipeRects() {
  return pipes.flatMap(pipe => pipe.rects);
}



