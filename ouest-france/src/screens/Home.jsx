// src/screens/Home.jsx
import React from "react";
import { scrollToSection } from "../utils";

const Home = () => {

  return (
    <section
      className="h-full w-full snap-start flex items-center justify-center flex-col bg-green-500"
      id="home"
    >
      <h1 className="text-4xl text-white">Bienvenue sur notre site</h1>
      <div className="bg-white">
        <button onClick={() => {scrollToSection("choose-player")}}>
          Aller à Choose Player
        </button>
      </div>
    </section>
  );
};

export default Home;
