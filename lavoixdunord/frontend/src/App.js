import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import QuestionPage from "./QuestionPage/QuestionPage";
import DifficultyPage from "./DifficultyPage/DifficultyPage";
import Etape from "./EtapePage/Etape";
import RulesPage from "./pageRegles/pageRegles"
import homePage from "./homePage/homePage"
import page0 from "./page0/page0"
import credit from "./creditPage/creditPage"


function App() {
  //return <Etape />;
  //return <QuestionPage />;
  //return <page0 />
  //return <homePage />
  //return <RulesPage />;
  //return <credit />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Etape />} />
        <Route path="/etape/:id" element={<QuestionPage />} />
        <Route path="/difficulty" element={<DifficultyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
