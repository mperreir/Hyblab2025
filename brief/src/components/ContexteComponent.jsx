// /src/components/ContexteComponent.jsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import isoVille from '../assets/isoVille.png';
//import objectifs from '../../public/data/objectifs.JSON'


const ContexteComponent = () => {

  const navigate = useNavigate(); // Hook pour la navigation

    const handleClick = () => {
        navigate('/brief/Information'); // Redirige vers la page /landing (ou une autre page de ton choix)
    };
  return (
    <Box sx={{ textAlign: 'center', padding: 0 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Un peu de contexte !
      </Typography>

      <img src={isoVille} style={{ width: '80%', marginRight: '10%' }} sx={{ marginBottom: 2 }} alt='image de ville' />

      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Vous êtes nommé(e) Ministre de l’Énergie et du Climat de Gallia en 2025. Votre mission est de transformer ces mix pour atteindre la neutralité carbone en 2050 tout en assurant un approvisionnement en énergie stable, abordable et satisfaisant pour la population.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleClick} // Ajoute le gestionnaire de clic pour la navigation
      >
        Suivant
      </Button>
    </Box>
  );
};

export default ContexteComponent;