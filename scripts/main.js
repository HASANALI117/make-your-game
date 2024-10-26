// import { CANON_POSITION_TOP, CANON_WIDTH, CANON_HEIGHT } from "./setup";
// import Player from "./Player";

// const CANON_POSITION_TOP = 850;
const CANON_WIDTH = 50;
const CANON_HEIGHT = 50;

const DIRECTIONS = {
  ArrowRight: {
    movement: 10,
  },
  ArrowLeft: {
    movement: -10,
  },
};

const gameContainer = document.getElementById("game-container");

class Player {
  constructor(width, height) {
    // this.position = position;
    this.width = width;
    this.height = height;
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
        const playerLeft = player.getBoundingClientRect().left;

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
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.alienNum = 30;
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
  const player = new Player(CANON_WIDTH, CANON_HEIGHT);
  player.createPlayer();
  player.movePlayer();
  const aliens = new Alien(20, 100);
  aliens.createAliens();

  let lastTime = 0;
  let fps = 0;

  function gameLoop(timestamp) {
    if (lastTime) {
      const delta = (timestamp - lastTime) / 1000;
      fps = Math.round(1 / delta);
      document.getElementById("fps").innerText = fps;
    }
    lastTime = timestamp;

    aliens.moveAliens();
    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
}

startGame();
