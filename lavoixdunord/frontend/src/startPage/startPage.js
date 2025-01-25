import React from 'react';
import './startPage.css';
import { useNavigate, useParams } from "react-router-dom";
import useBasename from '../hooks/useBasenameHook';

const StartPage = () => {
    const navigate = useNavigate();
    const { difficulty } = useParams(); // Récupérer la difficulté depuis l'URL
    
    const basename = useBasename(); // Utilisation du hook useBasename
    
    const handleEtapeClick = (etape) => {
        navigate(`/start/${difficulty}/${etape}`); // Redirige vers la page des questions avec la difficulté et l'étape
    };


    return (
        <div className="background_start">
            <div className="container_start">
                <img className="start_page_img" src={`${basename}images/Etape 1/map_etape1.png`} alt="Start Page" />
                <p><i><b>Bienvenue à Lille, point de départ du Tour de France et de votre aventure.</b></i></p>
                <p>Votre première question vous attend, répondez avec précision, avancez sans perdre de temps et préparez-vous à découvrir les trésors cachés du Nord.</p>
                <p>Chaque question vous rapproche un peu plus du premier maillot et du podium !</p>
                <p><i><b>Bonne chance, et que la découverte de cette belle région commence !</b></i></p>
            </div>
            <button className="button_start" onClick={() => handleEtapeClick(1)}><b>COMMENCER</b></button>
        </div>
    );
};

export default StartPage;