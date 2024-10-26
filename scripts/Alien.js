class Alien {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.alienNum = 30;
    this.moveDirection = "right";
  }

  createAliens() {
    let aliensGroup = document.createElement("div");
    aliensGroup.setAttribute("id", "aliensGroup");

    for (let i = 0; i < this.alienNum; i++) {
      let alien = document.createElement("div");
      alien.setAttribute("id", i);
      alien.classList.add("alien");
      aliensGroup.appendChild(alien);
      alien.style.left = 50 * (i % (this.alienNum / 5)) + "px";
      alien.style.top = (25 * (i - (i % (this.alienNum / 5)))) / 5 + "px";
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
}

export default Alien;
