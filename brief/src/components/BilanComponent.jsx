import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DonutJaugeGroup from "./GraphicsComponent";
import { useNavigate } from "react-router-dom";


const RecapComponent = ({ bilan }) => {
    const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/brief/");
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
        <Typography variant="body1" sx={{ textAlign: "center", marginBottom: 3 }}>
          {bilan.paragraph}
        </Typography>

        {/* Bouton de confirmation */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirect}
          sx={{ borderRadius: "26px", paddingX: 4 }}
        >
          J'ai compris
        </Button>
      </Box>
    </motion.div>
  );
};

export default RecapComponent;
