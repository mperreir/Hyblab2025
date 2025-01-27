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
      const response = await fetch('http://localhost:8080/londeporteuse/api/submit-choices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userChoices),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to submit choices');
      }
  
      // Parse the JSON response
      const data = await response.json();
      console.log('Submission successful:', data);
  
      // Redirect or show confirmation message if needed
      window.location.href = '/londeporteuse/budget';
    } catch (error) {
      console.error('Error submitting choices:', error);
      alert('Une erreur est survenue lors de la soumission.');
    }
  }
  

  function calculateFestivalCostAndTicketPrice(choices, data) {
    // Find the matching scenario
    const scenario = data.find(
      (item) =>
        item["Médiation culturelle"] === choices[culturalMediationActions] &&
        item["Transition écologique"] === choices[ecologicalActions] &&
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
  
  // // Example usage:
  // const userChoices = {
  //   "Médiation culturelle": "Petit",
  //   "Transition écologique": "Petit",
  //   "Programmation et taille de l'événement": "Moyen",
  // };
  
  const result = calculateFestivalCostAndTicketPrice(userChoices, festivalData);
  console.log(`Total Cost: ${result.totalCost} €`);
  console.log(`Average Ticket Price: ${result.averageTicketPrice} €`);

