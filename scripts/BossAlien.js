// BossAlien.js
import Alien from "./Alien.js";
import { gameContainer } from "./constants.js";

class BossAlien extends Alien {
  constructor(
    alienNum = 1, // Only one boss alien
    posX = 100,
    posY = 50,
    width = 500, // Larger size
    height = 500, // Larger size
    image = "boss-alien-2.png", // Boss alien image
    health = 100 // Boss alien health
  ) {
    super(alienNum, posX, posY, width, height, image);
    this.health = health;
  }

  createBossAlien() {
    this.createAliens(); // Use the existing method to create the boss alien

    // Add health bar
    let healthBar = document.createElement("div");
    healthBar.setAttribute("id", "boss-health-bar");
    healthBar.style.position = "absolute";
    healthBar.style.top = this.posY - 20 + "px";
    healthBar.style.left = this.posX + "px";
    healthBar.style.width = this.width + "px";
    healthBar.style.height = "10px";
    healthBar.style.backgroundColor = "red";
    gameContainer.appendChild(healthBar);
    this.healthBar = healthBar;
  }

  updateHealth(damage) {
    this.health -= damage;
    this.healthBar.style.width = (this.health / 100) * this.width + "px";
    if (this.health <= 0) {
      this.aliensGroup.remove();
      this.healthBar.remove();
      console.log("Boss Alien Defeated!");
    }
  }
}

export default BossAlien;
