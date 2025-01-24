import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Assurez-vous d'ajouter un logo

const NavigationBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#007BFF" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
          <Typography variant="h6">Mon Jeu</Typography>
        </Box>

        {/* Liens */}
        <Box>
          <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: 20 }}>Accueil</Link>
          <Link to="/histoire" style={{ color: "white", textDecoration: "none" }}>Jouer</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
