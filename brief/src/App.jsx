import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroLayout from './Layout/IntroductionLayout'; // Le layout principal
import LandingPage from './pages/LandingPage';
import Intro from './pages/Intro';

const App = () => {
  return (
    <Router>
      <IntroLayout>
        <Routes>
          <Route path="/brief/" element={<Navigate to="/brief/landing" replace />} />
          <Route path="/brief/landing" element={<LandingPage/>} />
          <Route path="/brief/contexte" element={<div>Page de l’histoire à venir...</div>} />
          <Route path="/brief/flo" element={<Intro/>} />
        </Routes>
      </IntroLayout>
    </Router>
  );
};

export default App;