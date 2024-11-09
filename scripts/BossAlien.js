import { gameContainer } from "./settings.js";
import { BOSS } from "./settings.js";
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
    this.bossAlienHit = null;
    this.healthBar = null;
    this.minY = -250;
    this.maxY = 300;
    this.preloadImage(this.hitImage);
  }

  preloadImage(imageSrc) {
    const img = new Image();
    img.src = `../assets/${imageSrc}`;
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
    bossContainer.appendChild(this.bossAlien);

    // Normal state image
    this.bossAlienImage = document.createElement("img");
    this.bossAlienImage.src = `../assets/${this.image}`;
    this.bossAlienImage.style.zIndex = "1";
    this.bossAlien.appendChild(this.bossAlienImage);

    // Hit state image
    this.bossAlienHitImage = document.createElement("img");
    this.bossAlienHitImage.src = `../assets/${this.hitImage}`;
    this.bossAlien.appendChild(this.bossAlienHitImage);

    gameContainer.appendChild(bossContainer);
  }

  moveBoss() {
    // Horizontal movement based on current direction
    if (this.moveDirection === "right") {
      this.position.x += this.speed;
    } else {
      this.position.x -= this.speed;
    }

    // Vertical zigzag pattern with boundary checks
    if (this.verticalMoveDirection === "down" && this.position.y < this.maxY) {
      this.position.y += this.speed * 0.3; // Move down until maxY
    } else if (
      this.verticalMoveDirection === "up" &&
      this.position.y > this.minY
    ) {
      this.position.y -= this.speed * 0.3; // Move up until minY
    } else {
      // Reverse vertical direction at boundaries
      this.verticalMoveDirection =
        this.verticalMoveDirection === "down" ? "up" : "down";
    }

    // Apply position to bossContainer
    bossContainer.style.left = `${this.position.x}px`;
    bossContainer.style.top = `${this.position.y}px`;

    // Change horizontal direction at screen edges
    if (bossContainer.getBoundingClientRect().right >= window.innerWidth) {
      this.moveDirection = "left";
    } else if (bossContainer.getBoundingClientRect().left <= 0) {
      this.moveDirection = "right";
    }

    // Change vertical direction occasionally for zigzag
    if (Math.random() < 0.01) {
      // Adjust probability as needed
      this.verticalMoveDirection =
        this.verticalMoveDirection === "down" ? "up" : "down";
    }

    // Hover effect
    if (!this.hovering && this.position.y > 200) {
      this.hovering = true;
      this.hoverTime = Date.now();
    }

    // Pause movement for a hover effect
    if (this.hovering) {
      if (Date.now() - this.hoverTime > 1000) {
        // Hover for 1 second
        this.hovering = false;
      } else {
        // Skip further movement if hovering
        return;
      }
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
      // Swap z-index values to bring hit image to front
      this.bossAlienImage.style.zIndex = "0";
      this.bossAlienHitImage.style.zIndex = "1";

      // Revert back after a short delay
      setTimeout(() => {
        this.bossAlienImage.style.zIndex = "1";
        this.bossAlienHitImage.style.zIndex = "0";
      }, 200);
    }
  }

  reduceHealth() {
    this.health -= 1;
    this.healthBar.style.width = `${(this.health / 20) * 100}%`;

    this.changeImageOnHit();

    if (this.health <= 0) {
      return true;
    }

    return false;
  }
}

export default BossAlien;
