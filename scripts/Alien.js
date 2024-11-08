import { gameContainer } from "./constants.js";
import { ALIEN } from "./constants.js";
import { isColliding } from "./utils.js";

class Alien {
  constructor(
    position = { x: ALIEN.POSITION.X, y: ALIEN.POSITION.Y },
    alienNum = ALIEN.NUM,
    width = ALIEN.WIDTH,
    height = ALIEN.HEIGHT,
    image = ALIEN.IMAGE,
    speed = ALIEN.SPEED,
    spacing = { x: ALIEN.SPACING.X, y: ALIEN.SPACING.Y },
    aliensPerRow = ALIEN.ALIEN_PER_ROW,
    damage = ALIEN.DAMAGE
  ) {
    this.alienNum = alienNum;
    this.position = position;
    this.width = width;
    this.height = height;
    this.image = image;
    this.speed = speed;
    this.spacing = spacing;
    this.aliensPerRow = aliensPerRow;
    this.damage = damage;
    this.moveDirection = "right";
    this.bullets = [];
    this.aliens = [];
  }

  createAliens() {
    const aliensGroup = document.createElement("div");
    aliensGroup.setAttribute("id", "aliensGroup");

    // Calculate the width and height dynamically based on aliens per row
    const rows = Math.ceil(this.alienNum / this.aliensPerRow);
    const aliensGroupWidth = this.aliensPerRow * this.spacing.x;
    const aliensGroupHeight = rows * this.spacing.y;
    aliensGroup.style.width = `${aliensGroupWidth}px`;
    aliensGroup.style.height = `${aliensGroupHeight}px`;
    aliensGroup.style.left = `${this.position.x}px`;
    aliensGroup.style.top = `${this.position.y}px`;

    for (let i = 0; i < this.alienNum; i++) {
      const alien = document.createElement("div");
      alien.setAttribute("id", `alien-${i}`);
      alien.classList.add("alien");
      alien.style.width = `${this.width}px`;
      alien.style.height = `${this.height}px`;
      alien.style.backgroundImage = `url('../assets/${this.image}')`;

      // Calculate x and y position for each alien in rows of aliensPerRow
      const row = Math.floor(i / this.aliensPerRow);
      const col = i % this.aliensPerRow;
      const posX = col * this.spacing.x;
      const posY = row * this.spacing.y;
      alien.style.left = `${posX}px`;
      alien.style.top = `${posY}px`;

      this.aliens.push(alien);
      aliensGroup.appendChild(alien);
    }

    gameContainer.appendChild(aliensGroup);
    this.aliensGroup = aliensGroup;
  }

  moveAliens() {
    if (this.aliensGroup.getBoundingClientRect().right >= window.innerWidth) {
      this.moveDirection = "left";
      this.position.y += 30;
    } else if (this.aliensGroup.getBoundingClientRect().left <= 0) {
      this.moveDirection = "right";
      this.position.y += 30;
    }

    if (this.moveDirection === "right") {
      this.position.x += this.speed;
    } else {
      this.position.x -= this.speed;
    }

    this.aliensGroup.style.left = `${this.position.x}px`;
    this.aliensGroup.style.top = `${this.position.y}px`;
  }

  generateBullets() {
    const randomAlienIndex = Math.floor(Math.random() * this.alienNum);
    const randomAlien = document.getElementById(`alien-${randomAlienIndex}`);

    if (randomAlien) {
      const bullet = document.createElement("div");
      bullet.classList.add("alien-bullet");

      const alienRect = randomAlien.getBoundingClientRect();
      bullet.style.left = `${alienRect.left + 15}px`;
      bullet.style.top = `${alienRect.top + 25}px`;

      gameContainer.appendChild(bullet);
      this.bullets.push(bullet);
    }
  }

  checkBulletCollision(player, bullet) {
    if (bullet.getBoundingClientRect().top > window.innerHeight) {
      // remove bullet if it goes out of the screen
      gameContainer.removeChild(bullet);
      return false;
    } else if (isColliding(bullet, player.player)) {
      // check if bullet collides with player
      gameContainer.removeChild(bullet);
      player.lives -= this.damage;
      return false;
    }
    return true;
  }

  moveBullets(player) {
    this.bullets = this.bullets.filter((bullet) => {
      bullet.style.top = bullet.getBoundingClientRect().top + 7 + "px"; // move bullet down by 7px
      return this.checkBulletCollision(player, bullet);
    });
  }
}

export default Alien;
