import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuestionsPage from "./pages/QuestionsPages";
//import Intro from './pages/Intro';
import ContextePage from "./pages/ContextePage";
import OutroPage from "./pages/OutroPage";
import DefinitionPage from "./pages/DefinitionPage";
import InformationMixPage from "./pages/InformationMixPage";

import ScrollTop from "./components/ScrollTop";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./context/AppContextProvider";
import TransitionsComponent from "./components/TransitionsComponent";
import { AnimatePresence } from "framer-motion";


const theme = createTheme({
  typography: {
    h1: { textTransform: "none" },
    h2: { textTransform: "none" },
    h3: { textTransform: "none" },
    h4: { textTransform: "none" },
    h5: { textTransform: "none" },
    h6: { textTransform: "none" },
    subtitle1: { textTransform: "none" },
    subtitle2: { textTransform: "none" },
    button: { textTransform: "none" }, // Pour les boutons également
  },
  palette: {
    primary: {
      main: "#991756",
      light: "#42A5F5",
      dark: "#1565C0",
      contrastText: "#FFFFFF", // Texte contrasté sur la couleur primaire
    },
    secondary: {
      main: "#F5E8EE",
      light: "#E57373",
      dark: "#C62828",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5E8EE", // Fond général
      paper: "#FFFFFF", // Fond des cartes
    },
    text: {
      primary: "#991756", // Couleur principale des textes
      secondary: "#757575", // Couleur secondaire des textes
    },
  },
});


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
      <Route
        path="/brief/"
        element={<Navigate to="/brief/landing" replace />}
      />
      <Route
        path="/brief/landing"
        element={
          <TransitionsComponent animationType="feuille">
            <LandingPage />
          </TransitionsComponent>
        }
      />
      <Route
        path="/brief/questions"
        element={
          <TransitionsComponent animationType="vent">
            <QuestionsPage />
          </TransitionsComponent>
        }
      />
      <Route
        path="/brief/contexte"
        element={
          <TransitionsComponent animationType="vent">
            <ContextePage />
          </TransitionsComponent>
        }
      />
      <Route
        path="/brief/outro"
        element={
          <TransitionsComponent animationType="zoomIn">
            <OutroPage />
          </TransitionsComponent>
        }
      />
      <Route
        path="/brief/Introduction"
        element={
          <TransitionsComponent animationType="feuille">
            <DefinitionPage />
          </TransitionsComponent>
        }
      />
      <Route
        path="/brief/Information"
        element={
          <TransitionsComponent animationType="vent">
            <InformationMixPage />
            </TransitionsComponent>

        }
      />
    </Routes>
  </AnimatePresence>
  );
};



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Router>
          <ScrollTop />

         <AnimatedRoutes />
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
