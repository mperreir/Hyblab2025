import React from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Logo1 from "../assets/1e PAGE.svg";
import Logo2 from "../assets/LOGO-V1 1.svg";
import { useAppContext } from "../context/AppContextProvider";


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

  const { updateStepper } = useAppContext();


  const handleClick = () => {
    updateStepper(1);
    navigate("/brief/Contexte");
  };

  return (
    <Box sx={{ textAlign: "center", padding: 0 }}>

      <Box display="flex" justifyContent="center" marginBottom={0}>
        <ParallaxProvider>
          <Parallax y={[-20, 20]}>
            <img src={Logo2} style={{ width: "90%", marginBottom: 0 }} alt="image de ville" />
          </Parallax>
        </ParallaxProvider>
      </Box>
      <Box display="flex" justifyContent="center" marginBottom={0}>
        <ParallaxProvider>
          <Parallax y={[-20, 20]}>
            <img src={Logo1} style={{ width: "90%", marginBottom: 0 }} alt="image de ville" />
          </Parallax>
        </ParallaxProvider>
      </Box>

      <StyledButton onClick={handleClick}>Commencer</StyledButton>
    </Box>
  );
};

export default LandingComponent;
