import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import Header from "../components/Header";

function Home() {
  const navigate = useNavigate();

  return (
    <>
    <Header titre={"Dans leur peau"} textColor={"black"} isHome="true"/>
    <div className='home_page'>
      <div className='content'>
        <button className="start-button" onClick={() => navigate("/map")}>
          Start
        </button>
      </div>
    </div>
    </>
  );
}

export default Home;
