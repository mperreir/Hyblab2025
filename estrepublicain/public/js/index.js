"use strict";

document.body.style.maxWidth = window.innerWidth + "px"

// Ce bout de code permet de garantir que toutes les cars soient de la même taille en sélectionnant la plus grande
let cards = Array.from(document.getElementsByClassName("crime-cards"))
let cardsWidths = cards.map((value) => {return value.offsetWidth})
let maxW = cardsWidths.reduce((a, b) => Math.max(a, b), -Infinity);
cards.forEach((e) => e.style.minWidth = maxW + "px")

// Permettre de scroller horizontalement dans les cards grace à un drag de la souris (sans scrollbar moche)

// Récupération du carousel
const slider = document.querySelector('#carousel');

let mouseDown = false;
let startX, scrollLeft;

// Fonction startDragging qui initialise les valeurs
let startDragging = function (e) {
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
};

// Fonction startDragging qui réinitialise les valeurs
let stopDragging = function (event) {
    mouseDown = false;
};

// On fait en sorte que le carousel suive la position de la souris sur l'axe X
slider.addEventListener('mousemove', (e) => {
    // On vérifie que la souris soit bien cliquée
    e.preventDefault();  if(!mouseDown) {
        return;
    }

    // Calcule de la nouvelle position
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
});

// Quand on clique, on commence le dragging
slider.addEventListener('mousedown', startDragging, false);

// Quand on déclique ou que la souris n'est plus dessus, on le stop
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);
