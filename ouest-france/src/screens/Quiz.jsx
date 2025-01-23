import React from "react";
import { scrollToSection } from "../utils";
import { useState, useEffect } from "react";

const Quiz = ({ data }) => {
  const [userAnswers, setUserAnswers] = useState(
    new Array(data.length).fill(null)
  );
  const [feedbacks, setFeedbacks] = useState(new Array(data.length).fill(""));
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(
    new Array(data.length).fill(null)
  );

  useEffect(() => {
    // Réinitialiser les réponses et le score lorsque les données du quiz changent
    setUserAnswers(new Array(data.length).fill(null));
    setFeedbacks(new Array(data.length).fill(""));
    setScore(0);
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
            className="h-screen w-screen flex-shrink-0 snap-start flex items-center justify-center flex-col"
            id={"quiz" + questionIndex}
          >
            <div className="flex w-full h-full p-[30px]">
              <div className="w-1/2 h-full flex items-center justify-center">
                <img
                  src="./pavon.jpg"
                  className="w-full h-full object-cover"
                ></img>
              </div>
              <div className="w-1/2 h-full flex flex-col justify-end">
                <div className="p-6 py-16 flex flex-col gap-4 w-full">
                  <p className="text-lg font-bold text-black">{question.question}</p>
                  <span className="accent h-[2px] w-[60%]"></span>
                </div>

                <div className="flex flex-wrap p-6 gap-4 w-full">
                  {question.answers.map((answer, answerIndex) => (
                    <button
                      key={answerIndex}
                      onClick={() => {
                        handleAnswerClick(questionIndex, answer);
                        console.log("userAnswers", userAnswers[questionIndex]);
                        console.log("answer", answer);
                      }}
                      className={`duration-300 ease-initial grow basis-[calc(50%-0.5rem)] p-4 text-lg rounded-lg border ${
                        userAnswers[questionIndex] === answer
                          ? answerStatus[questionIndex] === "correct"
                            ? "bg-green-500 text-white"
                            : "accent text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {answer}
                    </button>
                  ))}
                </div>

                <div className="flex flex-row justify-between items-center w-full px-6 py-4">
                  {feedbacks[questionIndex] && (
                    <div>
                      <p className="text-xl">{feedbacks[questionIndex]}</p>
                    </div>
                  )}

                  {feedbacks[questionIndex] == "" && (
                    <div className="w-0.5rem"></div>
                  )}
                </div>

                {feedbacks[questionIndex].startsWith("Correct") && (
                  <div className="w-full px-6">
                    <p className="text-justify">{question.explanation}</p>
                    <div className="w-full flex justify-end">
                      <button
                        className="text-lg rounded-lg border bg-white hover:bg-gray-100"
                        onClick={() =>
                          scrollToSection(`article${questionIndex}`)
                        }
                      >
                        Go To Article
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex justify-end items-end gap-4 w-full p-6">
                    {questionIndex > 0 && (
                      <button
                        className="text-lg rounded-lg border bg-white hover:bg-gray-100"
                        onClick={() =>
                          scrollToSection(`quiz${questionIndex - 1}`)
                        }
                      >
                        Previous Question
                      </button>
                    )}

                    {questionIndex < data.length - 1 && (
                      <button
                        className="text-lg rounded-lg border bg-white hover:bg-gray-100"
                        onClick={() =>
                          scrollToSection(`quiz${questionIndex + 1}`)
                        }
                      >
                        Next Question
                      </button>
                    )}

                    {questionIndex === data.length - 1 && (
                      <button
                        className="text-lg rounded-lg border bg-white hover:bg-gray-100"
                        onClick={() => scrollToSection("quizResults")}
                      >
                        View Results
                      </button>
                    )}
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
