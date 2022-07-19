import FlappyBird from './flappy-bird.js';
import {
  updatePipes,
  setupPipes,
  getPassedPipesCount,
  getPipeRects,
} from './flappy-pipe-factory.js';

document.addEventListener('keypress', handleStart, { once: true });
const title = document.querySelector('[data-title]');
const subtitle = document.querySelector('[data-subtitle]');

let lastTime;
let bird;

function updateLoop(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
  }
  const delta = time - lastTime;
  bird.move(delta);
  updatePipes(delta);
  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateLoop);
}

function checkLose() {
  const birdRect = bird.rectangle;
  const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect));
  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
  return outsideWorld || insidePipe;
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function handleStart() {
  title.classList.add('hide');

  bird = new FlappyBird('[data-bird]');
  setupPipes();

  lastTime = null;
  window.requestAnimationFrame(updateLoop);
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove('hide');
    subtitle.classList.remove('hide');
    subtitle.textContent = `${getPassedPipesCount()} Pipes`;
    document.addEventListener('keypress', handleStart, { once: true });
  }, 300);
}
