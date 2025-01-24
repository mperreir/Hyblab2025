import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page0 from "./page0/page0";
import QuestionPage from "./QuestionPage/QuestionPage";
import DifficultyPage from "./DifficultyPage/DifficultyPage";
import Etape from "./EtapePage/Etape";
import HomePage from "./homePage/homePage";
import RulesPage from "./pageRegles/pageRegles";
import FinalPage from "./finalPage/finalPage";
import StartPage from "./startPage/startPage";
import TransitionPage1 from "./TransitionPage1/TransitionPage1";
import TransitionPage2 from "./TransitionPage2/TransitionPage2";
import TransitionPage3 from "./TransitionPage3/TransitionPage3";
import Credit from "./creditPage/creditPage";

const basename = process.env.REACT_APP_BASENAME || "/";
function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Page0 />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/regles" element={<RulesPage />} />
        <Route path="/difficulty" element={<DifficultyPage />} />
        <Route path="/start/:difficulty" element={<StartPage />} />
        <Route path="/start/:difficulty/:id" element={<QuestionPage />} />
        <Route path="/final" element={<FinalPage />} />
        {/* Page de transition 1 */}
        <Route path="/transition/:difficulty/1" element={<TransitionPage1 />} />
        {/* Page de transition 2 */}
        <Route path="/transition/:difficulty/2" element={<TransitionPage2 />} />
        {/* Page de transition 3 */}
        <Route path="/transition/:difficulty/3" element={<TransitionPage3 />} />
        {/* Page de credits */}
        <Route path="/credit" element={<Credit />} />


      </Routes>
    </Router>
  );
}

export default App;