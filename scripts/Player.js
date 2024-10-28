import { DIRECTIONS, gameContainer } from "./constants.js";

class Player {
  constructor(posX, posY, width, height, image) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.image = image;
    this.player = null;
    this.bullet = null;
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
      if (DIRECTIONS[e.key]) {
        let movement = DIRECTIONS[e.key].movement;
        const playerLeft = this.player.getBoundingClientRect().left;

        if (e.key === "ArrowRight") {
          // Right movement
          if (playerLeft < window.innerWidth - this.width) {
            player.style.left = playerLeft + movement + "px";
          }
        } else if (e.key === "ArrowLeft") {
          // Left movement
          if (playerLeft > 5) {
            player.style.left = playerLeft + movement + "px";
          }
        }
      }
    });
  }
}

export default Player;
