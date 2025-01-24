// Assurez-vous d'avoir installé Mustache : npm install mustache
const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");

// 1. Chargement du main
const layout = fs.readFileSync(path.join(__dirname,"..", "main.mustache"), "utf8");

// 2. Chargement des contenus fixes (header + footer)
const header = fs.readFileSync(path.join(__dirname,"..", "contentFixe", "header.mustache"), "utf8");
const footer = fs.readFileSync(path.join(__dirname,"..", "contentFixe", "footer.mustache"), "utf8");

// 3. Chargement du contenu de la page (homeContent)
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
fs.writeFileSync(path.join(__dirname,"..", "index_bis.html"), output, "utf8");

console.log("La page index_bis.html a été générée avec succès !");



/*-------------------------------*/
const headerLogo = fs.readFileSync(
    path.join(__dirname, "..", "contentFixe", "headerLogo.mustache"), // nouveau header "light"
    "utf8"
);

const budgetContent = fs.readFileSync(path.join(__dirname, "..", "1.mustache"),"utf8");
  
// 5b. Préparation des données pour la page budget
const dataBudget = {
    dynamicContent: budgetContent
};

// Contenus fixes pour la deuxième page
const contentFixeBudget = {
    header: headerLogo, // On injecte le header "logo seulement"
    footer: footer
  };

// 6b. Rendu final
const outputBudget = Mustache.render(layout, dataBudget, contentFixeBudget);

// 7b. Écriture du résultat dans un fichier HTML
fs.writeFileSync(path.join(__dirname, "..", "budget.html"),outputBudget,"utf8");

console.log("La page budget.html a été générée avec succès !");