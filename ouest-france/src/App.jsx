// src/App.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { scrollToSection } from './utils';

import Home from './screens/Home/Home';
import ChoosePlayer from './screens/ChoosePlayer/ChoosePlayer';
import Article from './screens/Article';
import Quiz from './screens/Quiz';
import EndPage from './screens/EndPage';

const App = () => {

  const baseUrl = `${window.location.origin}/ouest-france/api`;

  const [quizData, setQuizData] = useState(null);
  const [articleData, setArticleData] = useState(null)
  const [choosenPlayer, setChoosenPlayer] = useState("")

  // Gestion du clic sur un bouton dans ChoosePlayer
  const handleQuizSelection = async (quizKey) => {

    setChoosenPlayer(quizKey)

    //fetch l'api
    const quizFetch = await fetch(`${baseUrl}/${quizKey}/quiz`)
    const quizJson = await quizFetch.json()

    const articleFetch = await fetch(`${baseUrl}/${quizKey}/article`)
    const articleJson = await articleFetch.json()

    setQuizData(quizJson);
    setArticleData(articleJson)
  };

  useEffect(() => {
    if (quizData && articleData) {
      scrollToSection('quiz0');
    }
  }, [quizData, articleData]);

  return (
    <div className='h-screen w-full overflow-y-scroll snap-y snap-mandatory [scroll-behavior:smooth]'>
      <Home />
      <ChoosePlayer onSelectPlayer={handleQuizSelection} />
      {quizData && (
        <>
          <Quiz data={quizData} player={choosenPlayer} onSelectPlayer={handleQuizSelection} />
          <Article data={articleData[0]}/>
          <Article data={articleData[1]}/>
        </>
        )}
      <EndPage />
    </div>
  );
};

export default App;
