import React, { useState } from "react";
import QuestionsComponent from "../components/QuestionsComponent";
import ScenarioChoiceComponent from "../components/ChoixScenarioComponent"
import IntroLayout from "../Layout/IntroductionLayout";

const QuestionsPage = () => {
    const [selectedScenario, setSelectedScenario] = useState(null);

    return (
        <IntroLayout>
            {selectedScenario ? (
                // Affiche QuestionsComponent avec le bon scénario
                <QuestionsComponent scenarioId={selectedScenario} />
            ) : (
                // Affiche le choix des scénarios
                <ScenarioChoiceComponent onScenarioSelect={setSelectedScenario} />
            )}
        </IntroLayout>
    );
};

export default QuestionsPage;
