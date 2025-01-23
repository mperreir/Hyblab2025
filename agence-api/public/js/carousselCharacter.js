"use strict";

class Carousel {
  constructor(images, presentationPersoTexts) {
    this.activeIndex = 1;
    this.images = images;
    this.presentationPerso = [presentationPersoTexts.agro, presentationPersoTexts.tech, presentationPersoTexts.arti];
    this.selectButton;
  }

  async createCarousel() {

    // this.carouselContainer.innerHTML = ''; // Clear existing content
    // Create the main container
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';

    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    carousel.id = 'carousel';

    this.images.forEach((imageData) => {
      const img = document.createElement('img');
      img.src = imageData.src;
      img.alt = imageData.alt;
      img.setAttribute('data-index', imageData.index);
      if (imageData.active) {
        img.classList.add('active');
      }
      carousel.appendChild(img);
    });

    const textZone = document.createElement('p');
    textZone.className = 'textZone';
    this.selectButton = document.createElement('button');
    this.selectButton.id = 'selectButton';
    this.selectButton.textContent = 'Choisir';

    carouselContainer.appendChild(carousel);
    carouselContainer.appendChild(textZone);
    carouselContainer.appendChild(this.selectButton);
    document.getElementById('messageList').appendChild(carouselContainer);

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
      this.handleGesture(startX, endX);
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
      this.handleGesture(startX, endX);
      startX = 0;
      endX = 0;
    });

    this.updateCarousel();
    scrollToBottom();
  }

  updateCarousel() {
    const images = Array.from(document.querySelectorAll('.carousel img'));
    const carousel = document.getElementById('carousel');
    const textZone = document.querySelector('.textZone');
    const totalImages = images.length;
    const leftIndex = (this.activeIndex - 1 + totalImages) % totalImages;
    const rightIndex = (this.activeIndex + 1) % totalImages;

    carousel.innerHTML = ''; // Clear existing images
    carousel.appendChild(images[leftIndex].cloneNode(true));
    carousel.appendChild(images[this.activeIndex].cloneNode(true));
    carousel.appendChild(images[rightIndex].cloneNode(true));

    carousel.children[0].classList.remove('active');
    carousel.children[1].classList.add('active');
    carousel.children[2].classList.remove('active');

    textZone.innerHTML = this.presentationPerso[this.activeIndex];
  }

  handleGesture(startX, endX) {
    const swipeDistance = endX - startX;
    if (swipeDistance > 50) {
      // Swipe Right
      this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
    } else if (swipeDistance < -50) {
      // Swipe Left
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }
    this.updateCarousel();
  }

  async getCharacter() {
    return new Promise((resolve) => {
        this.selectButton.addEventListener('click', () => {
            this.selectButton.textContent = "Choisi !";
            this.selectButton.disabled = true;
            resolve(this.activeIndex);
        });
    });
}
}