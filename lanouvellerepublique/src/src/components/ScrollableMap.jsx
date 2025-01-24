import { useRef, useState } from "react";
import POIs from "./POIs.jsx";
import "./ScrollableMap.css"; // Create this file for styles

function ScrollableMap({ width = 3000, height = 3000, background, setSelectedText }) {
  const mapRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 });

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
      <POIs setSelectedText={setSelectedText}/>
      </div>
    </div>
  );
}

export default ScrollableMap;
