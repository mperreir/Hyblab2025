// src/screens/Home.jsx
import React from "react";

const ChoosePlayer = ({onSelectPlayer}) => {
  return (
    <section
      className="h-full w-full snap-start flex items-center justify-center bg-blue-500"
      id="choose-player"
    >
      <h1 className="text-4xl text-white">Choisissez votre joueur</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            onSelectPlayer("player1")
        }}
        >
          Matthieu PAVON
        </button>

        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => {
            onSelectPlayer("player2")
          }}
        >
          Celine BOUTIER
        </button>
    </section>
  );
};

export default ChoosePlayer;
