// src/screens/Home.jsx
import React from "react";
import { Link } from "react-scroll";

const Home = () => {

  const handleClick = () => {
    document.getElementById("choose-player").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      className="h-full w-full snap-start flex items-center justify-center flex-col bg-green-500"
      id="home"
    >
      <h1 className="text-4xl text-white">Bienvenue sur notre site</h1>
      <div className="bg-white">
      <button onClick={handleClick}>Aller à Choose Player</button>
    </div>
    </section>
  );
};

export default Home;
