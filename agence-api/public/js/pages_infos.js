//première idée d'affichage de la page d'explication --> Contexte d'ouverture à adapter
function displayExplanation(data, liste_choix, contenu_message) {
    const num_question = liste_choix.length + 1;
    setTimeout(() => {
        const reply = { text: contenu_message, type: 'received', id:`info_${num_question}`, choix: liste_choix}; //id à adapter selon le parametrage du JSON
        addMessage(reply);
        enableClickForExpansion(reply.text, data);
  
        // Agrandissement automatique 1 seconde après apparition
        setTimeout(() => {
            const lastMessage = document.querySelector(`#${reply.id}`);
            expandMessage(lastMessage, data);
        }, 1000);
    }, 1000);
  };

// Fonction pour permettre l'agrandissement manuel
function enableClickForExpansion(text, data) {
    const messages = document.querySelectorAll('.message.received');
    messages.forEach(msg => {
        if (msg.textContent === text) {
            msg.addEventListener('click', () => {
                expandMessage(msg, data);
            });
        }
    });
};

// Fonction pour agrandir le message et afficher l'image
function expandMessage(messageElement, data) {
    const rect = messageElement.getBoundingClientRect();

    // Récupération de la liste des choix sur la balise HTML
    let liste_choix = [];
    for (let i = 0; i < messageElement.dataset.taillechoix; i++) {
        liste_choix.push(messageElement.dataset[`choix${i}`]);
    }
    console.log("depuis expand message, liste_choix :", liste_choix);
    //Ajout des données du JSON dans des listes respectives
    const fields = ['titre', 'images', 'paragraphes'];

    const { titre, images, paragraphes } = repartitionChamps(fields, data, liste_choix);

    const title = document.createElement('h1');
    title.textContent = titre;
    expandingElement.appendChild(title);

    images.forEach(image => {
        const img = document.createElement('p');
        img.src = image;
        expandingElement.appendChild(img);
    });

    paragraphes.forEach(paragraphe => {
        const text = document.createElement('p');
        text.textContent = paragraphe;
        expandingElement.appendChild(text);
    });

    expandingElement.querySelectorAll('*').forEach(element => element.style.display = 'none');
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

    setTimeout(() => {
        expandingElement.style.top = '0';
        expandingElement.style.left = '0';
        expandingElement.style.width = '100vw';
        expandingElement.style.height = '100vh';

    }, 100);
};

// Fonction pour fermer l'overlay et réduire vers le message
function closeOverlay() {
    const lastMessage = document.querySelectorAll('.message.received');
    // --> La séléection du message sur lequel fermer est à adapter selon tag des balises HTML ?
    // Pour l'instant la fermeture est définie statiquement dans le HTML
    // Faire un inner.html clear

    //expandingElement.querySelectorAll('*').forEach(element => element.style.display = 'none');
    expandingElement.innerHTML = '';
    if (lastMessage.length > 0) {
        const rect = lastMessage[lastMessage.length - 1].getBoundingClientRect();

        expandingElement.style.top = rect.top + 'px';
        expandingElement.style.left = rect.left + 'px';
        expandingElement.style.width = lastMessage[lastMessage.length - 1].offsetWidth + 'px';
        expandingElement.style.height = lastMessage[lastMessage.length - 1].offsetHeight + 'px';
    }

    setTimeout(() => {
        expandingElement.style.display = 'none';
    }, 500);
};

// Fonction pour répartir les champs du JSON dans des listes respectives
function repartitionChamps(fields, data, liste_choix){
    let result = {titre: "", images: [], paragraphes: []};
    fields.forEach(field => {
        switch (detectType(data[field])){
            case "array":
                result[field] = data[field];
                break;
            case "string":
                result[field] = data[field];
                break;
            case "dico":
                result[field] = match(data[field], liste_choix);
                break;
        }
    });
    return result  
};

// Fonction pour trouver le bon paramètre dans le JSON
function match(data, liste_choix) {
    if (data.length == 0){
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
    } else if (typeof element === 'object' && element !== null && !Array.isArray(element)){
        return "dico";
    } else{
        return "other";
    }
}