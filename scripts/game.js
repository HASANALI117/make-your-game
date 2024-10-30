import Alien from './Alien.js';
import Player from './Player.js';

class Game {
  constructor() {
    this.Player = new Player();
    this.Alien = new Alien();
    this.isPaused = false;
    this.lastTime = 0;
    this.fpsCounter = 0;
    this.pauseOverlay = document.getElementById('pause-menu');
    this.resumeButton = document.getElementById('resume-button');
    this.restartButton = document.getElementById('restart-button');
    this.score = document.getElementById('score');
    this.lives = document.getElementById('lives');
    this.time = document.getElementById('time');
    this.fps = document.getElementById('fps');

    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (this.isPaused) {
          this.resumeGame();
        } else {
          this.pauseGame();
        }
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.pauseGame();
      }
    });

    this.resumeButton.addEventListener('click', () => this.resumeGame());
    this.restartButton.addEventListener('click', () => this.restartGame());
  }

  startGame() {
    this.Player.createPlayer();
    this.Player.handleMovement();
    this.Alien.createAliens();

    setInterval(() => {
      if (!this.isPaused) {
        this.Alien.generateBullets();
      }
    }, 1500);

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop(timestamp) {
    if (this.isPaused) {
      requestAnimationFrame(this.gameLoop.bind(this));
      return;
    }

    if (this.lastTime) {
      const delta = (timestamp - this.lastTime) / 1000;
      this.fpsCounter = Math.round(1 / delta);
      this.fps.innerText = this.fpsCounter;
    }
    this.lastTime = timestamp;

    this.Alien.moveAliens();
    this.Alien.moveBullets();

    this.Player.moveBullets();
    this.Player.updatePosition();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  pauseGame() {
    this.isPaused = true;
    this.pauseOverlay.style.visibility = 'visible';
  }

  resumeGame() {
    this.isPaused = false;
    this.pauseOverlay.style.visibility = 'hidden';
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  restartGame() {
    location.reload();
  }
}

export default Game;
