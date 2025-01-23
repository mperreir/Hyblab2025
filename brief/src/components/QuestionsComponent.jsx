// /src/components/QuestionsComponent.jsx
import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

const QuestionsComponent = () => {
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
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Répondez aux questions pour avancer dans le jeu !
            </Typography>
            
            {/* Exemple de formulaire */}
            <TextField
                label="Votre réponse"
                variant="outlined"
                fullWidth
                sx={{
                    maxWidth: '400px',
                }}
            />
            <Button variant="contained" color="primary">
                Soumettre
            </Button>
        </Box>
    );
};

export default QuestionsComponent;
