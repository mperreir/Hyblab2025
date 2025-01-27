class Item {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.isBuy = false;
    }
}

class Player {
    constructor(monney = 0, shopping_list = []) {
        this.monney = monney;
        this.shopping_list = shopping_list;
    }

    withdrawMonney(amount) {
        if (amount > 0) {
            this.monney += amount;
        } else console.error("Montant invalide");
    }

    buyObject(obj) {
        if (obj.value > this.monney) {
            console.error("Solde insuffisant");
        } else {
            this.monney -= obj.value;
            obj.isBuy = true; // Marque l'objet comme acheté
        }
    }

    displayInventory() {
        console.log("Argent restant: " + this.monney);
        console.log("Liste de courses: ");
        this.shopping_list.forEach(obj => console.log("- " + obj.name + ", " + obj.isBuy));
    }

    // Génère la liste HTML avec les styles en fonction de l'état des objets
    generateShoppingListHTML() {
        return `
            <ul style="text-align: left; padding: 0; list-style: inside;">
                ${this.shopping_list
                    .map(
                        item =>
                            `<li style="text-decoration: ${
                                item.isBuy ? "line-through" : "none"
                            };">${item.name}</li>`
                    )
                    .join("")}
            </ul>
        `;
    }
}



/*
 * Crée un popup personnalisé avec une pointe triangulaire.
 * @param {Object} options - Options pour personnaliser le popup.
 * @param {string} options.title - Le titre du popup.
 * @param {string} options.message - Le message du popup.
 * @param {string} options.buttonText - Le texte du bouton de fermeture.
 * @param {string} options.width - Largeur du popup (par exemple, "300px").
 * @param {string} options.height - Hauteur du popup (par exemple, "200px").
 * @param {Object} options.customStyles - Styles CSS supplémentaires pour personnaliser le popup.
 * @param {function} options.onClose - Fonction appelée lorsque le popup est fermé.
 */
function createPopup(options) {
    const {
        title = "Popup Title",
        message = "This is a message",
        buttonText = "Close",
        width = "300px",
        height = "200px",
        backgroundImage = "",
        customStyles = {},
        onClose = () => {},
    } = options;

    // Créer les éléments du popup
    const popupOverlay = document.createElement("div");
    const popupContainer = document.createElement("div");
    const popupTitle = document.createElement("h2");
    const popupMessage = document.createElement("p");
    const closeButton = document.createElement("button");
    const popupTriangle = document.createElement("div"); // Pointe triangulaire

    // Ajouter les classes pour le style
    popupOverlay.className = "popup-overlay";
    popupContainer.className = "popup-container";
    closeButton.className = "popup-close-button";
    popupTriangle.className = "popup-triangle";

    // Ajouter le contenu
    popupTitle.textContent = title;
    popupMessage.innerHTML = message;
    closeButton.textContent = buttonText;

    // Appliquer les styles de base
    Object.assign(popupOverlay.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        //backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        ...customStyles.Overlay,
    });

    Object.assign(popupContainer.style, {
        position: "relative",
        width: width, // Taille ajustable
        height: height, // Taille ajustable
        textAlign: "center",
        //backgroundColor: "#007BFF",
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: width,
        height: height,
        textAlign: "center",
        position: "relative",
        ...customStyles.container,
    });

    Object.assign(popupTriangle.style, {
        content: "''",
        position: "absolute",
        bottom: "-20px", // Position sous la bulle
        left: "30px", // Ajustez pour centrer ou déplacer la pointe
        width: "0",
        height: "0",
        borderWidth: "20px 20px 0 20px", // Taille de la pointe
        borderStyle: "solid",
        borderColor: "#ffffff transparent transparent transparent",
        ...customStyles.triangle,
    });

    Object.assign(closeButton.style, {
        marginTop: "20px",
        padding: "10px 20px",
        border: "none",
        backgroundColor: "red",
        color: "white",
        borderRadius: "4px",
        cursor: "pointer",
        ...customStyles.closeButton,
    });

    // Ajouter les événements
    closeButton.addEventListener("click", () => {
        document.body.removeChild(popupOverlay);
        onClose();
    });
    popupOverlay.addEventListener("click", (e) => {
        // Si on clique à l'extérieur du popupContainer (c'est-à-dire sur l'overlay)
        if (e.target === popupOverlay) {
            document.body.removeChild(popupOverlay);
            onClose(); // Appeler la fonction onClose si définie
        }
    });

    // Assembler les éléments
    popupContainer.appendChild(popupTitle);
    popupContainer.appendChild(popupMessage);
    popupContainer.appendChild(closeButton);
    popupContainer.appendChild(popupTriangle); // Ajouter la pointe
    popupOverlay.appendChild(popupContainer);

    // Ajouter le popup au DOM
    document.body.appendChild(popupOverlay);

    return popupMessage;
}
