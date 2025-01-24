import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import "./DialogueBox.css";

const DialogueBox = ({ text, setSelectedText}) => {
    const dialogueRef = useRef(null);
    const textRef = useRef(null);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const splitTextByHeight = () => {
        if (!text || text.trim() === "" || !dialogueRef.current || !textRef.current) return [];
    
        const words = text.split(" ");
        const pages = [];
        let currentPageText = "";
        
        // Use getBoundingClientRect() for more consistent measurements
        const boxHeight = dialogueRef.current.getBoundingClientRect().height;
        const computedStyle = getComputedStyle(dialogueRef.current);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);
        const boxHeightAdjusted = boxHeight - paddingTop - paddingBottom;
    
        // Fallback line height calculation
        const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight) || 20; // Provide a default
    
        words.forEach((word) => {
            const testText = currentPageText + word + " ";
            textRef.current.innerText = testText;
            
            // Use offsetHeight instead of scrollHeight
            const testHeight = textRef.current.offsetHeight;
    
            if (testHeight > boxHeightAdjusted) {
                pages.push(currentPageText.trim());
                currentPageText = word + " ";
            } else {
                currentPageText = testText;
            }
        });
    
        if (currentPageText) pages.push(currentPageText.trim());
        return pages;
    };

    // Reset pages when text changes
    useEffect(() => {
        if (dialogueRef.current && textRef.current) {
            setPages(splitTextByHeight());
            setCurrentPage(0);
        }
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
            onClick={() => {currentPage < pages.length - 1 ? setCurrentPage(currentPage + 1) : handleClose()}}
        >
            <p ref={textRef}>{pages[currentPage]}</p>
        </div>
    );
};

export default DialogueBox;
