import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuestionsPage from "./pages/QuestionsPages";
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
    fontFamily: "Arial, sans-serif", // Set Arial as the default font family
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
        path="/nantes2025/brief/"
        element={<Navigate to="/nantes2025/brief/landing" replace />}
      />
      <Route
        path="/nantes2025/brief/landing"
        element={
          <TransitionsComponent animationType="zoomIn">
            <LandingPage />
          </TransitionsComponent>
        }
      />
      <Route
        path="/nantes2025/brief/questions"
        element={
          <TransitionsComponent animationType="fadeInOut">
            <QuestionsPage />
          </TransitionsComponent>
        }
      />
      <Route
        path="/nantes2025/brief/contexte"
        element={
          <TransitionsComponent animationType="fadeInOut">
            <ContextePage />
          </TransitionsComponent>
        }
      />
      <Route
        path="/nantes2025/brief/outro"
        element={
          <TransitionsComponent animationType="zoomIn">
            <OutroPage />
          </TransitionsComponent>
        }
      />
      <Route
        path="/nantes2025/brief/Introduction"
        element={
          <TransitionsComponent animationType="fadeInOut">
            <DefinitionPage />
          </TransitionsComponent>
        }
      />
      <Route
        path="/nantes2025/brief/Information"
        element={
          <TransitionsComponent animationType="fadeInOut">
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
