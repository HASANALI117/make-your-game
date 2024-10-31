import Alien from './Alien.js';
import Player from './Player.js';
import { formatTime, calculateFPS } from './utils.js';

const gameMenu = document.getElementById('game-menu'); // game menu element
const menuTitle = document.getElementById('menu-title'); // menu title element
const menuScore = document.getElementById('menu-score'); // menu score element
const resumeButton = document.getElementById('resume-button'); // resume button element
const restartButton = document.getElementById('restart-button'); // restart button element
const score = document.getElementById('score'); // score element
const lives = document.getElementById('lives'); // lives element
const time = document.getElementById('time'); // time element
const fps = document.getElementById('fps'); // fps element

class Game {
  constructor() {
    this.Player = new Player(); // player instance
    this.Alien = new Alien(); // aliens instance
    this.isPaused = false; // game state
    this.lastTime = 0; // timestamp
    this.animationFrameId = null; // store the requestAnimationFrame ID
    this.startTime = null; // Initialize start time
    this.addEventListeners(); // add event listeners
  }

  // add event listeners for pause, visibility change, resume, and restart
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

    resumeButton.addEventListener('click', () => this.resumeGame());
    restartButton.addEventListener('click', () => this.restartGame());
  }

  // start the game by creating the player, handling movement, and creating aliens
  startGame() {
    this.Player.createPlayer();
    this.Player.handleMovement();
    this.Alien.createAliens();

    // generate bullets for aliens every 1.5 seconds
    setInterval(() => {
      if (!this.isPaused) {
        this.Alien.generateBullets();
      }
    }, 1500);

    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this)); // start the game loop
  }

  gameLoop(timestamp) {
    if (this.isPaused) {
      return;
    }

    if (this.lastTime) {
      fps.innerText = calculateFPS(this.lastTime, timestamp);
    }
    this.lastTime = timestamp;

    this.Alien.moveAliens();
    this.Alien.moveBullets(this.Player);

    this.Player.moveBullets();
    this.Player.updatePosition();

    lives.innerText = this.Player.lives;
    score.innerText = this.Player.score;

    // Calculate and update elapsed time
    const elapsedTime = Math.floor((timestamp - this.startTime) / 1000);
    time.innerText = formatTime(elapsedTime);

    // Check if player is out of lives
    if (this.Player.lives <= 0) {
      this.pauseGame(true);
      this.showMenu('Game Over', `Score: ${this.Player.score}`, false);
    } else if (this.Alien.aliens.length === 0) {
      this.pauseGame(true);
      this.showMenu('Congratulations!', `Score: ${this.Player.score}`, false);
    }

    this.Player.checkCollisionWithAliens(this.Alien.aliens);
    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  // pause, resume, and restart game functions
  pauseGame(endGame = false) {
    this.isPaused = true;
    if (!endGame) {
      this.showMenu('Game Paused', '', true);
    }

    // cancel the animation frame to pause the game loop
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resumeGame() {
    this.isPaused = false;
    gameMenu.style.visibility = 'hidden';

    // resume the game loop
    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  restartGame() {
    location.reload();
  }

  showMenu(title, scoreText, showResume) {
    menuTitle.innerText = title;
    menuScore.innerText = scoreText;
    resumeButton.style.display = showResume ? 'block' : 'none';
    gameMenu.style.visibility = 'visible';
  }
}

export default Game;
