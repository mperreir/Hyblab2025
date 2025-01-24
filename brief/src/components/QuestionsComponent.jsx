// /src/components/QuestionsComponent.jsx
import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useState, useEffect } from 'react';

const QuestionsComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
  
    useEffect(() => {
      // Charger les questions depuis le fichier JSON
      fetch('/brief/public/data/questions/p1_questions.json')
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.questions);
          setCurrentQuestion(data.questions[0]); // Commence par la première question
        })
        .catch((error) => console.error('Erreur lors du chargement des questions :', error));
    }, []);
  
    const handleAnswer = (response) => {
      // Chercher la prochaine question selon le choix
      const nextQuestion = questions.find(
        (q) => q.question_id === response.next_question_id
      );
      setCurrentQuestion(nextQuestion || null); // Affiche null si plus de question
    };
  
    if (!currentQuestion) {
      return <Typography>Chargement...</Typography>;
    }
    
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                gap: 2,
            }}
        >
            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Questions
            </Typography>
            <Card>
        <CardContent>
          {/* Afficher la question */}
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {currentQuestion.question_text}
          </Typography>

          {/* Afficher les choix de réponse */}
          {currentQuestion.responses.map((response) => (
            <Button
              key={response.response_id}
              variant="contained"
              color="primary"
              onClick={() => handleAnswer(response)}
              sx={{ display: 'block', margin: '10px 0' }}
            >
              {response.response_text}
            </Button>
          ))}
        </CardContent>
      </Card>
            <Button variant="contained" color="primary">
                Soumettre
            </Button>
        </Box>
    );
};

export default QuestionsComponent;
