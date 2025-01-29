'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

// Create an Express app instance
const app = express();

app.use(require('body-parser').urlencoded({ extended: false }));


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


//Load festival costs data based on the differents scenarios
const festivalDataPath = path.join(__dirname, '../public/data/festivalData.json');
const loadFestivalData = () => JSON.parse(fs.readFileSync(festivalDataPath, 'utf8'));


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


// Function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


// Return JSON data for budget page
app.get('/budget', (req, res) => {
  const data = loadBudgetData(); // Load data from the JSON file

  res.json(data); // Respond with JSON data
});


// Function to calculate the cost and the ticket price of the festival
function calculateFestivalCostAndTicketPrice(choices, data) {
  // Find the matching scenario
  const scenario = data.find(
    (item) =>
      item['Médiation culturelle'] === choices.culturalMediationActions &&
      item['Transition écologique'] === choices.ecologicalActions &&
      item['Prévention'] === choices.riskPreventionActions &&
      item["Programmation et taille de l'événement"] ===
        choices.festivalSizes
  );

  if (!scenario) {
    throw new Error("No matching scenario found for the given choices.");
  }

  return {
    totalCost: scenario["Coût"],
    averageTicketPrice: scenario["Prix du billet"],
  };
}


app.post('/calculatebudget', (req, res) => {
  const userChoices = req.body; // Get user choices from the request body
  const festivalData = loadFestivalData();

  try {
    const result = calculateFestivalCostAndTicketPrice(userChoices, festivalData);
    res.json(result); // Send the result back to the client
  } catch (error) {
    res.status(400).json({ error: "Erreur plutot ici" });
  }
});


// API: Return JSON data for the ajustment page
app.get('/ajust', (req, res) => {
  const data = loadChoicesData(); // Load data from the JSON file
  res.json(data); // Respond with JSON data
});



function validateAdjustedBudget(userChoices, maxAllowedBudget) {
  // // Calculate the total budget for the new choices
  // let adjustedBudget = 0;
  // for (const criterion in userChoices) {
  //   const choice = userChoices[criterion];
  //   adjustedBudget += costMapping[criterion][choice];
  // }
  const festivalData = loadFestivalData();
  const result = calculateFestivalCostAndTicketPrice(userChoices, festivalData);

  // Check if the adjusted budget is within the allowed limit
  const isValid = result.totalCost <= maxAllowedBudget;

  return {
    isValid,
    result
  };
}


app.post('/validate-budget', (req, res) => {
  const userChoices = req.body.userChoices; // Get user choices from the request body
  const initialBudget = req.body.budgetLimit;

  try {
    const maxAllowedBudget = initialBudget * 0.615;

    const { isValid, result: { totalCost, averageTicketPrice } } = validateAdjustedBudget(
      userChoices,
      maxAllowedBudget
    );

    const result = { isValid, result: { totalCost, averageTicketPrice } }
    
    res.json(result); // Send the result back to the client
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});  

// Export the app
module.exports = app;
