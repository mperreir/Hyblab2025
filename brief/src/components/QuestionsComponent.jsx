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

const QuestionsComponent = () => {
  const { globalState, setGlobalState } = useAppContext(); // Accès au contexte
  const [currentPhase, setCurrentPhase] = useState(null);
  const [phaseText, setPhaseText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [subQuestions, setSubQuestions] = useState([]); // Pile de sous-questions
  const [direction, setDirection] = useState(0); // Direction du swipe : gauche ou droite
  const [isLoading, setIsLoading] = useState(true); // Indique si les données sont en cours de chargement

  useEffect(() => {
    // Charger la phase actuelle
    fetch("/brief/public/data/scenarioA/phases.json")
      .then((response) => response.json())
      .then((data) => {
        setCurrentPhase(data.phases[0]); // Phase 1 au début
        setPhaseText(data.phases[0].phase_text); // Texte de la phase
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des phases :", error)
      );
  }, []);

  useEffect(() => {
    if (currentPhase) {
      // Charger les questions de la phase actuelle
      fetch(
        `/brief/public/data/scenarioA/p${currentPhase.phase_id}_questions.json`
      )
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.questions);
          setCurrentQuestion(data.questions[0]);
        })
        .catch((error) =>
          console.error("Erreur lors du chargement des questions :", error)
        )
        .finally(() => setIsLoading(false));
    }
  }, [currentPhase]);

  const handleAnswer = (response) => {
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
          fetch("/brief/public/data/scenarioA/phases.json")
            .then((response) => response.json())
            .then((data) => {
              const newPhase = data.phases.find(
                (phase) => phase.phase_id === nextPhase
              );
              setCurrentPhase(newPhase);
              setPhaseText(newPhase.phase_text);

              // Charger les questions de la phase suivante
              fetch(`/brief/public/data/scenarioA/p${nextPhase}_questions.json`)
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
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: 2 }}>
        Félicitations, vous avez terminé !
      </Typography>
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
            position: "absolute",
            width: "100%",
            maxWidth: 500,
            margin: "auto",
            height: "100%", // Respecte le cadre fixe défini par IntroductionLayout
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Graphique interactif
          </Typography>
          <DonutJaugeGroup />
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
            {/* Afficher la question */}
            <Typography variant="h7" align="center" gutterBottom>
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
