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
  const { globalState, setGlobalState } = useAppContext(); // Accès au contexte
  const [currentPhase, setCurrentPhase] = useState(null);
  const [phaseText, setPhaseText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [subQuestions, setSubQuestions] = useState([]); // Pile de sous-questions
  const [direction, setDirection] = useState(0); // Direction du swipe : gauche ou droite
  const [isLoading, setIsLoading] = useState(true); // Indique si les données sont en cours de chargement

  useEffect(() => {
    if (!scenarioId) return;
  
    const scenarioFolder = `scenario${String.fromCharCode(64 + scenarioId)}`;
  
    // Load phases
    fetch(`/brief/public/data/${scenarioFolder}/phases.json`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentPhase(data.phases[0]);
        setPhaseText(data.phases[0].phase_text);
  
        // Load questions for the first phase
        return fetch(
          `/brief/public/data/${scenarioFolder}/p${data.phases[0].phase_id}_questions.json`
        );
      })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setCurrentQuestion(data.questions[0]);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      })
      .finally(() => setIsLoading(false));
  }, [scenarioId]);

  const handleAnswer = (response) => {
    const scenarioFolder = `scenario${String.fromCharCode(64 + scenarioId)}`;
    // Mettre à jour les scores dans le contexte
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
      ], // Ajout à l'historique
    }));

    // Gestion des sous-questions (si elles existent)
    if (response.subquestion && response.subquestion.length > 0) {
      setSubQuestions(response.subquestion); // Ajoute les sous-questions dans la pile
      setDirection(1); // Animation vers la gauche
      setTimeout(() => {
        setCurrentQuestion(response.subquestion[0]); // Affiche la première sous-question
      }, 300);
    } else {
      // Chercher la prochaine question principale
      const nextQuestion = questions.find(
        (q) => q.question_id === response.next_question_id
      );

      if (nextQuestion) {
        setDirection(1); // Animation vers la gauche
        setTimeout(() => {
          setCurrentQuestion(nextQuestion);
        }, 300);
      } else {
        // Si la prochaine question n'est pas trouvée, passer à la phase suivante
        const nextPhase = currentPhase.phase_id + 1;

        if (nextPhase <= 3) {
          // Ajuster ce nombre en fonction du nombre total de phases
          // Charger la phase suivante
          //alert(`Chargement de la phase suivante : ${nextPhase}`);
          fetch(`/brief/public/data/${scenarioFolder}/phases.json`)
            .then((response) => response.json())
            .then((data) => {
              const newPhase = data.phases.find(
                (phase) => phase.phase_id === nextPhase
              );
              setCurrentPhase(newPhase);
              setPhaseText(newPhase.phase_text);

              // Charger les questions de la phase suivante
              fetch(
                `/brief/public/data/${scenarioFolder}/p${nextPhase}_questions.json`
              )
                .then((response) => response.json())
                .then((data) => {
                  setQuestions(data.questions);
                  setCurrentQuestion(data.questions[0]);
                })
                .catch((error) =>
                  console.error(
                    "Erreur lors du chargement des questions de la phase suivante:",
                    error
                  )
                );
            });
        } else {
          // Si toutes les phases sont terminées, afficher la page de fin
          setCurrentQuestion(null);
        }
      }
    }
  };

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

  if (!currentQuestion) {
    return (
      <RecapComponent
        bilan={{
          titre: " 2050 – Un système 100 % renouvelable",
          paragraph:
            "Félicitations, votre pays fonctionne désormais entièrement grâce aux énergies renouvelables ! L’enjeu est maintenant d’optimiser ce modèle : gérer le vieillissement des infrastructures, améliorer le recyclage des panneaux solaires et des éoliennes et anticiper les futurs besoins.",
        }}
      />
    );
  }
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
          key={currentQuestion.question_id}
          initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }} // Entrée : glisse de gauche ou droite
          animate={{ x: 0, opacity: 1 }} // Centre : complètement visible
          exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }} // Sortie : glisse dans la direction opposée
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          style={{
            width: "100%",
            maxWidth: "400px",
            margin: "auto",
            height: "100%", // Respecte le cadre fixe défini par IntroductionLayout
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
            boxShadow={0} // No shadow
            display="flex"
            flexDirection="column"
            sx={{ borderRadius: "16px", marginBottom: 2, backgroundColor: "#F5E8EE" }}
            gap={1}
          >
            {/* Afficher la question */}
            <Typography
              sx={{ textAlign: "center", fontWeight: "bold" }}
              gutterBottom
            >
              {currentQuestion.question_text}
            </Typography>

            {/* Afficher les choix de réponse */}
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
                  justifyContent: "flex-start", // Aligner à gauche
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
