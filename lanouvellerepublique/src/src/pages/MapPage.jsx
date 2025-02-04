import { useEffect, useRef, useState } from "react";
import { useSearchParams  } from "react-router-dom";
import ScrollableMap from "../components/ScrollableMap";
import DialogueBox from "../components/DialogueBox";
import Header from "../components/Header";
import MapCarousel from "../components/MapCarousel";
import data from '../data/db.json';

import LoutreMap from '../assets/Map-loutreeurope.jpg';
import DefaultMap from '../assets/Map-default.jpg';

const animalMaps = {
  Loutre: LoutreMap,
  Papillon: DefaultMap,
  Crapaud: DefaultMap,
  Anguille: DefaultMap,
  Tortue: DefaultMap,
};

function MapPage() {
  const [selectedText, setSelectedText] = useState(""); // Manage text globally
  const [selectedPOI, setSelectedPOI] = useState([0,"","",0,0]);
  const [clickedPOI, setclickedPOI] = useState([false,false,false,false,false,false])
  const [points, setPoints] = useState([]);
  const [searchParams] = useSearchParams();
  const mapRef = useRef(null);
  const queryAnimal = searchParams.get("animal"); // Get 'region' query parameter
  const chosenAnimal = queryAnimal in data ? queryAnimal : 'Loutre'; // Charger la Loutre par défaut

  useEffect(() => {
    const pts = data[chosenAnimal];
    setPoints(data[chosenAnimal]);
    //fetchPOIs();
  });

  const backgroundImage = animalMaps[chosenAnimal] || DefaultMap;

  return (
    <>
    <Header textColor={"black"} isMap={true}/>
    <div className="game_container">
      <ScrollableMap
        mapRef={mapRef}
        width={3449}
        height={4242}
        background={`url(${backgroundImage})`} 
        setSelectedText={setSelectedText}
        setSelectedPOI={setSelectedPOI}
        points={points}
        setclickedPOI={setclickedPOI}
        clickedPOI={clickedPOI}
      />
      {selectedText && <DialogueBox text={selectedText} setSelectedText={setSelectedText} POI={selectedPOI} setSelectedPOI={setSelectedPOI} chosenAnimal={chosenAnimal}/>}
      <MapCarousel mapRef={mapRef} points={points} setSelectedText={setSelectedText} setSelectedPOI={setSelectedPOI} clickedPOI={clickedPOI} setclickedPOI={setclickedPOI}/>
    </div>
    </>
  );
}

export default MapPage;
