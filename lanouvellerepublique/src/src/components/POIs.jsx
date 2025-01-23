import "./POIs.css";

const POIs = ({ points, setSelectedText }) => {
  return (
    <div className="pois">
      {points.map((point, index) => (
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
      ))}
    </div>
  );
};
  
export default POIs;