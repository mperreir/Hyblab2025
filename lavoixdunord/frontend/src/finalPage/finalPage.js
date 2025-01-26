import React from 'react';
import './finalPage.css';
import { useNavigate } from "react-router-dom";

const FinalPage = () => {
    const navigate = useNavigate(); // Initialisation de navigate

    return (
        <div className="background_final">
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
                <button className="btn btn-outline-info fw-bold my-2" onClick={() => navigate("/")}>PARTAGER</button>

            </div>

        </div>
    );
};

export default FinalPage;
