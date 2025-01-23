import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroLayout from './Layout/IntroductionLayout'; // Le layout principal
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <IntroLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/landing" element={<LandingPage/>} />
        </Routes>
      </IntroLayout>
    </Router>
  );
};

export default App;