import React from "react";
import "./Etape.css";

const Etape = () => {
  const handleEtapeClick = (etape) => {
    if (etape === 1) {
      // Rediriger vers la page de l'étape 1
      window.location.href = "/etape/1";
    } else {
      alert("Cette étape est verrouillée !");
    }
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
