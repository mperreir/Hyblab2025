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
    loadIntroStory(introStory);
};

function loadIntroStory(introStory) {
    let i = 1;
    for(const key in introStory){
        setTimeout(() => {
            addMessage({ text: introStory[key], type: "received", timestamp: new Date().toISOString() });
            scrollToBottom();
        }, i*1000);
        i++;
    }

}
