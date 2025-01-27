'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

// Create an Express app instance
const app = express();

/******************Loading different json files******************* */

// Load data from JSON file
const dataPath = path.join(__dirname, '../public/data/PAGE0.json');
const loadData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Load choices data from JSON file
const choicesDataPath = path.join(__dirname, '../public/data/PAGE3.json'); // Path to choices.json
const loadChoicesData = () => JSON.parse(fs.readFileSync(choicesDataPath, 'utf8'));

// Load budget infos from JSON file
const budgetDataPath = path.join(__dirname, '../public/data/etape2.json');
const loadBudgetData = () => JSON.parse(fs.readFileSync(budgetDataPath, 'utf8'));

/************************************************************* */

// Middleware to parse JSON
app.use(express.json());

// API: Return JSON data for the home page
app.get('/home', (req, res) => {
  const data = loadData(); // Load data from the JSON file
  res.json(data); // Respond with JSON data
});

// API: Return JSON data for the choices page
app.get('/choices', (req, res) => {
    const data = loadChoicesData(); // Load data from the JSON file
    res.json(data); // Respond with JSON data
  });


// Submit user choices
app.post('/submit-choices', (req, res) => {
const userChoices = req.body;

console.log('Received user choices:', userChoices);

// Process or save the choices (e.g., save to a database or file)
// For now, just send a success response
res.json({ message: 'Choices submitted successfully!', choices: userChoices });
});


// Return JSON data for budget page
app.get('/budget', (req, res) => {
  const data = loadBudgetData(); // Load data from the JSON file
  res.json(data); // Respond with JSON data
});



  

// Export the app
module.exports = app;
