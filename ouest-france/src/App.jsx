// src/App.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { scrollToSection } from './utils';

import Home from './screens/Home';
import ChoosePlayer from './screens/ChoosePlayer/ChoosePlayer';
import Article1 from './screens/Article1';
import Article2 from './screens/Article2';
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
    setArticleData(articleJson);
    console.log('article json', articleJson);
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
          <Quiz data={quizData} />
          <Article1 data={articleData[0]}/>
          {/* <Article2 data={articleData[1]}/>
          <Article1 data={articleData[2]}/>
          <Article2 data={articleData[3]}/>
          <Article1 data={articleData[4]}/> */}
        </>
        )}
    </div>
  );
};

export default App;
