// /src/layout/IntroLayout.jsx
import React from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

// Le composant Layout de base
const IntroductionLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' ,justifyContent: 'center',
      alignItems: 'center',}}>
      <CssBaseline /> {/* Assure une base de style cohérente pour MUI */}

      <AppBar position="sticky"
        sx={{ backgroundColor: 'white', boxShadow: 'none', padding: '5px 0',  borderBottom: '1px solid grey', marginBottom: '16px' }}
      >
        <Toolbar>
          {/* Titre avec 'Brief' en blanc et 'sciences' en couleur #991756 */}
          <Typography sx={{ flexGrow: 1, textAlign: 'left', fontSize: '18px' }}>
            <span style={{ color: 'black', fontWeight: "bold" }}>Brief</span>
            <span style={{ color: '#991756', fontWeight: "bold" }}>.science</span>
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'none', // Keep button text in normal case
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            OFFRIR
          </Button>
           {/* Menu icon on the far left */}
           <IconButton aria-label="menu" sx={{ marginRight: 1 }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: "400px", // Largeur maximale pour simuler un mobile
          paddingTop: 2,
          paddingBottom: 2,
          overflowY: "auto", // Ajoute un défilement vertical si nécessaire
          backgroundColor: "#fff", // Fond blanc pour le contenu principal
          boxShadow: "none", // Légère ombre pour l'effet mobile
          margin: '0 auto', // Centrer le contenu
        }}
      >
        {children} {/* Les composants enfants seront ici */}
      </Container>
      {/* Footer */}
      <Box component="footer" sx={{ backgroundColor: '#c1c1c1', color: 'black', padding: '5px', textAlign: 'center' }}>
        <Typography variant="body2">Tous les contenus ont été réalisés sous une licence ouverte, leur diffusion est libre.</Typography>
      </Box>
    </Box>
  );
};

export default IntroductionLayout;
