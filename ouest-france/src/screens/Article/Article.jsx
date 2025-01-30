import React, {useRef, useEffect} from "react";
import {useGSAP} from "@gsap/react";
import {MotionPathPlugin, ScrollTrigger} from "gsap/all";
import gsap from "gsap";
import {scrollToSection} from '../../utils';
import './Article.css';

// Enregistrer ScrollTrigger pour GSAP
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const Article = ({data}) => {
    const ballRef = useRef();
    const sectionRef = useRef();

    useEffect(() => {

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                scroller: ".app-container",
                scrub: true,
                start: "top top",
                end: "bottom bottom",
                markers: false,
            }
        }).set(ballRef.current, {opacity: 1})
            .to(ballRef.current, {
                motionPath: {
                    path: ".theLine",
                    align: ".theLine",
                    alignOrigin: [0.5, 0.5],
                },
                duration: 1,
                ease: "none"
            });
    }, []);


    return (
        <section ref={sectionRef} className="relative article">
            {data.sections.map((section, index) => (
                <section
                    className={"h-screen w-full snap-start snap-always px-32 py-12 flex flex-col items-center justify-center"}
                    style={{fontFamily: 'Arial, sans-serif'}}
                    id={"article" + section.id}
                >
                    {index === 0 && (<h1 className="relative z-10 text-center max-w-3xl mb-8 text-black bg-white">{data.title}</h1>)}
                    <div className={"w-full h-screen flex items-center justify-between " + ((index % 2 === 0) ? "flex-row" : "flex-row-reverse")}>
                        <div className="article-container w-1/3">
                            <div className="triangle">
                                <svg width="12" height="14" viewBox="0 0 15 17" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.5894 7.64486C14.2315 8.03413 14.2315 8.96587 13.5894 9.35514L1.5184 16.6728C0.851964 17.0768 -8.129e-07 16.597 -7.78834e-07 15.8176L-1.39105e-07 1.18235C-1.05039e-07 0.403021 0.851963 -0.0767918 1.5184 0.327214L13.5894 7.64486Z"
                                        fill="#CC2229"/>
                                </svg>
                            </div>
                            <div className="article-content">
                                <h2 className="title text-3xl text-black max-w-lg font-medium mb-4">{section.title}</h2>
                                <p className="text_content text-black max-w-lg mb-6">{section.content}</p>
                                <button className='text border border-black'
                                        onClick={() => scrollToSection(`quiz${section.id}`)}>
                                    Reprendre le quizz
                                </button>
                            </div>
                        </div>
                        <div className="w-1/3">
                            <img
                                src={section.image}
                                alt={section.title}
                                className="w-full h-auto shadow-lg"
                            />
                        </div>
                    </div>
                </section>
            ))}

            {/* Animation au scroll */}
            <svg className="svg-overlay" width="238" height="3663" viewBox="0 0 238 3663" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path class="theLine"
                      d="M73.0003 0.5C73.0003 266.5 -126 429.5 145.5 672.5C239.5 731.5 229.5 881 145.5 1194C53.1837 1537.99 97.5902 1716.86 190 1853.5C248.5 1940 273.262 2105.51 120 2354.5C-34.5 2605.5 7.0001 2828 39.5001 2929.5C100.5 3032 230.4 3271.7 120 3446.5C95.6668 3470.67 61.6001 3547.4 120 3661"
                      stroke="#CC2229" stroke-width="5" stroke-dasharray="20 20"/>
                <image href="golf-ball.png" alt="golf-ball" ref={ballRef} className="ball w-12 h-auto"
                       style={{opacity: 0}}/>
            </svg>
        </section>

    );
};

export default Article;