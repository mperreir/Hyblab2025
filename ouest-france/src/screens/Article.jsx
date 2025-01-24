import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { scrollToSection } from '../utils';

// Enregistrer ScrollTrigger pour GSAP
gsap.registerPlugin(ScrollTrigger);

const Article1 = ({ data }) => {
  const ballRef = useRef(); 
  const sectionRef = useRef(); 

  useEffect(() => {
    gsap.fromTo(
      ballRef.current,
      { y: 0 },
      {
        y: "50vh",
        duration: 1.5, 
        ease: "power2.out",
      }
    );
  }, []);

  useGSAP(() => {
    console.log("im here");

    gsap.to(
      ballRef.current,
      {
        y: "100vh",
        ease: "none",
        rotation:720,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scroller: ".app-container",
          markers: true, 
          scrub: true, 
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative">

      {/* Animation au scroll */}
      <div className="absolute top-4 right-4 transform -translate-x-1/2">
        <img src="golf-ball.png" alt="golf-ball" ref={ballRef} className="w-16 h-auto"/>
      </div>

      {/* Partie 1 */}
      <section
      className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 bg-gray-100 relative"
      id={"article" + data[0].id}>
        <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
          <div className="flex-shrink-0 w-1/3">
            <img
              src={data[0].image}
              alt={data[0].title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-grow w-2/3">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">{data[0].title}</h1>
            <p className="text-lg text-gray-700 mb-6">{data[0].content}</p>
            <button
              onClick={() => scrollToSection(`quiz${data[0].id}`)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Return to Quiz
            </button>
          </div>
        </div>
      </section>


      {/* Partie 2 */}
      <section
      className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 bg-gray-100 relative"
      id={"article" + data[1].id}
    >
      <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
        <div className="flex-shrink-0 w-1/3">
          <img
            src={data[1].image}
            alt={data[1].title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-grow w-2/3">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{data[1].title}</h1>
          <p className="text-lg text-gray-700 mb-6">{data[1].content}</p>
          <button
            onClick={() => scrollToSection(`quiz${data[1].id}`)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Return to Quiz
          </button>
        </div>
      </div>
    </section>

    {/* Partie 3 */}
    <section
      className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 bg-gray-100 relative"
      id={"article" + data[2].id}
    >
      <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
        <div className="flex-shrink-0 w-1/3">
          <img
            src={data[2].image}
            alt={data[2].title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-grow w-2/3">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{data[2].title}</h1>
          <p className="text-lg text-gray-700 mb-6">{data[2].content}</p>
          <button
            onClick={() => scrollToSection(`quiz${data[2].id}`)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Return to Quiz
          </button>
        </div>
      </div>
    </section>

    {/* Partie 4 */}
    <section
      className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 bg-gray-100 relative"
      id={"article" + data[3].id}
    >
      <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
        <div className="flex-shrink-0 w-1/3">
          <img
            src={data[3].image}
            alt={data[3].title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-grow w-2/3">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{data[3].title}</h1>
          <p className="text-lg text-gray-700 mb-6">{data[3].content}</p>
          <button
            onClick={() => scrollToSection(`quiz${data[3].id}`)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Return to Quiz
          </button>
        </div>
      </div>
    </section>

    {/* Partie 5 */}
    <section
      className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 bg-gray-100 relative"
      id={"article" + data[4].id}
    >
      <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
        <div className="flex-shrink-0 w-1/3">
          <img
            src={data[4].image}
            alt={data[4].title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-grow w-2/3">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{data[4].title}</h1>
          <p className="text-lg text-gray-700 mb-6">{data[4].content}</p>
          <button
            onClick={() => scrollToSection(`quiz${data[4].id}`)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Return to Quiz
          </button>
        </div>
      </div>
    </section>
    

  </section>
    
  );
};

export default Article1;