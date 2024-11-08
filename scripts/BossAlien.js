import { gameContainer } from "./constants.js";
import { BOSS } from "./constants.js";
import { isColliding } from "./utils.js";

const bossContainer = document.createElement("div");

class BossAlien {
  constructor(
    position = { x: BOSS.POSITION.X, y: BOSS.POSITION.Y },
    width = BOSS.WIDTH,
    height = BOSS.HEIGHT,
    image = BOSS.IMAGE,
    health = BOSS.HEALTH
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.image = image;
    this.health = health;
    this.moveDirection = "right";
    this.bullets = [];
    this.bossAlien = null;
    this.healthBar = null;
  }

  createBoss() {
    // Boss Container element
    bossContainer.setAttribute("id", "boss-container");
    bossContainer.style.left = `${this.position.x}px`;
    bossContainer.style.top = `${this.position.y}px`;

    // Healthbar element
    this.healthBar = document.createElement("div");
    this.healthBar.setAttribute("id", "health-bar");
    this.healthBar.style.width = "100%";
    this.healthBar.style.height = "10px";
    this.healthBar.style.backgroundColor = "red";
    bossContainer.appendChild(this.healthBar);

    // Boss Alien element
    this.bossAlien = document.createElement("div");
    this.bossAlien.setAttribute("id", "boss-alien");
    this.bossAlien.style.width = `${this.width}px`;
    this.bossAlien.style.height = `${this.height}px`;
    this.bossAlien.style.backgroundImage = `url('../assets/${this.image}')`;
    bossContainer.appendChild(this.bossAlien);

    gameContainer.appendChild(bossContainer);
  }

  moveBoss() {
    if (this.moveDirection === "right") {
      this.position.x += BOSS.SPEED;
    } else {
      this.position.x -= BOSS.SPEED;
    }

    bossContainer.style.left = `${this.position.x}px`;
    bossContainer.style.top = `${this.position.y}px`;

    if (bossContainer.getBoundingClientRect().right >= window.innerWidth) {
      this.moveDirection = "left";
    } else if (bossContainer.getBoundingClientRect().left < 0) {
      this.moveDirection = "right";
    }
  }

  generateBullets() {
    const bullet = document.createElement("div");
    bullet.classList.add("boss-bullet");
    bullet.style.left = `${this.position.x + this.width / 2}px`;
    bullet.style.top = `${this.position.y + this.height}px`;

    gameContainer.appendChild(bullet);
    this.bullets.push(bullet);
  }

  checkBulletCollision(player, bullet) {
    if (bullet.getBoundingClientRect().top > window.innerHeight) {
      // remove bullet if it goes out of the screen
      gameContainer.removeChild(bullet);
      return false;
    } else if (isColliding(bullet, player.player)) {
      // check if bullet collides with player
      gameContainer.removeChild(bullet);
      player.lives--;
      return false;
    }
    return true;
  }

  moveBullets(player) {
    this.bullets = this.bullets.filter((bullet) => {
      bullet.style.top = `${bullet.getBoundingClientRect().top + 7}px`;

      return this.checkBulletCollision(player, bullet);
    });
  }

  reduceHealth() {
    this.health -= 1;
    this.healthBar.style.width = `${(this.health / 20) * 100}%`;

    if (this.health <= 0) {
      gameContainer.removeChild(bossContainer);
      return true;
    }

    return false;
  }
}

export default BossAlien;
