import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import QuestionPage from "./QuestionPage/QuestionPage";
import DifficultyPage from "./DifficultyPage/DifficultyPage";
import Etape from "./EtapePage/Etape";

function App() {
  return (
    <Router>
      <Routes>
        {/* Page par défaut : choix de difficulté */}
        <Route path="/" element={<DifficultyPage />} />
        {/* Page des étapes selon la difficulté */}
        <Route path="/etape/:difficulty" element={<Etape />} />
        {/* Page des questions selon la difficulté et l'étape */}
        <Route path="/etape/:difficulty/:id" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
