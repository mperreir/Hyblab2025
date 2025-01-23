import React from "react";
import { scrollToSection } from "../utils";
import { useState, useEffect } from "react";

const Quiz = ({ data }) => {
  const [userAnswers, setUserAnswers] = useState(
    new Array(data.length).fill(null)
  );
  const [feedbacks, setFeedbacks] = useState(new Array(data.length).fill(""));
  const [score, setScore] = useState(0);

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
      ? "Correct ! " + (question.explanation || "")
      : "Incorrect. Essayez encore ! ";
    setFeedbacks(newFeedbacks);
  };

  return (
    <div className="h-screen w-screen overflow-x-auto snap-start snap-x snap-mandatory">
      <div className="flex h-full">
        {data.map((question, questionIndex) => (
          <section
            className="h-screen w-screen flex-shrink-0 snap-start flex items-center justify-center flex-col bg-yellow-500"
            id={"quiz" + questionIndex}
          >
            <h1 className="text-4xl font-bold">{question.question}</h1>

            {question.answers.map((answer, answerIndex) => (
              <button
                key={answerIndex}
                onClick={() => handleAnswerClick(questionIndex, answer)}
                className={`p-4 text-lg rounded-lg border ${
                  userAnswers[questionIndex] === answer
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {answer}
              </button>
            ))}

            {feedbacks[questionIndex] && (
              <p className="mt-4 text-xl">{feedbacks[questionIndex]}</p>
            )}

            {questionIndex > 0 && (
              <button
                onClick={() => scrollToSection(`quiz${questionIndex - 1}`)}
              >
                Previous Question
              </button>
            )}

            {questionIndex < data.length - 1 && (
              <button
                onClick={() => scrollToSection(`quiz${questionIndex + 1}`)}
              >
                Next Question
              </button>
            )}

            {questionIndex === data.length - 1 && (
              <button onClick={() => scrollToSection("quizResults")}>
                View Results
              </button>
            )}

            <button onClick={() => scrollToSection(`article${questionIndex}`)}>
              Go To Article
            </button>
          </section>
        ))}
        <section
          className="h-screen w-screen flex-shrink-0 snap-start flex items-center justify-center flex-col bg-yellow-500"
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
