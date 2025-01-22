import React from "react";
import { scrollToSection } from "../utils";

const Quiz = ({ data }) => {
  return (
    <div className="h-screen w-screen overflow-x-auto snap-start snap-x snap-mandatory">
      <div className="flex h-full">
        {/* Premier écran */}
        <section className="h-screen w-screen flex-shrink-0 snap-start flex items-center justify-center flex-col bg-yellow-500" id="1">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <button onClick={() => scrollToSection('2')}>Next Question</button>
        </section>

        {/* Deuxième écran */}
        <section className="h-screen w-screen flex-shrink-0 snap-start flex items-center justify-center flex-col bg-blue-500" id="2">
          <h2 className="text-4xl font-bold">Deuxième écran</h2>
          <button onClick={() => scrollToSection('3')}>Next Question</button>
          <button onClick={() => scrollToSection('1')}>Previous Question</button>
        </section>

        {/* Troisième écran */}
        <section className="h-screen w-screen flex-shrink-0 snap-start flex items-center justify-center flex-col bg-green-500" id="3">
          <h2 className="text-4xl font-bold">Troisième écran</h2>
          <button onClick={() => scrollToSection('2')}>Previous Question</button>
        </section>
      </div>
    </div>
  );
};

export default Quiz;
