import { useNavigate } from "react-router-dom";
import "./guide1.css"; // Import the CSS file
import Header from "../components/Header";
import loutreImage from "../assets/loutre2.png"; // Assurez-vous de placer l'image dans le dossier "assets"
import ligneDesign from "../assets/lignedesign1.svg"; // Assurez-vous de placer le SVG dans le dossier "assets"
import textBubble from "../assets/Vector.png"; // Assurez-vous de placer la bulle de texte dans le dossier "assets"

function Guide1() {
    const navigate = useNavigate();

    return (
        <>
            <Header titre={"Dans leur peau"} textColor={"black"} />
            <div className="guide1-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    Retour
                </button>
                <div className="pathway">
                    <img src={ligneDesign} alt="Design ligne" className="line-design" />
                </div>
                <div className="animal-section">
                    <div className="bubble-container">
                        <img src={textBubble} alt="Bulle de texte" className="bubble-image" />
                        <p className="bubble-text">
                            Bonjour, cher explorateur ou exploratrice curieux...
                        </p>
                    </div>
                    <img src={loutreImage} alt="Loutre" className="animal-image" />
                </div>
                <div
                    className="continue-button"
                    onClick={() => navigate("/nextpage")} // Remplacez par votre route réelle
                >
                    <span className="continue-button-text">Continuer</span>
                </div>
            </div>
        </>
    );
}

export default Guide1;
