import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import './MapPage.css';
import ScrollableMap from "../components/ScrollableMap";
import DialogueBox from "../components/DialogueBox";
import Header from "../components/Header";
import MapCarousel from "../components/MapCarousel";
import data from '../data/db.json';

import LoutreMap from '../assets/Map-loutreeurope.jpg';
import DefaultMap from '../assets/Map-default.jpg';

const animalMaps = { // Map each animal name with its map image
  Loutre: LoutreMap,
  Papillon: DefaultMap,
  Crapaud: DefaultMap,
  Anguille: DefaultMap,
  Tortue: DefaultMap,
};

const animalsNames = {
  Loutre: "la Loutre d'Europe",
  Tortue: "la Tortue Cistude",
  Crapaud: "le Sonneur à ventre jaune",
  Papillon: "l'Azuré de la pulmonaire",
  Anguille: "l'Anguille argentée",
};

function MapPage() {
  const [selectedText, setSelectedText] = useState(""); // Manage text globally
  const [selectedPOI, setSelectedPOI] = useState([0,"","",0,0]); 
  const [clickedPOI, setclickedPOI] = useState([false,false,false,false,false,false]) // Which POIs were already visited
  const [points, setPoints] = useState([]);
  const [victory, setVictory] = useState(false); // State for victory
  const [showVictory, setShowVictory] = useState(false); // State for victory popup
  const [searchParams] = useSearchParams();
  const mapRef = useRef(null);
  const navigate = useNavigate();

  const queryAnimal = searchParams.get("animal"); // Get 'region' query parameter
  const chosenAnimal = queryAnimal in data ? queryAnimal : 'Loutre'; // Load Loutre by default

  useEffect(() => {
    setPoints(data[chosenAnimal]);
  });

  // Check for victory when clickedPOI changes
  useEffect(() => {
    if (clickedPOI.every((status) => status)) {
      setVictory(true);
    }
  }, [clickedPOI]);

  useEffect(() => {
    if (victory) {
      setTimeout(() => {setShowVictory(true)}, 1000);
    }
  }, [victory]);

  const backgroundImage = animalMaps[chosenAnimal] || DefaultMap;

  return (
    <>
    {!showVictory && (
    <Header textColor={"black"} isMap={true}/>
    )}
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
    {/* Victory Popup */}
    {showVictory && (
        <div className="popup">
          <div className="popup-content">
            <h2>Bien joué ! Tu as réussi à mettre <span>{animalsNames[chosenAnimal]}</span> à l'abri !</h2>
            <div className="controls">
              <a className="button" onClick={() => navigate('/regions')}>ACCUEIL</a>
              <a className="button" onClick={() => setShowVictory(false)}>RESTER</a>
            </div>
            <a className="articles" href="https://www.lanouvellerepublique.fr/environnement/nos-animaux-en-danger" target="_blank">Lire les articles</a>
          </div>
        </div>
      )}
    </>
  );
}

export default MapPage;
