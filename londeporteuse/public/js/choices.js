document.addEventListener("DOMContentLoaded", function () {
  let texteNarratif = [
      "SALUT! JE SUIS LÀ POUR TE",
      "GUIDER LORS DE LA CREATION",
      "DE TON FESTIVAL",
      "A TOI DE FAIRE DES CHOIX POUR",
      "CRÉER UN FESTIVAL IDÉAL"
  ];

  let svgElement = document.getElementById("perso-svg");
  let bubbleText = document.createElementNS("http://www.w3.org/2000/svg", "text");

  // Ajustements pour le placement
  let textX = 650; // Décalé vers la droite
  let textY = 110; // Ajuste la hauteur

  bubbleText.setAttribute("x", textX);
  bubbleText.setAttribute("y", textY);
  bubbleText.setAttribute("text-anchor", "middle");
  bubbleText.setAttribute("font-size", "32"); // Taille du texte augmentée
  bubbleText.setAttribute("fill", "black");
  bubbleText.setAttribute("font-weight", "bold"); // Texte en gras

  // Ajouter les lignes avec des sauts plus espacés
  texteNarratif.forEach((line, index) => {
      let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttribute("x", textX);
      tspan.setAttribute("dy", index === 0 ? "0" : "50"); // Augmenté à 28px
      tspan.textContent = line;
      bubbleText.appendChild(tspan);
  });

  svgElement.appendChild(bubbleText);
});


document.addEventListener("DOMContentLoaded", function () {
  let texteNarratif = [
      "BRAVO? TU AS CRÉÉ TON FESTIVAL",
      "IDÉAL ! MAINTENANT?",
      "COMMENT VAS-TU LE FINANCER ?"
  ];

  let svgElement = document.getElementById("perso-svg-5");
  let bubbleText = document.createElementNS("http://www.w3.org/2000/svg", "text");

  // Ajustements pour le placement
  let textX = 650; // Décalé vers la droite
  let textY = 170; // Ajuste la hauteur

  bubbleText.setAttribute("x", textX);
  bubbleText.setAttribute("y", textY);
  bubbleText.setAttribute("text-anchor", "middle");
  bubbleText.setAttribute("font-size", "32"); // Taille du texte augmentée
  bubbleText.setAttribute("fill", "black");
  bubbleText.setAttribute("font-weight", "bold"); // Texte en gras

  // Ajouter les lignes avec des sauts plus espacés
  texteNarratif.forEach((line, index) => {
      let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttribute("x", textX);
      tspan.setAttribute("dy", index === 0 ? "0" : "50"); // Augmenté à 28px
      tspan.textContent = line;
      bubbleText.appendChild(tspan);
  });

  svgElement.appendChild(bubbleText);
});


document.addEventListener("DOMContentLoaded", function () {
  let texteNarratif = [
      "CETTE ANNÉE LA SUBVENTION DE",
      "LA RÉGION PAYS DE LA LOIRE",
      "A ÉTÉ SUPPRIMÉE.",
      "A TOI D'AJUSTER TON BUDGET EN TE",
      "PASSANT DE CETTE SUBVENTION"
  ];

  let svgElement = document.getElementById("perso-svg-2");
  let bubbleText = document.createElementNS("http://www.w3.org/2000/svg", "text");

  // Ajustements pour le placement
  let textX = 650; // Décalé vers la droite
  let textY = 110; // Ajuste la hauteur

  bubbleText.setAttribute("x", textX);
  bubbleText.setAttribute("y", textY);
  bubbleText.setAttribute("text-anchor", "middle");
  bubbleText.setAttribute("font-size", "32"); // Taille du texte augmentée
  bubbleText.setAttribute("fill", "black");
  bubbleText.setAttribute("font-weight", "bold"); // Texte en gras

  // Ajouter les lignes avec des sauts plus espacés
  texteNarratif.forEach((line, index) => {
      let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttribute("x", textX);
      tspan.setAttribute("dy", index === 0 ? "0" : "50"); // Augmenté à 28px
      tspan.textContent = line;
      bubbleText.appendChild(tspan);
  });

  svgElement.appendChild(bubbleText);
});


