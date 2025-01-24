"use strict";


// Fonction pour envoyer un message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    const newMessage = { text: messageText, type: 'sent'};

    addMessage(newMessage);
    scrollToBottom();

    messageInput.value = '';
};

// Fonction pour ajouter un message dans la liste
function addMessage(message) {
    const messageElement = document.createElement('li');
    if (message.img){
        const div = document.createElement('div');
        div.classList.add('message', message.type);
        div.appendChild(document.createElement('img')).src = message.img;
        div.appendChild(document.createElement('p')).textContent = message.text;
        div.id = message.id;
        messageElement.appendChild(div);
    } else {
        messageElement.classList.add('message', message.type);
        messageElement.textContent = message.text;
        messageElement.id = message.id;
    }
    messageList.appendChild(messageElement);

    if(message.choix){
        for (let i = 0; i < message.choix.length; i++) {
            messageElement.dataset[`choix${i}`] = message.choix[i];
        }
        messageElement.dataset.taillechoix = message.choix.length;
    }
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
            addMessage({ text: answer, type: 'sent'});
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


