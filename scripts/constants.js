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

// BOSS Alien Constants
export const BOSS = {
  POSITION: { X: 20, Y: 100 },
  WIDTH: 200,
  HEIGHT: 300,
  IMAGE: "boss.png",
  HEALTH: 20,
  SPEED: 1,
};

export const DIRECTIONS = {
  ArrowRight: {
    velocity: 10,
    movement: false,
  },
  ArrowLeft: {
    velocity: -10,
    movement: false,
  },
};
