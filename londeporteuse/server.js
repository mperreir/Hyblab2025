'use strict';

// Load useful expressjs and nodejs modules
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express'); // Import mustache-express

// Create our application
const app = express();

// Configure Mustache as the view engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, '/public/views')); // Set views directory

// Load and register our REST API
const api = require('./api/api');
app.use('/api', api);

// Serve static content
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../__common-logos__')));

// Route for the home page
app.get('/start', async (req, res) => {
    try {
        // Fetch data from the API endpoint
        const response = await fetch('http://localhost:8080/londeporteuse/api/home');
        const data = await response.json();

        // Render the Mustache template with the fetched data
        res.render('index.mustache', data);
    } catch (error) {
        console.error('Error fetching home page data:', error);
        res.status(500).send('Error loading the home page');
    }
});

// Route for the choices page
app.get('/choices', async (req, res) => {
    try {
      // Fetch data from the API endpoint
      const response = await fetch('http://localhost:8080/londeporteuse/api/choices');
      const data = await response.json();
  
      // Render the Mustache template with the fetched data
      res.render('choices.mustache', data);
    } catch (error) {
      console.error('Error fetching choices data:', error);
      res.status(500).send('Error loading the choices page');
    }
  });
  

// Export the app
module.exports = app;
