// /src/layout/IntroLayout.jsx
import React from 'react';
import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material';

// Le composant Layout de base
const IntroductionLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline /> {/* Assure une base de style cohérente pour MUI */}
      
      <AppBar position="static" sx={{ backgroundColor: '#007BFF' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Bienvenue dans le Jeu !
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, paddingTop: 2, paddingBottom: 2 }}>
        {children} {/* Les composants enfants seront ici */}
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ backgroundColor: '#333', color: 'white', padding: '10px', textAlign: 'center' }}>
        <Typography variant="body2">© 2025 Mon Jeu. Tous droits réservés.</Typography>
      </Box>
    </Box>
  );
};

export default IntroductionLayout;
