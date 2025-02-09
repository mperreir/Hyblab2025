import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { Box, Typography, Container, styled, Button, IconButton } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useNavigate } from "react-router-dom";
import energyData from "../../src/data/debut/sources_energie.json";
import electricityMixData from "../../src/data/debut/zoom_elec.json";
import { useAppContext } from "../context/AppContextProvider";

Chart.register(ArcElement, Tooltip, Legend);

const colorsMix = ["#4D4D4D", "#FCD383", "#94C9A9", "#E54A4A", "#A6A6A6"];
const colors = [
  "#4D4D4D",
  "#7AA7D2",
  "#A6A6A6",
  "#E54A4A",
  "#FFCC66",
  "#B8A6B5",
];

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
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.secondary.main,
  border: `2px solid ${theme.palette.primary.main}`,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "16px",
  borderRadius: "20px",
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: "white",
  color: theme.palette.primary.main,
  padding: "8px 20px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const InformationMixComponent = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNewContent, setShowNewContent] = useState(false);
  const [activeNewIndex, setActiveNewIndex] = useState(0);

  const { updateStepper } = useAppContext();

  const sources = energyData.sources;
  const electricityMix = electricityMixData.electricity_mix.sources;

  const handleUnderstandClick = () => {
    setShowNewContent(true);
  };

  const handleNext1 = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % sources.length);
  };

  const handleNext2 = () => {
    setActiveNewIndex((prevNewIndex) => (prevNewIndex + 1) % sources.length);
  };
  const handleClick = () => {
    updateStepper(2);
    navigate("/brief/questions");
  };

  return (
    <Container sx={{ textAlign: "center", marginTop: 5 }}>
      {!showNewContent ? (
        <>
          <Typography variant="h4">Mix Énergétique</Typography>

          {/* Premier Doughnut Chart */}
          <Box sx={{ maxWidth: 300, margin: "auto" }}>
            <Doughnut
              data={{
                labels: sources.map((e) => e.name),
                datasets: [
                  {
                    data: sources.map((e, index) =>
                      index === activeIndex ? e.percentage * 1.1 : e.percentage
                    ),
                    backgroundColor: colorsMix,
                    hoverOffset: 10,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: false },
                },
                cutout: "60%",
                animation: { animateScale: true },
              }}
            />
          </Box>

          {/* Swiper pour le texte */}
          <SwipeableViews index={activeIndex} onChangeIndex={setActiveIndex}>
            {sources.map((item, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#F5E8EE",
                  padding: 3,
                  borderRadius: 2,
                  margin: "20px auto",
                  width: "90%",
                  height: "auto",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 30,
                      height: 30,
                      filter:
                        "invert(17%) sepia(55%) saturate(320%) hue-rotate(-10deg)",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#991756",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {item.name} - {item.percentage}%
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {item.text}
                </Typography>

                {item.carbon_emissions && (
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    <strong>Émissions de CO₂ :</strong>{" "}
                    {item.carbon_emissions.value
                      ? `${item.carbon_emissions.value} ${item.carbon_emissions.unit}`
                      : "Données non disponibles"}
                  </Typography>
                )}

                {item.notes && (
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic", textAlign: "left" }}
                  >
                    {item.notes}
                  </Typography>
                )}

                <IndicatorContainer>
                  {sources.map((_, dotIndex) => (
                    <IndicatorDot key={dotIndex} active={dotIndex === index} />
                  ))}
                </IndicatorContainer>

                {index === sources.length - 1 && (
                  <Box sx={{ marginTop: 2 }}>
                    <StyledButton onClick={handleUnderstandClick}>
                      J'ai compris
                    </StyledButton>
                  </Box>
                )}
                 {(activeIndex < sources.length - 1) && (
            <IconButton
              sx={{
                position: "absolute",
                right: 0,
                top: "55%",
                transform: "translateY(-50%)",
              }}
              onClick={activeIndex < sources.length - 1 ? handleNext1 : handleNext2}
            >
              <ArrowForwardIcon />
            </IconButton>
          )}
              </Box>
            ))}
          </SwipeableViews>
         
        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ marginTop: 5 }}>
            Le Mix Électrique
          </Typography>

          {/* Moitié de PieChart sans légende */}
          <Box
            sx={{
              maxWidth: 352,
              margin: "auto",
              position: "relative",
              height: 300,
            }}
          >
            <PieChart
              series={[
                {
                  data: electricityMix.map((e, index) => ({
                    id: index,
                    value: e.percentage,
                    label: e.name,
                    color: colors[index],
                  })),
                  innerRadius: 50,
                  outerRadius: 140,
                  startAngle: -90,
                  endAngle: 90,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  cx: 176,
                  cy: 170, // 🔺 Ajusté pour que le PieChart se colle mieux au carré swipable
                },
              ]}
              width={352}
              height={250} // Augmenté pour donner plus d'espace au PieChart
              margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              slotProps={{
                legend: { hidden: true }, // Cache la légende
              }}
            />
          </Box>

          {/* Swiper pour le texte */}
          <SwipeableViews
            index={activeNewIndex}
            onChangeIndex={setActiveNewIndex}
          >
            {electricityMix.map((item, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#F5E8EE",
                  padding: 3,
                  borderRadius: 2,
                  margin: "20px auto",
                  width: "90%",
                  height: 400,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 30,
                      height: 30,
                      filter:
                        "invert(17%) sepia(55%) saturate(320%) hue-rotate(-10deg)",
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#991756",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {item.name} - {item.percentage}%
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {item.text}
                </Typography>

                {item.notes && (
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic", textAlign: "left" }}
                  >
                    {item.notes}
                  </Typography>
                )}

                <IndicatorContainer>
                  {electricityMix.map((_, dotIndex) => (
                    <IndicatorDot key={dotIndex} active={dotIndex === index} />
                  ))}
                </IndicatorContainer>

                {index === electricityMix.length - 1 && (
                  <Box sx={{ marginTop: 2 }}>
                    <StyledButton onClick={handleClick}>Suivant</StyledButton>
                  </Box>
                )}
                  {( activeNewIndex < electricityMix.length - 1) && (
            <IconButton
              sx={{
                position: "absolute",
                right: 0,
                top: "55%",
                transform: "translateY(-50%)",
              }}
              onClick={ handleNext2}
            >
              <ArrowForwardIcon />
            </IconButton>
          )}
              </Box>
            ))}
          </SwipeableViews>
        
        </>
      )}
    </Container>
  );
};

export default InformationMixComponent;
