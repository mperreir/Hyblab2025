// src/screens/Home.jsx
import React from "react";
import { Element } from "react-scroll";

const ChoosePlayer = () => {
  return (
    <section
      className="h-full w-full snap-start flex items-center justify-center bg-blue-500"
      id="choose-player"
    >
      <h1 className="text-4xl text-white">Choisissez votre joueur</h1>
    </section>
  );
};

export default ChoosePlayer;
