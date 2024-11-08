import { gameContainer } from "./constants.js";
import { BOSS } from "./constants.js";

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
    bossContainer.setAttribute("id", "boss-container");
    bossContainer.style.left = `${this.position.x}px`;
    bossContainer.style.top = `${this.position.y}px`;

    this.healthBar = document.createElement("div");
    this.healthBar.setAttribute("id", "health-bar");
    this.healthBar.style.width = `${this.width}px`;
    this.healthBar.style.height = "10px";
    this.healthBar.style.backgroundColor = "red";
    bossContainer.appendChild(this.healthBar);

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
}

export default BossAlien;
