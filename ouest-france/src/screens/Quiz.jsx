import React from "react";

const Quiz = ({ data }) => {
  return (
    <section
      className="h-full w-full snap-start flex items-center justify-center flex-col bg-yellow-500"
      id="quiz"
    >
        <h1>{data.title}</h1>
    </section>
  );
};

export default Quiz;
