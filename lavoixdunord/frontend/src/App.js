import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page0 from "./page0/page0";
import QuestionPage from "./QuestionPage/QuestionPage";
import DifficultyPage from "./DifficultyPage/DifficultyPage";
import Etape from "./EtapePage/Etape";
const basename = process.env.REACT_APP_BASENAME || "/";
function App() {
  return (
    <Router basename={basename}>
      <Routes>
        {/* Page par défaut : choix de difficulté */}
        <Route path="/difficulty" element={<DifficultyPage />} />
        {/* Page des étapes selon la difficulté */}
        <Route path="/etape/:difficulty" element={<Etape />} />
        {/* Page des questions selon la difficulté et l'étape */}
        <Route path="/etape/:difficulty/:id" element={<QuestionPage />} />
        <Route path="/" element={<Page0 />} />
      
      </Routes>
    </Router>
  );
}

export default App;