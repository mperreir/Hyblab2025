import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import {MotionPathPlugin, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { scrollToSection } from '../utils';

// Enregistrer ScrollTrigger pour GSAP
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const Article = ({ data }) => {
  console.log("data : ", data)
  const ballRef = useRef(); 
  const sectionRef = useRef(); 

  useEffect(() => {

    let path1 = [
      { x: '20vw', y: '200vh'}, 
    ];


    let path2 = [
      { x: '20vw', y: '20vh', rotation: 360 }, 
    ];
    
    const tl = gsap.timeline();

    // Utiliser la référence `ballRef.current` pour appliquer l'animation
    tl.to(ballRef.current, {
      motionPath: {
        path: path1,
      },
      duration:5,
      rotation: 720,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom top",
        scroller: ".app-container",
        markers: true,
        scrub: true,
      }
    }).to(ballRef.current, {
      motionPath: {
        path: path2,
      },
      duration:5,
      rotation: 720,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom top",
        scroller: ".app-container",
        markers: true,
        scrub: true,
      }
    });



  }, []);


  return (
    <section ref={sectionRef} className="relative">
      
      {/* Animation au scroll */}
      <img class="ball" src="golf-ball.png" alt="golf-ball" ref={ballRef} className="w-16 h-auto"/>

      {/* Partie 1 */}
      <section
        className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 relative"
        style={{ fontFamily: 'Arial, sans-serif' }}
        id={"article" + data[1].sections[0].id}
      >
        <div className="flex flex-col items-center justify-center">

          <h1 className="bg-gray-500 text-center max-w-3xl mb-8"
          style={{
            fontFamily: 'Arial',
            fontSize: '38px',
            fontWeight: 700,
            lineHeight: '43.7px',
            textAlign: 'center',
            textUnderlinePosition: 'from-font',
            textDecorationSkipInk: 'none',
          }}
          >
            {data[0].title}</h1>

          <div className="mt-10 bg-red-200 flex w-full max-w-7xl mx-auto gap-60">
            <div className="bg-blue-200">

              <h2 className="text-xl max-w-lg font-medium mb-4"
              style={{
                fontFamily: 'Arial',
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: '23px',
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
              }}
              >
                {data[1].sections[0].title}</h2>

              <p className="text-lg max-w-lg mb-6"
              style={{
                fontFamily: 'Arial',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: '23px',
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
              }}>
                {data[1].sections[0].content}</p>

              <button
                onClick={() => scrollToSection(`quiz${data[1].sections[0].id}`)}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Return to Quiz
              </button>

            </div>


            <div className="flex-shrink-0 w-1/3">
              <img
                src={data[1].sections[0].image}
                alt={data[1].sections[0].title}
                className="w-full h-auto shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Partie 2 */}
      <section
        className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 relative"
        id={"article" + data[1].sections[1].id}>
        <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
          <div className="flex-shrink-0 w-1/3">
            <img
              src={data[1].sections[1].image}
              alt={data[1].sections[1].title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-grow w-2/3">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">{data[1].sections[1].title}</h1>
            <p className="text-lg text-gray-700 mb-6">{data[1].sections[1].content}</p>
            <button
              onClick={() => scrollToSection(`quiz${data[1].sections[1].id}`)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Return to Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Partie 3 */}
      <section
        className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 relative"
        id={"article" + data[1].sections[2].id}>
        <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
          <div className="flex-shrink-0 w-1/3">
            <img
              src={data[1].sections[2].image}
              alt={data[1].sections[2].title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-grow w-2/3">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">{data[1].sections[2].title}</h1>
            <p className="text-lg text-gray-700 mb-6">{data[1].sections[2].content}</p>
            <button
              onClick={() => scrollToSection(`quiz${data[1].sections[2].id}`)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Return to Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Partie 4 */}
      <section
        className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 relative"
        id={"article" + data[1].sections[3].id}>
        <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
          <div className="flex-shrink-0 w-1/3">
            <img
              src={data[1].sections[3].image}
              alt={data[1].sections[3].title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-grow w-2/3">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">{data[1].sections[3].title}</h1>
            <p className="text-lg text-gray-700 mb-6">{data[1].sections[3].content}</p>
            <button
              onClick={() => scrollToSection(`quiz${data[1].sections[3].id}`)}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Return to Quiz
            </button>
          </div>
        </div>
      </section>

      {/* Partie 5 */}
      <section
        className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 relative"
        id={"article" + data[1].sections[4].id}>
        <div className="flex w-full max-w-5xl mx-auto items-center space-x-8">
          <div className="flex-shrink-0 w-1/3">
            <img
              src={data[1].sections[4].image}
              alt={data[1].sections[4].title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-grow w-2/3">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">{data[1].sections[4].title}</h1>
            <p className="text-lg text-gray-700 mb-6">{data[1].sections[4].content}</p>
            <button
              onClick={() => scrollToSection(`quiz${data[1].sections[4].id}`)}
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

export default Article;