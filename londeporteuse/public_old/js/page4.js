const page4ContainerId = "page4-slide";

// Mettre à jour dynamiquement le chemin de l'image et le contenu des conséquences
const updatePage4Content = () => {
  // Récupérer l'élément image et son conteneur de conséquences
  const imageElements = document.querySelectorAll(`#${page4ContainerId} .options-grid img`);
  const consequencesElement = document.querySelector(`#${page4ContainerId} .consequences`);

  // Supposons que le résultat de la sélection de la page2 soit stocké dans sessionStorage
  const userSelections = JSON.parse(sessionStorage.getItem("page2Selections")) || [];
  const consequencesContent = JSON.parse(sessionStorage.getItem("page2Consequences")) || [];

  // Définition des données par défaut
  const defaultImages = [
    "img/image1.png",
    "img/image1.png",
    "img/image1.png",
    "img/image1.png"
  ];
  const defaultConsequences = "Veuillez faire un choix dans la page précédente pour afficher les conséquences.";

  // Mettre à jour le chemin de l'image
  imageElements.forEach((img, index) => {
    img.src = userSelections[index] || defaultImages[index];
  });

  // Mettre à jour le contenu des conséquences
  consequencesElement.textContent = consequencesContent.join(" ") || defaultConsequences;
};

// Exécuté une fois le chargement du DOM terminé
document.addEventListener("DOMContentLoaded", updatePage4Content);
