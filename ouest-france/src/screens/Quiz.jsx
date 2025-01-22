import React from "react";
import { scrollToSection } from "../utils";
import { useState } from "react";

const Quiz = ({ data }) => {

  const [userAnswers, setUserAnswers] = useState(new Array(data.length).fill(null));
  const [feedbacks, setFeedbacks] = useState(new Array(data.length).fill(""));
  
  const handleAnswerClick = (questionIndex, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
    
    const question = data[questionIndex];
    const isCorrect = answer === question.correct_answer;
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
              <button onClick={() => scrollToSection(`quiz${questionIndex - 1}`)}>
                Previous Question
              </button>
            )}

            {questionIndex < data.length - 1 && (
              <button onClick={() => scrollToSection(`quiz${questionIndex + 1}`)}>
                Next Question
              </button>
            )}

            <button onClick={() => scrollToSection(`article${questionIndex}`)}>Go To Article</button>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
