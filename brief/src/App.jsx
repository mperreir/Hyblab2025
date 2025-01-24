import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
//import Intro from './pages/Intro';
import ContextePage from './pages/ContextePage';
import OutroPage from './pages/OutroPage';

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
  palette: {
    primary: {
      main: '#991756', 
      light: '#42A5F5',
      dark: '#1565C0',
      contrastText: '#FFFFFF', // Texte contrasté sur la couleur primaire
    },
    secondary: {
      main: '#F5E8EE',
      light: '#E57373',
      dark: '#C62828',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5', // Fond général
      paper: '#FFFFFF', // Fond des cartes
    },
    text: {
      primary: '#991756', // Couleur principale des textes
      secondary: '#757575', // Couleur secondaire des textes
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
        <Routes>
        <Route path="/brief/" element={<Navigate to="/brief/landing" replace />} />
          <Route path="/brief/landing" element={<LandingPage/>} />
          <Route path="/brief/contexte" element={<ContextePage/>} />
          <Route path="/brief/outro" element={<OutroPage/>} />
        </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;