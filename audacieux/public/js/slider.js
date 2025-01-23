const sceneManager = new Scene("sceneData.json", "scene-container")

// Gérer l'événement du scroll
const sceneContainer = document; // Récupérer le conteneur de la scène

let isAnimating = false;
sceneContainer.addEventListener("wheel", function (event) {
  event.preventDefault();
  console.log(event.deltaY);
  timeDelta = event.deltaY/100;
  maxTime = 100;

  sceneManager.time = Math.max(0, Math.min(sceneManager.time+timeDelta, maxTime));

  if (!isAnimating) {
    isAnimating = true;
    requestAnimationFrame(() => {
      sceneManager.set_frame(sceneManager.time);
      isAnimating = false;
    });
  }
}, { passive: false });


// Sélection de l'élément de la boîte
const mouseBox = document.getElementById('mouse-box');

// Écoute de l'événement de mouvement de la souris
document.addEventListener('mousemove', (event) => {
  // Met à jour la position de la boîte
  mouseBox.style.left = `${event.pageX + 10}px`; // Décalage pour ne pas être sous le curseur
  mouseBox.style.top = `${event.pageY + 10}px`;

  // Met à jour le texte de la boîte avec les coordonnées
  mouseBox.textContent = `X: ${event.pageX}, Y: ${event.pageY}`;
});