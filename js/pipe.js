const PIPE_WIDTH = 120;
const HOLE_HEIGHT = 250;
const PADDING = 1.25;

export default class Pipe {

  constructor() {
    document.documentElement.style.setProperty('--pipe-width', PIPE_WIDTH);
    document.documentElement.style.setProperty('--hole-height', HOLE_HEIGHT);
    this.pipeElem = document.createElement('div');
    this.topElem = createPipeSegment('top');
    this.bottomElem = createPipeSegment('bottom');
    this.pipeElem.append(this.topElem);
    this.pipeElem.append(this.bottomElem);
    this.pipeElem.classList.add('pipe');
    this.pipeElem.style.setProperty(
      '--hole-top',
      randomNumberBetween(
        HOLE_HEIGHT * PADDING,
        window.innerHeight - HOLE_HEIGHT * PADDING
      )
    );
    this.left = window.innerWidth;
    document.body.append(this.pipeElem);
  }

  get left() {
    return parseFloat(
      getComputedStyle(this.pipeElem).getPropertyValue('--pipe-left')
    );
  }

  set left(value) {
    this.pipeElem.style.setProperty('--pipe-left', value);
  }

  get rects() {
    return [
      this.topElem.getBoundingClientRect(),
      this.bottomElem.getBoundingClientRect(),
    ];
  }

  get outside() {
    return (this.left + PIPE_WIDTH) < 0;
  }

  remove() {
    this.pipeElem.remove();
  }

}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createPipeSegment(position) {
  const segment = document.createElement('div');
  segment.classList.add('segment', position);
  return segment;
}

