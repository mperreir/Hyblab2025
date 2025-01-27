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
              data.ecologicalActions,
              data.culturalMediationActions,
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
  