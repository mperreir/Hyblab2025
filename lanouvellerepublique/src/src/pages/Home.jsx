import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file

function Home() {
  const navigate = useNavigate();

  return (
    <div className='home_page'>
      <div className='header'></div> 
      <div className='content'>
        <button className="start-button" onClick={() => navigate("/map")}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Home;
