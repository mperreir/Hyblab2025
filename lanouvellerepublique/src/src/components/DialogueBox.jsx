import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import "./DialogueBox.css";
import loutre from '../assets/loutre.svg';

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

const SpeechBubble = ({ text }) => {
    return (
        <div className="speech_bubble">
            <p>{text}</p>
            <div className="tail"></div>
        </div>
    )
}

const AnimalIllustration = () => {
    return (
        <div className="illustration">
            <img src={loutre} alt="Loutre"/>
        </div>
    )
}

const DialogueBox = ({ text, setSelectedText}) => {
    const dialogueRef = useRef(null);
    const speechHolderRef = useRef(null);
    const [pages, setPages] = useState([]);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const maxCharsPerBubble = 250;

    const splitText = () => {
        const sentences = text.match(/[^.!?…]+[.!?…]/g) || []; // Extract sentences
        const tempPages = [];
        let currentBubble = "";
        
        for (const sentence of sentences) {
            if ((currentBubble + sentence).length <= maxCharsPerBubble) {
                currentBubble += sentence + " ";
            } else {
                tempPages.push(currentBubble.trim()); // Store the current bubble
                currentBubble = sentence + " "; // Start a new bubble
            }
        }
    
        // Push the last bubble if not empty
        if (currentBubble.trim().length > 0) {
            tempPages.push(currentBubble.trim());
        }

        console.log(tempPages);
        setPages(tempPages); // Update state
    };

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
        console.log(text);
        splitText();
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
            complete: () => setSelectedText(""), // Remove text AFTER animation completes
            });
        }
    };

    return (
        <div 
            ref={dialogueRef} 
            className="dialogue-box"
            onClick={() => {handleClose()}}
        >
            <CardTitle number={1} title={"La carte d'identité"}/>
            <div className="speech_holder" ref={speechHolderRef}>
                {pages.map((page, index) => {
                    return (<SpeechBubble key={index} text={page}/>);
                })}
                <div className="shadow" style={shadowStyle}></div>
            </div>
            <AnimalIllustration/>
        </div>
    );
};

export default DialogueBox;
