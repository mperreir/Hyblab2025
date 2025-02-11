// /src/pages/ContextePage.jsx
import React from 'react';
import IntroLayout from '../Layout/IntroductionLayout'; 
import { useNavigate } from 'react-router-dom'; 
import LandingComponent from '../components/ContexteComponent';  

const ContextePage = () => {
  const navigate = useNavigate();
  return (
    <IntroLayout>
      <LandingComponent onStart={() => navigate("/Information")} />
    </IntroLayout>
  );
};

export default ContextePage;
