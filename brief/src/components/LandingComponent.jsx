import React from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Logo from "../assets/LOGO-V1 1.png";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "16px",
  borderRadius: "20px",
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: "white",
  color: theme.palette.primary.main,
  padding: "8px 20px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const LandingComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    navigate("/brief/Contexte");
  };

  return (
    <Box sx={{ textAlign: "center", padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        <span className="typing-animation">
          Transition 2050 : Prenez les commandes de l’énergie !
        </span>
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <ParallaxProvider>
          <Parallax y={[-20, 20]}>
            <img src={Logo} style={{ width: "80%" }} alt="image de ville" />
          </Parallax>
        </ParallaxProvider>
      </Box>

      <StyledButton onClick={handleClick}>Commencer</StyledButton>
    </Box>
  );
};

export default LandingComponent;
