import { useEffect, useState } from "react";
import "./POIs.css";

const POIs = ({ setSelectedText, points }) => {
  const pointsArray = points.map((point) => {
    return {
      x: point.pos[0],
      y: point.pos[1],
      text: point.text,
    }
  })

  const content = pointsArray.map((point, index) => (
    <div
      key={index}
      className="poi_hitbox"
      style={{
        left: `${point.x - 75/2}px`,
        top: `${point.y - 75/2}px`
      }}
      onClick={() => setSelectedText(point.text)}
    >
      <div
        key={index}
        className="poi"
      >
      </div>
    </div>
  ));

  return (
    <div className="pois">
      {content}
    </div>
  );
};
  
export default POIs;