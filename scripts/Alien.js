import { gameContainer } from "./constants.js";
import { isColliding } from "./utils.js";

class Alien {
  constructor(alienNum, posX, posY, width, height, image) {
    this.alienNum = alienNum;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.image = image;
    this.moveDirection = "right";
    this.bullets = [];
    this.aliens = [];
  }

  createAliens() {
    let aliensGroup = document.createElement("div");
    aliensGroup.setAttribute("id", "aliensGroup");

    for (let i = 0; i < this.alienNum; i++) {
      let alien = document.createElement("div");
      alien.setAttribute("id", `alien-${i}`);
      alien.classList.add("alien");
      aliensGroup.appendChild(alien);
      alien.style.top = (25 * (i - (i % (this.alienNum / 5)))) / 5 + "px";
      alien.style.left = 50 * (i % (this.alienNum / 5)) + "px";
      alien.style.width = this.width + "px";
      alien.style.height = this.height + "px";
      alien.style.backgroundImage = `url('../assets/${this.image}')`;

      this.aliens.push(alien);
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

  moveBullets(player) {
    this.bullets = this.bullets.filter((bullet) => {
      bullet.style.top = bullet.getBoundingClientRect().top + 7 + "px";
      if (bullet.getBoundingClientRect().top > window.innerHeight) {
        gameContainer.removeChild(bullet);
        return false;
      } else if (isColliding(bullet, player.player)) {
        gameContainer.removeChild(bullet);
        console.log("player dead");

        return false;
      }
      return true;
    });
  }
}

export default Alien;
