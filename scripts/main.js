// import { CANON_POSITION_TOP, CANON_WIDTH, CANON_HEIGHT } from "./setup";
// import Player from "./Player";

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const ALIEN_NUM = 30;
const ALIEN_POSX = 20;
const ALIEN_POSY = 100;

const DIRECTIONS = {
  ArrowRight: {
    movement: 10,
  },
  ArrowLeft: {
    movement: -10,
  },
};

const gameContainer = document.getElementById("game-container");
const score = document.getElementById("score");
const lives = document.getElementById("lives");
const time = document.getElementById("time");
const fps = document.getElementById("fps");
class Player {
  constructor(width, height) {
    // this.position = position;
    this.width = width;
    this.height = height;
    this.player = null;
    this.bullet = null;
  }

  createPlayer() {
    let player = document.createElement("div");
    player.setAttribute("id", "player");
    // player.style.top = this.position + "px";
    gameContainer.appendChild(player);
    this.player = player;
  }

  movePlayer() {
    this.player = player;
    document.addEventListener("keydown", (e) => {
      if (DIRECTIONS[e.key]) {
        let movement = DIRECTIONS[e.key].movement;
        const playerLeft = this.player.getBoundingClientRect().left;

        if (e.key === "ArrowRight") {
          // Right movement
          if (playerLeft < window.innerWidth - this.width) {
            player.style.left = playerLeft + movement + "px";
          }
        } else if (e.key === "ArrowLeft") {
          // Left movement
          if (playerLeft > 5) {
            player.style.left = playerLeft + movement + "px";
          }
        }
      }
    });
  }
}

class Alien {
  constructor(alienNum, posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.alienNum = alienNum;
    this.moveDirection = "right";
  }

  createAliens() {
    let aliensGroup = document.createElement("div");
    aliensGroup.setAttribute("id", "aliensGroup");

    for (let i = 0; i < this.alienNum; i++) {
      let alien = document.createElement("div");
      alien.setAttribute("id", i);
      alien.classList.add("alien");
      aliensGroup.appendChild(alien);
      alien.style.left = 50 * (i % (this.alienNum / 5)) + "px";
      alien.style.top = (25 * (i - (i % (this.alienNum / 5)))) / 5 + "px";
    }

    gameContainer.appendChild(aliensGroup);

    this.aliensGroup = aliensGroup;
  }

  moveAliens() {
    if (this.moveDirection === "right") {
      this.posX++;
    } else {
      this.posX--;
    }

    this.aliensGroup.style.left = this.posX + "px";
    this.aliensGroup.style.top = this.posY + "px";

    let aliens = document.getElementsByClassName("alien");
    for (let alien of aliens) {
      if (alien.getBoundingClientRect().left + 40 >= window.innerWidth) {
        this.moveDirection = "left";
        this.posY += 30;
        break;
      }
    }
    if (this.posX < 0) {
      this.moveDirection = "right";
      this.posY += 25;
    }
  }
}

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
