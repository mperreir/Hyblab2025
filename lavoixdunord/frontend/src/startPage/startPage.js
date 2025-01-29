import React, { useState } from 'react';
import './startPage.css';
import { useNavigate, useParams } from "react-router-dom";
import useBasename from '../hooks/useBasenameHook';
import ImageModal from '../components/ImageModal';

const StartPage = () => {
    const navigate = useNavigate();
    const { difficulty } = useParams(); // Récupérer la difficulté depuis l'URL

    const basename = useBasename(); // Utilisation du hook useBasename

    const handleEtapeClick = (etape) => {
        navigate(`/start/${difficulty}/${etape}`); // Redirige vers la page des questions avec la difficulté et l'étape
    };

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
        <div className="start_page_bg w-100 position-relative z-1">
            <div className="mt-84 text-center">
                <h1 className="text-white">DÉPART !</h1>

                {/* <ImageModal
                    imageSrc={`${basename}images/Etape 1/map_etape1.png`}
                    altText="Carte étape 1"
                    showModal={showModal}
                    onClose={setShowModal}
                /> */}
                <div className='my-3'>&nbsp;</div>

                <div className="mx-3 p-3">
                    <p className='pt-2 position-relative'>
                        <img src={`${basename}images/illustrations/start_flag.png`} alt="start_flag" className="regle_velo"
                        style={{
                            height: '64px'
                        }} />

                        <i><b>Bienvenue à Lille, point de départ du Tour de France et de votre aventure.</b></i></p>
                    <p>  Votre première question vous attend, répondez avec précision, avancez sans perdre de temps et préparez-vous à découvrir les trésors cachés du Nord-Pas-de-Calais.</p>
                    <p>Chaque question vous rapproche un peu plus du premier maillot et du podium !</p>
                    <p><i><b>Bonne chance, et que la découverte de cette belle région commence !</b></i></p>
                </div>

                <button onClick={() => handleEtapeClick(1)}
                    className="btn btn-outline-dark fw-bold mx-5 position-relative"
                >
                    <img src={`${basename}images/illustrations/arbre2.gif`}
                        alt="arbre_orange"
                        style={{
                            position: 'absolute',
                            left: `${treePosition}px`,
                            width: `${Math.min(80, -treePosition)}px`,
                            transform: 'translateY(-50%)',
                            top: '50%',
                            objectFit: 'scale-down'
                        }} />
                    COMMENCER
                </button>
                <div className="my-4">&nbsp;</div>

            </div>
        </div>
    );
};

export default StartPage;