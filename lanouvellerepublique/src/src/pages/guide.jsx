import { useNavigate, useSearchParams } from "react-router-dom";
import "./guide.css"; // Import the CSS file
import Header from "../components/Header";
import loutreImage from "../assets/loutre2.png"; 
import ligneDesign from "../assets/lignedesign1.svg";
import ligneDesign2 from "../assets/lignedesign2.svg";
import textBubble from "../assets/Vector.png";
import SpeechBubble from "../components/SpeechBubble";

function Guide() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams(); 

    const step = parseInt(searchParams.get("step")) || 1;

    const dialogues = {
        1: "Bonjour, cher explorateur ou exploratrice curieux...",
        2: "Bienvenue dans nos contrées un peu bousculées. Nous, les petits habitants à plumes, écailles, carapaces et pattes discrètes, avons une histoire à vous raconter. Enfin, cinq histoires, pour être précis.",
    };

    const lines = {
        1: {
            svg: ligneDesign,
            yOffset: "10%",
        },
        2: {
            svg: ligneDesign2,
            yOffset: "35%",
        }
    }

    const nextStep = () => {
        if (step < Object.keys(dialogues).length) {
            setSearchParams({ step: step + 1 });
        } else {
            navigate("/regions");
        }
    };

    return (
        <>
            <Header titre={"Dans leur peau"} textColor={"black"} />
            <div className="guide1-container">
                <img src={lines[step].svg} alt="Design ligne" className="line-design" 
                    style={{top: lines[step].yOffset}}/>
                <div className="animal-section">
                    <div className="bubble-container">
                        <SpeechBubble text={dialogues[step]} position={"35%"} width={"60%"}/>
                    </div>
                    <div className="image-container">
                        <img src={loutreImage} alt="Loutre" className="animal-image" />
                    </div>
                </div>
                <div className="continue-button" onClick={nextStep}>
                    <span className="continue-button-text">
                        Continuer
                    </span>
                </div>
            </div>
        </>
    );
}

export default Guide;
