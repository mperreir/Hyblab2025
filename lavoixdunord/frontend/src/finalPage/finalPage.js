import React from 'react';
import './finalPage.css';
import { useNavigate } from "react-router-dom";
import useBasename from '../hooks/useBasenameHook';

const FinalPage = () => {
    const basename = useBasename()
    const navigate = useNavigate(); // Initialisation de navigate
    const gameLink = "https://hyblab.polytech.univ-nantes.fr/lavoixdunord"; // Lien de votre jeu

    const maillot_images = [
        `${basename}images/illustrations/maillot_blanc.png`,
        `${basename}images/illustrations/maillot_vert.png`,
        `${basename}images/illustrations/mallot_jaune.png`,
    ]

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
            <div class="arbre" style={{ zIndex: 0 }}></div>
            <div className="text-center mt-76">
                <h1 className="text-white mb-4">MERCI</h1>
                <div className='p-4'>
                    <div className='d-flex flex-row justify-content-between my-3 px-3 w-100'>
                        {maillot_images.map(
                            (link) => (
                                <img src={link}
                                    alt="maillot"
                                    className="maillot_icon"
                                    style={{
                                        height: '80px', objectFit: 'scale-down',
                                    }} />
                            )
                        )}

                    </div>

                    <div className="">
                        <p><i><b>Merci d’avoir participé à cette aventure unique. </b></i></p>
                        <p> À bientôt pour de nouveaux défis, et souvenez-vous : </p>
                        <p><i><b>  La route du savoir est aussi passionnante que celle des cyclistes.</b></i></p>
                    </div>

                    <button className="btn btn-outline-dark border-2 fw-bold my-2" onClick={() => navigate("/")}>RÉESSAYER</button>

                    <p><i><b>Partagez ce jeu avec vos proches !</b></i></p>

                    {/* Bouton pour partager via l'API Web Share */}
                    <button className="btn btn-outline-dark border-2 fw-bold my-2" onClick={handleShare}>PARTAGER</button>

                </div>
            </div>
        </div>
    );
};

export default FinalPage;
