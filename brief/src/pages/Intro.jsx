import React from 'react';
import IntroLayout from '../Layout/IntroductionLayout';  
import DonutChart from '../components/Bilan';

const Intro = () => {
    return (
      <IntroLayout>
        <DonutChart/>
      </IntroLayout>
    );
  };
  
  export default Intro;