import { gameContainer } from "./constants.js";
import { BOSS } from "./constants.js";
import Alien from "./Alien.js";

const bossContainer = document.createElement("div");

class BossAlien extends Alien {
  constructor(
    position = { x: BOSS.POSITION.X, y: BOSS.POSITION.Y },
    width = BOSS.WIDTH,
    height = BOSS.HEIGHT,
    image = BOSS.IMAGE,
    hitImage = BOSS.HIT_IMAGE,
    health = BOSS.HEALTH,
    speed = BOSS.SPEED,
    damage = BOSS.DAMAGE
  ) {
    super(position, 1, width, height, image, speed, { x: 0, y: 0 }, 1, damage); // Call the parent class constructor
    this.hitImage = hitImage;
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
      this.position.x += this.speed;
    } else {
      this.position.x -= this.speed;
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

  // Change image on hit
  changeImageOnHit() {
    if (this.bossAlien) {
      // Set boss to hit image
      this.bossAlien.style.backgroundImage = `url('../assets/${this.hitImage}')`;

      // Revert back to normal image after a short delay
      setTimeout(() => {
        this.bossAlien.style.backgroundImage = `url('../assets/${this.image}')`;
      }, 200); // 200ms delay (adjust as needed)
    }
  }

  reduceHealth() {
    this.health -= 1;
    this.healthBar.style.width = `${(this.health / 20) * 100}%`;

    this.changeImageOnHit();

    if (this.health <= 0) {
      this.bossAlien.style.backgroundImage = `url('../assets/${this.hitImage}')`;
      return true;
    }

    return false;
  }
}

export default BossAlien;
