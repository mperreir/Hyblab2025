// /src/components/InformationMixComponent.jsx
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import SwipeableViews from "react-swipeable-views";
import { Box, Typography, Container, useTheme, styled, Button } from "@mui/material";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from 'react-router-dom';
import energyData from "../../public/data/debut/sources_energie.json";

Chart.register(ArcElement, Tooltip);

const colors = ["#991756", "#8670CF" , "#5A88FF" , "#14A473" , "#F86A1B"];


const IndicatorContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: theme.palette.secondary.main,

}));
  
  const IndicatorDot = styled(Box)(({ theme, active }) => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: active ? theme.palette.primary.main : theme.palette.secondary.main,
    border: `2px solid ${theme.palette.primary.main}`,
  }));


const InformationMixComponent = () => {

const navigate = useNavigate(); // Hook pour la navigation
const handleClick = () => {
    navigate('/brief/questions'); // Redirige vers la page /landing (ou une autre page de ton choix)
};


const [activeIndex, setActiveIndex] = useState(0);
const [hoveredIndex, setHoveredIndex] = useState(null);

const sources = energyData.sources;



const chartData = {
    labels: sources.map((e) => e.name),
    datasets: [
      {
        data: sources.map((e, index) =>
          index === activeIndex ? e.percentage * 1.1 : e.percentage
        ),
        backgroundColor: colors,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <Container sx={{ textAlign: "center", marginTop: 5 }}>
      <Typography variant="h4">Mix Énergétique</Typography>

      {/* Graphique */}
      <Box sx={{ maxWidth: 300, margin: "auto" }}>
        <Doughnut
          data={chartData}
          options={{
            plugins: { legend: { display: false } },
            animation: {
              animateScale: true,
            },
          }}
        />
      </Box>

      {/* Swiper pour le texte */}
      <SwipeableViews
        index={activeIndex}
        onChangeIndex={(index) => setActiveIndex(index)}
      >
        {sources.map((item, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#F5E8EE",
              padding: 3,
              borderRadius: 2,
              margin: "20px auto",
              width: "80%",
              maxWidth: "500px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: colors[index],
                fontWeight: "bold",
                textShadow: "0.5px 0.5px 1px black",
              }}
            >
              {item.name}
            </Typography>
            <Typography variant="body1">{item.description}</Typography>

            {item.carbon_emissions && (
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                <strong>Émissions de CO₂ :</strong>{" "}
                {item.carbon_emissions.value
                  ? `${item.carbon_emissions.value} ${item.carbon_emissions.unit}`
                  : item.carbon_emissions.range
                  ? `${item.carbon_emissions.range.min} - ${item.carbon_emissions.range.max} ${item.carbon_emissions.unit}`
                  : "Données non disponibles"}
              </Typography>
            )}

            {item.notes && (
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                {item.notes}
              </Typography>
            )}

            {/* Indicateur de pagination */}
            <IndicatorContainer>
              {sources.map((_, dotIndex) => (
                <IndicatorDot key={dotIndex} active={dotIndex === index} />
              ))}
            </IndicatorContainer>
          </Box>
        ))}
      </SwipeableViews>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick} // Ajoute le gestionnaire de clic pour la navigation
      >
        Suivant
      </Button>
    </Container>

    
  );
};

export default InformationMixComponent;
