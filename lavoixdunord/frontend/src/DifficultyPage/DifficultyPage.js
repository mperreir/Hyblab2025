import React, { useState } from "react";
import "./DifficultyPage.css";

const DifficultyPage = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    const handleDifficultySelect = (difficulty) => {
        setSelectedDifficulty(difficulty);
    };

    return (
        <div className="difficulty-container">
            <h2>Veuillez choisir le niveau de difficulté du jeu, s'il vous plaît</h2>
            <div className="difficulty-buttons">
                <button
                    className={`difficulty-btn ${selectedDifficulty === "easy" ? "selected" : ""}`}
                    onClick={() => handleDifficultySelect("easy")}
                >
                    Facile
                </button>
                <button
                    className={`difficulty-btn ${selectedDifficulty === "hard" ? "selected" : ""}`}
                    onClick={() => handleDifficultySelect("hard")}
                >
                    Difficile
                </button>
            </div>
        </div>
    );
};

export default DifficultyPage;
