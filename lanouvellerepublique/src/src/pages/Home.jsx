import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file
import Header from "../components/Header";
import decoration from "../assets/homepageIllustration.svg";

function Home() {
  const navigate = useNavigate();

  function goGuide() {
    navigate("/guide?step=1");
}

  return (
    <>
      <Header titre={"Dans leur peau"} textColor={"black"} isHome="true" />
      <div className='home_page'>
        <div className='main-content'>
          <div className='titles'>
            <h1 className='main-title'>Sur les traces de cinq espèces menacées</h1>
          </div>
          <div className='start-button'>
            <span className='start-button-text'onClick={goGuide}>Commencer</span>
          </div>
        </div>
        <div className="image-holder">
          <img src={decoration}></img>
        </div>
      </div>
    </>
  );
}

export default Home;
