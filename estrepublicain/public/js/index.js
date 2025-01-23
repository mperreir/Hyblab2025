"use strict";

const swiper = new Swiper("#mySwiper", {
    direction: "horizontal",
    mousewheel: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

swiper.on("slideChange", function () {
    switch( swiper.activeIndex ) {
        case 0:
            initSlide1();
            break;
        case 1:
            initSlide2();
            break;
    }
});

const initSlide1 = async function(){
    // Get logo element
    const logo = document.querySelector('#logo-hyblab');

    // (Re)set initial scale of logo
    logo.setAttribute('style', 'transform :scale(1);');

    // Animate hyblab logo and make shrink on click
    anime({
        targets: '#logo-hyblab',
        scale: 1.2,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });

    // Add click listener
    logo.addEventListener('click', () => {
        anime({
            targets: '#logo-hyblab',
            scale: 0
        });
        swiper.slideNext()
    });

    // Retrieve the partner's topic from our API
    let response = await fetch('api/topic');
    const data1 = await response.json();

    // Get some dummy data
    response = await fetch('data/dummy.json');
    const data2 = await response.json();

    // Update the DOM to insert topic and data
    const footer = document.querySelector('footer p');
    footer.textContent = `Our partner is "${data1.topic}" and here is "${data2.message}" retrieved on the server.`;
};