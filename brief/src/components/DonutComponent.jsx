import React, { useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppContext } from "../context/AppContextProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ size = 300 }) {
  const { globalState } = useAppContext();
  const chartRef = useRef(null);

  // Couleurs pour chaque segment
  const initialColors = ['#B8A6B5', '#7AA7D2', '#93C3A6']; // Exemples de couleurs (Fossiles, Nucléaires, Renouvelables)
  const [segmentColors, setSegmentColors] = useState(initialColors); // État des couleurs actuelles
  const [showGreySquare, setShowGreySquare] = useState(false); // Contrôle de l'affichage du carré gris

  // Labels et valeurs fixes
  const labels = ['Fossiles', 'Nucléaires', 'Renouvelables'];
  const dataValues = [globalState.Fossiles, globalState.Nucleaire, globalState.Renouvelables];

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: segmentColors, // Utilise l'état des couleurs actuelles
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    hover: {
      mode: null,
    },
    interaction: {
      mode: 'nearest',
    },
    animation: {
      duration: 1000, // Animation de 1 seconde
      easing: 'easeOutCirc', // Effet de l'animation
    },
  };

  // Styles pour le carré gris
  const greySquareStyles = {
    position: 'absolute',
    top: '100px',
    left: '100px',
    width: '250px',
    backgroundColor: 'gray',
    padding: '10px',
    color: 'white',
    borderRadius: '5px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const rowStyles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  };

  const colorBoxStyles = (color) => ({
    width: '20px',
    height: '20px',
    backgroundColor: color,
    marginRight: '10px',
    border: '1px solid white',
  });

  const handleToggleGreySquare = (e) => {
    // Empêche la propagation de l'événement
    e.stopPropagation();
    setShowGreySquare((prevState) => !prevState); // Alterne entre afficher et masquer
  };

  const handleHideGreySquare = () => {
    // Masque le carré gris uniquement s'il est visible
    if (showGreySquare) {
      setShowGreySquare(false);
    }
  };

  return (
    <div
      style={{ position: 'relative', width: '100%', height: 'inherit' }}
      onClick={handleHideGreySquare} // Gestionnaire global pour masquer le carré
    >
      {/* Donut Chart */}
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        onClick={handleToggleGreySquare} // Gère l'affichage du carré gris
      >
        <Doughnut data={data} options={options} ref={chartRef} />
      </div>

      {/* Carré gris affiché dynamiquement */}
      {showGreySquare && (
        <div
          style={greySquareStyles}
          onClick={(e) => e.stopPropagation()} // Empêche le clic sur le carré gris de se propager
        >
          {labels.map((label, index) => (
            <div key={index} style={rowStyles}>
              <div style={colorBoxStyles(segmentColors[index])}></div>
              <span>{label}</span>
              <span style={{ marginLeft: 'auto' }}>{dataValues[index]}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DonutChart;
