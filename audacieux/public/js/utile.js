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



function colorizeAllImages(selector) {
    const images = document.querySelectorAll(selector);

    if (images.length === 0) {
        console.error("Aucune image correspondante trouvée pour le sélecteur :", selector);
        return;
    }

    images.forEach(image => {
        colorizeImage(image);
    });
}

function colorizeImage(imageElement) {
    if (!imageElement) {
        console.error("Aucun élément d'image fourni.");
        return;
    }

    let isClicked = false;

    imageElement.addEventListener("click", () => {
        imageElement.style.filter = "none";
        isClicked = true;
    });

    imageElement.addEventListener("mouseover", () => {
        if (!isClicked) {
            imageElement.style.filter = "none";
        }
    });

    imageElement.addEventListener("mouseout", () => {
        if (!isClicked) {
            imageElement.style.filter = "grayscale(100%)";
        }
    });
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
function createPopup(idTarget, options) {
    let state = 0;
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
    closeButton.id = "closeButton";
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
        //backgroundColor: "rgba(0, 0, 0, 0.5)", // Couleur de fond semi-transparente
        display: "none", // Commence caché
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
        //backgroundColor: "#ffffff",
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "White",
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
    document.getElementById(idTarget).addEventListener("click", () => {
        if (state === 0) {
            popupOverlay.style.display = "flex"; // Affiche le popup
            state = 1; // Passe l'état à actif
        } else {
            popupOverlay.style.display = "none"; // Cache le popup
            state = 0; // Réinitialise l'état
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

function createPopupTuto(closeDiv,options) {
    const {
        title = "Popup Title",
        message = "This is a message",
        width = "300px",
        height = "200px",
        backgroundImage = "",
        customStyles = {},
        onClose = () => {},
        closeOnScroll = false,
        closeOnClick = false,
    } = options;

    // Créer les éléments du popup
    const popupOverlay = document.createElement("div");
    popupOverlay.id= "all";
    const popupContainer = document.createElement("div");
    const popupTitle = document.createElement("h2");
    const popupMessage = document.createElement("p");
    const closeButton = document.createElement("button");
    const popupTriangle = document.createElement("div"); // Pointe triangulaire

    // Ajouter les classes pour le style
    popupOverlay.className = "popup-overlay";
    popupContainer.className = "popup-container";

    // Ajouter le contenu
    popupTitle.textContent = title;
    popupMessage.innerHTML = message;

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
        backgroundColor: "#ffffff",
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "black",
        padding: "20px",
        borderRadius: "10px",
        //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: width,
        height: height,
        textAlign: "center",
        position: "relative",
        ...customStyles.container,
    });

    // Ajouter les événements


    if (closeDiv) {
        document.getElementById(closeDiv).addEventListener("click", () => {
            if (document.body.contains(popupOverlay)) {
                document.body.removeChild(popupOverlay);
                onClose();
            }
        });
    }

    if (closeOnScroll){
        window.addEventListener("wheel", () => {
        if (document.body.contains(popupOverlay)) {
            document.body.removeChild(popupOverlay);
            onClose();
        }
    });
    }

    if (closeOnClick){
        window.addEventListener("click", () => {
            if (document.body.contains(popupOverlay)) {
                document.body.removeChild(popupOverlay);
                onClose();
            }
        });
    }
    


    // Assembler les éléments
    popupContainer.appendChild(popupTitle);
    popupContainer.appendChild(popupMessage); 
    popupOverlay.appendChild(popupContainer);

    // Ajouter le popup au DOM
    document.body.appendChild(popupOverlay);

    return popupMessage;
}

function waitForClick(targetElement) {
    return new Promise((resolve) => {
        document.getElementById(targetElement).addEventListener("click", () => {
            console.log("Clic détecté !");
            resolve(); // Le clic a été détecté
        }, { once: true }); // L'événement est écouté une seule fois
    });
}




// Exemple d'utilisation
/*document.getElementById("popup").addEventListener("click", () => {
    createPopup({
        title: "Bienvenue",
        message: "Ceci est une jolie bulle de texte créée en CSS !",
        buttonText: "Fermer",
        width: "300px",
        height: "auto",
        customStyles: {
            container: {
                backgroundColor: "#ffffff",
                borderRadius: "30px",
                color: "black",
                transform: "scale(2)",  //Augmente la taille de 1.5x, ajustez cette valeur selon vos besoins 
                transformOrigin: "center center",
                
            },
            triangle: {
                left: "10%", // Pointe centrée horizontalement
                //transform: "translateX(-50%)", // Ajustement du centrage
            },

            closeButtonWrapper: {
                // Appliquez un wrapper autour du bouton pour éviter qu'il soit transformé 
                position: "relative",  // Assurez-vous que le wrapper soit positionné correctement
                zIndex: "100"
            },

            closeButton: {
                visibility: "hidden",
            },
        },
    });
});

document.getElementById("liste de course").addEventListener("click", () => {
    const player = new Player(2000, [
        new Item("Éponges", 500),
        new Item("Gants en latex", 300),
        new Item("Boite de Pringles", 200)
    ]);

    const popupMessage = createPopup({
        title: "Liste de course",
        message: player.generateShoppingListHTML(),
        buttonText: "Fermer",
        width: "300px", // Augmente la taille de l'image
        height: "auto", // Augmente la taille de l'image
        backgroundImage : "img/postit.webp",
        
        customStyles: {
            container :{
                position: "relative",
                width: "300px", // Taille ajustable
                height: "auto", // Taille ajustable
                textAlign: "center",
                backgroundImage: "url('img/postit.webp')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                boxSizing: "border-box",
                borderRadius: "8px",
                color: "black"
            },
            triangle: {
                visibility: "hidden",
            },
            closeButton: {
                visibility: "hidden",
            },

        },

    });

    // Simule un achat
    setTimeout(() => {
        player.buyObject(player.shopping_list[0]);
        popupMessage.innerHTML = player.generateShoppingListHTML();
    }, 2000);

    setTimeout(() => {
        player.buyObject(player.shopping_list[1]);
        popupMessage.innerHTML = player.generateShoppingListHTML();
    }, 6000);
});



document.addEventListener("DOMContentLoaded", () => {
    colorizeAllImages(".interactive-image");
});

*/