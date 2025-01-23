// /src/pages/LandingPage.jsx
import React from 'react';
import IntroLayout from '../Layout/IntroductionLayout';  
import LandingComponent from '../components/LandingComponent';  

const LandingPage = () => {
  return (
    <IntroLayout>
      <LandingComponent /> {/* Ajout du composant dans le layout */}
    </IntroLayout>
  );
};

export default LandingPage;
