import { useEffect, useRef, useState } from "react";
import ScrollableMap from "../components/ScrollableMap";
import DialogueBox from "../components/DialogueBox";
import Header from "../components/Header";
import MapCarousel from "../components/MapCarousel";

function MapPage() {
  const [selectedText, setSelectedText] = useState(""); // Manage text globally
  const [points, setPoints] = useState([]);

  const mapRef = useRef(null);

  async function fetchPOIs() {
    await fetch('http://localhost:8080/lanouvellerepublique/api/animals/crapaud') // TEST (route à modifier)
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
        mapRef={mapRef}
        width={4000}
        height={4000}
        background="url('../background.jpg')"
        setSelectedText={setSelectedText}
      />
      {selectedText && <DialogueBox text={selectedText} setSelectedText={setSelectedText} />}
      <MapCarousel mapRef={mapRef} points={points} />
    </div>
    </>
  );
}

export default MapPage;
