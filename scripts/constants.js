export const gameContainer = document.getElementById("game-container");

// Player Constants
export const PLAYER = {
  POSITION: { X: 20, Y: 850 },
  WIDTH: 50,
  HEIGHT: 50,
  IMAGE: "plane.png",
};

// Alien Constants
export const ALIEN = {
  POSITION: { X: 20, Y: 100 },
  WIDTH: 40,
  HEIGHT: 40,
  IMAGE: "alien.png",
  SPEED: 2,
  NUM: 40,
  ALIEN_PER_ROW: 8,
  SPACING: { X: 45, Y: 35 },
};

// BOSS Alien Constants
export const BOSS = {
  POSITION: { X: 20, Y: 100 },
  WIDTH: 200,
  HEIGHT: 300,
  IMAGE: "boss.png",
  HEALTH: 20,
  SPEED: 10,
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
