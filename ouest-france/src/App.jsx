// src/App.jsx
import React from 'react';
import { useState } from 'react';
import { scrollToSection } from './utils';

import Home from './screens/Home';
import ChoosePlayer from './screens/ChoosePlayer';
import Article from './screens/Article';
import Quiz from './screens/Quiz';

const App = () => {

  const baseUrl = `${window.location.origin}/ouest-france/api`;

  const [quizData, setQuizData] = useState(null);
  const [articleData, setArticleData] = useState(null)

  // Gestion du clic sur un bouton dans ChoosePlayer
  const handleQuizSelection = async (quizKey) => {

    //fetch l'api
    const quizFetch = await fetch(`${baseUrl}/${quizKey}/quiz`)
    const quizJson = await quizFetch.json()

    const articleFetch = await fetch(`${baseUrl}/${quizKey}/article`)
    const articleJson = await articleFetch.json()

    setQuizData(quizJson);
    setArticleData(articleJson)
  };

  const scrollToQuiz = () => {
    console.log("test")
    scrollToSection('quiz0');
  }

  return (
    <div className='h-screen w-full overflow-y-scroll snap-y snap-mandatory [scroll-behavior:smooth]'>
      <Home />
      <ChoosePlayer onSelectPlayer={handleQuizSelection} />
      {quizData && (
        <>
          <Quiz data={quizData} />
          <Article data={articleData[0]}/>
          <Article data={articleData[1]}/>
        </>
        )}
      {scrollToQuiz()}
    </div>
  );
};

export default App;
