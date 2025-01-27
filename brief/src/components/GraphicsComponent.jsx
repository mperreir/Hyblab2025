import React from "react";
import { Box } from "@mui/material";
import DonutChart from "./DonutComponent"; // Votre composant DonutChart
import JaugeContainer from "./Jauge"; // Votre composant JaugeContainer

const DonutJaugeGroup = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      sx={{
        backgroundColor: "#f5f5f5", // Couleur de fond pour un visuel propre
        padding: 2,
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Ombre douce
      }}
    >
      {/* Donut Chart */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <DonutChart size={200} />
      </Box>

      {/* Jauges */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <JaugeContainer
          money={45}
          happyness={56}
          ges={34}
          wth={67}
        />
      </Box>
    </Box>
  );
};

export default DonutJaugeGroup;
