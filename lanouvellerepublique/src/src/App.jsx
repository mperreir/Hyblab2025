import "./App.css"; // Create this file for styles
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import Home from "./pages/Home";
import RegionSelection from "./pages/RegionSelection";

function App() {
  return (
    <>
    <Router basename="/lanouvellerepublique">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/regions" element={<RegionSelection />} />
        <Route path="/map" element={<MapPage animalRoute='crapaud' />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
