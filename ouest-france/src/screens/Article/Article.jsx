import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import {MotionPathPlugin, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { scrollToSection } from '../../utils';
import './Article.css';

// Enregistrer ScrollTrigger pour GSAP
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const Article = ({ data }) => {
  console.log("data : ", data)
  const ballRef = useRef(); 
  const sectionRef = useRef(); 

  useEffect(() => {

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        scroller: ".app-container",  // 监听整个页面的滚动容器
        scrub: true,
        start: "top top",
        end: "bottom bottom",
        markers: true, 
      }
    }).to(ballRef.current, {
      motionPath:{
        path:".theLine",
        align:".theLine",
        alignOrigin: [0.5, 0.5],
      }});
  }, []);


  return (
    <section ref={sectionRef} className="relative">
      
      

      {/* Partie 1 */}
      <section
        className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 relative"
        style={{ fontFamily: 'Arial, sans-serif' }}
        id={"article" + data[1].sections[0].id}
      >
        <div className="flex flex-col items-center justify-center">

          <h1 className="article_title text-center max-w-3xl mb-8">{data[0].title}</h1>

          <div className="content mt-10  flex alig-center justify-center w-full max-w-7xl mx-auto gap-60">
            <div className="flex flex-col flex-shrink-0 w-1/3">

              <h2 className="title text-xl max-w-lg font-medium mb-4">{data[1].sections[0].title}</h2>

              <p className="text_content text-3xl max-w-lg mb-6">{data[1].sections[0].content}</p>

              <button class='text' onClick={() => scrollToSection(`quiz${data[1].sections[0].id}`)}>Reprendre le quizz</button>

            </div>

            <div className="w-1/3">
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
        style={{ fontFamily: 'Arial, sans-serif' }}
        id={"article" + data[1].sections[1].id}
      >
        <div className="flex flex-col items-center justify-center">

          <div className="mt-10  flex alig-center justify-center w-full max-w-7xl mx-auto gap-60">

          <div className="w-1/3">
              <img
                src={data[1].sections[1].image}
                alt={data[1].sections[1].title}
                className="w-full h-auto shadow-lg"
              />
            </div>

            <div className="flex flex-col flex-shrink-0 w-1/3">

              <h2 className="title text-xl max-w-lg font-medium mb-4">{data[1].sections[1].title}</h2>
              <p className="text_content text-3xl max-w-2xl mb-6">{data[1].sections[1].content}</p>

              <button class='text' onClick={() => scrollToSection(`quiz${data[1].sections[1].id}`)}>Reprendre le quizz</button>

            </div>

            
          </div>
         
        </div>
      </section>

      {/* Partie 3 */}
      <section
        className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 relative"
        style={{ fontFamily: 'Arial, sans-serif' }}
        id={"article" + data[1].sections[2].id}
      >
        <div className="flex flex-col items-center justify-center">


          <div className="mt-10  flex alig-center justify-center w-full max-w-7xl mx-auto gap-60">
            <div className="flex flex-col flex-shrink-0 w-1/3">

              <h2 className="title text-3xl max-w-lg font-medium mb-4">{data[1].sections[2].title}</h2>

              <p className="text_content text-3xl max-w-lg mb-6">{data[1].sections[2].content}</p>

              <button class='text' onClick={() => scrollToSection(`quiz${data[1].sections[2].id}`)}>Reprendre le quizz</button>

            </div>

            <div className="w-1/3">
              <img
                src={data[1].sections[2].image}
                alt={data[1].sections[2].title}
                className="w-full h-auto shadow-lg"
              />
            </div>
          </div>
         
        </div>
      </section>

      {/* Partie 4 */}
      <section
              className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 relative"
              style={{ fontFamily: 'Arial, sans-serif' }}
              id={"article" + data[1].sections[3].id}
            >
              <div className="flex flex-col items-center justify-center">


                <div className="mt-10  flex alig-center justify-center w-full max-w-7xl mx-auto gap-60">
                  <div className="w-1/3">
                    <img
                      src={data[1].sections[3].image}
                      alt={data[1].sections[3].title}
                      className="w-full h-auto shadow-lg"
                    />
                  </div>
                  <div className="flex flex-col flex-shrink-0 w-1/3">

                    <h2 className="title text-xl max-w-lg font-medium mb-4">{data[1].sections[3].title}</h2>

                    <p className="text_content text-3xl max-w-lg mb-6">{data[1].sections[3].content}</p>

                    <button class='text' onClick={() => scrollToSection(`quiz${data[1].sections[3].id}`)}>Reprendre le quizz</button>

                  </div>

                  
                </div>
              
              </div>
            </section>
      
      {/* Partie 5 */}
      <section
              className="h-screen w-full snap-start flex flex-col items-center justify-between px-8 py-12 relative"
              style={{ fontFamily: 'Arial, sans-serif' }}
              id={"article" + data[1].sections[4].id}
            >
              <div className="flex flex-col items-center justify-center">


                <div className="mt-10  flex alig-center justify-center w-full max-w-7xl mx-auto gap-60">
                  <div className="flex flex-col flex-shrink-0 w-1/3">

                    <h2 className="title text-xl max-w-lg font-medium mb-4">{data[1].sections[4].title}</h2>

                    <p className="text_content text-3xl max-w-lg mb-6">{data[1].sections[4].content}</p>

                    <button class='text' onClick={() => scrollToSection(`quiz${data[1].sections[4].id}`)}>Reprendre le quizz</button>

                  </div>

                  <div className="w-1/3">
                    <img
                      src={data[1].sections[4].image}
                      alt={data[1].sections[4].title}
                      className="w-full h-auto shadow-lg"
                    />
                  </div>
                </div>
              
              </div>
            </section>
            
            {/* Animation au scroll */}
            <svg className="svg-overlay" width="320" height="3663" viewBox="0 0 320 3663" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="theLine" d="M118 0.5C118 266.5 -185 455 190.5 672.5C284.5 731.5 416.1 918.4 190.5 1194C-35.1001 1469.6 99.3332 1759.67 235 1853.5C317.5 1910.56 395 2164.1 165 2354.5C-65.0001 2544.9 15.4998 2817.17 84.4998 2929.5C157.333 3029 275.4 3271.7 165 3446.5C140.667 3470.67 106.6 3547.4 165 3661" stroke="#CC2229" stroke-width="5" stroke-dasharray="20 20"/>
              <image href="golf-ball.png" alt="golf-ball" ref={ballRef} className="ball w-20 h-auto" x="50" y="50" />
            </svg>
      
  </section>
    
  );
};

export default Article;