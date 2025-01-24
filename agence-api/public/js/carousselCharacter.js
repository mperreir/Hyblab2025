"use strict";

class Carousel {
  constructor(images, presentationPersoTexts) {
    this.activeIndex = 1;
    this.images = images;
    this.presentationPerso = presentationPersoTexts;
    this.selectButton = document.createElement('button');
    this.carousel = document.createElement('div');
    this.textZone = document.createElement('p');
    this.activated = true;
  }

  async createCarousel() {

    // this.carouselContainer.innerHTML = ''; // Clear existing content
    // Create the main container
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';

    this.carousel.className = 'carousel';
    this.carousel.id = 'carousel';

    this.images.forEach((imageData) => {
      const img = document.createElement('img');
      img.src = imageData.src;
      img.alt = imageData.alt;
      img.setAttribute('data-index', imageData.index);
      if (imageData.active) {
        img.classList.add('active');
      }
      this.carousel.appendChild(img);
    });

    this.textZone.className = 'textZone';
    this.selectButton = document.createElement('button');
    this.selectButton.id = 'selectButton';
    this.selectButton.textContent = 'Choisir';

    carouselContainer.appendChild(this.carousel);
    carouselContainer.appendChild(this.textZone);
    carouselContainer.appendChild(this.selectButton);
    document.getElementById('messageList').appendChild(carouselContainer);

    let isDragging = false;
    let startX = 0;
    let endX = 0;

    // Mouse Events for Desktop
    this.carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
    });

    this.carousel.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      endX = e.clientX;
    });

    this.carousel.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      this.handleGesture(startX, endX);
      startX = 0;
      endX = 0;
    });

    // Prevent default behavior to avoid text/image selection
    this.carousel.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch Events for Mobile
    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.carousel.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });

    this.carousel.addEventListener('touchend', () => {
      this.handleGesture(startX, endX);
      startX = 0;
      endX = 0;
    });

    this.updateCarousel();
    scrollToBottom();
  }

  updateCarousel() {
    const totalImages = this.images.length;
    const leftIndex = (this.activeIndex - 1 + totalImages) % totalImages;
    const rightIndex = (this.activeIndex + 1) % totalImages;

    this.carousel.innerHTML = ''; // Clear existing images

    const imgLeft = document.createElement('img');
    imgLeft.src = this.images[leftIndex].src;
    imgLeft.alt = this.images[leftIndex].alt;

    const imgRight = document.createElement('img');
    imgRight.src = this.images[rightIndex].src;
    imgRight.alt = this.images[rightIndex].alt;

    const imgCenter = document.createElement('img');
    imgCenter.src = this.images[this.activeIndex].src;
    imgCenter.alt = this.images[this.activeIndex].alt;


    this.carousel.appendChild(imgLeft);
    this.carousel.appendChild(imgCenter);
    this.carousel.appendChild(imgRight);

    this.carousel.children[0].classList.remove('active');
    this.carousel.children[1].classList.add('active');
    this.carousel.children[2].classList.remove('active');

    this.textZone.innerHTML = this.presentationPerso[this.activeIndex];
  }

  handleGesture(startX, endX) {
    const swipeDistance = endX - startX;
    //Prevent swipe if the user only clicks on the carousel
    if (endX < 10) return;
    if (swipeDistance > 50) {
      // Swipe Right
      this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
    } else if (swipeDistance < -50) {
      // Swipe Left
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }
    if (this.activated){
      this.updateCarousel();
    }
  }

  async getCharacter() {
    return new Promise((resolve) => {
        this.selectButton.addEventListener('click', () => {
            this.selectButton.remove();
            resolve(this.activeIndex);
        });
    });
}
}