import { useEffect, useState } from "react";
import ScrollableMap from "../components/ScrollableMap";
import DialogueBox from "../components/DialogueBox";
import Header from "../components/Header";
import MapCarousel from "../components/MapCarousel";
import backgroundImage from '../../public/background.jpg';
import { useLocation } from "react-router-dom";

function MapPage() {
  const [selectedText, setSelectedText] = useState(""); // Manage text globally
  const [points, setPoints] = useState([]);
  const location = useLocation();

  async function fetchPOIs() {
    const searchParams = new URLSearchParams(location.search);
    const res = await fetch('http://hyblab.polytech.univ-nantes.fr:80/lanouvellerepublique/api/animals/' + searchParams.get("animal"))
      .then(response => response.json())
      .then(response => setPoints(response));
  }

  useEffect(() => {
    fetchPOIs();
  });

  return (
    <>
    <Header titre={"Dans leur peau"} textColor={"white"}/>
    <div className="game_container">
      <ScrollableMap
        width={4000}
        height={4000}
        background={`url(${backgroundImage})`} 
        setSelectedText={setSelectedText}
      />
      {selectedText && <DialogueBox text={selectedText} setSelectedText={setSelectedText} />}
      <MapCarousel points={points} />
    </div>
    </>
  );
}

export default MapPage;
