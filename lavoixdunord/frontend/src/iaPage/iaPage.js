import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './iaPage.css'; 
import useBasename from "../hooks/useBasenameHook";

const IA = () => {
    const navigate = useNavigate();
    const basename = useBasename();
    useEffect(() => {
        return () => { };
    }, [navigate]);

    const handleFinishClick = () => {
        navigate("/final");
    };

    return (
        <div className="bg_gradient_fond_vague2 d-flex flex-column">
            <div className="mt-84 text-center p-4">
        
            <h2 className="heading">UTILISATION IA</h2>

            <p className="content">
                "Le Défi des 3 Maillots" intègre l'intelligence artificielle pour enrichir l'expérience utilisateur dans notre jeu interactif centré sur le patrimoine du Nord-Pas-de-Calais.
            </p>

            <h3 className="subheading">Génération de Contenu</h3>
            <ul className="list">
                <li className="list-item"><strong>Génération de Texte :</strong> Utilisation de ChatGPT pour créer des textes créatifs et des indices pertinents.</li>
                <li className="list-item"><strong>Conception Sonore :</strong> Emploi d'AVIA pour la création de musiques et de Lyrebird pour des réponses vocales dynamiques.</li>
                <li className="list-item"><strong>Personnalisation de l'Expérience :</strong> Adaptation des questions en temps réel selon les performances des joueurs.</li>
            </ul>

            <h3 className="subheading">Optimisation Visuelle et Interactivité</h3>
            <ul className="list">
                <li className="list-item"><strong>Vectorizer.AI :</strong> Transformation d'images pixélisées en graphiques vectoriels clairs.</li>
                <li className="list-item"><strong>Adobe Illustrator :</strong> Conception de composants graphiques personnalisés.</li>
                <li className="list-item"><strong>Leaflet et VanillaJS :</strong> Création d'une carte interactive comme plateforme centrale du jeu.</li>
            </ul>

            <h3 className="subheading">Processus de Développement</h3>
            <ul className="list">
                <li className="list-item"><strong>Génération de Code :</strong> Utilisation de ChatGPT pour produire rapidement du code.</li>
                <li className="list-item"><strong>Débogage et Gestion de Conflits Git :</strong> Utilisation de GitHub Copilot pour le débogage et la gestion des conflits Git.</li>
            </ul>

            <button onClick={handleFinishClick} className="btn btn-outline-dark border-2 fw-bold my-2">
                FINIR
            </button>

            </div>



            <div className="flex-grow-1">&nbsp;</div>
            <img src={`${basename}images/credit_image.png`} alt="credit" 
            className=""
                style={{
                    maxWidth: "100%",
                }} />
        </div>
    );
};

export default IA;
