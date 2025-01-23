"use stric";

const initSlide2 = async function () {

    const chatBox = document.getElementById('chatBox');
    const messageList = document.getElementById('messageList');
    const messageInput = document.getElementById('messageInput');

    scrollToBottom();

    // Retrieve the intro's messages from our API
    let response = await fetch('data/introStory.json');
    const introStory = await response.json();

    // Load the intro story
    const userName = await loadIntroStory(introStory);

    // Select the character
    const character = await selectCharacter();
    addMessage({ text: "Vous avez choisi " + character, type: "received", timestamp: new Date().toISOString() });
    
    
};

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


async function getUserName() {
    const messageInput = document.getElementById('messageInput');
    const chatInput = document.getElementById('chat-input');

    chatInput.style.visibility='visible';
    messageInput.focus();

    userName = await waitForNameInput();

    messageInput.blur();
    chatInput.style.visibility='hidden';
    return userName;
}
  
async function loadIntroStory(introStory) {
    document.getElementById('chat-input').style.visibility = 'hidden';

    let i = 1;
    for (const key in introStory) {
        await wait(100); // Wait for 1 second
        addMessage({ text: introStory[key], type: "received", timestamp: new Date().toISOString() });
        scrollToBottom();
        i++;
    }

    const userName = await getUserName();

    addMessage({ text: userName, type: "sent", timestamp: new Date().toISOString() });
    addMessage({ text: "Coucou " + userName, type: "received", timestamp: new Date().toISOString() });


    return userName;
}

  async function selectCharacter() {
    // Call the function to create and add the carousel
    await createCarousel();
    scrollToBottom();
    return getCharacter();
  }
  