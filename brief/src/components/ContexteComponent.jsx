// /src/components/ContexteComponent.jsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const ContexteComponent = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
Ceci est le contexte
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        Prêt à démarrer le jeu ? Rejoignez-nous pour une expérience immersive.
      </Typography>
      <Button variant="contained" color="primary" sx={{ padding: '10px 20px' }}>
        Commencer
      </Button>
    </Box>
  );
};

export default ContexteComponent;
