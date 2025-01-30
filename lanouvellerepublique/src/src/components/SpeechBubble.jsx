import './SpeechBubble.css';

const SpeechBubble = ({ text, side, pos_tail, width }) => {
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
                    left: `${pos_tail}%`, 
                }}
            ></div>
        </div>
    )
}

export default SpeechBubble;