const express = require('express');
const path = require('path');

const app = express();

// Servir les fichiers statiques générés par Vite
app.use('/ouest-france', express.static(path.join(__dirname, 'dist')));

// Servir les logos communs
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// Gérer les routes pour React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


module.exports = app;