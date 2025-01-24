import React from 'react';
import IntroLayout from '../Layout/IntroductionLayout';  
import DonutChart from '../components/DonutComponent';

const Intro = () => {
    return (
      <IntroLayout>
        <DonutChart /> {/* Ajout du composant dans le layout */}
      </IntroLayout>
    );
  };
  
  export default Intro;
