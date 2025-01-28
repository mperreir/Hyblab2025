"use strict";

// Fonction pour envoyer un message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    const newMessage = { text: messageText, type: 'sent' };

    addMessage(newMessage);
    scrollToBottom();

    messageInput.value = '';
};

// Fonction pour ajouter un message dans la liste
async function addMessage(message, type) {
    const messageElement = document.createElement('li');
    const div = document.createElement('div');
    div.classList.add('message', message.type);

    if(message.title){
        const title = document.createElement('h2');
        title.textContent = message.title;
        div.appendChild(title);
    }

    if (message.img) {
        div.appendChild(document.createElement('img')).src = message.img;
        div.appendChild(document.createElement('p')).textContent = message.text;
        div.id = message.id;
        messageElement.appendChild(div);
    } else {
        messageElement.classList.add('message', message.type);
        messageElement.textContent = message.text;
        messageElement.id = message.id;
    }

    if (message.class) {
        messageElement.classList.add(message.class);
        div.classList.add(message.class);
    }

    switch (type) {
        case 'first':
            message.classList.add('first');
            break;
        case 'middle':
            message.classList.add('middle');
            break;
        case 'last':
            message.classList.add('last');
            break;
        // case 'info':
        //     message.classList.add('info');
        //     break;
    }

    messageList.appendChild(messageElement);

    if (message.choix) {
        for (let i = 0; i < message.choix.length; i++) {
            messageElement.dataset[`choix${i}`] = message.choix[i];
        }
        messageElement.dataset.taillechoix = message.choix.length;
        let info_icon = document.createElement('svg');
        info_icon.src = "img/info-circle.svg";
        info_icon.classList.add('info-icon');
        info_icon.classList.add('expanding-element');
        let svg_container = document.createElement('div');
        svg_container.id = "svg-container";
        
        svg_container.appendChild(info_icon);
        messageElement.appendChild(svg_container);

        

        fetch("img/info-circle.svg")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur de chargement du SVG: ${response.statusText}`);
                }
                return response.text();
            })
            .then(svgContent => {
                svg_container.innerHTML = svgContent;
                messageElement.appendChild(svg_container);
            })
            .catch(error => console.error('Erreur:', error));
    }
    scrollToBottom();
};

async function addAnswer(answers, type) {
    const answersContainer = document.createElement('div');
    answersContainer.id = 'answers-container';

    let i = 0;
    for (let key in answers) {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        answerElement.dataset.answer = answers[key];
        answerElement.textContent = answers[key];

        if (i === 0) {
            answerElement.classList.add('first');
        } else if (i === Object.keys(answers).length - 1) {
            answerElement.classList.add('last');
        } else {
            answerElement.classList.add('middle');
        }

        answersContainer.appendChild(answerElement);
        i++;
    }

    messageList.appendChild(answersContainer);
    scrollToBottom();

    let selectedAnswer = [];

    // if the type is useless, send a promise with the answer directly without needingn a confirm button
    if (type === 'useless') {
        return new Promise((resolve) => {
            answersContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('answer')) {
                    document.querySelectorAll('.answer').forEach((div) => div.classList.remove('selected'));
                    e.target.classList.add('selected');
                    selectedAnswer = [e.target.dataset.answer];
                    answersContainer.remove();
                    for (const answer of selectedAnswer) {
                        addMessage({ text: answer, type: 'sent' });
                    }
                    resolve(selectedAnswer);
                }
            });
        });  
    }

    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirm-button';
    confirmButton.disabled = true;
    confirmButton.textContent = 'Confirmer';

    messageList.appendChild(confirmButton);

    switch (type) {
        case 'multiple':
            answersContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('answer')) {
                    e.target.classList.toggle('selected');
                    selectedAnswer = Array.from(answersContainer.querySelectorAll('.selected')).map((div) => div.dataset.answer);
                    confirmButton.disabled = selectedAnswer.length === 0;
                }
            });
            break;
        case 'secteur':
            const answers = answersContainer.querySelectorAll('.answer');
            answers[0].addEventListener('click', () => {
                switchTheme("theme-agro");
                changeApiName("Api-Agro");
            });
            answers[1].addEventListener('click', () => {
                switchTheme("theme-tech");
                changeApiName("Api-Tech");
            });
            answers[2].addEventListener('click', () => {
                switchTheme("theme-arti");
                changeApiName("Api-Arti");
            });
        //I dont add the break on purpose
        default:
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
            break;

    }

    scrollToBottom();
    return new Promise((resolve) => {

        // Add click event listener to the confirm button
        confirmButton.addEventListener('click', () => {
            if (selectedAnswer.length > 0) {
                confirmButton.remove();
                answersContainer.remove();
                for (const answer of selectedAnswer) {
                    addMessage({ text: answer, type: 'sent' });
                }

                // Find keys for all target values
                const answerKeys = selectedAnswer.map(value =>
                    Object.keys(answers).find(key => answers[key] === value)
                );

          // Incrémenter la question actuelle et mettre à jour la progression
          if (currentQuestion < totalQuestions && type != "useless") {
            currentQuestion++;
            updateProgress();
          }
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
