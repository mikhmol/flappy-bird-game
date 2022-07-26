import Bird from './bird.js';
import World from './world.js';

document.addEventListener('keypress', handleStart, { once: true });
const title = document.querySelector('[data-title]');
const subtitle = document.querySelector('[data-subtitle]');

let bird;
const world = new World(800, 0.75);
const WINDOW_UPDATE_INTERVAL = 20;
let intervalId;

function updateLoop() {
  world.update(WINDOW_UPDATE_INTERVAL);
  bird.move(WINDOW_UPDATE_INTERVAL);
  if (checkLose()) return handleLose();
}

function checkLose() {
  const birdRect = bird.rectangle;
  const insidePipe = world.pipeRectangles.some(
    rect => isCollision(birdRect, rect)
  );
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
  bird = new Bird('[data-bird]');
  world.reset();
  intervalId = setInterval(updateLoop, WINDOW_UPDATE_INTERVAL);
}

function handleLose() {
  clearInterval(intervalId);
  setTimeout(() => {
    title.classList.remove('hide');
    subtitle.classList.remove('hide');
    subtitle.textContent = `${world.passedPipeCount} Pipes`;
    document.addEventListener('keypress', handleStart, { once: true });
  }, 300);
}
