import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import IntroLayout from '../Layout/IntroductionLayout'; 

// Importation des logos (vérifie bien que les fichiers existent dans `src/assets/`)
import agrLogo from '../assets/AGR_Logo.jpg';
import ouestLogo from '../assets/Ouest_Logo.png';
import polytechLogo from '../assets/Polytech_Logo.png';
import briefLogo from '../assets/briefSciences_Logo.png';
import sciencePoLogo from '../assets/sciencesPo_Logo.png';
import nantesUnivLogo from '../assets/NantesUniv_Logo.png';
import nantesMetroLogo from '../assets/NantesMetro_Logo.jpg';

// Définition des logos avec leurs chemins et descriptions
const logos = [
    { name: 'AGR', src: agrLogo, alt: 'AGR' },
    { name: 'Ouest Medialab', src: ouestLogo, alt: 'Ouest Medialab' },
    { name: 'Polytech Nantes', src: polytechLogo, alt: 'Polytech Nantes' },
    { name: 'BRIEF.SCIENCES', src: briefLogo, alt: 'BRIEF.SCIENCES' },
    { name: 'SciencesPo Rennes', src: sciencePoLogo, alt: 'SciencesPo Rennes' },
    { name: 'Nantes Université', src: nantesUnivLogo, alt: 'Nantes Université' },
    { name: 'Nantes Métropole', src: nantesMetroLogo, alt: 'Nantes Métropole' },
];

// Composant qui affiche les logos des partenaires
const OutroPage = () => {
    return (
        <IntroLayout>
            <Box sx={{ padding: 3 }}>
                {/* Titre de la page */}
                <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Credits
                </Typography>

                {/* Affichage des logos */}
                <Grid container spacing={3} justifyContent="center">
                    {logos.map((logo, index) => (
                        <Grid item xs={12} sm={4} key={index} sx={{ textAlign: 'center' }}>
                            <img 
                                src={logo.src} 
                                alt={logo.alt} 
                                style={{ width: '100%', maxWidth: '200px', objectFit: 'contain' }} 
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* Bouton retour à l'accueil */}
                <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                    <Link to="/brief/" style={{ textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', color: '#991756' }}>
                        Retour à l'accueil
                    </Link>
                </Box>
            </Box>
        </IntroLayout>
    );
};

export default OutroPage;
