import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import "./DialogueBox.css";

const CardTitle = ({ number, title }) => {
    return (
        <div className="card_title">
            <div className="number_square">
                <span className="number">
                    {number.toString().padStart(2,"0")}
                </span>
            </div>
            <h2 className="title">{title}</h2>
        </div>
    )
}

const SpeechBubble = ({ text, side, position }) => {

    return (
        <div className="speech_bubble">
            <p>{text}</p>
            <div className={side == "top" ? "tail top" : "tail bot"} style={{left: position}}></div>
        </div>
    )
}

const AnimalIllustration = (imageName) => {
    return (
        <div className="illustration">
            <img src={`https://hyblab.polytech.univ-nantes.fr/lanouvellerepublique/assets/${imageName.imageName}`} alt="POI" />
        </div>
    )
}

const DialogueBox = ({ text, setSelectedText, POI, setSelectedPOI, chosenAnimal}) => {
    const dialogueRef = useRef(null);
    const speechHolderRef = useRef(null);
    const [pages, setPages] = useState([]);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const imageName = POI[1];

    const handleScroll = () => {
        const holder = speechHolderRef.current;
        if (holder) {
            // Calculate the percentage of how far the user has scrolled
            const scrollPosition = holder.scrollTop;
            const scrollHeight = holder.scrollHeight - holder.clientHeight;
            const scrolledPercentage = (scrollPosition / scrollHeight) * 100;

            // Set the scroll percentage
            setScrollPercentage(scrolledPercentage);
        }
    };

    // Reset pages when text changes
    useEffect(() => {
        setPages(text);
    }, [text]);

    useEffect(() => {
        if (dialogueRef.current) {
        anime({
            targets: dialogueRef.current,
            translateY: ["100%", "0%"], // Move from 100px below to its normal position
            opacity: [0, 1],
            duration: 400, // Animation duration in milliseconds
            easing: "easeOutQuad",
        });
        }
    }, [text]); // Re-run animation whenever text changes

    useEffect(() => {
        const holder = speechHolderRef.current;
        if (holder) {
            holder.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (holder) {
                holder.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const shadowIntensity = Math.max(0.2 - (scrollPercentage / 500), 0.05); // Decrease shadow as we scroll down
    const shadowStyle = {
        content: '""',
        position: "fixed",
        bottom: "calc(20% - 10px)",
        left: "0",
        width: "100%",
        height: "50px", // Adjust this based on how much shadow you want
        background: `linear-gradient(to top, rgba(255, 255, 255, ${shadowIntensity*8}), rgba(255, 255, 255, 0))`,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 1, // Initially visible
        transition: "box-shadow 0.3s, opacity 0.3s",
    };

    const handleClose = () => {
        if (dialogueRef.current) {
            anime({
            targets: dialogueRef.current,
            translateY: ["0%", "100%"], // Move back down
            opacity: [1, 0], // Fade out
            duration: 400,
            easing: "easeInQuad",
            complete: () => {setSelectedText(""); setSelectedPOI([0,""])}, // Remove text AFTER animation completes
            });
        }
    };

    return (
        <div 
            ref={dialogueRef} 
            className="dialogue-box"
            onClick={() => {handleClose()}}
        >
            <CardTitle number={POI[0]} title={"La carte d'identité"}/>
            <div className="speech_holder" ref={speechHolderRef}>
                {pages.map((page, index) => {
                    return (<SpeechBubble key={index} text={page} side="bot" position="40%"/>);
                })}
                <div className="shadow" style={shadowStyle}></div>
            </div>
            <AnimalIllustration imageName={imageName} />
        </div>
    );
};

export default DialogueBox;
