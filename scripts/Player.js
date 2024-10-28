import { DIRECTIONS, gameContainer } from "./constants.js";

class Player {
  constructor(posX, posY, width, height, image) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.image = image;
    this.player = null;
    this.bullets = [];
  }

  createPlayer() {
    let player = document.createElement("div");
    player.setAttribute("id", "player");
    player.style.top = this.posY + "px";
    player.style.left = this.posX + "px";
    player.style.width = this.width + "px";
    player.style.height = this.height + "px";
    player.style.backgroundImage = `url('../assets/${this.image}')`;
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

      if (e.key == " ") {
        this.generateBullets();
      }
    });
  }

  generateBullets() {
    let bullet = document.createElement("div");
    bullet.classList.add("bullet");
    const playerLeft = this.player.getBoundingClientRect().left;
    const playerTop = this.player.getBoundingClientRect().top;

    bullet.style.left = playerLeft + 20 + "px";
    bullet.style.top = playerTop + "px";

    gameContainer.appendChild(bullet);

    this.bullets.push(bullet);
  }

  moveBullets() {
    this.bullets = this.bullets.filter((bullet) => {
      const bulletTop = bullet.getBoundingClientRect().top;

      if (bulletTop > 0) {
        bullet.style.top = bulletTop - 5 + "px";
        return true;
      } else {
        gameContainer.removeChild(bullet);
        return false;
      }
    });
  }
}

export default Player;
