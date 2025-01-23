"use strict";

document.onload(function() {

    const carousel = document.querySelector('.carousel');
    const images = Array.from(document.querySelectorAll('.carousel img'));
    let activeIndex = 1;

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
        handleGesture();
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
        handleGesture();
        startX = 0;
        endX = 0;
    });

    // Initial update
    updateCarousel();
});

function updateCarousel() {
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
}

function handleGesture() {
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