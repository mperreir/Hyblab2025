"use strict";

const initSlide3 = async function(){

  updateProgress();

  document.getElementById("titleFin1").textContent = texts.fin.title1;

  if(!userName){
    userName = "";
  }

  document.getElementById("textFin1").textContent = texts.fin.paragraphe1.replace("{nom}", userName);
  document.getElementById("titleFin2").textContent = texts.fin.title2;
  document.getElementById("textFin2").textContent = texts.fin.paragraphe2;
  //Afffichage des noms de l'équipe
  document.getElementById("titleFin3").textContent = texts.fin.title3;
  document.getElementById("teamNamesText").textContent = texts.fin.paragraphe3;
  
  document.getElementById("refAPI").innerHTML = texts.fin.paragraphe4;

  if(secteur && choices) {
    // Load the results on the cards

    let maxVisitedIndex = -1;
    choices.forEach((choice, index) => {

      if(index > maxVisitedIndex){
        const [choiceIndex, choiceText] = choice.split('_');

        let text = texts[secteur].cartes_fin_avant[choiceIndex-1][choice];
        while(choices[index+1] && choices[index+1].split('_')[0] === choiceIndex){
          index++;
          text += " - " + texts[secteur].cartes_fin_avant[choiceIndex-1][choices[index]];
        }
        maxVisitedIndex = index;
        addCard(texts[secteur].cartes_fin_arriere[choiceIndex-1], text);
      }
    });



    // texts[secteur].cartes_fin_arriere.forEach((frontText, index) => {
    //   if(frontText === "Financement"){
    //     let text = texts[secteur].cartes_fin_arriere[index][choices[index]];
    //   } else {
    //     addCard(frontText, texts[secteur].cartes_fin_avant[index][choices[index]]);
    //   }
    // });
  } else {
    addCard("Vous n'avez fait aucun choix", "Veuillez recommencer le jeu", true);
  }

  if (!choices) {
    choices = [];
  }

  const article = await findBestMatchingArticle(choices);

  document.getElementById("imgArticle").src=article.img;
  document.getElementById("accrocheArticle").textContent = article.accroche;

  document.getElementById("articleContainer").addEventListener('click', () => {
    window.open(article.url, '_blank');
  });
};


function addCard(textFront, textBack, noChoices = false){
  const cardsContainer = document.getElementById('cardsContainer');

  // Create the card container
  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-container';
  cardContainer.id = 'flipCard';
  if (noChoices) {
    cardContainer.classList.add('no-choices');
  }

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

async function findBestMatchingArticle(customKeywords) {
  // Map articles to a score based on matching keywords
  const scoredArticles = articles.articles.map(article => {
    const matchingKeywords = article.keywords.filter(keyword => customKeywords.includes(keyword));
    return {
      article,
      matchCount: matchingKeywords.length
    };
  });

  // Find the highest match count
  const highestScore = Math.max(...scoredArticles.map(item => item.matchCount));

  // Get all articles with the highest match count
  const bestArticles = scoredArticles.filter(item => item.matchCount === highestScore);

  // Randomly pick one from the best matching articles
  const randomBestArticle = bestArticles[Math.floor(Math.random() * bestArticles.length)];

  return randomBestArticle.article;
}