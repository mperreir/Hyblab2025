import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "./quizResults.css";
import { scrollToSection } from "../../utils";
import Button from "../../ui/Button";

const QuizResults = ({
  ranking,
  quizLength,
  choosenPlayer,
  onSelectPlayer,
}) => {
  useEffect(() => {
    console.log(ranking);
  }, [ranking]);

  return (
    <section
      className={
        "relative h-full w-full snap-start flex items-center justify-center "
      }
      id="choose-player"
    >
      <div className="flex justify-center items-center flex-col gap-8 h-full w-full mr-[50%]">
        <ReactStars
          count={quizLength}
          value={ranking !== undefined ? ranking : 0}
          size={100}
          activeColor="#CC2229"
          isHalf={false}
          edit={false}
          key={`stars-${ranking}`}
        />
        <div className="flex justify-center items-center flex-col gap-4 w-full text-center">
          {ranking === quizLength && (
            <h2 className="text-bold text-black text-2xl w-1/2">
              Félicitations, vous avez brillamment relevé le défi et prouvé vos
              connaissances sur le golf !
            </h2>
          )}

          {ranking !== quizLength && (
            <h2 className="text-bold text-black text-2xl w-1/2">
              Vous avez obtenu un score de {ranking}/{quizLength} ! Vous avez
              encore des progrès à faire, mais ne vous inquiétez pas, vous
              pouvez retenter votre chance autant de fois que vous le souhaitez.
            </h2>
          )}

          <p className="italic text-s text-black w-2/5">
            Envie de continuer l’aventure ? Cliquez à droite pour découvrir le
            deuxième quiz et tester vos connaissances encore plus loin !
          </p>
        </div>

        <button
          onClick={() => {
            scrollToSection("article0");
          }}
          className="p-4 border-2 border-black rounded-lg hover:bg-[#CC2229] hover:text-white transition-all"
        >
          {choosenPlayer === "player1"
            ? "ARTICLE MATTHIEU PAVON"
            : "ARTICLE CELINE BOUTIER"}
        </button>
      </div>

      {choosenPlayer === "player1" && (
        <div className="choice right">
          <div className="img-container">
            <img src={"./boutier.jpg"} alt={"boutier"} />
            <h1 className="divider">La Machine</h1>
          </div>
          <div className="content">
            <h1>Celine BOUTIER</h1>
            <p>
              Golfeuse française de renom et multiple championne sur le circuit
              LPGA Celine est une figure emblématique du golf féminin. Elle est
              reconnue pour sa précision, sa constance et son rôle de modèle
              dans le sport.
            </p>
            <button
              onClick={() => {
                onSelectPlayer(
                  choosenPlayer === "player1" ? "player2" : "player1"
                );
                scrollToSection("quiz0");
              }}
              className="contained"
            >
              Quiz
            </button>
          </div>
        </div>
      )}

      {choosenPlayer === "player2" && (
        <div className="choice right pavon">
          <div className="img-container">
            <img src={"./pavon.jpg"} alt={"Pavon"} />
            <h1 className="divider">Le Phoenix</h1>
          </div>
          <div className="content">
            <h1>Matthieu PAVON</h1>
            <p>
              Matthieu Pavon est un golfeur professionnel français évoluant sur
              le circuit européen, connu pour sa puissance au drive et ses
              performances prometteuses dans les grands tournois. Il incarne
              l'avenir du golf masculin en France.
            </p>
            <button
              onClick={() => {
                onSelectPlayer(
                  choosenPlayer === "player1" ? "player2" : "player1"
                );
                scrollToSection("quiz0");
              }}
              className="contained"
            >
              Quiz
            </button>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-2">
        <Button
          className={
            "bg-white border-black hover:bg-[#CC2229] hover:text-white transition-colors duration-300 ease-in-out"
          }
          onClick={() => {
            scrollToSection(`quiz${quizLength - 1}`);
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
      </div>
    </section>
  );
};

export default QuizResults;
