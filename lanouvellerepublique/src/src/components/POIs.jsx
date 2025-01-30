import { useEffect, useState } from "react";
import "./POIs.css";

const POIs = ({ setSelectedText, setSelectedPOI, points }) => {
  const pointsArray = points.map((point) => {
    return {
      x: point.pos[0],
      y: point.pos[1],
      text: point.text,
      id: point.id,
      title: point.title,
      img_name: point.img_name,
      side: point.pos_img,
      img_pos: point.icon_pos,
      lower: point.lower,
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
      onClick={() => {
        setSelectedText(point.text);
        setSelectedPOI([point.id, point.img_name, point.title, point.side, point.img_pos, point.lower])}}
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