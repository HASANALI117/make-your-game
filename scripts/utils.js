export function isColliding(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function calculateFPS(lastTime, timestamp) {
  const delta = (timestamp - lastTime) / 1000;
  return Math.round(1 / delta);
}

export function createExplosion(rect, container) {
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = rect.left; // Center horizontally
    particle.style.top = rect.top; // Center vertically
    container.appendChild(particle);

    // Animate the particle
    animateParticle(particle, container);
  }
}

function animateParticle(particle, container) {
  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 5 + 2;
  const xSpeed = Math.cos(angle) * speed;
  const ySpeed = Math.sin(angle) * speed;
  const gravity = 0.1;
  let lifetime = 0;

  const interval = setInterval(() => {
    const rect = particle.getBoundingClientRect();
    particle.style.left = `${rect.left + xSpeed}px`;
    particle.style.top = `${rect.top + ySpeed + gravity * lifetime}px`;
    lifetime += 1;

    if (lifetime > 50) {
      clearInterval(interval);
      container.removeChild(particle);
    }
  }, 16);
}

export function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}
