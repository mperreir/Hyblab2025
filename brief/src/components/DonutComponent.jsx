import React, { useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Enregistre les éléments et plugins dans Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  // Référence pour le graphique
  const chartRef = useRef(null);

  // Etat pour gérer la visibilité des informations
  const [showInfo, setShowInfo] = useState(true);

  // Etat pour la taille du donut
  const [chartSize, setChartSize] = useState(300); // Taille initiale de 300px

  // Couleurs initiales
  const initialColors = ['#FF6384', '#36A2EB', '#FFCE56'];

  // Etat pour les couleurs des segments
  const [segmentColors, setSegmentColors] = useState(initialColors);

  // Données du graphique
  const data = {
    labels: ['Rouge', 'Bleu', 'Jaune'],
    datasets: [
      {
        data: [300, 50, 100], // Les données pour le donut
        backgroundColor: segmentColors, // Couleurs des segments
      },
    ],
  };

  // Options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Désactive la légende
      },
      tooltip: {
        enabled: false, // Désactive les tooltips
      },
    },
    hover: {
      mode: null, // Désactive le hover
    },
    interaction: {
      mode: 'nearest', // Permet de détecter l'interaction avec un segment
    },
    animation: false, // Supprime les animations
  };

  // Plugin pour dessiner les labels sur les segments
  const drawLabelsPlugin = {
    id: 'drawLabels',
    afterDatasetsDraw(chart) {
      if (!showInfo) return; // Si showInfo est false, ne pas dessiner les labels

      const { ctx, data } = chart;
      chart.getDatasetMeta(0).data.forEach((arc, index) => {
        const { x, y } = arc.tooltipPosition(); // Position centrale du segment
        const label = data.labels[index]; // Label associé au segment

        ctx.save();
        ctx.fillStyle = 'black'; // Couleur du texte
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Dessine le label au centre du segment
        ctx.fillText(label, x, y);
        ctx.restore();
      });
    },
  };

  // Enregistre le plugin personnalisé
  ChartJS.register(drawLabelsPlugin);

  const handleClick = (event) => {
    // Vérifie si la référence est correcte
    const chart = chartRef.current;

    if (!chart) {
      console.error("Chart not found");
      return;
    }

    // Récupère les éléments sous le clic
    const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

    // Si un segment est cliqué
    if (activePoints.length > 0) {
      const index = activePoints[0].index; // L'index du segment cliqué
      const label = chart.data.labels[index]; // Label du segment

      // Réinitialise les couleurs à leurs valeurs initiales
      const resetColors = [...initialColors];

      // Change la couleur des segments cliqués
      const newColors = resetColors.map((color, i) => {
        if (i === index) {
          return color; // Le segment cliqué garde sa couleur
        } else {
          return '#D3D3D3'; // Gris pour les autres segments
        }
      });

      // Mettre à jour les couleurs
      setSegmentColors(newColors);

      if (label === "Jaune") {
        setChartSize(200); // Réduit la taille à 200px
        setShowInfo(false); // Masque les informations
      } else {
        setChartSize(300); // Restaure la taille normale du donut
        setShowInfo(true); // Réaffiche les informations
      }
    }
    else{
        setChartSize(300); // Restaure la taille normale du donut
    }
  };

  return (
    <div style={{ width: `${chartSize}px`, height: `${chartSize}px` }}>
      <Doughnut
        data={data}
        options={options}
        ref={chartRef} // Ajouter la référence au Doughnut
        onClick={handleClick} // Attacher le gestionnaire de clic
      />
    </div>
  );
}

export default DonutChart;
