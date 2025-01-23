// /src/components/LandingComponent.jsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/brief/contexte'); // Redirige vers la page /landing (ou une autre page de ton choix)
  };

  return (
    <Box sx={{ textAlign: 'center', padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Bienvenue dans l'aventure !
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Prêt à démarrer le jeu ? Rejoignez-nous pour une expérience immersive.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ padding: '10px 20px' }}
        onClick={handleClick} // Ajoute le gestionnaire de clic pour la navigation
      >
        Commencer
      </Button>
    </Box>
  );
};

export default LandingComponent;
