import Pipe from './pipe.js';

export default class World {

  constructor(pipeInterval, pipeSpeed) {
    this.pipes = [];
    this.timeSinceLastPipe = pipeInterval;
    this.passedPipeCount = 0;
    this.pipeInterval = pipeInterval;
    this.pipeSpeed = pipeSpeed;
  }

  get pipeRectangles() {
    return this.pipes.flatMap(pipe => pipe.rects);
  }

  update(delta) {
    this.timeSinceLastPipe += delta;
    if (this.timeSinceLastPipe > this.pipeInterval) {
      this.timeSinceLastPipe -= this.pipeInterval;
      const pipe = new Pipe();
      this.pipes.push(pipe);
    }
    this.pipes.forEach(pipe => {
      if (pipe.outside) {
        this.passedPipeCount++;
        return pipe.remove();
      }
      pipe.left -= delta * this.pipeSpeed;
    });
  }

  reset() {
    this.pipes.forEach(pipe => pipe.remove());
    this.timeSinceLastPipe = this.pipeInterval;
    this.passedPipeCount = 0;
  }

}
