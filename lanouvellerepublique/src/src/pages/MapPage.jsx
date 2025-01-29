import { useEffect, useRef, useState } from "react";
import { useSearchParams  } from "react-router-dom";
import ScrollableMap from "../components/ScrollableMap";
import DialogueBox from "../components/DialogueBox";
import Header from "../components/Header";
import MapCarousel from "../components/MapCarousel";
import backgroundImage from '../assets/Map-loutreeurope.jpg';
import data from '../data/db.json';


function MapPage() {
  const [selectedText, setSelectedText] = useState(""); // Manage text globally
  const [selectedPOI, setSelectedPOI] = useState([0,"","","",0]);
  const [points, setPoints] = useState([]);
  const [searchParams] = useSearchParams();
  const mapRef = useRef(null);
  const queryAnimal = searchParams.get("animal"); // Get 'region' query parameter
  const chosenAnimal = queryAnimal in data ? queryAnimal : 'Loutre'; // Charger la Loutre par défaut
/*
  async function fetchPOIs() {
    const res = await fetch('http://localhost:8080/lanouvellerepublique/api/animals/Loutre') // TEST (route à modifier)
      .then(response => response.json())
      .then(response => setPoints(response));
  }
*/

  useEffect(() => {
    const pts = data[chosenAnimal];
    setPoints(data[chosenAnimal]);
    //fetchPOIs();
  });

  return (
    <>
    <Header titre={"Dans leur peau"} textColor={"white"}/>
    <div className="game_container">
      <ScrollableMap
        mapRef={mapRef}
        width={4000}
        height={4000}
        background={`url(${backgroundImage})`} 
        setSelectedText={setSelectedText}
        setSelectedPOI={setSelectedPOI}
        points={points}
      />
      {selectedText && <DialogueBox text={selectedText} setSelectedText={setSelectedText} POI={selectedPOI} setSelectedPOI={setSelectedPOI} chosenAnimal={chosenAnimal}/>}
      <MapCarousel mapRef={mapRef} points={points} setSelectedText={setSelectedText} setSelectedPOI={setSelectedPOI} />
    </div>
    </>
  );
}

export default MapPage;
