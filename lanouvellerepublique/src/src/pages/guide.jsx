import { useNavigate, useSearchParams } from "react-router-dom";
import "./guide.css"; // Import the CSS file
import Header from "../components/Header";
import loutreImage from "../assets/loutre2.png"; 
import ligneDesign from "../assets/lignedesign1.svg";
import ligneDesign2 from "../assets/lignedesign2.svg";
import ligneDesign3 from "../assets/lignedesign3.svg";
import SpeechBubble from "../components/SpeechBubble";

function Guide() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams(); 

    const step = parseInt(searchParams.get("step")) || 1;

    const dialogues = {
        1: "Bonjour, cher explorateur ou exploratrice curieux...",
        2: "Bienvenue dans nos contrées un peu bousculées. Nous, les petits habitants à plumes, écailles, carapaces et pattes discrètes, avons une histoire à vous raconter. Enfin, cinq histoires, pour être précis.",
        3: "À travers cette carte interactive, nous, les tortues, les anguilles, les azurés, les loutres et les sonneurs, vous invitons à découvrir nos vies : nos habitats, nos habitudes, et les menaces qui nous compliquent l’existence.",
        4: " Mais rassurez-vous, ce n’est pas qu’un portrait sombre ! A la fin de chaque balade, on vous montre nos havres de paix, ces lieux où des humains sympas nous protègent encore.",
    };

    const lines = {
        1: {
            svg: ligneDesign,
            yOffset: "10%",
        },
        2: {
            svg: ligneDesign2,
            yOffset: "35%",
        },
        3: {
            svg: ligneDesign2,
            yOffset: "35%",
        },
        4: {
            svg: ligneDesign3,
            yOffset: "10%",
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
            <Header textColor={"black"} />
            <div className="guide1-container">
                <img src={lines[step].svg} alt="Design ligne" className="line-design" 
                    style={{top: lines[step].yOffset}}/>
                <div className="animal-section">
                    <div className="bubble-container">
                        <SpeechBubble text={dialogues[step]} pos_tail={"35"} width={"60%"}/>
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
