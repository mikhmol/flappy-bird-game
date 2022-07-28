const BIRD_SPEED = 0.5;
const JUMP_DURATION = 125;

export default class Bird {

  constructor() {
    this.birdElem = document.querySelector('[data-bird]');
    this.timeSinceLastJump = JUMP_DURATION;
    this.top = window.innerHeight / 2;
    document.addEventListener('keydown', this.handleJump.bind(this));
  }

  set top(value) {
    this.birdElem.style.setProperty('--bird-top', value);
  }

  get top() {
    return parseFloat(
      getComputedStyle(this.birdElem).getPropertyValue('--bird-top')
    );
  }

  get rectangle() {
    return this.birdElem.getBoundingClientRect();
  }

  move(delta) {
    if (this.timeSinceLastJump < JUMP_DURATION) {
      this.top -= BIRD_SPEED * delta;
    } else {
      this.top += BIRD_SPEED * delta;
    }
    this.timeSinceLastJump += delta;
  }

  handleJump(e) {
    if (e.code !== 'Space') return;
    this.timeSinceLastJump = 0;
  }

}
