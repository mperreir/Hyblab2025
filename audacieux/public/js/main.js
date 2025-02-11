
const sceneAudio = new audioScene('data/audio_scene.json')
const sceneManager = new Scene("data/sceneData.json", "scene-container", sceneAudio);
const slider = document.getElementById("time-slider");
let books;
let InteractiveBookObject;
let maxTime = 0;

setTimeout(() => {
  sceneManager.loadTriggers()
  
  const svg = document.getElementById('PÉNICHE');

  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  while (svg.firstChild) {
    group.appendChild(svg.firstChild);
  }

  // Ajoute le groupe dans le SVG
  svg.appendChild(group);
  group.setAttribute('id', 'wiggle-group');
}, 2000);



document.querySelectorAll("svg").forEach(svg => {
  if (!svg.closest("svg")) {
      svg.style.pointerEvents = "none"; // Désactiver les interactions sur le parent
      svg.querySelectorAll("*").forEach(child => {
          child.style.pointerEvents = "all"; // Réactiver les interactions sur les enfants
      });
  }
});
let isAnimating = false;

function dysplayCredits() {
  const credits = document.getElementById('credits');
  if (sceneManager.time == 100) {
    credits.style.display = 'block';
  }
  else {
    credits.style.display = 'none';
  }
};

document.addEventListener("wheel",
  function (event) {
    dysplayCredits();
    event.preventDefault(); 
    const timeDelta = event.deltaY / 100;
    
    console.log(sceneManager.time)
    sceneManager.time = Math.max(0, Math.min(sceneManager.time + timeDelta, maxTime));
    InteractiveBookObject.updatePageTime(sceneManager.time)
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

// Update slider value based on sceneManager.time
function syncSliderWithScene() {
  slider.value = sceneManager.time;
}

// Update sceneManager.time when slider changes
slider.addEventListener("input", () => {
  const newTime = parseFloat(slider.value);
  sceneManager.set_frame(newTime);
  sceneManager.time = newTime
  InteractiveBookObject.updatePageTime(newTime)
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
  popup.textContent = `X: ${event.x}px | Y: ${event.y}px | time: ${(Math.round(sceneManager.time))}`;

  // Afficher le popup
  popup.style.display = 'block';
});



// Initialize books
document.addEventListener('DOMContentLoaded', () => {
  books = document.querySelectorAll('.book');
  const activation = document.getElementById('livre_open');
  InteractiveBookObject = new InteractiveBook(books[0],activation)
});

function setMaxTime(event, time){
  maxTime = time;
}
