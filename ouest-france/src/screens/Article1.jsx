import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { scrollToSection } from '../utils';

// Enregistrer ScrollTrigger pour GSAP
gsap.registerPlugin(ScrollTrigger);

const Article1 = (data) => {
  const ballRef = useRef(); // Référence pour le paragraphe

  // test avec une timeline (pour enchainer plusieurs animations dans un ordre précis)
  const tl = gsap.timeline();

  useGSAP(() => {
    console.log("im here");
    // Utiliser la référence `paragraphRef.current` pour appliquer l'animation
    tl.to(ballRef.current, {
      scrollTrigger: {
        trigger: ballRef.current,
        start: "top 80%",
        end: "bottom 100px",
        markers: true,
        toggleActions: "restart pause reverse pause"
      },
      y: 200,
      rotation: 720,
      duration: 10,
    });
  });

  return (
    <section
  className="h-full w-full snap-start flex items-center justify-between px-8 py-12 bg-gray-100"
  id={"article" + data.data.id}
>
  {/* Conteneur pour l'image et le texte */}
  <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
    {/* Image */}
    <div className="flex-shrink-0 w-1/3">
      <img
        src={data.data.image}
        alt={data.data.title}
        className="w-full h-auto rounded-lg shadow-lg"
      />
    </div>
    
    {/* Contenu texte */}
    <div className="flex-grow w-2/3">
      <h1 className="text-3xl font-semibold text-gray-900 mb-4">{data.data.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{data.data.content}</p>
      <button
        onClick={() => scrollToSection(`quiz${data.data.id}`)}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Return to Quiz
      </button>
    </div>
  </div>
  
  {/* Animation au scroll */}
  <div >
    <img src="golf-ball.png" alt="golf-ball" ref={ballRef} className="w-16 h-auto"/>
  </div>
</section>


  );
};

export default Article1;
