import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DifficultyPage.css";

const DifficultyPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const navigate = useNavigate();

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handlePlayClick = () => {
    if (selectedDifficulty) {
      navigate(`/etape/${selectedDifficulty}`); // Redirige vers la page des étapes
    }
  };

  return (
    <div className="difficulty-container">
      <h1 className="difficulty-title">DIFFICULTÉS</h1>
      <div className="difficulty-box">
        <h2 className="difficulty-subtitle">CHOISISSEZ UN NIVEAU DE DIFFICULTÉ</h2>
        <div className="difficulty-buttons">
          <button
            className={`difficulty-btn ${selectedDifficulty === 1 ? "selected" : ""}`}
            onClick={() => handleDifficultySelect(1)}
          >
            FACILE
          </button>
          <button
            className={`difficulty-btn ${selectedDifficulty === 2 ? "selected" : ""}`}
            onClick={() => handleDifficultySelect(2)}
          >
            DIFFICILE
          </button>
        </div>
      </div>
      <button
        className="play-btn"
        onClick={handlePlayClick}
        disabled={!selectedDifficulty} // Désactiver tant qu'aucune difficulté n'est sélectionnée
      >
        JOUER
      </button>
    </div>
  );
};

export default DifficultyPage;
