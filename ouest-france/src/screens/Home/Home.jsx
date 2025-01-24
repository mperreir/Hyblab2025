// src/screens/Home.jsx
import React from "react";
import {scrollToSection} from "../../utils";
import logo from "../../assets/logo.svg";
import home from "../../assets/home.svg";
import './home.css';

const Home = () => {

    return (<section
            className="h-full w-full snap-start flex items-center justify-center flex-col"
            id="home"
        >
            <div className="background">
                <img src='./home.png' alt="Golf"/>
            </div>
            <header>
                <button>
                    <img src={logo} alt="Ouest-France"/>
                </button>
                <nav>
                    <ul>
                        <li>
                            <button className="text">Accueil</button>
                        </li>
                        <li>
                            <button className="text">Quiz</button>
                        </li>
                        <li>
                            <button className="text">M. Pavon</button>
                        </li>
                        <li>
                            <button className="text">C. Boutier</button>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="content">
                <img src={home} alt="Golf logo"/>
                <h1>Tee Time Heros</h1>
                <p>Découvrez Céline Boutier et Matthieu Pavon,
                    les deux étoiles montantes du golf français : talents, exploits et parcours,
                    Deux talents, deux destins : qui choisirez-vous pour découvrir l’histoire du golf français ?</p>
                <button className="contained" onClick={() => {
                    scrollToSection("choose-player")
                }}>
                    Continuer
                </button>
            </div>
        </section>
    );
};

export default Home;
