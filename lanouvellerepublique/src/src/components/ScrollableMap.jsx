import { useRef, useState } from "react";
import POIs from "./POIs.jsx";
import "./ScrollableMap.css"; // Create this file for styles

function ScrollableMap({ width = 3000, height = 3000, background, setSelectedText }) {
  const mapRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });

  const points = [
    { x: 500, y: 300, text: "This is the first point. Here is some placeholder text." },
    { x: 1200, y: 800, text: "Catulus in aedilitate sua suspendit omnium primus; aut pugnaciter aleis certant turpi sono fragosis naribus introrsum reducto spiritu concrepantes; aut quod est studiorum omnium maximum ab ortu lucis ad vesperam sole fatiscunt vel pluviis, per minutias aurigarum equorumque praecipua vel delicta scrutantes." },
    { x: 2500, y: 1500, text: "Proinde die funestis interrogationibus praestituto imaginarius iudex equitum resedit magister adhibitis aliis iam quae essent agenda praedoctis, et adsistebant hinc inde notarii, quid quaesitum esset, quidve responsum, cursim ad Caesarem perferentes, cuius imperio truci, stimulis reginae exsertantis aurem subinde per aulaeum, nec diluere obiecta permissi nec defensi periere conplures." }
  ];

  // Handle both mouse and touch events
  const startDrag = (x, y) => {
    setIsDragging(true);
    setStartPos({ x, y });
    setScrollPos({
      left: mapRef.current.scrollLeft,
      top: mapRef.current.scrollTop,
    });
  };

  const doDrag = (x, y) => {
    if (!isDragging) return;
    const dx = x - startPos.x;
    const dy = y - startPos.y;
    mapRef.current.scrollLeft = scrollPos.left - dx;
    mapRef.current.scrollTop = scrollPos.top - dy;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => startDrag(e.clientX, e.clientY);
  const handleMouseMove = (e) => doDrag(e.clientX, e.clientY);
  const handleMouseUp = stopDrag;

  // Touch event handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    doDrag(touch.clientX, touch.clientY);
  };

  return (
    <div
      className="map-container"
      ref={mapRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div
        className="map"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: background || "lightgray",
        }}
      >
      <POIs points={points} setSelectedText={setSelectedText}/>
      </div>
    </div>
  );
}

export default ScrollableMap;
