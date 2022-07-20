import Pipe from './pipe.js';

const PIPE_INTERVAL = 800;
const PIPE_SPEED = 0.75;

export default class World {

  constructor() {
    this.pipes = [];
    this.timeSinceLastPipe = PIPE_INTERVAL;
    this.passedPipeCount = 0;
  }

  get pipeRectangles() {
    return this.pipes.flatMap(pipe => pipe.rects);
  }

  update(delta) {
    this.timeSinceLastPipe += delta;
    if (this.timeSinceLastPipe > PIPE_INTERVAL) {
      this.timeSinceLastPipe -= PIPE_INTERVAL;
      const pipe = new Pipe();
      this.pipes.push(pipe);
    }
    this.pipes.forEach(pipe => {
      if (pipe.outside) {
        this.passedPipeCount++;
        return pipe.remove();
      }
      pipe.left -= delta * PIPE_SPEED;
    });
  }
  reset() {
    this.pipes.forEach(pipe => pipe.remove());
    this.timeSinceLastPipe = PIPE_INTERVAL;
    this.passedPipeCount = 0;
  }

}
