// /src/components/ContexteComponent.jsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import isoVille from '../assets/isoVille.jpg';
//import objectifs from '../../public/data/objectifs.JSON'


const ContexteComponent = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: 0 }}>

      
      <img src={isoVille} style={{ width: '80%', marginRight: '10%' }} sx={{ marginBottom: 2}} alt= 'image de ville'/>

      <Typography variant="body1" sx={{ marginBottom: 2 }}>
      Vous êtes nommé(e) Ministre de l’Énergie et du Climat de Gallia en 2025. Votre mission est de transformer ces mix pour atteindre la neutralité carbone en 2050 tout en assurant un approvisionnement en énergie stable, abordable et satisfaisant pour la population.
      </Typography>

      <Button variant="contained" 
        sx={{ backgroundColor: '#991756', '&:hover': { backgroundColor: '#7d1242' } }}
      >
        Suivant
      </Button>
    </Box>
  );
};

export default ContexteComponent;