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

          <div className="d-flex flex-column gap-4 pb-4"> 
          {/* d-flex flex-column  */}
            {/* gap-5 pb-5 px-2 */}
            <div className="form-check border rounded-5 border-secondary py-3 px-4"
              style={{
                minHeight: '48px',
                alignContent: 'center'
              }}
            >
              <input
                className={`form-check-input ms-2 ${selectedDifficulty === 1 ? "bg-dark" : ""}`}
                type="radio"
                name="difficultyRadio"
                id="difficultyEasy"
                checked={selectedDifficulty === 1}
                onChange={() => handleDifficultySelect(1)}
              />
              <label className="form-check-label fw-bold" htmlFor="difficultyEasy">
                FACILE
              </label>
            </div>
            <div className="form-check border rounded-5 border-secondary py-3 px-4"
              style={{
                minHeight: '48px',
                alignContent: 'center'
              }}
            >
              <input
                className={`form-check-input ms-2 ${selectedDifficulty === 2 ? "bg-dark" : ""}`}
                type="radio"
                name="difficultyRadio"
                id="difficultyHard"
                checked={selectedDifficulty === 2}
                onChange={() => handleDifficultySelect(2)}
              />
              <label className="form-check-label fw-bold" htmlFor="difficultyHard">
                DIFFICILE
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column m-5">
          <button
            className="btn btn-lg btn-dark fw-bold m-4 mt-1"
            onClick={handlePlayClick}
            disabled={!selectedDifficulty} // Désactiver tant qu'aucune difficulté n'est sélectionnée
          >
            JOUER
          </button>

        </div>
      </div>
    </div>
  );
};

export default DifficultyPage;

