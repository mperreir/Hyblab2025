'use strict';

// Load useful expressjs and nodejs modules
const express = require('express');
const path = require('path');
const fs = require('fs');
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
        console.log(BASE_URL)
        const response = await fetch('https://hyblab.polytech.univ-nantes.fr/londeporteuse/api/home');
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
      const response = await fetch('https://hyblab.polytech.univ-nantes.fr/londeporteuse/api/choices');
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
    const response = await fetch('https://hyblab.polytech.univ-nantes.fr/londeporteuse/api/budget');
    const data = await response.json();

    const initialBudget = req.query.initialBudget;
    const ticketPrice = req.query.ticketPrice;
    const festivalSize = req.query.festivalSize;

    data['ticketPrice'] = ticketPrice;
    data['budget']['cost'] = initialBudget;
    data['festivalSize'] = festivalSize;
    
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
    const response = await fetch('https://hyblab.polytech.univ-nantes.fr/londeporteuse/api/ajust');
    const data = await response.json();

    // Render the Mustache template with the fetched data
    res.render('ajustments.mustache', data);
  } catch (error) {
    console.error('Error fetching ajustment data:', error);
    res.status(500).send('Error loading the ajustment page');
  }
});


// Route for the result page
// app.get('/result', async (req, res) => {
//   try {
//     // Fetch data from the API endpoint
//     const response = await fetch('http://localhost:8080/londeporteuse/api/result');
//     const data = await response.json();

//     // Render the Mustache template with the fetched data
//     res.render('results.mustache', data);
//   } catch (error) {
//     console.error('Error fetching result data:', error);
//     res.status(500).send('Error loading the result page');
//   }
// });


const resultDataPath = path.join(__dirname, 'public/data/results.json');
const loadResultData = () => JSON.parse(fs.readFileSync(resultDataPath, 'utf8'));

const costMapping = {
  culturalMediationActions : { Petit: 19520, Moyen: 84800, Grand: 145611 },
  ecologicalActions : { Petit: 18116, Moyen: 99709, Grand: 671629 },
  festivalSizes : { Petit: 47300, Moyen: 187500, Grand: 2457000 },
  riskPreventionActions : { Petit: 0, Moyen: 12000, Grand: 25000 }
};


app.get('/result', (req, res) => {
  try {

    const adjustedBudget = parseFloat(req.query.adjustedBudget);
    const ticketPrice = parseFloat(req.query.ticketPrice);
    const festivalSizes = req.query.festivalSizes;
    const ecologicalActions = req.query.ecologicalActions;
    const culturalMediationActions = req.query.culturalMediationActions;
    const riskPreventionActions = req.query.riskPreventionActions;

    // Fetch costs for the user’s selected choices
    const costBreakdown = {
      "festivalSizes": costMapping.festivalSizes[festivalSizes],
      "ecologicalActions": costMapping.ecologicalActions[ecologicalActions],
      "culturalMediationActions": costMapping.culturalMediationActions[culturalMediationActions],
      "riskPreventionActions": costMapping.riskPreventionActions[riskPreventionActions],
    };

    // **Normalize costs by their average value**
    const avgCost = {
      festivalSizes: (costMapping.festivalSizes.Petit + costMapping.festivalSizes.Moyen + costMapping.festivalSizes.Grand) / 3,
      ecologicalActions: (costMapping.ecologicalActions.Petit + costMapping.ecologicalActions.Moyen + costMapping.ecologicalActions.Grand) / 3,
      culturalMediationActions: (costMapping.culturalMediationActions.Petit + costMapping.culturalMediationActions.Moyen + costMapping.culturalMediationActions.Grand) / 3,
      riskPreventionActions: (costMapping.riskPreventionActions.Petit + costMapping.riskPreventionActions.Moyen + costMapping.riskPreventionActions.Grand) / 3
    };

    const normalizedCosts = {};
    for (const key in costBreakdown) {
      normalizedCosts[key] = costBreakdown[key] / avgCost[key]; // Normalization
    }


     // **Sort priorities based on normalized cost impact**
     const priorities = Object.entries(normalizedCosts)
     .sort((a, b) => b[1] - a[1])
     .map(([key, value]) => ({
       criterion: key,
       cost: costBreakdown[key],
       normalizedCost: value
     }));

   // Get messages
   const messages = loadResultData();

   const priorityLabels = {
    festivalSizes: "UNE GRANDE TAILLE ",
    ecologicalActions: "L'ÉCOLOGIE",
    culturalMediationActions: "LA MÉDIATION CULTURELLE",
    riskPreventionActions: "LA PRÉVENTION DES RISQUES"
  };

  // Determine the highest-priority category
  const highestPriority = priorities.length > 0 ? priorities[0].criterion : null;
  const highestPriorityLabel = highestPriority ? priorityLabels[highestPriority] : "un élément inconnu";


    // Prepare response data
    const responseData = {
      adjustedBudget: adjustedBudget,
      priorities: priorities.map(priority => ({
        ...priority,
        message: messages[priority.criterion],
        label: priorityLabels[priority.criterion]
      })),
      costBreakdown,
      choices: {
        festivalSizes,
        ecologicalActions,
        culturalMediationActions,
        riskPreventionActions,
      },
      ticketPrice,
      highestPriority: highestPriorityLabel
    };

    // Send response as JSON
    res.render('results.mustache', responseData);
  } catch (error) {
    console.error('Error generating results:', error);
    res.status(500).json({ error: 'Error generating results' });
  }
});
  
// Route vers la page finale
app.get('/final', (req, res) => {
  res.render('finalPage.mustache'); // Rendu de la vue finalPage.mustache
});


// Export the app
module.exports = app;
