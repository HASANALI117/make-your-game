import { gameContainer } from "./constants.js";

class Player {
  constructor(posX, posY, width, height, image) {
    this.velocity = 10;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.image = image;
    this.player = null;
    this.bullets = [];
    this.movement = { left: false, right: false };
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
      if (e.key === "ArrowRight") {
        this.movement.right = true;
      } else if (e.key === "ArrowLeft") {
        this.movement.left = true;
      }

      if (e.key == " ") {
        this.generateBullets();
      }

      // Handle keyup to stop movement
      document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowRight") {
          this.movement.right = false;
        } else if (e.key === "ArrowLeft") {
          this.movement.left = false;
        }
      });
    });
  }

  updatePosition() {
    const playerLeft = this.player.getBoundingClientRect().left;

    if (this.movement.right) {
      // Right movement
      if (playerLeft < window.innerWidth - this.width) {
        player.style.left = `${playerLeft + this.velocity}px`;
      }
    } else if (this.movement.left) {
      // Left movement
      if (playerLeft > 5) {
        player.style.left = `${playerLeft + this.velocity * -1}px`;
      }
    }
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
