import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroLayout from './Layout/IntroductionLayout'; // Le layout principal
import LandingPage from './pages/LandingPage';
import QuestionsPage from './pages/QuestionsPages';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/brief/" element={<Navigate to="/brief/landing" replace />} />
          <Route path="/brief/landing" element={<LandingPage/>} />
          <Route path="/brief/questions" element={<QuestionsPage/> } />
        </Routes>
    </Router>
  );
};

export default App;