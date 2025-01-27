import React from 'react';
import './finalPage.css';
import { useNavigate } from "react-router-dom";

const FinalPage = () => {
    const navigate = useNavigate(); // Initialisation de navigate
    const gameLink = "https://hyblab.polytech.univ-nantes.fr/lavoixdunord"; // Lien de votre jeu

    // Fonction pour partager avec l'API Web Share
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "Le Défi des 3 maillots",
                text: "Rejoignez-moi pour jouer au jeu 'Le Défi des 3 maillots' !",
                url: gameLink, // Lien du jeu
            })
                .then(() => console.log("Partage réussi"))
                .catch((error) => console.error("Erreur lors du partage:", error));
        } else {
            alert("Le partage n'est pas pris en charge par votre navigateur.");
        }
    };

    return (
        <div className="background_final">
            <div class="arbre"></div>
            <div className="text-center p-4 mt-84">
                <h1 className="text-white mb-5">MERCI</h1>
                <div className='my-5'>&nbsp;</div>
                <div className="fs-6">
                    <p><i><b>Merci d’avoir participé à cette aventure unique. </b></i></p>
                    <p> À bientôt pour de nouveaux défis, et souvenez-vous : </p>
                    <p><i><b>  La route du savoir est aussi passionnante que celle des cyclistes.</b></i></p>
                </div>

                <button className="btn btn-outline-primary fw-bold my-2" onClick={() => navigate("/")}>RÉESSAYER</button>

                <p><i><b>Partagez ce jeu avec vos proches !</b></i></p>

                {/* Bouton pour partager via l'API Web Share */}
                <button className="btn btn-outline-info fw-bold my-2" onClick={handleShare}>PARTAGER</button>
            </div>
        </div>
    );
};

export default FinalPage;
