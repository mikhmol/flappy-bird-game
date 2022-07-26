import World from './world.js';

const title = document.querySelector('[data-title]');
const subtitle = document.querySelector('[data-subtitle]');
const WINDOW_UPDATE_INTERVAL = 20;
const world = new World(800, 0.75);
let intervalId;

function updateWindow() {
  world.update(WINDOW_UPDATE_INTERVAL);
  if (world.checkLose()) return handleLose();
}

function handleStart() {
  title.classList.add('hide');
  world.reset();
  intervalId = setInterval(updateWindow, WINDOW_UPDATE_INTERVAL);
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

document.addEventListener('keypress', handleStart, { once: true });
