// /src/routes.js
import React from 'react';
import { Navigate  } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Page d'accueil

// Définir les routes de l'application
const routes = [
  {
    path: "/",
    element: <Navigate to="/landing" replace />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  }

];

export default routes;