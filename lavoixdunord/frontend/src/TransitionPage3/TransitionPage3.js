import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TransitionPage3.css';

const TransitionPage3 = () => {
    const navigate = useNavigate();
        
    // Récupérer les valeurs passées via navigate
    const finalScore = parseInt(localStorage.getItem("score")) || 0;
    // const difficulty = location.state?.difficulty || 1;

    // Convertir le score en minutes et secondes
    const minutes = Math.floor(finalScore / 60);
    const seconds = finalScore % 60;

    return (
        <div className="background_TP3">
            <div className="container_TP3">
                <p className="p_TP3"><b>Score :</b> {minutes} minute{minutes !== 1 ? "s" : ""} et {seconds} seconde{seconds !== 1 ? "s" : ""}</p>
            </div>
            <button className="button_TP3" onClick={() => navigate(`/credit`)}><b>Terminer</b></button>
        </div>
    );
};

export default TransitionPage3;
