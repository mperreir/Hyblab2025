import React from 'react';
import './homePage.css';

const homePage = () => {

    return (
        <div className="background">
            <div className="container">
                <p>Bonjour, le grand départ de la 112e édition du Tour de France est proche. Cette année, les cyclistes s’élancent de Lille, et cette année, vous êtes de la course ! </p>
                <br></br>
                <p><i><b>Bienvenue dans Le Défi des 3 maillots </b></i></p>
                <br></br>
                <p>Vous courez les trois premières étapes du Tour qui traversent le Nord et le Pas-de-Calais. 
                Votre mission ?</p>
                <br></br>
                <p><i><b>Testez vos connaissances sur la région et décrocher les trois maillots emblématiques du tour.</b></i></p>
            </div>
            <button className="button">JOUER</button>
        </div>
    );
};

export default homePage;
