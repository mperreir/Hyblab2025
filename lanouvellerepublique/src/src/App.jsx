import { useState } from "react";
import ScrollableMap from "./components/ScrollableMap";
import DialogueBox from "./components/DialogueBox";
import "./App.css"; // Create this file for styles

function App() {
  const [selectedText, setSelectedText] = useState(""); // Manage text globally

  return (
    <div className="game_container">
      <ScrollableMap
        width={4000}
        height={4000}
        background="url('/backiee-98662-landscape.jpg')"
        setSelectedText={setSelectedText}
      />
      {selectedText && <DialogueBox text={selectedText} setSelectedText={setSelectedText} />}
      <h1>Carrousel</h1>
    </div>
  );
}

export default App;
