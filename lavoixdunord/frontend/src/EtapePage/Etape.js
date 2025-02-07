import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Etape.css";

const Etape = () => {
  const { difficulty } = useParams(); // Récupérer la difficulté depuis l'URL
  const navigate = useNavigate();

  const handleEtapeClick = (etape) => {
    navigate(`/etape/${difficulty}/${etape}`); // Redirige vers la page des questions avec la difficulté et l'étape
  };

  return (
    <div className="etape-container">
      <h2 className="etape-title">CHOISISSEZ UNE ÉTAPE</h2>
      <div className="etape-box">
        <button
          className="etape-btn unlocked"
          onClick={() => handleEtapeClick(1)}
        >
          ÉTAPE 1
        </button>
        <button className="etape-btn locked">
          ÉTAPE 2 <span className="lock-icon">🔒</span>
        </button>
        <button className="etape-btn locked">
          ÉTAPE 3 <span className="lock-icon">🔒</span>
        </button>
      </div>
    </div>
  );
};

export default Etape;

