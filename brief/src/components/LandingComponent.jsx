// /src/components/LandingComponent.jsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Typical from "react-typical";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import isoVille from "../assets/Transition2050.png";

const LandingComponent = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  const handleClick = () => {
    navigate("/brief/Introduction"); // Redirige vers la page /landing (ou une autre page de ton choix)
  };

  return (
    <Box sx={{ textAlign: "center", padding: 3 }}>
        <style>
        {`
          // @keyframes typing {
          //   from { width: 0; }
          //   to { width: 100%; }
          // }
          .typing-animation {
            animation: typing 3s steps(40, end);
          }
        `}
      </style>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
         {/* Apply the animation */}
      <div className="typing-animation">
        Transition 2050 : Prenez les commandes de l’énergie !
      </div>
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Découvrez comment gérer un pays face aux défis énergétiques et
        climatiques.
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <ParallaxProvider>
          <Parallax y={[-20, 20]}>
            <img src={isoVille} style={{ width: "80%" }} alt="image de ville" />
          </Parallax>
        </ParallaxProvider>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Commencer
      </Button>
    </Box>
  );
};

export default LandingComponent;
