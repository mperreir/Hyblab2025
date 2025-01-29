//Fonction de création d'un message permettant d'être agrandi pour afficher de l'information
async function displayExplanation(data, liste_choix, contenu_message) {
    const num_question = liste_choix.length + 1;
    const reply = { text: contenu_message, type: 'received', id: `info_${num_question}`, class: 'info', choix: liste_choix }; // id à adapter selon le parametrage du JSON
    
    //Création de l'élément message et récupération de l'élément HTML
    addMessage(reply, 'info');
    const lastMessage = document.querySelector(`#${reply.id}`);
    
    // Capture de l'événement de clic, peu importe l'élément cliqué -> A modifier pour éviter de capurer le clic menu 
    await waitForUserTouchAnything();

    //Au clic, afficher l'information
    expandMessage(lastMessage, data);
    await waitForUserTouch();
    
    //Enfin, ajout de l'event listener pour permettre la réouverture de la page info
    lastMessage.addEventListener('click', () => {
        expandMessage(lastMessage, data);
    });
};

// Fonction pour agrandir le message et afficher l'image
function expandMessage(messageElement, data) {
    expandingElement.innerHTML = '';
    toggleTapIconDisplay(true);

    const rect = messageElement.getBoundingClientRect();
    expandingElement.dataset.id_message = messageElement.id;

    // Récupération de la liste des choix sur la balise HTML
    let liste_choix = [];
    for (let i = 0; i < messageElement.dataset.taillechoix; i++) {
        liste_choix.push(messageElement.dataset[`choix${i}`]);
    }
    //Ajout des données du JSON dans des listes respectives
    const fields = ['titre', 'images', 'paragraphes'];

    const { titre, images, paragraphes } = repartitionChamps(fields, data, liste_choix);

    const title = document.createElement('h1');
    title.textContent = titre;
    expandingElement.appendChild(title);

    let image_container = document.createElement('div');
    image_container.classList.add('image-container');
    let imgexist = false;
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        image_container.appendChild(img);
        if (!imgexist){
            expandingElement.appendChild(image_container);
            imgexist = true;
        }
    });

    let paragraphes_container = document.createElement('div');
    paragraphes_container.classList.add('paragraphes-container');
    let paragraphes_exist = false;
    paragraphes.forEach(paragraphe => {
        const text = document.createElement('p');
        text.textContent = paragraphe;
        paragraphes_container.appendChild(text);
        if (!paragraphes_exist){
            expandingElement.appendChild(paragraphes_container);
            paragraphes_exist = true;
        }
    });

    expandingElement.querySelectorAll('*').forEach(element => {
        element.style.display = 'none';
        element.classList.add('expanding-element');
    });
    expandingElement.style.display = 'flex';
    expandingElement.style.top = rect.top + 'px';
    expandingElement.style.left = rect.left + 'px';
    expandingElement.style.width = messageElement.offsetWidth + 'px';
    expandingElement.style.height = messageElement.offsetHeight + 'px';

    // Ajouter un écouteur d'événement pour afficher le contenu une fois la transition terminée
    expandingElement.addEventListener('transitionend', function onTransitionEnd() {
        expandingElement.querySelectorAll('*').forEach(element => element.style.display = 'flex');
        expandingElement.removeEventListener('transitionend', onTransitionEnd);  // Nettoyer l'événement
    });

    document.getElementById('chatBox').appendChild(expandingElement);

    setTimeout(() => {
        expandingElement.style.top = '0';
        expandingElement.style.left = '0';
        expandingElement.style.width = '100vw';
        expandingElement.style.height = '100vh';

    }, 100);
};

// Fonction pour fermer l'overlay et réduire vers le message
function closeOverlay() {
    const id_message = expandingElement.dataset.id_message;
    toggleTapIconDisplay(false);
    const lastMessage = document.getElementById(id_message);

    //expandingElement.querySelectorAll('*').forEach(element => element.style.display = 'none');
    expandingElement.innerHTML = '';
    if (lastMessage) {
        const rect = lastMessage.getBoundingClientRect();

        expandingElement.style.top = rect.top + 'px';
        expandingElement.style.left = rect.left + 'px';
        expandingElement.style.width = lastMessage.offsetWidth + 'px';
        expandingElement.style.height = lastMessage.offsetHeight + 'px';
    }

    setTimeout(() => {
        expandingElement.style.display = 'none';
        // Réinitialiser les styles après la fermeture
        expandingElement.style.top = '';
        expandingElement.style.left = '';
        expandingElement.style.width = '';
        expandingElement.style.height = '';
    }, 500);
};

// Fonction pour répartir les champs du JSON dans des listes respectives
function repartitionChamps(fields, data, liste_choix){
    let result = {titre: "", images: [], paragraphes: []};
    fields.forEach(field => {
        switch (detectType(data[field])) {
            case "array":
                result[field] = data[field];
                break;
            case "string":
                if (field !== "titre") {
                    console.error("Le champ " + field + " n'est pas un tableau");
                    break;
                }
                result[field] = data[field];
                break;
            case "dico":
                result[field] = match(data[field], liste_choix);
                break;
        }
    });
    return result;
};

// Fonction pour trouver le bon paramètre dans le JSON
function match(data, liste_choix) {
    if (data.length == 0) {
        return [];
    }
    const num_question = parseInt(Object.keys(data)[0].split('_')[0], 10);
    return data[String(liste_choix[num_question - 1])];
};

// Fonction pour détecter le type de l'élément
function detectType(element) {
    if (Array.isArray(element)) {
        return "array";
    } else if (typeof element === 'string') {
        return "string";
    } else if (typeof element === 'object' && element !== null && !Array.isArray(element)) {
        return "dico";
    } else {
        return "other";
    }
}

// Fonction pour attendre que l'utilisateur touche n'importe quoi
async function waitForUserTouchAnything() {
    return new Promise(resolve => {
        const handleTouch = (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            document.removeEventListener('click', handleTouch, true);
            resolve();
        };
        document.addEventListener('click', handleTouch, true);
    });
}
