"use strict";

// Init of the (touch friendly) Swiper slider
const swiper = new Swiper("#mySwiper", {
  direction: "vertical",
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
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


swiper.on("slideChange", function () {
  switch( swiper.activeIndex ) {
    case 0:
      initSlide1();
      toggleSwiper(true);
      break;
    case 1:
      initSlide2();
      toggleSwiper(false);
      break;
    case 2:
      initSlide3();
      toggleSwiper(true);
      break;
  }
});

// Wait for the content to preload and display 1st slide
// Here we simulate a loading time of one second
setTimeout(() => { 
  // fade out the loader "slide"
  // and send it to the back (z-index = -1)
  anime({
    delay: 1000,
    targets: '#loader',
    opacity: '0',
    'z-index' : -1,
    easing: 'easeOutQuad',
  });
  // Init first slide
  // Charger les messages stockés au démarrage
  const MESSAGES_KEY = 'chatMessages';
  loadStoredMessages(MESSAGES_KEY);
  initSlide1();
}, 1000);