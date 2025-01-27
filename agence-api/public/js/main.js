"use strict";

let userName;
let secteur;
let choices;

let abortController = null;

const initSlide2 = async function (afterIntro = false) {

    if (abortController) {
        abortController.abort(); // Abort the previous call
    }
    
    abortController = new AbortController();
    const signal = abortController.signal;

    try {
        const chatBox = document.getElementById('chatBox');
        const messageList = document.getElementById('messageList');
        const messageInput = document.getElementById('messageInput');

        if(!afterIntro){
            scrollToBottom();

            // Initialiser la barre de progression
            updateProgress();

            // Load the intro story
            userName = await loadIntroStory(texts.introduction.general, signal);
        } else {
            document.getElementById('messageList').innerHTML = '';
            await loadIntroStory(texts.introduction.general, signal, true);
        }

        // Select the sector
        secteur = (await selectSecteur(texts.introduction.secteurs, signal))[0];

        switch (secteur) {
            case "agro":
                await histoire(texts.agro, userName, signal);
                break;
            case "tech":
                await histoire(texts.tech, userName, signal);
                break;
            case "arti":
                await histoire(texts.arti, userName, signal);
                break;
        };

        await displayMessages(texts.fin.avant, userName, signal);

        await addButtonGoToResults(signal);
    } catch (error) {
        if (!error.name === 'AbortError') {
            console.error('Error:', error);
        }
    }


};

function waitForNameInput() {
    return new Promise((resolve) => {
      const sendButton = document.getElementById('messageSendButton');
      const messageInput = document.getElementById('messageInput');
  
      function onClick() {
        const value = messageInput.value.trim();
        sendButton.removeEventListener('click', onClick); // Stop listening once input is received
        messageInput.removeEventListener('keydown', event => {
            if (event.key === 'Enter') {
                onClick();
            }
        });
        resolve(value); // Resolve the Promise with the input value
      }
  
      sendButton.addEventListener('click', onClick);
      messageInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            onClick();
        }
    });
    });
  }

async function waitForUserTouch(){
    return new Promise((resolve) => {
        const messageInput = document.getElementById('chatBox');
        messageInput.addEventListener('click', (event) => {
            if(!event.target.classList.contains("info") && !event.target.classList.contains("expanding") && !event.target.classList.contains("expanding-element")){
                resolve(true);
            } else {
                console.log("ca avance pas");
            }
        });
    });
}

async function addButtonGoToResults() {
    const confirmButton = document.createElement('button');
    confirmButton.id = 'seeResultsButton';
    confirmButton.textContent = 'Voir les résultats';
    confirmButton.classList.add('button');
    document.getElementById('chatBox').appendChild(confirmButton);
    scrollToBottom();
    confirmButton.addEventListener('click', () => {
        swiper.slideNext();
    });
}

async function getUserName() {

    toggleTapIconDisplay(true);

    const messageInput = document.getElementById('messageInput');
    const chatInput = document.getElementById('chat-input');

    chatInput.style.display='flex';
    messageInput.focus();

    userName = await waitForNameInput();

    messageInput.blur();
    chatInput.style.display='none';

    toggleTapIconDisplay(false);

    return userName;
}

async function selectSecteur(presentationSecteurs) {

    toggleTapIconDisplay(true);

    addMessage({text: presentationSecteurs.texts.agro, type: "received",img: presentationSecteurs.images.agro, title: presentationSecteurs.reponses.agro, class: "theme-agro"});
    scrollToBottom();
    await waitForUserTouch();

    addMessage({text: presentationSecteurs.texts.tech, type: "received",img: presentationSecteurs.images.tech, title: presentationSecteurs.reponses.tech, class: "theme-tech"});
    scrollToBottom();
    await waitForUserTouch();

    addMessage({text: presentationSecteurs.texts.arti, type: "received",img: presentationSecteurs.images.arti, title: presentationSecteurs.reponses.arti, class: "theme-arti"});
    scrollToBottom();
    await waitForUserTouch();

    toggleTapIconDisplay(false);

    return await addAnswer(presentationSecteurs.reponses, "secteur");
  }

async function displayMessages(message, signal, skipInteraction = false) {
    let i=0;
    for (const key in message) {
        if (signal.aborted) {
            console.log('Aborted');
            throw new DOMException("Aborted", "AbortError"); // Standard way to handle abort;
        } else if(typeof message[key] !== "string"){
            addMessage({ text: message[key].question, type: "received", class: "middle"});
            if (!skipInteraction) {
                await addAnswer(message[key].reponses);
            }
        } else if(message[key].includes("{nom}")){
            if(i === 0){
                addMessage({ text: message[key].replace("{nom}", userName), type: "received", class: "first"});
            } else if(i === message.length-1){
                addMessage({ text: message[key].replace("{nom}", userName), type: "received", class: "last"});
            } else {
                addMessage({ text: message[key].replace("{nom}", userName), type: "received", class: "middle"});
            }
        } else {
            if(i === 0){
                addMessage({ text: message[key], type: "received", class: "first"});
            } else if(i === message.length-1){
                addMessage({ text: message[key], type: "received", class: "last"});
            }
            else {
                addMessage({ text: message[key], type: "received", class: "middle"});
            }
        }
        scrollToBottom();
        if (!skipInteraction) {
            let next = false;
            while (!next) {
                next = await waitForUserTouch();
            }
        }
        i++;
    }
}
  
async function loadIntroStory(introStory, signal, skipInteraction = false) {
  document.getElementById('chat-input').style.display = 'none';

    await displayMessages(introStory.avant_nom, signal, skipInteraction);

    if (!skipInteraction){
        userName = await getUserName();
    }
    addMessage({ text: userName, type: "sent"});

    await displayMessages(introStory.apres_nom, signal, skipInteraction);

    return userName;
}

async function histoire(texts, userName, signal){

    choices = [];

    await displayMessages(texts.introduction, signal);

    for (let i = 0; i < texts.questions.length; i++) {

        if (signal.aborted) {
            console.log('Aborted');
            throw new DOMException("Aborted", "AbortError"); // Standard way to handle abort;
        }

        await displayMessages(texts.contexte[i].avant.slice(0,-1), signal);
        await displayExplanation(texts.informations[i], choices, texts.contexte[i].avant[texts.contexte[i].avant.length-1]);
        

        await displayMessages(texts.questions[i], signal);

        /* Ouais bon la solution est dégeu, mais ça fonctionne */
        let multipleChoices = false;
        for(let key in texts.questions[i]){
           if(texts.questions[i][key].includes("financement")){
                multipleChoices = true;
                break;
           }
        }

        toggleTapIconDisplay(true);

        let answer;

        if (multipleChoices){
            answer = await addAnswer(texts.reponses[i], "mutliple");
        } else {
            answer = await addAnswer(texts.reponses[i]);
        }

        choices = [...choices, ...answer];

        toggleTapIconDisplay(false);

        // Sometimes the "after" message is not dependent on the choice made
        if(typeof texts.contexte[i].apres[0] === "string"){
            addMessage({ text: texts.contexte[i].apres[0], type: "received"});
        } else {
            // console.log(texts.contexte[i].apres[0][answer[0]]);
            addMessage({ text: texts.contexte[i].apres[0][answer[0]], type: "received"});
        }
        scrollToBottom();
        await waitForUserTouch();
    }

}