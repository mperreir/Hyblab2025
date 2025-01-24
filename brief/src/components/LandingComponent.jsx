// /src/components/LandingComponent.jsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingComponent = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  const handleClick = () => {
    navigate('/brief/contexte'); // Redirige vers la page /landing (ou une autre page de ton choix)
  };

  return (
    <Box sx={{ textAlign: 'center', padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
      EnerMix : Prenez les commandes de l’énergie !
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
      Découvrez comment gérer un pays face aux défis énergétiques et climatiques.       </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
      À travers des choix interactifs et des crises inattendues, formez-vous sur les énergies, leur impact sur le climat, et forgez votre opinion sur l’avenir énergétique. Saurez-vous construire un mix durable et équilibré ?
      </Typography>

      <Button
        variant="contained"
        sx={{ backgroundColor: '#991756', '&:hover': { backgroundColor: '#7d1242' } }}
        onClick={handleClick} // Ajoute le gestionnaire de clic pour la navigation
      >
        Commencer
      </Button>
    </Box>
  );
};

export default LandingComponent;
