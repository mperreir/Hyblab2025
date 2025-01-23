import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import QuestionPage from "./QuestionPage/QuestionPage";
import Etape from "./EtapePage/Etape";

function App() {
  //return <Etape />;
  //return <QuestionPage />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Etape />} />
        <Route path="/etape1" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
