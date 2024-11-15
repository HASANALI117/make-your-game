import {
  PLAYER,
  DIRECTIONS,
  gameContainer,
  ALIEN_SOUNDS,
  BOSS_SOUNDS,
} from './settings.js';
import { isColliding, playSoundOnHit } from './utils.js';

class Player {
  constructor(
    position = { x: PLAYER.POSITION.X, y: PLAYER.POSITION.Y },
    width = PLAYER.WIDTH,
    height = PLAYER.HEIGHT,
    image = PLAYER.IMAGE,
    lives = 3,
    score = 0
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.image = image;
    this.player = null;
    this.bullets = [];
    this.lives = lives;
    this.score = score;
  }

  createPlayer() {
    let player = document.createElement('div');
    player.setAttribute('id', 'player');
    player.style.left = `${this.position.x}px`;
    player.style.bottom = `${this.position.y}px`;
    player.style.width = this.width + 'px';
    player.style.height = this.height + 'px';
    player.style.backgroundImage = `url('../assets/${this.image}')`;
    gameContainer.appendChild(player);
    this.player = player;
  }

  handleMovement() {
    this.player = player;
    document.addEventListener('keydown', (e) => {
      if (DIRECTIONS[e.key]) {
        DIRECTIONS[e.key].movement = true;
      }

      if (e.key == ' ') {
        this.generateBullets();
      }
    });

    document.addEventListener('keyup', (e) => {
      if (DIRECTIONS[e.key]) {
        DIRECTIONS[e.key].movement = false;
      }
    });
  }

  updatePosition() {
    const playerLeft = this.player.getBoundingClientRect().left;

    if (DIRECTIONS.ArrowRight.movement) {
      // Right movement
      if (playerLeft < window.innerWidth - this.width) {
        this.player.style.left = `${
          playerLeft + DIRECTIONS.ArrowRight.velocity
        }px`;
      }
    } else if (DIRECTIONS.ArrowLeft.movement) {
      // Left movement
      if (playerLeft > 5) {
        this.player.style.left = `${
          playerLeft + DIRECTIONS.ArrowLeft.velocity
        }px`;
      }
    }
  }

  generateBullets() {
    if (this.bullets.length < PLAYER.MAX_BULLETS) {
      let bullet = document.createElement('div');
      bullet.classList.add('bullet');
      const playerLeft = this.player.getBoundingClientRect().left;
      const playerTop = this.player.getBoundingClientRect().top;

      bullet.style.left = playerLeft + 20 + 'px';
      bullet.style.top = playerTop + 'px';

      gameContainer.appendChild(bullet);

      this.bullets.push(bullet);
    }
  }

  moveBullets() {
    this.bullets = this.bullets.filter((bullet) => {
      const bulletTop = bullet.getBoundingClientRect().top;

      if (bulletTop > 0) {
        bullet.style.top = bulletTop - 5 + 'px';
        return true;
      } else {
        gameContainer.removeChild(bullet);
        return false;
      }
    });
  }

  checkCollisionWithAliens(aliens) {
    this.bullets.forEach((bullet, bulletIndex) => {
      aliens.forEach((alien, alienIndex) => {
        if (isColliding(bullet, alien)) {
          gameContainer.removeChild(bullet);
          this.bullets.splice(bulletIndex, 1);

          alien.parentNode.removeChild(alien);
          aliens.splice(alienIndex, 1);

          this.score += 10;

          playSoundOnHit(ALIEN_SOUNDS);
        }
      });
    });
  }

  checkCollisionWithBoss(boss) {
    return this.bullets.some((bullet, index) => {
      if (isColliding(bullet, boss.bossAlien)) {
        gameContainer.removeChild(bullet);
        this.bullets.splice(index, 1);

        playSoundOnHit(BOSS_SOUNDS);
        return true;
      }
      return false;
    });
  }
}

export default Player;
