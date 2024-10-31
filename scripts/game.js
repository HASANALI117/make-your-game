import Alien from "./Alien.js";
import Player from "./Player.js";

class Game {
  constructor() {
    this.Player = new Player(); // player instance
    this.Alien = new Alien(); // aliens instance
    this.isPaused = false; // game state
    this.lastTime = 0; // timestamp
    this.fpsCounter = 0; // fps counter
    this.pauseOverlay = document.getElementById("pause-menu"); // pause overlay element
    this.resumeButton = document.getElementById("resume-button"); // resume button element
    this.restartButton = document.getElementById("restart-button"); // restart button element
    this.score = document.getElementById("score"); // score element
    this.lives = document.getElementById("lives"); // lives element
    this.time = document.getElementById("time"); // time element
    this.fps = document.getElementById("fps"); // fps element
    this.animationFrameId = null; // store the requestAnimationFrame ID

    this.addEventListeners(); // add event listeners
  }

  // add event listeners for pause, visibility change, resume, and restart
  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (this.isPaused) {
          this.resumeGame();
        } else {
          this.pauseGame();
        }
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.pauseGame();
      }
    });

    this.resumeButton.addEventListener("click", () => this.resumeGame());
    this.restartButton.addEventListener("click", () => this.restartGame());
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
      const delta = (timestamp - this.lastTime) / 1000;
      this.fpsCounter = Math.round(1 / delta);
      this.fps.innerText = this.fpsCounter;
    }
    this.lastTime = timestamp;

    this.Alien.moveAliens();
    this.Alien.moveBullets(this.Player);

    this.Player.moveBullets();
    this.Player.updatePosition();

    this.lives.innerText = this.Player.lives;
    this.score.innerText = this.Player.score;

    // Check if player is out of lives
    if (this.Player.lives <= 0 || this.Alien.aliens.length == 0) {
      this.pauseGame();
      console.log("Game Over");
    }

    this.Player.checkCollisionWithAliens(this.Alien.aliens);
    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  // pause, resume, and restart game functions
  pauseGame() {
    this.isPaused = true;
    this.pauseOverlay.style.visibility = "visible";

    // cancel the animation frame to pause the game loop
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resumeGame() {
    this.isPaused = false;
    this.pauseOverlay.style.visibility = "hidden";

    // resume the game loop
    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  restartGame() {
    location.reload();
  }
}

export default Game;
