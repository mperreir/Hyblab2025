"use strict";


// Fonction pour envoyer un message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    const newMessage = { text: messageText, type: 'sent', timestamp: new Date().toISOString() };

    addMessage(newMessage);
    scrollToBottom();

    messageInput.value = '';
};

// Fonction pour ajouter un message dans la liste
function addMessage(message) {
    const messageElement = document.createElement('li');
    messageElement.classList.add('message', message.type);
    messageElement.textContent = message.text;
    messageElement.id = message.id;
    messageList.appendChild(messageElement);

    if(message.choix){
        messageElement.dataset.choix = message.choix;
    }
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


