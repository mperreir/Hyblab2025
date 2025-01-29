//première idée d'affichage de la page d'explication --> Contexte d'ouverture à adapter
async function displayExplanation(data, liste_choix, contenu_message) {
    const num_question = liste_choix.length + 1;
    const reply = { text: contenu_message.text, img: contenu_message.image, type: 'received', id: `info_${num_question}`, class: 'info', choix: liste_choix }; // id à adapter selon le parametrage du JSON
    addMessage(reply, 'info');
    enableClickForExpansion(reply.text, data);

    await waitForUserTouch();
    const lastMessage = document.querySelector(`#${reply.id}`);
    expandMessage(lastMessage, data);
}

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
        if (!imgexist) {
            expandingElement.appendChild(image_container);
            imgexist = true;
        }
    });

    let paragraphes_container = document.createElement('div');
    let paragraphes_exist = false;

    if (paragraphes.length > 0) {
        switch (detectType(paragraphes[0])) {
            case "string":
                paragraphes.forEach(paragraphe => {
                    const text = document.createElement('p');
                    text.textContent = paragraphe;
                    paragraphes_container.appendChild(text);
                    if (!paragraphes_exist) {
                        expandingElement.appendChild(paragraphes_container);
                        paragraphes_exist = true;
                    }
                });
                paragraphes_container.classList.add('paragraphes-container');
                break;
            case "dico":
                const liste = document.createElement('ul');
                liste.classList.add('liste-rse');
                paragraphes.forEach(paragraphe => {
                    const item = document.createElement('li');
                    item.classList.add('item-rse');

                    //nombre d'entreprises
                    const nombre = document.createElement('p');
                    nombre.classList.add('nombre-entreprises');
                    nombre.textContent = paragraphe.nb_entreprises;
                    item.appendChild(nombre);

                    //nom du label
                    const label = document.createElement('h2');
                    label.textContent = paragraphe.nom_label;
                    item.appendChild(label);

                    //Paragraphe de présentation
                    const description_container = document.createElement('div');
                    description_container.style.display = 'none';
                    description_container.classList.add('expand-hidden');

                    paragraphe.description.forEach(phrase => {
                        const text = document.createElement('p');
                        text.textContent = phrase;
                        description_container.appendChild(text);
                    });

                    //Bouton de développement paragraphes
                    const button = document.createElement('button');
                    button.textContent = '+';
                    button.classList.add('button-rse-expand');

                    item.appendChild(button);
                    item.appendChild(description_container);

                    button.addEventListener('click', function () {
                        event.stopPropagation();
                        if (description_container.style.display === 'none') {
                            console.log('display flex');
                            description_container.style.display = 'flex';
                            button.textContent = '-';
                        } else {
                            description_container.style.display = 'none';
                            button.textContent = '+';
                        }
                    });


                    liste.appendChild(item);
                });
                paragraphes_container.appendChild(liste);
                paragraphes_container.classList.add('liste-rse-container');
                expandingElement.appendChild(paragraphes_container);
        }
    }
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
        expandingElement.querySelectorAll('*').forEach(element => {
            if (!element.classList.contains('expand-hidden')) {
                element.style.display = 'flex';
            }
        });
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
function repartitionChamps(fields, data, liste_choix) {
    let result = { titre: "", images: [], paragraphes: [] };
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