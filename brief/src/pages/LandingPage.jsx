// /src/pages/LandingPage.jsx
import React from 'react';
import IntroLayout from '../Layout/IntroductionLayout'; 
import { useNavigate } from 'react-router-dom'; 
import LandingComponent from '../components/LandingComponent';  

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <IntroLayout>
      <LandingComponent onStart={() => navigate("/brief/contexte")} />
    </IntroLayout>
  );
};

export default LandingPage;
