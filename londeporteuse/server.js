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


// Route for the budget page
app.get('/budget', async (req, res) => {
  try {
    // Fetch data from the API endpoint
    const response = await fetch('http://localhost:8080/londeporteuse/api/budget');
    const data = await response.json();

    // Render the Mustache template with the fetched data
    res.render('budget.mustache', data);
  } catch (error) {
    console.error('Error fetching budget data:', error);
    res.status(500).send('Error loading the budget page');
  }
});


// Route for the ajustment page
app.get('/ajust', async (req, res) => {
  try {
    // Fetch data from the API endpoint
    const response = await fetch('http://localhost:8080/londeporteuse/api/ajust');
    const data = await response.json();

    // Render the Mustache template with the fetched data
    res.render('ajustments.mustache', data);
  } catch (error) {
    console.error('Error fetching ajustment data:', error);
    res.status(500).send('Error loading the ajustment page');
  }
});


// Route for the result page
app.get('/result', async (req, res) => {
  try {
    // Fetch data from the API endpoint
    const response = await fetch('http://localhost:8080/londeporteuse/api/result');
    const data = await response.json();

    // Render the Mustache template with the fetched data
    res.render('results.mustache', data);
  } catch (error) {
    console.error('Error fetching result data:', error);
    res.status(500).send('Error loading the result page');
  }
});
  

// Export the app
module.exports = app;
