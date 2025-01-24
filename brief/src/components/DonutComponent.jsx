import React, { useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import jsonData from './../../public/data/debut/sources_energie.json';

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ size = 300 }) {
  const chartRef = useRef(null);

  // Initialisation des couleurs dynamiques
  const initialColors = jsonData.sources.map((source) => source.color);
  const [segmentColors, setSegmentColors] = useState(initialColors); // État des couleurs actuelles

  const labels = jsonData.sources.map((source) => source.name);
  const dataValues = jsonData.sources.map((source) => source.percentage);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: segmentColors, // Utilise l'état des couleurs actuelles
      },
    ],
  };

    /* fonction pour changer de couleur au moment de du swipe
  // Fonction pour gérer les clics sur un segment
  const handleClick = (event) => {
    const chart = chartRef.current;

    if (!chart) {
      console.error('Chart not found');
      return;
    }

    const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

    if (activePoints.length > 0) {
      const index = activePoints[0].index; // Récupère l'index du segment cliqué

      // Met à jour les couleurs : le segment cliqué conserve sa couleur, les autres deviennent gris
      const newColors = segmentColors.map((color, i) =>
        i === index ? initialColors[i] : '#D3D3D3' // Gris pour les autres
      );

      setSegmentColors(newColors); // Applique les nouvelles couleurs
    }
  };
*/

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

  return (
    <div style={{ width: `${size}px`, height: `${size}px` }}>
      <Doughnut
        data={data}
        options={options}
        ref={chartRef}
      />
    </div>
  );
}

export default DonutChart;
