import Alien from "./Alien.js";
import Player from "./Player.js";
import { PLAYER, ALIEN } from "./constants.js";

const score = document.getElementById("score");
const lives = document.getElementById("lives");
const time = document.getElementById("time");
const fps = document.getElementById("fps");

function startGame() {
  const player = new Player(
    PLAYER.POSX,
    PLAYER.POSY,
    PLAYER.WIDTH,
    PLAYER.HEIGHT,
    PLAYER.IMAGE
  );

  player.createPlayer();
  player.movePlayer();

  const aliens = new Alien(
    ALIEN.NUM,
    ALIEN.POSX,
    ALIEN.POSY,
    ALIEN.WIDTH,
    ALIEN.HEIGHT,
    ALIEN.IMAGE
  );

  aliens.createAliens();

  let lastTime = 0;
  let fpsCounter = 0;

  // Generate bullets from aliens every 1.5 seconds
  setInterval(() => {
    aliens.generateBullets();
  }, 1500);

  function gameLoop(timestamp) {
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

startGame();
