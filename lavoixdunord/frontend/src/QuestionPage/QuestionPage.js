import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import yaml from "js-yaml";
import "./QuestionPage.css";
import { useParams } from "react-router-dom";
import MapComponent from "../MapComponent/MapComponent";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showHintText, setShowHintText] = useState(false);
  const [showHintImage, setShowHintImage] = useState(false);
  const [score, setScore] = useState(parseInt(localStorage.getItem("score")) || 0);
  const [hint1Used, setHint1Used] = useState(false);
  const [hint2Used, setHint2Used] = useState(false);
  const basename = process.env.REACT_APP_BASENAME || "/";
  const navigate = useNavigate(); // Initialisation de useNavigate
  const { difficulty, id } = useParams(); // Récupère les paramètres de l'URL
  const [showMap, setShowMap] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false); // État pour agrandir l'image



  const addScore = (value) => {
    const new_value = parseInt(score + value);
    localStorage.setItem("score", parseInt(new_value));
    setScore(new_value);
  };

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

  const handleNext = () => {
    if (!validated) {
      const isCorrect = questions[currentQuestionIndex].options[selectedOptionIndex].correct;
      const pointsToAdd = !isCorrect ? 35 : 20; // 35 points si incorrect (15 + 20), 20 si correct
      addScore(pointsToAdd);
      setValidated(true);

    } else {
      setShowMap(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptionIndex(null);
        setValidated(false);
        setShowHintText(false);
        setShowHintImage(false);
        setIsEnlarged(false); // Réinitialiser l'agrandissement de l'image
        setHint1Used(false);
        setHint2Used(false);
      } else {
        navigate("/transition/" + (parseInt(difficulty)) + "/" + (parseInt(id)));
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

  const handleOptionClick = (index) => {
    setSelectedOptionIndex(index);
  };


  const handleHint1Click = () => {
    if (!hint1Used) {
      addScore(5);
      setHint1Used(true);
    }
    setShowHintText(true);
  };

  const handleHint2Click = () => {
    if (!hint2Used && showHintText) {
      addScore(10);
      setHint2Used(true);
    }
    setShowHintImage(true);
  };

  const toggleImageSize = () => {
    setIsEnlarged(!isEnlarged);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const onCloseMap = () => {
    handleNext();
    setShowMap(false);
  }

  return (
    <>
      {/* Gestion de l'image agrandie avec flou */}
      {isEnlarged && (
        <div className="overlay" onClick={() => setIsEnlarged(false)}>
          <img
            src={`/${currentQuestion.hints.image}`}
            alt="Indice agrandi"
            className="enlarged-image"
          />
        </div>
      )}

      {/* Ajout dynamique de la classe pour flouter le contenu */}
      <div className={`question-container bg_gradient_fond_vague ${isEnlarged ? "blur-background" : ""}`}>
        <h2 className="question-number">
          QUESTION {currentQuestionIndex + 1}/{questions.length}
        </h2>

        <div className="question-box">
          <p className="question-text">{currentQuestion.text}</p>

          <div className="answers">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`answer-btn ${selectedOptionIndex === index ? "selected" : ""} ${validated
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

          {validated && (
            <button type="button" onClick={() => { setShowMap(true) }}
              className="btn btn-sm btn-outline-warning me-2 p-2 text-uppercase fw-bold fs-6">Voir sur la carte</button>
          )}
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

          {currentQuestion.hints.link && (
            <p className="article-link">
              <a
                href={currentQuestion.hints.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <b><i>Un indice se cache <br></br>dans cet article</i></b>
              </a>

            </p>
          )}

          <div className="hints-container">
            <div className="hint-item">
              <button
                className="toggle-btn"
                onClick={() => setShowHintText(!showHintText)}
              >
                {showHintText ? "−" : "+"}
              </button>
              <span className="hint-title">INDICE 1</span>
              {showHintText && <p className="hint-text">{currentQuestion.hints.text}</p>}
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
                  onClick={() => setIsEnlarged(true)}
                />
              )}
            </div>
          </div>
        </div>

        {showMap && (
          <MapComponent
            questions={questions}
            difficulty={difficulty}
            level_id={id}
            currentQuestionIndex={currentQuestionIndex}
            onClose={() => onCloseMap()}
          />
        )}
      </div>
    </>
  );
};

export default QuestionPage;
