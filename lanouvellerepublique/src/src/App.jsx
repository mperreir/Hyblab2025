import "./App.css"; // Create this file for styles
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import Home from "./pages/Home";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/regions" element={<MapPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
