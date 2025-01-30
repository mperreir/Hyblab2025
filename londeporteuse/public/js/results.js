document.addEventListener("DOMContentLoaded", function () {
    let texteNarratif = [
        "TON FESTIVAL EST PRET",
        "VOILA TES RESULTATS"
    ];
  
    let svgElement = document.getElementById("perso-svg-4");
    let bubbleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  
    // Ajustements pour le placement
    let textX = 650; // Décalé vers la droite
    let textY = 200; // Ajuste la hauteur
  
    bubbleText.setAttribute("x", textX);
    bubbleText.setAttribute("y", textY);
    bubbleText.setAttribute("text-anchor", "middle");
    bubbleText.setAttribute("font-size", "32"); // Taille du texte augmentée
    bubbleText.setAttribute("fill", "black");
    bubbleText.setAttribute("font-weight", "bold"); // Texte en gras
  
    // Ajouter les lignes avec des sauts plus espacés
    texteNarratif.forEach((line, index) => {
        let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan.setAttribute("x", textX);
        tspan.setAttribute("dy", index === 0 ? "0" : "50"); // Augmenté à 28px
        tspan.textContent = line;
        bubbleText.appendChild(tspan);
    });
  
    svgElement.appendChild(bubbleText);
  });