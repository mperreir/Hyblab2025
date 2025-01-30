import React, { useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppContext } from "../context/AppContextProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ size = 300 }) {
  const { globalState } = useAppContext();
  const chartRef = useRef(null);

  const initialColors = ["#B8A6B5", "#7AA7D2", "#93C3A6"];
  const [segmentColors] = useState(initialColors);
  const [showGreySquare, setShowGreySquare] = useState(false);

  const labels = ["Fossiles", "Nucléaires", "Renouvelables"];
  const dataValues = [globalState.Fossiles, globalState.Nucleaire, globalState.Renouvelables];

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: segmentColors,
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
      mode: "nearest",
    },
    animation: {
      duration: 1000,
      easing: "easeOutCirc",
    },
  };

  const greySquareStyles = {
    position: "absolute",
    top: "100px",
    left: "100px",
    width: "250px",
    backgroundColor: "gray",
    padding: "10px",
    color: "white",
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  };

  const rowStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  };

  const colorBoxStyles = (color) => ({
    width: "20px",
    height: "20px",
    backgroundColor: color,
    marginRight: "10px",
    border: "1px solid white",
  });

  const handleToggleGreySquare = (e) => {
    e.stopPropagation();
    setShowGreySquare((prevState) => !prevState);
  };

  const handleHideGreySquare = () => {
    if (showGreySquare) {
      setShowGreySquare(false);
    }
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "inherit" }}
      onClick={handleHideGreySquare}
    >
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        onClick={handleToggleGreySquare}
      >
        <Doughnut data={data} options={options} ref={chartRef} />
      </div>

      {showGreySquare && (
        <div style={greySquareStyles} onClick={(e) => e.stopPropagation()}>
          {labels.map((label, index) => (
            <div key={index} style={rowStyles}>
              <div style={colorBoxStyles(segmentColors[index])}></div>
              <span>{label}</span>
              <span style={{ marginLeft: "auto" }}>{dataValues[index]}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DonutChart;
