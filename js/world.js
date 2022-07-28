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
      this.timeSinceLastPipe = 0;
      this.pipes.push(new Pipe());
    }
    const pipe = this.pipes[0];
    if (pipe.outside) {
      this.passedPipeCount++;
      pipe.remove();
      this.pipes.shift();
    }
    movePipes(this.pipes, delta * this.pipeSpeed);
    this.bird.move(delta);
  }

  reset() {
    this.pipes.forEach(pipe => pipe.remove());
    this.pipes = [];
    this.timeSinceLastPipe = this.pipeInterval;
    this.passedPipeCount = 0;
    this.bird = new Bird();
  }

  checkLose() {
    // debug
    // console.dir({
    //   birdRect: this.bird.rectangle,
    //   insidePipe: this.pipeRectangles
    // });
    const birdRect = this.bird.rectangle;
    const insidePipe = this.pipeRectangles.some(
      pipeSegmentRect => isCollision(birdRect, pipeSegmentRect)
    );
    const outsideWorld = birdRect.top < 0 ||
                         birdRect.bottom > window.innerHeight;
    return outsideWorld || insidePipe;
  }

}

function movePipes(pipes, left) {
  pipes.forEach(pipe => {
    pipe.left -= left;
  });
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}
