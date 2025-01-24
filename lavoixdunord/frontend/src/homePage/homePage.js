import React from 'react';
import './homePage.css';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate(); // Initialisation de navigate
    
    return (
        <div className="background_home">
            <div className="container_home">
                <p>Bonjour, le grand départ de la 112e édition du Tour de France est proche. Cette année, les cyclistes s’élancent de Lille, et cette année, vous êtes de la course ! </p>
                <p><i><b>Bienvenue dans Le Défi des 3 maillots </b></i></p>
                <p>Vous courez les trois premières étapes du Tour qui traversent le Nord et le Pas-de-Calais. 
                Votre mission ?</p>
                <p><i><b>Testez vos connaissances sur la région et décrocher les trois maillots emblématiques du tour.</b></i></p>
            </div>
            <button className="button_home" onClick={() => navigate('/regles')}><b>SUIVANT</b></button>
        </div>
    );
};

export default HomePage;
