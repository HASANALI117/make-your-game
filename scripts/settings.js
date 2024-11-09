export const gameContainer = document.getElementById('game-container');

// Player Constants
export const PLAYER = {
  POSITION: { X: 20, Y: 50 },
  WIDTH: 50,
  HEIGHT: 50,
  IMAGE: 'plane.png',
  MAX_BULLETS: 3,
};

// Alien Constants
export const ALIEN = {
  POSITION: { X: 20, Y: 100 },
  WIDTH: 50,
  HEIGHT: 50,
  IMAGE: 'alien.png',
  SPEED: 2,
  NUM: 40,
  ALIEN_PER_ROW: 8,
  SPACING: { X: 45, Y: 45 },
  DAMAGE: 1,
};

// BOSS Alien Constants
export const BOSS = {
  POSITION: { X: 20, Y: 100 },
  WIDTH: 200,
  HEIGHT: 300,
  IMAGE: 'boss.png',
  HIT_IMAGE: 'boss-damage.png',
  HEALTH: 20,
  SPEED: 10,
  DAMAGE: 3,
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

export const START_SOUNDS = [
  '../sounds/background/Pixel-Peeker-Polka-faster.mp3',
];

export const WIN_SOUNDS = [
  // "../sounds/win/nani.mp3",
  '../sounds/win/nokia-arabic.mp3',
  '../sounds/win/phonk.mp3',
  '../sounds/win/win.mp3',
];

export const LOSE_SOUNDS = [
  '../sounds/lose/aughh.mp3',
  '../sounds/lose/bruh.mp3',
  '../sounds/lose/Oh Hell No!.mp3',
  '../sounds/lose/Spongebob-disappointed.mp3',
  '../sounds/lose/why-gae.mp3',
  '../sounds/lose/Welhim scream.mp3',
];

export const PLAYER_SOUNDS = ['../sounds/player/munch.wav'];

export const ALIEN_SOUNDS = ['../sounds/alien/Oof.mp3'];

export const BOSS_SOUNDS = ['../sounds/boss/classic_hurt.mp3'];

export const TIME_SOUNDS = ['../sounds/time/Spongebob 2 Hours Later.mp3'];
