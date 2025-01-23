import React, { useState } from "react";
import "./DifficultyPage.css";

const DifficultyPage = ({ onPlay }) => {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    const handleDifficultySelect = (difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    return (
        <div className="difficulty-container">
            <h1 className="difficulty-title">DIFFICULTÉS</h1>
            <div className="difficulty-box">
                <h2 className="difficulty-subtitle">
                    CHOISISSEZ UN NIVEAU DE DIFFICULTÉ
                </h2>
                <div className="difficulty-buttons">
                    <button
                        className={`difficulty-btn ${selectedDifficulty === "easy" ? "selected" : ""}`}
                        onClick={() => handleDifficultySelect("easy")}
                    >
                        FACILE
                    </button>
                    <button
                        className={`difficulty-btn ${selectedDifficulty === "hard" ? "selected" : ""}`}
                        onClick={() => handleDifficultySelect("hard")}
                    >
                        DIFFICILE
                    </button>
                </div>
            </div>
            <button
                className="play-btn"
                onClick={() => onPlay(selectedDifficulty)}
                disabled={!selectedDifficulty} // Désactiver tant qu'aucune difficulté n'est sélectionnée
            >
                JOUER
            </button>
            <div className="image-container">
            </div>
        </div>
    );
};

export default DifficultyPage;
