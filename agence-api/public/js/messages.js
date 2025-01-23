"use strict";

// const initSlide2 = async function () {

//     const chatBox = document.getElementById('chatBox');
//     const messageList = document.getElementById('messageList');

// document.onload = function() {
//     const messageInput = document.getElementById('messageInput');

//     messageInput.addEventListener('keydown', event => {
//         if (event.key === 'Enter') {
//             sendMessage();
//         }
//     });

//     messageSendButton.addEventListener('click', sendMessage);
// };
//     scrollToBottom();
// };

// Fonction pour envoyer un message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    const newMessage = { text: messageText, type: 'sent', timestamp: new Date().toISOString() };

    addMessage(newMessage);
    scrollToBottom();

    messageInput.value = '';
};

//première idée d'affichage de la page d'explication --> Contexte d'ouverture à adapter
function displayExplanation(elemJSON) {
    setTimeout(() => {
        const reply = { text: elemJSON.titre, type: 'received', id: 'explanation' }; //id à adapter selon le parametrage du JSON
        addMessage(reply);
        //storeMessage(reply);
        enableClickForExpansion(reply.text);

        // Agrandissement automatique 1 seconde après apparition
        setTimeout(() => {
            const lastMessage = document.querySelector(`#${reply.id}`);
            expandMessage(lastMessage);
        }, 1000);
    }, 1000);
};

// Fonction pour ajouter un message dans la liste
function addMessage(message) {
    const messageElement = document.createElement('li');
    messageElement.classList.add('message', message.type);
    messageElement.textContent = message.text;
    messageElement.id = message.id;
    messageList.appendChild(messageElement);
    scrollToBottom();
};

// // Fonction pour effacer l'historique des messages (optionnelle)
// function clearChatHistory(MESSAGES_KEY) {
//     localStorage.removeItem(MESSAGES_KEY);
//     messageList.innerHTML = '';  // Effacer les messages de l'interface
// };

// Fonction pour défiler vers le bas automatiquement
function scrollToBottom() {
    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);  // Délai pour s'assurer que le DOM est mis à jour
};

// Fonction pour permettre l'agrandissement manuel
function enableClickForExpansion(text) {
    const messages = document.querySelectorAll('.message.received');
    messages.forEach(msg => {
        if (msg.textContent === text) {
            msg.addEventListener('click', () => {
                expandMessage(msg);
            });
        }
    });
};

// Fonction pour agrandir le message et afficher l'image
function expandMessage(messageElement) {
    const rect = messageElement.getBoundingClientRect();
    expandingElement.querySelectorAll('*').forEach(element => element.style.display = 'none');
    //Paramétrer ici l'ajout de contnenu selon les tags de la balise passée en paramètre

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

    expandingElement.querySelectorAll('*').forEach(element => element.style.display = 'none');
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

