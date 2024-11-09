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
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function calculateFPS(lastTime, timestamp) {
  const delta = (timestamp - lastTime) / 1000;
  return Math.round(1 / delta);
}

export function playSoundOnHit(soundFilePaths, volume = 1.0) {
  const randomIndex = Math.floor(Math.random() * soundFilePaths.length);
  const audio = new Audio(soundFilePaths[randomIndex]);
  audio.volume = volume; // Set the volume
  audio.play();
  return audio;
}
