  // Store user choices
  const userChoices = {
    festivalSizes: getQueryParam("festivalSize") ?? null,
    ecologicalActions: getQueryParam("ecologicalActions") ?? null,
    culturalMediationActions: getQueryParam("culturalMediationActions") ?? null,
    riskPreventionActions: getQueryParam("riskPreventionActions") ?? null,
    ticketPrice: null,
  };

  // Handle selection
  function selectOption(category, id, element) {
    // Update the user choices
    userChoices[category] = id;

    // Clear selection for all buttons in the same category
    const parent = element.closest('.choice-group');
    parent.querySelectorAll('.choice-info').forEach(btn => {
      btn.classList.remove('selected');
    });

    // Add the "selected" class to the clicked button
    element.classList.add('selected');
  }

  // Submit choices to the backend
  // Submit choices to the backend
async function submitChoices() {
    try {
      // Log user choices for debugging
      console.log('Submitting choices:', userChoices);
  
      // Send choices to the backend via a POST request
      const response = await fetch(`api/calculatebudget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userChoices),
      });

      console.log(response)
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch budget data');
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log('Submission successful:', data);
  
      // Redirect or show confirmation message if needed
      const budgetPageUrl = `budget?initialBudget=${data.totalCost}&ticketPrice=${data.averageTicketPrice}&festivalSize=${data.festivalSize}&ecologicalActions=${data.ecologicalActions}&culturalMediationActions=${data.culturalMediationActions}&riskPreventionActions=${data.riskPreventionActions}`;
      window.location.href = budgetPageUrl;

      // Update the UI
      // document.getElementById('total-cost').innerText = `${result.totalCost} €`;
      // document.getElementById('average-ticket-price').innerText = `${result.averageTicketPrice} €`;
    } catch (error) {
      console.error('Error fetching budget data:', error);
      alert('Une erreur est survenue lors de la soumission.');
    }
  }
  

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }


  // Récupérer le prix initial du billet depuis l'URL
function getInitialTicketPrice() {
  return getQueryParam("ticketPrice"); 
}

// Mettre à jour l'affichage du prix du billet
function updateTicketPrice(value) {
  document.getElementById("ticketPriceDisplay").textContent = value;
  userChoices.ticketPrice = parseFloat(value);
}

// Initialiser le slider avec le prix du billet avant ajustement
function initTicketPriceSlider() {
  const initialPrice = getInitialTicketPrice();
  const slider = document.getElementById("ticketPriceSlider");
  
  slider.value = initialPrice;
  updateTicketPrice(initialPrice); // Met à jour l'affichage et userChoices
}

  async function submitAdjustedChoices() {
    try {
      // Log user choices for debugging
      console.log('Submitting choices:', userChoices);
      const budgetLimit = getQueryParam('budgetLimit');
      const initialTicketPrice = getQueryParam('ticketPrice')
      const festivalSize = getQueryParam('festivalSize');
  
      // Send choices to the backend via a POST request
      const response = await fetch('api/validate-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userChoices, budgetLimit, initialTicketPrice, festivalSize}),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed somewhere');
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log('Submission successful:', data);
  
      if (data.isValid) {
        // Redirect or show confirmation message if needed
        window.location.href = 
        `result?adjustedBudget=${data.adjustedBudget}&ticketPrice=${data.ticketPrice}&festivalSizes=${userChoices.festivalSizes}&ecologicalActions=${userChoices.ecologicalActions}&culturalMediationActions=${userChoices.culturalMediationActions}&riskPreventionActions=${userChoices.riskPreventionActions}`;
      } 
      else {
        alert (data.message);
      }

    } catch (error) {
      console.error('Error adjusting budget data:', error);
      alert('Une erreur est survenue lors de la soumission.');
    }
  }

  function preselectUserChoices() {
    Object.keys(userChoices).forEach(category => {
        const selectedId = userChoices[category];
        if (selectedId) {
          console.log(selectedId)
            const element = document.querySelector(`.choice-section [data-id="${selectedId}"][category="${category}"] `);
            console.log(element)
            if (element) {
                selectOption(category, selectedId, element);
            }
        }
    });
}

// Run preselection logic when the page loads
document.addEventListener("DOMContentLoaded", preselectUserChoices);
  

// Lancer l'initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", initTicketPriceSlider);