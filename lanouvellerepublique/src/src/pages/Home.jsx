import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import Header from "../components/Header";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header titre={"Dans leur peau"} textColor={"black"} isHome="true" />
      <div className='home_page'>
        <div className='content'>
          <div className='titles'>
            <h1 className='main-title'>Découvrez des espèces menacées</h1>
            <p className='subtitle'>
              Découvrez des espèces animales en voie de disparitions ainsi que leurs informations
            </p>
          </div>
          {/* <button className="start-button" onClick={() => navigate("/map")}>
          Start
        </button> */}

          <div className='start-button'>
            <span className='start-button-text'>Explore</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
