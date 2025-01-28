document.addEventListener("DOMContentLoaded", () => {
    // Charger les données JSON
    fetch("./data/choix3.json")
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
              data.mediationActions,
              data.ecologicalActions,
              data.riskPreventionActions,
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
    fetch("./data/choix3.json")
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
              data.mediationActions,
              data.ecologicalActions,
              data.riskPreventionActions,
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
    fetch("./data/choix3.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier JSON.");
        }
        return response.json();
      })
      .then(data => {
        const sections = [
          data.festivalSizes,
          data.mediationActions,
          data.ecologicalActions,
          data.riskPreventionActions,
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