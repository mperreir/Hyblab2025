import React, { useState } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import EnergyIcon from "./../assets/PictoTransition2050.png";

// Conteneur des indicateurs
const IndicatorContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  marginTop: "16px",
});

// Points de pagination
const IndicatorDot = styled(Box)(({ theme, active }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: active ? theme.palette.primary.main : "transparent",
  border: `2px solid ${theme.palette.primary.main}`,
}));

const ContexteComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const slides = [
    {
      text: "Dans Transition 2050, vous prenez les commandes du système énergétique français.\n Votre objectif : comprendre le mix énergétique actuel, explorer les solutions possibles pour décarboner la France et relever les défis pour atteindre la neutralité carbone en 2050.",
    },
    {
      text: "• Apprendre comment les choix énergétiques façonnent notre avenir climatique.\n • Tester différents scénarios pour construire un mix énergétique équilibré et durable.\n • Participer à une expérience ludique pour mieux comprendre les défis de la transition énergétique.",
    },
  ];

  const handleClick = () => {
    navigate("/brief/Information");
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center", p: 3 }}>
      <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#F5E8EE",
              padding: 3,
              borderRadius: 3,
              margin: "20px auto",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Ligne avec logo et titre */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img src={EnergyIcon} style={{ width: "10%", marginRight: "8px" }} alt="Icône transition énergétique" />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Bienvenue dans Transition 2050 !
              </Typography>
            </Box>

            {/* Contenu du slide */}
            <Typography variant="body1" sx={{ whiteSpace: "pre-line", textAlign: "left" }}>
              {slide.text}
            </Typography>

            {/* Pagination */}
            <IndicatorContainer>
              {slides.map((_, dotIndex) => (
                <IndicatorDot key={dotIndex} active={dotIndex === activeStep} />
              ))}
            </IndicatorContainer>

            {/* Bouton "C'est parti !" sur la dernière page */}
            {activeStep === slides.length - 1 && (
              <Button
                onClick={handleClick}
                sx={{
                  mt: 2,
                  borderRadius: "20px",
                  border: `2px solid ${theme.palette.primary.main}`,
                  backgroundColor: "white",
                  color: theme.palette.primary.main,
                  padding: "8px 20px",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
              >
                C'est parti !
              </Button>
            )}
          </Box>
        ))}
      </SwipeableViews>
    </Box>
  );
};

export default ContexteComponent;
