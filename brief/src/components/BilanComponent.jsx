import React from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DonutJaugeGroup from "./GraphicsComponent";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";



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



const RecapComponent = ({ bilan }) => {
  const navigate = useNavigate();
  const theme = useTheme();


  const handleRedirect = () => {
    navigate("/brief/outro");
  };
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      style={{
        width: "100%",
        maxWidth: 500,
        margin: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Box pour jauges */}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        height="auto"
        gap={2}
        sx={{
          backgroundColor: "#F5E8F0",
          padding: "25px 15px",
          borderRadius: 5,
          marginBottom: 2,
        }}
      >
        {/* Ici les jauges */}
        <DonutJaugeGroup />
      </Box>

      {/* Contenu récapitulatif */}
      <Box
        width="100%"
        padding={2}
        bgcolor="white"
        backgroundColor="#F5E8EE"
        boxShadow={0}
        display="flex"
        flexDirection="column"
        sx={{ borderRadius: "16px", marginBottom: 2 }}
        gap={1}
      >
        {/* Titre */}
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "18px" }}
          gutterBottom
        >
          {bilan.titre}
        </Typography>

        {/* Texte de bilan */}
        <Typography variant="body1" sx={{ textAlign: "left", marginBottom: 3 }}>
          {bilan.paragraph}
        </Typography>

        {/* Bouton de confirmation */}
        <StyledButton onClick={handleRedirect}>J'ai compris</StyledButton>

      </Box>
    </motion.div>
  );
};

export default RecapComponent;
