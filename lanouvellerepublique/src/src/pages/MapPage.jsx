import { useEffect, useState } from "react";
import { useSearchParams  } from "react-router-dom";
import ScrollableMap from "../components/ScrollableMap";
import DialogueBox from "../components/DialogueBox";
import Header from "../components/Header";
import MapCarousel from "../components/MapCarousel";
import backgroundImage from '../assets/background.jpg';
import data from '../data/db.json';


function MapPage() {
  const [selectedText, setSelectedText] = useState(""); // Manage text globally
  const [points, setPoints] = useState([]);
  const [searchParams] = useSearchParams();
  const queryAnimal = searchParams.get("animal"); // Get 'region' query parameter
  const chosenAnimal = queryAnimal in data ? queryAnimal : 'Loutre'; // Charger la Loutre par défaut

  useEffect(() => {
    const pts = data[chosenAnimal];
    setPoints(pts);
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
        points={points}
      />
      {selectedText && <DialogueBox text={selectedText} setSelectedText={setSelectedText} />}
      <MapCarousel points={points} />
    </div>
    </>
  );
}

export default MapPage;
