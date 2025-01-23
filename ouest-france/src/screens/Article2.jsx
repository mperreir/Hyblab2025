import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { scrollToSection } from '../utils';

// Enregistrer ScrollTrigger pour GSAP
gsap.registerPlugin(ScrollTrigger);

const Article2 = (data) => {
  console.log(data.data.image)
  const paragraphRef = useRef(); // Référence pour le paragraphe

  // test avec une timeline (pour enchainer plusieurs animations dans un ordre précis)
  const tl = gsap.timeline();

  useGSAP(() => {
    // Utiliser la référence `paragraphRef.current` pour appliquer l'animation
    tl.to(paragraphRef.current, {
      x: 360,
      rotation: 360,
      duration: 10,
      backgroundColor: 'red',
    });
  });

  return (
            <section
        className="h-full w-full snap-start flex items-center justify-between px-8 py-12 bg-gray-100"
        id={"article" + data.data.id}
        >
        {/* Conteneur pour l'image et le texte */}
        <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
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
            
            {/* Image */}
            <div className="flex-shrink-0 w-1/3">
            <img
                src={data.data.image}
                alt={data.data.title}
                className="w-full h-auto rounded-lg shadow-lg"
            />
            </div>
        </div>
        
        {/* Animation au scroll */}
        <div>
            <p ref={paragraphRef} className="text-sm text-gray-500 mt-8">Ceci doit bouger quand je scroll</p>
        </div>
        </section>
  );
};

export default Article2;
