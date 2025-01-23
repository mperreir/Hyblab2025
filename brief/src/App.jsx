import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroLayout from './Layout/IntroductionLayout'; // Le layout principal
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <IntroLayout>
        <Routes>
          <Route path="/brief/" element={<Navigate to="/brief/landing" replace />} />
          <Route path="/brief/landing" element={<LandingPage/>} />
        </Routes>
      </IntroLayout>
    </Router>
  );
};

export default App;