import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "./quizResults.css";
import { scrollToSection } from "../../utils";

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
      className={"h-full w-full snap-start flex items-center justify-center "}
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
          <h2 className="text-bold text-black text-2xl w-1/2">
            Félicitations, vous avez brillamment relevé le défi et prouvé vos
            connaissances sur le golf !
          </h2>
          <p className="italic text-s text-black w-2/5">
            Envie de continuer l’aventure ? Cliquez à droite pour découvrir le
            deuxième quiz et tester vos connaissances encore plus loin !
          </p>
        </div>

        <button
          onClick={() => {
            onSelectPlayer(choosenPlayer === "player1" ? "player2" : "player1");
            scrollToSection("quiz0");
          }}
          className="p-4 border-2 border-black rounded-lg hover:bg-[#CC2229] hover:text-white transition-all"
        >
          {choosenPlayer === "player1"
            ? "ARTICLE CELINE BOUTIER"
            : "ARTICLE MATTHIEU PAVON"}
        </button>
      </div>

      {choosenPlayer === "player1" && (
        <div className="choice right">
          <img src={"./boutier.jpg"} alt={"boutier"} />
          <h1 className="divider">La Machine</h1>
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
        <div className="choice right">
          <img src={"./pavon.jpg"} alt={"Pavon"} />
          <h1 className="divider">La Fusée</h1>
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
    </section>
  );
};

export default QuizResults;
