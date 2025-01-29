import { useNavigate } from "react-router-dom";
import "./guide2.css"; // Import the CSS file
import Header from "../components/Header";
import animalImage from "../assets/loutre2.png"; 
import lineDesign from "../assets/lignedesign2.svg"; 
import textBubble from "../assets/Vector.png"; 

function Guide2() {
    const navigate = useNavigate();

    return (
        <>
            <Header titre={"Dans leur peau"} textColor={"black"} />
            <div className="guide2-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    Retour
                </button>
                <div className="pathway2">
                    <img src={lineDesign} alt="Design ligne" className="line-design2" />
                </div>
                <div className="animal-section2">
                    <div className="bubble-container2">
                        <img src={textBubble} alt="Bulle de texte" className="bubble-image2" />
                        <p className="bubble-text2">
                        Bienvenue dans nos contrées un peu bousculées. Nous, les petits habitants à plumes, écailles, carapaces et pattes discrètes, avons une histoire à vous raconter. Enfin, cinq histoires, pour être précis.
                        </p>
                    </div>
                    <img src={animalImage} alt="Animal" className="animal-image2" />
                </div>
                <div
                    className="continue-button"
                    onClick={() => navigate("/regions")} 
                >
                    <span className="continue-button-text">Continuer</span>
                </div>
            </div>
        </>
    );
}

export default Guide2;
