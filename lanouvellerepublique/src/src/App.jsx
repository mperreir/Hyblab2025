import "./App.css"; // Create this file for styles
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import Home from "./pages/Home";
import RegionSelection from "./pages/RegionSelection";
import Credits from "./pages/Credits";
import Guide1 from "./pages/guide1";
import Guide2 from "./pages/guide2";

function App() {
  return (
    <>
    <Router basename="/lanouvellerepublique">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/regions" element={<RegionSelection />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/guide1" element={<Guide1 />} />
        <Route path="/guide2" element={<Guide2 />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
