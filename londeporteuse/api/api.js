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


//Load festival costs data based on the differents scenarios
const festivalDataPath = path.join(__dirname, '../public/data/festivalData.json');
const loadFestivalData = () => JSON.parse(fs.readFileSync(festivalDataPath, 'utf8'));


//Load texts based on the prioritized scenario
const resultDataPath = path.join(__dirname, '../public/data/results.json');
const loadResultData = () => JSON.parse(fs.readFileSync(resultDataPath, 'utf8'));

const costMapping = {
  culturalMediationActions : { Petit: 19520, Moyen: 84800, Grand: 145611 },
  ecologicalActions : { Petit: 18116, Moyen: 99709, Grand: 671629 },
  festivalSizes : { Petit: 47300, Moyen: 187500, Grand: 2457000 },
  riskPreventionActions : { Petit: 0, Moyen: 12000, Grand: 25000 }
};

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


// Function to calculate the cost and the ticket price of the festival
function calculateFestivalCostAndTicketPrice(choices, data) {
  // Find the matching scenario
  const scenario = data.find(
    (item) =>
      item["Médiation culturelle"] === choices[culturalMediationActions] &&
      item["Transition écologique"] === choices[ecologicalActions] &&
      item["Prévention"] === choices[riskPreventionActions] &&
      item["Programmation et taille de l'événement"] ===
        choices[festivalSizes]
  );

  if (!scenario) {
    throw new Error("No matching scenario found for the given choices.");
  }

  return {
    totalCost: scenario["Coût"],
    averageTicketPrice: scenario["Prix du billet"],
  };
}


app.post('/calculate-budget', (req, res) => {
  const userChoices = req.body; // Get user choices from the request body
  const festivalData = loadFestivalData();
  try {
    const result = calculateFestivalCostAndTicketPrice(userChoices, festivalData);
    res.json(result); // Send the result back to the client
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// API: Return JSON data for the ajustment page
app.get('/ajust', (req, res) => {
  const data = loadChoicesData(); // Load data from the JSON file
  res.json(data); // Respond with JSON data
});


// Function to get query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


function validateAdjustedBudget(userChoices, /*costMapping*/ maxAllowedBudget) {
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
  const userChoices = req.body; // Get user choices from the request body
  const initialBudget = getQueryParam('initialBudget');

  try {
    const maxAllowedBudget = initialBudget * 0.615;

    const { isValid, adjustedBudgetAndPrice } = validateAdjustedBudget(
      userChoices,
      // costMapping,
      maxAllowedBudget
    );

    const result = { isValid, adjustedBudgetAndPrice }
    
    res.json(result); // Send the result back to the client
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Route for the /api/result API
app.get('/result', (req, res) => {
  try {
    const {
      adjustedBudget,
      ticketPrice,
      festivalSizes,
      ecologicalActions,
      culturalMediationActions,
      riskPreventionActions,
    } = req.query;

    // Fetch costs for the user’s selected choices
    const costBreakdown = {
      "festivalSizes": costMapping.festivalSizes[festivalSizes],
      "ecologicalActions": costMapping.ecologicalActions[ecologicalActions],
      "culturalMediationActions": costMapping.culturalMediationActions[culturalMediationActions],
      "riskPreventionActions": costMapping.riskPreventionActions[riskPreventionActions],
    };

    // Calculate percentages
    const percentages = {};
    for (const key in costBreakdown) {
      percentages[key] = ((costBreakdown[key] / adjustedBudget) * 100).toFixed(2);
    }

    // Prioritize choices based on cost contribution
    const priorities = Object.entries(costBreakdown)
      .sort((a, b) => b[1] - a[1]) // Sort descending by cost
      .map(([key, value]) => ({
        criterion: key,
        cost: value,
        percentage: percentages[key],
      }));


    // Predefined messages for each prioritized category
    const messages = loadResultData();

    // Prepare response data
    const responseData = {
      adjustedBudget: adjustedBudget,
      priorities: priorities.map(priority => ({
        ...priority,
        message: messages[priority.criterion],
      })),
      costBreakdown,
      percentages,
      choices: {
        festivalSizes,
        ecologicalActions,
        culturalMediationActions,
        riskPreventionActions,
      },
      ticketPrice,
    };

    // Send response as JSON
    res.json(responseData);
  } catch (error) {
    console.error('Error generating results:', error);
    res.status(500).json({ error: 'Error generating results' });
  }
});


  

// Export the app
module.exports = app;
