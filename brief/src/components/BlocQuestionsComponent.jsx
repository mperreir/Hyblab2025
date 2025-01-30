import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const BlocQuestionComponent = ({
  questionData,
  handleAnswer,
  direction,
  extraContent, // Contenu supplémentaire comme le graphique ou texte explicatif
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
      }}
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={questionData.question_id}
          initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
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
          
          {/* Affichage du contenu supplémentaire */}
          {extraContent && (
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              height="auto"
              gap={2}
              sx={{
                backgroundColor: "#F5E8F0", // Couleur de fond pour un visuel propre
                padding: "25px 15px",
                borderRadius: 5,
                marginBottom: 2,
              }}
            >
              {extraContent}
            </Box>
          )}

          {/* Bloc des réponses */}
          <Box
            width="100%"
            padding={2}
            bgcolor="white"
            boxShadow={0} // Pas d'ombre portée
            display="flex"
            backgroundColor="#F5E8EE"
            flexDirection="column"
            sx={{ borderRadius: "16px" }}
            gap={1}
          >
            {/* Affichage de la question */}
            <Typography
              sx={{ textAlign: "center", fontWeight: "bold" }}
              gutterBottom
            >
              {questionData.question_text}
            </Typography>

            {questionData.responses.map((response, index) => (
              <Button
                key={response.response_id}
                variant="outlined"
                color="primary"
                onClick={() => handleAnswer(response)}
                sx={{
                  borderRadius: "26px",
                  backgroundColor: "#fff",
                  textAlign: "left",
                  justifyContent: "flex-start",
                  //marginY: 1,
                }}
                startIcon={
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontSize="1.2rem"
                  >
                    {String.fromCharCode(65 + index)}.
                  </Typography>
                }
              >
                <Typography variant="body1" >
                  {response.response_text.length > 80
                    ? response.response_text.slice(0, 80) + "..."
                    : response.response_text}
                </Typography>
              </Button>
            ))}
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default BlocQuestionComponent;
