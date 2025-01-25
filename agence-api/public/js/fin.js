"use strict";

const initSlide3 = async function(){


  // Retrieve the data from our json file
  let response = await fetch('data/fr_.json');
  const texts = await response.json();

  response = await fetch('data/article.json');
  const articles = await response.json();


  document.getElementById("titleFin1").textContent = texts.fin.title1;
  document.getElementById("textFin1").textContent = texts.fin.paragraphe1.replace("{nom}", userName);
  document.getElementById("titleFin2").textContent = texts.fin.title1;
  document.getElementById("textFin2").textContent = texts.fin.paragraphe2;

  const article = articles.articles.find(article => article.name === "MM Process");

  document.getElementById("imgArticle").src=article.img;
  document.getElementById("accrocheArticle").textContent = article.accroche;

  document.getElementById("articleContainer").addEventListener('click', () => {
    window.open(article.url, '_blank');
  });

  if (!secteur) {
    secteur = 'arti';
  }
  if (!choices) {
    choices = ['1_ceramiste', '2_banque', '3_embauchecfa', '4_mission', '5_import'];
  }
  if (!userName) {
    userName = 'Jean';
  }

  // Load the results on the cards
  texts[secteur].cartes_fin_arriere.forEach((frontText, index) => {
    addCard(frontText, texts[secteur].cartes_fin_avant[index][choices[index]]);
  });

};


function addCard(textFront, textBack){
  const cardsContainer = document.getElementById('cardsContainer');

  // Create the card container
  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-container';
  cardContainer.id = 'flipCard';

  // Create the card
  const card = document.createElement('div');
  card.className = 'card';

  // Create the front side
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  const p = document.createElement('p');
  p.textContent = textFront;
  cardFront.appendChild(p);

  // Create the back side
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  const p2 = document.createElement('p');
  p2.textContent = textBack;
  cardBack.appendChild(p2);

  // Append front and back to the card
  card.appendChild(cardFront);
  card.appendChild(cardBack);

  // Append card to the card container
  cardContainer.appendChild(card);

  // Add the card container to the DOM (e.g., body or a specific container)
  cardsContainer.appendChild(cardContainer);


  cardContainer.addEventListener('click', () => {
    cardContainer.classList.toggle('flipped'); // Toggle the "flipped" class
  });
}