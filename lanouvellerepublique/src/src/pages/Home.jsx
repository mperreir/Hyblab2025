import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to the Map Explorer</h1>
      <button className="start-button" onClick={() => navigate("/map")}>
        Start
      </button>
    </div>
  );
}

export default Home;
