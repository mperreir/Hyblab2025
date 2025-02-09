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
import StepHeader from "../components/StepHeaderComponent";

// Le composant Layout de base
const IntroductionLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
        overflowX: "hidden", // Empêche le défilement horizontal
      }}
    >
      <CssBaseline /> {/* Assure une base de style cohérente pour MUI */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          padding: "5px 0",
          borderBottom: "1px solid grey",
          zIndex: 1300,

        }}
      >
        <Toolbar>
          {/* Titre avec 'Brief' en blanc et 'sciences' en couleur #991756 */}
          <Typography sx={{ flexGrow: 1, textAlign: "left", fontSize: "18px" }}>
            <span style={{ color: "black", fontWeight: "bold" }}>Brief</span>
            <span style={{ color: "#991756", fontWeight: "bold" }}>
              .science
            </span>
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none", // Keep button text in normal case
              borderRadius: "5px",
              fontWeight: "bold",
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%", // Ne déborde plus
          marginTop: 2,
        }}
      >
        <Box sx={{ width: "90%" }}>
          <StepHeader currentStep={2} />
        </Box>
      </Box>

      <Container
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: "400px", // Largeur maximale pour simuler un mobile
          paddingTop: "100px",
          paddingBottom: "15px",
          overflowY: "auto", // Ajoute un défilement vertical si nécessaire
          backgroundColor: "#fff", // Fond blanc pour le contenu principal
          boxShadow: "none", // Légère ombre pour l'effet mobile
          margin: "0 auto", // Centrer le contenu
        }}
      >
        {children} {/* Les composants enfants seront ici */}
      </Container>
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#c1c1c1",
          color: "black",
          padding: "5px",
          textAlign: "center",
          marginTop: "auto",
          width: "100%",
        }}
      >
        <Typography variant="body2">
          Tous les contenus ont été réalisés sous une licence ouverte, leur
          diffusion est libre.
        </Typography>
      </Box>
    </Box>
  );
};

export default IntroductionLayout;
