import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import IntroLayout from '../Layout/IntroductionLayout';

// Importation des logos
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

const OutroPage = () => {
    return (
        <IntroLayout>
            <Box padding={3}>
                <Typography variant="h4" align="center" gutterBottom>
                    Crédits
                </Typography>

                {/* Logo Hyblab */}
                <Grid container justifyContent="center" sx={{ marginBottom: 4 }}>
                    <img src={Hyblab} alt="Hyblab" style={{ width: '200px' }} />
                </Grid>

                {/* Porteur du projet */}
                <Typography variant="h6" align="center" gutterBottom>
                    Porteur du projet
                </Typography>
                <Grid container justifyContent="center" sx={{ marginBottom: 4 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'secondary.main', color: 'primary.main', textAlign: 'center' }}>
                            <img src={briefLogo} alt="Brief.Science" style={{ width: '150px', marginBottom: '10px' }} />
                            <Typography variant="body1">Morgane GUILLET</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Partenaires */}
                <Typography variant="h6" align="center" gutterBottom>
                    Partenaires
                </Typography>
                <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
                    {[ouestLogo, nantesUnivLogo, nantesMetroLogo].map((logo, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'secondary.main', color: 'primary.main', textAlign: 'center' }}>
                                <img src={logo} alt="Partenaire" style={{ width: '150px' }} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Participants */}
                <Typography variant="h6" align="center" gutterBottom>
                    Participants
                </Typography>
                <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 4 }}>
                    {[{ org: 'AGR', members: ['GOUIN-MARTIN Roméo'], logo: agrLogo },
                      { org: 'SciencesPo', members: ['CURNIER Camille', 'MARTEL Gil'], logo: sciencePoLogo },
                      { org: 'Polytech', members: ['BOSSO CHENDJOU Jérôme Ivan', 'BRENNE Florian', 'DELVOYE Frank', 'GAUTHIER Elie', 'GRASSIEN Manon'], logo: polytechLogo }
                    ].map((group, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'secondary.main', color: 'primary.main', textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    {group.org}
                                </Typography>
                                <img src={group.logo} alt={group.org} style={{ width: '100px', marginBottom: '10px' }} />
                                {group.members.map((name, idx) => (
                                    <Typography key={idx} variant="body1">
                                        {name}
                                    </Typography>
                                ))}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Licences */}
                <Typography variant="h6" align="center" gutterBottom>
                    Licences
                </Typography>
                <Grid container spacing={3} justifyContent="center" alignItems="center" marginBottom={4}>
                    {[OpenSource, CC].map((logo, index) => (
                        <Grid item key={index} xs={6} sm={3} textAlign="center">
                            <img src={logo} alt="Licence" style={{ width: '80px' }} />
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