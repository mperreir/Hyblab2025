import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import yaml from "js-yaml";
import "./QuestionPage.css";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showHintText, setShowHintText] = useState(false);
  const [showHintImage, setShowHintImage] = useState(false);
  const { difficulty, id } = useParams(); // Récupère la difficulté et l'étape depuis l'URL
  const navigate = useNavigate();

  // Charger les questions depuis le fichier YAML
  useEffect(() => {
    fetch("/data/questions.yaml")
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text);
        setQuestions(data.game.levels[parseInt(difficulty) - 1].stages[parseInt(id) - 1].questions);
      })
      .catch((error) => console.error("Erreur de chargement YAML :", error));
  }, [difficulty, id]);

  if (questions.length === 0) {
    return <p>Chargement des questions...</p>;
  }

  const handleNext = () => {
    if (!validated) {
      setValidated(true); // Valide la réponse actuelle
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptionIndex(null);
        setValidated(false);
        setShowHintText(false);
        setShowHintImage(false);
      } else {
        navigate(`/etape/${difficulty}`); // Retourne à la liste des étapes
      }
    }
  };

  const handleOptionClick = (index) => {
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
              className={`answer-btn ${
                selectedOptionIndex === index ? "selected" : ""
              } ${
                validated
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
              disabled={validated}
            >
              {option.text}
            </button>
          ))}
        </div>

        {/* Lien vers l'article */}
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

        {/* Bouton Valider ou Suivant */}
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={selectedOptionIndex === null}
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
            <button
              className="toggle-btn"
              onClick={() => setShowHintText(!showHintText)}
            >
              {showHintText ? "−" : "+"}
            </button>
            <span className="hint-title">INDICE 1</span>
            {showHintText && (
              <p className="hint-text">{currentQuestion.hints.text}</p>
            )}
          </div>

          <div className="hint-item">
            <button
              className={`toggle-btn ${!showHintText ? "disabled" : ""}`}
              onClick={() => setShowHintImage(!showHintImage)}
              disabled={!showHintText} // Indice 2 dépend de l'ouverture d'Indice 1
            >
              {showHintImage ? "−" : "+"}
            </button>
            <span className="hint-title">INDICE 2</span>
            {showHintImage && currentQuestion.hints.image && (
              <img
                src={`/${currentQuestion.hints.image}`}
                alt="Indice visuel"
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
