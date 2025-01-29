import './SpeechBubble.css';

const SpeechBubble = ({ key, text }) => {
    return (
        <div className="speech_bubble">
            <p>{text}</p>
            <div className="tail"></div>
        </div>
    )
}

export default SpeechBubble;