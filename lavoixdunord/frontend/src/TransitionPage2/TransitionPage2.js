import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './TransitionPage2.css';
import useBasename from '../hooks/useBasenameHook';

const TransitionPage2 = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const basename = useBasename();

    // Récupérer les valeurs passées via navigate
    const finalScore = location.state?.finalScore || 0;
    // const difficulty = location.state?.difficulty || 1;
    let { id, difficulty } = useParams();


    // Convertir le score en minutes et secondes
    const minutes = Math.floor(finalScore / 60);
    const seconds = finalScore % 60;

    return (
        <div>
            <img className="transition_page_img" src={`${basename}images/Etapes 3/map_etape3.png`} alt="Start Page" />

            <div className="background_TP2">
                <div className="container_TP2">
                    <p className="p_TP2"><b>Score :</b> {minutes} minute{minutes !== 1 ? "s" : ""} et {seconds} seconde{seconds !== 1 ? "s" : ""}</p>
                </div>
                <button className="button_TP2" onClick={() => navigate(`/start/${difficulty}/3`)}><b>ÉTAPE SUIVANTE</b></button>
            </div>
        </div>
    );
};

export default TransitionPage2;
