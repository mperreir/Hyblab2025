// /src/pages/DefinitionPage.jsx
import React from 'react';
import IntroLayout from '../Layout/IntroductionLayout'; 
import { useNavigate } from 'react-router-dom'; 
import LandingComponent from '../components/DefinitionComponent';  

const DefinitionPage = () => {
  const navigate = useNavigate();
  return (
    <IntroLayout>
      <LandingComponent onStart={() => navigate("/contexte")} />
    </IntroLayout>
  );
};

export default DefinitionPage;