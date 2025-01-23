import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import Header from "../components/Header";

function Home() {
  const navigate = useNavigate();

  return (
    <>
    <Header titre={"Dans leur peau"} textColor={"white"}/>
    <div className="home-container">
      <h1>Welcome to the Map Explorer</h1>
      <button className="start-button" onClick={() => navigate("/map")}>
        Start
      </button>
    </div>
    </>
  );
}

export default Home;
