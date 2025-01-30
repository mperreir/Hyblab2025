import React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DonutJaugeGroup from "./GraphicsComponent";
import { useAppContext } from "../context/AppContextProvider";
import RecapComponent from "./BilanComponent";

// Import JSON data directly
import scenarioAPhases from "../data/scenarioA/phases.json";
import scenarioAQuestionsP1 from "../data/scenarioA/p1_questions.json";
import scenarioAQuestionsP2 from "../data/scenarioA/p2_questions.json";
import scenarioAQuestionsP3 from "../data/scenarioA/p3_questions.json";

const QuestionsComponent = ({ scenarioId }) => {
  const [currentPhase, setCurrentPhase] = useState(null);
  const [phaseText, setPhaseText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { globalState, setGlobalState } = useAppContext();

  const questionFiles = [scenarioAQuestionsP1, scenarioAQuestionsP2, scenarioAQuestionsP3];

  // Load initial phase and questions
  useEffect(() => {
    if (!scenarioId) return;

    const loadInitialData = async () => {
      try {
        // Load phases
        const phaseData = scenarioAPhases;
        if (!phaseData.phases || phaseData.phases.length === 0) {
          throw new Error("Phases data is empty or undefined");
        }
        setCurrentPhase(phaseData.phases[0]);
        setPhaseText(phaseData.phases[0].phase_text);

        // Load questions for the first phase
        const questionData = questionFiles[0];
        if (!questionData.questions || questionData.questions.length === 0) {
          throw new Error("Questions data is empty or undefined");
        }
        setQuestions(questionData.questions);
        setCurrentQuestion(questionData.questions[0]);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [scenarioId]);

  // Handle answer selection
  const handleAnswer = async (response) => {
    // Update scores
    setGlobalState((prevState) => ({
      ...prevState,
      Budget: prevState.Budget + response.Budget.plus - response.Budget.moins,
      GES: prevState.GES + response.GES.plus - response.GES.moins,
      Satisfaction:
        prevState.Satisfaction +
        response.Satisfaction.plus -
        response.Satisfaction.moins,
      history: [
        ...prevState.history,
        {
          question_id: currentQuestion.question_id,
          response_id: response.response_id,
        },
      ],
    }));

    // Find the next question
    const nextQuestion = questions.find(
      (q) => q.question_id === response.next_question_id
    );

    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Move to the next phase if no more questions
      const nextPhase = currentPhase.phase_id + 1;

      if (nextPhase <= 3) {
        try {
          // Load next phase
          const newPhase = scenarioAPhases.phases.find((phase) => phase.phase_id === nextPhase);
          setCurrentPhase(newPhase);
          setPhaseText(newPhase.phase_text);

          // Load questions for the next phase
          const newQuestions = questionFiles[nextPhase - 1].questions;
          setQuestions(newQuestions);
          setCurrentQuestion(newQuestions[0]);
        } catch (error) {
          console.error("Error loading next phase:", error);
        }
      } else {
        // End of phases
        setCurrentQuestion(null);
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // End of questions
  if (!currentQuestion) {
    return (
      <RecapComponent
        bilan={{
          titre: "2050 – Un système 100 % renouvelable",
          paragraph:
            "Félicitations, votre pays fonctionne désormais entièrement grâce aux énergies renouvelables ! L’enjeu est maintenant d’optimiser ce modèle : gérer le vieillissement des infrastructures, améliorer le recyclage des panneaux solaires et des éoliennes et anticiper les futurs besoins.",
        }}
      />
    );
  }

  // Render the question
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.question_id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: "100%",
            maxWidth: "400px",
            margin: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DonutJaugeGroup 
            budget={globalState.Budget}
            ges={globalState.GES}
            satisfaction={globalState.Satisfaction}
          />
          <Box
            width="100%"
            padding={2}
            bgcolor="white"
            boxShadow={0}
            display="flex"
            flexDirection="column"
            sx={{ borderRadius: "16px", marginBottom: 2, backgroundColor: "#F5E8EE" }}
            gap={1}
          >
            {/* Display the question */}
            <Typography
              sx={{ textAlign: "center", fontWeight: "bold" }}
              gutterBottom
            >
              {currentQuestion.question_text}
            </Typography>

            {/* Display answer choices */}
            {currentQuestion.responses.map((response, index) => (
              <Button
                key={response.response_id}
                variant="outlined"
                color="primary"
                onClick={() => handleAnswer(response)}
                sx={{
                  padding: "12px 16px",
                  borderRadius: "26px",
                  backgroundColor: "#fff",
                  textAlign: "left",
                  justifyContent: "flex-start",
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
                <Typography variant="body1">
                  {response.response_text}
                </Typography>
              </Button>
            ))}
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default QuestionsComponent;