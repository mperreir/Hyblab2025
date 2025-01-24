// /src/components/ContexteComponent.jsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import isoVille from '../assets/isoVille.jpg';
//import objectifs from '../../public/data/objectifs.JSON'


const ContexteComponent = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: 0 }}>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
      Vous êtes nommé(e) Ministre de l’Énergie et du Climat de Gallia en 2025. Votre mission est de transformer ces mix pour atteindre la neutralité carbone en 2050 tout en assurant un approvisionnement en énergie stable, abordable et satisfaisant pour la population.
      </Typography>
      
      <img src={isoVille} style={{ width: '80%', marginRight: '10%' }} sx={{ marginBottom: 2}}/>



      <Button variant="contained" color="primary" sx={{ padding: '10px 20px' }}>
<<<<<<< HEAD
        Non
=======
        Suivant
>>>>>>> 89e4b7b (Création dela page contexte (reste à ajouter les objectif écologique))
      </Button>
    </Box>
  );
};

export default ContexteComponent;
