import React from 'react';
import IntroLayout from '../Layout/IntroductionLayout';  
import DonutChart from '../components/DonutComponent';
import GreySquare from '../components/PopupMix';

const Intro = () => {
    return (
      <IntroLayout>
        <DonutChart size={200} />
      </IntroLayout>
    );
  };
  
  export default Intro;