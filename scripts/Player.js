class Player {
  constructor(width, height) {
    // this.position = position;
    this.width = width;
    this.height = height;
  }

  createPlayer() {
    let player = document.createElement("div");
    player.setAttribute("id", "player");
    // player.style.top = this.position + "px";
    gameContainer.appendChild(player);
    this.player = player;
  }

  movePlayer() {
    this.player = player;
    document.addEventListener("keydown", (e) => {
      if (DIRECTIONS[e.key]) {
        let movement = DIRECTIONS[e.key].movement;
        const playerLeft = player.getBoundingClientRect().left;

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
