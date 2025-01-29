import './SpeechBubble.css';

const SpeechBubble = ({ text, side, position, width }) => {
    return (
        <div 
            className="speech_bubble"
            style={{
                ...(width !== undefined && { width }) // Only set width if defined
            }}
        >
            <p>{text}</p>
            <div 
                className={side === "top" ? "tail top" : "tail bot"} 
                style={{
                    left: position, 
                }}
            ></div>
        </div>
    )
}

export default SpeechBubble;