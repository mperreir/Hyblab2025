"use strict";

let activeIndex = 1;
const images = [
    { src: 'img/perso1.png', alt: '1', index: 0 },
    { src: 'img/perso2.png', alt: '2', index: 1, active: true },
    { src: 'img/perso3.png', alt: '3', index: 2 },
    ];
let presentationPerso;


// Function to create and append the carousel to the document
async function createCarousel() {
    // Retrieve the perso's presentations from our API
    let response = await fetch('data/presentationPerso.json');
    presentationPerso = await response.json();


    // Create the main container
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';
  
    // Create the carousel wrapper
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    carousel.id = 'carousel';
  
    images.forEach((imageData) => {
      const img = document.createElement('img');
      img.src = imageData.src;
      img.alt = imageData.alt;
      img.setAttribute('data-index', imageData.index);
      if (imageData.active) {
        img.classList.add('active');
      }
      carousel.appendChild(img);
    });
  
    // Append the carousel to the container
    carouselContainer.appendChild(carousel);

    const textZone = document.createElement('p');
    textZone.className = 'textZone';
    carouselContainer.appendChild(textZone);

    const selectButton = document.createElement('button');
    selectButton.id = 'selectButton';
    selectButton.textContent = 'Choisir';
    carouselContainer.appendChild(selectButton);
  
    // Append the carousel container to the body (or any other target element)
    document.getElementById("chatBox").appendChild(carouselContainer);

    

    let isDragging = false;
    let startX = 0;
    let endX = 0;

    // Mouse Events for Desktop
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        endX = e.clientX;
    });

    carousel.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        handleGesture(startX, endX);
        startX = 0;
        endX = 0;
    });

    // Prevent default behavior to avoid text/image selection
    carousel.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch Events for Mobile
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', () => {
        handleGesture(startX, endX);
        startX = 0;
        endX = 0;
    });

    selectButton.addEventListener('click', () => {
        console.log('Selected perso:', activeIndex);
    });

    // Initial update
    updateCarousel();
};

function updateCarousel() {
    const images = Array.from(document.querySelectorAll('.carousel img'));

    const carousel = document.getElementById('carousel');
    const textZone = document.querySelector('.textZone');

    const totalImages = images.length;
    const leftIndex = (activeIndex - 1 + totalImages) % totalImages;
    const rightIndex = (activeIndex + 1) % totalImages;

    carousel.innerHTML = ''; // Clear existing images
    carousel.appendChild(images[leftIndex].cloneNode(true));
    carousel.appendChild(images[activeIndex].cloneNode(true));
    carousel.appendChild(images[rightIndex].cloneNode(true));

    carousel.children[0].classList.remove('active');
    carousel.children[1].classList.add('active');
    carousel.children[2].classList.remove('active');

    textZone.innerHTML = presentationPerso[activeIndex];
}

function handleGesture(startX, endX) {
    const swipeDistance = endX - startX;

    if (swipeDistance > 50) {
    // Swipe Right
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    updateCarousel();
    } else if (swipeDistance < -50) {
    // Swipe Left
    activeIndex = (activeIndex + 1) % images.length;
    updateCarousel();
    }
}