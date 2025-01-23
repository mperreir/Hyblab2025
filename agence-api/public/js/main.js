"use strict";

const initSlide2 = async function () {

  const chatBox = document.getElementById('chatBox');
  const messageList = document.getElementById('messageList');
  const messageInput = document.getElementById('messageInput');

  displayExplanation({titre:"test"});
  scrollToBottom();

  // Retrieve the intro's messages from our API
  let response = await fetch('data/introStory.json');
  const introStory = await response.json();

  // Load the intro story
  await loadIntroStory(introStory);
  const userName = await getUserName();

};

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForLocalStorageKey(key, interval = 100) {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        clearInterval(checkInterval); // Stop checking once the value exists
        resolve(value); // Resolve the promise with the value
      }
    }, interval);
  });
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
}

async function getUserName() {
    document.getElementById('chat-input').style.visibility='visible';
  document.getElementById('messageInput').focus();

  userName = await waitForLocalStorageKey('userName');

    document.getElementById('chat-input').style.visibility='hidden';
  document.getElementById('messageInput').blur();
  return userName;
}
