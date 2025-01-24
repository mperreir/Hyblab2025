import { useEffect, useState } from "react";
import "./POIs.css";

const POIs = ({ setSelectedText }) => {
  const [poisArray, setPoisArray ]= useState([]);

  async function loadPOIs(){
    const list = [];
    fetch('http://localhost:8080/lanouvellerepublique/api/animals/Loutre')
      .then(response => {
        return response.json();
      })
      .then(response => {
        response.forEach(item => {
          let dic = {id: item.id, x: item.pos[0], y : item.pos[1], text : item.text, linked : item.linked};
          list.push(dic);
        });
        setPoisArray(list);
      });
    };

    const content = poisArray.map((point, index) => (
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

  useEffect(() => {
    loadPOIs();
  });

  return (
    <div className="pois">
      {content}
    </div>
  );
};
  
export default POIs;