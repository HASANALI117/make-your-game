import Alien from './Alien.js';
import Player from './Player.js';
import { PLAYER, ALIEN } from './constants.js';

const score = document.getElementById('score');
const lives = document.getElementById('lives');
const time = document.getElementById('time');
const fps = document.getElementById('fps');
const pauseOverlay = document.getElementById('pause-menu');
const resumeButton = document.getElementById('resume-button');
const restartButton = document.getElementById('restart-button');

let isPaused = false;

function startGame() {
  const player = new Player();

  player.createPlayer();
  player.handleMovement();

  const aliens = new Alien();

  aliens.createAliens();

  let lastTime = 0;
  let fpsCounter = 0;

  // Generate bullets from aliens every 1.5 seconds
  setInterval(() => {
    if (!isPaused) {
      aliens.generateBullets();
    }
  }, 1500);

  function gameLoop(timestamp) {
    if (isPaused) {
      requestAnimationFrame(gameLoop);
      return;
    }

    if (lastTime) {
      const delta = (timestamp - lastTime) / 1000;
      fpsCounter = Math.round(1 / delta);
      fps.innerText = fpsCounter;
    }
    lastTime = timestamp;

    aliens.moveAliens();
    aliens.moveBullets();

    player.moveBullets();
    player.updatePosition();
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}

function pauseGame() {
  isPaused = true;
  pauseOverlay.style.visibility = 'visible';
}

function resumeGame() {
  isPaused = false;
  pauseOverlay.style.visibility = 'hidden';
  requestAnimationFrame(gameLoop);
}

function restartGame() {
  location.reload();
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }
});

// pause game when tab is not in focus
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    pauseGame();
  }
});

resumeButton.addEventListener('click', resumeGame);
restartButton.addEventListener('click', restartGame);

startGame();
