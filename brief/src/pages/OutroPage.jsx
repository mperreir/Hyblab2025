import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
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
import OpenSource from '../assets/openSource.png';
import CC from '../assets/CCLogo.png';
import Hyblab from '../assets/Hyblab.png';



// Définition des logos avec leurs chemins et descriptions
const logos = [
    { name: 'Hyblab', src: Hyblab, alt: 'Hyblab' },
    { name: 'AGR', src: agrLogo, alt: 'AGR' },
    { name: 'Ouest Medialab', src: ouestLogo, alt: 'Ouest Medialab' },
    { name: 'Polytech Nantes', src: polytechLogo, alt: 'Polytech Nantes' },
    { name: 'BRIEF.SCIENCES', src: briefLogo, alt: 'BRIEF.SCIENCES' },
    { name: 'SciencesPo Rennes', src: sciencePoLogo, alt: 'SciencesPo Rennes' },
    { name: 'Nantes Université', src: nantesUnivLogo, alt: 'Nantes Université' },
    { name: 'Nantes Métropole', src: nantesMetroLogo, alt: 'Nantes Métropole' },
];
const ptilogo = [
    { name: 'OpenSource', src: OpenSource, alt: 'Open Source' },
    { name: 'creative commons', src: CC, alt: 'creative commons' },
];

const participants = [
    { org: 'Brief.Science', members: ['Morgane GUILLET'] },
    { org: 'AGR', members: ['GOUIN-MARTIN Roméo'] },
    { org: 'SciencesPo', members: ['CURNIER Camille', 'MARTEL Gil'] },
    { org: 'Polytech', members: ['BOSSO CHENDJOU Jérôme Ivan', 'BRENNE Florian', 'DELVOYE Frank', 'GAUTHIER Elie', 'GRASSIEN Manon'] },
];

const OutroPage = () => {
    return (
        <IntroLayout>
            <Box padding={3}>
                <Typography variant="h4" align="center" gutterBottom>
                    Credits
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    Un grand merci à toute l'équipe qui a travaillé sur ce projet.
                </Typography>

                {/* Affichage des participants */}
                <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
                    {participants.map((group, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'secondary.main', color: 'primary' }}>
                                <Typography variant="h6" align="center" gutterBottom>
                                    {group.org}
                                </Typography>
                                {group.members.map((name, idx) => (
                                    <Typography key={idx} variant="body1" align="center">
                                        {name}
                                    </Typography>
                                ))}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Affichage des petits logos */}
                <Grid container spacing={3} justifyContent="center" alignItems="center" marginBottom={4}>
                    {ptilogo.map((logo, index) => (
                        <Grid item key={index} xs={6} sm={3} textAlign="center">
                            <img src={logo.src} alt={logo.name} style={{ width: '80px' }} />
                        </Grid>
                    ))}
                </Grid>

                {/* Affichage des logos en rangées de deux */}
                <Grid container spacing={4} justifyContent="center">
                    {logos.map((logo, index) => (
                        <Grid item key={index} xs={6} sm={3} textAlign="center">
                            <img src={logo.src} alt={logo.name} style={{ width: '100%', maxWidth: '180px' }} />
                        </Grid>
                    ))}
                </Grid>

                {/* Bouton retour à l'accueil */}
                <Box textAlign="center" marginTop={4}>
                    <Link to="/brief/" style={{ textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', color: '#991756' }}>
                        Retour à l'accueil
                    </Link>
                </Box>
            </Box>
        </IntroLayout>
    );
};

export default OutroPage;
