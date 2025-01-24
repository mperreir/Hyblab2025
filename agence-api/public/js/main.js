"use strict";

let userName;
let secteur;
let choices;

const initSlide2 = async function () {
    const chatBox = document.getElementById('chatBox');
    const messageList = document.getElementById('messageList');
    const messageInput = document.getElementById('messageInput');


    scrollToBottom();

    // Retrieve the data from our json file
    let response = await fetch('data/fr_.json');
    const texts = await response.json();
    
    initMenu(texts);

    // Load the intro story
    userName = await loadIntroStory(texts.introduction.general);

    // Select the character
    // const character = await selectCharacter(texts.introduction.secteurs);
    // Select the character
    secteur = (await selectSecteur(texts.introduction.secteurs))[0];

    switch (secteur) {
        case "agro":
            await histoire(texts.agro, userName);
            break;
        case "tech":
            await histoire(texts.tech, userName);
            break;
        case "arti":
            await histoire(texts.arti, userName);
            break;
    };

    await displayMessages(texts.fin.avant, userName)

    await addButtonGoToResults();


};

function initMenu(texts){
    const menuBtn = document.getElementById("menu-btn");
    const menuPopup = document.getElementById("menu-popup");
    const closeMenuBtn = document.getElementById("close-menu");
    const goPauseLink = document.getElementById("go-pause"); // 暂停按钮
    const pausePopup = document.getElementById("pause-popup"); // 暂停弹窗
    const resumeGameBtn = document.getElementById("resume-game"); // 继续游戏按钮
    const quitGameBtn = document.getElementById("quit-game"); // 结束游戏按钮
  
    // 点击「Menu」打开弹窗
    menuBtn.addEventListener("click", () => {
        menuPopup.classList.remove("hidden");
    });

    // 点击「×」关闭弹窗
    closeMenuBtn.addEventListener("click", () => {
        menuPopup.classList.add("hidden");
    });

    // 点击背景(除 .menu-content 以外的区域)也关闭
    menuPopup.addEventListener("click", (event) => {
        if (event.target === menuPopup) {
        menuPopup.classList.add("hidden");
        }
    });
    const goCharactersLink = document.getElementById("go-characters");
    goCharactersLink.addEventListener("click", (e) => {
        e.preventDefault();              // 阻止 href 跳转
        menuPopup.classList.add("hidden");  // 先关菜单
        selectSecteur(texts.introduction.secteurs);
    });
    goPauseLink.addEventListener("click", (e) => {
        e.preventDefault(); // 阻止默认行为
        menuPopup.classList.add("hidden"); // 关闭菜单
        pausePopup.classList.remove("hidden"); // 打开暂停弹窗
      });
    
      // 点击“继续游戏”关闭暂停弹窗
      resumeGameBtn.addEventListener("click", () => {
        pausePopup.classList.add("hidden"); // 关闭暂停弹窗
      });
    
      // 点击“结束游戏”跳转到首页
      quitGameBtn.addEventListener("click", () => {
        window.location.href = "../agence-api/"; // 跳转到首页
      });
}
  
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

function waitForUserTouch(){
    return new Promise((resolve) => {
        const messageInput = document.getElementById('chatBox');
        messageInput.addEventListener('click', (event) => {
            if(!event.target.classList.contains("info")){
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

async function addButtonGoToResults() {
    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirmButton';
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

    addMessage({text: presentationSecteurs.texts.agro, type: "received",img: presentationSecteurs.images.agro});
    scrollToBottom();
    await waitForUserTouch();

    addMessage({text: presentationSecteurs.texts.tech, type: "received",img: presentationSecteurs.images.tech});
    scrollToBottom();
    await waitForUserTouch();

    addMessage({text: presentationSecteurs.texts.arti, type: "received",img: presentationSecteurs.images.arti});
    scrollToBottom();
    await waitForUserTouch();

    toggleTapIconDisplay(false);

    return await addAnswer(presentationSecteurs.reponses);
  }

async function displayMessages(message) {
    for (const key in message) {
        if(message[key].includes("{nom}")){
        addMessage({ text: message[key].replace("{nom}", userName), type: "received"});
        } else {
        addMessage({ text: message[key], type: "received"});
        }
        scrollToBottom();
        let next = false;
        while (!next) {
            next = await waitForUserTouch();
        }
    }
}

async function displayResponses(message) {
    console.log(message);
    for (const key in message) {
        addMessage({ text: message[key], type: "answer"});
        scrollToBottom();
    }
    await waitForUserTouch();
}
  
async function loadIntroStory(introStory) {
  document.getElementById('chat-input').style.display = 'none';

    await displayMessages(introStory.avant_nom);

    userName = await getUserName();
    addMessage({ text: userName, type: "sent"});

    await displayMessages(introStory.apres_nom);

    return userName;
}

async function histoire(texts, userName){

    choices = [];

    await displayMessages(texts.introduction);

    for (let i = 0; i < texts.questions.length; i++) {

        await displayMessages(texts.contexte[i].avant.slice(0,-1));
        await displayExplanation(texts.informations[i], choices, texts.contexte[i].avant[texts.contexte[i].avant.length-1]);
        

        await displayMessages(texts.questions[i]);

        /* Ouais bon la solution est dégeu, mais ça fonctionne */
        let multipleChoices = false;
        for(let key in texts.questions[i]){
           if(texts.questions[i][key].includes("financement")){
                multipleChoices = true;
                break;
           }
        }

        toggleTapIconDisplay(true);

        let answer = await addAnswer(texts.reponses[i], multipleChoices);
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