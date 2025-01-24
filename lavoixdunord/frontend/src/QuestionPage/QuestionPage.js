import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Pour la navigation
import yaml from "js-yaml"; // Pour charger les questions depuis le YAML
import "./QuestionPage.css"; // Styles CSS
import { useParams } from "react-router-dom";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]); // Stocker les questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showHintText, setShowHintText] = useState(false);
  const [showHintImage, setShowHintImage] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false); // État pour agrandir l'image
  const [enlargedImage, setEnlargedImage] = useState(null); // Image à agrandir

  const basename = process.env.REACT_APP_BASENAME || "/";
  const navigate = useNavigate(); // Pour changer de page
  const { difficulty, id } = useParams(); // Récupère les paramètres de l'URL

  useEffect(() => {
    fetch(basename + "data/questions.yaml")
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

  // Fonction pour gérer le clic sur "SUIVANT" ou "FINIR"
  const handleNext = () => {
    if (!validated) {
      setValidated(true);
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptionIndex(null);
        setValidated(false);
        setShowHintText(false);
        setShowHintImage(false);
        setIsEnlarged(false); // Réinitialise l'agrandissement
      } else {
        navigate("/etape/" + (parseInt(id) + 1));
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setValidated(false);
        setShowHintText(false);
        setShowHintImage(false);
        setIsEnlarged(false);
      }
    }
  };

  // Fonction pour sélectionner une option
  const handleOptionClick = (index) => {
    setSelectedOptionIndex(index);
  };

  // Fonction pour agrandir/réduire l'image
  const toggleImageSize = (image) => {
    setEnlargedImage(image);
    setIsEnlarged(!isEnlarged);
    const container = document.querySelector(".question-container");
    if (!isEnlarged) {
      container.classList.add("blur-background");
    } else {
      container.classList.remove("blur-background");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {/* Fond sombre visible lorsque l'image est agrandie */}
      {isEnlarged && (
        <div
          className="overlay"
          onClick={() => {
            setIsEnlarged(false);
            setEnlargedImage(null);
            document.querySelector(".question-container").classList.remove("blur-background");
          }}
        >
          {enlargedImage && (
            <img
              src={`/${enlargedImage}`}
              alt="Indice"
              className="enlarged-image"
            />
          )}
        </div>
      )}

      <div className="question-container">
        <h2 className="question-number">
          QUESTION {currentQuestionIndex + 1}/{questions.length}
        </h2>

        <div className="question-box">
          <p className="question-text">{currentQuestion.text}</p>

          {/* Boutons pour les réponses */}
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
                <b>
                  <i>Un indice se cache dans cet article</i>
                </b>
              </a>
            </p>
          )}

          {/* Bouton "VALIDER" ou "SUIVANT" */}
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

          {/* Conteneur des indices */}
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
                disabled={!showHintText}
              >
                {showHintImage ? "−" : "+"}
              </button>
              <span className="hint-title">INDICE 2</span>
              {showHintImage && currentQuestion.hints.image && (
                <img
                  src={`/${currentQuestion.hints.image}`}
                  alt="Indice"
                  className="hint-img"
                  onClick={() => toggleImageSize(currentQuestion.hints.image)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionPage;
