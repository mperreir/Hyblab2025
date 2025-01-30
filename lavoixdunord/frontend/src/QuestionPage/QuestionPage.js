import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import yaml from "js-yaml";
import "./QuestionPage.css";
import { useParams } from "react-router-dom";
import MapComponent from "../MapComponent/MapComponent";
import correctSoundFile from './sounds/rightanswer.mp3';
import wrongSoundFile from './sounds/wronganswer.mp3';

const QuestionPage = ({ isMuted, setIsMuted, showMap, setShowMap }) => {
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
  const [isEnlarged, setIsEnlarged] = useState(false); // État pour agrandir l'image

  const correctSound = new Audio(correctSoundFile);
  const wrongSound = new Audio(wrongSoundFile);


  const addScore = (value) => {
    const new_value = parseInt(score + value);
    localStorage.setItem("score", parseInt(new_value));
    setScore(new_value);
  };

  const hintRef = useRef(null);
  useEffect(() => {
    if (showHintText && hintRef.current) {
      setTimeout(() => {
        hintRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 300);
    }
  }, [showHintText, showHintImage]);


  useEffect(() => {
    fetch(basename + "data/questions.yaml")
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text);
        setQuestions(data.game.levels[parseInt(difficulty) - 1].stages[parseInt(id) - 1].questions);
      })
      .then(
        () => {
          setTimeout(() => {
            setShowMap({ btn: false, map: true });
          }, 1000);
        }
      )
      .catch((error) => console.error("Erreur de chargement YAML :", error));
  }, [difficulty, id]);

  if (questions.length === 0) {
    return <p>Chargement des questions...</p>;
  }

  const handleNext = () => {
    if (!validated) {
      const isCorrect = questions[currentQuestionIndex].options[selectedOptionIndex].correct;
      if (!isMuted) { // Only play sound if not muted
        isCorrect ? correctSound.play() : wrongSound.play();
      }
      const pointsToAdd = !isCorrect ? 35 : 20;
      addScore(pointsToAdd);
      setValidated(true);

      // maintenant la carte s'affiche avant la question
      // setShowMap({ btn: false, map: false });
    } else {

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

      // maintenant la carte s'affiche avant la question
      setShowMap({ btn: false, map: true });
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
    // maintenant la carte s'affiche avant la question
    // handleNext();
    setShowMap({ btn: false, map: false });
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

          <div className="hints-container" ref={hintRef}>
            <div className="hint-item">
              <button
                className="toggle-btn"
                onClick={() => {
                  setShowHintText(!showHintText)
                  if (showHintText) {
                    setShowHintImage(false); // This will automatically close "Indice 2" when "Indice 1" is closed
                  }
                }}
              >
                {showHintText ? "−" : "+"}
              </button>
              <span className="hint-title">INDICE 1</span>
              {showHintText && <p className="hint-text">{currentQuestion.hints.text}</p>}
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
                  className="hint-img"
                  onClick={() => setIsEnlarged(true)}
                />
              )}
            </div>
          </div>
        </div>

        <MapComponent
          difficulty={difficulty}
          level_id={id}
          currentQuestionIndex={currentQuestionIndex}
          onClose={() => onCloseMap()}
          isVisible={showMap.map}
        />

        <div className="my-4">&nbsp;</div>
      </div>
    </>
  );
};

export default QuestionPage;
