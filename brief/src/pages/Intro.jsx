import React from 'react';
import IntroLayout from '../Layout/IntroductionLayout';  
import DonutChart from '../components/DonutComponent';

const Intro = () => {
    return (
      <IntroLayout>
        <DonutChart size={100} />
      </IntroLayout>
    );
  };
  
  export default Intro;