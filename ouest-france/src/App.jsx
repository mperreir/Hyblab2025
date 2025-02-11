// src/App.jsx
import React from "react";
import { useState, useEffect, useRef } from "react";
import { scrollToSection } from "./utils";

import Home from "./screens/Home/Home";
import ChoosePlayer from "./screens/ChoosePlayer/ChoosePlayer";
import Article from "./screens/Article/Article";
import Quiz from "./screens/Quiz";
import EndPage from "./screens/EndPage";
import BentoGrid from "./screens/Stats";

const App = () => {
  const baseUrl = `${window.location.origin}/nantes2025/ouest-france/api`;

  const [quizData, setQuizData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [choosenPlayer, setChoosenPlayer] = useState(null);

  // Gestion du clic sur un bouton dans ChoosePlayer
  const handleQuizSelection = async (quizKey, autoScroll = true) => {
    if (choosenPlayer == null || (choosenPlayer !== quizKey && autoScroll)) {
      //fetch l'api
      const quizFetch = await fetch(`${baseUrl}/${quizKey}/quiz`);
      const quizJson = await quizFetch.json();

      const articleFetch = await fetch(`${baseUrl}/${quizKey}/article`);
      const articleJson = await articleFetch.json();

      const statsFetch = await fetch(`${baseUrl}/${quizKey}/stats`);
      const statsJson = await statsFetch.json();

      setQuizData(quizJson);
      setArticleData(articleJson);
      setChoosenPlayer(quizKey);
      setStatsData(statsJson);
    }
    if (autoScroll) {
      scrollToSection("quiz0");
    }
  };

  return (
    <div className="app-container h-screen w-full overflow-y-scroll snap-y snap-mandatory [scroll-behavior:smooth]">
      <Home onSelectPlayer={handleQuizSelection} />
      <ChoosePlayer onSelectPlayer={handleQuizSelection} />
      {quizData && articleData && statsData && (
        <>
          <Quiz
            data={quizData}
            player={choosenPlayer}
            onSelectPlayer={handleQuizSelection}
          />
          <Article data={articleData} />
          <BentoGrid stats={statsData} player={choosenPlayer} />
        </>
      )}
      <EndPage />
    </div>
  );
};

export default App;
