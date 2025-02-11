// /src/pages/DefinitionPage.jsx
import React from 'react';
import IntroLayout from '../Layout/IntroductionLayout'; 
import { useNavigate } from 'react-router-dom'; 
import InformationMixComponent from '../components/InformationMixComponent';  
//import DonutChart from '../components/DonutComponent';

const InformationMixPage = () => {
  const navigate = useNavigate();
  return (
    <IntroLayout>
      <InformationMixComponent onStart={() => navigate("/contexte")} />
    </IntroLayout>
  );
};

export default InformationMixPage;