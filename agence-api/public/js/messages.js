"use strict";

const initSlide2 = async function () {

    const chatBox = document.getElementById('chatBox');
    const messageList = document.getElementById('messageList');
    const messageInput = document.getElementById('messageInput');

    messageInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    const MESSAGES_KEY = 'chatMessages';

    // Charger les messages stockés au démarrage
    window.onload = () => {
        loadStoredMessages();
        scrollToBottom();
    };
};

// Fonction pour envoyer un message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    if (messageText === 'clear') {
        clearChatHistory();
        messageInput.value = '';
        return;
    }

    const newMessage = { text: messageText, type: 'sent', timestamp: new Date().toISOString() };

    addMessage(newMessage);
    storeMessage(newMessage);
    scrollToBottom();

    // Simuler une réponse après 1 seconde
    setTimeout(() => {
        const reply = { text: 'Réponse automatique', type: 'received', timestamp: new Date().toISOString() };
        addMessage(reply);
        storeMessage(reply);
        scrollToBottom();
    }, 1000);

    messageInput.value = '';
};

// Fonction pour sauvegarder un message dans le localStorage
function storeMessage(message) {
    let messages = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];
    messages.push(message);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

// Fonction pour charger les messages stockés
function loadStoredMessages() {
    let messages = JSON.parse(localStorage.getItem(MESSAGES_KEY)) || [];

    messages.forEach(message => {
        addMessage(message);
    });
}

// Fonction pour ajouter un message dans la liste
function addMessage(message) {
    const messageElement = document.createElement('li');
    messageElement.classList.add('message', message.type);
    messageElement.textContent = message.text;
    messageList.appendChild(messageElement);
};

// Fonction pour effacer l'historique des messages (optionnelle)
function clearChatHistory() {
    localStorage.removeItem(MESSAGES_KEY);
    messageList.innerHTML = '';  // Effacer les messages de l'interface
};

// Fonction pour défiler vers le bas automatiquement
function scrollToBottom() {
    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100);  // Délai pour s'assurer que le DOM est mis à jour
};