document.addEventListener("DOMContentLoaded", () => {
    // Charger les données JSON
    fetch("data/PAGE3.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON.");
        }
        return response.json();
      })
      .then(data => {
        const modal = document.getElementById("modal");
        const modalDescription = document.getElementById("modal-description");
        const closeBtn = document.querySelector(".close");
  
        // Cliquez sur le bouton Fermer pour masquer la fenêtre modale
        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
  
        // Cliquez en dehors de la zone modale pour fermer la fenêtre
        window.addEventListener("click", event => {
          if (event.target === modal) {
            modal.style.display = "none";
          }
        });
  
        // Ajouter des écouteurs d'événements pour tous les boutons
        document.querySelectorAll(".btn-info").forEach((button, index) => {
          button.addEventListener("click", () => {
            const sections = [
              data.festivalSizes,
              data.culturalMediationActions,
              data.ecologicalActions,
              data.riskPreventionActions
            ];
  
            let item = null;
            let counter = 0;
  
            for (let section of sections) {
              if (index >= counter && index < counter + section.length) {
                item = section[index - counter];
                break;
              }
              counter += section.length;
            }
  
            if (item) {
              modalDescription.textContent = item.description; // Mettre à jour le contenu modal
              modal.style.display = "block"; //Afficher la fenêtre modale
            } else {
              console.error("Aucune donnée trouvée pour ce bouton.");
            }
          });
        });
      })
      .catch(error => {
        console.error("Erreur:", error);
      });
  });
document.addEventListener("DOMContentLoaded", () => {
    // Charger les données JSON
    fetch("data/PAGE3.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON.");
        }
        return response.json();
      })
      .then(data => {
        const modal = document.getElementById("modal");
        const modalDescription = document.getElementById("modal-description");
        const closeBtn = document.querySelector(".close");
  
        // Cliquez sur le bouton Fermer pour masquer la fenêtre modale
        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
  
        // Cliquez en dehors de la zone modale pour fermer la fenêtre
        window.addEventListener("click", event => {
          if (event.target === modal) {
            modal.style.display = "none";
          }
        });
  
        // Ajouter des écouteurs d'événements pour tous les boutons
        document.querySelectorAll(".btn-info").forEach((button, index) => {
          button.addEventListener("click", () => {
            const sections = [
              data.festivalSizes,
              data.culturalMediationActions,
              data.ecologicalActions,
              data.riskPreventionActions
            ];
  
            let item = null;
            let counter = 0;
  
            for (let section of sections) {
              if (index >= counter && index < counter + section.length) {
                item = section[index - counter];
                break;
              }
              counter += section.length;
            }
  
            if (item) {
              modalDescription.textContent = item.description; // Mettre à jour le contenu modal
              modal.style.display = "block"; //Afficher la fenêtre modale
            } else {
              console.error("Aucune donnée trouvée pour ce bouton.");
            }
          });
        });
      })
      .catch(error => {
        console.error("Erreur:", error);
      });
  });
  document.addEventListener("DOMContentLoaded", () => {
    // Charger les données JSON
    fetch("data/PAGE3.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON.");
        }
        return response.json();
      })
      .then(data => {
        const sections = [
          data.festivalSizes,
          data.culturalMediationActions,
          data.ecologicalActions,
          data.riskPreventionActions
        ];
  
        // Ajouter des écouteurs d'événements pour toutes les images dans .choice-item
        document.querySelectorAll(".choice-item").forEach((choiceItem, index) => {
          choiceItem.addEventListener("click", () => {
            let item = null;
            let counter = 0;
  
            // Identifier la section et le bon élément dans cette section
            for (let section of sections) {
              if (index >= counter && index < counter + section.length) {
                item = section[index - counter];
                // Mettre à jour isSelected : true pour l'élément cliqué, false pour les autres
                section.forEach((option, i) => {
                  option.isSelected = i === (index - counter);
                });
                break;
              }
              counter += section.length;
            }
  
            if (item) {
              console.log("Élément sélectionné :", item); // Vérification dans la console
              console.log("Données mises à jour :", sections); // Vérification des sections mises à jour
            } else {
              console.error("Aucune donnée trouvée pour cet élément.");
            }
  
            // Ajouter un style visuel pour montrer l'élément sélectionné
            const parentSection = choiceItem.closest(".choice-group");
            if (parentSection) {
              parentSection.querySelectorAll(".choice-item").forEach((item, i) => {
                if (i === (index - counter)) {
                  item.classList.add("selected");
                } else {
                  item.classList.remove("selected");
                }
              });
            }
          });
        });
      })
      .catch(error => {
        console.error("Erreur:", error);
      });
  });