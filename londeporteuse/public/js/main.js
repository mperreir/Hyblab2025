// Assurez-vous d'avoir installé Mustache : npm install mustache
const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");

// 1. Chargement du main
const layout = fs.readFileSync(path.join(__dirname,"..", "main.mustache"), "utf8");

// 2. Chargement des contenus fixes (header + footer)
const header = fs.readFileSync(path.join(__dirname,"..", "contentFixe", "header.mustache"), "utf8");
const footer = fs.readFileSync(path.join(__dirname,"..", "contentFixe", "footer.mustache"), "utf8");

// 3. Chargement du contenu de la page (Accueil)
const homeContent = fs.readFileSync(path.join(__dirname,"..", "0.mustache"), "utf8");

// 4. Préparation des données pour Mustache
const dataHome = {
  dynamicContent: homeContent  // contenu injecté dans {{{dynamicContent}}}
};

// 5. contentFixe Mustache
const contentFixe = {
  header: header,
  footer: footer
};

// 6. Rendu final dans le html d'accueil
const output = Mustache.render(layout, dataHome, contentFixe);

// 7. Écriture du résultat dans un fichier HTML (ou utilisation en serveur)
fs.writeFileSync(path.join(__dirname,"..", "index.html"), output, "utf8");

console.log("La page index_bis.html a été générée avec succès !");


/*---------------------------------------------------------------------------------------------*/


const headerLogo = fs.readFileSync(
    path.join(__dirname, "..", "contentFixe", "headerLogo.mustache"), // header avec le logo de l'appli
    "utf8"
);

const choicesContent = fs.readFileSync(path.join(__dirname, "..", "1.mustache"),"utf8");
  
// 5b. Préparation des données pour la page de choix
const choice = {
    dynamicContent: choicesContent
};

// Contenus fixes pour la deuxième page
const contentFixeBudget = {
    header: headerLogo, // On injecte le header "logo seulement"
    footer: footer
  };

// 6b. Rendu final
const outputBudget = Mustache.render(layout, choice, contentFixeBudget);

// 7b. Écriture du résultat dans un fichier HTML
fs.writeFileSync(path.join(__dirname, "..", "choices.html"),outputBudget,"utf8");

console.log("La page choices.html a été générée avec succès !");

/* -------------------------------------------------------------------------- */

const resultsContent = fs.readFileSync(path.join(__dirname, "..", "2.mustache"),"utf8");

// 5b. Préparation des données pour la page de choix
const results = {
    dynamicContent: resultsContent
};

// Contenus fixes pour la deuxième page
const contentFixeResult = {
    header: headerLogo, // On injecte le header "logo seulement"
    footer: footer
  };

// 6b. Rendu final
const outputResult = Mustache.render(layout, results, contentFixeResult );

// 7b. Écriture du résultat dans un fichier HTML
fs.writeFileSync(path.join(__dirname, "..", "results.html"), outputResult, "utf8");

console.log("La page results.html a été générée avec succès !");

/* -------------------------------------------------------------------------- */

const ajustementsContent = fs.readFileSync(path.join(__dirname, "..", "3.mustache"),"utf8");

// 5b. Préparation des données pour la page de choix
const ajustements = {
    dynamicContent: ajustementsContent
};

// Contenus fixes pour la deuxième page
const contentFixeAjustement = {
    header: headerLogo, // On injecte le header "logo seulement"
    footer: footer
  };

// 6b. Rendu final
const outputAjustement = Mustache.render(layout, ajustements, contentFixeAjustement );

// 7b. Écriture du résultat dans un fichier HTML
fs.writeFileSync(path.join(__dirname, "..", "ajustements.html"), outputAjustement, "utf8");

console.log("La page ajustements.html a été générée avec succès !");


/* -------------------------------------------------------------------------- */

const afficheContent = fs.readFileSync(path.join(__dirname, "..", "4.mustache"),"utf8");

// 5b. Préparation des données pour la page de choix
const affiche = {
    dynamicContent: afficheContent
};

// Contenus fixes pour la deuxième page
const contentFixeAffiche = {
    header: headerLogo, // On injecte le header "logo seulement"
    footer: footer
  };

// 6b. Rendu final
const outputAffiche = Mustache.render(layout, affiche, contentFixeAffiche );

// 7b. Écriture du résultat dans un fichier HTML
fs.writeFileSync(path.join(__dirname, "..", "affiche.html"), outputAffiche, "utf8");

console.log("La page affiche.html a été générée avec succès !");