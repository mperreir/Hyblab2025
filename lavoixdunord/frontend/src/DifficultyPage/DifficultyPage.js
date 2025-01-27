import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DifficultyPage.css";
import useBasename from "../hooks/useBasenameHook";

const DifficultyPage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const navigate = useNavigate();
  const basename = useBasename();

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handlePlayClick = () => {
    if (selectedDifficulty) {
      navigate(`/start/${selectedDifficulty}`); // Redirige vers la page des étapes
    }
  };

  return (
    <div className="bg_gradient_fond_vague w-100 position-relative">
      <div className="mt-84 text-center">
        <h1 className="text-white">DIFFICULTÉS</h1>

        <div className="bg-white text-dark border border-41 border-light rounded-3 mx-5 mt-5 p-4">
          <h6 className="py-4">CHOISISSEZ UN NIVEAU DE DIFFICULTÉ</h6>

          <div className="d-flex flex-column gap-5 pb-5 px-2">
            <button
              className={`btn fw-bold ${selectedDifficulty === 1 ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => handleDifficultySelect(1)}
            >
              FACILE
            </button>
            <button
              className={`btn fw-bold ${selectedDifficulty === 2 ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => handleDifficultySelect(2)}
            >
              DIFFICILE
            </button>
          </div>
        </div>

        <div className="d-flex flex-column mx-5 mt-5">
          <button
            className="btn btn-light fw-bold mx-5"
            onClick={handlePlayClick}
            disabled={!selectedDifficulty} // Désactiver tant qu'aucune difficulté n'est sélectionnée
          >
            JOUER
          </button>

        </div>
      </div>

      <img src={`${basename}images/illustrations/illustration_arbre_jaune_orange.png`} alt="illustration_arbre_jaune_orange" className="illustration_arbre_jaune_orange" />

    </div>
  );
};

export default DifficultyPage;

