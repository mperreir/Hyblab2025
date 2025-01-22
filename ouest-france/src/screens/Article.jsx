// src/screens/Home.jsx
import React from "react";
import { scrollToSection } from "../utils";

const Article = (data) => {

  return (
    <section
      className="h-full w-full snap-start flex items-center justify-center flex-col bg-pink-500"
      id={"article" + data.data.id}
    >
        <h1>{data.data.title}</h1>
        <p>{data.data.content}</p>
        <button onClick={() => scrollToSection(`quiz${data.data.id}`)}>Return to Quiz</button>
    </section>
  );
};

export default Article;