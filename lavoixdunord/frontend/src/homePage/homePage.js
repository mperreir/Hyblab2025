import React from 'react';
import './homePage.css';
import { useNavigate } from "react-router-dom";
import useBasename from '../hooks/useBasenameHook';

const HomePage = () => {
    localStorage.setItem("score", 0); // Initialiser le score à 0

    const navigate = useNavigate(); // Initialisation de navigate
    const basename = useBasename();

    const [treePosition, setTreePosition] = React.useState(0);

    // Calculer la position de l'arbre par rapport au bord gauche
    React.useEffect(() => {
        const calculatePosition = () => {
            const button = document.querySelector('.btn-outline-dark');
            if (button) {
                const buttonRect = button.getBoundingClientRect();
                const leftPosition = buttonRect.left;
                setTreePosition(-leftPosition);
            }
        };

        calculatePosition();
        window.addEventListener('resize', calculatePosition);
        return () => window.removeEventListener('resize', calculatePosition);
    }, []);

    return (
        <div className="background_home text-center">
            <div className="container_home p-4 mt-5">
                <h1 className="text-white mb-4">BIENVENUE !</h1>
                <div className="my-4 py-3">&nbsp;</div>
                <p className='pt-4 mt-5 position-relative'>
                    <img src={`${basename}images/illustrations/bateau.png`}
                        alt="bateau"
                        className="illustration_in_p_bateau"
                        style={{
                        }} />
                    Bonjour, le grand départ de la 112e édition du Tour de France est proche. Cette année, les cyclistes s'élancent de Lille, et cette année, vous êtes de la course !
                </p>
                <p><i><b>Bienvenue dans Le Défi des 3 maillots </b></i></p>
                <p>Vous courez les trois premières étapes du Tour qui traversent le Nord et le Pas-de-Calais.
                    Votre mission ?</p>
                <p><i><b>Testez vos connaissances sur la région et décrocher les trois maillots emblématiques du tour.</b></i></p>
            </div>
            <button className="btn btn-outline-dark mb-2 position-relative" onClick={() => navigate('/regles')}>
                <img src={`${basename}images/illustrations/arbre_orange.png`}
                    alt="arbre_orange"
                    style={{
                        position: 'absolute',
                        left: `${treePosition}px`,
                        width: `${Math.min(80, -treePosition)}px`,
                        transform: 'translateY(-50%)',
                        top: '50%',
                        objectFit: 'scale-down'
                    }} />
                <b>SUIVANT</b>
            </button>
            <div className="my-4">&nbsp;</div>
        </div>
    );
};

export default HomePage;
