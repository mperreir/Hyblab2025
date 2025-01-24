
const sceneAudio = new audioScene('audio_scene.json')

const sceneManager = new Scene("sceneData.json", "scene-container", sceneAudio);

const slider = document.getElementById("time-slider");

setTimeout(() => {
  console.log("After 2 seconds");
  sceneManager.loadTriggers()
}, 2000);



document.querySelectorAll("svg").forEach(svg => {
  if (!svg.closest("svg")) {
      svg.style.pointerEvents = "none"; // Désactiver les interactions sur le parent
      svg.querySelectorAll("*").forEach(child => {
          child.style.pointerEvents = "all"; // Réactiver les interactions sur les enfants
      });
  }
});

const sceneContainer = document;
let isAnimating = false;

sceneContainer.addEventListener(
  "wheel",
  function (event) {
    event.preventDefault();
    const timeDelta = event.deltaY / 100;
    const maxTime = 100;

    sceneManager.time = Math.max(0, Math.min(sceneManager.time + timeDelta, maxTime));
    console.log(sceneManager.time);
    syncSliderWithScene();
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(() => {
        sceneManager.set_frame(sceneManager.time);
        isAnimating = false;
      });
    }
  },
  { passive: false }
);

const mouseBox = document.getElementById("mouse-box");

document.addEventListener("mousemove", (event) => {
  mouseBox.style.left = `${event.pageX + 10}px`;
  mouseBox.style.top = `${event.pageY + 10}px`;
  mouseBox.textContent = `X: ${event.pageX}, Y: ${event.pageY}`;
});


// Update slider value based on sceneManager.time
function syncSliderWithScene() {
  slider.value = sceneManager.time;
}

// Update sceneManager.time when slider changes
slider.addEventListener("input", () => {
  const newTime = parseFloat(slider.value);
  sceneManager.set_frame(newTime);
  syncSliderWithScene(); // Keep the display in sync
});

document.addEventListener('mousemove', (event) => {
  const popup = document.getElementById('mouse-popup');
  const xPercent = (event.clientX / window.innerWidth * 100).toFixed(2);
  const yPercent = (event.clientY / window.innerHeight * 100).toFixed(2);

  // Mettre à jour la position du popup
  popup.style.left = `${event.clientX + 10}px`;
  popup.style.top = `${event.clientY + 10}px`;

  // Mettre à jour le contenu
  popup.textContent = `X: ${xPercent}% | Y: ${yPercent}%`;

  // Afficher le popup
  popup.style.display = 'block';
});