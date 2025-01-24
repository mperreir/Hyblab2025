// src/screens/Home.jsx
import React from "react";
import { scrollToSection } from "../utils";

const Home = () => {

  return (
    <section
      className="h-full w-full snap-start flex items-center justify-center flex-col bg-green-500"
      id="home"
    >
      <h1 className="text-6xl fond-bold font-serif text-white">Bienvenue sur notre site</h1>
      <div className="bg-white">
        <button 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-600 transition"
          onClick={() => {scrollToSection("choose-player")}}>
          Aller à Choose Player
        </button>
      </div>
    </section>
  );
};

export default Home;
