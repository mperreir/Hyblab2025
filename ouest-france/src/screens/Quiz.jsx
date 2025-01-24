import React from "react";
import { scrollToSection } from "../utils";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Typewriter from "../ui/Typewriter";

const Quiz = ({ data }) => {
  const [userAnswers, setUserAnswers] = useState(
    new Array(data.length).fill(null)
  );
  const [feedbacks, setFeedbacks] = useState(new Array(data.length).fill(""));
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(
    new Array(data.length).fill(null)
  );
  const [progress, setProgress] = useState((1 / data.length) * 100); // État pour suivre la progression
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1); // État pour suivre l'index de la question courante
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Réinitialiser les réponses et le score lorsque les données du quiz changent
    setUserAnswers(new Array(data.length).fill(null));
    setFeedbacks(new Array(data.length).fill(""));
    setScore(0);
    setAnswerStatus(new Array(data.length).fill(null));
    setProgress((1 / data.length) * 100);
    setCurrentQuestionIndex(1);
  }, [data]);

  const handleAnswerClick = (questionIndex, answer) => {
    const previousAnswer = userAnswers[questionIndex];
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);

    const question = data[questionIndex];
    const isCorrect = answer === question.correct_answer;
    const wasCorrect = previousAnswer === question.correct_answer;

    if (previousAnswer === null) {
      // First time answering
      if (isCorrect) {
        setScore(score + 1);
      }
    } else {
      // Changing the answer
      if (isCorrect && !wasCorrect) {
        setScore(score + 1);
      } else if (!isCorrect && wasCorrect) {
        setScore(score - 1);
      }
    }

    const newFeedbacks = [...feedbacks];
    newFeedbacks[questionIndex] = isCorrect
      ? "Correct ! "
      : "Incorrect. Essayez encore ! ";
    setFeedbacks(newFeedbacks);

    const newAnswerStatus = [...answerStatus];
    newAnswerStatus[questionIndex] = isCorrect ? "correct" : "incorrect"; // Mettre à jour l'état des réponses
    setAnswerStatus(newAnswerStatus);
  };

  return (
    <div className="h-screen w-screen overflow-x-auto snap-start snap-x snap-mandatory">
      <div className="flex h-full">
        {data.map((question, questionIndex) => (
          <section
            className="h-screen w-screen flex-shrink-0 bg-white snap-start flex items-center justify-center flex-col"
            id={"quiz" + questionIndex}
          >
            <div className="flex w-full h-full">
              <div className="w-1/3 h-full flex items-center justify-center">
                <div className="w-full h-full p-6">
                  <img
                    src="./pavon.jpg"
                    className="w-full h-full object-cover"
                  ></img>
                </div>
              </div>
              <div className="w-2/3 h-full flex flex-col">
                <div className="p-6 py-16 flex justify-start items-center w-full">
                  <h1 className="text-4xl font-bold">{question.question}</h1>
                </div>


                <div className="flex flex-wrap px-6 gap-4 w-full">
                  {question.answers.map((answer, answerIndex) => (
                    <button
                      key={answerIndex}
                      onClick={() => {
                        handleAnswerClick(questionIndex, answer);
                        console.log("userAnswers", userAnswers[questionIndex]);
                        console.log("answer", answer);
                      }}
                      className={`grow basis-[calc(50%-0.5rem)] p-4 text-lg rounded-lg border ${
                        userAnswers[questionIndex] === answer
                          ? answerStatus[questionIndex] === "correct"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-green-100 hover:bg-green-200"
                      }`}
                    >
                      {answer}
                    </button>
                  ))}
                </div>

                <div className="flex flex-row justify-between items-center w-full pl-6 pt-4 pb-6">
                  {feedbacks[questionIndex].startsWith("Correct") && (
                    <div className="bg-green-500 text-white p-4 rounded-lg">
                      <p className="text-xl">{feedbacks[questionIndex]}</p>
                    </div>
                  )}

                  {feedbacks[questionIndex].startsWith("Incorrect") && (
                    <div className="bg-red-500 text-white p-4 rounded-lg">
                      <p className="text-xl">{feedbacks[questionIndex]}</p>
                    </div>
                  )}

                  {feedbacks[questionIndex] == "" && (
                    <div className="w-0.5rem"></div>
                  )}
                </div>

                {feedbacks[questionIndex].startsWith("Correct") && (
                  <div className="w-full px-6">
                    <Typewriter
                      text={question.explanation}
                      speed={10}
                      onLoad={() => setIsTypingComplete(false)}
                      onComplete={() => setIsTypingComplete(true)}
                      className="text-justify text-lg"
                    />
                    {isTypingComplete && (
                    <div className="w-full flex justify-end">
                      <Button
                        className={"bg-green-100 hover:bg-green-200"}
                        onClick={() =>
                          scrollToSection(`article${questionIndex}`)
                        }
                      >
                        Aller à l'article
                      </Button>
                    </div>
                    )}
                  </div>
                )}
                <div className="flex justify-between items-end gap-4 w-full h-full p-6">
                  <div className="flex flex-start items-center flex-row gap-4 p-6 w-3/4">
                    <div className="relative w-full h-2 bg-gray-200">
                      <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                      <div
                        className="absolute top-1/2 w-4 h-4 bg-white border-2 border-grey-200 rounded-full transition-all duration-300 shadow-lg"
                        style={{
                          left: `${progress}%`,
                          transform: "translate(-50%, -50%)", // Centrage précis
                          marginLeft: progress === 100 ? "-8px" : "0", // Correction du débordement à 100%
                        }}
                      ></div>
                      <img
                        src="icon/red-flag.png"
                        alt="finish"
                        className="absolute bottom-full right-0 mr-[1.125rem] z-10 translate-x-full"
                        style={{
                          height: "50px", // Ajustez la hauteur
                          width: "auto", // Garde les proportions
                        }}
                      />
                    </div>
                    <div className="flex justify-start items-center w-1/4 ">
                      <p className="italic">
                        {currentQuestionIndex} / {data.length}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-end items-center gap-4">
                    {questionIndex > 0 && (
                      <Button
                        className={"bg-green-100 hover:bg-green-200"}
                        onClick={() => {
                          console.log(
                            "currentQuestionIndex",
                            currentQuestionIndex
                          );
                          setCurrentQuestionIndex(currentQuestionIndex - 1);
                          setProgress(
                            ((currentQuestionIndex - 1) / data.length) * 100
                          );
                          scrollToSection(`quiz${questionIndex - 1}`);
                        }}
                      >
                        <Icon src={"icon/arrow_left.svg"} />
                      </Button>
                    )}

                    {questionIndex < data.length - 1 && (
                      <Button
                        className={"bg-green-100 hover:bg-green-200"}
                        onClick={() => {
                          console.log(
                            "currentQuestionIndex",
                            currentQuestionIndex
                          );
                          setCurrentQuestionIndex(currentQuestionIndex + 1);
                          setProgress(
                            ((currentQuestionIndex + 1) / data.length) * 100
                          );
                          scrollToSection(`quiz${questionIndex + 1}`);
                        }}
                      >
                        <Icon src={"icon/arrow_right.svg"} />
                      </Button>
                    )}

                    {questionIndex === data.length - 1 && (
                      <Button
                        className={"bg-green-100 hover:bg-green-200"}
                        onClick={() => scrollToSection(`quizResults`)}
                      >
                        Voir les résultats
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
        <section
          className="h-screen w-screen flex-shrink-0 snap-start flex items-center justify-center flex-col"
          id="quizResults"
        >
          <h1 className="text-4xl font-bold">Résultats</h1>
          <p className="text-2xl">
            Votre score est de {score}/{data.length}
          </p>
          <button
            onClick={() => {
              setCurrentQuestionIndex(1);
              setProgress((1 / data.length) * 100);
              scrollToSection("quiz0");
            }}
          >
            Retour au Quiz
          </button>
        </section>
      </div>
    </div>
  );
};

export default Quiz;
