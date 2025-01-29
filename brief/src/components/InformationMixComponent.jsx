import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import SwipeableViews from "react-swipeable-views";
import { Box, Typography, Container, styled, Button } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import energyData from "../../public/data/debut/sources_energie.json";
import electricityMixData from "../../public/data/debut/zoom_elec.json";

Chart.register(ArcElement, Tooltip, Legend);

const colors = ["#991756", "#8670CF", "#5A88FF", "#14A473", "#F86A1B"];

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
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNewContent, setShowNewContent] = useState(false);
  const [activeNewIndex, setActiveNewIndex] = useState(0);

  const sources = energyData.sources;
  const electricityMix = electricityMixData.electricity_mix.sources;

  const handleUnderstandClick = () => {
    setShowNewContent(true);
  };

  const handleClick = () => {
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
                    backgroundColor: colors,
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
                  width: 352,
                  height: 400,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <Typography variant="h5" sx={{ color: colors[index], fontWeight: "bold" }}>
                  {item.name}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>

                {item.carbon_emissions && (
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    <strong>Émissions de CO₂ :</strong>{" "}
                    {item.carbon_emissions.value
                      ? `${item.carbon_emissions.value} ${item.carbon_emissions.unit}`
                      : "Données non disponibles"}
                  </Typography>
                )}

                {item.notes && (
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
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
                    <Button variant="contained" color="secondary" onClick={handleUnderstandClick}>
                      J'ai compris
                    </Button>
                  </Box>
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
          <Box sx={{ maxWidth: 352, margin: "auto", position: "relative", height: 300 }}>
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
          <SwipeableViews index={activeNewIndex} onChangeIndex={setActiveNewIndex}>
            {electricityMix.map((item, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#F5E8EE",
                  padding: 3,
                  borderRadius: 2,
                  margin: "20px auto",
                  width: 352,
                  height: 400,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <Typography variant="h5" sx={{ color: colors[index], fontWeight: "bold" }}>
                  {item.name}
                </Typography>
                <Typography variant="body1">{item.text}</Typography>

                {item.notes && (
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
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
                    <Button variant="contained" color="primary" onClick={handleClick}>
                      Suivant
                    </Button>
                  </Box>
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
