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
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        <Typical
          steps={[
            "Transition 2050 : Prenez les commandes de l’énergie !",
            1500, // Temps d'affichage
          ]}
          loop={1} // Ne pas répéter
        />
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
        onClick={handleClick} // Ajoute le gestionnaire de clic pour la navigation
      >
        Commencer
      </Button>
    </Box>
  );
};

export default LandingComponent;
