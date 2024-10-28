export const gameContainer = document.getElementById("game-container");

// Player Constants
export const PLAYER = {
  POSX: 20,
  POSY: 850,
  WIDTH: 50,
  HEIGHT: 50,
  IMAGE: "plane.png",
};

// Alien Constants
export const ALIEN = {
  NUM: 30,
  POSX: 20,
  POSY: 100,
  WIDTH: 40,
  HEIGHT: 40,
  IMAGE: "alien.png",
};

export const DIRECTIONS = {
  ArrowRight: {
    movement: 10,
  },
  ArrowLeft: {
    movement: -10,
  },
};
