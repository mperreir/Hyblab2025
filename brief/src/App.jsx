import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroLayout from './Layout/IntroductionLayout'; // Le layout principal
import LandingPage from './pages/LandingPage';
import ContextePage from './pages/ContextePage';

const App = () => {
  return (
    <Router>      
        <Routes>
          <Route path="/brief/" element={<Navigate to="/brief/landing" replace />} />
          <Route path="/brief/landing" element={<LandingPage/>} />
          <Route path="/brief/contexte" element={<ContextePage/>} />
        </Routes>      
    </Router>
  );
};

export default App;