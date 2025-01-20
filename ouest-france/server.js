const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  console.log(`Requête reçue pour: ${req.url}`);
  next();
});

console.log(__dirname)

// Servir les fichiers statiques du build React sous le chemin /ouest-france/assets
app.use('/ouest-france/dist/assets', express.static(path.join(__dirname, 'dist/assets')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// Gérer les routes pour React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


module.exports = app;