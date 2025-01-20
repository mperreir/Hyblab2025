const { execSync } = require('child_process'); // Permet d'exécuter des commandes dans Node.js
const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  console.log(`Requête reçue pour: ${req.url}`);
  next();
});

// Exécuter la commande de build
//console.log('Building the React project...');
//execSync('npm run build', { stdio: 'inherit' }); // Exécute "npm run build" et affiche les logs dans la console

// Servir les fichiers statiques du build React
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// Gérer les routes pour React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


module.exports = app;