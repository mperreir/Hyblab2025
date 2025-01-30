import React from "react";
import { Box } from "@mui/material";
import DonutChart from "./DonutComponent"; // Votre composant DonutChart
import JaugeContainer from "./JaugeContainer"; // Votre composant JaugeContainer
import { useAppContext } from "../context/AppContextProvider";

const DonutJaugeGroup = ({ budget, ges, satisfaction }) => {

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
      sx={{
        width: "100%",
        backgroundColor: "#F5E8F0", // Couleur de fond pour un visuel propre
        padding: 2,
        borderRadius: 5,
        marginBottom: 2,
      }}
    >
      {/* Donut Chart */}
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <DonutChart size={140} />
      </Box>

      {/* JaugeContainer (à droite) */}
      <Box
        flex={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <JaugeContainer
          money={budget}
          happyness= {satisfaction}
          ges= {ges}
          wth={67}
        />
      </Box>
    </Box>
  );
};

export default DonutJaugeGroup;
