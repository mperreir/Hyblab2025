import React from 'react';
import './finalPage.css';
import { useNavigate } from "react-router-dom";

const FinalPage = () => {
    const navigate = useNavigate(); // Initialisation de navigate
    
    return (
        <div className="background_final">
            <div className="container1">
                <p><i><b>Merci d’avoir participé à cette aventure unique. </b></i></p>
                <p> À bientôt pour de nouveaux défis, et souvenez-vous : </p>
                <p><i><b>  La route du savoir est aussi passionnante que celle des cyclistes.</b></i></p>
            </div>
            <button className="button_réessayer" onClick={() => navigate('/')}><b>RÉESSAYER</b></button>

            <div className="container2">
                <p><i><b>Partagez ce jeu avec vos proches !</b></i></p>
            </div>
            <button className="button_partager" onClick={() => navigate('/')}><b>PARTAGER</b></button>

        </div>
    );
};

export default FinalPage;
