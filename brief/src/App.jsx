import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Intro from './pages/Intro';
import ContextePage from './pages/ContextePage';
import OutroPage from './pages/OutroPage';

const App = () => {
  return (
    <Router>      
        <Routes>
          <Route path="/brief/" element={<Navigate to="/brief/landing" replace />} />
          <Route path="/brief/landing" element={<LandingPage/>} />
          <Route path="/brief/flo" element={<Intro/>} />
          <Route path="/brief/contexte" element={<ContextePage/>} />
          <Route path="/brief/outro" element={<OutroPage/>} />
        </Routes>      
    </Router>
  );
};

export default App;