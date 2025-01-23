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
    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: "column", minHeight: "100vh",backgroundColor: '#f0f0f5', }}>
      <CssBaseline /> {/* Assure une base de style cohérente pour MUI */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#007BFF",
          width: "100%", // S'étend sur toute la largeur
          maxWidth: "400px", // Limite pour correspondre au format mobile
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Bienvenue dans le Jeu !
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
      <Box
        component="footer"
        sx={{
          backgroundColor: "#333",
          color: "white",
          padding: "10px",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="body2">
          © 2025 Mon Jeu. Tous droits réservés.
        </Typography>
      </Box>
    </Box>
  );
};

export default IntroductionLayout;
