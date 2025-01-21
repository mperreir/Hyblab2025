// src/App.jsx
import React from 'react';
import { useState } from 'react';
import { scrollToSection } from './utils';

import Home from './screens/Home';
import ChoosePlayer from './screens/ChoosePlayer';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Quiz from './screens/Quiz';

const App = () => {

  const [quizData, setQuizData] = useState(null);

  // Exemple de données pour chaque quiz
  const quizzes = {
    quiz1: {
      title: "Quiz 1 : Les Bases",
      questions: [
        { question: "Quelle est la capitale de la France ?", answer: "Paris" },
        { question: "2 + 2 ?", answer: "4" },
      ],
    },
    quiz2: {
      title: "Quiz 2 : Avancé",
      questions: [
        { question: "Quelle est la formule chimique de l'eau ?", answer: "H2O" },
        { question: "Combien de continents y a-t-il ?", answer: "7" },
      ],
    },
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
      {quizData && <Quiz data={quizData} />}
    </div>
  );
};

export default App;
