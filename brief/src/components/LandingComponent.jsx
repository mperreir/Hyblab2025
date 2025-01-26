// /src/components/LandingComponent.jsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import isoVille from '../assets/Transition2050.png'


const LandingComponent = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  const handleClick = () => {
    navigate('/brief/Introduction'); // Redirige vers la page /landing (ou une autre page de ton choix)
  };

  return (
    <Box sx={{ textAlign: 'center', padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
      Transition 2050 : Prenez les commandes de l’énergie !
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
      Découvrez comment gérer un pays face aux défis énergétiques et climatiques.
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom={2}>
    <img src={isoVille} style={{ width: '80%' }} alt="image de ville" />
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
