// Music persistence using sessionStorage
// This ensures music doesn't restart when navigating between pages

const music = document.getElementById("background-music");
const toggleBtn = document.getElementById("music-toggle");
const volumeSlider = document.getElementById("volume");

// Initialize music state from sessionStorage
function initMusic() {
  // Get saved state from sessionStorage
  const savedTime = parseFloat(sessionStorage.getItem('musicTime')) || 0;
  const savedVolume = parseFloat(sessionStorage.getItem('musicVolume')) || 1;
  const wasPaused = sessionStorage.getItem('musicPaused') === 'true';

  // Set initial values
  music.currentTime = savedTime;
  music.volume = savedVolume;
  volumeSlider.value = savedVolume;

  // Play or pause based on saved state
  if (!wasPaused) {
    music.play().catch(err => {
      console.log("Auto-play prevented:", err);
      toggleBtn.textContent = "Play Music for full immersion!";
    });
    toggleBtn.textContent = "Pause Music";
  } else {
    toggleBtn.textContent = "Play Music for full immersion!";
  }
}

// Save music state to sessionStorage
function saveState() {
  sessionStorage.setItem('musicTime', music.currentTime.toString());
  sessionStorage.setItem('musicVolume', music.volume.toString());
  sessionStorage.setItem('musicPaused', music.paused.toString());
}

// Toggle play/pause
toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = "Pause Music";
  } else {
    music.pause();
    toggleBtn.textContent = "Play Music for full immersion!";
  }
  saveState();
});

// Volume control
volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
  saveState();
});

// Save state periodically during playback
music.addEventListener('timeupdate', () => {
  // Save every 500ms to avoid too many writes
  if (!music.paused && music.currentTime % 0.5 < 0.1) {
    saveState();
  }
});

// Save state when page is about to unload
window.addEventListener('beforeunload', saveState);

// Initialize on page load
initMusic();
