"use strict";

let swiper;
let texts;
let articles;


async function loadContent(url, elementId) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }
    const data = await response.text();
    document.querySelectorAll(`#${elementId}`).forEach(element => {
      element.innerHTML = data;
    });
      
  } catch (error) {
    return console.error(`Erreur lors du chargement de ${url}:`, error);
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  // Charger tous les contenus HTML des slides
  Promise.all([
    await loadContent('html/accueil.html', 'content-accueil'),
    await loadContent('html/chat.html', 'content-chat'),
    await loadContent('html/fin.html', 'content-fin'),
    await loadContent('html/header.html', 'chat-header'),
    await loadContent('html/menu.html', 'menu'),
  ]).then(() => {

    // Init of the (touch friendly) Swiper slider
    swiper = new Swiper("#mySwiper", {
      direction: "vertical",
      mousewheel: true,
      pagination: {
        clickable: false,
        pagination: false,
      },
    });

    switchTheme("theme-default");
    initMenu();


    swiper.on("slideChange", function () {
      switch( swiper.activeIndex ) {
        case 0:
          toggleSwiper(true);
          break;
        case 1:
          initSlide2();
          showTapIcon();
          toggleSwiper(false);
          break;
        case 2:
          initSlide3();
          toggleSwiper(false);
          break;
      }
    });

    // Simulate content loading with a promise
    async function loadContent() {
        let response = await fetch('data/fr_.json');
        texts = await response.json();

        response = await fetch('data/article.json');
        articles = await response.json();
    }

    async function startLoading() {
      anime({
        targets: '#loader',
        opacity: [1, 0.5, 1], // Pulse effect
        easing: 'easeInOutQuad',
        duration: 1000,
        loop: true, // Loop animation during loading
      });

      await loadContent();

      anime({
        targets: '#loader',
        opacity: '0',
        'z-index': -1,
        easing: 'easeOutQuad',
        duration: 1000,
        complete: () => {
          // initSlide1();
        },
      });
    }
    startLoading();    
  }).catch(error => {
    console.error('Erreur lors du chargement des contenus:', error);
  });
});

// Function to enable or disable Swiper controls
function toggleSwiper(enable) {
  if (enable) {
    swiper.mousewheel.enable();
    swiper.allowTouchMove = true;
  } else {
    swiper.mousewheel.disable();
    swiper.allowTouchMove = false;
  }
}


let timeout;
let preventTapIcon = false;

const tapIcon = document.getElementById('tapIcon');    
  
  // Show the animated icon if no user activity for 7 seconds
  function showTapIcon() {
    if (!preventTapIcon) {
      tapIcon.style.display = 'block';
    }
  }
  
  // Hide the icon and reset the timer on user activity
  function hideTapIcon() {
    tapIcon.style.display = 'none';
    clearTimeout(timeout);
    timeout = setTimeout(showTapIcon, 7000); // Reset the timer
  }
  
  
  
  // Add event listeners for user activity
  ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'].forEach(eventType => {
    document.addEventListener(eventType, hideTapIcon);
  });
  
  // Start the timer on page load
  timeout = setTimeout(showTapIcon, 7000);

// Custom event to toggle preventTapIcon
function toggleTapIconDisplay(shouldPrevent) {
  preventTapIcon = shouldPrevent;
  if (preventTapIcon) {
    tapIcon.style.display = 'none'; // Ensure the icon is hidden
    clearTimeout(timeout); // Cancel the timer
  } else {
    timeout = setTimeout(showTapIcon, 7000); // Restart the timer
  }
}


function switchTheme(theme) {
  const root = document.documentElement;

  // Remove any existing theme classes
  root.classList.remove('theme-tech', 'theme-agro', 'theme-arti', 'theme-default');

  // Add the selected theme class
  root.classList.add(`${theme}`);
}