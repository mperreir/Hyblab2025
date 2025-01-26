// /src/layout/IntroLayout.jsx
import React from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";

// Le composant Layout de base
const IntroductionLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
      <CssBaseline /> {/* Assure une base de style cohérente pour MUI */}

      <AppBar position="static"
        sx={{ backgroundColor: 'white', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', padding: '5px 0' }}
      >
        <Toolbar>
          {/* Titre avec 'Brief' en blanc et 'sciences' en couleur #991756 */}
          <Typography sx={{ flexGrow: 1, textAlign: 'left', fontSize: '18px' }}>
            <span style={{ color: 'black', fontWeight: "bold" }}>Brief</span>
            <span style={{ color: '#991756', fontWeight: "bold" }}>.science</span>
          </Typography>
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
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Légère ombre pour l'effet mobile
          borderRadius: "5px", // Coins arrondis
        }}
      >
        {children} {/* Les composants enfants seront ici */}
      </Container>
      {/* Footer */}
      <Box component="footer" sx={{ backgroundColor: '#c1c1c1', color: 'black', padding: '10px', textAlign: 'center' }}>
        <Typography variant="body2">Tous les contenus ont été réalisés sous une licence ouverte, leur diffusion est libre.</Typography>
      </Box>
    </Box>
  );
};

export default IntroductionLayout;
