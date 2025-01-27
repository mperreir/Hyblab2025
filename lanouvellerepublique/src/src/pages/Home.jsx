import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import Header from "../components/Header";

function Home() {
  const navigate = useNavigate();

  function goGuide1() {
    navigate("/guide1");
}

  return (
    <>
      <Header titre={"Dans leur peau"} textColor={"black"} isHome="true" />
      <div className='home_page'>
        <div className='content'>
          <div className='titles'>
            <h1 className='main-title'>Découvrez des espèces menacées</h1>
            <p className='subtitle'>
              Découvrez des espèces animales en voie de disparition ainsi que leurs informations
            </p>
          </div>
          {/* <button className="start-button" onClick={() => navigate("/map")}>
          Start
        </button> */}

          <div className='start-button'>
            <span className='start-button-text'onClick={goGuide1}>Commencer</span>
          </div>
        </div>
        <div className="decoration">
          <div className="green-circle"></div>
          <div className="gray-rectangle"></div>
        </div>

      </div>
    </>
  );
}

export default Home;
