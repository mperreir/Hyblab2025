import { useState } from "react";
import ScrollableMap from "../components/ScrollableMap";
import DialogueBox from "../components/DialogueBox";
import Header from "../components/Header";
import MapCarousel from "../components/MapCarousel";

function MapPage() {
  const [selectedText, setSelectedText] = useState(""); // Manage text globally

  return (
    <>
    <Header titre={"Dans leur peau"} textColor={"white"}/>
    <div className="game_container">
      <ScrollableMap
        width={4000}
        height={4000}
        background="url('/background.jpg')"
        setSelectedText={setSelectedText}
      />
      {selectedText && <DialogueBox text={selectedText} setSelectedText={setSelectedText} />}
      <MapCarousel />
    </div>
    </>
  );
}

export default MapPage;
