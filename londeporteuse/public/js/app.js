  // Store user choices
  const userChoices = {
    festivalSizes: null,
    ecologicalActions: null,
    culturalMediationActions: null,
    riskPreventionActions: null,
  };

  // Handle selection
  function selectOption(category, id, element) {
    // Update the user choices
    userChoices[category] = id;

    // Clear selection for all buttons in the same category
    const parent = element.closest('.choice-options');
    parent.querySelectorAll('.btn-choice').forEach(btn => {
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
      const response = await fetch('http://localhost:8080/londeporteuse/api/calculate-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userChoices),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch budget data');
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log('Submission successful:', data);
  
      // Redirect or show confirmation message if needed
      const budgetPageUrl = `/londeporteuse/budget?initialBudget=${data.totalCost}`;
      window.location.href = budgetPageUrl;

      // Update the UI
      document.getElementById('total-cost').textContent = `${result.totalCost} €`;
      document.getElementById('average-ticket-price').textContent = `${result.averageTicketPrice} €`;
    } catch (error) {
      console.error('Error fetching budget data:', error);
      alert('Une erreur est survenue lors de la soumission.');
    }
  }
  

  async function submitAdjustedChoices() {
    try {
      // Log user choices for debugging
      console.log('Submitting choices:', userChoices);
  
      // Send choices to the backend via a POST request
      const response = await fetch('http://localhost:8080/londeporteuse/api/validate-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userChoices),
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
        `/londeporteuse/result?adjustedBudget=${data.adjustedBudgetAndPrice.totalCost}
        &ticketPrice=${data.adjustedBudgetAndPrice.averageTicketPrice}
        &festivalSizes=${userChoices.festivalSizes}
        &ecologicalActions=${userChoices.ecologicalActions}
        &culturalMediationActions=${userChoices.culturalMediationActions}
        &riskPreventionActions=${userChoices.riskPreventionActions}`;
      } 
      else {
        alert ("Your choices exceed the allowed budget. Please adjust your selections.");
      }

    } catch (error) {
      console.error('Error adjusting budget data:', error);
      alert('Une erreur est survenue lors de la soumission.');
    }
  }
  