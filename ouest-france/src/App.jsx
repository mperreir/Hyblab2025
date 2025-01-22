// src/App.jsx
import React from 'react';
import { useState } from 'react';
import { scrollToSection } from './utils';

import Home from './screens/Home';
import ChoosePlayer from './screens/ChoosePlayer';
import Article1 from './screens/Article1';
import Article2 from './screens/Article2';
import Quiz from './screens/Quiz';

const App = () => {

  const [quizData, setQuizData] = useState(null);

  // Exemple de données pour chaque quiz
  const quizzes = {
    player1 : {
      quiz : {
        questions : [
          {
            question : "En quel année est née Matthieu PAVON ?",
            answers : ["2002", "2000", "1998", "1995"],
            correct_answer : "1998",
          },
        ],
        articles : [
          {
            title : "Les débuts de Matthieu PAVON",
            content : "Test"
          }
        ]
      }

    }
  };

  // Gestion du clic sur un bouton dans ChoosePlayer
  const handleQuizSelection = (quizKey) => {
    setQuizData(quizzes[quizKey]);
    scrollToSection("quiz");
  };

  return (
    <div className='h-screen w-full overflow-y-scroll snap-y snap-mandatory [scroll-behavior:smooth]'>
      <Home />
      <ChoosePlayer onSelectPlayer={handleQuizSelection} />
      {quizData && (
        <>
          <Quiz data={quizData} />
          <Article1/>
          <Article2/>
        </>
        )}
    </div>
  );
};

export default App;
