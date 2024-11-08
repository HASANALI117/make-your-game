import { gameContainer } from "./constants.js";
import { BOSS } from "./constants.js";

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
    const bossConatiner = document.createElement("div");
    bossConatiner.setAttribute("id", "boss-container");

    this.bossAlien = document.createElement("div");
    this.bossAlien.setAttribute("id", "boss-alien");
    this.bossAlien.style.width = `${this.width}px`;
    this.bossAlien.style.height = `${this.height}px`;
    this.bossAlien.style.backgroundImage = `url('../assets/${this.image}')`;
    this.bossAlien.style.left = `${this.position.x}`;
    this.bossAlien.style.top = `${this.position.y}`;

    bossConatiner.appendChild(this.bossAlien);
    gameContainer.appendChild(bossConatiner);

    this.healthBar = document.createElement("div");
    this.healthBar.setAttribute("id", "health-bar");
    this.healthBar.style.width = `${this.width}px`;
    this.healthBar.style.height = "10px";
    this.healthBar.style.backgroundColor = "red";
    bossConatiner.appendChild(this.healthBar);
  }

  //   moveBoss()
}

export default BossAlien;
