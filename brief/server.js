// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
const express = require('express');
const path = require('path');
const cors = require('cors'); // Importer CORS
// Load and register our REST API
const api = require('./api/api');

// Create our application
const app = express();

// Utiliser CORS pour autoriser les requêtes venant de n'importe quelle origine
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api', api);

// Minimum routing: serve static content from the html directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// En production, servir les fichiers du build React (dist)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  // Toute autre route demandée renvoie l'index.html pour permettre le routage côté client avec React
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}


// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
