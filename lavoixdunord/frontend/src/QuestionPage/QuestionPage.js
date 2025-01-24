import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import yaml from "js-yaml";
import "./QuestionPage.css";
import { useParams } from "react-router-dom";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showHintText, setShowHintText] = useState(false);
  const [showHintImage, setShowHintImage] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [score, setScore] = useState(0);
  const [hint1Used, setHint1Used] = useState(false);
  const [hint2Used, setHint2Used] = useState(false);

  const basename = process.env.REACT_APP_BASENAME || "/";
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(basename + "data/questions.yaml")
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text);
        setQuestions(data.game.levels[0].stages[parseInt(id) - 1].questions);
      })
      .catch((error) => console.error("Erreur de chargement YAML :", error));
  }, [id]);

  if (questions.length === 0) {
    return <p>Chargement des questions...</p>;
  }

  const handleNext = () => {
    if (!validated) {
      const isCorrect = questions[currentQuestionIndex].options[selectedOptionIndex].correct;

      if (!isCorrect) {
        setScore((prevScore) => prevScore + 15); // Ajouter 15 points si réponse incorrecte
      }
  
      setValidated(true);
      setScore((prevScore) => prevScore + 20); // Ajouter 20 points après validation
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptionIndex(null);
        setValidated(false);
        setShowHintText(false);
        setShowHintImage(false);
        setIsEnlarged(false);
        setHint1Used(false);
        setHint2Used(false);
      } else {
        navigate("/etape/" + (parseInt(id) + 1));
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setValidated(false);
        setShowHintText(false);
        setShowHintImage(false);
        setIsEnlarged(false);
        setHint1Used(false);
        setHint2Used(false);
      }
    }
  };

  const handleOptionClick = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleHint1Click = () => {
    if (!hint1Used) {
      setScore((prevScore) => prevScore + 5);
      setHint1Used(true);
    }
    setShowHintText(true);
  };

  const handleHint2Click = () => {
    if (!hint2Used && showHintText) {
      setScore((prevScore) => prevScore + 10);
      setHint2Used(true);
    }
    setShowHintImage(true);
  };

  const toggleImageSize = () => {
    setIsEnlarged(!isEnlarged);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="question-container">
      <h2 className="question-number">
        QUESTION {currentQuestionIndex + 1}/{questions.length}
      </h2>
      <h3 className="score">Score: {score}</h3>

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
          disabled={selectedOptionIndex === null}
        >
          {validated
            ? currentQuestionIndex < questions.length - 1
              ? "SUIVANT"
              : "FINIR"
            : "VALIDER"}
        </button>

        <div className="hints-container">
          <div className="hint-item">
            <button className="toggle-btn" onClick={handleHint1Click}>
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
              onClick={handleHint2Click}
              disabled={!showHintText}
            >
              {showHintImage ? "−" : "+"}
            </button>
            <span className="hint-title">INDICE 2</span>
            {showHintImage && currentQuestion.hints.image && (
              <img
                src={`/${currentQuestion.hints.image}`}
                alt="Indice"
                className={`hint-img ${isEnlarged ? "enlarged" : ""}`}
                onClick={toggleImageSize}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
