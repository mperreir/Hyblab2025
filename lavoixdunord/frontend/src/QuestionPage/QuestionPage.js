import React, { useState, useEffect } from "react";
import yaml from "js-yaml"; // Pour lire le fichier YAML
import "./QuestionPage.css";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [validated, setValidated] = useState(false); // Indique si la réponse a été validée
  const [showHintText, setShowHintText] = useState(false);
  const [showHintImage, setShowHintImage] = useState(false);

  useEffect(() => {
    fetch("data/questions.yaml")
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text);
        setQuestions(data.game.levels[0].stages[0].questions);
      })
      .catch((error) => console.error("Erreur de chargement YAML :", error));
  }, []);

  if (questions.length === 0) {
    return <p>Chargement des questions...</p>;
  }

  const handleNext = () => {
    if (!validated) {
      // Si la réponse n'est pas encore validée, valider la réponse
      setValidated(true);
    } else {
      // Passer à la question suivante
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptionIndex(null); // Réinitialiser la sélection
        setValidated(false); // Réinitialiser l'état de validation
        setShowHintText(false);
        setShowHintImage(false);
      }
    }
  };

  const handleOptionClick = (index) => {
    // Permettre de modifier la réponse tant qu'elle n'est pas validée
    setSelectedOptionIndex(index);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="question-container">
      <h2 className="question-number">
        QUESTION {currentQuestionIndex + 1}/{questions.length}
      </h2>

      <div className="question-box">
        <p className="question-text">{currentQuestion.text}</p>

        <div className="answers">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`answer-btn ${selectedOptionIndex === index ? "selected" : "" // Surbrillance immédiate
                } ${validated
                  ? index === selectedOptionIndex
                    ? option.correct
                      ? "correct"
                      : "wrong"
                    : option.correct
                      ? "correct"
                      : ""
                  : ""
                }`}
              onClick={() => handleOptionClick(index)}
              disabled={validated} // Désactiver après validation
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Lien global vers l'article */}
        {currentQuestion.hints.link && (
          <p className="article-link">
            <a
              href={currentQuestion.hints.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Lien vers l'article
            </a>
          </p>
        )}
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={selectedOptionIndex === null} // Désactiver si aucune option n'est sélectionnée
        >
          {validated
            ? currentQuestionIndex < questions.length - 1
              ? "SUIVANT"
              : "FINIR"
            : "VALIDER"}
        </button>

        {/* Indices */}
        <div className="hints-container">
          <div className="hint-item">
            <button className="toggle-btn" onClick={() => setShowHintText(!showHintText)}>
              {showHintText ? "−" : "+"}
            </button>
            <span className="hint-title">INDICE 1</span>
            {showHintText && <p className="hint-text">{currentQuestion.hints.text}</p>}
          </div>

          <div className="hint-item">
            <button
              className={`toggle-btn ${!showHintText ? "disabled" : ""}`}
              onClick={() => setShowHintImage(!showHintImage)}
              disabled={!showHintText} // Désactiver le bouton si le 1ᵉʳ indice n'est pas ouvert
            >
              {showHintImage ? "−" : "+"}
            </button>
            <span className="hint-title">INDICE 2</span>
            {showHintImage && currentQuestion.hints.image && (
              <img
                src={`/${currentQuestion.hints.image}`}
                alt="Indice"
                className="hint-img"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
