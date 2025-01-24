import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroLayout from './Layout/IntroductionLayout'; // Le layout principal
import LandingPage from './pages/LandingPage';
import QuestionsPage from './pages/QuestionsPages';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: { textTransform: 'none' },
    h2: { textTransform: 'none' },
    h3: { textTransform: 'none' },
    h4: { textTransform: 'none' },
    h5: { textTransform: 'none' },
    h6: { textTransform: 'none' },
    subtitle1: { textTransform: 'none' },
    subtitle2: { textTransform: 'none' },
    button: { textTransform: 'none' }, // Pour les boutons également
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
        <Routes>
          <Route path="/brief/" element={<Navigate to="/brief/landing" replace />} />
          <Route path="/brief/landing" element={<LandingPage/>} />
          <Route path="/brief/questions" element={<QuestionsPage/> } />
        </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;