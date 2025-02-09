import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import scenariosData from "../../src/data/choix_scenario.json"; // Assure que le fichier JSON est bien placé dans src/data
import BlocQuestionsComponent from "./BlocQuestionsComponent";

const ScenarioComponent = ({ onScenarioSelect }) => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const scenarioQuestion = scenariosData.question[0];

  const handleScenarioChoice = (response) => {
    setSelectedScenario(response.response_id);
    onScenarioSelect(response.next_scenario_id); // Passe à la phase suivante après sélection
  };

  if (!scenarioQuestion || !scenarioQuestion.responses) {
    return <Typography>No scenario question available.</Typography>;
  }

  return (
    
      
      <BlocQuestionsComponent
      questionData={scenarioQuestion}
      handleAnswer={handleScenarioChoice}
      direction={1}
      extraContent={
        scenarioQuestion.transition && scenarioQuestion.transition[0] ? (
          <Typography variant="h7" color="primary"  gutterBottom sx={{ textAlign: "center"}}>
            {scenarioQuestion.transition[0].text}
          </Typography>
        ) : null
      }
    />
  );
};

export default ScenarioComponent;
