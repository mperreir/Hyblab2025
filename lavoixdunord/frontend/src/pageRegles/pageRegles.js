import React from 'react';
import './pageRegles.css';
import { useNavigate } from "react-router-dom";


const RulesPage = () => {
    const navigate = useNavigate(); // Initialisation de navigate


    return (
        <div className="background_rules">
            <div className="text-center p-4 mt-4">
                <h1 className="text-white mb-4">LES RÈGLES</h1>
                <div className="fs-6">
                    <p><i><b>Dans le Défi des 3 maillots, chaque étape est jalonnée de questions sur les lieux marquants traversés par son itinéraire.</b></i></p>

                    <p>Votre objectif est simple : récolter les trois maillots en répondant aux questions sur l’histoire et le patrimoine de la région.</p>
                    <p>Une bonne réponse vous permet de continuer sans pénalité, tandis qu’une mauvaise réponse vous fait progresser, mais avec une pénalité de temps.</p>

                    <p>Si vous avez besoin d’aide, des indices sont à votre disposition. L’utilisation de l’indice 1 vous ralentit de 5 et de 10 secondes pour l’indice 2.</p>
        
                    <p><i><b>L’objectif final est de récolter les trois maillots en réussissant les trois étapes. Vous débloquez un maillot à la fin de chaque étape.</b></i></p>
                </div>

                <button className="btn btn-outline-dark  mt-4" onClick={() => navigate("/difficulty")}><b>JOUER</b></button>
            </div>
            <img className="arbre" src="arbre.gif" alt="arbreSotant" />

        </div>
    );
};

export default RulesPage;
