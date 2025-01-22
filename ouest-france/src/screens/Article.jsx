// src/screens/Home.jsx
import React from "react";

const Article = (data) => {

  return (
    <section
      className="h-full w-full snap-start flex items-center justify-center flex-col bg-pink-500"
      id="screen1"
    >
        <h1>{data.data.title}</h1>
    </section>
  );
};

export default Article;