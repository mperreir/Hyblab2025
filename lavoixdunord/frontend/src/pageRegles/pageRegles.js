import React from 'react';
import './pageRegles.css';

const RulesPage = () => {

    return (
        <div className="background">
            <div className="rules-container">
                <p><i><b>Bienvenue à Lille, point de départ du Tour de France et de votre aventure.</b></i></p>
                <br></br>
                <p>Votre première question vous attend, répondez avec précision, avancez sans perdre de temps et préparez-vous à découvrir les trésors cachés du Nord. Chaque question vous rapproche un peu plus du premier maillot et du podium !</p>
                <br></br>
                <p><i><b>Bonne chance, et que la découverte  de cette belle région commence !</b></i></p>
            </div>
            <button className="button">SUIVANT</button>
        </div>
    );
};

export default RulesPage;
