import React from "react";
import { scrollToSection } from "../utils";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import Typewriter from "../ui/Typewriter";
import { useInView } from "react-intersection-observer";
import "../main.css";
import QuizResults from "./QuizResults/QuizResults";

const Quiz = ({ data, player, onSelectPlayer }) => {

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

  const observers = data.map((_, index) => {
    const [ref, inView] = useInView({
      threshold: 0.5,
      root: document.querySelector(".snap-x"),
    });

    useEffect(() => {
      if (inView) {
        setIsTypingComplete(false);
        setCurrentQuestionIndex(index + 1);
        setProgress(((index + 1) / data.length) * 100);
      }
    }, [inView]);

    return ref;
  });

  return (
    <div className="h-screen w-screen overflow-x-auto snap-start snap-x snap-mandatory">
      <div className="flex h-full">
        {data.map((question, questionIndex) => (
          <section
            className="h-screen w-screen flex-shrink-0 bg-white snap-start flex items-center justify-center flex-col"
            id={"quiz" + questionIndex}
            ref={observers[questionIndex]}
          >
            <div className="flex w-full h-full">
              <div className="w-1/2 h-full flex items-center justify-center">
                <div className="w-full h-full p-6">
                  <img
                    src="./pavon.jpg"
                    className="w-full h-full object-cover"
                  ></img>
                </div>
              </div>
              <div className="w-1/2 h-full flex flex-col justify-end">
                <div className="p-6 py-16 flex flex-col gap-4 w-full">
                  <p className="text-2xl font-bold text-black">
                    {question.question}
                  </p>
                  <span className="accent h-[2px] w-full"></span>
                </div>

                <div className="flex flex-wrap px-6 gap-4 w-full">
                  {question.answers.map((answer, answerIndex) => (
                    <button
                      key={answerIndex}
                      onClick={() => {
                        handleAnswerClick(questionIndex, answer);
                      }}
                      className={`duration-300 ease-initial grow basis-[calc(50%-0.5rem)] p-4 text-lg rounded-lg border ${
                        userAnswers[questionIndex] === answer
                          ? answerStatus[questionIndex] === "correct"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-white border-black hover:bg-[#CC2229] hover:text-white"
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
                  </div>
                )}

                <div className="flex items-end gap-4 w-full h-full px-6">
                  <div className="flex justify-between w-full">
                    {questionIndex > 0 && (
                      <Button
                        className={
                          "bg-white border-black hover:bg-[#CC2229] hover:text-white transition-colors duration-300 ease-in-out"
                        }
                        onClick={() => {
                          setCurrentQuestionIndex(currentQuestionIndex - 1);
                          setProgress(
                            ((currentQuestionIndex - 1) / data.length) * 100
                          );
                          scrollToSection(`quiz${questionIndex - 1}`);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                          />
                        </svg>
                      </Button>
                    )}

                    {questionIndex === 0 && (
                      <Button
                        className={
                          "bg-white border-black hover:bg-[#CC2229] hover:text-white transition-colors duration-300 ease-in-out pointer-events-none opacity-0"
                        }
                        onClick={() => {
                          setCurrentQuestionIndex(currentQuestionIndex + 1);
                          setProgress(
                            ((currentQuestionIndex + 1) / data.length) * 100
                          );
                          scrollToSection(`quiz${questionIndex + 1}`);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                          />
                        </svg>
                      </Button>
                    )}

                    <div className="relative">
                      <div className="relative w-full">
                        <Button
                          className={
                            "bg-white border-black hover:bg-[#CC2229] hover:text-white transition-colors duration-300 ease-in-out"
                          }
                          onClick={() =>
                            scrollToSection(`article${questionIndex}`)
                          }
                        >
                          {question.articleBtn}
                        </Button>
                      </div>
                    </div>

                    {questionIndex < data.length - 1 && (
                      <Button
                        className={
                          "bg-white border-black hover:bg-[#CC2229] hover:text-white transition-colors duration-300 ease-in-out"
                        }
                        onClick={() => {
                          setCurrentQuestionIndex(currentQuestionIndex + 1);
                          setProgress(
                            ((currentQuestionIndex + 1) / data.length) * 100
                          );
                          scrollToSection(`quiz${questionIndex + 1}`);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"
                          />
                        </svg>
                      </Button>
                    )}

                    {questionIndex === data.length - 1 && (
                      <Button
                        className={
                          "bg-white border-black hover:bg-[#CC2229] hover:text-white transition-colors duration-300 ease-in-out"
                        }
                        onClick={() => scrollToSection(`quizResults`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"
                          />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex flex-start items-center flex-row gap-4 p-6 w-full">
                  <div className="flex justify-start items-cente w-[3rem] ">
                    <p className="italic text-black">
                      {currentQuestionIndex} / {data.length}
                    </p>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200">
                    <div
                      className="h-full bg-[#CC2229] transition-all duration-300"
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
          <QuizResults ranking={score} quizLength={data.length} choosenPlayer={player} onSelectPlayer={onSelectPlayer} />          
        </section>
      </div>
    </div>
  );
};

export default Quiz;
