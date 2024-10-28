import Alien from "./Alien.js";
import Player from "./Player.js";
import {
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  DIRECTIONS,
  ALIEN_NUM,
  ALIEN_POSX,
  ALIEN_POSY,
} from "./constants.js";

const gameContainer = document.getElementById("game-container");
const score = document.getElementById("score");
const lives = document.getElementById("lives");
const time = document.getElementById("time");
const fps = document.getElementById("fps");

function startGame() {
  const player = new Player(PLAYER_WIDTH, PLAYER_HEIGHT);
  player.createPlayer();
  player.movePlayer();
  const aliens = new Alien(ALIEN_NUM, ALIEN_POSX, ALIEN_POSY);
  aliens.createAliens();

  let lastTime = 0;
  let fpsCounter = 0;

  function gameLoop(timestamp) {
    if (lastTime) {
      const delta = (timestamp - lastTime) / 1000;
      fpsCounter = Math.round(1 / delta);
      fps.innerText = fpsCounter;
    }
    lastTime = timestamp;

    aliens.moveAliens();
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}

startGame();
