import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import QuestionPage from "./QuestionPage/QuestionPage";
import DifficultyPage from "./DifficultyPage/DifficultyPage";
import Etape from "./EtapePage/Etape";

function App() {
  //return <Etape />;
  //return <QuestionPage />;
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
