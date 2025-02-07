import "./POIs.css";

// Div containing all POIs for a selected animal
const POIs = ({ setSelectedText, setSelectedPOI, points, setclickedPOI, clickedPOI }) => {
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
    }
  })


  const content = pointsArray.map((point, index) => (
    <div
      key={index}
      className="poi_hitbox"
      style={{
        left: `${point.x - 75/2}px`,
        top: `${point.y - 75/2}px`,
      }}
      onClick={() => {
        setclickedPOI(clickedPOI.map((element, idx) => {
          if (idx == point.id-1) return true;
          return element;
      }));
        setSelectedText(point.text);
        setSelectedPOI([point.id, point.img_name, point.title, point.side, point.img_pos])}}
    >
      <div
        key={index}
        className="poi"
        style={{
          background:`${clickedPOI[point.id-1] == true ? "#127039" : "#c7b499"}`,
          color:`${clickedPOI[point.id-1] == true ? "#efd8b8" : "#000000"}`,
          transform:"rotateZ(15deg)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "600",
        }}
      >
        <span style={{transform:"rotateZ(345deg)"}}>{point.id}</span>
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