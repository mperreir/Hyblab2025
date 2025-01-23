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


async function addAnswer(answers, multipleChoices=false) {
    const answersContainer = document.createElement('div');
    answersContainer.id = 'answers-container';

    for(let key in answers) {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        answerElement.dataset.answer = answers[key];
        answerElement.textContent = answers[key];
        answersContainer.appendChild(answerElement);
    }


    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirm-button';
    confirmButton.disabled = true;
    confirmButton.textContent = 'Confirmer';

    messageList.appendChild(answersContainer);
    messageList.appendChild(confirmButton);

    let selectedAnswer = [];

    if (multipleChoices) {
        answersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('answer')) {
                e.target.classList.toggle('selected');
                selectedAnswer = Array.from(answersContainer.querySelectorAll('.selected')).map((div) => div.dataset.answer);
                confirmButton.disabled = selectedAnswer.length === 0;
            }
        }
        );
    } else {
        answersContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('answer')) {
            // Remove 'selected' class from all answers
            document.querySelectorAll('.answer').forEach((div) => div.classList.remove('selected'));
        
            // Add 'selected' class to the clicked answer
            e.target.classList.add('selected');
        
            // Update selectedAnswer
            selectedAnswer = [e.target.dataset.answer];
        
            // Enable the confirm button
            confirmButton.disabled = false;
            }
        });
    }

    

      scrollToBottom();
      return new Promise((resolve) => {

      // Add click event listener to the confirm button
      confirmButton.addEventListener('click', () => {
        if (selectedAnswer) {
          confirmButton.remove();
          answersContainer.remove();
          for (const answer of selectedAnswer) {
            addMessage({ text: answer, type: 'sent', timestamp: new Date().toISOString() });
          }

          // Find keys for all target values
          const answerKeys = selectedAnswer.map(value => 
            Object.keys(answers).find(key => answers[key] === value)
          );

          resolve(answerKeys);
        }
      });
    });

}


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

