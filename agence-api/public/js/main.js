"use strict";

const initSlide2 = async function () {

    

    const chatBox = document.getElementById('chatBox');
    const messageList = document.getElementById('messageList');
    const messageInput = document.getElementById('messageInput');


    scrollToBottom();

    // Retrieve the intro's messages from our API
    let response = await fetch('data/fr_.json');
    const texts = await response.json();
    
    initMenu(texts);
    displayExplanation(texts.agro.informations["3"],["1_porc", "2_trucmuche"] , "Message d'explications");
    // await histoire(texts.tech);

    // Load the intro story
    const userName = await loadIntroStory(texts.introduction.general);

    // Select the character
    // const character = await selectCharacter(texts.introduction.secteurs);
    // Select the character
    const secteur = await selectSecteur(texts.introduction.secteurs);

    switch (secteur) {
        case 0:
            await histoire(texts.agro);
            break;
        case 1:
            await histoire(texts.tech);
            break;
        case 2:
            await histoire(texts.arti);
            break;
    };

    await displayMessages(texts.fin.avant, userName)


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
        messageInput.addEventListener('click', () => {
            resolve();
        });
    });
}


async function addButtonGoToResults() {
    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirmButton';
    confirmButton.textContent = 'Voir les résultats';
    confirmButton.classList.add('button');
    document.getElementById('chatBox').appendChild(confirmButton);
    confirmButton.addEventListener('click', () => {
        swiper.slideNext();
    });
}

async function getUserName() {

    toggleTapIconDisplay(true);

    const messageInput = document.getElementById('messageInput');
    const chatInput = document.getElementById('chat-input');

    chatInput.style.visibility='visible';
    messageInput.focus();

    let userName = await waitForNameInput();

    messageInput.blur();
    chatInput.style.visibility='hidden';

    toggleTapIconDisplay(false);

    return userName;
}

async function displayMessages(message, userName) {
    for (const key in message) {
        if(message[key].includes("{nom}")){
        addMessage({ text: message[key].replace("{nom}", userName), type: "received", timestamp: new Date().toISOString() });
        } else {
        addMessage({ text: message[key], type: "received", timestamp: new Date().toISOString() });
        }
        scrollToBottom();
        await waitForUserTouch();
    }
}

async function displayResponses(message) {
    for (const key in message) {
        addMessage({ text: message[key], type: "answer", timestamp: new Date().toISOString() });
        scrollToBottom();
    }
    await waitForUserTouch();
}

  
async function loadIntroStory(introStory) {
  document.getElementById('chat-input').style.visibility = 'hidden';

    await displayMessages(introStory.avant_nom);

    const userName = await getUserName();
    addMessage({ text: userName, type: "sent", timestamp: new Date().toISOString() });

    await displayMessages(introStory.apres_nom, userName);

    return userName;
}

  async function selectCharacter(textsPresentationPersos) {

    const images = [
        { src: 'img/perso1.png', alt: '1', index: 0 },
        { src: 'img/perso2.png', alt: '2', index: 1, active: true },
        { src: 'img/perso3.png', alt: '3', index: 2 }
      ];
      const carousel = new Carousel(images, ['text1', 'text2', 'text3']);
      await carousel.createCarousel();
      const char =  await carousel.getCharacter();
      carousel.activated = false;

      

      return char;
  }

  async function selectSecteur(textsPresentationPersos) {

    toggleTapIconDisplay(true);

    const images = [
        { src: 'img/agro.jpg', alt: '1', index: 0 },
        { src: 'img/tech.jpeg', alt: '2', index: 1, active: true },
        { src: 'img/arti.jpg', alt: '3', index: 2 }
      ];
      const carousel = new Carousel(images, [textsPresentationPersos.agro, textsPresentationPersos.tech, textsPresentationPersos.arti]);
      await carousel.createCarousel();
      const char =  await carousel.getCharacter();
      carousel.activated = false;

      toggleTapIconDisplay(false);

      return char;
  }
async function histoire(texts){

    let choices = [];

    await displayMessages(texts.introduction);

    for (let i = 0; i < texts.questions.length; i++) {

        await displayMessages(texts.questions[i]);


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
        console.log(choices);

        toggleTapIconDisplay(false);
    }

}