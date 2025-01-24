import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page0 from "./page0/page0";
import QuestionPage from "./QuestionPage/QuestionPage";
import DifficultyPage from "./DifficultyPage/DifficultyPage";
import Etape from "./EtapePage/Etape";
import HomePage from "./homePage/homePage";
import RulesPage  from "./pageRegles/pageRegles";

const basename = process.env.REACT_APP_BASENAME || "/";
function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Page0 />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/regles" element={<RulesPage />} />
        <Route path="/difficulty" element={<DifficultyPage />} />
        <Route path="/etape/:difficulty" element={<Etape />} />
        <Route path="/etape/:difficulty/:id" element={<QuestionPage />} />



      
      </Routes>
    </Router>
  );
}

export default App;