// /src/components/QuestionsComponent.jsx
import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DonutJaugeGroup from "./GraphicsComponent";
import { useAppContext } from "../context/AppContextProvider";
import RecapComponent from "./BilanComponent";


const QuestionsComponent = ({ scenarioId }) => {
  const [currentPhase, setCurrentPhase] = useState(null);
  const [phaseText, setPhaseText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [globalState, setGlobalState] = useState({
    Budget: 0,
    GES: 0,
    Satisfaction: 0,
    history: [],
  });

  // Helper function to get scenario folder
  const getScenarioFolder = (scenarioId) => {
    return `scenario${String.fromCharCode(64 + scenarioId)}`;
  };

  // Helper function to fetch data
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    return response.json();
  };

  // Load initial phase and questions
  useEffect(() => {
    if (!scenarioId) return;

    const scenarioFolder = getScenarioFolder(scenarioId);

    const loadInitialData = async () => {
      try {
        // Load phases
        const phaseData = await fetchData(`/brief/public/data/${scenarioFolder}/phases.json`);
        setCurrentPhase(phaseData.phases[0]);
        setPhaseText(phaseData.phases[0].phase_text);

        // Load questions for the first phase
        const questionData = await fetchData(
          `/brief/public/data/${scenarioFolder}/p${phaseData.phases[0].phase_id}_questions.json`
        );
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
    const scenarioFolder = getScenarioFolder(scenarioId);

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
          const phaseData = await fetchData(`/brief/public/data/${scenarioFolder}/phases.json`);
          const newPhase = phaseData.phases.find((phase) => phase.phase_id === nextPhase);
          setCurrentPhase(newPhase);
          setPhaseText(newPhase.phase_text);

          // Load questions for the next phase
          const questionData = await fetchData(
            `/brief/public/data/${scenarioFolder}/p${nextPhase}_questions.json`
          );
          setQuestions(questionData.questions);
          setCurrentQuestion(questionData.questions[0]);
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
          <DonutJaugeGroup />
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