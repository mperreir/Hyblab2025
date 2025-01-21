"use strict"

// Définition des animations d'apparition
document.addEventListener("DOMContentLoaded", () => {
    // Utilisation de l'Intersection Observer pour savoir quand un élément rentre dans la partie visible de la page
    const observer = new IntersectionObserver(entries => {

        // Pour chacun de ces éléments, s'il est dans le viewport, on ajoute la class qui va lancer l'animation CSS
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                return;
            }
            // Puis on retire la class pour rejouer l'animation si l'élément sort puis re-entre dans le viewport
            entry.target.classList.remove('in-view');
        });
    });

    // Récupération des éléments qu'on souhaite animer
    let allAnimatedElements = document.querySelectorAll('.animate');

    // Ajout de l'observateur pour chacun de ces éléments
    allAnimatedElements.forEach((element) => observer.observe(element));

});

// Définition des animations "propotionnelles" au scroll
// Quand l'utilisateur scroll
window.addEventListener('scroll', function(){

    // Récupération du niveau de scroll
    var currentScroll = window.scrollY;

    // Calcule de l'avancement du scroll pour la progress bar
    document.getElementById("progress").value = (currentScroll + window.innerHeight) / document.body.offsetHeight * 100
    //
    // // Déplacement des nuages en fonction du scroll (effet paralaxe)
    document.getElementById("portrait-peugeot1").style.top = - currentScroll * 0.5 + 'px';
    document.getElementById("portrait-stras1").style.top = - currentScroll * 0.2 + 'px';
    document.getElementById("portrait-uruffe1").style.top = - currentScroll * 0.5 + 'px';
    document.getElementById("portrait-uruffe3").style.top = - currentScroll * 0.5 + 'px';
    document.getElementById("portrait-auto1").style.top = - currentScroll * 0.2 + 'px';
    document.getElementById("portrait-uruffe2").style.top = - currentScroll * 0.5 + 'px';

    document.querySelectorAll(".portrait").forEach((portrait) => {
        portrait.style.opacity = 1 - (portrait.getBoundingClientRect().top-currentScroll) / (0.5 * window.innerHeight)
    })
    // Affichage du texte démarrant la timeline avec un fondu basé sur le scroll
    // Récupération de l'élément
    let beginningText = document.getElementById("beginning-text")
    // Calcul de l'opacité en fonction de son emplacement sur l'écran (1 quand il est au milieu et 0 quand il est trop haut ou trop bas)
    beginningText.style.opacity = (1 - (Math.abs(currentScroll - beginningText.offsetTop))/(1/2*beginningText.offsetHeight)).toString()
})

let scrollTimeout; // Variable to store the timeout ID
const scrollDelay = 5000; // Time in milliseconds (5 seconds)

// Function to execute when the user hasn't scrolled for the specified time
function onUserIdle() {
    document.getElementById("scroll-indication").style.opacity = "1"
}

scrollTimeout = setTimeout(onUserIdle, scrollDelay);

// Event listener for scroll events
window.addEventListener("scroll", () => {
    // Clear the previous timeout to reset the timer
    clearTimeout(scrollTimeout);
    document.getElementById("scroll-indication").style.opacity = "0"

    // Set a new timeout
    scrollTimeout = setTimeout(onUserIdle, scrollDelay);
});