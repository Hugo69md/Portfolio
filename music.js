// SPA Navigation System
// Music plays continuously without interruption

const music = document.getElementById("background-music");
const toggleBtn = document.getElementById("music-toggle");
const volumeSlider = document.getElementById("volume");

// Initialize music controls
function initMusic() {
  // Start with music paused, user must interact to play
  toggleBtn.textContent = "Play Music for full immersion!";
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
});

// Volume control
volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});

// Initialize on page load
initMusic();

// SPA Section Navigation
function navigateToSection(sectionId) {
  // Hide all sections
  const allSections = document.querySelectorAll('.page-section');
  allSections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show the requested section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Handle navigation clicks
document.addEventListener('click', (e) => {
  // Check if clicked element or its parent has data-section attribute
  const navElement = e.target.closest('[data-section]');
  if (navElement) {
    e.preventDefault();
    const sectionId = navElement.getAttribute('data-section');
    navigateToSection(sectionId);
    // Update URL hash without triggering scroll
    history.pushState(null, null, '#' + sectionId);
  }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToSection(hash);
});

// Handle initial page load with hash
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToSection(hash);
});
