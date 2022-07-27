import Pipe from './pipe.js';
import Bird from './bird.js';

export default class World {

  constructor(pipeInterval, pipeSpeed) {
    this.pipeInterval = pipeInterval;
    this.pipeSpeed = pipeSpeed;
    this.pipes = [];
  }

  get pipeRectangles() {
    return this.pipes.flatMap(pipe => pipe.rects);
  }

  update(delta) {
    this.timeSinceLastPipe += delta;
    if (this.timeSinceLastPipe > this.pipeInterval) {
      this.timeSinceLastPipe -= this.pipeInterval;
      this.pipes.push(new Pipe());
    }
    this.pipes.forEach((pipe, index) => {
      if (!pipe.outside) {
        pipe.left -= delta * this.pipeSpeed;
      } else {
        pipe.left -= delta * this.pipeSpeed;
        this.passedPipeCount++;
        this.pipes.splice(index, 1);
        pipe.remove();
      }
    });
    this.bird.move(delta);
  }

  reset() {
    this.pipes.forEach(pipe => pipe.remove());
    this.timeSinceLastPipe = this.pipeInterval;
    this.passedPipeCount = 0;
    this.bird = new Bird('[data-bird]');
    this.pipes.length = 0;
  }

  checkLose() {
    const birdRect = this.bird.rectangle;
    const insidePipe = this.pipeRectangles.some(
      rect => isCollision(birdRect, rect)
    );
    const outsideWorld = birdRect.top < 0 ||
                         birdRect.bottom > window.innerHeight;
    return outsideWorld || insidePipe;
  }

}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}
