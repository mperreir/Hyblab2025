import React from 'react';
import './startPage.css';
import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="background_start">
            <div className="container_start">
                <p><i><b>Bienvenue à Lille, point de départ du Tour de France et de votre aventure.</b></i></p>
                <p>Votre première question vous attend, répondez avec précision, avancez sans perdre de temps et préparez-vous à découvrir les trésors cachés du Nord.</p>
                <p>Chaque question vous rapproche un peu plus du premier maillot et du podium !</p>
                <p><i><b>Bonne chance, et que la découverte de cette belle région commence !</b></i></p>
            </div>
            <button className="button_start" onClick={() => navigate('/etape/:difficulty')}><b>COMMENCER</b></button>
        </div>
    );
};

export default StartPage;