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

    // Déplacement des nuages en fonction du scroll (effet paralaxe)
    document.getElementById("cloud1").style.left = - currentScroll * 0.5 + 'px';
    document.getElementById("cloud2").style.right = - currentScroll * 0.7 + 'px';
    document.getElementById("cloud2").style.top = - currentScroll * 1.2 + 'px';

    // Affichage du texte démarrant la timeline avec un fondu basé sur le scroll
    // Récupération de l'élément
    let beginningText = document.getElementById("beginning-text")
    // Calcul de l'opacité en fonction de son emplacement sur l'écran (1 quand il est au milieu et 0 quand il est trop haut ou trop bas)
    beginningText.style.opacity = (1 - (Math.abs(currentScroll - beginningText.offsetTop + window.innerHeight * 0.25))/(1/2*beginningText.offsetHeight)).toString()
})