import React, { useState } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import EnergyIcon from "./../assets/PictoTransition2050.png";
import Logo from "../assets/CONTEXTE-TRANSITION 1.svg";


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
    <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center", p: 2 }}>
      <Box display="flex" justifyContent="center" marginBottom={1}>
        <ParallaxProvider>
          <Parallax y={[-15, 15]}>
            <img src={Logo} style={{ width: "90%", marginBottom: 0 }} alt="image de ville" />
          </Parallax>
        </ParallaxProvider>
      </Box>
      <SwipeableViews index={activeStep} onChangeIndex={setActiveStep}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#F5E8EE",
              padding: 2,
              borderRadius: 2,
              margin: "12px auto",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <img src={EnergyIcon} style={{ width: "10%", marginRight: "6px" }} alt="Icône transition énergétique" />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Bienvenue dans Transition 2050 !
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ whiteSpace: "pre-line", textAlign: "left" }}>
              {slide.text}
            </Typography>
            <IndicatorContainer>
              {slides.map((_, dotIndex) => (
                <IndicatorDot key={dotIndex} active={dotIndex === activeStep} />
              ))}
            </IndicatorContainer>
            {activeStep === slides.length - 1 && (
              <StyledButton onClick={handleClick}>C'est parti !</StyledButton>
            )}
          </Box>
        ))}
      </SwipeableViews>
    </Box>
  );
};


export default ContexteComponent;
