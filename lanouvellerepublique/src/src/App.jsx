import "./App.css"; // Create this file for styles
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import Home from "./pages/Home";
import RegionSelection from "./pages/RegionSelection";
import Credits from "./pages/Credits";
import Guide from "./pages/guide";

function App() {
  return (
    <>
    <Router basename="/nantes2025/lanouvellerepublique">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/regions" element={<RegionSelection />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
