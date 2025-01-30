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
    result['festivalSize'] = userChoices.festivalSizes;
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


// app.post('/validate-budget', (req, res) => {
//   const userChoices = req.body.userChoices; // Get user choices from the request body
//   const initialBudget = req.body.budgetLimit;

//   try {
//     const maxAllowedBudget = initialBudget * 0.615;

//     const { isValid, result: { totalCost, averageTicketPrice } } = validateAdjustedBudget(
//       userChoices,
//       maxAllowedBudget
//     );

//     const result = { isValid, result: { totalCost, averageTicketPrice } }
    
//     res.json(result); // Send the result back to the client
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });  


app.post('/validate-budget', (req, res) => {
  try {
      const userChoices = req.body.userChoices; // Get user choices from the request body
      const initialFestivalCost = req.body.budgetLimit;
      const initialTicketPrice = req.body.initialTicketPrice;
      const missingAmount = initialFestivalCost * 0.385; // 38.5% du budget initial à compenser

      // Récupération des choix de l'utilisateur
      const { festivalSizes, ecologicalActions, culturalMediationActions, riskPreventionActions, ticketPrice } = userChoices;

      // const festivalData = loadFestivalData();
      // const result = calculateFestivalCostAndTicketPrice(userChoices, festivalData);
      // const ticketPrice = result.averageTicketPrice;

      // Coût total du festival ajusté selon les nouveaux choix
      const adjustedFestivalCost = 
          costMapping.festivalSizes[festivalSizes] +
          costMapping.ecologicalActions[ecologicalActions] +
          costMapping.culturalMediationActions[culturalMediationActions] +
          costMapping.riskPreventionActions[riskPreventionActions];

      // Comparaison avec l'ancien coût pour calculer les économies ou surcoûts
      const costDifference = initialFestivalCost - adjustedFestivalCost; // Économies (positif) ou surcoût (négatif)

      const spectatorsMapping = { Petit: 3000, Moyen: 15000, Grand: 70000 };

      // Calcul des revenus issus de la billetterie
      const spectators = spectatorsMapping[festivalSizes];

      //const initialTicketPrice = { Petit: 20, Moyen: 50, Grand: 150 }[festivalSizes];
      console.log(req.body.festivalSize)
      const initialSpectators = spectatorsMapping[req.body.festivalSize];
      console.log('initial spectators', initialSpectators)

      // Calcul du revenu billetterie initial
      const initialRevenueFromTickets = initialTicketPrice * initialSpectators;
      console.log(initialTicketPrice)

      // Déterminer combien de la billetterie initiale finançait réellement le festival (35.4% du coût initial)
      const initialInjectedAmount = (initialFestivalCost * 35.4) / 100;

      // Calcul du nouveau revenu billetterie après ajustement du prix du billet
      const newRevenueFromTickets = ticketPrice * spectators;
      console.log(ticketPrice)

      // Nouvelle part injectée dans le festival, en appliquant le ratio basé sur la billetterie initiale
      const newInjectedAmount = (newRevenueFromTickets / initialRevenueFromTickets) * initialInjectedAmount;

      // Différence entre l'ancienne et la nouvelle billetterie qui finance réellement le festival
      const additionalInjectedAmount = newInjectedAmount - initialInjectedAmount;
      console.log(missingAmount)
      console.log(costDifference)
      console.log(additionalInjectedAmount)

      // Déterminer si l’utilisateur a réussi à combler son déficit
      const balance = missingAmount - costDifference - additionalInjectedAmount;

      if (balance <= 0) {
          // Festival validé
          res.json({ isValid: true, adjustedBudget: adjustedFestivalCost, ticketPrice: ticketPrice });
      } else {
          // Budget non équilibré, demander à l'utilisateur d'ajuster encore ses choix
          res.json({ isValid: false, message: "Votre budget n'est pas équilibré. Vous devez encore réduire vos coûts ou augmenter vos revenus." });
      }

  } catch (error) {
      console.error("Erreur dans la validation du budget :", error);
      res.status(500).json({ error: "Erreur lors de la validation du budget." });
  }
});



// Export the app
module.exports = app;
