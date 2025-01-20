// src/App.jsx
import React from 'react';
import { Link } from 'react-scroll';
import Home from './screens/Home';
import ChoosePlayer from './screens/ChoosePlayer';

const App = () => {
  return (
    <div className='h-screen w-full overflow-y-scroll snap-y snap-mandatory [scroll-behavior:smooth]'>
      <Home />
      <ChoosePlayer />
    </div>
  );
};

export default App;
