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
        
        // Measure dialogue box height
        const boxHeight = dialogueRef.current.clientHeight;
        const paddingTop = parseFloat(getComputedStyle(dialogueRef.current).paddingTop);
        const boxHeightAdjusted = boxHeight - 2 * paddingTop;
        console.log(boxHeightAdjusted);

        // Measure line height
        const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
        const maxLines = Math.floor(boxHeight / lineHeight);

        let lineCount = 0;

        words.forEach((word) => {
            const testText = currentPageText + word + " ";
            textRef.current.innerText = testText;
            
            const testHeight = textRef.current.scrollHeight; // Measure actual height

            if (testHeight > boxHeightAdjusted) {
                pages.push(currentPageText.trim());
                currentPageText = word + " ";
                lineCount = 1;
            } else {
                currentPageText = testText;
                lineCount++;
            }
        });

        if (currentPageText) pages.push(currentPageText.trim());
        console.log(pages);
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
